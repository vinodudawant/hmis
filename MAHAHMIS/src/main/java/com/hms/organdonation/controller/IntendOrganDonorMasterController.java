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

import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.service.IntendOrganDonorMasterService;

@Controller
@RequestMapping(value = "/intendOrganDonorMaster")
public class IntendOrganDonorMasterController {
	
	static Logger log=Logger.getLogger(IntendOrganDonorMasterController.class.getName());

	@Autowired
	private IntendOrganDonorMasterService intendOrganDonorMasterService;
	
	
	@Autowired
	private IntendOrganDonorMasterDto intendOrganDonorMasterDto;
	
	@RequestMapping(value = "/saveIntendOrganDonorMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveIntendOrganDonorMaster(IntendOrganDonorMasterDto obj,HttpServletRequest request) {
		int status = intendOrganDonorMasterService.saveIntendOrganDonorMaster(obj, request);
		return status;
	}
	
	@RequestMapping(value = "/getAllIntendOrganDonorMaster", method = RequestMethod.GET)
	public @ResponseBody
	IntendOrganDonorMasterDto getAllIntendOrganDonorMaster(HttpServletRequest request) {
		log.info("In IntendOrganDonorMasterController getAllIntendOrganDonorMaster()");
		List<IntendOrganDonorMasterDto> lstIntendOrganDonorMasterDto = new ArrayList<IntendOrganDonorMasterDto>();
		lstIntendOrganDonorMasterDto = intendOrganDonorMasterService.getAllIntendOrganDonorMaster(request);
		intendOrganDonorMasterDto.setLstIntendOrganDonorMasterDto(lstIntendOrganDonorMasterDto);
		log.debug("Response----> "+intendOrganDonorMasterDto);
		return intendOrganDonorMasterDto;
	}	
	
	@RequestMapping(value = "/editIntendOrganDonorMaster", method = RequestMethod.GET)
	public @ResponseBody
	IntendOrganDonorMasterDto editIntendOrganDonorMaster(@RequestParam("intendId") Integer intendId) {
		log.info("In IntendOrganDonorMasterController editIntendOrganDonorMaster()");
		intendOrganDonorMasterDto = intendOrganDonorMasterService.editIntendOrganDonorMaster(intendId);
		log.error("Response-----> "+intendOrganDonorMasterDto);
		return intendOrganDonorMasterDto;
	}	
	
	@RequestMapping(value = "/deleteIntendOrganDonorMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDonorTypeMaster(@RequestParam("intendId") Integer intendId,HttpServletRequest request) {
		log.info("In IntendOrganDonorMasterController deleteIntendOrganDonorMaster()");
		System.out.println("IntendId :"+intendId);
		boolean response = intendOrganDonorMasterService.deleteIntendOrganDonorMaster(intendId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/intendOrganDonorMasterAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	IntendOrganDonorMasterDto intendOrganDonorMasterMasterAutoSuggestion(@RequestParam("intendOrganDonor")String intendOrganDonor) {
		log.info("In intendOrganDonorMasterController IntendOrganDonorMasterAutoSuggestion()");
		List<IntendOrganDonorMasterDto> lstIntendOrganDonorMasterDto = new ArrayList<IntendOrganDonorMasterDto>();
		lstIntendOrganDonorMasterDto = intendOrganDonorMasterService.intendOrganDonorMasterAutoSuggestion(intendOrganDonor);
		intendOrganDonorMasterDto.setLstIntendOrganDonorMasterDto(lstIntendOrganDonorMasterDto);
		log.debug("Response----> "+intendOrganDonorMasterDto);
		return intendOrganDonorMasterDto;
	}
}
