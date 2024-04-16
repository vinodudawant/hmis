package com.hms.bloodbank.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.bloodbank.dao.TestMasterDao;
import com.hms.bloodbank.dto.CompatibilityType;
import com.hms.bloodbank.dto.DiscardReason;
import com.hms.bloodbank.dto.PriorityMaster;
import com.hms.bloodbank.dto.RateOfTransfusion;
import com.hms.bloodbank.dto.TestMaster;
import com.hms.bloodbank.service.TestMasterService;

@Service
@Transactional
public class TestMasterServiceImpl implements TestMasterService {
	
	@Autowired
	TestMasterDao testMasterDao;

	@Override
	public int saveTest(TestMaster testMaster, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		testMaster.setCreatedBy(userId);
		testMaster.setUpdatedBy(userId);
		String ipAddress = request.getRemoteAddr();
		testMaster.setIpAddress(ipAddress);
		
		return testMasterDao.saveTest(testMaster, request);
	}

	@Override
	public List<TestMaster> getAllTestsMaster(HttpServletRequest request) {
		return testMasterDao.getAllTestsMaster(request);
	}
	
	@Override
	public List<TestMaster> getAllIssues(HttpServletRequest request) {
		return testMasterDao.getAllIssues(request);
	}

	@Override
	public TestMaster editTestMaster(Integer testMasterId) {
		return testMasterDao.editTestMaster(testMasterId);
	}

	@Override
	public boolean deleteTestMaster(Integer testMasterId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return testMasterDao.deleteTestMaster(testMasterId,userId,request);
	}

	@Override
	public List<TestMaster> testMasterAutoSuggestion(String testName) {
		return testMasterDao.testMasterAutoSuggestion(testName);
	}
	
	//-----END
	
	//--------DISCARD REASON CODE START----ANIKET-KANSE----23rd MAY 2021-------

	@Override
	public int saveDiscardReason(DiscardReason discardReason, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		discardReason.setCreatedBy(userId);
		discardReason.setUpdatedBy(userId);
		String ipAddress = request.getRemoteAddr();
		discardReason.setIpAddress(ipAddress);
		
		return testMasterDao.saveDiscardReason(discardReason, request);
	}

	@Override
	public List<DiscardReason> getAllDiscardReasons(HttpServletRequest request) {
		return testMasterDao.getAllDiscardReasons(request);
	}

	@Override
	public DiscardReason editDiscardReason(Integer discardReasonId) {
		return testMasterDao.editDiscardReason(discardReasonId);
	}

	@Override
	public boolean deleteDiscardReason(Integer discardReasonId, HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return testMasterDao.deleteDiscardReason(discardReasonId,userId,request);
	}

	@Override
	public List<DiscardReason> discardReasonAutoSugg(String reasonName) {
		return testMasterDao.discardReasonAutoSugg(reasonName);
	}

	
	
	//-------------END
	
	//--------COMPATIBILITY TYPE START----ANIKET-KANSE----23rd MAY 2021-------

	@Override
	public int saveCompatibilityType(CompatibilityType compatibilityType, HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		compatibilityType.setCreatedBy(userId);
		compatibilityType.setUpdatedBy(userId);
		String ipAddress = request.getRemoteAddr();
		compatibilityType.setIpAddress(ipAddress);
		
		return testMasterDao.saveCompatibilityType(compatibilityType, request);
	}

	@Override
	public List<CompatibilityType> getAllCompatibilityType(HttpServletRequest request) {

		return testMasterDao.getAllCompatibilityType(request);
	}

	@Override
	public CompatibilityType editCompatibilityType(Integer compatibilityTypeId) {
		return testMasterDao.editCompatibilityType(compatibilityTypeId);
	}

	@Override
	public boolean deleteCompatibilityType(Integer compatibilityTypeId,HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return testMasterDao.deleteCompatibilityType(compatibilityTypeId,userId,request);
	}

	@Override
	public List<CompatibilityType> compaTypeAutoSugg(String compatibilityType) {
		return testMasterDao.compaTypeAutoSugg(compatibilityType);
	}

	//-------------END
	
		//--------PRIORITY  START----ANIKET-KANSE----24 MAY 2021-------
	
	@Override
	public int savePriority(PriorityMaster priorityMaster,HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		priorityMaster.setCreatedBy(userId);
		priorityMaster.setUpdatedBy(userId);
		String ipAddress = request.getRemoteAddr();
		priorityMaster.setIpAddress(ipAddress);
		
		return testMasterDao.savePriority(priorityMaster, request);
	}

	@Override
	public List<PriorityMaster> getAllpriority(HttpServletRequest request) {
		
		return testMasterDao.getAllpriority(request);
	}

	@Override
	public PriorityMaster editPriority(Integer priorityId) {
		
		return testMasterDao.editPriority(priorityId);
	}

	@Override
	public boolean deletePriority(Integer priorityId, HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return testMasterDao.deletePriority(priorityId,userId,request);
	}

	@Override
	public List<PriorityMaster> priorityAutoSugg(String priority) {

		return testMasterDao.priorityAutoSugg(priority);
	}
	
	//-------------END

	@Override
	public int saveTransfusion(RateOfTransfusion rateOfTransfusion, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		rateOfTransfusion.setCreatedBy(userId);
		rateOfTransfusion.setUpdatedBy(userId);
		String ipAddress = request.getRemoteAddr();
		rateOfTransfusion.setIpAddress(ipAddress);
		
		return testMasterDao.saveTransfusion(rateOfTransfusion, request);
	}

	@Override
	public List<RateOfTransfusion> getAllTransfusion(HttpServletRequest request) {
		return testMasterDao.getAllTransfusion(request);
	}

	@Override
	public RateOfTransfusion editTransfusion(Integer transfusionId) {
		return testMasterDao.editTransfusion(transfusionId);
	}

	@Override
	public boolean deleteTransfusion(Integer transfusionId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return testMasterDao.deleteTransfusion(transfusionId,userId,request);
	}

	@Override
	public List<RateOfTransfusion> rateAutoSugg(String transfusion) {
		return testMasterDao.rateAutoSugg(transfusion);
	}

	
	
	
}
