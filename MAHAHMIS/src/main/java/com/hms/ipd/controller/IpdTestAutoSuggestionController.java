package com.hms.ipd.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ipd.service.IpdTestAutoSuggestionService;
import com.hms.opdbill.dto.SponsorTestChargesDto;
import com.hms.opdbill.dto.TestAutoSuggestionDto;
import com.hms.opdbill.dto.TestSponsorAutoSuggestionDto;

@Controller
@RequestMapping(value = "/ipdtestautosuggest")
public class IpdTestAutoSuggestionController {

	static Logger log=Logger.getLogger(IpdTestAutoSuggestionController.class.getName());
	static {
		System.out.println("TestAutoSuggestionController is Loaded...!");
	}
	
	@Autowired
	IpdTestAutoSuggestionService testAutoSuggestService;
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get autosuggestion of services
	================*/
	@ResponseBody
	@RequestMapping(value = "/getTestAutosuggestion", method = RequestMethod.POST)
	public TestAutoSuggestionDto getTestAutoSuggestion(TestAutoSuggestionDto objDto) {
		
		log.info("In TestAutoSuggestionController getTestAutoSuggestion()");
		return testAutoSuggestService.getTestAutoSuggestion(objDto);
	}
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get autosuggestion of services configured for sponsor
	================*/
	@ResponseBody
	@RequestMapping(value = "/getSponsorTestAutosuggestion", method = RequestMethod.POST)
	public TestSponsorAutoSuggestionDto getTestAutoSuggestion(TestSponsorAutoSuggestionDto objDto) {
		
		log.info("In TestAutoSuggestionController getSponsorTestAutosuggestion()");
		return testAutoSuggestService.getSponsorTestAutosuggestion(objDto);
	}
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get charges configured for sponsor
	================*/
	@ResponseBody
	@RequestMapping(value = "/getSponsorTestCharges", method = RequestMethod.POST)
	public SponsorTestChargesDto getSponsorTestCharges(SponsorTestChargesDto objDto) {
		
		log.info("In TestAutoSuggestionController getSponsorTestAutosuggestion()");
		return testAutoSuggestService.getSponsorTestCharges(objDto);
	}
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get charges configured for sponsor
	================*/
	@ResponseBody
	@RequestMapping(value = "/getHallWiseTestCharges", method = RequestMethod.POST)
	public SponsorTestChargesDto getHallWiseTestCharges(SponsorTestChargesDto objDto) {
		
		log.info("In TestAutoSuggestionController getHallWiseTestCharges()");
		return testAutoSuggestService.getHallWiseTestCharges(objDto);
	}
}
