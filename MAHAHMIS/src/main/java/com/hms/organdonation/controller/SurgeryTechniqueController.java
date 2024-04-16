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

import com.hms.organdonation.dto.SurgeryTechniqueDto;
import com.hms.organdonation.service.SurgeryTechniqueService;


@Controller
@RequestMapping(value = "/surgeryTechnique")
public class SurgeryTechniqueController {
	
	static Logger log=Logger.getLogger(SurgeryTechniqueController.class.getName());
	
	@Autowired
	private SurgeryTechniqueDto surgerytechniquedto;
	
	@Autowired
	private SurgeryTechniqueService surgeryTechniqueservice;
	
	@RequestMapping(value = "/saveSurgeryTechnique", method = RequestMethod.POST)
	@ResponseBody
	public int saveSurgeryTechnique(SurgeryTechniqueDto obj,HttpServletRequest request) {
		int status = surgeryTechniqueservice.saveSurgeryTechnique(obj, request);
		return status;
	}
	
	@RequestMapping(value = "/getAllSurgeryTechnique", method = RequestMethod.GET)
	public @ResponseBody
	SurgeryTechniqueDto getAllSurgeryTechnique(HttpServletRequest request) {
		log.info("In SurgeryTechniqueController getAllSurgeryTechnique()");
		List<SurgeryTechniqueDto> lstSurgeryTechniqueDto = new ArrayList<SurgeryTechniqueDto>();
		lstSurgeryTechniqueDto = surgeryTechniqueservice.getAllSurgeryTechnique(request);
		surgerytechniquedto.setLstSurgeryTechniqueDto(lstSurgeryTechniqueDto);
		log.debug("Response----> "+surgerytechniquedto);
		return surgerytechniquedto;
	}	
	
	@RequestMapping(value = "/editSurgeryTechnique", method = RequestMethod.GET)
	public @ResponseBody
	SurgeryTechniqueDto editSurgeryTechnique(@RequestParam("id") Integer stId) {
		log.info("In SurgeryTechniqueController editSurgeryTechnique()");
		surgerytechniquedto = surgeryTechniqueservice.editSurgeryTechnique(stId);
		log.error("Response-----> "+surgerytechniquedto);
		return surgerytechniquedto;
	}	
	
	@RequestMapping(value = "/deleteSurgeryTechnique", method = RequestMethod.POST)
	public @ResponseBody
	String deleteSurgeryTechnique(@RequestParam("stId") Integer stId,HttpServletRequest request) {
		log.info("In SurgeryTechniqueController deleteSurgeryTechnique()");
		System.out.println("stId :"+stId);
		boolean response = surgeryTechniqueservice.deleteSurgeryTechnique(stId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	
	@RequestMapping(value = "/surgeryTechniqueAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	SurgeryTechniqueDto surgeryTechniqueAutoSuggestion(@RequestParam("stName") String stName) {
		
		log.info("In SurgeryTechniqueController surgeryTechniqueAutoSuggestion()");
		List<SurgeryTechniqueDto> lstSurgeryTechniqueDto = new ArrayList<SurgeryTechniqueDto>();
		lstSurgeryTechniqueDto = surgeryTechniqueservice.surgeryTechniqueAutoSuggestion(stName);
		surgerytechniquedto.setLstSurgeryTechniqueDto(lstSurgeryTechniqueDto);
		log.debug("Response----> "+surgerytechniquedto);
		return surgerytechniquedto;
	}

}
