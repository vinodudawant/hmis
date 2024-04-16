package com.hms.bloodbank.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.CompatibilityType;
import com.hms.bloodbank.dto.DiscardReason;
import com.hms.bloodbank.dto.PriorityMaster;
import com.hms.bloodbank.dto.RateOfTransfusion;
import com.hms.bloodbank.dto.TestMaster;

public interface TestMasterDao {

	int saveTest(TestMaster testMaster, HttpServletRequest request);

	List<TestMaster> getAllTestsMaster(HttpServletRequest request);
	
	List<TestMaster> getAllIssues(HttpServletRequest request);

	TestMaster editTestMaster(Integer testMasterId);

	boolean deleteTestMaster(Integer testMasterId, Integer userId,
			HttpServletRequest request);

	List<TestMaster> testMasterAutoSuggestion(String testName);

	
	//-------END
	
	//--------DISCARD REASON CODE START----ANIKET-KANSE----23rd MAY 2021-------
	
	int saveDiscardReason(DiscardReason discardReason, HttpServletRequest request);

	List<DiscardReason> getAllDiscardReasons(HttpServletRequest request);

	DiscardReason editDiscardReason(Integer discardReasonId);

	boolean deleteDiscardReason(Integer discardReasonId, Integer userId, HttpServletRequest request);

	List<DiscardReason> discardReasonAutoSugg(String reasonName);

	
	//-------------END
	
	//--------COMPATIBILITY TYPE START----ANIKET-KANSE----23rd MAY 2021-------
	
	int saveCompatibilityType(CompatibilityType compatibilityType, HttpServletRequest request);

	List<CompatibilityType> getAllCompatibilityType(HttpServletRequest request);

	CompatibilityType editCompatibilityType(Integer compatibilityTypeId);

	boolean deleteCompatibilityType(Integer compatibilityTypeId,Integer userId, HttpServletRequest request);

	List<CompatibilityType> compaTypeAutoSugg(String compatibilityType);

	//-------------END
	
	//--------PRIORITY  START----ANIKET-KANSE----24 MAY 2021-------
	
	int savePriority(PriorityMaster priorityMaster, HttpServletRequest request);

	List<PriorityMaster> getAllpriority(HttpServletRequest request);

	PriorityMaster editPriority(Integer priorityId);

	boolean deletePriority(Integer priorityId, Integer userId, HttpServletRequest request);

	List<PriorityMaster> priorityAutoSugg(String priority);
	
	//-------------END
	
		//--------RateOfTransfusion  START----ANIKET-KANSE----24 MAY 2021-------

	int saveTransfusion(RateOfTransfusion rateOfTransfusion, HttpServletRequest request);

	List<RateOfTransfusion> getAllTransfusion(HttpServletRequest request);

	RateOfTransfusion editTransfusion(Integer transfusionId);

	boolean deleteTransfusion(Integer transfusionId, Integer userId, HttpServletRequest request);

	List<RateOfTransfusion> rateAutoSugg(String transfusion);

	

}
