package com.hms.ivf.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HallManagementDto;
import com.hms.dto.Hall;
import com.hms.dto.TreatmentBeds;
import com.hms.dto.district_taluka_city;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.dto.TreatmentDto;
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

public interface IvfDao {

	List<RegistrationDto> fetchpatientnameMale(String patientName, String callfrom);

	List<RegistrationDto> fetchpatientnameFemale(String patientName, String callfrom);

	RegistrationDto getPatientDataById(Integer patId);

	List<district_taluka_city> getAddressList(int id);

	int generateCoupleId(String ivfCoupleDetails, String queryType, HttpServletRequest request);

	List<IVFcoupleViewDto> getIVFCoupleList(String coupleFlag,String fromDate,String toDate);

	String getCountCoupleMaster(String coupleFlag, HttpServletRequest request);

	IVFcoupleViewDto autoSuggestionForCoupleDetails(String findingName, int coupleSearchType, String callFrom);

	IVFcoupleViewDto autoSuggestionForCoupleDetails1(int coupleId, String callFrom);

	int generateBatch(String ivfBatchMasterDetails, IVFBatchSlave ivfBatchSlaveDetails, String ivfBatcInsertType,
			HttpServletRequest request);

	int saveIVFBatchMasterDetails(IVFBatchMaster IVFBatchMasterDto, String ivfBatcInsertType, Integer userId);

	List<IVFBatchMaster> getIVFBatchedCoupleList(String ivfBatchStatus);

	String getCountBatchMaster(String ivfBatchStatus, HttpServletRequest request);

	List<IVFBatchViewDto> getBatchedCoupleDetails(Integer batchID, String ivfCoupleStatus);

	IVFBatchMaster autoSuggestionForBatchDetails(String findingName, int batchSearchType, String callFrom);

	IVFBatchMaster autoSuggestionForBatchDetails1(int batchId, String callFrom);

	int saveOrUpdateSurgeryadvice(SurgeryAdviceForIvfDTO surgeryAdviceForIvfDTO, HttpServletRequest request);

	List<SurgeryAdviceForIvfDTO> fetchSurgeryAdviceInfoForIVF(Integer treatmentId);

	String deleteDataforsurgeryAdviceBasicInfo(Integer adviceMasterId, Integer userId);

	SurgeryAdviceForIvfDTO editsurgeryadvicerecord(Integer adviceID);

	int saveOrUpdateAdmissionNote(IVFAdmissionNoteDTO obj, HttpServletRequest request);

	List<IVFAdmissionNoteDTO> fetchRecordadmissionnoteForIVF(Integer treatmentId);

	int saveOrUpdateClinicalEvaluationforAllergyAlert(IVFClinicalEvaluationForAllergyAlertDTO obj,
			HttpServletRequest request);

	List<IVFClinicalEvaluationForAllergyAlertDTO> saveOrUpdateClinicalEvaluationforAllergyAlert(Integer treatmentId);

	IVFClinicalEvaluationForAllergyAlertDTO editRecordClinicalEvaluationForIVFAllergyAlert(Integer allergyalertid);

	String deleterecordClinicalEvaluationForIVFAllergyAlert(String allergyalertIdRow, int userId);

	int saveOrUpdateInfoPreganacyData(IVFClinicalEvaluatonPregnancyDTO obj, HttpServletRequest request);

	int saveOrUpdateCKEditorDocterDeskIvf(IVFClinicalEvaluationDTO obj, HttpServletRequest request);

	IVFClinicalEvaluationDTO fetchClinicalInfo(Integer treatmentId);

	IVFClinicalEvaluatonPregnancyDTO fetchInfoPreganacyData(Integer treatmentId);

	List<IvfQueueDTO> getIvfQueue(Integer unitId);

	List<IvfQueueDTO> autoSuggestationIvfQueue(String searchText,int patSearchType,String callFrom);

	IvfQueueDTO getIvfQueuePatientByTreatmentId(Integer treatId);
	
	List<ChargesMasterSlave> fetchWordWiseHallList(Integer hallType);
	
	HallManagementDto fetchHallWiseNumberOfBeds(Integer hallId,String callFrom);
	
	List<IvfTreBillDto> fetchIvfPatientDetailsByTreatmentId(Integer treatmentId);
	
	String allocateBedToIvfPatient(TreatMentBeds obj,String BedAllocStatus,String DallocBedId,String billableBedType,String patientType,Integer CoupleId, String BatchNo);

	List<TreatmentBeds> getIVFBillable(Integer treatmentId);
	
	List<Hall> getIVFHallDetails(Integer hallID,Integer unitId);
	
	int cancelAdmissionOfIvfPatient(TreatmentDto treatmentDto,HttpServletRequest request);
	
	String deallocateBedToIvfPatient(Integer treatmentId, Integer userId);
	
	int checkCoupledOrNot(String gender, Integer patientId,HttpServletRequest request);
	
	 IvfPatientInfo getIvfPatientInfoByPatientId(Integer patientId,Integer unitId);
}
