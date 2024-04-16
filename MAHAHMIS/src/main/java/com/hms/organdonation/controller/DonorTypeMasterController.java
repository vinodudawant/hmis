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

import com.hms.organdonation.dto.DonorTypeMasterDto;
import com.hms.organdonation.service.DonorTypeMasterService;

@Controller
@RequestMapping(value = "/donorTypeMaster")
public class DonorTypeMasterController {
	
	static Logger log=Logger.getLogger(DonorTypeMasterController.class.getName());

	@Autowired
	private DonorTypeMasterService donorTypeMasterService;
	
	
	@Autowired
	private DonorTypeMasterDto donorTypeMasterDto;
	
	@RequestMapping(value = "/saveDonorTypeMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveDonorTypeMaster(DonorTypeMasterDto obj,HttpServletRequest request) {
		int status = donorTypeMasterService.saveDonorTypeMaster(obj, request);
		return status;
	}
	
	@RequestMapping(value = "/getAllDonorTypeMaster", method = RequestMethod.GET)
	public @ResponseBody
	DonorTypeMasterDto getAllDonorTypeMaster(HttpServletRequest request) {
		log.info("In DonorTypeMasterController getAllDonorTypeMaster()");
		List<DonorTypeMasterDto> lstDonorTypeMasterDto = new ArrayList<DonorTypeMasterDto>();
		lstDonorTypeMasterDto = donorTypeMasterService.getAllDonorTypeMaster(request);
		donorTypeMasterDto.setLstDonorTypeMasterDto(lstDonorTypeMasterDto);
		log.debug("Response----> "+donorTypeMasterDto);
		return donorTypeMasterDto;
	}	
	
	@RequestMapping(value = "/editDonorTypeMaster", method = RequestMethod.GET)
	public @ResponseBody
	DonorTypeMasterDto editDonorTypeMaster(@RequestParam("id") Integer donorTypeId) {
		log.info("In DonorTypeMasterController editDonorTypeMaster()");
		donorTypeMasterDto = donorTypeMasterService.editDonorTypeMaster(donorTypeId);
		log.error("Response-----> "+donorTypeMasterDto);
		return donorTypeMasterDto;
	}	
	
	@RequestMapping(value = "/deleteDonorTypeMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDonorTypeMaster(@RequestParam("donorTypeId") Integer donorTypeId,HttpServletRequest request) {
		log.info("In DonorTypeMasterController deleteDonorTypeMaster()");
		System.out.println("donorTypeId :"+donorTypeId);
		boolean response = donorTypeMasterService.deleteDonorTypeMaster(donorTypeId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/donorTypeMasterAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	DonorTypeMasterDto donorTypeMasterAutoSuggestion(@RequestParam("donorType")String donorType) {
		log.info("In DonorTypeMasterController donorTypeMasterAutoSuggestion()");
		List<DonorTypeMasterDto> lstDonorTypeMasterDto = new ArrayList<DonorTypeMasterDto>();
		lstDonorTypeMasterDto = donorTypeMasterService.donorTypeMasterAutoSuggestion(donorType);
		donorTypeMasterDto.setLstDonorTypeMasterDto(lstDonorTypeMasterDto);
		log.debug("Response----> "+donorTypeMasterDto);
		return donorTypeMasterDto;
	}
}
