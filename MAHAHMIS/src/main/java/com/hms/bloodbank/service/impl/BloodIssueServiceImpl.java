package com.hms.bloodbank.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.hms.bloodbank.dao.BloodIssueDao;
import com.hms.bloodbank.dto.BloodRequest;
import com.hms.bloodbank.dto.BloodRequestSlave;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.CrossMatch;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.dto.SampleDispatch;
import com.hms.bloodbank.dto.SampleTesting;
import com.hms.bloodbank.dto.SampleTesting_Slave;
import com.hms.bloodbank.dto.TestRegisterSlave;
import com.hms.bloodbank.dto.TransfusionReaction;
import com.hms.bloodbank.service.BloodIssueService;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.nursingAsmentTwoDataDTO;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
@Transactional
public class BloodIssueServiceImpl implements BloodIssueService {
	
	@Autowired
	BloodIssueDao bloodIssueDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<RegistrationDto> searchpatientDetails(String searchParam) {
		// TODO Auto-generated method stub
		return bloodIssueDao.searchpatientDetails(searchParam);
	}

	@Override
	public RegistrationDto getPatientDetailsById(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getPatientDetailsById(id,request);
	}


	@Override
	public int saveBloodRequest(BloodRequest bloodRequestDetails, String listCompObj, HttpServletRequest request) {
		BloodRequestSlave objivfHislave = (BloodRequestSlave) ConfigUIJSONUtility
				.getObjectFromJSON(listCompObj, BloodRequestSlave.class);	
		
		List<BloodRequestSlave> lstHis = objivfHislave.getListbloodRequestSlave();
		
		bloodRequestDetails.setBloodRequestSlave(lstHis);  
		String ipaddress = request.getRemoteAddr();
		bloodRequestDetails.setIpAddress(ipaddress);
		return bloodIssueDao.saveBloodRequest(bloodRequestDetails,listCompObj,request);
	}

	@Override
	public List<BloodRequest> searchPatientDetailsById(String searchParam,String callform,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.searchPatientDetailsById(searchParam ,callform,request);
	}

	@Override
	public BloodRequest getPatientDetailsByRequestId(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getPatientDetailsByRequestId(id,request);
	}

	@Override
	public int saveSampleDispatch(SampleDispatch sampleDispatchDetails, HttpServletRequest request) {
		String ipaddress = request.getRemoteAddr();
		sampleDispatchDetails.setIpAddress(ipaddress);
		return bloodIssueDao.saveBloodRequest(sampleDispatchDetails,request);
	}

	@Override
	public List<SampleDispatch> getDetails(Integer status, String formDate, String toDate, String callform,
			Integer requestNo, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getDetails(status,formDate,toDate,callform,requestNo,request);
	}

	@Override
	public int savePatientSampleAcknowledge(int sampleDispatchId, int sampleStatus, String remarks,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.savePatientSampleAcknowledge(sampleDispatchId,sampleStatus,remarks,request);
	}

	@Override
	 @Transactional
	public int saveSampleTesting(SampleTesting sampleTesting,String listSampleObj, HttpServletRequest request) {
		
		Gson gson = new Gson();
		SampleTesting_Slave objSlave = gson.fromJson(listSampleObj , SampleTesting_Slave.class);

		//SampleTesting_Slave objSlave1 = (SampleTesting_Slave) ConfigUIJSONUtility.getObjectFromJSON(listSampleObj, SampleTesting_Slave.class);
				  
				  List<SampleTesting_Slave> lstSlave = objSlave.getListSampleTestingSlave();
				  sampleTesting.setSampleTesting_Slave(lstSlave);
				  HttpSession session =request.getSession();
				  Integer userId = (Integer)session.getAttribute("userId1");
				  Integer unitId = (Integer)session.getAttribute("uId"); 
				  sampleTesting.setUnitId(unitId);
				  sampleTesting.setCreatedBy(userId);
				  sampleTesting.setUpdatedBy(userId); 			  
		return bloodIssueDao.saveSampleTesting(sampleTesting,listSampleObj,request);
	}

	@Override
	public List<BloodRequestSlave> getRequestComponentDetailsByID(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getRequestComponentDetailsByID(id,request);
	}

	@Override
	public int saveCrossMatch(CrossMatch crossMatchDetails, HttpServletRequest request) {
		String ipaddress = request.getRemoteAddr();
		crossMatchDetails.setIpAddress(ipaddress);
		return bloodIssueDao.saveCrossMatch(crossMatchDetails,request);
	}

	@Override
	public List<CrossMatch> getCrossMatchListByID(Integer bloodRequestId,String callfrom, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getCrossMatchListByID(bloodRequestId,callfrom,request);
	}

	@Override
	public boolean deleteCrossMatch(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.deleteCrossMatch(id,request);
	}

	@Override
	public CrossMatch editCrossMatch(Integer id) {
		// TODO Auto-generated method stub
		return bloodIssueDao.editCrossMatch(id);
	}

	@Override
	public int saveBloodRequisiton(String listbloodreq, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.saveBloodRequisiton(listbloodreq,request);
	}

	@Override
	public int saveBloodIssue(String listbloodissue, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.saveBloodIssue(listbloodissue,request);
	}
	/*	
	@Override
	public int addtransfusiuon(String listtranfusion,String listobservation, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.addtransfusiuon(listtranfusion,listobservation,request);
	} */
@Override
	public int addtransfusiuon(String listtranfusion, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.addtransfusiuon(listtranfusion,request);
	}
 
	@Override
	public List<TransfusionReaction> getTransfusionDetails(Integer id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getTransfusionDetails(id,request);
	}

	@Override
	public TransfusionReaction editTransfusionDetail(Integer transfusionId) {
		// TODO Auto-generated method stub
		return bloodIssueDao.editTransfusionDetail(transfusionId);
	}

	@Override
	public boolean deleteTransfusionDetail(Integer transfusionId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.deleteTransfusionDetail(transfusionId,request);
	}

	@Override
	public int saveObservation(String listobservation, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.saveObservation(listobservation,request);
	}

	@Override
	public List<ComponentSeperation> getAllComponentByComponentName(Integer bloodBagNumber,Integer componentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getAllComponentByComponentName(bloodBagNumber,componentId,request);
	}

	@Override
	public List<ComponentSeperation> getAllBagDetailsbyComponentId(Integer componentId,String bloodGroup,Integer bloodRequestId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getAllBagDetailsbyComponentId(componentId,bloodGroup,bloodRequestId,request);
	}

	@Override
	public List<SampleDispatch> getSampleAckDetails(String from, String to, String callform) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getSampleAckDetails(from,to,callform);
	}

	@Override
	public List<BloodRequest> getAllBloodRequestList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getAllBloodRequestList(unitId,request);
	}

	@Override
	public boolean deleteBloodRequestetail(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.deleteBloodRequestetail(id,request);
	}

	@Override
	public BloodRequest editRequestDetails(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.editRequestDetails(id,request);
	}
	//Added By Annapurna
	@Override
	public RegistrationDto getPatientDetailsByIdBloodrequest(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getPatientDetailsByIdBloodrequest(id,request);
	}
//
	@Override
	public BloodRequest getPatientDetailsByIdBloodrequestlist(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getPatientDetailsByIdBloodrequestlist(id,request);
	}
	
	@Override
	public List<SampleDispatch> getAllBloodRequestSampleDispatchList(HttpServletRequest request,String fromDate,String lastDate) {
		return bloodIssueDao.getAllBloodRequestSampleDispatchList(request, fromDate, lastDate);
	}
	@Override
	public List<SampleTesting> getAllBloodRequestSampleTestingList(HttpServletRequest request,Integer unitId) {
		return bloodIssueDao.getAllBloodRequestSampleTestingList(request,unitId);
	}
	@Override
	public SampleTesting getBloodRequestSampleTesingListById(Integer bloodRequestId) {
		return bloodIssueDao.getBloodRequestSampleTesingListById(bloodRequestId);
	}
	@Override
	public SampleTesting editSampleTesting(Integer sampletestingid,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.editSampleTesting(sampletestingid, request);
	}

	@Override
	public boolean deleteSampleTesting(Integer sampletestingid, HttpServletRequest request) {
		return bloodIssueDao.deleteSampleTesting(sampletestingid, request);
	}
	
	@Override
	public List<BloodRequest> searchDonorRequesterDetailsById(String searchParam,String callfrom,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.searchDonorRequesterDetailsById(searchParam,callfrom,request);
	}
	@Override
	public List<CrossMatch> getAllCrossMatchList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getAllCrossMatchList(unitId,request);
	}
	@Override
	public List<CrossMatch> getAllBloodRequisitonList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getAllBloodRequisitonList(unitId,request);
	}
	@Override
	public CrossMatch editBloodRequisiton(Integer id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.editBloodRequisiton(id, request);
	}
	@Override
	public boolean deleteBloodRequisiton(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.deleteBloodRequisiton(id,request);
	}

	@Override
	public CrossMatch getBloodRequisitionById(Integer bloodRequestId) {
		return bloodIssueDao.getBloodRequisitionById(bloodRequestId);
	}
	@Override
	public int deleteBloosIssueById(int id, HttpServletRequest request) {
		
		return bloodIssueDao.deleteBloosIssueById(id, request);
	}

	@Override
	public List<CrossMatch> getAllBloodIssueList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getAllBloodIssueList(unitId,request);
	}
	@Override
	public CrossMatch getBloodIssueById(Integer bloodRequestId) {
		return bloodIssueDao.getBloodIssueById(bloodRequestId);
	}
	@Override
	public List<TransfusionReaction> getAllBloodTransfusionList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.getAllBloodTransfusionList(unitId,request);
	}

	@Override
	public int deleteBloodTransfusionById(int id, HttpServletRequest request) {
		
		return bloodIssueDao.deleteBloodTransfusionById(id, request);
	}
	@Override
	public CrossMatch editBloodIssueDeatils(Integer id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodIssueDao.editBloodIssueDeatils(id, request);
	}

	@Override
	public Integer validateCrossMatchRecord(String compName, Integer bloodBagid, Integer bloodrequestId) {
		// TODO Auto-generated method stub
		return bloodIssueDao.validateCrossMatchRecord(compName, bloodBagid, bloodrequestId);
	}


}