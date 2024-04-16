package com.hms.ivf.service.impl;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dto.HallManagementDto;
import com.hms.dto.Hall;
import com.hms.dto.TreatmentBeds;
import com.hms.dto.district_taluka_city;
import com.hms.ehat.dao.GenericDao;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IvfDao;
import com.hms.ivf.dto.IVFAdmissionNoteDTO;
import com.hms.ivf.dto.IVFBatchMaster;
import com.hms.ivf.dto.IVFBatchSlave;
import com.hms.ivf.dto.IVFBatchViewDto;
import com.hms.ivf.dto.IVFClinicalEvaluationDTO;
import com.hms.ivf.dto.IVFClinicalEvaluationForAllergyAlertDTO;
import com.hms.ivf.dto.IVFClinicalEvaluatonPregnancyDTO;
import com.hms.ivf.dto.IVFcoupleViewDto;
import com.hms.ivf.dto.IvfPatientInfo;
import com.hms.ivf.dto.IvfQueueDTO;
import com.hms.ivf.dto.IvfTreBillDto;
import com.hms.ivf.dto.SurgeryAdviceForIvfDTO;
import com.hms.ivf.service.IvfService;

@Service
@Transactional
public class IvfServiceImpl implements IvfService {

	@Autowired
	IvfDao ivfDao;

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	GenericDao genericDao;

	@Override
	public List<RegistrationDto> fetchpatientnameMale(String patientName, String callfrom) {
		return ivfDao.fetchpatientnameMale(patientName, callfrom);
	}

	@Override
	public List<RegistrationDto> fetchpatientnameFemale(String patientName, String callfrom) {
		// TODO Auto-generated method stub
		return ivfDao.fetchpatientnameFemale(patientName, callfrom);
	}

	@Override
	public RegistrationDto getPatientDataById(Integer patId) {
		return ivfDao.getPatientDataById(patId);
	}

	@Override
	public List<district_taluka_city> getAddressList(int id) {
		// TODO Auto-generated method stub
		return ivfDao.getAddressList(id);
	}

	@Override
	@Transactional
	public int generateCoupleId(String ivfCoupleDetails, String queryType, HttpServletRequest request) {
		int coupleId = ivfDao.generateCoupleId(ivfCoupleDetails, queryType, request);
		return coupleId;
	}

	@Override
	@Transactional
	public List<IVFcoupleViewDto> getIVFCoupleList(String coupleFlag,String fromDate,String toDate) {

		return ivfDao.getIVFCoupleList(coupleFlag, fromDate, toDate);
	}

	@Override
	@Transactional
	public String getCountCoupleMaster(String coupleFlag, HttpServletRequest request) {
		return ivfDao.getCountCoupleMaster(coupleFlag, request);
	}

	@Override
	@Transactional
	public int changeStatusOfIvfCouple(int coupleID, String coupleFlag, String narration, HttpServletRequest request) {
		String sql = "";
		int response = 0;

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		try {

			String hql = "update IVFCoupleDTO set coupleFlag =:coupleFlag, narration =:narration, statusUpdatedBy =:statusUpdatedBy,statusUpdatedDateTime =:statusUpdatedDateTime WHERE ivfCoupleId =:ivfCoupleId";
			Query query1 = sessionFactory.getCurrentSession().createQuery(hql);

			query1.setParameter("coupleFlag", coupleFlag);
			query1.setParameter("narration", narration);
			query1.setParameter("statusUpdatedBy", userId);
			query1.setParameter("statusUpdatedDateTime", new Date(new java.util.Date().getTime()));
			query1.setParameter("ivfCoupleId", coupleID);

			query1.executeUpdate();
			response=1;
		} catch (Exception e) {
			e.printStackTrace();
			return response;
		}
		return response;
	}

	@Override
	@Transactional
	public IVFcoupleViewDto autoSuggestionForCoupleDetails(String findingName, int patSearchType, String callFrom) {
		return ivfDao.autoSuggestionForCoupleDetails(findingName, patSearchType, callFrom);
	}

	@Override
	@Transactional
	public IVFcoupleViewDto autoSuggestionForCoupleDetails1(int coupleId, String callFrom) {
		return ivfDao.autoSuggestionForCoupleDetails1(coupleId, callFrom);
	}

	@Override
	@Transactional
	public int getBedAllocatedStatus(int treatmentId, HttpServletRequest request) {
		SQLQuery query = null;
		try {

			query = sessionFactory.getCurrentSession().createSQLQuery(
					"select count(*) from treatment_beds where status = 'Y' and Treatment_ID =" + treatmentId);

		} catch (Exception e) {
			e.printStackTrace();
		}
		BigInteger count = (BigInteger) query.uniqueResult();
		return count.intValue();
	}

	@Override
	@Transactional
	public int generateBatch(String ivfBatchMasterDetails, IVFBatchSlave ivfBatchSlaveDetails, String ivfBatcInsertType,
			HttpServletRequest request) {
		int BatchId = ivfDao.generateBatch(ivfBatchMasterDetails, ivfBatchSlaveDetails, ivfBatcInsertType, request);
		return BatchId;
	}

	@Override
	@Transactional
	public List<IVFBatchMaster> getIVFBatchedCoupleList(String ivfBatchStatus) {

		return ivfDao.getIVFBatchedCoupleList(ivfBatchStatus);
	}

	@Override
	@Transactional
	public String getCountBatchMaster(String ivfBatchStatus, HttpServletRequest request) {
		return ivfDao.getCountBatchMaster(ivfBatchStatus, request);
	}

	@Override
	@Transactional
	public List<IVFBatchViewDto> getBatchedCoupleDetails(Integer batchID, String ivfCoupleStatus) {
		return ivfDao.getBatchedCoupleDetails(batchID, ivfCoupleStatus);
	}

	@Override
	@Transactional
	public int CancelIVFBatch(int batchID, String BatchCancleNarration, HttpServletRequest request) {
		String sql = "";
		int response = 0;

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		try {

			String hql = "update IVFBatchMaster set ivfBatchStatus =:ivfBatchStatus, BatchCancelNarration =:BatchCancelNarration, cancelledBy =:cancelledBy,cancelledDateTime =:cancelledDateTime WHERE ivfBatchMasterId =:ivfBatchMasterId";
			Query query1 = sessionFactory.getCurrentSession().createQuery(hql);

			query1.setParameter("ivfBatchStatus", "Y");
			query1.setParameter("BatchCancelNarration", BatchCancleNarration);
			query1.setParameter("cancelledBy", userId);
			query1.setParameter("cancelledDateTime", new Date(new java.util.Date().getTime()));
			query1.setParameter("ivfBatchMasterId", batchID);

			query1.executeUpdate();

			String hql1 = "update IVFCoupleDTO C set ivfBatchStatus =:ivfBatchStatus WHERE ivfCoupleId = (select CoupleId from IVFBatchSlave where CoupleId = C.ivfCoupleId AND ivfBatchMasterId =:ivfBatchMasterId)";
			Query query2 = sessionFactory.getCurrentSession().createQuery(hql1);

			query2.setParameter("ivfBatchStatus", "not generated");
			query2.setParameter("ivfBatchMasterId", batchID);

			query2.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return response;
		}
		return response;
	}

	@Override
	@Transactional
	public IVFBatchMaster autoSuggestionForBatchDetails(String findingName, int BatchSearchType, String callFrom) {
		return ivfDao.autoSuggestionForBatchDetails(findingName, BatchSearchType, callFrom);
	}

	@Override
	@Transactional
	public IVFBatchMaster autoSuggestionForBatchDetails1(int batchId, String callFrom) {
		return ivfDao.autoSuggestionForBatchDetails1(batchId, callFrom);
	}

	@Override
	@Transactional
	public String fetchNarrationOfCouple(int ivfCoupleId, HttpServletRequest request) {
		String narration = "";
		narration = genericDao.getStringValOfObject("ehat_ivf_couple", "narration", ivfCoupleId, "ivf_couple_id");
		return narration;
	}

	@Override
	public int saveOrUpdateSurgeryadvice(SurgeryAdviceForIvfDTO surgeryAdviceForIvfDTO, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return ivfDao.saveOrUpdateSurgeryadvice(surgeryAdviceForIvfDTO, request);
	}

	@Override
	public List<SurgeryAdviceForIvfDTO> fetchSurgeryAdviceInfoForIVF(Integer treatmentId) {
		return ivfDao.fetchSurgeryAdviceInfoForIVF(treatmentId);
	}

	@Override
	public String deleteDataforsurgeryAdviceBasicInfo(Integer adviceMasterId, Integer userId) {
		// TODO Auto-generated method stub
		return ivfDao.deleteDataforsurgeryAdviceBasicInfo(adviceMasterId, userId);
	}

	@Override
	public SurgeryAdviceForIvfDTO editsurgeryadvicerecord(Integer adviceID) {
		// TODO Auto-generated method stub
		return ivfDao.editsurgeryadvicerecord(adviceID);
	}

	@Override
	public int saveOrUpdateAdmissionNote(IVFAdmissionNoteDTO obj, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return ivfDao.saveOrUpdateAdmissionNote(obj, request);
	}

	@Override
	public List<IVFAdmissionNoteDTO> fetchRecordadmissionnoteForIVF(Integer treatmentId) {
		// TODO Auto-generated method stub
		return ivfDao.fetchRecordadmissionnoteForIVF(treatmentId);
	}

	@Override
	public int saveOrUpdateClinicalEvaluationforAllergyAlert(IVFClinicalEvaluationForAllergyAlertDTO obj,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return ivfDao.saveOrUpdateClinicalEvaluationforAllergyAlert(obj, request);
	}

	@Override
	public List<IVFClinicalEvaluationForAllergyAlertDTO> fetchRecordClinicalEvaluationForIVF(Integer treatmentId) {
		// TODO Auto-generated method stub
		return ivfDao.saveOrUpdateClinicalEvaluationforAllergyAlert(treatmentId);
	}

	@Override
	public IVFClinicalEvaluationForAllergyAlertDTO editRecordClinicalEvaluationForIVFAllergyAlert(
			Integer allergyalertid) {
		// TODO Auto-generated method stub
		return ivfDao.editRecordClinicalEvaluationForIVFAllergyAlert(allergyalertid);
	}

	@Override
	public String deleterecordClinicalEvaluationForIVFAllergyAlert(String allergyalertIdRow, int userId) {
		// TODO Auto-generated method stub
		return ivfDao.deleterecordClinicalEvaluationForIVFAllergyAlert(allergyalertIdRow, userId);

	}

	@Override
	public int saveOrUpdateInfoPreganacyData(IVFClinicalEvaluatonPregnancyDTO obj, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return ivfDao.saveOrUpdateInfoPreganacyData(obj, request);
	}

	@Override
	public int saveOrUpdateCKEditorDocterDeskIvf(IVFClinicalEvaluationDTO obj, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return ivfDao.saveOrUpdateCKEditorDocterDeskIvf(obj, request);
	}

	@Override
	public IVFClinicalEvaluationDTO fetchClinicalInfo(Integer treatmentId) {
		// TODO Auto-generated method stub
		return ivfDao.fetchClinicalInfo(treatmentId);
	}

	@Override
	public IVFClinicalEvaluatonPregnancyDTO fetchInfoPreganacyData(Integer treatmentId) {
		// TODO Auto-generated method stub
		return ivfDao.fetchInfoPreganacyData(treatmentId);
	}

	@Override
	@Transactional
	public List<IvfQueueDTO> viewIVFQueue(Integer unitId) {

		return ivfDao.getIvfQueue(unitId);
	}
	
	@Override
	@Transactional
	public List<IvfQueueDTO> autoSuggestationIvfQueue(String searchText,int patSearchType,String callFrom) {
		
		return ivfDao.autoSuggestationIvfQueue(searchText,patSearchType,callFrom);
	}

	@Override
	@Transactional
	public IvfQueueDTO getIvfQueuePatientByTreatmentId(Integer treatId) {
		
		return ivfDao.getIvfQueuePatientByTreatmentId(treatId);
	}		

	@Override
	@Transactional
	public List<ChargesMasterSlave> fetchWordWiseHallList(Integer hallType) {
		
		return ivfDao.fetchWordWiseHallList(hallType);
	}
	
	@Override
	@Transactional
	public HallManagementDto fetchHallWiseNumberOfBeds(Integer hallId,String callFrom) {
		// TODO Auto-generated method stub
		return ivfDao.fetchHallWiseNumberOfBeds(hallId,callFrom);
	}
	
	@Override
	@Transactional
	public List<IvfTreBillDto> fetchIvfPatientDetailsByTreatmentId(Integer treatmentId) {
			return ivfDao.fetchIvfPatientDetailsByTreatmentId(treatmentId);
	}
	
	@Override
	@Transactional
	public String allocateBedToIvfPatient(TreatMentBeds obj, String BedAllocStatus, String DallocBedId,
			String billableBedType, String patientType,Integer CoupleId, String BatchNo) {
		
		return ivfDao.allocateBedToIvfPatient(obj, BedAllocStatus, DallocBedId, billableBedType, patientType, CoupleId, BatchNo);
	}
	
	@Override
	@Transactional
	public List<TreatmentBeds> getIVFBillable(Integer treatmentId) {
			return ivfDao.getIVFBillable(treatmentId);
	}
	
	@Override
	@Transactional
	public List<Hall> getIVFHallDetails(Integer hallID,Integer unitId) {
			return ivfDao.getIVFHallDetails(hallID, unitId);
	}
	
	@Override
	@Transactional
	public int cancelAdmissionOfIvfPatient(TreatmentDto treatmentDto,
			HttpServletRequest request) {
		int a = ivfDao.cancelAdmissionOfIvfPatient(treatmentDto,request);
			return a;
	}
	
	@Override
	@Transactional
	public String deallocateBedToIvfPatient(Integer treatmentId,Integer userId) {
		
		return ivfDao.deallocateBedToIvfPatient(treatmentId,userId);
	}
	
	@Override
	@Transactional
	public int checkCoupledOrNot(String gender, Integer patientId,HttpServletRequest request)
			{
		int a = ivfDao.checkCoupledOrNot(gender,patientId,request);
			return a;
	}

	@Override
	@Transactional
	public IvfPatientInfo getIvfPatientInfoByPatientId(Integer patientId,Integer unitId) {
		// TODO Auto-generated method stub
		return ivfDao.getIvfPatientInfoByPatientId(patientId,unitId);
	}
	
}
