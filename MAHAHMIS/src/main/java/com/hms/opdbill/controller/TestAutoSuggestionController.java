package com.hms.opdbill.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.opdbill.dto.SponsorTestChargesDto;
import com.hms.opdbill.dto.TestAutoSuggestionDto;
import com.hms.opdbill.dto.TestSponsorAutoSuggestionDto;
import com.hms.opdbill.service.TestAutoSuggestionService;

@Controller
@RequestMapping(value = "/testautosuggest")
public class TestAutoSuggestionController {

	static Logger log=Logger.getLogger(TestAutoSuggestionController.class.getName());
	static {
		System.out.println("TestAutoSuggestionController is Loaded...!");
	}
	
	@Autowired
	TestAutoSuggestionService testAutoSuggestService;
	
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
	@RequestMapping(value = "/getB2BTestCharges", method = RequestMethod.POST)
	public SponsorTestChargesDto getB2BTestCharges(SponsorTestChargesDto objDto) {
		
		log.info("In TestAutoSuggestionController getSponsorTestAutosuggestion()");
		return testAutoSuggestService.getB2BTestCharges(objDto);
	}
}
