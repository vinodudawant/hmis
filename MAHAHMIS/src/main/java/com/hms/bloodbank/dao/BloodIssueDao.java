package com.hms.bloodbank.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.BloodRequest;
import com.hms.bloodbank.dto.BloodRequestSlave;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.CrossMatch;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.dto.SampleDispatch;
import com.hms.bloodbank.dto.SampleTesting;
import com.hms.bloodbank.dto.TransfusionReaction;
import com.hms.ehat.dto.RegistrationDto;


public interface BloodIssueDao {

	List<RegistrationDto> searchpatientDetails(String searchParam);

	RegistrationDto getPatientDetailsById(int id, HttpServletRequest request);

	//int saveBloodRequest(BloodRequest bloodRequestDetails,BloodRequest newPurchaseMaster);

	int saveBloodRequest(BloodRequest bloodRequestDetails,String listCompObj, HttpServletRequest request);

	List<BloodRequest> searchPatientDetailsById(String searchParam, String callform,HttpServletRequest request);

	BloodRequest getPatientDetailsByRequestId(int id, HttpServletRequest request);

	int saveBloodRequest(SampleDispatch sampleDispatchDetails, HttpServletRequest request);

	List<SampleDispatch> getDetails(Integer status, String formDate, String toDate, String callform, Integer requestNo,
			HttpServletRequest request);

	int savePatientSampleAcknowledge(int sampleDispatchId, int sampleStatus, String remarks,
			HttpServletRequest request);

	//int saveSampleTesting(SampleTesting sampleTestingDetails);

	int saveSampleTesting(SampleTesting sampleTesting ,String listSampleObj, HttpServletRequest request);

	List<BloodRequestSlave> getRequestComponentDetailsByID(int id, HttpServletRequest request);

	int saveCrossMatch(CrossMatch crossMatchDetails, HttpServletRequest request);

	List<CrossMatch> getCrossMatchListByID(Integer bloodRequestId,String callfrom,HttpServletRequest request);

	boolean deleteCrossMatch(Integer id, HttpServletRequest request);

	CrossMatch editCrossMatch(Integer id);

	int saveBloodRequisiton(String listbloodreq, HttpServletRequest request);

	int saveBloodIssue(String listbloodissue, HttpServletRequest request);

 //	int addtransfusiuon(String listtranfusion,String listobservation, HttpServletRequest request);
 		int addtransfusiuon(String listtranfusion, HttpServletRequest request);
	List<TransfusionReaction> getTransfusionDetails(Integer id,HttpServletRequest request);

	TransfusionReaction editTransfusionDetail(Integer transfusionId);

	boolean deleteTransfusionDetail(Integer transfusionId, HttpServletRequest request);

	int saveObservation(String listobservation, HttpServletRequest request);

	List<ComponentSeperation> getAllComponentByComponentName(Integer bloodBagNumber,Integer componentId, HttpServletRequest request);

	List<ComponentSeperation> getAllBagDetailsbyComponentId(Integer componentId,String bloodGroup,Integer bloodRequestId, HttpServletRequest request);

	List<SampleDispatch> getSampleAckDetails(String from, String to, String callform);

	List<BloodRequest> getAllBloodRequestList(Integer unitId, HttpServletRequest request);

	boolean deleteBloodRequestetail(Integer id, HttpServletRequest request);

	BloodRequest editRequestDetails(Integer id, HttpServletRequest request);
	
	RegistrationDto getPatientDetailsByIdBloodrequest(int id, HttpServletRequest request);
	
	BloodRequest getPatientDetailsByIdBloodrequestlist(int id, HttpServletRequest request);
	
	List<SampleDispatch> getAllBloodRequestSampleDispatchList(HttpServletRequest request,String fromDate,String lastDate);
	
	List<SampleTesting> getAllBloodRequestSampleTestingList(HttpServletRequest request,Integer unitId);

    public SampleTesting getBloodRequestSampleTesingListById(Integer bloodRequestId);
    
	
    public boolean deleteSampleTesting(Integer sampletestingid, HttpServletRequest request);

    SampleTesting editSampleTesting(Integer sampletestingid,HttpServletRequest request);
    
    List<BloodRequest> searchDonorRequesterDetailsById(String searchParam,String callfrom,HttpServletRequest request);
    
	List<CrossMatch> getAllCrossMatchList(Integer unitId, HttpServletRequest request);

	List<CrossMatch> getAllBloodRequisitonList(Integer unitId, HttpServletRequest request);
	CrossMatch editBloodRequisiton(Integer id,HttpServletRequest request);
	 public boolean deleteBloodRequisiton(Integer id, HttpServletRequest request);
	 
	 public CrossMatch getBloodRequisitionById(Integer bloodRequestId);
	 
	 public int deleteBloosIssueById(int id, HttpServletRequest request);
	 
	 public List<CrossMatch> getAllBloodIssueList(Integer unitId, HttpServletRequest request);
	 
	 public CrossMatch getBloodIssueById(Integer bloodRequestId);
	 
	 public List<TransfusionReaction> getAllBloodTransfusionList(Integer unitId, HttpServletRequest request);

	 public int deleteBloodTransfusionById(int id, HttpServletRequest request);

	CrossMatch editBloodIssueDeatils(Integer id, HttpServletRequest request);
	 
	 Integer validateCrossMatchRecord(String compName, Integer bloodBagid, Integer bloodrequestId);
}