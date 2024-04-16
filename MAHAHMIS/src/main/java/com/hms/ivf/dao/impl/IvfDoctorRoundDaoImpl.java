package com.hms.ivf.dao.impl;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.SharedSessionContract;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.canteen.dto.CustomizeTemplateDto;
import com.hms.dto.Doctor;
import com.hms.dto.DoctorRoundTempDTO;
import com.hms.dto.InventoryFetchPateintNameDTO;
import com.hms.dto.PrescriptionInstruction;
import com.hms.dto.RouteDTO;
import com.hms.dto.TreatmentOperations;
import com.hms.ehat.dto.EhatOTOperationNotes;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.dto.admissionReportViewDto;
import com.hms.ivf.dao.IvfDoctorRoundDao;
import com.hms.ivf.dto.IVFCoupleDTO;
import com.hms.ivf.dto.IvfDoctorRoundDto;
import com.hms.ivf.dto.IvfGeneralVoucherDto;
import com.hms.ivf.dto.IvfHistorySlaveDto;
import com.hms.ivf.dto.IvfHistoryTempMasterDto;
import com.hms.ivf.dto.IvfPrescriptionDto;
import com.hms.ivf.dto.SurgeryAdviceForIvfDTO;
import com.hms.operation.util.OTOperationNotes;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.CreditNotePatient;
import com.hms.pharmacy.pojo.ProductMaster;


@Repository
public class IvfDoctorRoundDaoImpl implements IvfDoctorRoundDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveDoctorRoundInfo(List<IvfDoctorRoundDto> objDto, HttpServletRequest request) {

		int Result = 0;
		try {

			for (IvfDoctorRoundDto obj : objDto) {

				sessionFactory.getCurrentSession().merge(obj);
				Result = 1;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}

		return Result;
	}

	@Override
	public List<IvfDoctorRoundDto> fetchDoctorRoundData(int patientId, int treatmentId) {

		List<IvfDoctorRoundDto> listDoctorRoundData = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfDoctorRoundDto.class);
			criteria.add(Restrictions.eq("patientId", patientId));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));

			listDoctorRoundData = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listDoctorRoundData;
	}

	@Override
	public List<IvfDoctorRoundDto> setIvfDoctorPreRound(int treatmentId, String date) {

		List<IvfDoctorRoundDto> setlistDR = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfDoctorRoundDto.class);

			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("ivf_treatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("date", date));

			setlistDR = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		return setlistDR;

	}

	@Override
	public String deleteRecordDoctorRoundInfo(String ovampickupslaveids, int userId) {

		String sql = "";
		String msg = "";

		try {

			Query itemInfo = sessionFactory.getCurrentSession()
					.createSQLQuery("update ivf_doctor_round_info set deleted='Y',deleted_by=" + userId
							+ ",deleted_date_time=now() where doctor_round_id in(" + ovampickupslaveids + ")");

			int iii = itemInfo.executeUpdate();

			msg = "Record Deleted Successfully";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return msg;

	}

	@Override
	public List<IvfDoctorRoundDto> getListForIvfDoctorRound(String patientId) {

		List<IvfDoctorRoundDto> list = null;

		try {
			Criteria c = sessionFactory.getCurrentSession().createCriteria(IvfDoctorRoundDto.class);

			int patientId1 = Integer.parseInt(patientId);
			c.add(Restrictions.eq("patientId", patientId1));
			c.add(Restrictions.eq("deleted", "N"));
			list = c.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<IvfDoctorRoundDto> getListForIvfDoctorRoundPrint(int treatmentId, String toDate, String fromDate) {
		
		String listInfo = "";
		List<IvfDoctorRoundDto> list = new ArrayList<IvfDoctorRoundDto>();

		try {

			listInfo = "select * from ivf_doctor_round_info where deleted ='N' and ivf_treatment_id= " + treatmentId
					+ " and dr_round_date>= '" + fromDate + "' and dr_round_date<='" + toDate + "' ";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(listInfo);

			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> list1 = query.list();

			for (Map<String, Object> rs : list1) {

				IvfDoctorRoundDto objdoctorDetails = new IvfDoctorRoundDto();

				objdoctorDetails.setTime((String) rs.get("time"));
				objdoctorDetails.setTmNameIvfDoctorName((String) rs.get("tmName_ivfDoctorName"));
				objdoctorDetails.setClinicalNotes((String) rs.get("clinicalNotes"));
				objdoctorDetails.setRoundByDoctorName((String) rs.get("roundBy_doctorName"));
				objdoctorDetails.setInvestigationAd((String) rs.get("investigationAd"));

				list.add(objdoctorDetails);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return list;
	}

	@Override
	public List<DoctorRoundTempDTO> getIvfDoctorListForTemplateName() {

		String sql = "";
		List<DoctorRoundTempDTO> arrDoctor = new ArrayList<DoctorRoundTempDTO>();
		try {
			sql = "select * from ehat_doctor_round_template where status='Y' ";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);

			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> doctorDetails = query.list();

			for (Map<String, Object> rs : doctorDetails) {

				DoctorRoundTempDTO objdoctorDetails = new DoctorRoundTempDTO();

				objdoctorDetails.setTemplateName((String) rs.get("tempName"));

				objdoctorDetails.setTemplateId((Integer) rs.get("idDoctorRoundTemplate"));

				arrDoctor.add(objdoctorDetails);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return arrDoctor;
	}

	@Override
	public List<DoctorRoundTempDTO> getIvfTemplateDataForIvfDr(int tempId) {

		String sql = "";
		List<DoctorRoundTempDTO> arrDoctor = new ArrayList<DoctorRoundTempDTO>();
		try {
			sql = "select * from ehat_doctor_round_template where idDoctorRoundTemplate=" + tempId + " ";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> doctorDetails = query.list();

			for (Map<String, Object> rs : doctorDetails) {

				DoctorRoundTempDTO objdoctorDetails = new DoctorRoundTempDTO();

				objdoctorDetails.setClinicalNote((String) rs.get("clinicalNotes"));
				objdoctorDetails.setTemplateId((Integer) rs.get("idDoctorRoundTemplate"));
				objdoctorDetails.setInvestigationAdvice((String) rs.get("investigationAdvice"));

				arrDoctor.add(objdoctorDetails);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return arrDoctor;
	}

	@Override
	public List<RouteDTO> getUnitTypeListForIvfDoctorRound() {
		
		String sql = "";
		List<RouteDTO> unitList = new ArrayList<RouteDTO>();
		try {
			sql = "Select * from pharma_uom_master where uom_delete_flag = '0'";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);

			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> unitDetails = query.list();

			for (Map<String, Object> rs : unitDetails) {

				RouteDTO objrout = new RouteDTO();

				objrout.setRouteId((Integer) rs.get("uom_id"));

				objrout.setRoute_name((String) rs.get("uom_name"));  

				unitList.add(objrout);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return unitList;
	
		
	}
	
	@Override
	public List<RouteDTO> getPreperationsListForIvfDoctorRound() {
		

		String sql = "";
		List<RouteDTO> prepList = new ArrayList<RouteDTO>();
		try {
			sql = "Select * from pharma_preparation_master where preparation_delete_flag = 0";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);

			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> prepDetails = query.list();

			for (Map<String, Object> rs : prepDetails) {

				RouteDTO objdpre = new RouteDTO();

				objdpre.setRouteId((Integer) rs.get("preparation_id"));

				objdpre.setPrep((String) rs.get("preparation_name"));  

				prepList.add(objdpre);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return prepList;
		
	}
	

	@Override
	public List<PrescriptionInstruction> getAllPresInstructionsForIvfDoctorRound(String depType) {

		String sql = "";
		List<PrescriptionInstruction> prepList = new ArrayList<PrescriptionInstruction>();
		try {
			if(depType.equals("IPD")){ 
				sql = "select * from prescription_instruction where status='Y' AND (refTo= 'IPD' OR refTo= 'Both')"; 
				}
				else if(depType.equals("OPD")){
					sql = "select * from prescription_instruction where status='Y' AND (refTo= 'OPD' OR refTo= 'Both')";	
				}
				else
					sql = "select * from prescription_instruction where status='Y'";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);

			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> prepDetails = query.list();

			for (Map<String, Object> rs : prepDetails) {

				PrescriptionInstruction pInstList = new PrescriptionInstruction();

				pInstList.setPresciptionInstructionId((Integer) (rs.get("idprescription_Instruction")));
				pInstList.setEnglishInstruction((String) (rs.get("english_Instruction")));
				pInstList.setHindiInstruction((String) (rs.get("hindi_Instruction_forPrint")));
				pInstList.setMarathiInstruction((String) (rs.get("marathi_Instruction")));
				pInstList.setRefTo((String) (rs.get("refTo")));
				pInstList.setMarathiInstruction_forPrint((String) (rs.get("marathi_Instruction_forPrint")));

				prepList.add(pInstList);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return prepList;
			
	}
	
	@Override
	public int saveIvfPrescriptionInfo(IvfPrescriptionDto obj, HttpServletRequest request) {

		try {

			System.err.println("IvfPrescriptionDto----"+obj.toString());
			if (obj.getPrescriptionId() == 0) {
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
			} else {
				sessionFactory.getCurrentSession().merge(obj);
				return 2;

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<IvfPrescriptionDto> fetchIvfPrescriptionData(int treatmentId,String callFrom) {

		List<IvfPrescriptionDto> listPre = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfPrescriptionDto.class);
			criteria.add(Restrictions.eq("ivf_treatmentId", treatmentId));
			criteria.add(Restrictions.eq("saveFrom", callFrom));
			criteria.add(Restrictions.eq("deleted", "N"));

			listPre = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listPre;
	}

	@Override
	public List<IvfPrescriptionDto> fetchPrescriptionByDate(int treatmentId, String date,String callFrom) {

		List<IvfPrescriptionDto> setlistDR = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfPrescriptionDto.class);

			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("ivf_treatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("saveFrom", callFrom));
			criteria.add(Restrictions.eq("date", date));

			setlistDR = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		return setlistDR;

	}

	@Override
	public IvfPrescriptionDto editIvfPrescriptionData(Integer prescriptionId) {

		IvfPrescriptionDto obj = new IvfPrescriptionDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfPrescriptionDto.class);
			criteria.add(Restrictions.eq("prescriptionId", prescriptionId));

			obj = (IvfPrescriptionDto) criteria.uniqueResult();
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public String deleteIvfPrescriptionRow(String prescriptionIdRow, int userId) {

		String sql = "";
		String msg = "";

		try {

			Query itemInfo = sessionFactory.getCurrentSession()
					.createSQLQuery("update ivf_prescription_info set deleted='Y',deleted_by=" + userId
							+ ",deleted_date_time=now() where precription_id in(" + prescriptionIdRow + ")");

			int iii = itemInfo.executeUpdate();

			msg = "Record Deleted Successfully";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public List<IvfPrescriptionDto> getListPrintForIvfPrescription(String patientId) {

		List<IvfPrescriptionDto> list = null;

		try {
			Criteria c = sessionFactory.getCurrentSession().createCriteria(IvfPrescriptionDto.class);

			int patientId1 = Integer.parseInt(patientId);
			c.add(Restrictions.eq("ivf_treatmentId", patientId1));
			c.add(Restrictions.eq("deleted", "N"));
			list = c.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int saveIvfHistory(IvfHistoryTempMasterDto obj) {

		try {

			if (obj.getHistoryId() == 0) {

				sessionFactory.getCurrentSession().merge(obj);
				return 1;
			} else {

				sessionFactory.getCurrentSession().merge(obj);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return 0;
	}

	@Override
	public IvfHistoryTempMasterDto fetchIvfHistoryMaster(int treatmentId) {

		List<IvfHistorySlaveDto> newlistHiSlave = new ArrayList<IvfHistorySlaveDto>();

		IvfHistoryTempMasterDto mobj = new IvfHistoryTempMasterDto();
		try {
			Criteria c = sessionFactory.getCurrentSession().createCriteria(IvfHistoryTempMasterDto.class);
			//c.add(Restrictions.eq("treatmentId", treatmentId));
			
			c.add(Restrictions.eq("ivf_treatmentId", treatmentId));

			mobj = (IvfHistoryTempMasterDto) c.uniqueResult();

			if (mobj != null) {
				List<IvfHistorySlaveDto> listHiSlave = mobj.getGetListOfHistorySlaveDTO();
				for (IvfHistorySlaveDto objslave : listHiSlave) {
					if (objslave.getDeleted().equalsIgnoreCase("N")) {

						newlistHiSlave.add(objslave);
					}
				}
				mobj.setGetListOfHistorySlaveDTO(newlistHiSlave);

			}
			return mobj;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mobj;

	}

	@Override
	public String deleteIvfHistoryInfo(String historyslaveId, int userId) {

		String sql = "";
		String msg = "";

		try {

			Query itemInfo = sessionFactory.getCurrentSession()
					.createSQLQuery("update ivf_history_temp_slave set deleted='Y',deleted_by=" + userId
							+ ",deleted_date_time=now() where history_slave_id in(" + historyslaveId + ")");

			int iii = itemInfo.executeUpdate();

			msg = "Record Deleted Successfully";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public List<IvfHistoryTempMasterDto> fetchIvfHistoryMasterForPrint(int treatmentId) {

		List<IvfHistorySlaveDto> newlistHiSlave = new ArrayList<IvfHistorySlaveDto>();

		List<IvfHistoryTempMasterDto> mobj = new ArrayList<IvfHistoryTempMasterDto>();
		try {
			Criteria c = sessionFactory.getCurrentSession().createCriteria(IvfHistoryTempMasterDto.class);
			c.add(Restrictions.eq("treatmentId", treatmentId));

			mobj = (List<IvfHistoryTempMasterDto>) c.list();

			if (mobj != null) {
				List<IvfHistorySlaveDto> listHiSlave = ((IvfHistorySlaveDto) mobj).getGetListOfHistorySlaveDTO();
				for (IvfHistorySlaveDto objslave : listHiSlave) {
					if (objslave.getDeleted().equalsIgnoreCase("N")) {
						// System.out.println(".........objslave..."+objslave);
						newlistHiSlave.add(objslave);
					}
				}
				((IvfHistorySlaveDto) mobj).setGetListOfHistorySlaveDTO(newlistHiSlave);

			}
			return mobj;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mobj;

	}

	/*
	 * @Override public List<RegTreBillDto>
	 * getAutoSuggessionPatientNameForGeneralVoucher(String findText) {
	 * 
	 * 
	 * String sql=""; List<RegTreBillDto> arrDoctor = new
	 * ArrayList<RegTreBillDto>(); try{ Criteria
	 * c=sessionFactory.getCurrentSession().createCriteria(RegTreBillDto.class);
	 * 
	 * c.add(Restrictions.ilike("patientName", findText,MatchMode.ANYWHERE));
	 * c.setMaxResults(10); arrDoctor= c.list();
	 * 
	 * 
	 * 
	 * }catch(Exception e){ e.printStackTrace(); }
	 * 
	 * System.out.println("InDao Patient..."+arrDoctor); return arrDoctor;
	 * 
	 * }
	 */
	@Override
	public RegistrationViewDto getAutoSuggessionPatientNameForGeneralVoucher(String findingName, int patSearchType,
			String callFrom) {

		RegistrationViewDto mv = new RegistrationViewDto();
		List<RegistrationViewDto> patList = new ArrayList<RegistrationViewDto>();
		try {
			String sql = "";

			if (callFrom.equals("reg")) {

				sql = getSqlQueryMarkvisit(findingName, patSearchType);

			} else if (callFrom.equals("prevOpd")) {

				sql = getSqlQueryPrevOpd(findingName, patSearchType);

			} else if (callFrom.equals("prevIpd")) {

				sql = getSqlQueryPrevIpd(findingName, patSearchType);
			} else if (callFrom.equals("prevDigo")) {
				sql = getSqlQueryPrevDigo(findingName, patSearchType);

			}

			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {

				RegistrationViewDto obj = new RegistrationViewDto();
				obj.setPatientName((String) row.get("patient_name"));
				obj.setPtId((Integer) row.get("patient_id"));
				obj.setMobile((String) row.get("mobile"));
				patList.add(obj);
			}
			mv.setLstRegviewDto(patList);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return mv;

	}

	String getSqlQueryMarkvisit(String findingName, int patSearchType) {

		String sql = "";
		if (patSearchType == 1) {

			sql = "SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile FROM ehat_patient p where p.patient_id like '"
					+ findingName + "%' and p.deleted='N' limit 20";

		} else if (patSearchType == 2) {

			sql = "SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile FROM ehat_patient p where "
					+ " (p.f_name like '" + findingName + "%' " + " OR p.l_name like '" + findingName + "%' "
					+ " OR concat(p.f_name,' ',p.l_name) like '" + findingName + "%' "
					+ " OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '" + findingName + "%' "
					+ " OR concat(p.f_name,' ',p.m_name) like '" + findingName + "%' "
					+ " OR concat(p.m_name,' ',p.l_name) like '" + findingName + "%') "
					+ " and p.deleted = 'N' limit 20";

		} else if (patSearchType == 3) {

			sql = "SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile FROM ehat_patient p where p.mobile like '"
					+ findingName + "%' and p.deleted='N' limit 20";
		}

		return sql;
	}

	String getSqlQueryPrevOpd(String findingName, int patSearchType) {

		String sql = "";
		if (patSearchType == 1) {

			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile"
					+ " FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+ " where t.t_flag = 'N' and t.department_id=1 and p.patient_id like '" + findingName
					+ "%' and p.deleted = 'N' group by t.patient_id limit 20";

		} else if (patSearchType == 2) {

			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile"
					+ " FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+ " where t.t_flag = 'N' and t.department_id=1 and (p.f_name like '" + findingName + "%' "
					+ " OR p.l_name like '" + findingName + "%' " + " OR concat(p.f_name,' ',p.l_name) like '"
					+ findingName + "%' " + " OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '" + findingName
					+ "%' " + " OR concat(p.f_name,' ',p.m_name) like '" + findingName + "%' "
					+ " OR concat(p.m_name,' ',p.l_name) like '" + findingName
					+ "%') and p.deleted = 'N' group by t.patient_id limit 20";

		} else if (patSearchType == 3) {

			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile"
					+ " FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+ " where t.t_flag = 'N' and t.department_id=1 and p.mobile like '" + findingName
					+ "%' and p.deleted = 'N' group by t.patient_id limit 20";

		}

		return sql;
	}

	String getSqlQueryPrevIpd(String findingName, int patSearchType) {

		String sql = "";
		if (patSearchType == 1) {

			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile"
					+ " FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+ " where t.t_flag = 'N' and t.department_id=2 and p.patient_id like '" + findingName
					+ "%' and p.deleted = 'N' group by t.patient_id limit 20";

		} else if (patSearchType == 2) {

			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile"
					+ " FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+ " where t.t_flag = 'N' and t.department_id=2 and (p.f_name like '" + findingName + "%' "
					+ " OR p.l_name like '" + findingName + "%' " + " OR concat(p.f_name,' ',p.l_name) like '"
					+ findingName + "%' " + " OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '" + findingName
					+ "%' " + " OR concat(p.f_name,' ',p.m_name) like '" + findingName + "%' "
					+ " OR concat(p.m_name,' ',p.l_name) like '" + findingName
					+ "%') and p.deleted = 'N' group by t.patient_id limit 20";

		} else if (patSearchType == 3) {

			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile"
					+ " FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+ " where t.t_flag = 'N' and t.department_id=2 and p.mobile like '" + findingName
					+ "%' and p.deleted = 'N' group by t.patient_id limit 20";

		}

		return sql;
	}

	String getSqlQueryPrevDigo(String findingName, int patSearchType) {

		String sql = "";
		if (patSearchType == 1) {

			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile"
					+ " FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+ " where t.t_flag = 'N' and t.department_id=3 and p.patient_id like '" + findingName
					+ "%' and p.deleted = 'N' group by t.patient_id limit 20";

		} else if (patSearchType == 2) {

			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile"
					+ " FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+ " where t.t_flag = 'N' and t.department_id=3 and (p.f_name like '" + findingName + "%' "
					+ " OR p.l_name like '" + findingName + "%' " + " OR concat(p.f_name,' ',p.l_name) like '"
					+ findingName + "%' " + " OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '" + findingName
					+ "%' " + " OR concat(p.f_name,' ',p.m_name) like '" + findingName + "%' "
					+ " OR concat(p.m_name,' ',p.l_name) like '" + findingName
					+ "%') and p.deleted = 'N' group by t.patient_id limit 20";

		} else if (patSearchType == 3) {

			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.mobile AS mobile"
					+ " FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+ " where t.t_flag = 'N' and t.department_id=3 and p.mobile like '" + findingName
					+ "%' and p.deleted = 'N' group by t.patient_id limit 20";

		}

		return sql;
	}

	@Override
	public int ivfsaveGeneralVoucher(IvfGeneralVoucherDto ivfobj) {

		try {

			if (ivfobj.getGeneralVoucherId() == 0) {
				
				sessionFactory.getCurrentSession().merge(ivfobj);
				return 1;
			} else {
				sessionFactory.getCurrentSession().merge(ivfobj);
				return 2;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<IvfGeneralVoucherDto> fetchGeneralVouchersList(Integer unitId) {

		List<IvfGeneralVoucherDto> listPre = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfGeneralVoucherDto.class);
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("deleted", "N"));

			listPre = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listPre;

	}

	@Override
	public List<IvfGeneralVoucherDto> fetchCanceledVouchersList() {

		List<IvfGeneralVoucherDto> listPre = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfGeneralVoucherDto.class);
			criteria.add(Restrictions.eq("deleted", "Y"));

			listPre = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listPre;

	}

	@Override
	public List<IvfGeneralVoucherDto> fetchVouchersBYSearch(String searchBy, int selSearchType) {

		List<IvfGeneralVoucherDto> listPre = null;
		try {

			if (selSearchType == 1) {
				int generalVoucherId1 = Integer.parseInt(searchBy);
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfGeneralVoucherDto.class);
				criteria.add(Restrictions.eq("generalVoucherId", generalVoucherId1));
				criteria.add(Restrictions.eq("deleted", "N"));

				listPre = criteria.list();
			} else {

				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfGeneralVoucherDto.class);
				criteria.add(Restrictions.eq("txtPayTo", searchBy));
				criteria.add(Restrictions.eq("deleted", "N"));

				listPre = criteria.list();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return listPre;
	}

	@Override
	public IvfGeneralVoucherDto updateGeneralVoucher(Integer updategeneralVoucherId) {

		IvfGeneralVoucherDto obj = new IvfGeneralVoucherDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfGeneralVoucherDto.class);
			criteria.add(Restrictions.eq("generalVoucherId", updategeneralVoucherId));

			obj = (IvfGeneralVoucherDto) criteria.uniqueResult();
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public String deletegeneralVoucher(Integer todeletegeneralVoucherId) {

		int userId = 1;

		String sql = "";
		String msg = "";
		try {
			sql = "update  IvfGeneralVoucherDto set deleted='Y',deletedBy=" + userId
					+ ",deletedDateTime=now() where generalVoucherId=:todeletegeneralVoucherId";

			Query query = sessionFactory.getCurrentSession().createQuery(sql);
			query.setParameter("todeletegeneralVoucherId", todeletegeneralVoucherId);
			query.executeUpdate();
			msg = "Record Deleted Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			msg = "Network Issue";
		}
		return msg;

	}

	@Override
	public List<IvfGeneralVoucherDto> fetchPrintGeneralVoucher(int generalVoucherId) {

		List<IvfGeneralVoucherDto> setlistDR = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfGeneralVoucherDto.class);

			criteria.add(Restrictions.eq("generalVoucherId", generalVoucherId));
			criteria.add(Restrictions.eq("deleted", "N"));

			setlistDR = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return setlistDR;

	}  
	
	@Override
	public List<IvfGeneralVoucherDto> fetchPrintForCanceledGeneralVoucher(int generalVoucherId) {

		List<IvfGeneralVoucherDto> setlistDR = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfGeneralVoucherDto.class);

			criteria.add(Restrictions.eq("generalVoucherId", generalVoucherId));
			criteria.add(Restrictions.eq("deleted", "Y"));

			setlistDR = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return setlistDR;

	} 

	@Override
	public int getNextGeneralVoucherId() {
		int voucherId = 0;
		
			try {
				Query query = sessionFactory.getCurrentSession().createSQLQuery("SELECT MAX(general_voucher_id) FROM  ivf_general_voucher");

				Object id1 = query.uniqueResult();
				
				if (id1 == null) {
					id1 = 0;
				}
				voucherId = Integer.parseInt(id1.toString()) + 1;

			} catch (Exception e) {
				e.printStackTrace();
				return voucherId;
			}
			return voucherId;
	}

	@Override
	public List<CreditNotePatient> getAllPatientByIdSaleData(Integer patientId) {

		List<CreditNotePatient> creditNotePatients = new ArrayList<CreditNotePatient>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					" select patient_bill_date,patient_sales_bill_net_amt,p.f_name,    p.m_name,    p.l_name,    p.address,    p.mobile,product.product_name, "
							+ " slave.patient_sale_slave_issue_qty,slave.patient_slave_rate,slave.patient_slave_BatchId,slave.patient_slave_batch_code,slave.patient_slave_batch_expiry,product.product_uom_unit,pack.pack_type, "
							+ " pur_rate.rate,pur_rate.mrp,slave.patient_slave_id,slave.patient_slave_product_id,patient_sales_bill_id,slave.patient_slave_vat,slave.patient_slave_disc,p_master.patient_bill_patient_id,p_master.patient_sale_treatmentId,slave.patient_slave_mrp,patient_sale_type,pur_rate.pur_rate,patient_bill_mode from pharma_patient_sales_bill_master p_master "
							+ " inner join ehat_patient p ON p.patient_id = p_master.patient_bill_patient_id inner join pharma_patient_sales_bill_slave slave on slave.patient_slave_bill_master_id=p_master.patient_sales_bill_id inner join "
							+ " pharma_product_master product on slave.patient_slave_product_id=product.product_id inner join pharma_batch_master batch ON batch.batch_id = slave.patient_slave_BatchId "
							+ " inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_purchase_rate pur_rate ON pur_rate.batch_id = batch.batch_id where  "
							// + " p_master.patient_sales_bill_id = '" //patient_bill_patient_id
							+ " p_master.patient_bill_patient_id = '" + patientId
							+ "'  and slave.patient_sale_slave_issue_qty != 0 order by patient_slave_id  ");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();

			for (Object[] master : rows) {
				CreditNotePatient CreditNotePatient = new CreditNotePatient();
				if (master[0] != null) {
					CreditNotePatient.setPatientBillDate(master[0].toString());
				}

				if (master[1] != null) {
					CreditNotePatient.setPatientSalesBillNetAmt(master[1].toString());
				}

				if (master[2] != null)
					CreditNotePatient.setPatientName(master[2].toString());

				if (master[3] != null)
					CreditNotePatient.setPatientName(master[2].toString() + " " + master[3].toString());

				if (master[4] != null)
					CreditNotePatient.setPatientName(master[2].toString() + " " + master[4].toString());

				if (master[3] != null && master[4] != null)
					CreditNotePatient.setPatientName(
							master[2].toString() + " " + master[3].toString() + " " + master[4].toString());

				if (master[5] != null)
					CreditNotePatient.setPaddress(master[5].toString());

				if (master[6] != null)
					CreditNotePatient.setPhoneNumber(master[6].toString());

				if (master[7] != null)
					CreditNotePatient.setProductName(master[7].toString());

				if (master[8] != null)
					CreditNotePatient.setQty(master[8].toString());

				if (master[9] != null)
					CreditNotePatient.setRate(master[9].toString());

				if (master[10] != null)
					CreditNotePatient.setBatchId(master[10].toString());

				if (master[11] != null)
					CreditNotePatient.setBatchCode(master[11].toString());

				if (master[12] != null)
					CreditNotePatient.setBatchExpiry(master[12].toString());

				if (master[13] != null)
					CreditNotePatient.setUnit(master[13].toString());

				if (master[14] != null)
					CreditNotePatient.setPack(master[14].toString());

				if (master[15] != null)
					CreditNotePatient.setBatchRate(master[15].toString());

				/*
				 * if (master[16] != null) CreditNotePatient.setMrp(master[16].toString());
				 */

				if (master[17] != null)
					CreditNotePatient.setPatientSlaveId(master[17].toString());

				if (master[18] != null)
					CreditNotePatient.setProductId(master[18].toString());

				if (master[19] != null)
					CreditNotePatient.setPatientSalesBillId(master[19].toString());

				if (master[20] != null)
					CreditNotePatient.setVat(master[20].toString());

				if (master[21] != null)
					CreditNotePatient.setDisc(master[21].toString());

				if (master[22] != null)
					CreditNotePatient.setPatientId(master[22].toString());

				if (master[23] != null)
					CreditNotePatient.setTreatmentId(master[23].toString());

				if (master[24] != null)
					CreditNotePatient.setMrp(master[24].toString());

				if (master[25] != null)
					CreditNotePatient.setSaleType(master[25].toString());

				if (master[26] != null)
					CreditNotePatient.setPurRate(master[26].toString());

				if (master[27] != null)
					CreditNotePatient.setPatientBillMode(master[27].toString());

				creditNotePatients.add(CreditNotePatient);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return creditNotePatients;
	}

	@Override
	public List<CreditNotePatient> displayAllPatientReceiptDataByBillNoAndYear(Integer billNo, String billNoYear) {
		


		List<CreditNotePatient> creditNotePatients = new ArrayList<CreditNotePatient>();
		try {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					" select patient_bill_date,patient_sales_bill_net_amt,p.f_name,    p.m_name,    p.l_name,    p.address,    p.mobile,product.product_name, "
							+ " slave.patient_sale_slave_issue_qty,slave.patient_slave_rate,slave.patient_slave_BatchId,slave.patient_slave_batch_code,slave.patient_slave_batch_expiry,product.product_uom_unit,pack.pack_type, "
							+ " pur_rate.rate,pur_rate.mrp,slave.patient_slave_id,slave.patient_slave_product_id,patient_sales_bill_id,slave.patient_slave_vat,slave.patient_slave_disc,p_master.patient_bill_patient_id,p_master.patient_sale_treatmentId,slave.patient_slave_mrp,patient_sale_type,pur_rate.pur_rate,patient_bill_mode from pharma_patient_sales_bill_master p_master "
							+ " inner join ehat_patient p ON p.patient_id = p_master.patient_bill_patient_id inner join pharma_patient_sales_bill_slave slave on slave.patient_slave_bill_master_id=p_master.patient_sales_bill_id inner join "
							+ " pharma_product_master product on slave.patient_slave_product_id=product.product_id inner join pharma_batch_master batch ON batch.batch_id = slave.patient_slave_BatchId "
							+ " inner join pharma_packing_master pack ON pack.pack_id = product.product_pack_id inner join pharma_purchase_rate pur_rate ON pur_rate.batch_id = batch.batch_id where  "
							
							//+ " p_master.patient_bill_patient_id = '" + patientId
						    + " p_master.patient_sales_bill_id = '" +billNo 
						    + "' and p_master.patient_bill_date = '" +billNoYear 
							
							+ "'  and slave.patient_sale_slave_issue_qty != 0 order by patient_slave_id  ");

			@SuppressWarnings("unchecked")
			List<Object[]> rows = query.list();

			for (Object[] master : rows) {
				CreditNotePatient CreditNotePatient = new CreditNotePatient();
				if (master[0] != null) {
					CreditNotePatient.setPatientBillDate(master[0].toString());
				}

				if (master[1] != null) {
					CreditNotePatient.setPatientSalesBillNetAmt(master[1].toString());
				}

				if (master[2] != null)
					CreditNotePatient.setPatientName(master[2].toString());

				if (master[3] != null)
					CreditNotePatient.setPatientName(master[2].toString() + " " + master[3].toString());

				if (master[4] != null)
					CreditNotePatient.setPatientName(master[2].toString() + " " + master[4].toString());

				if (master[3] != null && master[4] != null)
					CreditNotePatient.setPatientName(
							master[2].toString() + " " + master[3].toString() + " " + master[4].toString());

				if (master[5] != null)
					CreditNotePatient.setPaddress(master[5].toString());

				if (master[6] != null)
					CreditNotePatient.setPhoneNumber(master[6].toString());

				if (master[7] != null)
					CreditNotePatient.setProductName(master[7].toString());

				if (master[8] != null)
					CreditNotePatient.setQty(master[8].toString());

				if (master[9] != null)
					CreditNotePatient.setRate(master[9].toString());

				if (master[10] != null)
					CreditNotePatient.setBatchId(master[10].toString());

				if (master[11] != null)
					CreditNotePatient.setBatchCode(master[11].toString());

				if (master[12] != null)
					CreditNotePatient.setBatchExpiry(master[12].toString());

				if (master[13] != null)
					CreditNotePatient.setUnit(master[13].toString());

				if (master[14] != null)
					CreditNotePatient.setPack(master[14].toString());

				if (master[15] != null)
					CreditNotePatient.setBatchRate(master[15].toString());

				/*
				 * if (master[16] != null) CreditNotePatient.setMrp(master[16].toString());
				 */

				if (master[17] != null)
					CreditNotePatient.setPatientSlaveId(master[17].toString());

				if (master[18] != null)
					CreditNotePatient.setProductId(master[18].toString());

				if (master[19] != null)
					CreditNotePatient.setPatientSalesBillId(master[19].toString());

				if (master[20] != null)
					CreditNotePatient.setVat(master[20].toString());

				if (master[21] != null)
					CreditNotePatient.setDisc(master[21].toString());

				if (master[22] != null)
					CreditNotePatient.setPatientId(master[22].toString());

				if (master[23] != null)
					CreditNotePatient.setTreatmentId(master[23].toString());

				if (master[24] != null)
					CreditNotePatient.setMrp(master[24].toString());

				if (master[25] != null)
					CreditNotePatient.setSaleType(master[25].toString());

				if (master[26] != null)
					CreditNotePatient.setPurRate(master[26].toString());

				if (master[27] != null)
					CreditNotePatient.setPatientBillMode(master[27].toString());

				creditNotePatients.add(CreditNotePatient);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
     //System.out.println(".............in daoaImpl................."+creditNotePatients);
		return creditNotePatients;
	
	}

	@Override
	public List<IvfGeneralVoucherDto> getListRecord(HttpServletRequest request, String fromdate, String todate,
			String fromtime, String totime, String voucherlist, String ledlist, String callfrom,
			int autosuggestionuserid) {
		String listInfo = "";
		List<IvfGeneralVoucherDto> list = new ArrayList<IvfGeneralVoucherDto>();
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		String userType = (String) session.getAttribute("userType");
		String status = "'Y'";
		try {

			listInfo = "select * from ivf_general_voucher where deleted ='N'  and createddate>= '" + fromtime
					+ "'and createddate>= '" + totime + "'and group_name>= '" + voucherlist + "'and sel_ledger_head>= '"
					+ ledlist + "'and txt_current_date>= '" + fromdate + "' and txt_current_date<='" + todate + "' ";

			if (!ledlist.equalsIgnoreCase("0")) {

				listInfo = listInfo + " and sel_ledger_head='" + ledlist + "'";
			}

			// int autosuggestionuserid;
			if (callfrom.equalsIgnoreCase("search") && autosuggestionuserid == 0
					&& !userType.equalsIgnoreCase("admin")) {
				listInfo = listInfo + " and user_id=" + userId;
			}
			if (autosuggestionuserid > 0) {

				listInfo = listInfo + " and user_id=" + autosuggestionuserid;
			}

			// System.out.println("---------------"+autosuggestionuserid);

			// listInfo="SELECT CONCAT(f_name,' ',l_name) as username FROM users";

			// listInfo = "select
			// gen.payto,gen.personName,gen.paymentMode,gen.subGroup,gen.typeOfPayment,gen.amount,gen.ledgerhead,gen.narration,concat(signedinuser.f_name,'
			// ',signedinuser.l_name) as
			// username,gen.created_date_time,grp.voucher_name,concat(usr.f_name,'
			// ',usr.l_name) as authorised_by from ehat_vouchers gen left join
			// ehat_expense_voucher_group grp on
			// gen.groupname=grp.idehat_expense_voucher_group left join users usr on
			// gen.autherisedby = usr.User_ID left join users signedinuser ON gen.user_id =
			// signedinuser.User_ID WHERE gen.created_date_time between '"+fromdate+"
			// "+fromtime+"' and '"+todate+" "+totime+"' and gen.status="+status+"';

			// listInfo="select
			// gen.txt_pay_to,gen.person_name,gen.pamentMode,gen.subgroup,gen.typeofPayment,gen.total_amount,gen.sel_ledger_head,gen.narration,concat(signedinuser.f_name,'
			// ',signedinuser.l_name) as username,gen.created_date_time,concat(usr.f_name,'
			// ',usr.l_name) as sel_authorised_by from ivf_general_voucher gen left join
			// users usr on gen.sel_authorised_by = usr.User_ID left join users signedinuser
			// ON gen.user_id = signedinuser.User_ID WHERE gen.created_date_time between
			// '"+fromdate+" "+fromtime+"' and '"+todate+" "+totime+"'and
			// gen.status="+status ;
			// System.out.println("listInfo query.........."+listInfo);

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(listInfo);

			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> list1 = query.list();

			for (Map<String, Object> row : list1) {
				// System.out.println("userId--------userId"+userId);
				String usql = "select concat(signedinuser.f_name,' ',signedinuser.l_name) as username  from users signedinuser where signedinuser.User_ID="
						+ userId;
				// System.out.println("usql--------usql"+usql);
				SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(usql);
				String userName = (String) q.uniqueResult();
				IvfGeneralVoucherDto obj = new IvfGeneralVoucherDto();

				obj.setSelGroupName((String) row.get("group_name"));
				obj.setTxtPayTo((String) row.get("txt_pay_to"));
				obj.setTxtcurrentDate((String) row.get("txt_current_date"));
				obj.setTxtperson((String) row.get("person_name"));
				obj.setPamentMode((String) row.get("pamentMode"));
				obj.setSubgroup((String) row.get("subgroup"));

				obj.setTypeofPayment((String) row.get("typeofPayment"));
				obj.setTotalPaidAmount((String) row.get("totalPaidAmount"));
				obj.setSelAuthorisedBy((String) row.get("sel_authorised_by"));
				obj.setSelLedgerHead((String) row.get("sel_ledger_head"));
				obj.setTxtNarration((String) row.get("narration"));
				obj.setUserName(userName);
				list.add(obj);
				// list.add(obj);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return list;
	}

	@Override
	public List<InventoryFetchPateintNameDTO> displayAllPatientReceiptDataByPatientId(Integer patientId,
			String typeOfpatient) {
		// TODO Auto-generated method stub
		return null;
	}

	
	@Override
	public List<TreatmentOperations> fetchIvfOperationsData(int TreatId, int PatientId) {

		List<TreatmentOperations> idList = new ArrayList<TreatmentOperations>();
		try {

			String sql = "";
			String sql1 = "";
			int ID = 0;

			sql = "select ID from treatment_operations where opStatus = 'Y' and Patient_ID=" + PatientId
					+ " AND Treatment_ID=" + TreatId;
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data = query.list();

			for (Map<String, Object> row : data) {
				ID = (Integer) row.get("ID");

				sql = "select treatmentOperationsManageID from treatmentoperationsmanage where operation_status = 'Y' and treatmentOperationsID="
						+ ID;
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int treatmentOperationsManageID = ((Number) refQuery.uniqueResult()).intValue();

				System.err.println("treatmentOperationsManageID>>" + treatmentOperationsManageID);
				sql1 = "select operation_name,treatmentOperationsManageID from patient_operation where status = 'Y' and treatmentOperationsManageID = "
						+ treatmentOperationsManageID;

				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> idDetails = query1.list();

				for (Map<String, Object> row1 : idDetails) {

					TreatmentOperations objOPId = new TreatmentOperations();
					objOPId.setOperName((String) row1.get("operation_name"));
					objOPId.setiD(treatmentOperationsManageID);
					idList.add(objOPId);
					objOPId = null;
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return idList;

	}

	
	
	@Override
	public List<OTOperationNotes> fetchIvfOTNotesData(int ivftomId) {
           List<OTOperationNotes> NotesList = new ArrayList<OTOperationNotes>();
		try {

			String sql = "";
			
			sql = "SELECT eo.* FROM ehat_otoperationnotes eo, treatmentoperationsmanage t where eo.status ='N'  AND   eo.treatmentOperationsManageID =t.treatmentOperationsManageID    AND t.operation_status='Y'  AND t.treatmentOperationsManageID = "+ivftomId ;
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data = query.list();

			for (Map<String, Object> row : data) {
				OTOperationNotes obj = new OTOperationNotes();
				obj.setIdOTOPNotes((Integer) row.get("idehat_OTOperationNotes"));
				obj.setEstimatedBLoodLoss((String) row.get("estimatedBLoodLoss"));
				obj.setActualBLoodLoss((String) row.get("actualBloodLoss"));
				obj.setInstrumentCount((Integer) row.get("instrumentCount"));
				obj.setRecordedBy((String) row.get("recordedBy"));
				obj.setMopCountRecordedBy((String) row.get("mopCountRecordedBy"));
				obj.setComment((String) row.get("comment"));
				obj.setTemplateID((Integer) row.get("templateID"));
				obj.setChkData((String) row.get("chkEditerdata"));
				NotesList.add(obj);
				obj = null;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return NotesList;

	}
	
	@Override
	public List<CustomizeTemplateDto> fetchIvfCustomizeTemplateList(int idCustomizeTemplate, String callFrom) {

		List<CustomizeTemplateDto> listCustomizeTemplate = new ArrayList<CustomizeTemplateDto>();
		
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CustomizeTemplateDto.class);
			
		if(!callFrom.equalsIgnoreCase("byTempId")) {

			criteria.addOrder(Order.asc("temp_name"));
			ProjectionList proList = Projections.projectionList();
			
			proList.add(Projections.property("idCustomizeTemplate"));
			proList.add(Projections.property("temp_name"));
             criteria.setProjection(proList);
             
             @SuppressWarnings("unchecked")
 			List<Object[]> result = criteria.list();
 			
 			for (Object[] master : result) {
				
 				CustomizeTemplateDto CustomizeTemplateLts = new CustomizeTemplateDto();

					if (master[0] != null)
						CustomizeTemplateLts.setIdCustomizeTemplate(Integer.parseInt(master[0]
								.toString()));
					
					if (master[1] != null)
						CustomizeTemplateLts.setTemp_name(master[1].toString());
					
				  listCustomizeTemplate.add(CustomizeTemplateLts);
				}
			}else {
				
				criteria.add(Restrictions.eq("idCustomizeTemplate", idCustomizeTemplate));
				criteria.addOrder(Order.asc("temp_name"));
				
				listCustomizeTemplate = criteria.list();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :" + e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :" + e.getStackTrace()[0].getLineNumber());
			
			return listCustomizeTemplate;
		}

		return listCustomizeTemplate;
	}

	@Override
	public synchronized int saveIvfOTNotesData(String listOTNotesList, String chkEditerdata, String queryType, HttpServletRequest request) {

		int OtNoteId = 0;
		int unitid = 0;

		try {

			// current login user id
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			System.err.println("idEhatOTOperationNotes----------------------"+listOTNotesList.toString());

			EhatOTOperationNotes ehatOTNotesDto = (EhatOTOperationNotes) ConfigUIJSONUtility.getObjectFromJSON(listOTNotesList,
					EhatOTOperationNotes.class);

			EhatOTOperationNotes ehatOTNotesDto2 = ehatOTNotesDto.getListOTNotes().get(0);
			

			Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(EhatOTOperationNotes.class);
			criteria2.setProjection(Projections.max("idEhatOTOperationNotes"));
			Integer unid1 = (Integer) criteria2.uniqueResult();

			// code for unit count...
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(EhatOTOperationNotes.class);
			criteria.setProjection(Projections.count("idEhatOTOperationNotes"));
			criteria.add(Restrictions.eq("unitId", ehatOTNotesDto.getUnitId()));
			List ltUnitMasters1 = criteria.list();

			Criteria Uncrite = sessionFactory.getCurrentSession().createCriteria(EhatOTOperationNotes.class);
			Uncrite.setProjection(Projections.property("unitId"));
			Uncrite.add(Restrictions.eq("idEhatOTOperationNotes", ehatOTNotesDto.getIdEhatOTOperationNotes()));
			Integer unid = (Integer) Uncrite.uniqueResult();

			if (ltUnitMasters1.get(0) != null) {
				long u1 = (Long) ltUnitMasters1.get(0);
				unitid = (int) u1;
			}

			if (queryType.equalsIgnoreCase("insert")) {
				unitid++;
				ehatOTNotesDto2.setCreatedBy(userId);
				ehatOTNotesDto2.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				ehatOTNotesDto2.setChkEditerdata(chkEditerdata);
				sessionFactory.getCurrentSession().merge(ehatOTNotesDto2);
				OtNoteId = maxCountOfColumn(EhatOTOperationNotes.class, "idEhatOTOperationNotes");

			} else if (queryType.equalsIgnoreCase("update")) {
				
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
				String todays_date = formatter.format(currentDate.getTime());

				EhatOTOperationNotes objectToUpdate = (EhatOTOperationNotes) sessionFactory.getCurrentSession().get(EhatOTOperationNotes.class,
						ehatOTNotesDto2.getIdEhatOTOperationNotes());
				
				
				objectToUpdate.setUpdatedTime(todays_date);
				objectToUpdate.setChkEditerdata(chkEditerdata);
				objectToUpdate.setComment(ehatOTNotesDto2.getComment());
				objectToUpdate.setEstimatedBLoodLoss(ehatOTNotesDto2.getEstimatedBLoodLoss());
				objectToUpdate.setInstrumentCount(ehatOTNotesDto2.getInstrumentCount());
				objectToUpdate.setMopCountRecordedBy(ehatOTNotesDto2.getMopCountRecordedBy());
				objectToUpdate.setTemplateID(ehatOTNotesDto2.getTemplateID());
				objectToUpdate.setRecordedBy(ehatOTNotesDto2.getRecordedBy());
				objectToUpdate.setActualBloodLoss(ehatOTNotesDto2.getActualBloodLoss());
				objectToUpdate.setStatus("N");
				
				System.err.println("idEhatOTOperationNotes----------------------"+objectToUpdate.getComment());
				
				// objectToUpdate
				sessionFactory.getCurrentSession().saveOrUpdate(objectToUpdate);

				OtNoteId = ehatOTNotesDto2.getIdEhatOTOperationNotes();

			}

		} catch (Exception e) {
			e.printStackTrace();
			OtNoteId = -1;
		}
		// returning OtNoteId Id
		return OtNoteId;
	}
	
	
	
	// Max value of any coloumn
		public int maxCountOfColumn(@SuppressWarnings("rawtypes") Class className, String columnName) {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(className)
					.setProjection(Projections.max(columnName));
			Integer OtNoteId = (Integer) criteria.uniqueResult();
			if (OtNoteId == null) {
				OtNoteId = 0;
			}
			return OtNoteId;
		}

		@Override
		public List<ProductMaster> lstProductMaster(String text) {
			 List<ProductMaster> list=new ArrayList<>();
			try {
			Criteria c=	  sessionFactory.getCurrentSession().createCriteria(ProductMaster.class);
			c.add(Restrictions.ilike("productName", text, MatchMode.START));
			list=c.list();
				
			}catch (Exception e) {
				
			}
			return list;
		}

	}
