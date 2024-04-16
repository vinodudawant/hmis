package com.hms.organdonation.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.organdonation.dto.PreservationMethodMasterDto;
import com.hms.organdonation.service.PreservationMethodMasterService;

@Controller
@RequestMapping(value = "/preservationMethodMaster")
public class PreservationMethodMasterController {
	
	static Logger log=Logger.getLogger(PreservationMethodMasterController.class.getName());

	@Autowired
	private PreservationMethodMasterService preservationmethodmasterservice;
	
	@Autowired
	private PreservationMethodMasterDto preservationMethodMasterdto;
	
	@RequestMapping(value = "/savePreservationMethodMaster", method = RequestMethod.POST)
	@ResponseBody
	public int savepreservationMethodMaster(PreservationMethodMasterDto obj,HttpServletRequest request) {
		int status = preservationmethodmasterservice.savePreservationMethodMaster(obj, request);
		return status;
	}
	
	@RequestMapping(value = "/getAllPreservationMethodMaster", method = RequestMethod.GET)
	public @ResponseBody
	PreservationMethodMasterDto getAllPreservationMethodMaster(HttpServletRequest request) {
		log.info("In PreservationMethodMasterController getAllPreservationMehtodMaster()");
		List<PreservationMethodMasterDto> lstPreservationMethodMasterDto = new ArrayList<PreservationMethodMasterDto>();
		lstPreservationMethodMasterDto = preservationmethodmasterservice.getAllPreservationMethodMaster(request);
		preservationMethodMasterdto.setLstPreservationMethodMasterDto(lstPreservationMethodMasterDto);
		log.debug("Response----> "+preservationMethodMasterdto);
		return preservationMethodMasterdto;
	}	
	
	@RequestMapping(value = "/editPreservationMethodMaster", method = RequestMethod.GET)
	public @ResponseBody
	PreservationMethodMasterDto editPreservationMethodMaster(@RequestParam("id") Integer preservationMethodMasterId) {
		log.info("In PreservationMethodMasterController editPreservationMethodMasters()");
		preservationMethodMasterdto = preservationmethodmasterservice.editPreservationMethodMaster(preservationMethodMasterId);
		log.error("Response-----> "+preservationMethodMasterdto);
		return preservationMethodMasterdto;
	}	
	
	@RequestMapping(value = "/deletePreservationMethodMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deletePreservationMethodMaster(@RequestParam("preservationMethodMasterId") Integer preservationMethodMasterId,HttpServletRequest request) {
		log.info("In PreservationMethodMasterController deletePreservationMethodMaster()");
		System.out.println("preservationMethodMasterId :"+preservationMethodMasterId);
		boolean response = preservationmethodmasterservice.deletePreservationMethodMaster(preservationMethodMasterId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/preservationMethodMasterAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	PreservationMethodMasterDto preservationMethodMasterAutoSuggestion(@RequestParam("preservationMethodName")String preservationMethodName) {
		log.info("In PreservationMethodMasterController preservationMethodMasterAutoSuggestion()");
		List<PreservationMethodMasterDto> lstPreservationMethodMasterDto = new ArrayList<PreservationMethodMasterDto>();
		lstPreservationMethodMasterDto = preservationmethodmasterservice.preservationMethodMasterAutoSuggestion(preservationMethodName);
		preservationMethodMasterdto.setLstPreservationMethodMasterDto(lstPreservationMethodMasterDto);
		log.debug("Response----> "+preservationMethodMasterdto);
		return preservationMethodMasterdto;
	}
}
