package com.hms.ivf.dao;


import java.util.List;

import com.hms.dto.Doctor;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ivf.dto.EmbryoTransferMasterDTO;
import com.hms.ivf.dto.FollicularStudyBasicInfoDTO;
import com.hms.ivf.dto.IVFCalenderInfoDTO;
import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.dto.OvamPickMasterDTO;
import com.hms.ivf.dto.OvamPickUpSlaveDTO;

public interface ShelfSponsorPayAlertDao {
Double getSumAssueredAmountByTreatmentId(Integer treatmentId);
	
BillMasterDto getTotalBillInfoByTreatmentId(Integer treatmentId);
	
	String updateShelfSponserFlagByTreatmentId(String call,Integer treatmentId);
	IVFFollicularStudy getBasicStudyDataForFollucularStudy(Integer masterFollicularStudyId);
	
int saveFollicualrStudyBasicInfo(String  follicularBasicinfoDetails);
	
	List<FollicularStudyBasicInfoDTO> getListForFollicularStudy(Integer masterFollicularStudyId);
	
	String deleteFollicularBasicInfo(Integer studyidRF,Integer userId);
	
	List<IVFFollicularStudy> fetchFollicularStudyInfoForIVF(Integer patId);
	
	Integer getCoupleIdForIVF(Integer patientId);
	
int saveCalenderInfoIVF(String  ivfCalenderBasicInfoDetails);
	
	List<IVFCalenderInfoDTO> getIvfCalenderInfo(Integer masterFollicularStudyId);
	
	String deleteIvfCalenderBasicInfo(Integer studyidIvF,Integer userId);
	
	String cancelStudyRecordForIVF(Integer masterFollicularStudyId,Integer userId,String narration,String enddate);
	
	String getStudyCommitByReportId(Integer follicularstudyReportId);
	
String deleteBasicInfoIVFCalender(String ivfcalenderIds,Integer userId);
	
	String deleteBasicFollicularInfo(String follicularIds,Integer userId);
	
String getHusbandNameForOvamPickup(Integer patId);
	
	List<Doctor> getDoctorListForOvamPickUp();
	
int saveOvamPickUpForm(OvamPickMasterDTO obj);
	
	OvamPickMasterDTO getOvamPickUpMasterInfo(Integer patientId,String cycleNo);
	
	String deleteOvamPickupSlaveInfo(String follicularIds,Integer userId);
	
	int saveEmbryoTransperForm(EmbryoTransferMasterDTO obj);
	
	EmbryoTransferMasterDTO getEmbryoMasterInfo(Integer patientId,String cycleNo);
		
		String deletefreshEmbryoSlaveInfo(String freshEmbryoSlaveIds,Integer userId);
		
		String deletefrozenEmbryoSlaveInfo(String frozenEmbryoSlaveIds,Integer userId);
		
		IVFFollicularStudy getBasicStudyDataForFollucularStudyOnPrint(Integer masterFollicularStudyId);
		
		OvamPickMasterDTO getOvamPickUpMasterInfoOnPrint(Integer patientId,String cycleNo);
		
		OvamPickUpSlaveDTO getOvamPickUpSalveList(Integer patientId,String cycleNo);
		
String  getOvamPickupDate(Integer patientId,String cycleNo);
		
		String  getEmbryoTransperDate(Integer patientId,String cycleNo);

	
}
