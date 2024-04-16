package com.hms.doctordesk.controller;

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
import com.hms.doctordesk.dto.ChemotherapyDto;
import com.hms.doctordesk.service.ChemotherapyService;

@RestController
@RequestMapping(value="/chemotherapy_master")
public class ChemotherapyController {
	@Autowired
	ChemotherapyService chemotherapyService;
	
	static Logger log=Logger.getLogger(ChemotherapyController.class.getName());
	
	static {
		System.out.println("stateDemoController Loaded...!");
	}
	@RequestMapping(value = "/getAllChemoMaster", method = RequestMethod.GET)
	public @ResponseBody
	ChemotherapyDto getAllChemoMaster(HttpServletRequest request) {
		log.info("In ChemotherapyController getAllChemoMaster()");
		List<ChemotherapyDto> lstChemoMaster = new ArrayList<ChemotherapyDto>();
		lstChemoMaster = chemotherapyService.getAllChemoMaster();
		ChemotherapyDto obj = new ChemotherapyDto();
		obj.setLstchemotherapyMaster(lstChemoMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/saveChemoMaster", method = RequestMethod.POST)
	public int saveChemoMaster(ChemotherapyDto chemo, HttpServletRequest request) {
		log.info("In ChemotherapyController saveChemoMaster()");
		//System.out.println(chemo);
		int response = chemotherapyService.saveChemoMaster(chemo, request);
		log.debug("Response----> "+response);
		return response;
	}
	@RequestMapping(value = "/editChemoMaster", method = RequestMethod.GET)
	public @ResponseBody
	ChemotherapyDto editChemoMaster(@RequestParam("chemotherapyId") Integer chemotherapyId) {
		log.info("In ChemotherapyController editChemoMaster()");
		ChemotherapyDto obj = new ChemotherapyDto();
		obj = chemotherapyService.editChemoMaster(chemotherapyId);	
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteChemoMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteChemoMaster(@RequestParam("chemotherapyId") Integer chemotherapyId,HttpServletRequest request) {
		log.info("In ChemotherapyController deleteChemoMaster()");
		System.out.println("chemotherapyId :"+chemotherapyId);
		boolean response = chemotherapyService.deleteChemoMaster(chemotherapyId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response-----> "+msg);
		return msg;
	}	
	@RequestMapping(value = "/centerChemoAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	ChemotherapyDto centerChemoAutoSuggestion(@RequestParam("chemotherapyName")String chemotherapyName) {
		log.info("In ChemotherapyController centerChemoAutoSuggestion()");
		List<ChemotherapyDto> lstChemoMaster = new ArrayList<ChemotherapyDto>();
		lstChemoMaster = chemotherapyService.getAllChemoMasterAutosuggestion(chemotherapyName);
		ChemotherapyDto obj = new ChemotherapyDto();
		obj.setLstchemotherapyMaster(lstChemoMaster);
		log.debug("Response---> "+obj);
		return obj;
	}
	

}
