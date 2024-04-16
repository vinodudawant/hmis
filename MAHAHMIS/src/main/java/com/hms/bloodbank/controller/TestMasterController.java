package com.hms.bloodbank.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.bloodbank.dto.CompatibilityType;
import com.hms.bloodbank.dto.DiscardReason;
import com.hms.bloodbank.dto.PriorityMaster;
import com.hms.bloodbank.dto.RateOfTransfusion;
import com.hms.bloodbank.dto.TestMaster;
import com.hms.bloodbank.service.TestMasterService;

@RestController
@RequestMapping(value = "/bb_test_master")
public class TestMasterController {
	
	static Logger log = Logger.getLogger(TestMasterController.class.getName());

	@Autowired
	TestMasterService testMasterService;
	
	static {
		System.out.println("TestMasterController Loaded...!");
	}
	
	
	/**
	 * @author aniket kanse.
	 * @since 20th MAY 2021
	 * @return int response
	 */
	@RequestMapping(value = "/saveTest", method = RequestMethod.POST)
	public int saveTest(TestMaster testMaster, HttpServletRequest request) {
		
		log.info("In TestMasterController saveTest()");
		System.out.println("In TestMasterController saveTest() testIssueFlag :: " + testMaster.getTestIssueFlag());
		int response = testMasterService.saveTest(testMaster, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllTestsMaster", method = RequestMethod.GET)
	@ResponseBody
	public TestMaster getAllTestsMaster(HttpServletRequest request) {
		log.info("In TestMasterController getAllTestsMaster()");
		List<TestMaster> listTestMaster = new ArrayList<TestMaster>();
		listTestMaster = testMasterService.getAllTestsMaster(request);
		TestMaster obj = new TestMaster();
		obj.setListTestMaster(listTestMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/getAllIssues", method = RequestMethod.GET)
	@ResponseBody
	public TestMaster getAllIssues(HttpServletRequest request) {
		log.info("In TestMasterController getAllIssues()");
		List<TestMaster> listTestMaster = new ArrayList<TestMaster>();
		listTestMaster = testMasterService.getAllIssues(request);
		TestMaster obj = new TestMaster();
		obj.setListTestMaster(listTestMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/editTestMaster", method = RequestMethod.GET)
	@ResponseBody
	public TestMaster editTestMaster(@RequestParam("testMasterId") Integer testMasterId) {
		log.info("In TestMasterController  editTestMaster()");
		TestMaster obj = new TestMaster();
		obj = testMasterService.editTestMaster(testMasterId);
		log.error("Response-----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteTestMaster", method = RequestMethod.POST)
	@ResponseBody
	public String deleteTestMaster(@RequestParam("testMasterId") Integer testMasterId, HttpServletRequest request) {
		log.info("In TestMasterController deleteTestMaster()");
		System.out.println("bloodGroupId :"+testMasterId);
		boolean response = testMasterService.deleteTestMaster(testMasterId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/testMasterAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public TestMaster testMasterAutoSuggestion(@RequestParam("testName") String testName) {
		
		log.info("In TestMasterController testMasterAutoSuggestion()");
		List<TestMaster> listTestMaster = new ArrayList<TestMaster>();
		listTestMaster = testMasterService.testMasterAutoSuggestion(testName);
		TestMaster obj = new TestMaster();
		obj.setListTestMaster(listTestMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	//-------------END
	
	//--------DISCARD REASON CODE START----ANIKET-KANSE----23rd MAY 2021-------
	
	/**
	 * @author aniket kanse.
	 * @since 23rd MAY 2021
	 * @return int response
	 */
	@RequestMapping(value = "/saveDiscardReason", method = RequestMethod.POST)
	public int saveDiscardReason(DiscardReason discardReason, HttpServletRequest request) {
		
		log.info("In TestMasterController saveDiscardReason()");
		
		int response = testMasterService.saveDiscardReason(discardReason, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllDiscardReasons", method = RequestMethod.GET)
	@ResponseBody
	public DiscardReason getAllDiscardReasons(HttpServletRequest request) {
		log.info("In TestMasterController getAllDiscardReasons()");
		List<DiscardReason> listDiscardReason = new ArrayList<DiscardReason>();
		listDiscardReason = testMasterService.getAllDiscardReasons(request);
		DiscardReason obj = new DiscardReason();
		obj.setListDiscardReason(listDiscardReason);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/editDiscardReason", method = RequestMethod.GET)
	@ResponseBody
	public DiscardReason editDiscardReason(@RequestParam("discardReasonId") Integer discardReasonId) {
		log.info("In TestMasterController  editDiscardReason()");
		
		DiscardReason obj = new DiscardReason();
		obj = testMasterService.editDiscardReason(discardReasonId);
		log.error("Response-----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteDiscardReason", method = RequestMethod.POST)
	@ResponseBody
	public String deleteDiscardReason(@RequestParam("discardReasonId") Integer discardReasonId, HttpServletRequest request) {
		log.info("In TestMasterController deleteDiscardReason()");
		boolean response = testMasterService.deleteDiscardReason(discardReasonId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/discardReasonAutoSugg", method = RequestMethod.POST)
	@ResponseBody
	public DiscardReason discardReasonAutoSugg(@RequestParam("reasonName") String reasonName) {
		
		log.info("In TestMasterController discardReasonAutoSugg()");
		//System.out.println("In TestMasterController discardReasonAutoSugg()");
		
		
		List<DiscardReason> listDiscardReason = new ArrayList<DiscardReason>();
		listDiscardReason = testMasterService.discardReasonAutoSugg(reasonName);
		DiscardReason obj = new DiscardReason();
		obj.setListDiscardReason(listDiscardReason);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	//-------------END
	
	//--------COMPATIBILITY TYPE START----ANIKET-KANSE----23rd MAY 2021-------
	
	/**
	 * @author aniket kanse.
	 * @since 23rd MAY 2021
	 * @return int response
	 */
	@RequestMapping(value = "/saveCompatibilityType", method = RequestMethod.POST)
	public int saveCompatibilityType(CompatibilityType compatibilityType, HttpServletRequest request) {
		
		log.info("In TestMasterController saveCompatibilityType()");
		
		int response = testMasterService.saveCompatibilityType(compatibilityType, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllCompatibilityType", method = RequestMethod.GET)
	@ResponseBody
	public CompatibilityType getAllCompatibilityType(HttpServletRequest request) {
		log.info("In TestMasterController getAllCompatibilityType()");
		
		List<CompatibilityType> listCompatibilityType = new ArrayList<CompatibilityType>();
		listCompatibilityType = testMasterService.getAllCompatibilityType(request);
		CompatibilityType obj = new CompatibilityType();
		obj.setListCompatibilityType(listCompatibilityType);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/editCompatibilityType", method = RequestMethod.GET)
	@ResponseBody
	public CompatibilityType editCompatibilityType(@RequestParam("compatibilityTypeId") Integer compatibilityTypeId) {
		log.info("In TestMasterController  editCompatibilityType()");
		
		CompatibilityType obj = new CompatibilityType();
		obj = testMasterService.editCompatibilityType(compatibilityTypeId);
		log.error("Response-----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteCompatibilityType", method = RequestMethod.POST)
	@ResponseBody
	public String deleteCompatibilityType(@RequestParam("compatibilityTypeId") Integer compatibilityTypeId, HttpServletRequest request) {
		log.info("In TestMasterController deleteCompatibilityType()");
		
		boolean response = testMasterService.deleteCompatibilityType(compatibilityTypeId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/compaTypeAutoSugg", method = RequestMethod.POST)
	@ResponseBody
	public CompatibilityType compaTypeAutoSugg(@RequestParam("compatibilityType") String compatibilityType) {
		
		log.info("In TestMasterController compaTypeAutoSugg()");
		//System.out.println("In TestMasterController discardReasonAutoSugg()");
		
		
		List<CompatibilityType> listCompatibilityType = new ArrayList<CompatibilityType>();
		listCompatibilityType = testMasterService.compaTypeAutoSugg(compatibilityType);
		CompatibilityType obj = new CompatibilityType();
		obj.setListCompatibilityType(listCompatibilityType);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	//-------------END
	
	//--------PRIORITY START----ANIKET-KANSE----24th MAY 2021-------
	
	/**
	 * @author aniket kanse.
	 * @since 24th MAY 2021
	 * @return int response
	 */
	@RequestMapping(value = "/savePriority", method = RequestMethod.POST)
	public int savePriority(PriorityMaster priorityMaster , HttpServletRequest request) {
		
		log.info("In TestMasterController savePriority()");
		
		int response = testMasterService.savePriority(priorityMaster, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllpriority", method = RequestMethod.GET)
	@ResponseBody
	public PriorityMaster getAllpriority(HttpServletRequest request) {
		log.info("In TestMasterController getAllpriority()");
		
		List<PriorityMaster> listPriorityMaster = new ArrayList<PriorityMaster>();
		listPriorityMaster = testMasterService.getAllpriority(request);
		PriorityMaster obj = new PriorityMaster();
		obj.setListPriorityMaster(listPriorityMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	
	@RequestMapping(value = "/editPriority", method = RequestMethod.GET)
	@ResponseBody
	public PriorityMaster editPriority(@RequestParam("priorityId") Integer priorityId) {
		log.info("In TestMasterController  editPriority()");
		
		PriorityMaster obj = new PriorityMaster();
		obj = testMasterService.editPriority(priorityId);
		log.error("Response-----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/deletePriority", method = RequestMethod.POST)
	@ResponseBody
	public String deletePriority(@RequestParam("priorityId") Integer priorityId, HttpServletRequest request) {
		log.info("In TestMasterController deletePriority()");
		
		boolean response = testMasterService.deletePriority(priorityId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/priorityAutoSugg", method = RequestMethod.POST)
	@ResponseBody
	public PriorityMaster priorityAutoSugg(@RequestParam("priority") String priority) {
		
		log.info("In TestMasterController priorityAutoSugg()");
		//System.out.println("In TestMasterController discardReasonAutoSugg()");
		
		
		List<PriorityMaster> listPriorityMaster = new ArrayList<PriorityMaster>();
		listPriorityMaster = testMasterService.priorityAutoSugg(priority);
		PriorityMaster obj = new PriorityMaster();
		obj.setListPriorityMaster(listPriorityMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	//-------------END
	
	//--------Rat eOf Transfusion START----ANIKET-KANSE----24th MAY 2021-------
	
	/**
	 * @author aniket kanse.
	 * @since 24th MAY 2021
	 * @return int response
	 */
	@RequestMapping(value = "/saveTransfusion", method = RequestMethod.POST)
	public int saveTransfusion(RateOfTransfusion rateOfTransfusion , HttpServletRequest request) {
		
		log.info("In TestMasterController saveTransfusion()");
		
		int response = testMasterService.saveTransfusion(rateOfTransfusion, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllTransfusion", method = RequestMethod.GET)
	@ResponseBody
	public RateOfTransfusion getAllTransfusion(HttpServletRequest request) {
		log.info("In TestMasterController getAllTransfusion()");
		
		List<RateOfTransfusion> listRateOfTransfusion = new ArrayList<RateOfTransfusion>();
		listRateOfTransfusion = testMasterService.getAllTransfusion(request);
		RateOfTransfusion obj = new RateOfTransfusion();
		obj.setListRateOfTransfusion(listRateOfTransfusion);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/editTransfusion", method = RequestMethod.GET)
	@ResponseBody
	public RateOfTransfusion editTransfusion(@RequestParam("transfusionId") Integer transfusionId) {
		log.info("In TestMasterController  editTransfusion()");
		
		RateOfTransfusion obj = new RateOfTransfusion();
		obj = testMasterService.editTransfusion(transfusionId);
		log.error("Response-----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteTransfusion", method = RequestMethod.POST)
	@ResponseBody
	public String deleteTransfusion(@RequestParam("transfusionId") Integer transfusionId, HttpServletRequest request) {
		log.info("In TestMasterController deleteTransfusion()");
		
		boolean response = testMasterService.deleteTransfusion(transfusionId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/rateAutoSugg", method = RequestMethod.POST)
	@ResponseBody
	public RateOfTransfusion rateAutoSugg(@RequestParam("transfusion") String transfusion) {
		
		log.info("In TestMasterController rateAutoSugg()");
		
		
		List<RateOfTransfusion> listRateOfTransfusion = new ArrayList<RateOfTransfusion>();
		listRateOfTransfusion = testMasterService.rateAutoSugg(transfusion);
		RateOfTransfusion obj = new RateOfTransfusion();
		obj.setListRateOfTransfusion(listRateOfTransfusion);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	//-------------END
	
}
