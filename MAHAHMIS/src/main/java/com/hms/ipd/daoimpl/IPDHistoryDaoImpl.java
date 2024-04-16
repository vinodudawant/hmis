package com.hms.ipd.daoimpl;

import java.lang.invoke.MethodHandles;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.Beds;
import com.hms.administrator.dto.HospitalAccDetails;
import com.hms.dao.IPDNusringMedicationDashboardDAO;
import com.hms.doctordesk.dao.PrescriptionDao;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;
import com.hms.dto.BillComponent;
import com.hms.dto.CustomizeTemplate;
import com.hms.dto.DischargeProcess;
//import com.hms.dto.Beds;
import com.hms.dto.Doctor;
import com.hms.dto.Hall;
import com.hms.dto.HallWiseTestChargesDTO;
import com.hms.dto.IPDDischargePlanDTO;
import com.hms.dto.IpdConsentForm;
import com.hms.dto.IpdDoctors;
import com.hms.dto.ItemMaster;
import com.hms.dto.LabPkg;
import com.hms.dto.Labpkgpro;
import com.hms.dto.Labpkgprotestcomp;
import com.hms.dto.MLCDetail;
import com.hms.dto.Patient;
import com.hms.dto.PatientSponsredDetails;
import com.hms.dto.Treatment;
import com.hms.dto.TreatmentBeds;
import com.hms.dto.TreatmentNurses;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.CpoeOTdetails;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.DoctorRoundCharg;
import com.hms.ipd.dao.IPDHistoryDao;
import com.hms.ipd.dto.DoctorListDTO;
import com.hms.ipd.dto.DoctorRoundDTO;
import com.hms.ipd.dto.DoctorRoundSlaveDTO;
import com.hms.ipd.dto.DoctorRoundTempDTO;
import com.hms.ipd.dto.IndividualTreatmentInstructionIPD;
import com.hms.ipd.dto.PCTreatmentInstructionDTO;
import com.hms.ipd.dto.TreatmentTopicDTO;
import com.hms.ipd.utility.CommonBedsMagMethods;
import com.hms.opdbill.dto.PatientHeaderInfoDto;

@SuppressWarnings("unchecked")
@Repository
public class IPDHistoryDaoImpl implements IPDHistoryDao {

	private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());

	private @Autowired SessionFactory sessionFactory;
	private @Autowired CommonBedsMagMethods commonBedsMagMethods;
	
	private @Autowired PrescriptionDao prescriptionDao;

	@Override
	public OpdPatientDetailsDto getPatientInfoByTreatmentId(Integer treatmentId) {
		logger.info("IPDHistoryDaoImpl method getPatientInfoByTreatmentId for IPD called ");
		List<OpdPatientDetailsDto> lstOpdPatientDetailsDto = new ArrayList<OpdPatientDetailsDto>();
		OpdPatientDetailsDto obj = new OpdPatientDetailsDto();

		try {
			Query q = sessionFactory.getCurrentSession()
					.createSQLQuery("CALL sp_get_patient_info_by_treatment_id(:treatmentId)");
			q.setParameter("treatmentId", treatmentId);
			q.setResultTransformer(Transformers.aliasToBean(OpdPatientDetailsDto.class));
			lstOpdPatientDetailsDto = q.list();
			obj.setListOpdPatientDetailsDto(lstOpdPatientDetailsDto);

		} catch (Exception e) {
			e.printStackTrace();
			logger.info("IPDHistoryDaoImpl method getPatientInfoByTreatmentId  for IPD error: " + e);
		}
		return obj;

	}

	@Override
	public List<CpoeServdetails> fetchBillDetailsIPD(Integer tID, String callform, Integer servid) {
		logger.info("IPDHistoryDaoImpl method fetchBillDetailsIPD for IPD called ");

		List<CpoeServdetails> tlistbiilall = new ArrayList<CpoeServdetails>();

		try {

			if (callform.equalsIgnoreCase("coversheet")) {

				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CpoeServdetails.class);
				criteria.add(Restrictions.eq("treatmentid", tID));
				criteria.add(Restrictions.eq("serviceid", servid));
				criteria.setMaxResults(10);
				tlistbiilall = criteria.list();

			} else {

				// CpoeServdetails objCpoe = new CpoeServdetails();

				// String fetchId = "";
				// Calendar postDate = Calendar.getInstance();
				ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");

				int packageID = Integer.parseInt((String) resourceBundleEhat.getString("labHeadingID"));// 13
				int serviceId = Integer.parseInt((String) resourceBundleEhat.getString("packageID"));// 11
				int investigation = Integer.parseInt((String) resourceBundleEhat.getString("investigation"));// 12
				int casuality = Integer.parseInt((String) resourceBundleEhat.getString("casuality"));
				int physiotherapy = Integer.parseInt((String) resourceBundleEhat.getString("physiotherapy"));
				int otherservices = Integer.parseInt((String) resourceBundleEhat.getString("otherservices"));
				int radiationId = Integer.parseInt((String) resourceBundleEhat.getString("radiationId"));
				String sql = "select a.bill_details_id AS bill_details_id, a.emrPer AS emrPer, a.rate AS rate, a.treatment_id AS treatment_id, b.service_id AS service_id, b.service_name AS service_name, t.id AS id, a.drdesk_flag AS drdesk_flag, t.category_name AS category_name, t.charges AS category_charges, a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName, a.created_date_time AS created_date_time, a.paid_flag AS paid_flag, a.doctor_id AS doctor_id, a.clinical_notes AS clinical_notes, a.instructions AS instructions, a.created_date_time AS inserted_date_time ,a.deleted AS deleted,a.cancle AS cancel from (((ehat_bill_details a join ehat_subservice t ON (((t.service_id = a.service_id) and (t.id = a.sub_service_id)))) join ehat_service_master b ON ((b.service_id = t.service_id))) left join doctor ON ((doctor.Doctor_ID = a.doctor_id))) where (a.delete_from='B' or a.delete_from='-') and t.isCategory = 'N' and t.deleted = 'N'  and b.deleted = 'N' and t.service_id in("
						+ serviceId + "," + investigation + "," + packageID + "," + physiotherapy + "," + casuality
						+ "," + otherservices + "," + radiationId + ") and a.treatment_id='" + tID
						+ "' order by a.bill_details_id desc";
				logger.info("SQL query :" + sql);
				Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> result = query.list();
				for (Map<String, Object> row : result) {
					CpoeServdetails obj = new CpoeServdetails();
					obj.setBilldetailsid((Integer) row.get("bill_details_id"));
					obj.setTreatmentid((Integer) row.get("treatment_id"));
					obj.setServiceid((Integer) row.get("service_id"));
					obj.setPaid_flag((String) row.get("paid_flag"));
					obj.setDoctor_id((Integer) row.get("doctor_id"));
					obj.setClinical_notes((String) row.get("clinical_notes"));
					obj.setInstructions((String) row.get("instructions"));
					obj.setServicename((String) row.get("service_name"));
					obj.setCategoryid((Integer) row.get("id"));
					obj.setCategoryName((String) row.get("category_name"));
					obj.setCategorycharges((Double) row.get("category_charges"));
					obj.setQuantity(((Double) row.get("quantity")).intValue());
					obj.setDocName((String) row.get("docName"));
					obj.setInserted_date_time((Date) row.get("created_date_time"));
					obj.setEmrPer((Double) row.get("emrPer"));
					obj.setRate((Double) row.get("rate"));
					obj.setDeleted((String) row.get("deleted"));
					obj.setCancel((String) row.get("cancel"));

					java.util.Calendar cal = Calendar.getInstance();
					cal.setTime(obj.getInserted_date_time());
					cal.set(Calendar.HOUR_OF_DAY, 0);
					cal.set(Calendar.MINUTE, 0);
					cal.set(Calendar.SECOND, 0);
					cal.set(Calendar.MILLISECOND, 0);
					java.sql.Date sqlDate = new java.sql.Date(cal.getTime().getTime());

					obj.setCreated_date_time(sqlDate);
					tlistbiilall.add(obj);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.info("IPDHistoryDaoImpl method fetchBillDetailsIPD  for IPD error: " + e);
			return null;
		}

		return tlistbiilall;

	}

	@Override
	public Integer saveDoctorRound(Integer tid, String drs, String drrobj, String date, Integer treatmentbedid) {
		String[] DoctorTr = drs.split("@");

		int i = 0;
		for (String str : DoctorTr) {
			// String[] finalValues = str.split(",");
			String[] finalValues = str.split("~");
			if (i == 0) {

			} else {
				String drrId = finalValues[4];

				/*
				 * String
				 * sqlRef="select max(ID) from  treatment_beds  where Treatment_ID ="+tid; Query
				 * refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef); int
				 * trbedid= ((Number)refQuery.uniqueResult()).intValue();
				 */

				if (drrId.equals("undefined")) {

					Query query = sessionFactory.getCurrentSession().createSQLQuery(
							"insert into doctorroundreport(Treatment_ID,date,time,clinical_note,treatment,roundby,inv_adv,treatment_bed_id,template_val) values(:tid,:date,:time,"
									+ ":clinical_note, :treatment," + ":roundby,:inv_adv,"
									+ ":treatment_bed_id,:template_val)");
					query.setParameter("tid", tid);
					query.setParameter("date", date);
					query.setParameter("time", finalValues[0]);
					query.setParameter("clinical_note", finalValues[1]);
					query.setParameter("treatment", finalValues[2]);
					query.setParameter("roundby", finalValues[3]);
					query.setParameter("inv_adv", finalValues[4]);
					query.setParameter("treatment_bed_id", finalValues[5]);
					query.setParameter("template_val", finalValues[6]);
					query.executeUpdate();

				}
			}
			i++;
		}

		return null;
	}

	@Override
	public DoctorRoundDTO saveDoctorRounds(DoctorRoundDTO doctorRoundDTO) {
		logger.info("IPDHistoryDaoImpl method saveDoctorRounds for IPD called ");
		DoctorRoundDTO doctorRound = (DoctorRoundDTO) sessionFactory.getCurrentSession().merge(doctorRoundDTO);
		if (doctorRound.getDoctorRoundId() > 0) {
			logger.info(
					"Doctor round is greater than zero(0) and doctor round is:" + doctorRoundDTO.getDoctorRoundId());
			Boolean inserted = saveDrRoundIntoBilling(doctorRound);
			if (inserted)
				logger.info("Doctor round saved into the IPD billing");
			else
				logger.error("ERROR occured busing inserting Doctor roundinto the IPD billing");
		}
		return doctorRound;
	}

	private Boolean saveDrRoundIntoBilling(DoctorRoundDTO doctorRoundDTO) {
		logger.info("IPDHistoryDaoImpl method saveDrRoundIntoBilling for IPD called ");
		String sql = null;
		//DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		java.util.Calendar currentDate = java.util.Calendar.getInstance();

		try {
			PatientHeaderInfoDto ipdPatientDetails = getIpdPatientHeaderInfo(doctorRoundDTO.getTreatmentId(),doctorRoundDTO.getUnitId()).getListRegTreBillDto().get(0);
			for (DoctorRoundSlaveDTO doctorRoundSlave : doctorRoundDTO.getListDoctorRoundSlaveDTO()) {
				
				Integer doctorId = doctorRoundSlave.getDoctorId();
				String doctorType = (String) sessionFactory.getCurrentSession().createSQLQuery("select doc_type from doctor where Doctor_ID="+doctorId).uniqueResult();
						
				Integer corporateAccountId = ipdPatientDetails.getChargesMasterSlaveId();

				if ((!doctorType.equals("anesthetist")) && (!doctorType.equals("nurse"))) {

					/* sql = "select distinct sub_service_id from ehat_bill_details_ipd where treatment_id=:treatmentId and on_bed_flag='Y'and service_id=3";
					Integer bedId = (Integer) sessionFactory.getCurrentSession().createQuery(sql)
							.setParameter("treatmentId", doctorRoundDTO.getTreatmentId()).uniqueResult();

					HTypeHallBedTreatmentBedDTO hallBedTreatmentBedDTO = commonBedsMagMethods
							.fetchHTypeHallBedTreatmentBed(bedId, "N", "BED");
					List<DoctorRoundCharg> listDoctorRoundCharg = null;*/
					List<DoctorRoundCharg> listDoctorRoundCharg = null;

					if (corporateAccountId != 0) {
						listDoctorRoundCharg = sessionFactory.getCurrentSession().createCriteria(DoctorRoundCharg.class)
								.add(Restrictions.eq("dr_id", doctorId))
								.add(Restrictions.eq("hallslave_id", ((Number)ipdPatientDetails.getHallTypeId()).intValue()))
								.add(Restrictions.eq("sponserslave_id", ipdPatientDetails.getChargesMasterSlaveId()))
								.add(Restrictions.eq("drflag", "S")).list();

					} else {

						listDoctorRoundCharg = sessionFactory.getCurrentSession().createCriteria(DoctorRoundCharg.class)
								.add(Restrictions.eq("dr_id", doctorId))
								.add(Restrictions.eq("hallslave_id", ((Number)ipdPatientDetails.getHallTypeId()).intValue()))
								.add(Restrictions.eq("sponserslave_id", ipdPatientDetails.getChargesMasterSlaveId()))
								.add(Restrictions.eq("drflag", "H")).list();
					}
					Double charges = 0.0;
					HospitalAccDetails listHospitalAccount = null;
					if(listDoctorRoundCharg.size() > 0) {
						
						charges = (listDoctorRoundCharg.get(0) == null) ? 0.0 : listDoctorRoundCharg.get(0).getDr_amnt();
						listHospitalAccount = (HospitalAccDetails) sessionFactory.getCurrentSession()
								.get(HospitalAccDetails.class, 1);
					}

					sql = "SELECT if(doctorRoundFrom > doctorRoundTo,'Y','N') as count FROM hospitalaccinfo";
					String status = sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult().toString();
					String stringDRRTime = hhMMDateFormate(doctorRoundSlave.getTime().toString());
					if (status.equals("Y")) {
						// used sql query becz of where condition difficult to manage using hibernate
						// criteria
						sql = "select count(*) from hospitalaccinfo where (CAST( '" + stringDRRTime
								+ "' as time) >= doctorRoundFrom or CAST( '" + stringDRRTime
								+ "' as time) < doctorRoundTo) ";

					} else {
						sql = "select count(*) from hospitalaccinfo where CAST( '" + stringDRRTime
								+ "' as time) BETWEEN CAST(doctorRoundFrom as time) AND CAST(doctorRoundTo as time)";
					}

					Integer emergencyTimeFlag = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();
					Double fee = charges;
					Double doctorRoundCharges = 0.0;
					Double doctorRoundhallCharges = 0.0;
					if (emergencyTimeFlag != 0) {
						
						if(listHospitalAccount != null) {
						
							float perAmt = listHospitalAccount.getDoctorRoundChargesAfterRoundTime();
							doctorRoundCharges = fee + ((fee * perAmt) / 100);
							doctorRoundhallCharges = charges + ((charges * perAmt) / 100);
						}else {
							doctorRoundCharges = fee;
							doctorRoundhallCharges = charges;
						}
						
					} else {
						doctorRoundCharges = fee;
						doctorRoundhallCharges = charges;
					}
					int sponserid = 0;
					if (ipdPatientDetails.getChargesMasterSlaveId() > 0) {
						sponserid = 1;
					}
					
					 Criteria c=sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
                	 c.add(Restrictions.eq("doctorRoundSlaveId", doctorRoundSlave.getDoctorRoundSlaveId()));
                	 List<BillDetailsIpdDto> list=c.list();
                	 BillDetailsIpdDto billDetailsIpdD = null;
                	 if(list.size() > 0) {
                		  billDetailsIpdD =list.get(0);
                	 }else {
                		 billDetailsIpdD=new BillDetailsIpdDto();
                	 }
                	
                      if(billDetailsIpdD.getTreatmentId() ==0) {
                    	 billDetailsIpdD.setBillDetailsId(0);
					billDetailsIpdD.setRate(doctorRoundhallCharges);
					billDetailsIpdD.setDepartmentId(2);
					billDetailsIpdD.setTreatmentId(doctorRoundDTO.getTreatmentId());
					billDetailsIpdD.setAmount(doctorRoundhallCharges);
					billDetailsIpdD.setBillId(ipdPatientDetails.getBillId());
					billDetailsIpdD.setCoPay(doctorRoundhallCharges);
					billDetailsIpdD.setCreatedBy(doctorRoundDTO.getCreatedBy());
					billDetailsIpdD.setCreatedDateTime(currentDate.getTime());
					billDetailsIpdD.setQuantity(1);
					billDetailsIpdD.setPay(doctorRoundCharges);
					billDetailsIpdD.setDoctorId(doctorId);
					billDetailsIpdD.setSubServiceId(1);
					billDetailsIpdD.setServiceId(5);
					billDetailsIpdD.setDrdeskflag("R");
					billDetailsIpdD.setPatienttId(ipdPatientDetails.getPatientId());
					billDetailsIpdD.setOnBedFlag('N');
					billDetailsIpdD.setOtherAmount(doctorRoundCharges);
					billDetailsIpdD.setOtherPay(doctorRoundCharges);
					billDetailsIpdD.setOtherRate(doctorRoundCharges);
					billDetailsIpdD.setChargesSlaveId(ipdPatientDetails.getChargesMasterSlaveId());
					billDetailsIpdD.setSponsorId(sponserid);
					billDetailsIpdD.setDoctorRoundSlaveId(doctorRoundSlave.getDoctorRoundSlaveId());
					//sessionFactory.getCurrentSession().save(billDetailsIpdD);
					sessionFactory.getCurrentSession().merge(billDetailsIpdD);
                     }else {

                    	
					/*billDetailsIpdD.setRate(doctorRoundhallCharges);
					billDetailsIpdD.setDepartmentId(2);
					billDetailsIpdD.setTreatmentId(doctorRoundDTO.getTreatmentId());
					billDetailsIpdD.setAmount(doctorRoundhallCharges);
					billDetailsIpdD.setBillId(ipdPatientDetails.getBillId());
					billDetailsIpdD.setCoPay(doctorRoundhallCharges);
					billDetailsIpdD.setCreatedBy(doctorRoundDTO.getCreatedBy());
					billDetailsIpdD.setUpdatedDateTime(currentDate.getTime());
					billDetailsIpdD.setQuantity(1);
					billDetailsIpdD.setPay(doctorRoundCharges);
					billDetailsIpdD.setDoctorId(doctorId);
					billDetailsIpdD.setSubServiceId(1);
					billDetailsIpdD.setServiceId(5);
					billDetailsIpdD.setDrdeskflag("R");
					billDetailsIpdD.setPatienttId(ipdPatientDetails.getPatientId());
					billDetailsIpdD.setOnBedFlag('N');
					billDetailsIpdD.setOtherAmount(doctorRoundCharges);
					billDetailsIpdD.setOtherPay(doctorRoundCharges);
					billDetailsIpdD.setOtherRate(doctorRoundCharges);
					billDetailsIpdD.setChargesSlaveId(ipdPatientDetails.getChargesMasterSlaveId());
					billDetailsIpdD.setSponsorId(sponserid);
					billDetailsIpdD.setDoctorRoundSlaveId(doctorRoundSlave.getDoctorRoundSlaveId());
					*/
					
                    billDetailsIpdD.setUpdatedBy(doctorRoundDTO.getCreatedBy());
					billDetailsIpdD.setUpdatedDateTime(currentDate.getTime());
					//sessionFactory.getCurrentSession().save(billDetailsIpdD);
					sessionFactory.getCurrentSession().merge(billDetailsIpdD);
                     
                     }
				} // Not nurse and anesthetist
			}
			return true;
		} catch (HibernateException e) {
			logger.info("Error occured during inserting doctor round into Billing:" + e.getMessage());
			return false;
		}
	}

	@Override
	public List<DoctorRoundDTO> fetchDoctorRounds(Integer treatmentId, Integer unitId) {
		logger.info("IPDHistoryDaoImpl method fetchDoctorRounds for IPD called ");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundDTO.class);
		criteria.add(Restrictions.eq("treatmentId", treatmentId));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.setFetchMode("listDoctorRoundSlaveDTO", FetchMode.SELECT);
		List<DoctorRoundDTO> list = criteria.list();
		return list;
	}

	@Override
	public List<DoctorListDTO> fetchDoctorList(Integer unitId) {
		logger.info("IPDHistoryDaoImpl method fetchDoctorList for IPD called ");
		try {
			// Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL
			// sp_get_fetch_doctor_list(:unitId)");
			// query.setParameter("unitId", unitId);
			Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_fetch_doctor_list()");
			query.setResultTransformer(Transformers.aliasToBean(DoctorListDTO.class));
			return query.list();

		} catch (Exception e) {
			e.printStackTrace();
			logger.info("IPDHistoryDaoImpl method getPatientInfoByTreatmentId  for IPD error: " + e);
			return null;
		}
	}

	@Override
	public List<DoctorRoundTempDTO> fetchDoctorRoundTemplate(Integer unitId) {
		logger.info("IPDHistoryDaoImpl method fetchDoctorRoundTemplate for IPD called ");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundTempDTO.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		// criteria.add(Restrictions.eq("unitId", unitId));
		return criteria.list();
	}
	
	@Override
	public List<DoctorRoundTempDTO> SearchDoctorRoundTemplate(String tempName) {
		
		List<DoctorRoundTempDTO> list = new ArrayList<>();
		logger.info("IPDHistoryDaoImpl method SearchDoctorRoundTemplate for IPD called ");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundTempDTO.class);
		criteria.add(Restrictions.like("tempName", "%"+tempName+"%",MatchMode.START));
		criteria.add(Restrictions.eq("deleted", "N"));
		 list =criteria.list();
		return list;
	}

	@Override
	public String deleteDoctorRoundIPD(Integer unitId, String doctorSlaveIds) {
		logger.info("IPDHistoryDaoImpl method deleteDoctorRoundIPD for IPD called ");
		
		/*
		 * String hql = "delete from ehat_doctor_round_slave drs where drs.unit_id=" +
		 * unitId + " and drs.doctor_round_slave_id IN (" + doctorSlaveIds + ")";
		 */
		try {
		String hql="Update DoctorRoundSlaveDTO set deleted='Y' where doctorRoundSlaveId in ('"+doctorSlaveIds+"')";
		Query query=sessionFactory.getCurrentSession().createQuery(hql);
		int rowDeleted = query.executeUpdate();
		String hql1="Update BillDetailsIpdDto set deleted='Y' where doctorRoundSlaveId in ('"+doctorSlaveIds+"')";
		Query query1=sessionFactory.getCurrentSession().createQuery(hql1);
		query1.executeUpdate();
		//Query query = sessionFactory.getCurrentSession().createSQLQuery(hql);
	
		 

		if (rowDeleted > 0)
			return "Doctor Rounds Deleted!";
		else
			return "Issue while deleting Doctor Rounds!";
		}catch (Exception e) {
			e.printStackTrace();
			return "Issue while deleting Doctor Rounds!";
		}
	}

	@Override
	public List<PCTreatmentInstructionDTO> fetchPCTreatmentInstruction(Integer treatmentId) {
		try {
			logger.info("IPDHistoryDaoImpl method fetchPCTreatmentInstruction for IPD called ");
			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery("CALL sp_fetchPCTreatmentInstruction(:treatmentId)");
			query.setParameter("treatmentId", treatmentId);
			query.setResultTransformer(Transformers.aliasToBean(PCTreatmentInstructionDTO.class));
			return query.list();

		} catch (Exception e) {
			e.printStackTrace();
			logger.error("IPDHistoryDaoImpl method fetchPCTreatmentInstruction  for IPD error: " + e);
			return null;
		}

	}

	@Override
	public List<TreatmentTopicDTO> fetchAllTreatmentTopic(String action, String pageName, Integer unitId) {
		logger.info("IPDHistoryDaoImpl method fetchAllTreatmentTopic for IPD called ");
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TreatmentTopicDTO.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			return criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Error inside fetchAllTreatmentTopic:" + e);
			return null;
		}
	}

	@Override
	public List<IndividualTreatmentInstructionIPD> fetchIndividualTreatmentInstructionIPD(Integer treatmentId) {
		logger.info("IPDHistoryDaoImpl method fetchIndividualTreatmentInstructionIPD for IPD called ");
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IndividualTreatmentInstructionIPD.class);
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			return criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Error inside fetchIndividualTreatmentInstructionIPD:" + e);
			return null;
		}
	}

	private String hhMMDateFormate(String time) {
		logger.info("IPDHistoryDaoImpl method hhMMDateFormate for IPD called ");
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
		SimpleDateFormat parseFormat = new SimpleDateFormat("hh:mm");
		Date drrtime = null;
		try {
			drrtime = parseFormat.parse(time);
			return sdf.format(drrtime);
		} catch (ParseException e) {
			e.printStackTrace();
			return "00:00";
		}

	}

	@Override
	public List<Patient> displayTopPat(String intPatId, String page_name, String userID, String type, String value,
			String searchBy) {
		logger.info("IPDHistoryDaoImpl method displayTopPat for IPD called ");

		String sql = "";
		String sqlForDocType = "Select doc_Type from doctor where Doctor_ID = " + userID;
		String doc_Type = (String) sessionFactory.getCurrentSession().createSQLQuery(sqlForDocType).uniqueResult();

		if (null != page_name && page_name.equals("ipd_bedward_patR")) {
			if (!intPatId.equalsIgnoreCase("0")) {
				sql = "select p.*,t.*,b.*,h.*,bd.* from  patient p,treatment t,treatment_beds b,hall h,beds bd where  p.Patient_ID = t.Patient_ID  AND  t.Treatment_ID = b.Treatment_ID And t.TFlag='ACTIVE' AND h.Hall_ID=bd.Hall_ID and b.Bed_ID=bd.Bed_ID and b.status='Y' and b.bedAllocatedFor='R'  and p.Patient_ID="
						+ intPatId;
			} else {
				sql = "select p.*,t.*,b.*,h.*,bd.* from patient p, treatment t,treatment_beds b,hall h,beds bd where  p.Patient_ID = t.Patient_ID AND t.Treatment_ID = b.Treatment_ID AND b.Bed_ID = bd.Bed_ID And t.TFlag='ACTIVE' AND h.Hall_ID=bd.Hall_ID and b.status='Y' and b.bedAllocatedFor='R' LIMIT 15";
			}
		} else if (page_name.equals("databaseForConsentForm")) {

			if (type.equals("onload")) {
				sql = "select p.*,t.*,b.*,h.*,bd.* from patient p, treatment t,treatment_beds b,hall h,beds bd where  p.Patient_ID = t.Patient_ID AND t.Treatment_ID = b.Treatment_ID AND b.Bed_ID = bd.Bed_ID And t.TFlag='ACTIVE' AND h.Hall_ID=bd.Hall_ID and b.status='Y' and b.bedAllocatedFor='P' LIMIT 15";
			} else {
				if (searchBy.equals("byName")) {

					String nsql = "select p.*,t.*,b.*,h.*,bd.* from  patient p,treatment t,treatment_beds b,hall h,beds bd where  p.Patient_ID = t.Patient_ID  AND  t.Treatment_ID = b.Treatment_ID And t.TFlag='ACTIVE' AND h.Hall_ID=bd.Hall_ID and b.Bed_ID=bd.Bed_ID and b.status='Y' and b.bedAllocatedFor='P' ";

					String TempValue = value;
					String[] NewValue = TempValue.split(" ");
					int len = NewValue.length;
					String strValue = "";
					if (len == 1) {
						strValue = NewValue[0];
						sql = nsql + " AND (p.fName like" + "'" + strValue + "%' || p.mName like" + "'" + strValue
								+ "%' || p.lName like" + "'" + strValue + "%')";
					} else {
						strValue = "";
						len = NewValue.length;
						if (len == 2) {
							sql = nsql + " AND (p.fName like" + "'" + NewValue[0] + "%' && p.lName like" + "'"
									+ NewValue[1] + "%')";
						} else {
							sql = nsql + " AND (p.fName like" + "'" + NewValue[0] + "%' && p.mName like" + "'"
									+ NewValue[1] + "%' && p.lName like" + "'" + NewValue[2] + "%')";
						}
					}

				} else {
					sql = "select p.*,t.*,b.*,h.*,bd.* from  patient p,treatment t,treatment_beds b,hall h,beds bd where  p.Patient_ID = t.Patient_ID  AND  t.Treatment_ID = b.Treatment_ID And t.TFlag='ACTIVE' AND h.Hall_ID=bd.Hall_ID and b.Bed_ID=bd.Bed_ID and b.status='Y' and b.bedAllocatedFor='P'  And p.Patient_ID="
							+ value;
				}
			}

		} else {
			if (!intPatId.equalsIgnoreCase("0")) {
				sql = "select p.*,t.*,b.*,h.*,bd.* from  patient p,treatment t,treatment_beds b,hall h,beds bd where  p.Patient_ID = t.Patient_ID  AND  t.Treatment_ID = b.Treatment_ID And t.TFlag='ACTIVE' AND h.Hall_ID=bd.Hall_ID and b.Bed_ID=bd.Bed_ID and b.status='Y' and b.bedAllocatedFor='P'  And p.Patient_ID="
						+ intPatId;
			} else {
				if (doc_Type.equals("doctor")) {
					sql = "select p.*,t.*,h.*,bd.*,b.ID,b.Bed_ID,b.In_Time,b.isolation,b.bedAllocatedFor from patient p, treatment t,treatment_beds b,hall h,beds bd,ipd_treatment_doctors ipdtd where  p.Patient_ID = t.Patient_ID AND t.Treatment_ID = b.Treatment_ID and t.Treatment_ID = ipdtd.treatmentId AND b.Bed_ID = bd.Bed_ID And t.TFlag='ACTIVE' AND h.Hall_ID=bd.Hall_ID and b.status='Y' and b.bedAllocatedFor='P' and ipdtd.doctor_id = "
							+ userID + " order by p.Patient_ID DESC LIMIT 15";
				} else {
					sql = "select p.*,t.*,h.*,bd.*,b.ID,b.Bed_ID,b.In_Time,b.isolation,b.bedAllocatedFor from patient p, treatment t,treatment_beds b,hall h,beds bd where  p.Patient_ID = t.Patient_ID AND t.Treatment_ID = b.Treatment_ID AND b.Bed_ID = bd.Bed_ID And t.TFlag='ACTIVE' AND h.Hall_ID=bd.Hall_ID and b.status='Y' and b.bedAllocatedFor='P' group by p.Patient_ID order by p.Patient_ID DESC";
				}
			}
		}

		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> patientDetails = query.list();
		List arrPatient = fetchPatientDetails2(patientDetails);
		return arrPatient;

	}

	public List<Patient> fetchPatientDetails2(List<Map<String, Object>> patientDetails) {
		logger.info("IPDHistoryDaoImpl method fetchPatientDetails2 for IPD called ");

		List<Patient> arrTopPat = new ArrayList<Patient>();
		for (Map rs : patientDetails) {
			TreatmentBeds objTreatmentBeds = new TreatmentBeds();
			Beds objBeds = new Beds();
			Patient objpatientDetails = new Patient();
			Treatment objTreatment = new Treatment();
			Hall objhHall = new Hall();

			objpatientDetails.setCenterPatientId((String) rs.get("center_patient_id"));
			objpatientDetails.setAddressLine1((String) rs.get("addressLine1"));
			objpatientDetails.setAddressLine2((String) rs.get("addressLine2"));
			objpatientDetails.setAddressLine3((String) rs.get("addressLine3"));
			objpatientDetails.setAddressLine10((String) rs.get("addressLine7"));
			objpatientDetails.setAddressLine4((String) rs.get("addressLine4"));
			objpatientDetails.setAddressLine5((String) rs.get("addressLine5"));
			objpatientDetails.setAddressLine6((String) rs.get("addressLine6"));

			if (!objpatientDetails.getAddressLine3().equals("0")) {

				String QueryForAddress = "SELECT c.city_name, t.taluka_name, d.dis_name,s.state_name "
						+ "FROM city c inner join taluka t ON c.taluka_id = t.idtaluka "
						+ "inner join district d on t.district_id = d.iddistrict inner join state s "
						+ "on d.state_id = s.idstate where c.idcity ='" + objpatientDetails.getAddressLine3() + "'";

				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(QueryForAddress);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> patientAddressDetails = query.list();

				for (Map<String, Object> map1 : patientAddressDetails) {
					String cityName = (String) map1.get("city_name");
					String taluka_name = (String) map1.get("taluka_name");
					String dis_name = (String) map1.get("dis_name");
					objpatientDetails.setCityAddress(cityName);
					objpatientDetails.setTalukaAddress(taluka_name);
					objpatientDetails.setDistrictAddress(dis_name);
				}
			}
			if (objpatientDetails.getAddressLine3().equals("0") && !objpatientDetails.getAddressLine10().equals("0")) {
				String QueryForAddress = "SELECT t.taluka_name, d.dis_name,s.state_name "
						+ "FROM  taluka t inner join district d on t.district_id = d.iddistrict inner join state s "
						+ "on d.state_id = s.idstate where t.idtaluka ='" + objpatientDetails.getAddressLine10() + "'";

				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(QueryForAddress);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> patientAddressDetails = query.list();

				for (Map<String, Object> map1 : patientAddressDetails) {
					String taluka_name = (String) map1.get("taluka_name");
					String dis_name = (String) map1.get("dis_name");

					objpatientDetails.setTalukaAddress(taluka_name);

					objpatientDetails.setDistrictAddress(dis_name);
				}
			} else {
				if (objpatientDetails.getAddressLine3().equals("0") && objpatientDetails.getAddressLine10().equals("0")
						&& !objpatientDetails.getAddressLine4().equals("0")) {
					String QueryForAddress = "SELECT d.dis_name,s.state_name " + "FROM district d inner join state s "
							+ "on d.state_id = s.idstate where d.iddistrict ='" + objpatientDetails.getAddressLine4()
							+ "'";

					SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(QueryForAddress);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> patientAddressDetails = query.list();

					for (Map<String, Object> map1 : patientAddressDetails) {
						String dis_name = (String) map1.get("dis_name");

						objpatientDetails.setDistrictAddress(dis_name);
					}
				}
			}

			objpatientDetails.setAge((String) rs.get("age"));
			objpatientDetails.setHeight((Double) rs.get("height"));
			objpatientDetails.setMonth((String) rs.get("month"));
			objpatientDetails.setDays((String) rs.get("days"));
			objpatientDetails.setBmi((Double) rs.get("bmi"));

			objpatientDetails.setBloodGroup((String) rs.get("bloodGroup"));
			objpatientDetails.setDob((String) rs.get("dob"));
			objpatientDetails.setEmergencyContactDetails((String) rs.get("emergencyContactDetails"));
			objpatientDetails.setfName((String) rs.get("fName"));
			objpatientDetails.setlName((String) rs.get("lName"));
			objpatientDetails.setmName((String) rs.get("mName"));
			objpatientDetails.setMobile((String) rs.get("mobile"));
			objpatientDetails.setNationality((String) rs.get("nationality"));
			objpatientDetails.setPassportNo((String) rs.get("passport_no"));
			objpatientDetails.setVisa((String) rs.get("visa"));
			objpatientDetails.setLanguage((String) rs.get("language"));
			objpatientDetails.setIdentity((String) rs.get("identity"));
			objpatientDetails.setIdentifnNo((String) rs.get("identificn_no"));
			objpatientDetails.setOccupation((String) rs.get("occupation"));
			objpatientDetails.setEducation((String) rs.get("education"));
			objpatientDetails.setAnnIncm((String) rs.get("annual_income"));
			objpatientDetails.setmStatus((String) rs.get("status"));
			objpatientDetails.setOfficeNumber((String) rs.get("officeNumber"));
			objpatientDetails.setPatient_ID((Integer) rs.get("Patient_ID"));
			objpatientDetails.setRelative_name((String) rs.get("relative_name"));
			objpatientDetails.setMrNo((String) rs.get("mr_no"));

			if (null != ((Integer) rs.get("sp_dic_master_id"))) {
				objpatientDetails.setSdiscount((Integer) rs.get("sp_dic_master_id"));
				int sdiscount = (Integer) rs.get("sp_dic_master_id");
				objpatientDetails.setSdiscountNm(fetchSdiscountNm(sdiscount));
			}

			objpatientDetails.setSex((String) rs.get("sex"));

			String referById = (String) rs.get("referedBy");

			if (null != referById && !referById.equals("") && !referById.equals("select")) {
				objpatientDetails.setRefby(findRefDocNameById(referById));
			} else {
				String referBysrc = (String) rs.get("ref_by_source");

				if (null != referBysrc && !referBysrc.equals("") && !referBysrc.equals("select")
						&& !referBysrc.equals("doctor")) {
					objpatientDetails.setRefby((String) rs.get("ref_by_source_name") + " (" + referBysrc + ")");
				} else {
					objpatientDetails.setRefby("Self");
				}

			}
			objpatientDetails.setRefByMob((String) rs.get("refByMob"));
			objpatientDetails.setRefto((String) rs.get("referedTo"));
			objpatientDetails.setWeight((String) rs.get("weight"));
			objpatientDetails.setSymptoms((String) rs.get("symptoms"));
			objpatientDetails.setmStatus((String) rs.get("mStatus"));
			objpatientDetails.setTreatment_id((Integer) rs.get("Treatment_ID"));
			objTreatment.setTreatment_ID((Integer) rs.get("Treatment_ID"));

			// payment and relative contact details
			objTreatment.setTypeOfPayment((String) rs.get("payment_type"));
			objTreatment.setPaymentPerName((String) rs.get("payment_person_name"));
			objTreatment.setRelAge((String) rs.get("rel_age"));
			objTreatment.setRelSex((String) rs.get("rel_sex"));
			objTreatment.setRelRelation((String) rs.get("rel_relation"));
			objTreatment.setRelAddress((String) rs.get("rel_address"));
			objTreatment.setRelMobile((String) rs.get("rel_mobile"));
			int companyName = (Integer) rs.get("sp_dic_master_id");
			if (companyName != 0) {
				objTreatment.setSelCompany(fetchSdiscountCompanyName(companyName));
			}

			objTreatment.setInsuranceCmpny((String) rs.get("insurance_company"));
			objTreatment.setMemoNo((String) rs.get("memo_no"));
			objTreatment.setPopup_container4((String) rs.get("memo_date"));
			objTreatment.setCashlessPolicyNo((String) rs.get("policy_id"));
			objTreatment.setCnnnNo((String) rs.get("cnn_no"));
			// end payment details

			objTreatment.setTstartDate((String) rs.get("TstartDate"));
			objTreatment.setTreatmentCount((String) rs.get("treatmentCount"));

			objTreatment.setBillCategory(((Integer) rs.get("bill_category")).toString());
			if (((Integer) rs.get("bill_category")) != 0) {
				String sql_for_category_name = "Select category_name from ehat_bill_discount_category_master where id_category_master = "
						+ ((Integer) rs.get("bill_category"));
				String category_name = (String) sessionFactory.getCurrentSession().createSQLQuery(sql_for_category_name)
						.uniqueResult();

				objTreatment.setBillCategory_Name(category_name);
			} else {
				objTreatment.setBillCategory_Name("Self");
			}

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			SimpleDateFormat parseFormat = new SimpleDateFormat("yyyy-MM-dd");
			java.util.Date date = null;

			if (null != (String) rs.get("intime")) {
				objTreatment.setIntime((String) rs.get("intime"));
			}

			String sql = "select count(*) from ipd_patient_discharge_summary where treatmentId=:tid and patientId=:pid";
			int count1 = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql)
					.setParameter("tid", (Integer) rs.get("Treatment_ID"))
					.setParameter("pid", (Integer) rs.get("Patient_ID")).uniqueResult()).intValue();

			if (count1 > 0) {
				sql = "select discharge_date,discharge_time from ipd_patient_discharge_summary where treatmentId=:tid and patientId=:pid";
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql)
						.setParameter("tid", (Integer) rs.get("Treatment_ID"))
						.setParameter("pid", (Integer) rs.get("Patient_ID"));

				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> ipdDis = query.list();

				for (Map rs1 : ipdDis) {

					try {
						date = parseFormat.parse((String) rs1.get("discharge_date"));
					} catch (ParseException e) {
						e.printStackTrace();
					}
					String stringDRRDate = sdf.format(date);

					objTreatment.setTendDate(stringDRRDate);
					objTreatment.setOuttime((String) rs1.get("discharge_time"));
				}
			} else {
				if (null != (String) rs.get("TendDate")) {
					try {
						date = parseFormat.parse((String) rs.get("TendDate"));
					} catch (ParseException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					String stringDRRDate = sdf.format(date);
					objTreatment.setTendDate(stringDRRDate);
				}
				if (null != (String) rs.get("outtime") && !((String) rs.get("outtime")).equals("0000-00-00 00:00:00")) {

					objTreatment.setOuttime((String) rs.get("outtime"));
				}
			}

			sql = "select count(*) from discharge_summery where Treatment_ID=" + (Integer) rs.get("Treatment_ID");
			int count2 = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult())
					.intValue();

			if (count2 > 0) {
				sql = "select discharge_date,discharge_time from discharge_summery where Treatment_ID="
						+ (Integer) rs.get("Treatment_ID");
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> ipdDis = query.list();

				for (Map rs1 : ipdDis) {
					try {
						date = parseFormat.parse((String) rs1.get("discharge_date"));
					} catch (ParseException e) {
						e.printStackTrace();
					}
					String stringDRRDate = sdf.format(date);

					objTreatment.setTendDate(stringDRRDate);
					objTreatment.setOuttime((String) rs1.get("discharge_time"));
				}

			} else {
				if (null != (String) rs.get("TendDate")) {
					try {
						date = parseFormat.parse((String) rs.get("TendDate"));
					} catch (ParseException e) {
						e.printStackTrace();
					}
					String stringDRRDate = sdf.format(date);
					objTreatment.setTendDate(stringDRRDate);
				}
				if (null != (String) rs.get("outtime") && !((String) rs.get("outtime")).equals("0000-00-00 00:00:00")) {

					objTreatment.setOuttime((String) rs.get("outtime"));
				}
			}

			Doctor objDoc = new Doctor();
			sql = "select d.doc_name,d.Doctor_ID from ipd_treatment_doctors itd,doctor d where d.Doctor_ID=itd.doctor_id and itd.treatmentId="
					+ objTreatment.getTreatment_ID() + " LIMIT 1";
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> docDetails = query.list();

			String doctorName = "";
			for (Map rs1 : docDetails) {
				objDoc.setDoc_name((String) rs1.get("doc_name"));
				objDoc.setDoctor_ID((Integer) rs1.get("Doctor_ID"));
				doctorName = doctorName + "," + ((String) rs1.get("doc_name"));
			}
			// admit under doc_name
			objTreatment.setBedridden(doctorName);
			objpatientDetails.setObjDoc(objDoc);

			List<IpdDoctors> liIpdDoctors = new ArrayList<IpdDoctors>();

			sql = "select ipd_doc.*,doc_name from ipd_treatment_doctors ipd_doc,doctor where ipd_doc.doctor_id=doctor.Doctor_ID and ipd_doc.treatmentId="
					+ objpatientDetails.getTreatment_id() + " and ipd_doc.status='Y'";
			query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> ipdDoctors = query.list();

			for (Map rs1 : ipdDoctors) {

				try {
					IpdDoctors doctor = new IpdDoctors();
					doctor.setIpdDoctorId((Integer) rs1.get("doctor_id"));
					doctor.setDocName((String) rs1.get("doc_name"));

					String sqlForDept = "select ha.department_name from hospital_departments ha,doctor d where d.department = ha.idhospital_departments and d.Doctor_ID = "
							+ (Integer) rs1.get("doctor_id");
					String department_name = (String) sessionFactory.getCurrentSession().createSQLQuery(sqlForDept)
							.uniqueResult();

					doctor.setDepartment(department_name);

					liIpdDoctors.add(doctor);

				} catch (Exception e) {
					e.printStackTrace();
					e.getMessage();
				}
			}
			objpatientDetails.setObjIPDDoctorList(liIpdDoctors);
			// objTreatment.setDocter_id();
			objpatientDetails.setObjTreatment(objTreatment);

			objTreatmentBeds.setBed_ID((Integer) rs.get("Bed_ID"));
			objTreatmentBeds.setiD((Integer) rs.get("ID"));
			objTreatmentBeds.setCharges(((Timestamp) rs.get("in_Time")).toString());
			objTreatmentBeds.setBedAllocatedFor((String) rs.get("bedAllocatedFor"));
			objTreatmentBeds.setStrDate((String) rs.get("In_Time").toString());

			objBeds.setHall_ID((Integer) rs.get("Hall_ID"));
			objBeds.setBed_ID((Integer) rs.get("Bed_ID"));
			objBeds.setBed_name((String) rs.get("bed_name"));
			objBeds.setIsolation((String) rs.get("isolation"));

			if (null != ((String) rs.get("Hname"))) {
				objhHall.setHname((String) rs.get("Hname"));
				objhHall.setHtype((String) rs.get("Htype"));
				String htypeid = (String) rs.get("Htype");

				objhHall.setHtypeName(findHallTypeNameById(htypeid));
			}
			objpatientDetails.setObjHall(objhHall);
			objpatientDetails.setObjBeds(objBeds);
			objpatientDetails.setObjTreatmentBeds(objTreatmentBeds);
			objpatientDetails.setImg((String) rs.get("img"));

			objpatientDetails.setFiles_name((String) rs.get("files_name"));
			objpatientDetails.setFiles_path((String) rs.get("files_path"));
			objpatientDetails.setTitle((String) rs.get("title"));
			objpatientDetails.setAgeType((String) rs.get("ageType"));
			objpatientDetails.setAdmit_under((String) rs.get("admit_under"));

			List<MLCDetail> listMlcDetails = new ArrayList<MLCDetail>();
			sql = "select * from mlc_details where Treatment_ID=" + objTreatment.getTreatment_ID();

			query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> mlcDetail = query.list();

			for (Map<String, Object> rs2 : mlcDetail) {
				MLCDetail objMLCDetail = new MLCDetail();
				objMLCDetail.setMlc_no((String) rs2.get("mlc_no"));
				objMLCDetail.setAuthority_name((String) rs2.get("authority_name"));
				objMLCDetail.setBuccle_no((String) rs2.get("buccle_no"));
				objMLCDetail.setFir_no((String) rs2.get("fir_no"));
				objMLCDetail.setIdmlc_details((Integer) rs2.get("idmlc_details"));
				objMLCDetail.setPolice_st_add((String) rs2.get("police_st_add"));
				objMLCDetail.setPolice_st_name((String) rs2.get("police_st_name"));

				objMLCDetail.setIncidentDetails((String) rs2.get("incidentDetails"));

				listMlcDetails.add(objMLCDetail);
			}
			String getoprdate = "select  date from treatment_operations where Treatment_ID="
					+ objTreatment.getTreatment_ID() + " and opStatus='Y' ";
			query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(getoprdate);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> dateDetails = query.list();

			String operationDate = "";
			int count = 0;
			String countsql = "select count(date) from treatment_operations where Treatment_ID="
					+ objTreatment.getTreatment_ID() + " and opStatus='Y' ";
			int count_id = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(countsql).uniqueResult())
					.intValue();

			for (Map r : dateDetails) {
				if (count > 1)
					operationDate += "," + (String) r.get("date");
				else
					operationDate += (String) r.get("date");

			}

			objpatientDetails.setRegDate(operationDate);
			objpatientDetails.setListMlcDetails(listMlcDetails);

			List<PatientSponsredDetails> listPatientSponsredDetails = new ArrayList<PatientSponsredDetails>();
			try {

				sql = "select * from patient_sponsored_details where status='Y' and patient_id="
						+ objpatientDetails.getPatient_ID() + " and sponsred_name_id="
						+ objpatientDetails.getSdiscount() + " group by sponsred_name_id";

				query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> mapPatientSponsredDetails = query.list();

				PatientSponsredDetails objPatientSponsredDetails = new PatientSponsredDetails();
				if (mapPatientSponsredDetails.size() != 0) {
					for (Map sponsredMap : mapPatientSponsredDetails) {
						// PatientSponsredDetails objPatientSponsredDetails =
						// new PatientSponsredDetails();

						objPatientSponsredDetails.setSponseredNameId((Integer) sponsredMap.get("sponsred_name_id"));
						if ((sponsredMap.get("company_name_id")).equals("null")) {
							objPatientSponsredDetails.setCompanyNameId(0);
						} else {
							objPatientSponsredDetails.setCompanyNameId((Integer) sponsredMap.get("company_name_id"));
						}
						objPatientSponsredDetails.setSponsoredTypeId((Integer) sponsredMap.get("sponsred_type_id"));
						if (objPatientSponsredDetails.getSponseredNameId() != 0) {
							sql = "select name from sp_dic_master where sp_dic_master_id="
									+ objPatientSponsredDetails.getSponseredNameId();
							String sponsredName = (String) sessionFactory.getCurrentSession().createSQLQuery(sql)
									.uniqueResult();

							if (sponsredName != "") {
								objPatientSponsredDetails.setSponsredName(sponsredName);
							} else {
								objPatientSponsredDetails.setSponsredName("self");
							}

						} else {
							objPatientSponsredDetails.setSponsredName("self");
						}

						if (objPatientSponsredDetails.getCompanyNameId() != 0) {
							sql = "select company_name from sp_dic_company_agreement where idsp_dic_company_agreement="
									+ objPatientSponsredDetails.getCompanyNameId();
							String company_name = (String) sessionFactory.getCurrentSession().createSQLQuery(sql)
									.uniqueResult();

							objPatientSponsredDetails.setCompanyName(company_name);
						} else {
							objPatientSponsredDetails.setCompanyName("");
						}

						if (objPatientSponsredDetails.getSponsoredTypeId() != 0) {
							sql = "select sponsored_name from sponsored_type where idsponsored_type="
									+ objPatientSponsredDetails.getSponsoredTypeId();
							String sponsored_name = (String) sessionFactory.getCurrentSession().createSQLQuery(sql)
									.uniqueResult();

							objPatientSponsredDetails.setSponsoredTypeName(sponsored_name);
						} else {
							objPatientSponsredDetails.setSponsoredTypeName("");
						}

						listPatientSponsredDetails.add(objPatientSponsredDetails);
					}

				}
			} catch (Exception e) {
				e.printStackTrace();
				e.getMessage();
			}

			objpatientDetails.setListPatientSponsredDetails(listPatientSponsredDetails);

			arrTopPat.add(objpatientDetails);
		}

		return arrTopPat;

	}

	public String findRefDocNameById(String referDocId) {
		logger.info("IPDHistoryDaoImpl method findRefDocNameById for IPD called ");

		String docName = "";

		String sql = "select docName from chanelling_doctor where channDocId=" + referDocId;
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> docNameDetails = query.list();

		for (Map rs : docNameDetails) {
			docName = (String) rs.get("docName");
		}

		return docName;
	}

	private String fetchSdiscountNm(int sdiscount) {
		logger.info("IPDHistoryDaoImpl method fetchSdiscountNm for IPD called ");

		String sql = "select name from sp_dic_master where sp_dic_master_id =" + sdiscount;
		String hTNM = "";
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> hallDetails = query.list();
		for (Map rs : hallDetails) {
			hTNM = (String) rs.get("name");
		}
		return hTNM;
	}

	private String fetchSdiscountCompanyName(int sdiscount) {
		logger.info("IPDHistoryDaoImpl method fetchSdiscountCompanyName for IPD called ");
		int id_company = 0;
		String sql = "Select idsp_dic_company_agreement from sp_dic_master where sp_dic_master_id = " + sdiscount;
		id_company = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();

		String comNM = "";
		if (id_company > 0) {
			sql = "select company_name from sp_dic_company_agreement where idsp_dic_company_agreement = " + id_company;
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> comDetails = query.list();

			for (Map rs : comDetails) {
				comNM = (String) rs.get("company_name");
			}
		} else {
			comNM = "";
		}
		return comNM;
	}

	public String findHallTypeNameById(String htypeid) {
		logger.info("IPDHistoryDaoImpl method findHallTypeNameById for IPD called ");
		String sql = "select * from hall_type where idhall_type =" + htypeid;
		String hTNM = "";
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> hallDetails = query.list();

		for (Map rs : hallDetails) {
			hTNM = (String) rs.get("hall_type_name");
		}
		return hTNM;
	}

	@Override
	public List<BillComponent> patientMaterialUsed(String tid, String date) {
		logger.info("IPDHistoryDaoImpl method patientMaterialUsed for IPD called ");

		String sql = "";
		int billId = getBillId(tid);
		List<Map<String, Object>> bcList = null;
		if (date.equals("ReplacementSheet")) {
			sql = "select bl.bc_id,bl.bill_id,bl.item_id,bl.quantity,bl.mType,bl.amount,bl.type,bl.updatedBy,bl.date,bl.time,d.doc_name,im.item_name,im.item_id from bill_component bl,doctor d,pharmacy im where bl.bill_id="
					+ billId
					+ "  and bl.item_id=im.item_id and bl.updatedBy=d.Doctor_ID and bl.status='Y' and bl.type='I' ORDER BY bc_id";
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			bcList = query.list();

		} else {
			sql = "select ipdbcs.*,ipdbcm.* from ipdbill_consumables_slave ipdbcs,ipdbill_consumables_master ipdbcm,bill_master b,treatment t where ipdbcs.idipdbill_consumables_master = ipdbcm.idipdbill_consumables_master and b.bill_id = ipdbcm.bill_id and b.Treatment_ID = t.Treatment_ID and t.Treatment_ID ="
					+ tid + " and t.TFlag = 'ACTIVE' and ipdbcs.status = 'Y' and ipdbcs.date =" + date;
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			bcList = query.list();
		}
		try {

			List<BillComponent> materialList = fetchPatientMaterial(bcList);
			return materialList;

		} catch (Exception e) {

			e.printStackTrace();
			return null;
		}

	}

	private List<BillComponent> fetchPatientMaterial(List<Map<String, Object>> bcList) {
		logger.info("IPDHistoryDaoImpl method fetchPatientMaterial for IPD called ");

		List<BillComponent> arrBc = new ArrayList<BillComponent>();
		for (Map rs : bcList) {
			BillComponent objBillComponent = new BillComponent();
			ItemMaster objiItemMaster = new ItemMaster();
			objBillComponent.setSlave_id((Integer) rs.get("idipdbill_consumables_slave"));
			objBillComponent.setMaster_id((Integer) rs.get("idipdbill_consumables_master"));
			objBillComponent.setItem_id((Integer) rs.get("ipd_consumablesid"));
			objBillComponent.setmName((String) rs.get("consumable_name"));
			objBillComponent.setQuantity((Integer) rs.get("quantity"));
			objBillComponent.setAmount((Float) rs.get("netAmount"));
			objBillComponent.setDate((String) rs.get("date"));
			objBillComponent.setTime((String) rs.get("time"));
			objBillComponent.setMType((String) rs.get("consumable_type"));
			objBillComponent.setUpdatedBy((Integer) rs.get("bc_id"));
			String billID = (String) rs.get("bill_id");
			objBillComponent.setBill_id(Integer.parseInt(billID));
			objBillComponent.setObjItem(objiItemMaster);
			String docname = "";
			if (objBillComponent.getUpdatedBy() == 0) {
				docname = "";
			} else {
				String sqlForDoc = "Select doc_name from doctor where Doctor_ID =" + objBillComponent.getUpdatedBy();
				docname = (String) sessionFactory.getCurrentSession().createSQLQuery(sqlForDoc).uniqueResult();

			}

			Doctor doc = new Doctor();
			doc.setDoc_name(docname);
			objBillComponent.setObjDoctor(doc);
			arrBc.add(objBillComponent);
		}

		return arrBc;
	}

	private int getBillId(String tid) {
		logger.info("IPDHistoryDaoImpl method getBillId for IPD called ");

		String sql = "select bill_id from ehat_bill_master where treatment_id=" + tid;
		int billId = ((Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();
		return billId;

	}

	@Override
	public List<CpoeOTdetails> fetchIpdServices(String tid, String serviceid) {
		logger.info("IPDHistoryDaoImpl method fetchIpdServices for IPD called ");
		List<CpoeOTdetails> listTest = new ArrayList<CpoeOTdetails>();

		String sql = "select * from ehat_view_cpoe_nursingstation_service_details where treatment_id=" + tid
				+ " and service_id=" + serviceid;

		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> ipdServicesDetails = query.list();

		for (Map rs : ipdServicesDetails) {
			CpoeOTdetails servicelist = new CpoeOTdetails();
			servicelist.setTreatmentid((Integer) rs.get("treatment_id"));
			servicelist.setServiceid((Integer) rs.get("service_id"));
			servicelist.setServicename((String) rs.get("service_name"));
			servicelist.setQuantity((Double) rs.get("quantity"));
			servicelist.setCategorycharges((Double) rs.get("category_charges"));
			servicelist.setCreated_date_time((Timestamp) rs.get("created_date_time"));
			servicelist.setCategoryName((String) rs.get("category_name"));
			servicelist.setDocName((String) rs.get("docName"));
			servicelist.setBillipd_id((Integer) rs.get("bill_details_ipd_id"));
			servicelist.setCategoryid((Integer) rs.get("id"));
			servicelist.setFromdate((String) rs.get("fromdate"));
			servicelist.setTomdate((String) rs.get("tomdate"));
			listTest.add(servicelist);
		}
		return listTest;
	}

	@Override
	public List<TreatmentNurses> fillDIC(String tid, String date) {
		String sql = "select * from treatment_nurses tn left join doctor d on tn.Nurse_ID=d.Doctor_ID   where  tn.Date="
				+ date + " and tn.Treatment_ID=" + tid + " and tn.status='Y'";
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> rsList = query.list();
		List<TreatmentNurses> list = fetchTNDetails1(rsList);
		return list;
	}

	private List<TreatmentNurses> fetchTNDetails1(List<Map<String, Object>> arrTN) {
		List<TreatmentNurses> arrTreNur = new ArrayList<TreatmentNurses>();
		for (Map rs : arrTN) {
			Doctor objUser = new Doctor();
			TreatmentNurses objTreatmentNurses = new TreatmentNurses();
			objTreatmentNurses.setiD((Integer) rs.get("ID"));
			if (null != (Integer) rs.get("Bed_ID"))
				objTreatmentNurses.setBed_ID((Integer) rs.get("Bed_ID"));
			objTreatmentNurses.setCheckUP_Time((String) rs.get("CheckUP_Time"));
			objTreatmentNurses.setheadingNote((String) rs.get("headingNote"));
			String headingNote = objTreatmentNurses.getheadingNote();
			String sqlForNursingNote = "SELECT * from nursing_notes where notesid=" + headingNote;
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sqlForNursingNote);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> headingNote1 = query.list();
			String NursingNote = null;
			for (Map rs1 : headingNote1) {
				NursingNote = (String) rs1.get("heading_note");
			}
			objTreatmentNurses.setheadingNotes(NursingNote);
			if (null != (String) rs.get("Comments"))
				objTreatmentNurses.setComments((String) rs.get("Comments"));
			objTreatmentNurses.setNurse_ID((Integer) rs.get("Nurse_ID"));

			String sqlu = "SELECT * from users where User_ID=" + objTreatmentNurses.getNurse_ID();
			query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sqlu);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> lnname = query.list();

			if (lnname.size() != 0) {
				for (Map ms : lnname) {
					String tit = (String) ms.get("title");
					String fname = (String) ms.get("f_name");
					String lname = (String) ms.get("l_name");
					String nurse_name = tit + fname + " " + lname;
					objTreatmentNurses.setNurse_name(nurse_name);
				}
			}
			if (null != (String) rs.get("doc_name"))
				objUser.setDoc_name((String) rs.get("doc_name"));

			objTreatmentNurses.setObjUsers(objUser);
			if (null != (String) rs.get("Precription"))
				objTreatmentNurses.setPrecription((String) rs.get("Precription"));

			objTreatmentNurses.setTreatment_ID((Integer) rs.get("Treatment_ID"));
			objTreatmentNurses.setNote((String) rs.get("note"));
			objTreatmentNurses.setDate((String) rs.get("Date"));
			arrTreNur.add(objTreatmentNurses);
		}
		return arrTreNur;
	}

	@Override
	public List<TreatmentNurses> fillDrugChart(String tid, String date) {
		String sql = "select * from ehat_ipdtreatment_medicine_chart dmc left join doctor d on dmc.drug_given_by=d.Doctor_ID where dmc.drug_date="
				+ date + " and dmc.Treatment_ID=" + tid + " and dmc.status='Y'";
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> arrDrugList = query.list();
		List<TreatmentNurses> arrDrugListrecords = fetchDrugChartetails(arrDrugList);
		return arrDrugListrecords;
	}

	private List<TreatmentNurses> fetchDrugChartetails(List<Map<String, Object>> arrDrugList) {

		List<TreatmentNurses> arrTreNur = new ArrayList<TreatmentNurses>();
		for (Map rs : arrDrugList) {
			Doctor objUser = new Doctor();
			TreatmentNurses objTreatmentNurses = new TreatmentNurses();
			objTreatmentNurses.setiD((Integer) rs.get("idehat_ipdtreatment_medicine_chart"));
			objTreatmentNurses.setTreatment_ID((Integer) rs.get("Treatment_ID"));
			objTreatmentNurses.setDrugTime((String) rs.get("drug_time"));
			objTreatmentNurses.setDrugDate((String) rs.get("drug_date"));
			objTreatmentNurses.setDrug_Name((String) rs.get("drug_name"));
			objTreatmentNurses.setDrugStrength((String) rs.get("drug_strength"));
			objTreatmentNurses.setDrugQty((String) rs.get("drug_quantity"));
			objTreatmentNurses.setDrugDose((String) rs.get("drug_dose"));
			objTreatmentNurses.setDrugRoute((String) rs.get("drug_route"));
			objTreatmentNurses.setDrugFrequency((String) rs.get("drug_frequency"));
			objTreatmentNurses.setDrugAssignBy((String) rs.get("drug_given_by"));

			String sqlu = "SELECT * from users where User_ID=" + objTreatmentNurses.getDrugAssignBy();
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sqlu);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> lnname = query.list();

			if (lnname.size() != 0) {
				for (Map ms : lnname) {
					String tit = (String) ms.get("title");
					String fname = (String) ms.get("f_name");
					String lname = (String) ms.get("l_name");

					String nurse_name = tit + fname + " " + lname;
					objTreatmentNurses.setNurse_name(nurse_name);
				}
			}

			if (null != (String) rs.get("doc_name"))
				objUser.setDoc_name((String) rs.get("doc_name"));

			objTreatmentNurses.setObjUsers(objUser);

			arrTreNur.add(objTreatmentNurses);
		}
		return arrTreNur;
	}

	@Override
	public String fetchLabResultData(String treatmentId) {
		String data = "";
		String longdata = "";
		String maindata = "";
		try {
			String sql = "select idlabtestresultmaster,labResultFlag,postDate,postTime from labtestresultmaster where Treatment_ID ="
					+ treatmentId;
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> test = query.list();

			for (Map rs : test) {
				int labid = (Integer) rs.get("idlabtestresultmaster");
				String flag = (String) rs.get("labResultFlag");
				String date = (String) rs.get("postDate");
				String time = (String) rs.get("postTime");
				data = flag + "$" + labid + "$" + date + "$" + time;
				longdata = longdata + "~" + data;
				maindata = longdata.replaceFirst("~", "");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return maindata;
	}

	@Override
	public List<OPDPrescriptionDtoSP> fetchNursingMedication(String todayDate, String callfrom,
			String treatmentId) {
		
		int unitId=1;
		
		List<OPDPrescriptionDtoSP> allPrescriptionsByTreatmentId = prescriptionDao.getAllPrescriptionsNursingStation(Integer.parseInt(treatmentId), unitId
				,todayDate);
		return allPrescriptionsByTreatmentId;
		
		/*
		 * List<IPDNusringMedicationDashboardDAO> listMedicaiton = new
		 * ArrayList<IPDNusringMedicationDashboardDAO>(); try { if
		 * (callfrom.equals("onload") || callfrom.equals("onclick")) { String sql =
		 * "SELECT inmd.* ,ocd.* FROM ipd_nursingstation_medication_dashboard inmd , order_comp_druges ocd "
		 * +
		 * "where inmd.idorder_comp_druges = ocd.idorder_comp_druges and ocd.status='Y' "
		 * + "and inmd.duration_current_date='" + todayDate + "' and inmd.treatmentId="
		 * + treatmentId +
		 * " group by timeslot , idipd_nursingStation_medication_dashboard " +
		 * " ORDER BY case " + " when timeslot like 'M%' then 1 " +
		 * " when timeslot like 'A%' then 2 " + " when timeslot like 'E%' then 3 " +
		 * " when timeslot like 'N%' then 4 " + " end asc ";
		 * 
		 * SQLQuery query = (SQLQuery)
		 * sessionFactory.getCurrentSession().createSQLQuery(sql);
		 * query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); List<Map<String,
		 * Object>> medicationList = query.list();
		 * 
		 * for (Map rs : medicationList) { IPDNusringMedicationDashboardDAO
		 * medicationipd = new IPDNusringMedicationDashboardDAO();
		 * 
		 * medicationipd.setIdipd_nursingStation_medication_dashboard( (Integer)
		 * rs.get("idipd_nursingStation_medication_dashboard"));
		 * medicationipd.setIdorder_comp_druges((Integer)
		 * rs.get("idorder_comp_druges")); medicationipd.setTotaldays((String)
		 * rs.get("duration_days")); medicationipd.setCurrentDays((Integer)
		 * rs.get("duration_current_day")); medicationipd.setCurrentDate((String)
		 * rs.get("duration_current_date"));
		 * medicationipd.setAdministrativeStatus((String)
		 * rs.get("administered_status")); medicationipd.setTimeslot((String)
		 * rs.get("timeslot"));
		 * 
		 * medicationipd.setQuantity((String) rs.get("quantity"));
		 * medicationipd.setDruges_doses((String) rs.get("druges_doses"));
		 * medicationipd.setFrequency((String) rs.get("frequency"));
		 * medicationipd.setDoseType((String) rs.get("doseType"));
		 * medicationipd.setStrength((String) rs.get("strength"));
		 * 
		 * String timedata = ""; String morning = ""; String afternoon = ""; String
		 * evening = ""; String night = ""; String time = (String)
		 * rs.get("time_Prescription"); String timearray[] = {}; if (time != null) {
		 * timearray = time.split(","); } if (timearray.length > 0) { morning =
		 * timearray[0]; afternoon = timearray[1]; evening = timearray[2]; night =
		 * timearray[3]; String timeslot = (String) rs.get("timeslot"); if
		 * (timeslot.equals("Morning")) { if (morning.equals("00:00")) { timedata = "";
		 * } else { timedata = morning; } } if (timeslot.equals("Afternoon")) { if
		 * (afternoon.equals("00:00")) { timedata = ""; } else { timedata = afternoon; }
		 * 
		 * } if (timeslot.equals("Evening")) {
		 * 
		 * if (evening.equals("00:00")) { timedata = ""; } else { timedata = evening; }
		 * 
		 * }
		 * 
		 * if (timeslot.equals("Night")) { if (night.equals("00:00")) { timedata = ""; }
		 * else { timedata = night; }
		 * 
		 * }
		 * 
		 * medicationipd.setTime(timedata); } String prepc = (String) rs.get("prep");
		 * sql =
		 * "SELECT preparation_name FROM pharma_preparation_master where preparation_id ="
		 * +prepc; String prep = (String)
		 * sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
		 * medicationipd.setPrep(prep); String uni = (String) rs.get("unit"); if
		 * (!uni.equalsIgnoreCase("0")) { sql =
		 * "SELECT uom_name FROM pharma_uom_master where uom_id ="+uni; String unit =
		 * (String)
		 * sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
		 * medicationipd.setUnit(unit); } else { medicationipd.setUnit("-"); } //
		 * Getting unit name its id. String rema = (String) rs.get("remarks"); sql =
		 * "SELECT * FROM prescription_instruction where idprescription_Instruction  = ? "
		 * ; String instruction = ""; query = (SQLQuery)
		 * sessionFactory.getCurrentSession().createSQLQuery(sql);
		 * query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); List<Map<String,
		 * Object>> inslist = query.list();
		 * 
		 * for (Map rs1 : inslist) { String eng = (String)
		 * rs1.get("english_Instruction"); String hin = (String)
		 * rs1.get("hindi_Instruction"); String mar = (String)
		 * rs1.get("marathi_Instruction"); instruction = eng + "/" + hin + "/" + mar;
		 * medicationipd.setInstruction(instruction); }
		 * 
		 * listMedicaiton.add(medicationipd); }
		 * 
		 * } return listMedicaiton;
		 * 
		 * } catch (Exception e) { e.getMessage(); e.printStackTrace(); return null; }
		 */
	}

	@Override
	public List<LabPkg> getPackages(String byName, String type) {
		List<LabPkg> arrLabPkg = new ArrayList<LabPkg>();
		String sql="";

		if (type.equals("onload")) {
			sql = "SELECT * FROM labpkg where pkgStatus='Y'";
		} else {
			sql = "SELECT * FROM labpkg where pkgStatus='Y' and pkgName like '"
					+ byName + "%'";
		}
		List<Map<String, Object>> userDetails = null;
		try {
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			userDetails = query.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		for (Map rs : userDetails) {
			LabPkg objLabPkg = new LabPkg();

			objLabPkg.setIdlabpkg((Integer) rs.get("idlabpkg"));
			objLabPkg.setIdheadings((Integer) rs.get("idheadings"));
			objLabPkg.setPkgCharges((Float) rs.get("pkgCharges"));

			objLabPkg.setPkgName((String) rs.get("pkgName"));
			objLabPkg.setPkgStatus((String) rs.get("pkgStatus"));
			objLabPkg.setPkgCode((String) rs.get("pkgCode"));
			objLabPkg.setMotivatorCash((Double)rs.get("motivatorCash"));
			objLabPkg.setMotivatorSponsored((Double)rs.get("motivatorSponsored"));
			objLabPkg.setClinicPercent((Double)rs.get("clinicPercent"));

			int pkgId = (Integer) rs.get("idlabpkg");

			objLabPkg.setPkgprotestList(featchLabPkgProTestCompData(pkgId));
			List<HallWiseTestChargesDTO> hallWsTestChrgsList = fetchHallWiseLabPackageCharges(objLabPkg
					.getIdlabpkg());
			objLabPkg.setHallWsTestChrgsList(hallWsTestChrgsList);
			arrLabPkg.add(objLabPkg);
		}
		return arrLabPkg;
	}


	private List<Labpkgprotestcomp> featchLabPkgProTestCompData(int pkgId) {

		List<Labpkgprotestcomp> arrLabpkgprotestcomp = new ArrayList<Labpkgprotestcomp>();

		String sql = "SELECT * FROM labpkgprotestcomp where idpkg ="+pkgId;
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> lpack = query.list();
		
		for (Map map : lpack) {
			int labPaktestComp = (Integer) map.get("idlabpkgprotestcomp");
			String typeTP = (String) map.get("typeTP");
			int idProTest = (Integer) map.get("idProTest");
			int idpkg = (Integer) map.get("idpkg");

			if (typeTP.equals("P")) {
				String SQL = "select * from labprofile where idprofile ="+idProTest;
				query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> labprofile = query.list();
				
				for (Map rs : labprofile) {
					Labpkgprotestcomp objLabpkgprotestcomp = new Labpkgprotestcomp();

					objLabpkgprotestcomp.setIdlabpkgprotestcomp(labPaktestComp);
					objLabpkgprotestcomp.setIdpkg(idpkg);
					objLabpkgprotestcomp.setIdProTest(idProTest);
					objLabpkgprotestcomp.setTypeTP(typeTP);
					objLabpkgprotestcomp.setTestName((String) rs
							.get("profileName"));
					objLabpkgprotestcomp.setTestCode((String) rs
							.get("profileCode"));
					objLabpkgprotestcomp.setTestRate((Float) rs
							.get("profileCharges"));

					objLabpkgprotestcomp
							.setLabpkgproList(featchLabPkgProTestData(labPaktestComp));
					arrLabpkgprotestcomp.add(objLabpkgprotestcomp);
				}
				
			}else if(typeTP.equals("T")){//for test
				sql = "SELECT * FROM labtest where idTest="+idProTest;
								
				query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> labtest = query.list();
				
				for (Map rs : labtest) {
					Labpkgprotestcomp objLabpkgprotestcomp = new Labpkgprotestcomp();
					
					objLabpkgprotestcomp.setIdlabpkgprotestcomp(labPaktestComp);
					objLabpkgprotestcomp.setIdpkg(idpkg);
					objLabpkgprotestcomp.setIdProTest(idProTest);
					objLabpkgprotestcomp.setTypeTP(typeTP);
					objLabpkgprotestcomp.setTestName((String) rs
							.get("testName"));
					objLabpkgprotestcomp.setTestCode((String) rs
							.get("testCode"));
					objLabpkgprotestcomp
							.setTestRate((Float) rs.get("testRate"));
					arrLabpkgprotestcomp.add(objLabpkgprotestcomp);
				}
			} 
			if(idProTest==0){
				Labpkgprotestcomp objLabpkgprotestcomp = new Labpkgprotestcomp();
				objLabpkgprotestcomp.setTestName(typeTP);
				arrLabpkgprotestcomp.add(objLabpkgprotestcomp);
				
			}
		}
		return arrLabpkgprotestcomp;
	}

	private List<HallWiseTestChargesDTO> fetchHallWiseLabPackageCharges(int idlabpkg) {
		List<HallWiseTestChargesDTO> hallWsTestChrgsList = new ArrayList<HallWiseTestChargesDTO>();
		String sql = "Select * from labpackage_hallwise_charges_slave where test_id ="+idlabpkg+" and status ='Y'";
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> packageDetails = query.list();
		for (Map rs : packageDetails) {
			HallWiseTestChargesDTO obj = new HallWiseTestChargesDTO();
			obj.setSlave_id((Integer) rs
					.get("idlabpackage_hallwise_charges_slave"));
			obj.setTest_id((Integer) rs.get("test_id"));
			obj.setHall_id((Integer) rs.get("hall_id"));
			obj.setCharges((Float) rs.get("hall_wise_charges"));
			hallWsTestChrgsList.add(obj);
		}

		return hallWsTestChrgsList;

	}

	private List<Labpkgpro> featchLabPkgProTestData(int idlabpkgprotestcomp) {
		List<Labpkgpro> arrLabpkgpro = new ArrayList<Labpkgpro>();
		List tli = new ArrayList();
		String sql = "SELECT * FROM labpkgprotestcomp where idlabpkgprotestcomp="+idlabpkgprotestcomp;
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> labtest = query.list();
		
		for (Map rs : labtest) {
			int idtestcomp = (Integer) rs.get("idlabpkgprotestcomp") ;
			int proid =	(Integer) rs.get("idProTest");
				sql = "select * from labpkgpro where idprofile="+proid+" and idlabpkgtestcomp="+idlabpkgprotestcomp;
				query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> ts1 = query.list();
				
				for (Map rs1 : ts1) {
					int tid = (Integer) rs1.get("idTest");
					int idlabPkpro = (Integer) rs1.get("idlabpkgpro");
					tli.add(tid);
				}
				
				sql = "SELECT * FROM labprofiletestcomp where idprofile="+proid;
				query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> ts2 = query.list();
				
				for (Map rs2 : ts2) {
					int tid = (Integer) rs2.get("idTest");
					if(tid == 0){
						Labpkgpro objLabpkgpro = new Labpkgpro();
						String headName = (String) rs2.get("headName");
						int idpro  = (Integer) rs2.get("idprofile");
						objLabpkgpro.setTestName(headName);
						objLabpkgpro.setTestCode(" ");
						objLabpkgpro.setIdTest(0);
						objLabpkgpro.setIdprofile(idpro);
						objLabpkgpro.setIdlabpkgpro(0);
						objLabpkgpro.setTestRate(0.0f);
						arrLabpkgpro.add(objLabpkgpro);
					}
					if(tli.contains(tid)){
						sql = "SELECT lt.*,lb.* FROM labtest lt ,labpkgpro lb where lb.idtest="+tid+" and lt.idtest="+tid+" and lb.idlabpkgtestcomp="+idlabpkgprotestcomp;
						query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
						query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> ts3 = query.list();

						for (Map rs3 : ts3) {
							Labpkgpro objLabpkgpro = new Labpkgpro();
							objLabpkgpro.setIdlabpkgpro((Integer) rs3.get("idlabpkgpro"));
							objLabpkgpro.setIdprofile((Integer) rs3.get("idprofile"));
							objLabpkgpro.setIdTest(tid);
							objLabpkgpro.setTestName((String) rs3.get("testName"));
							objLabpkgpro.setTestCode((String) rs3.get("testCode"));
							objLabpkgpro.setTestRate((Float) rs3.get("testRate"));
							arrLabpkgpro.add(objLabpkgpro);
						}
					}
				}
		}
		return arrLabpkgpro;
	}

	@Override
	public List<IPDDischargePlanDTO> fetchDischargeCode() {

		List<IPDDischargePlanDTO> ipdDischargePlanDTOList = new ArrayList<IPDDischargePlanDTO>();

		try {
			String sql = "SELECT * FROM discharge_code WHERE status='Y'";
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> rsIPDDischargePlanDTO = query.list();

			for (Map rs : rsIPDDischargePlanDTO) {

				IPDDischargePlanDTO ipdDischargePlanDTO = new IPDDischargePlanDTO();

				ipdDischargePlanDTO.setIPDDischargePlanID((Integer) rs
						.get("iddischarge_code"));
				ipdDischargePlanDTO.setDischargeCodeID((String) rs
						.get("discharge_code_name"));

				ipdDischargePlanDTOList.add(ipdDischargePlanDTO);
			}

			return ipdDischargePlanDTOList;
		} catch (Exception e) {
			e.printStackTrace();
			return ipdDischargePlanDTOList;
		}

	}

	@Override
	public List<IPDDischargePlanDTO> fetchIPDDischargePlan(String treatmentId) {

		List<IPDDischargePlanDTO> listIPDDischargePlanDTO = new ArrayList<IPDDischargePlanDTO>();

		try {

			String sql = "SELECT * FROM ipddischargeplan WHERE tid="+treatmentId+" and status='Y'";
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> rsIPDDischargePlanDTO = query.list();

			for (Map rs : rsIPDDischargePlanDTO) {

				IPDDischargePlanDTO ipdDischargePlanDTO = new IPDDischargePlanDTO();

				ipdDischargePlanDTO.setIPDDischargePlanID((Integer) rs
						.get("IPDDischargePlanID"));
				ipdDischargePlanDTO.setTid((Integer) rs.get("tid"));
				ipdDischargePlanDTO.setDateAdmission((String) rs
						.get("dateAdmission"));
				ipdDischargePlanDTO.setDateExpectedDischarge((String) rs
						.get("dateExpectedDischarge"));
				ipdDischargePlanDTO.setDateSet((String) rs.get("dateSet"));
				ipdDischargePlanDTO
						.setIsInformed((String) rs.get("isInformed"));
				ipdDischargePlanDTO.setTransportArranged((String) rs
						.get("transportArranged"));
				ipdDischargePlanDTO.setIsInformedByPatient((String) rs
						.get("isInformedByPatient"));
				ipdDischargePlanDTO.setIsInformedByStaff((String) rs
						.get("isInformedByStaff"));
				ipdDischargePlanDTO.setIsTransportOwn((String) rs
						.get("isTransportOwn"));
				ipdDischargePlanDTO.setIsTransportOwnBooked((String) rs
						.get("isTransportOwnBooked"));
				ipdDischargePlanDTO.setTransOwnArrvTime((String) rs
						.get("transOwnArrvTime"));
				ipdDischargePlanDTO.setIsTransportAmb((String) rs
						.get("isTransportAmb"));
				ipdDischargePlanDTO.setIsTransportAmbBooked((String) rs
						.get("isTransportAmbBooked"));
				ipdDischargePlanDTO.setTransAmbArrvTime((String) rs
						.get("transAmbArrvTime"));
				ipdDischargePlanDTO
						.setIsOwnMedic((String) rs.get("isOwnMedic"));
				ipdDischargePlanDTO
						.setIsNewMedic((String) rs.get("isNewMedic"));
				ipdDischargePlanDTO.setIsTransferLetter((String) rs
						.get("isTransferLetter"));
				ipdDischargePlanDTO.setIsSocialService((String) rs
						.get("isSocialService"));
				ipdDischargePlanDTO.setSocialServiceRefDate((String) rs
						.get("socialServiceRefDate"));
				ipdDischargePlanDTO.setSocialServiceAssesDate((String) rs
						.get("socialServiceAssesDate"));
				ipdDischargePlanDTO.setIsOT((String) rs.get("isOT"));
				ipdDischargePlanDTO.setOTRefDate((String) rs.get("OTRefDate"));
				ipdDischargePlanDTO.setOTAssesDate((String) rs
						.get("OTAssesDate"));
				ipdDischargePlanDTO.setIsPhysio((String) rs.get("isPhysio"));
				ipdDischargePlanDTO.setPhysioRefDate((String) rs
						.get("physioRefDate"));
				ipdDischargePlanDTO.setPhysioAssesDate((String) rs
						.get("physioAssesDate"));
				ipdDischargePlanDTO.setIsOther((String) rs.get("isOther"));
				ipdDischargePlanDTO.setOtherRefDate((String) rs
						.get("otherRefDate"));
				ipdDischargePlanDTO.setOtherAssesDate((String) rs
						.get("otherAssesDate"));
				ipdDischargePlanDTO.setDateActualDischarge((String) rs
						.get("dateActualDischarge"));

				try {
					String dischargeCode = ((String) rs.get("iddischarge_code"))
							.trim();
					if ((null == dischargeCode) || dischargeCode.equals("")) {
						ipdDischargePlanDTO.setDischargeCodeID("");
						ipdDischargePlanDTO.setDischargeCodeName("");
					} else { // fetch Discharge name based on discharge code
						String sqlTemp = "SELECT discharge_code_name FROM discharge_code WHERE iddischarge_code='"
								+ dischargeCode + "' AND status='Y'";
						String dischargeCodeName = (String) sessionFactory.getCurrentSession().createSQLQuery(sqlTemp).uniqueResult();


						ipdDischargePlanDTO.setDischargeCodeID(dischargeCode);
						ipdDischargePlanDTO
								.setDischargeCodeName(dischargeCodeName);
					}
				} catch (Exception e) {
					e.printStackTrace();
					ipdDischargePlanDTO.setDischargeCodeID("");
					ipdDischargePlanDTO.setDischargeCodeName("");
				}

				// ipdDischargePlanDTO.setDischargeCodeID((String)
				// rs.get("iddischarge_code"));
				ipdDischargePlanDTO.setIsTDL((String) rs.get("isTDL"));
				ipdDischargePlanDTO.setTDLTime((String) rs.get("TDLTime"));
				ipdDischargePlanDTO.setDiagCapacity((String) rs
						.get("diagCapacity"));
				ipdDischargePlanDTO.setWaitTestRes((String) rs
						.get("waitTestRes"));
				ipdDischargePlanDTO.setWaitMedRevDisc((String) rs
						.get("waitMedRevDisc"));
				ipdDischargePlanDTO.setMedConsulDelay((String) rs
						.get("MedConsulDelay"));
				ipdDischargePlanDTO.setAlliedHelDelay((String) rs
						.get("AlliedHelDelay"));
				ipdDischargePlanDTO.setRefCommProvLate((String) rs
						.get("RefCommProvLate"));
				ipdDischargePlanDTO.setPatWaitConsEquip((String) rs
						.get("PatWaitConsEquip"));
				ipdDischargePlanDTO
						.setMedication((String) rs.get("Medication"));
				ipdDischargePlanDTO.setTransport((String) rs.get("Transport"));
				ipdDischargePlanDTO.setOtherHeltFacl((String) rs
						.get("OtherHeltFacl"));
				ipdDischargePlanDTO.setPallative((String) rs.get("Pallative"));
				ipdDischargePlanDTO.setRehabilitation((String) rs
						.get("Rehabilitation"));
				ipdDischargePlanDTO.setCareNurseHome((String) rs
						.get("CareNurseHome"));

				listIPDDischargePlanDTO.add(ipdDischargePlanDTO);
			}

			return listIPDDischargePlanDTO;
		} catch (Exception e) {

			System.out.println("database error...could not fetch: "
					+ e.getMessage());
			return listIPDDischargePlanDTO;
		}

	
		
	}

	@Override
	public String saveIPDDischargePlan(IPDDischargePlanDTO ipdDischargePlanDTO, String queryType) {

		String isStatus = "Error in Saving IPDDischargePlan";
		try {
			if (queryType.equalsIgnoreCase("insert")) {
				String sql = "INSERT INTO ipddischargeplan ( tid, dateAdmission, dateExpectedDischarge, dateSet, isInformed, transportArranged, isInformedByPatient, "
						+ "isInformedByStaff, isTransportOwn, isTransportOwnBooked, transOwnArrvTime, isTransportAmb, isTransportAmbBooked, "
						+ "transAmbArrvTime, isOwnMedic, isNewMedic, isTransferLetter, isSocialService, "
						+ "socialServiceRefDate, socialServiceAssesDate, isOT, OTRefDate, OTAssesDate, "
						+ "isPhysio, physioRefDate, physioAssesDate, isOther, otherRefDate, otherAssesDate, "
						+ "dateActualDischarge, iddischarge_code, isTDL, TDLTime, diagCapacity, waitTestRes, waitMedRevDisc, MedConsulDelay, "
						+ "AlliedHelDelay, RefCommProvLate, PatWaitConsEquip, Medication, Transport, "
						+ "OtherHeltFacl, Pallative, Rehabilitation, CareNurseHome, status) "
						+ "VALUES ("
						
						+ipdDischargePlanDTO.getTid()+",'"+ipdDischargePlanDTO.getDateAdmission()+"','"+ipdDischargePlanDTO.getDateExpectedDischarge()+"','"+ipdDischargePlanDTO.getDateSet()+"','"+ipdDischargePlanDTO.getIsInformed()+"','"+ipdDischargePlanDTO.getTransportArranged()+"','"+ipdDischargePlanDTO.getIsInformedByPatient()
						+"','"+ipdDischargePlanDTO.getIsInformedByStaff()+"','"+ipdDischargePlanDTO.getIsTransportOwn()+"','"+ipdDischargePlanDTO.getIsTransportOwnBooked()+"','"+ipdDischargePlanDTO.getTransOwnArrvTime()+"','"+ipdDischargePlanDTO.getIsTransportAmb()+"','"+ipdDischargePlanDTO.getIsTransportAmbBooked()
						+"','"+ipdDischargePlanDTO.getTransAmbArrvTime()+"','"+ipdDischargePlanDTO.getIsOwnMedic()+"','"+ipdDischargePlanDTO.getIsNewMedic()+"','"+ipdDischargePlanDTO.getIsTransferLetter()+"','"+ipdDischargePlanDTO.getIsSocialService()
						+"','"+ipdDischargePlanDTO.getSocialServiceRefDate()+"','"+ipdDischargePlanDTO.getSocialServiceAssesDate()+"','"+ipdDischargePlanDTO.getIsOT()+"','"+ipdDischargePlanDTO.getOTRefDate()+"','"+ipdDischargePlanDTO.getOTAssesDate()
						+"','"+ipdDischargePlanDTO.getIsPhysio()+"','"+ipdDischargePlanDTO.getPhysioRefDate()+"','"+ipdDischargePlanDTO.getPhysioAssesDate()+"','"+ipdDischargePlanDTO.getIsOther()+"','"+ipdDischargePlanDTO.getOtherRefDate()+"','"+ipdDischargePlanDTO.getOtherAssesDate()
						+"','"+ipdDischargePlanDTO.getDateActualDischarge()+"','"+ipdDischargePlanDTO.getDischargeCodeID()+"','"+ipdDischargePlanDTO.getIsTDL()+"','"+ipdDischargePlanDTO.getTDLTime()+"','"+ipdDischargePlanDTO.getDiagCapacity()+"','"+ipdDischargePlanDTO.getWaitTestRes()+"','"+ipdDischargePlanDTO.getWaitMedRevDisc()+"','"+ipdDischargePlanDTO.getMedConsulDelay()
						+"','"+ipdDischargePlanDTO.getAlliedHelDelay()+"','"+ipdDischargePlanDTO.getRefCommProvLate()+"','"+ipdDischargePlanDTO.getPatWaitConsEquip()+"','"+ipdDischargePlanDTO.getMedication()+"','"+ipdDischargePlanDTO.getTransport()
						+"','"+ipdDischargePlanDTO.getOtherHeltFacl()+"','"+ipdDischargePlanDTO.getPallative()+"','"+ipdDischargePlanDTO.getRehabilitation()+"','"+ipdDischargePlanDTO.getCareNurseHome()+"','Y')";

/*						+ipdDischargePlanDTO.getTid()+","+ipdDischargePlanDTO.getDateAdmission()+","+ipdDischargePlanDTO.getDateExpectedDischarge()+","+ipdDischargePlanDTO.getDateSet()+","+ipdDischargePlanDTO.getIsInformed()+","+ipdDischargePlanDTO.getTransportArranged()+","+ipdDischargePlanDTO.getIsInformedByPatient()
						+","+ipdDischargePlanDTO.getIsInformedByStaff()+","+ipdDischargePlanDTO.getIsTransportOwn()+","+ipdDischargePlanDTO.getIsTransportOwnBooked()+","+ipdDischargePlanDTO.getTransOwnArrvTime()+","+ipdDischargePlanDTO.getIsTransportAmb()+","+ipdDischargePlanDTO.getIsTransportAmbBooked()
						+","+ipdDischargePlanDTO.getTransAmbArrvTime()+","+ipdDischargePlanDTO.getIsOwnMedic()+","+ipdDischargePlanDTO.getIsNewMedic()+","+ipdDischargePlanDTO.getIsTransferLetter()+","+ipdDischargePlanDTO.getIsSocialService()
						+","+ipdDischargePlanDTO.getSocialServiceRefDate()+","+ipdDischargePlanDTO.getSocialServiceAssesDate()+","+ipdDischargePlanDTO.getIsOT()+","+ipdDischargePlanDTO.getOTRefDate()+","+ipdDischargePlanDTO.getOTAssesDate()
						+","+ipdDischargePlanDTO.getIsPhysio()+","+ipdDischargePlanDTO.getPhysioRefDate()+","+ipdDischargePlanDTO.getPhysioAssesDate()+","+ipdDischargePlanDTO.getIsOther()+","+ipdDischargePlanDTO.getOtherRefDate()+","+ipdDischargePlanDTO.getOtherAssesDate()
						+","+ipdDischargePlanDTO.getDateActualDischarge()+","+ipdDischargePlanDTO.getDischargeCodeID()+","+ipdDischargePlanDTO.getIsTDL()+","+ipdDischargePlanDTO.getTDLTime()+","+ipdDischargePlanDTO.getDiagCapacity()+","+ipdDischargePlanDTO.getWaitTestRes()+","+ipdDischargePlanDTO.getWaitMedRevDisc()+","+ipdDischargePlanDTO.getMedConsulDelay()
						+","+ipdDischargePlanDTO.getAlliedHelDelay()+","+ipdDischargePlanDTO.getRefCommProvLate()+","+ipdDischargePlanDTO.getPatWaitConsEquip()+","+ipdDischargePlanDTO.getMedication()+","+ipdDischargePlanDTO.getTransport()
						+","+ipdDischargePlanDTO.getOtherHeltFacl()+","+ipdDischargePlanDTO.getPallative()+","+ipdDischargePlanDTO.getRehabilitation()+","+ipdDischargePlanDTO.getCareNurseHome()+",'Y')";
*/
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
				
				isStatus = "Discharge Plan Saved Successfully...";
				return isStatus;
			} else {

				String sql = "UPDATE ipddischargeplan SET dateAdmission="+ipdDischargePlanDTO.getDateAdmission()+", dateExpectedDischarge="+ipdDischargePlanDTO.getDateExpectedDischarge()
				+", dateSet="+ipdDischargePlanDTO.getDateSet()+", isInformed="+ipdDischargePlanDTO.getIsInformed()
						+", transportArranged="+ipdDischargePlanDTO.getTransportArranged()+", isInformedByPatient="+ipdDischargePlanDTO.getIsInformedByPatient()
						+", isInformedByStaff="+ipdDischargePlanDTO.getIsInformedByStaff()+", isTransportOwn="+ipdDischargePlanDTO.getIsTransportOwn()
						+", isTransportOwnBooked="+ipdDischargePlanDTO.getIsTransportOwnBooked()+", transOwnArrvTime="+ipdDischargePlanDTO.getTransOwnArrvTime()
						+", isTransportAmb="+ipdDischargePlanDTO.getIsTransportAmb()+", isTransportAmbBooked="+ipdDischargePlanDTO.getIsTransportAmbBooked()
						+", transAmbArrvTime="+ipdDischargePlanDTO.getTransAmbArrvTime()+", isOwnMedic="+ipdDischargePlanDTO.getIsOwnMedic()+", isNewMedic="+ipdDischargePlanDTO.getIsNewMedic()
						+", isTransferLetter="+ipdDischargePlanDTO.getIsTransferLetter()+", isSocialService="+ipdDischargePlanDTO.getIsSocialService()
						+", socialServiceRefDate="+ipdDischargePlanDTO.getSocialServiceRefDate()+", socialServiceAssesDate="+ipdDischargePlanDTO.getSocialServiceAssesDate()
						+", isOT="+ipdDischargePlanDTO.getIsOT()+", OTRefDate="+ipdDischargePlanDTO.getOTRefDate()+", OTAssesDate="+ipdDischargePlanDTO.getOTAssesDate()
						+", isPhysio="+ipdDischargePlanDTO.getIsPhysio()+", physioRefDate="+ipdDischargePlanDTO.getPhysioRefDate()+", physioAssesDate="+ipdDischargePlanDTO.getPhysioAssesDate()+", isOther="+ipdDischargePlanDTO.getIsOther()+", otherRefDate="+ipdDischargePlanDTO.getOtherRefDate()+", otherAssesDate="+ipdDischargePlanDTO.getOtherAssesDate()
						+", dateActualDischarge="+ipdDischargePlanDTO.getDateActualDischarge()+", iddischarge_code="+ipdDischargePlanDTO.getDischargeCodeID()+", isTDL="+ipdDischargePlanDTO.getIsTDL()+", TDLTime="+ipdDischargePlanDTO.getTDLTime()+", diagCapacity="+ipdDischargePlanDTO.getDiagCapacity()
						+", waitTestRes="+ipdDischargePlanDTO.getWaitTestRes()+", waitMedRevDisc="+ipdDischargePlanDTO.getWaitMedRevDisc()+", MedConsulDelay="+ipdDischargePlanDTO.getMedConsulDelay()
						+", AlliedHelDelay="+ipdDischargePlanDTO.getAlliedHelDelay()+", RefCommProvLate="+ipdDischargePlanDTO.getRefCommProvLate()+", PatWaitConsEquip="+ipdDischargePlanDTO.getPatWaitConsEquip()+", Medication="+ipdDischargePlanDTO.getMedication()+", Transport="+ipdDischargePlanDTO.getTransport()
						+", OtherHeltFacl="+ipdDischargePlanDTO.getOtherHeltFacl()+", Pallative="+ipdDischargePlanDTO.getPallative()+", Rehabilitation="+ipdDischargePlanDTO.getRehabilitation()+", CareNurseHome="+ipdDischargePlanDTO.getCareNurseHome()
						+"  WHERE tid="+ipdDischargePlanDTO.getTid()+" AND status='Y'";
				
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
						
				
				isStatus = "Discharge Plan Updated Successfully...";
				return isStatus;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return isStatus;
		}
	
	}

	@Override
	public List<DischargeProcess> fetchDischargeProcess(String treatmentId) {

		String sql = "select * from dischargeprocess where treatmentId="+treatmentId;
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> dischargeDetails = query.list();
		
		List<DischargeProcess> arrDischargeProcess = new ArrayList<DischargeProcess>();
		for (Map rs : dischargeDetails) {

			DischargeProcess objDischargeDetails = new DischargeProcess();
			objDischargeDetails.setActivity((String) rs.get("activity"));
			objDischargeDetails.setStartTime((String) rs.get("fromTime"));
			objDischargeDetails.setEndTime((String) rs.get("toTime"));
			objDischargeDetails.setStaffresp(getName((String) rs
					.get("staffResponsible")));
			objDischargeDetails.setRemark((String) rs.get("remark"));
			objDischargeDetails.setID((String) rs.get("ID"));
			objDischargeDetails.setIddischarge_process((Integer) rs
					.get("iddischargeProcess"));
			objDischargeDetails.setTretID((Integer) rs.get("treatmentId"));

			arrDischargeProcess.add(objDischargeDetails);

		}
		return arrDischargeProcess;
	}
	
	private String getName(String id) {
		String name = "";
		String sql = "select doc_name from doctor where Doctor_ID="+id;
		
		try {
			name = (String) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
		} catch (HibernateException e) {
			e.printStackTrace();
		}
		
		return name;
	}

	@Override
	public int saveDischargeProcess(DischargeProcess objDischargeProcess1, DischargeProcess objDischargeProcess,
			String queryType, int inttretID, String[] allVals, int userId) {

		String deleteHospitalHoliday[] = allVals[0].split(",");
		try {
			if (queryType.equals("insert")) {

				for (int i = 0; i < objDischargeProcess.getDischargesinglist()
						.size(); i++) {

					if (objDischargeProcess.getDischargesinglist().get(i)
							.getIddischarge_process() == 0) {
						String sql = "INSERT INTO dischargeprocess (activity,fromTime,staffResponsible,remark,treatmentId,ID) VALUES "
								+ "(:activity,:fromTime,:staffResponsible,:remark,:treatmentId,:ID)";
						
						
						SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);

						query.setParameter("activity", objDischargeProcess.getDischargesinglist().get(i).getActivity());
						query.setParameter("fromTime",objDischargeProcess.getDischargesinglist().get(i).getStartTime());
						
						query.setParameter("staffResponsible",userId);
						query.setParameter("remark",objDischargeProcess.getDischargesinglist().get(i).getRemark());
						query.setParameter("treatmentId",objDischargeProcess1.getTretID());
						query.setParameter("ID",objDischargeProcess.getDischargesinglist().get(i).getID());
						query.executeUpdate();
						

					} else {
						String name = objDischargeProcess
								.getDischargesinglist().get(i).getStaffresp();
						int id = getIDbyName(name, userId);
						if (id == userId) {
							String sql = "UPDATE dischargeprocess SET activity=:activity,fromTime=:fromTime,toTime=:toTime,staffResponsible=:staffResponsible,remark=:remark,ID=:ID,treatmentId=:treatmentId WHERE iddischargeProcess=:iddischargeProcess ";
							SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);

							query.setParameter("activity", objDischargeProcess.getDischargesinglist().get(i).getActivity());
							query.setParameter("fromTime",objDischargeProcess.getDischargesinglist().get(i).getStartTime());
							query.setParameter("toTime",objDischargeProcess.getDischargesinglist().get(i).getEndTime());
							query.setParameter("staffResponsible",userId);
							query.setParameter("remark",objDischargeProcess.getDischargesinglist().get(i).getRemark());
							query.setParameter("ID",objDischargeProcess.getDischargesinglist().get(i).getID());
							query.setParameter("treatmentId",objDischargeProcess1.getTretID());
							query.setParameter("iddischargeProcess",objDischargeProcess.getDischargesinglist().get(i).getIddischarge_process());
							query.executeUpdate();
							
						}
					}
				}
			} else {
				for (int i = 0; i < objDischargeProcess.getDischargesinglist()
						.size(); i++) {
					if (objDischargeProcess.getDischargesinglist().get(i)
							.getIddischarge_process() != 0) {
						String name = objDischargeProcess
								.getDischargesinglist().get(i).getStaffresp();

						if (userId == 1) {
							String sql = "UPDATE dischargeprocess SET activity=:activity,fromTime=:fromTime,toTime=:toTime,remark=:remark,ID=:ID,treatmentId=:treatmentId WHERE iddischargeProcess=:iddischargeProcess ";
							
							SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);

							query.setParameter("activity", objDischargeProcess.getDischargesinglist().get(i).getActivity());
							query.setParameter("fromTime",objDischargeProcess.getDischargesinglist().get(i).getStartTime());
							query.setParameter("toTime",objDischargeProcess.getDischargesinglist().get(i).getEndTime());
							query.setParameter("remark",objDischargeProcess.getDischargesinglist().get(i).getRemark());
							query.setParameter("ID",objDischargeProcess.getDischargesinglist().get(i).getID());
							query.setParameter("treatmentId",objDischargeProcess1.getTretID());
							query.setParameter("iddischargeProcess",objDischargeProcess.getDischargesinglist().get(i).getIddischarge_process());
							query.executeUpdate();

						}

						else {
							int id = getIDbyName(name, userId);
							if (id == userId) {
								String sql = "UPDATE dischargeprocess SET activity=:activity,fromTime=:fromTime,toTime=:toTime,staffResponsible=:staffResponsible,remark=:remark,ID=:ID,treatmentId=:treatmentId WHERE iddischargeProcess=:iddischargeProcess ";
								
								SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);

								query.setParameter("activity", objDischargeProcess.getDischargesinglist().get(i).getActivity());
								query.setParameter("fromTime",objDischargeProcess.getDischargesinglist().get(i).getStartTime());
								query.setParameter("toTime",objDischargeProcess.getDischargesinglist().get(i).getEndTime());
								query.setParameter("staffResponsible",userId);
								query.setParameter("remark",objDischargeProcess.getDischargesinglist().get(i).getRemark());
								query.setParameter("ID",objDischargeProcess.getDischargesinglist().get(i).getID());
								query.setParameter("treatmentId",objDischargeProcess1.getTretID());
								query.setParameter("iddischargeProcess",objDischargeProcess.getDischargesinglist().get(i).getIddischarge_process());
								query.executeUpdate();
							}
						}
					} else {


						String sql = "INSERT INTO dischargeprocess (activity,fromTime,staffResponsible,remark,treatmentId,ID) VALUES "
								+ "(:activity,:fromTime,:staffResponsible,:remark,:treatmentId,:ID)";
						
						
						SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);

						query.setParameter("activity", objDischargeProcess.getDischargesinglist().get(i).getActivity());
						query.setParameter("fromTime",objDischargeProcess.getDischargesinglist().get(i).getStartTime());
						
						query.setParameter("staffResponsible",userId);
						query.setParameter("remark",objDischargeProcess.getDischargesinglist().get(i).getRemark());
						query.setParameter("treatmentId",objDischargeProcess1.getTretID());
						query.setParameter("ID",objDischargeProcess.getDischargesinglist().get(i).getID());
						query.executeUpdate();

					}

				}
			}

			return (int) 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	
		
		
	}

	private int getIDbyName(String name, int userId) {

		int UNM = 0;
		String sql = "select Doctor_ID from doctor where doc_name="+name;

		Integer id = (Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
		
		return id.intValue();

	
	}

	@Override
	public List<CustomizeTemplate> fetchIPDDischargeSummaryTemplate(CustomizeTemplate objTemplate) {

		List<CustomizeTemplate> CustomizeTemplateList = new ArrayList<CustomizeTemplate>();
		try {

			String sql = "SELECT * FROM ipd_patient_discharge_summary WHERE patientId="+objTemplate.getPatientId()+" and treatmentId="+objTemplate.getTreatmentId() +" and status = 'Y'";

			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> dsList = query.list();
			
			for (Map mapDS : dsList) {
				System.out.println(dsList);
				CustomizeTemplate tempObj = new CustomizeTemplate();
				tempObj.setIdCustomizeTemplate((Integer) mapDS
						.get("idipd_patient_discharge_summary"));
				tempObj.setTreatmentId(((Integer) mapDS.get("treatmentId"))
						.toString());
				tempObj.setPatientId(((Integer) mapDS.get("patientId"))
						.toString());
				tempObj.setSpecializaion(((Integer) mapDS
						.get("idCustomizeTemplate")).toString()); 
				tempObj.setTemp_name((String) mapDS.get("temp_name"));
				tempObj.setTemp_data((String) mapDS.get("temp_data"));
				tempObj.setType((String) mapDS.get("temp_type"));
				tempObj.setDate((String) mapDS.get("date"));

				String date = (String) mapDS.get("discharge_date");
				String time = (String) mapDS.get("discharge_time");
				String both = (date + "_" + time);
				tempObj.setDischarge_date(both);
				tempObj.setDischarge_type((String) mapDS.get("discharge_type"));

				CustomizeTemplateList.add(tempObj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			e.getMessage();
		}
		return CustomizeTemplateList;
	
	}

	@Override
	public Integer saveUpdateIPDDischargeSummaryTemplate(CustomizeTemplate objTemplate, String queryType) {

		Integer    isInserted = 0;
		String[] dischargeDate = null;
		dischargeDate = objTemplate.getDischarge_date().split(" ");
		String sql = "select count(*) from discharge_summery where Treatment_ID = "
				+  objTemplate.getTreatmentId();
		int countdis = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();
		
		if (objTemplate.getIdCustomizeTemplate() == 0) {
			/***************************** update treatment table ******************************/
			dischargeDate = objTemplate.getDischarge_date().split(" ");
			sql = "UPDATE treatment SET TendDate='"+dischargeDate[0]+"',outtime='"+dischargeDate[1]+"' WHERE Treatment_ID="+objTemplate.getTreatmentId();
			SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.executeUpdate();
			
			
			sql = "Select count(*) from ipd_patient_discharge_summary where patientId = "
					+ objTemplate.getPatientId()
					+ " and treatmentId = "
					+ objTemplate.getTreatmentId();
			
			Integer count = (Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();

			if (count == 0) {
				sql = "INSERT INTO ipd_patient_discharge_summary(treatmentId, patientId, "
						+ "idCustomizeTemplate, temp_name, temp_data, temp_type, date, status,discharge_date,discharge_time,discharge_type) "
						+ " VALUES ("+objTemplate.getTreatmentId()+","+objTemplate.getPatientId()+",'"+objTemplate.getSpecializaion()
						+ "','"+objTemplate.getTemp_name()+"','"+objTemplate.getTemp_data()+"','"+objTemplate.getType()+"',"
					    + "'"+objTemplate.getDate()+"','Y','"+dischargeDate[0]+"','"+dischargeDate[1]+"','"+objTemplate.getDischarge_type()+"')";
				try {
				query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
					
					if(countdis == 0){
						sql = "insert into discharge_summery(Treatment_ID,discharge_date,discharge_time,discharge_type)"
								+ " values("+objTemplate.getTreatmentId()+",'"+dischargeDate[0]+"','"+dischargeDate[1]+"','"+objTemplate.getDischarge_type()+"')";
						
						query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
						query.executeUpdate();
					}else{

						 sql = "select iddischarge_summery from discharge_summery where Treatment_ID = "
								+ objTemplate.getTreatmentId();
						
						Integer idautodis = (Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();

						
						sql = "update discharge_summery set discharge_date='"+dischargeDate[0]+"',discharge_time='"+dischargeDate[1]+"',discharge_type='"+objTemplate.getDischarge_type()+"'  "
								+ " WHERE Treatment_ID="+objTemplate.getTreatmentId()+" and iddischarge_summery="+idautodis;
						query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
						query.executeUpdate();
					
					}
					isInserted = 1;
				} catch (Exception e) {
					
					e.printStackTrace();
					System.out.println("database error...could not insert: "
							+ e.getMessage());
					isInserted = 0;
				}
			} else {
				isInserted = 3;
			}

		} else {

			sql = "Update ipd_patient_discharge_summary set temp_data='"+ objTemplate.getTemp_data()+"', date='"+objTemplate.getDate()+"',discharge_date='"+dischargeDate[0]+"',discharge_time='"+dischargeDate[1]+"',discharge_type='"+objTemplate.getDischarge_type()+"' where idipd_patient_discharge_summary='"+objTemplate.getIdCustomizeTemplate()+"' and treatmentId = '"+objTemplate.getTreatmentId()+"' and patientId='"+objTemplate.getPatientId()+"' ";
			try {
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
				if(countdis > 0){
					 sql = "select iddischarge_summery from discharge_summery where Treatment_ID = "
					+ objTemplate.getTreatmentId();
					 Integer idautodis = (Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
					
					sql = "update discharge_summery set discharge_date='"+dischargeDate[0]+"',discharge_time='"+dischargeDate[1]+"',discharge_type='"+objTemplate.getDischarge_type()+"'  "
							+ " WHERE Treatment_ID='"+objTemplate.getTreatmentId()+"' and iddischarge_summery='"+idautodis+"' ";
				 
					
					query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
				}else{

					sql = "insert into discharge_summery(Treatment_ID,discharge_date,discharge_time,discharge_type)"
							+ " values("+objTemplate.getTreatmentId()+",'"+dischargeDate[0]+"','"+dischargeDate[1]+"','"+objTemplate.getDischarge_type()+"')";
			
					query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
				}	
				isInserted = 2;
			} catch (Exception e) {
				e.printStackTrace();
				isInserted = 0;
			}
		}
		
		return isInserted;
	
	}

	@Override
	public Integer saveConsentForm(IpdConsentForm objIpdConsentForm, String queryType) {

		List<IpdConsentForm> arrICF = new ArrayList<IpdConsentForm>();
		try {
						
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			String todays_date = formatter.format(currentDate.getTime());

			if (queryType.equals("insert")) {

				String sql = "INSERT INTO ipdconsentform ( Treatment_ID , idCustomizeTemplate , templateData, dateOfInsert ) "
						+ " VALUES ( "+objIpdConsentForm.getTreatment_ID()+", '"+objIpdConsentForm.getIdCustomizeTemplate()+"', '"+objIpdConsentForm.getTemplateData()+"', '"+todays_date+"' )";

				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
			}
			else {

				String sql = "UPDATE ipdconsentform SET templateData='"+objIpdConsentForm.getTemplateData()+"',idCustomizeTemplate='"+objIpdConsentForm.getIdCustomizeTemplate()+"',dateOfInsert='"+todays_date+"' WHERE idipdConsentForm='"+objIpdConsentForm.getIdipdConsentForm()+"' ";
			
				SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
			}


		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return (int) 1;
	
		
	}

	@Override
	public List<IpdConsentForm> fetchAllConsentFormForTreatment(String tid) {
		String sql ="";
		List<IpdConsentForm> arrICF = new ArrayList<IpdConsentForm>();
		
		 sql = "select * from ipdconsentform where Treatment_ID = '"+tid+"' and status = 'Y' ";
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> dischargeDetails = query.list();


		for (Map rs : dischargeDetails) {
			IpdConsentForm objICF = new IpdConsentForm();

			objICF.setIdipdConsentForm((Integer) rs.get("idipdConsentForm"));
			objICF.setTreatment_ID((Integer) rs.get("Treatment_ID"));
			objICF.setIdCustomizeTemplate((Integer) rs
					.get("idCustomizeTemplate"));
			objICF.setTemplateData((String) rs.get("templateData"));
			objICF.setDateOfInsert(((Timestamp) rs.get("dateOfInsert"))
					.toString());

			arrICF.add(objICF);
		}
		return arrICF;
	
	}
	
	@Override
	public List<IpdConsentForm> fetchAllConsentFormForTreatment(String tid,int idipdConsentForm) {
		String sql ="";
		List<IpdConsentForm> arrICF = new ArrayList<IpdConsentForm>();	
		 sql = "select * from ipdconsentform where Treatment_ID = '"+tid+"' and status = 'Y' and idipdConsentForm = '"+idipdConsentForm+"'";
		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> dischargeDetails = query.list();


		for (Map rs : dischargeDetails) {
			IpdConsentForm objICF = new IpdConsentForm();

			objICF.setIdipdConsentForm((Integer) rs.get("idipdConsentForm"));
			objICF.setTreatment_ID((Integer) rs.get("Treatment_ID"));
			objICF.setIdCustomizeTemplate((Integer) rs
					.get("idCustomizeTemplate"));
			objICF.setTemplateData((String) rs.get("templateData"));
			objICF.setDateOfInsert(((Timestamp) rs.get("dateOfInsert"))
					.toString());

			arrICF.add(objICF);
		}
		return arrICF;
	
	}
	
	
	public PatientHeaderInfoDto getIpdPatientHeaderInfo(int treatmentId, int unitId) {

		Session s = sessionFactory.getCurrentSession();
		PatientHeaderInfoDto objDto = new PatientHeaderInfoDto();
		try {
			
			Query querySp = s.createSQLQuery("call sp_ipd_bill_get_patient_info_by_treatment_id(:treatmentId, :unitId)");
			querySp.setParameter("treatmentId", treatmentId);
			querySp.setParameter("unitId", unitId);
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientHeaderInfoDto.class));
			@SuppressWarnings("unchecked")
			List<PatientHeaderInfoDto> lstOpdQueueDto = querySp.list();		
			objDto.setListRegTreBillDto(lstOpdQueueDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<DoctorRoundDTO> fetchDoctorRoundsByDate(Integer treatmentId, Integer unitId, String fromDate,
			String toDate) {
		List<DoctorRoundSlaveDTO> list=new ArrayList<>();
		List<DoctorRoundDTO> list1=new ArrayList<>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		try {
			c.setTime(sdf.parse(toDate));
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		c.add(Calendar.DATE, 1);  // number of days to add
		toDate = sdf.format(c.getTime());  // dt is now the new date
		
		try {
		logger.info("IPDHistoryDaoImpl method fetchDoctorRounds for IPD called ");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundDTO.class);
		criteria.add(Restrictions.eq("treatmentId", treatmentId));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.ge("fromDate", sdf.parse(fromDate)));
		criteria.add(Restrictions.le("toDate", sdf.parse(toDate) ));
		   
		List<DoctorRoundDTO> listobj=criteria.list();
		if(listobj.size() > 0) {
			  for(DoctorRoundDTO obj:listobj) {
				  	//DoctorRoundDTO obj=	listobj.get(0);
				list= obj.getListDoctorRoundSlaveDTO().stream().filter(x-> x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
				obj.setListDoctorRoundSlaveDTO(list);
				list1.add(obj);
			  }
		}
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		//criteria.setFetchMode("listDoctorRoundSlaveDTO", FetchMode.SELECT);
		//return criteria.list();
		return list1;
	}

	@Override
	public List<DoctorRoundDTO> fetchDoctorRoundsByDateOnchange(Integer treatmentId, Integer unitId,
			String fromDate) {
		List<DoctorRoundSlaveDTO> list=new ArrayList<>();
		List<DoctorRoundDTO> list1=new ArrayList<>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
		logger.info("IPDHistoryDaoImpl method fetchDoctorRounds for IPD called ");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundDTO.class);
		criteria.add(Restrictions.eq("treatmentId", treatmentId));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("previousDate",sdf.parse(fromDate) ));
		
		   
		List<DoctorRoundDTO> listobj=criteria.list();
		if(listobj.size() > 0) {
		DoctorRoundDTO obj=	listobj.get(0);
		list= obj.getListDoctorRoundSlaveDTO().stream().filter(x-> x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
		obj.setListDoctorRoundSlaveDTO(list);
		list1.add(obj);
		}
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		//criteria.setFetchMode("listDoctorRoundSlaveDTO", FetchMode.SELECT);
		//return criteria.list();
		return list1;
	}

	@Override
	public List<Patient> featchPreviousICFpat(String type, Integer unitId, String searchBy, String value) {
		String sql="";
		List<Patient> liPatient = new ArrayList<Patient>();

		if (type.equals("onload") ) {	
			sql = "select distinct p.*,t.Treatment_ID from ehat_patient p,ehat_treatment t,ipdconsentform icf where p.Patient_ID = t.Patient_ID and t.Treatment_ID = icf.Treatment_ID and t.t_flag='N' group by p.patient_id order by p.Patient_ID desc limit 50 ";
			
		} else {
			sql = "select distinct p.*,t.Treatment_ID from ehat_patient p,ehat_treatment t,ipdconsentform icf where p.Patient_ID = t.Patient_ID and t.Treatment_ID = icf.Treatment_ID and t.t_flag='N' ";	//jitendra new software field

			if (searchBy.equals("byId")) {
				sql = sql + " AND p.Patient_ID = " + value;
				sql = sql + " group by p.patient_id";	
			} else {

				String TempValue = value;
				String[] NewValue = TempValue.split(" ");
				int len = NewValue.length;
				if (len == 1) {
					value = NewValue[0];
					sql = sql + " AND (p.f_name like" + "'%" + value
							+ "%' || p.m_name like" + "'%" + value
							+ "%' || p.l_name like" + "'%" + value
							+ "%') group by p.patient_id order by p.Patient_ID desc  limit 20 ";
				} else {
					value = "";
					len = NewValue.length;
					if (len == 2) {
						sql = sql + "AND (p.f_name like" + "'%" + NewValue[0]
								+ "%' && p.l_name like" + "'%" + NewValue[1]
								+ "%') group by p.patient_id order by p.Patient_ID desc  limit 20 ";
					} else {
						sql = sql + "AND (p.f_name like" + "'%" + NewValue[0]
								+ "%' && p.m_name like" + "'%" + NewValue[1]
								+ "%' && p.l_name like" + "'%" + NewValue[2]
								+ "%') group by p.patient_id order by p.Patient_ID desc  limit 20";
					}
				}
			}
		}

		SQLQuery query = (SQLQuery) sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> patMapLi = query.list();
		

		for (Map rs : patMapLi) {
			Patient objPatient = new Patient();
	
			objPatient.setPatient_ID((Integer) rs.get("patient_id"));
			int patID = (Integer) rs.get("patient_id");
			objPatient.setTitle((String) rs.get("prefix"));	//title	
			objPatient.setfName((String) rs.get("f_name"));	//fName
			objPatient.setmName((String) rs.get("m_name"));	//mName
			objPatient.setlName((String) rs.get("l_name"));	//lName
			objPatient.setMobile((String) rs.get("mobile"));
			//objPatient.setRegDate(formattedDate);	//reg_date 
			objPatient.setSex((String) rs.get("gender"));	//sex
			objPatient.setAge( String.valueOf(rs.get("age")) );	
			objPatient.setTreatment_id((Integer) rs.get("Treatment_ID"));
			liPatient.add(objPatient);
		}

		return liPatient;

	}
	
	@Override
	public DoctorRoundDTO fetchDoctorRoundsByDateOnchangeForPrint(Integer treatmentId, Integer unitId,
			String fromDate,String toDate) {
		List<DoctorRoundSlaveDTO> list=new ArrayList<>();
		List<DoctorRoundDTO> list1=new ArrayList<>();
		DoctorRoundDTO mainobj=new DoctorRoundDTO();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		Calendar c = Calendar.getInstance();
		try {
			c.setTime(sdf.parse(toDate));
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		c.add(Calendar.DATE, 1);  // number of days to add
		toDate = sdf.format(c.getTime());  // dt is now the new date
		try {
		logger.info("IPDHistoryDaoImpl method fetchDoctorRounds for IPD called ");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundDTO.class);
		criteria.add(Restrictions.eq("treatmentId", treatmentId));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.ge("fromDate",sdf.parse(fromDate) ));
		criteria.add(Restrictions.le("toDate", sdf.parse(toDate) ));
		   
		List<DoctorRoundDTO> listobj=criteria.list();
//		if(listobj.size() > 0) {
//			  for(DoctorRoundDTO obj:listobj) {
//				  	//DoctorRoundDTO obj=	listobj.get(0);
//				list= obj.getListDoctorRoundSlaveDTO().stream().filter(x-> x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
//				obj.setListDoctorRoundSlaveDTO(list);
//				list1.add(obj);
//			  }
//		}
		
		mainobj.setListDoctorRoundDTO(listobj);
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		
		//criteria.setFetchMode("listDoctorRoundSlaveDTO", FetchMode.SELECT);
		//return criteria.list();
		return mainobj;
	}

	@Override
	public int saveAdministratedDoneReverse(String action, String nursingMediIds, String callfrom,
			String treatmentId,HttpServletRequest request) {
		int revDone =0;
		
		
		
		
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		//SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		String todays_date = formatter.format(currentDate.getTime());
		SimpleDateFormat formatter1 = new SimpleDateFormat("hh:mm a");
		String todays_time = formatter1.format(currentDate.getTime());
		System.out.println("date:"+todays_date+"  time:"+todays_time);
		
		//int nursingMediIds = Integer.parseInt(id);
		String sql="";
		HttpSession session = request.getSession();
		int userId = (Integer) session.getAttribute("userId1");
		System.err.println("userid = = = =  => "+userId);
		
		try {
			
			//org.json.JSONObject json = new org.json.JSONObject(dayPrescription);
			
			System.out.println("nursingMediIds====> "+nursingMediIds);
			
			if(callfrom.equalsIgnoreCase("Done")){
				//1,2
				String obj = nursingMediIds;

				String[] objAry = obj.split(",");
				
				for (int i = 0; i < objAry.length; i++) {
					int nid = Integer.parseInt(objAry[i]);
					//System.out.println("nidddddd----->"+nid);
					
					
//					Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OPDPrescriptionDto.class);
//					criteria.add(Restrictions.eq("treatmentId", treatmentId));
//					criteria.add(Restrictions.eq("administeredStatus", unitId));
					
					sql="UPDATE ipd_nursingstation_medication_dashboard set administered_status='Y'"
							+ " where id_ipd_nursingStation_medication_dashboard="+nid;
					int executeUpdate = sessionFactory.getCurrentSession().createSQLQuery(sql).executeUpdate();
					/*
					 * sql =
					 * "UPDATE ipd_nursingstation_medication_dashboard set administered_status='Y',doneBy=?,doneDate=?,doneTime=? where idipd_nursingStation_medication_dashboard=? "
					 * ;
					 * 
					 * Query createQuery = sessionFactory.getCurrentSession().createQuery(sql);
					 * createQuery.setParameter("doneBy", userId);
					 * createQuery.setParameter("doneDate", todays_date);
					 * createQuery.setParameter("doneTime", todays_time);
					 * createQuery.setParameter("idipd_nursingStation_medication_dashboard", nid);
					 */
					//getJdbcTemplate().update(sql, new Object[] { userId,todays_date,todays_time,nid });
					
					
				}
				//for Medication Done
				revDone=1;
			}else{
				
				String obj = nursingMediIds;

				String[] objAry = obj.split(",");
				
				for (int i = 0; i < objAry.length; i++) {
					int nid = Integer.parseInt(objAry[i]);
					System.out.println("nidddddd----->"+nid);
				
					sql="UPDATE ipd_nursingstation_medication_dashboard set administered_status='N' "
							+ "where id_ipd_nursingStation_medication_dashboard="+nid;
					int executeUpdate = sessionFactory.getCurrentSession().createSQLQuery(sql).executeUpdate();
					/*
					 * sql =
					 * "UPDATE ipd_nursingstation_medication_dashboard set administered_status='N' ,reverseBy=? where idipd_nursingStation_medication_dashboard=? "
					 * ; //getJdbcTemplate().update(sql, new Object[] { userId ,nid });
					 * 
					 * Query createQuery = sessionFactory.getCurrentSession().createQuery(sql);
					 * //createQuery.setParameter("doneBy", userId);
					 * //createQuery.setParameter("doneDate", todays_date);
					 * createQuery.setParameter("reverseBy", userId);
					 * createQuery.setParameter("idipd_nursingStation_medication_dashboard", nid);
					 */
				}
				//For reverse
				revDone=2;
			}
			
			
			return revDone;
			
		} catch (Exception e) {
			e.printStackTrace();
			return revDone;
		}
		
		
	}

	@Override
	public int saveNursingDoctorRound(String doctorRoundId, String dtime, String nursingnotes,
			HttpServletRequest request) {
		
		int parseInt = Integer.parseInt(doctorRoundId);
		Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundDTO.class);
		createCriteria.add(Restrictions.eq("doctorRoundId", parseInt));
		createCriteria.add(Restrictions.eq("deleted", "N"));
		List<DoctorRoundDTO> list = createCriteria.list();
		//list.
		return 0;
	}

}
