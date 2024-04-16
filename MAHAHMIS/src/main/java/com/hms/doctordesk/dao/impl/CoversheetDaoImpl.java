package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.CoverSheetDao;
import com.hms.doctordesk.dto.AllergyddDto;
import com.hms.doctordesk.dto.CopyFromLastTreatment;
import com.hms.doctordesk.dto.CurrentEpisodeTemplate;
import com.hms.doctordesk.dto.DdClinicalDto;
import com.hms.doctordesk.dto.DdComplaintDto;
import com.hms.doctordesk.dto.DdHistoryDto;
import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.doctordesk.dto.DoctorDeskInstructionDto;
import com.hms.doctordesk.dto.DoctorDeskPatientDetails;
import com.hms.doctordesk.dto.PrescrptionMasterDto;
import com.hms.doctordesk.dto.SurgicalAdviceDto;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.HospitalSpecialisationDto;

@Repository
@Transactional
public class CoversheetDaoImpl implements CoverSheetDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<DoctorDeskPatientDetails> getAllTreatmentByPatId(int patientId) {
		// TODO Auto-generated method stub
		List<DoctorDeskPatientDetails> list = new ArrayList<DoctorDeskPatientDetails>();
		try {
			//String hql = "select treatmentId,departmentId,createdDateTime,emrHighrisk from TreatmentDto where patientId=:paitent_id and tFlag=:t_flag";
		String sql="select treatment_id,department_id,created_date_time from ehat_treatment where patient_id=? and t_flag=?";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setParameter(0, patientId);
		query.setParameter(1,"N");
		
		List<Object[]> queryList = query.list();
		for (Object[] objects : queryList) {
			DoctorDeskPatientDetails obj = new DoctorDeskPatientDetails();
			obj.setTreatmentId((Integer) objects[0]);
			Integer depId = (Integer) objects[1];
			if (depId == 1) {
				obj.setDepartmentName("OPD");
			} else if (depId == 2) {
				obj.setDepartmentName("IPD");
			} else {
				obj.setDepartmentName("Diagnostic");
			}
			obj.setDepartmentId((Integer) objects[1]);
			obj.setCreatedDateTime((Date) objects[2]);
			//obj.setEmrHighrisk((Integer) objects[3]);
			list.add(obj);
		}
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return list;
		
	}

	@Override
	public String saveTalergyOnPopup(AllergyddDto allergyddDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		allergyddDto.setUnitId(unitId);
		allergyddDto.setUserId(userId);
		if (allergyddDto.getId() == 0) {
			allergyddDto.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(allergyddDto);
			return "allergy saved successfully";

		} else {
			allergyddDto.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(allergyddDto);
			return "allergy updated successfully";
		}

	}

	@Override
	public List<AllergyddDto> getAllergyddDto(int patientId) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				AllergyddDto.class);
		criteria.add(Restrictions.eq("patientId", patientId));
		criteria.add(Restrictions.eq("deleted", "N"));
		return criteria.list();
	}

	@Override
	public List<AllergyddDto> getAllergyddDtoById(int id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				AllergyddDto.class);
		criteria.add(Restrictions.eq("id", id));
		criteria.add(Restrictions.eq("deleted", "N"));
		return criteria.list();
	}

	@Override
	public String deleteAllergy(String id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		// TODO Auto-generated method stub
		String hql = "update AllergyddDto d set d.deleted='Y',d.deletedDate=:date,d.deleted_by=:uid where id in ("
				+ id + ")";
		Query query2 = sessionFactory.getCurrentSession().createQuery(hql);
		query2.setParameter("date", new Date());
		query2.setParameter("uid", userId);
		int flag = query2.executeUpdate();
		System.out.println("flag" + flag);

		return "Allergy Deleted SuccessFully";
	}

	@Override
	public String updateFlagFordd(int flag, int patientId) {
		// TODO Auto-generated method stub
		String hql = "update RegistrationDto r set r.seropositiveFlag=:flag where patientId=:patid";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("flag", flag);
		query.setParameter("patid", patientId);
		query.executeUpdate();
		return "seropostive assigned successfully";
	}

	@Override
	public List<DoctorDeskPatientDetails> getseroFlag(int patientId) {
		// TODO Auto-generated method stub
		List<DoctorDeskPatientDetails> list = new ArrayList<DoctorDeskPatientDetails>();
		try {
		String hql = "select patientId, seropositiveFlag from RegistrationDto where patientId=:patientId";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("patientId", patientId);
		
		List<Object[]> queryList = query.list();
		for (Object[] objects : queryList) {
			DoctorDeskPatientDetails obj = new DoctorDeskPatientDetails();
			obj.setSeropositiveFlag((Integer) objects[1]);
			list.add(obj);
		}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public String updateFlagForEmrHighRisk(int flag, int treatmentId) {
		// TODO Auto-generated method stub
		String hql = "update TreatmentDto r set r.emrHighrisk=:flag where r.treatmentId=:treatmentId";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("flag", flag);
		query.setParameter("treatmentId", treatmentId);
		query.executeUpdate();
		return "emergency/high risk assigned successfully";
	}

	@Override
	public List<DoctorDeskPatientDetails> getEmrFlag(int treatmentId) {
		List<DoctorDeskPatientDetails> list = new ArrayList<DoctorDeskPatientDetails>();
		try {
		String hql = "select treatmentId, emrHighrisk from TreatmentDto where treatmentId=:treatmentId";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("treatmentId", treatmentId);
		
		List<Object[]> queryList = query.list();
		for (Object[] objects : queryList) {
			DoctorDeskPatientDetails obj = new DoctorDeskPatientDetails();
			obj.setEmrHighrisk((Integer) objects[1]);
			list.add(obj);
		}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<FolderDocDto> getFolderInfo(int folderId) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				FolderDocDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("folderId", folderId));
		return criteria.list();
	}

	@Override
	public List<DocUploadDto> getUplodedDocument(int patientId, int folderId) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				DocUploadDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("patientId", patientId));
		criteria.add(Restrictions.eq("folderId", folderId));
		return criteria.list();
	}

	@Override
	public String deleteDocs(String id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		// TODO Auto-generated method stub

		String hql = "update DocUploadDto d set d.deleted='Y',d.deletedDateTime=:date where d.docId in ("
				+ id + ")";
		Query query2 = sessionFactory.getCurrentSession().createQuery(hql);
		query2.setParameter("date", new Date());
		int flag = query2.executeUpdate();
		System.out.println("flag" + flag);

		return "Document Deleted SuccessFully";

	}

	public int returncurrentid(List<PrescrptionMasterDto> prelist) {
		int id = 0;
		List<PrescrptionMasterDto> list = prelist;
		for (PrescrptionMasterDto obj : prelist) {
			id = obj.getId();
			System.out.println("id:" + id);
		}
		return id;
	}

	public void setprecopylist(CopyFromLastTreatment copyFromLastTreatment,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

		Criteria ct = sessionFactory.getCurrentSession().createCriteria(
				PrescrptionMasterDto.class);
		ct.add(Restrictions.eq("deleted", "N"));
		ct.add(Restrictions.eq("treatmentId",
				copyFromLastTreatment.getTreatmentId()));
		System.out.println("SIZE" + ct.list().size());
		List<PrescrptionMasterDto> prlist = ct.list();
		// returncurrentid(ct.list());
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				PrescrptionMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("treatmentId",
				copyFromLastTreatment.getPriviousTretamentId()));
		List<PrescrptionMasterDto> totalprelist = new ArrayList<>();
		List<PrescrptionMasterDto> prelist = criteria.list();
		for (PrescrptionMasterDto obj : prelist) {
			PrescrptionMasterDto rs = new PrescrptionMasterDto();
			/*
			 * if(ct.list().size()==0){ rs.setId(0); }
			 */
			rs.setId(0);
			rs.setDrugName(obj.getDrugName());
			rs.setDosage(obj.getDosage());
			rs.setCreatedBy(userId);
			rs.setDuration(obj.getDuration());
			rs.setUnitId(rs.getUnitId());
			rs.setTreatmentId(copyFromLastTreatment.getTreatmentId());
			rs.setPatientId(obj.getPatientId());
			rs.setCurrentdate(obj.getCurrentdate());
			rs.setInstructionName(obj.getInstructionName());
			rs.setRouteName(obj.getRouteName());
			rs.setRouteId(obj.getRouteId());
			rs.setInstructionId(obj.getInstructionId());
			rs.setSosFlag(obj.getSosFlag());
			totalprelist.add(rs);
		}
		copyFromLastTreatment.setPrescrptionMasterDto(totalprelist);
	}

	public void setdiagnosyslist(CopyFromLastTreatment copyFromLastTreatment,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

		Criteria ct = sessionFactory.getCurrentSession().createCriteria(
				DiagonosisMasterDto.class);
		ct.add(Restrictions.eq("deleted", "N"));
		ct.add(Restrictions.eq("treatmentId",
				copyFromLastTreatment.getTreatmentId()));

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				DiagonosisMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("treatmentId",
				copyFromLastTreatment.getPriviousTretamentId()));
		List<DiagonosisMasterDto> totaldianosyslist = new ArrayList<>();
		List<DiagonosisMasterDto> list = criteria.list();
		for (DiagonosisMasterDto obj : list) {
			DiagonosisMasterDto rs = new DiagonosisMasterDto();
			/*
			 * if(ct.list().size()==0){ rs.setId(0); }
			 */
			rs.setId(0);
			rs.setComment(obj.getComment());
			rs.setUnitId(unitId);
			rs.setUserId(userId);
			rs.setCreatedBy(userId);
			rs.setIcd10_code(obj.getIcd10_code());
			rs.setDiagndesc(obj.getDiagndesc());
			rs.setDiagoName(obj.getDiagoName());
			rs.setDiagnoType(obj.getDiagnoType());
	//		rs.setTreatmentId(copyFromLastTreatment.getTreatmentId());
			rs.setDate(obj.getDate());
	//		rs.setPatientId(obj.getPatientId());
			rs.setComment(obj.getComment());
			totaldianosyslist.add(rs);
		}
		copyFromLastTreatment.setDiagonosisMasterDto(totaldianosyslist);
	}

	public void setSxAdvice(CopyFromLastTreatment copyFromLastTreatment,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

		Criteria ct = sessionFactory.getCurrentSession().createCriteria(
				SurgicalAdviceDto.class);
		ct.add(Restrictions.eq("deleted", "N"));
		ct.add(Restrictions.eq("treatmentId",
				copyFromLastTreatment.getTreatmentId()));

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				SurgicalAdviceDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("treatmentId",
				copyFromLastTreatment.getPriviousTretamentId()));
		List<SurgicalAdviceDto> totalsxlist = new ArrayList<>();
		List<SurgicalAdviceDto> sxlist = criteria.list();
		for (SurgicalAdviceDto obj : sxlist) {
			SurgicalAdviceDto rs = new SurgicalAdviceDto();
			/*
			 * if(ct.list().size()==0){ rs.setId(0); }
			 */
			rs.setId(0);
			rs.setCreatedBy(userId);
			rs.setUnitId(unitId);
			rs.setUserId(userId);
			rs.setProceduerDate(obj.getProceduerDate());
			rs.setProcedureGrpId(obj.getProcedureGrpId());
			rs.setProcedureName(obj.getProcedureName());
			rs.setTreatmentId(copyFromLastTreatment.getTreatmentId());
			rs.setPatientId(obj.getPatientId());
			rs.setProcedureTypeId(obj.getProcedureTypeId());
			rs.setProTypeName(obj.getProTypeName());
			rs.setProGrpName(obj.getProGrpName());
			rs.setPronameid(obj.getPronameid());
			rs.setAdviceDate(obj.getAdviceDate());
			rs.setSadviceType(obj.getSadviceType());
			rs.setProceduerDate(obj.getProceduerDate());
			rs.setNote(obj.getNote());
			rs.setRiskFactor(obj.getRiskFactor());
			totalsxlist.add(rs);
		}
		copyFromLastTreatment.setSurgicalAdviceDto(totalsxlist);
	}

	public void setClinicallist(CopyFromLastTreatment copyFromLastTreatment,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

		Criteria ct = sessionFactory.getCurrentSession().createCriteria(
				DdClinicalDto.class);
		ct.add(Restrictions.eq("deleted", "N"));
		ct.add(Restrictions.eq("treatment_id",
				copyFromLastTreatment.getTreatmentId()));

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				DdClinicalDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("treatment_id",
				copyFromLastTreatment.getPriviousTretamentId()));
		List<DdClinicalDto> totalclinlist = new ArrayList<>();
		List<DdClinicalDto> clinlist = criteria.list();
		for (DdClinicalDto obj : clinlist) {
			DdClinicalDto rs = new DdClinicalDto();
			/*
			 * if(ct.list().size()==0){ rs.setClinicalId(0); }
			 */
			rs.setClinicalId(0);
			rs.setUnitId(unitId);
			rs.setUserId(userId);
			rs.setCreatedBy(userId);
			rs.setClinicalName(obj.getClinicalName());
			rs.setClinicalCode(obj.getClinicalCode());
			rs.setPatientId(obj.getPatientId());
			rs.setTreatment_id(copyFromLastTreatment.getTreatmentId());
			totalclinlist.add(rs);
		}
		copyFromLastTreatment.setDdClinicalDto(totalclinlist);
	}

	public void setComplaintList(CopyFromLastTreatment copyFromLastTreatment,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

		Criteria ct = sessionFactory.getCurrentSession().createCriteria(
				DdComplaintDto.class);
		ct.add(Restrictions.eq("deleted", "N"));
		ct.add(Restrictions.eq("treatment_id",
				copyFromLastTreatment.getTreatmentId()));

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				DdComplaintDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("treatment_id",
				copyFromLastTreatment.getPriviousTretamentId()));
		List<DdComplaintDto> totalcomplist = new ArrayList<>();
		List<DdComplaintDto> complist = criteria.list();
		for (DdComplaintDto obj : complist) {
			DdComplaintDto rs = new DdComplaintDto();
			/*
			 * if(ct.list().size()==0){ rs.setComplaintId(0); }
			 */
			rs.setComplaintId(0);
			rs.setUnitId(unitId);
			rs.setUserId(userId);
			rs.setCreatedBy(userId);
			rs.setComplaintName(obj.getComplaintName());
			rs.setPatientId(obj.getPatientId());
			rs.setComplaintContent(obj.getComplaintContent());
			rs.setComplaintCode(obj.getComplaintCode());
			rs.setTreatment_id(copyFromLastTreatment.getTreatmentId());
			totalcomplist.add(rs);
		}
		copyFromLastTreatment.setDdComplaintDto(totalcomplist);
	}

	public void sethistorylist(CopyFromLastTreatment copyFromLastTreatment,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

		Criteria ct = sessionFactory.getCurrentSession().createCriteria(
				DdHistoryDto.class);
		ct.add(Restrictions.eq("deleted", "N"));
		ct.add(Restrictions.eq("treatment_id",
				copyFromLastTreatment.getTreatmentId()));

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				DdHistoryDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("treatment_id",
				copyFromLastTreatment.getPriviousTretamentId()));
		List<DdHistoryDto> totalhistlist = new ArrayList<>();
		List<DdHistoryDto> histlist = criteria.list();
		for (DdHistoryDto obj : histlist) {
			DdHistoryDto rs = new DdHistoryDto();
			/*
			 * if(ct.list().size()==0){ rs.setHis_Id(0); }
			 */
			rs.setHis_Id(0);
			rs.setUnitId(unitId);
			rs.setUserId(userId);
			rs.setCreatedBy(userId);
			rs.setFamilyHistory(obj.getFamilyHistory());
			rs.setFamilyHistoryContent(obj.getFamilyHistoryContent());
			rs.setPersonalHistory(obj.getPersonalHistory());
			rs.setPatientId(obj.getPatientId());
			rs.setTreatment_id(copyFromLastTreatment.getTreatmentId());
			totalhistlist.add(rs);
		}
		copyFromLastTreatment.setDdHistoryDto(totalhistlist);
	}

	public void setBillDetailslist(CopyFromLastTreatment copyFromLastTreatment,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

		Criteria ct = sessionFactory.getCurrentSession().createCriteria(
				BillDetailsDto.class);
		ct.add(Restrictions.eq("deleted", "N"));
		ct.add(Restrictions.eq("treatmentId",
				copyFromLastTreatment.getTreatmentId()));

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				BillDetailsDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("treatmentId",
				copyFromLastTreatment.getPriviousTretamentId()));
		List<BillDetailsDto> totalbillList = new ArrayList<>();
		List<BillDetailsDto> billlist = criteria.list();
		for (BillDetailsDto obj : billlist) {
			BillDetailsDto rs = new BillDetailsDto();
			/*
			 * if(ct.list().size()==0){ rs.setBillDetailsId(0); }
			 */
			rs.setBillDetailsId(0);
			rs.setUnitId(unitId);
			rs.setCreatedBy(userId);
			rs.setCreatedDateTime(new Date());
			rs.setTreatmentId(copyFromLastTreatment.getTreatmentId());
			rs.setPatienttId(obj.getPatienttId());
			rs.setCenterPatientId(obj.getCenterPatientId());
			rs.setDepartmentId(obj.getDepartmentId());
			rs.setBillId(obj.getBillId());
			rs.setServiceId(obj.getServiceId());
			rs.setSubServiceId(obj.getSubServiceId());
			rs.setRate(obj.getRate());
			rs.setAmount(obj.getAmount());
			rs.setOtherAmount(obj.getOtherAmount());
			rs.setClinicalnotes(obj.getClinicalnotes());
			rs.setInstructions(obj.getInstructions());
			rs.setUrgentflag(obj.getUrgentflag());
			rs.setSendToRisFlag(obj.getSendToRisFlag());
			rs.setDrdeskflag(obj.getDrdeskflag());
			rs.setDeleteFrom(obj.getDeleteFrom());
			rs.setSndToRisFlag(obj.getSendToRisFlag());
			rs.setSndToLabFlag(obj.getSndToLabFlag());
			rs.setSponsorId(obj.getSponsorId());
			rs.setChargesSlaveId(obj.getChargesSlaveId());
			totalbillList.add(rs);
		}

		copyFromLastTreatment.setBillDetailsDto(totalbillList);
	}

	public void setInstruction(CopyFromLastTreatment copyFromLastTreatment,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

		Criteria ct = sessionFactory.getCurrentSession().createCriteria(
				DoctorDeskInstructionDto.class);
		ct.add(Restrictions.eq("treatment_id",
				copyFromLastTreatment.getTreatmentId()));
		ct.add(Restrictions.eq("deleted", "N"));

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				DoctorDeskInstructionDto.class);
		criteria.add(Restrictions.eq("treatment_id",
				copyFromLastTreatment.getPriviousTretamentId()));
		criteria.add(Restrictions.eq("deleted", "N"));
		List<DoctorDeskInstructionDto> totallistofinst = new ArrayList<>();
		List<DoctorDeskInstructionDto> listofinst = criteria.list();
		for (DoctorDeskInstructionDto obj : listofinst) {
			DoctorDeskInstructionDto rs = new DoctorDeskInstructionDto();
			/*
			 * if(ct.list().size()==0){ rs.setInstruction_id(0); }
			 */
			rs.setInstruction_id(0);
			rs.setUnitId(unitId);
			rs.setCreatedBy(userId);
			rs.setId(obj.getId());
			rs.setInstruction_name(obj.getInstruction_name());
			rs.setPatientId(obj.getPatientId());
			rs.setTreatment_id(copyFromLastTreatment.getTreatmentId());
			totallistofinst.add(rs);
		}
		copyFromLastTreatment.setDoctorDeskInstructionDto(totallistofinst);
	}

	@Override
	public String copyfromLastTreatment(
			CopyFromLastTreatment copyFromLastTreatment,
			HttpServletRequest request, String callfrom) {
		// TODO Auto-generated method stub
		if (callfrom.equalsIgnoreCase("complaints")) {
			setComplaintList(copyFromLastTreatment, request);
			sessionFactory.getCurrentSession().merge(copyFromLastTreatment);
			return "Complaints Copied SuccessFully";

		} else if (callfrom.equalsIgnoreCase("prescription")) {
			setprecopylist(copyFromLastTreatment, request);
			sessionFactory.getCurrentSession().merge(copyFromLastTreatment);
			return "Prescription Copied SuccessFully";

		}else if(callfrom.equalsIgnoreCase("saveastemplate")){
			setprecopylist(copyFromLastTreatment, request);
			setComplaintList(copyFromLastTreatment, request);
			setdiagnosyslist(copyFromLastTreatment, request);
			setSxAdvice(copyFromLastTreatment, request);
			setClinicallist(copyFromLastTreatment, request);
			setInstruction(copyFromLastTreatment, request);
			setBillDetailslist(copyFromLastTreatment, request);
			sessionFactory.getCurrentSession().merge(copyFromLastTreatment);
			return "Template Used SuccessFully";
			
		}
		else {
			setprecopylist(copyFromLastTreatment, request);
			sethistorylist(copyFromLastTreatment, request);
			setComplaintList(copyFromLastTreatment, request);
			setdiagnosyslist(copyFromLastTreatment, request);
			setSxAdvice(copyFromLastTreatment, request);
			setClinicallist(copyFromLastTreatment, request);
			setInstruction(copyFromLastTreatment, request);
			setBillDetailslist(copyFromLastTreatment, request);
			sessionFactory.getCurrentSession().merge(copyFromLastTreatment);
			return "Treatment Copied SuccessFully";

		}
			}

	@Override
	public List<DoctorDeskInstructionDto> fetchpatientVise(int patientId) {
		// TODO Auto-generated method stub
		String hql = "select instruction_name,createdDate from DoctorDeskInstructionDto where patientId=:patid and deleted=:deleted";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("patid", patientId);
		query.setParameter("deleted", "N");
		List<DoctorDeskInstructionDto> list = new ArrayList<DoctorDeskInstructionDto>();
		List<Object[]> queryList = query.list();
		for (Object[] objects : queryList) {
			DoctorDeskInstructionDto rs = new DoctorDeskInstructionDto();
			rs.setInstruction_name((String) objects[0]);
			rs.setCreatedDate((Date) objects[1]);
			list.add(rs);
		}
		return list;
	}

	@Override
	public String saveAsTemplate(CurrentEpisodeTemplate currentEpisodeTemplate,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
		currentEpisodeTemplate.setUnitId(unitId);
		currentEpisodeTemplate.setUserId(userId);
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CurrentEpisodeTemplate.class);
         criteria.add(Restrictions.eq("templateName", currentEpisodeTemplate.getTemplateName()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
		
		if(currentEpisodeTemplate.getId()==0){
			currentEpisodeTemplate.setCreatedBy(userId);
			 if(criteria.uniqueResult() != null){
	        	 return "Template already exist";
	         }
			 sessionFactory.getCurrentSession().merge(currentEpisodeTemplate);
			 return "Template Saved SuccessFully";
		}
			
		else{
			currentEpisodeTemplate.setUpdatedBy(userId);
			 sessionFactory.getCurrentSession().merge(currentEpisodeTemplate);
				return "Template Updated Successfully";
		}
		
			
	}
		
		

	@Override
	public List<CurrentEpisodeTemplate> getTemplateList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CurrentEpisodeTemplate.class);
		criteria.add(Restrictions.eq("deleted","N"));
		criteria.add(Restrictions.eq("unitId",unitId));
		return criteria.list();
	}

	@Override
	public List<CurrentEpisodeTemplate> getTemplateListById(int id) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CurrentEpisodeTemplate.class);
		criteria.add(Restrictions.eq("deleted","N"));
		criteria.add(Restrictions.eq("id", id));
		return criteria.list();
	}

	@Override
	public String deleteTemplate(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session=request.getSession();
		int userId = (int) session.getAttribute("userId1");
		CurrentEpisodeTemplate currentEpisodeTemplate = (CurrentEpisodeTemplate) sessionFactory.getCurrentSession().get(CurrentEpisodeTemplate.class,id);
		currentEpisodeTemplate.setDeleted("Y");
		currentEpisodeTemplate.setDeleted_by(userId);
		currentEpisodeTemplate.setDeletedDate(new Date());
		sessionFactory.getCurrentSession().merge(currentEpisodeTemplate);
		return "Template Deleted SuccessFully";
	}

	@Override
	public List<HospitalSpecialisationDto> getSpcialization(HttpServletRequest request,String callfrom) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		
		List<HospitalSpecialisationDto> list = new ArrayList<>();
		if(callfrom.equalsIgnoreCase("onload")){
			Criteria ct = sessionFactory.getCurrentSession().createCriteria(HospitalSpecialisationDto.class);
			ct.add(Restrictions.eq("status","Y"));
			list = ct.list();
		}
		else{
			/* Due to incomplete relation i am using sql querry
			 * 
			 * String hql ="select hsp.specialisationId,hsp.specializationName,usr.user_ID  from Users usr left join usr.objDoctor doct" +
					    " left join doct.hospitalSpecialisationDto hsp where usr.user_ID=:userId and hsp.status=:deleted";
			
			  Query query = sessionFactory.getCurrentSession().createQuery(hql);
			  
			  
			  query.setParameter("userId", userId);
			  query.setParameter("deleted","N");
			  System.out.println("query"+query);
			  List<Object[]> queryList = query.list();
			  for (Object[] objects : queryList) {
				  HospitalSpecialisationDto obj = new HospitalSpecialisationDto();
				  obj.setSpecialisationId((Integer)objects[0]);
				  obj.setSpecializationName((String)objects[1]);
		          list.add(obj);		  
			  }*/
			String sql = "SELECT user.User_ID,hos.specialization_name,hos.idhospital_Specialization FROM users user LEFT JOIN doctor d ON user.User_ID = d.User_ID LEFT JOIN hospital_specialization hos ON hos.idhospital_Specialization = d.specialisation where hos.status='Y' and d.User_ID="+userId;
			System.out.println(sql);
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> querylist = query.list();
			
			for (Map<String, Object> row : querylist) {
				HospitalSpecialisationDto obj = new HospitalSpecialisationDto();
				obj.setSpecialisationId((Integer)row.get("idhospital_Specialization"));
				obj.setSpecializationName((String)row.get("specialization_name"));
				list.add(obj);
			}
			  
		}
		return list;
	}

	@Override
	public List<CurrentEpisodeTemplate> accessTemplateAutoSuggestion(
			String searchText,String spcName,String orgName, int type, HttpServletRequest request) {
		List<CurrentEpisodeTemplate> accesstotallist = new ArrayList<CurrentEpisodeTemplate>();
		if(orgName.equals("NULL")){
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(CurrentEpisodeTemplate.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId",unitId));
		criteria.add(Restrictions.eq("type", type));
		criteria.add(Restrictions.eq("favFlag",0));
		criteria.add(Restrictions.eq("spcName", spcName));
		criteria.add(Restrictions.ilike("templateName", searchText,
				MatchMode.START));
		
		criteria.setProjection(Projections.projectionList()
				.add(Projections.property("id"))
				.add(Projections.property("templateName")));
		criteria.setMaxResults(10);
		List<Object[]> list = (List<Object[]>) criteria.list();
		for (Object[] row : list) {
			CurrentEpisodeTemplate obj = new CurrentEpisodeTemplate();
			obj.setId((Integer) row[0]);
			obj.setTemplateName((String) row[1]);
			accesstotallist.add(obj);
		}
		}else{
			HttpSession session=request.getSession();
			int unitId=(int)session.getAttribute("uId");
			//List<CurrentEpisodeTemplate> accesstotallist = new ArrayList<CurrentEpisodeTemplate>();
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CurrentEpisodeTemplate.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("type", type));
			criteria.add(Restrictions.eq("favFlag",0));
			criteria.add(Restrictions.eq("spcName", spcName));
			criteria.add(Restrictions.eq("orgName",orgName));
			criteria.add(Restrictions.ilike("templateName", searchText,
					MatchMode.START));
			
			criteria.setProjection(Projections.projectionList()
					.add(Projections.property("id"))
					.add(Projections.property("templateName")));
			criteria.setMaxResults(10);
			List<Object[]> list = (List<Object[]>) criteria.list();
			for (Object[] row : list) {
				CurrentEpisodeTemplate obj = new CurrentEpisodeTemplate();
				obj.setId((Integer) row[0]);
				obj.setTemplateName((String) row[1]);
				accesstotallist.add(obj);
		}
		}
		return accesstotallist;
	}

	@Override
	public List<CurrentEpisodeTemplate> getoverallAccessTemplateList(
			String spcName,String orgName, int type,HttpServletRequest request) {
		if(orgName.equals("NULL")){
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CurrentEpisodeTemplate.class);
		criteria.add(Restrictions.eq("spcName", spcName));
		//criteria.add(Restrictions.eq("orgName",orgName));
		criteria.add(Restrictions.eq("type",type));
		criteria.add(Restrictions.eq("deleted","N"));
		Criterion  crit1= Restrictions.eq("favFlag",0);
		Criterion  crit2=Restrictions.eq("favFlag",1);
		criteria.add(Restrictions.or(crit1,crit2));
		criteria.add(Restrictions.eq("unitId",unitId));
		return criteria.list();
		}else{
			HttpSession session=request.getSession();
			int unitId=(int)session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CurrentEpisodeTemplate.class);
			criteria.add(Restrictions.eq("spcName", spcName));
			criteria.add(Restrictions.eq("orgName",orgName));
			criteria.add(Restrictions.eq("type",type));
			criteria.add(Restrictions.eq("deleted","N"));
			Criterion  crit1= Restrictions.eq("favFlag",0);
			Criterion  crit2=Restrictions.eq("favFlag",1);
			criteria.add(Restrictions.or(crit1,crit2));
			criteria.add(Restrictions.eq("unitId",unitId));
			return criteria.list();
		}
			
	}

	@Override
	public List<CurrentEpisodeTemplate> getAccessFavTemplate(String searchText,String spcName,String orgName,
			int type, HttpServletRequest request) {
		List<CurrentEpisodeTemplate> accesstotfavlist = new ArrayList<CurrentEpisodeTemplate>();
		if(orgName.equals("NULL")){
			HttpSession session=request.getSession();
			int unitId=(int)session.getAttribute("uId");
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CurrentEpisodeTemplate.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("type", type));
			criteria.add(Restrictions.eq("spcName", spcName));
			criteria.add(Restrictions.eq("favFlag",1));
			criteria.add(Restrictions.ilike("templateName", searchText,
					MatchMode.START));
			
			criteria.setProjection(Projections.projectionList()
					.add(Projections.property("id"))
					.add(Projections.property("templateName")));
			criteria.setMaxResults(10);
			List<Object[]> list = (List<Object[]>) criteria.list();
			for (Object[] row : list) {
				CurrentEpisodeTemplate obj = new CurrentEpisodeTemplate();
				obj.setId((Integer) row[0]);
				obj.setTemplateName((String) row[1]);
				accesstotfavlist.add(obj);
			}
		}else{
			HttpSession session=request.getSession();
			int unitId=(int)session.getAttribute("uId");
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CurrentEpisodeTemplate.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("type", type));
			criteria.add(Restrictions.eq("favFlag",1));
			criteria.add(Restrictions.eq("spcName", spcName));
			criteria.add(Restrictions.eq("orgName",orgName));
			criteria.add(Restrictions.ilike("templateName", searchText,
					MatchMode.START));
			
			criteria.setProjection(Projections.projectionList()
					.add(Projections.property("id"))
					.add(Projections.property("templateName")));
			criteria.setMaxResults(10);
			List<Object[]> list = (List<Object[]>) criteria.list();
			for (Object[] row : list) {
				CurrentEpisodeTemplate obj = new CurrentEpisodeTemplate();
				obj.setId((Integer) row[0]);
				obj.setTemplateName((String) row[1]);
				accesstotfavlist.add(obj);
		}
		}
			return accesstotfavlist;
	}

	@Override
	public String rightShift(int id, HttpServletRequest request) {
		HttpSession session=request.getSession();
		int userId = (int) session.getAttribute("userId1");
		CurrentEpisodeTemplate currentEpisodeTemplate = (CurrentEpisodeTemplate) sessionFactory.getCurrentSession().get(CurrentEpisodeTemplate.class,id);
		currentEpisodeTemplate.setFavFlag(1);
		currentEpisodeTemplate.setDeleted_by(userId);
		currentEpisodeTemplate.setDeletedDate(new Date());
		sessionFactory.getCurrentSession().merge(currentEpisodeTemplate);
		return "All template shifted SuccessFully";
	}

	@Override
	public String leftShift(int id, HttpServletRequest request) {
		HttpSession session=request.getSession();
		int userId = (int) session.getAttribute("userId1");
		CurrentEpisodeTemplate currentEpisodeTemplate = (CurrentEpisodeTemplate) sessionFactory.getCurrentSession().get(CurrentEpisodeTemplate.class,id);
		currentEpisodeTemplate.setFavFlag(0);
		currentEpisodeTemplate.setDeleted_by(userId);
		currentEpisodeTemplate.setDeletedDate(new Date());
		sessionFactory.getCurrentSession().merge(currentEpisodeTemplate);
		return "Favorite template shifted SuccessFully";
	}

	@Override
	public List<CurrentEpisodeTemplate> getAccessTemplateById(int id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				DiagonosisMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("id", id));
		List<CurrentEpisodeTemplate> list = criteria.list();
		return list;
	}

	

	@Override
	public List<CurrentEpisodeTemplate> getTreatmentType(int id) {
		String hql = "select treatmentId,type,favFlag from CurrentEpisodeTemplate where id=:id";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", id);
		List<CurrentEpisodeTemplate> list = new ArrayList<CurrentEpisodeTemplate>();
		List<Object[]> queryList = query.list();
		for (Object[] objects : queryList) {
			CurrentEpisodeTemplate obj = new CurrentEpisodeTemplate();
			obj.setTreatmentId((Integer) objects[0]);
			obj.setType((Integer) objects[1]);
			obj.setFavFlag((int) objects[2]);
			list.add(obj);
		}
		return list;
	}

}
