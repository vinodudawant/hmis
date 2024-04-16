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


import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.doctordesk.dto.SubjectiveObjectiveDto;
import com.hms.doctordesk.service.SubjectiveObjectiveService;

//created by Rahul for Subjective Objective Temp Type Module

@RestController
@RequestMapping(value="/subjective")
public class SubjectiveObjectiveController {
	
	@Autowired
	SubjectiveObjectiveService subjectiveObjectiveService;

static Logger log=Logger.getLogger(SubjectiveObjectiveService.class.getName());
	
	static {
		System.out.println("Subjective Controller Loaded...!");
	}
	
	//save Subjective Objective Temp Type date
	@RequestMapping(value = "/saveSubjective", method = RequestMethod.POST)
	public int saveSubjective(SubjectiveObjectiveDto subjective, HttpServletRequest request){
		System.out.println("#####"+subjective);
		log.info("In Subjective Objective Controller saveSubjectiveMast()");
		String msg = "";
		int response = subjectiveObjectiveService.saveSubjectiveMaster(subjective, request);
		log.debug("Reponse----> "+response);
		return response;
	}
	
	//Get all Subjective Objective Temp Type Data
	@RequestMapping(value = "/getAllSubjectiveMaster", method = RequestMethod.GET)
	public @ResponseBody
	SubjectiveObjectiveDto getAllSubjectiveMaster(HttpServletRequest request) {
		log.info("In Subjective Objective Controller getAllSubjectiveMaster()");
		List<SubjectiveObjectiveDto> lstSubjectiveMaster = new ArrayList<SubjectiveObjectiveDto>();
		lstSubjectiveMaster = subjectiveObjectiveService.getAllSubjectiveMaster(request);
		SubjectiveObjectiveDto obj = new SubjectiveObjectiveDto();
		obj.setLstSubjectiveMaster(lstSubjectiveMaster);
		log.debug("Reponse----> "+obj);
		return obj;
	}	
	
	//Update Subjective Objective Temp Type Data
	@RequestMapping(value = "/editSubjectiveMaster", method = RequestMethod.GET)
	public @ResponseBody
	SubjectiveObjectiveDto editSubjectiveMaster(@RequestParam("subId") Integer subId) {
		log.info("In Subjective Objective Controller editSubjectiveMaster()");
		SubjectiveObjectiveDto obj = new SubjectiveObjectiveDto(); // object of dto
		obj = subjectiveObjectiveService.editSubjectiveMaster(subId); //create method for edit
		log.debug("Reponse----> "+obj);
		return obj;
	}	
	
    //delete Subjective Objective Temp Type data
	@RequestMapping(value = "/deleteSubjectiveDTO", method = RequestMethod.POST)
	public @ResponseBody
	String deleteSubjectiveDTO(@RequestParam("subId") Integer subId,HttpServletRequest request) {
		log.info("In Subjective Objective Controller deleteSubjectiveDTO()");
		//int res=0;
		boolean res = subjectiveObjectiveService.deleteSubjectiveDTO(subId,request);
		String msg = "";
		if (res == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Reponse----> "+msg);
		return msg;
	}	
	
	// search data for subjective objective temp type
	@RequestMapping(value = "/centerSubjectiveAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	SubjectiveObjectiveDto centerSubjectiveAutoSuggestion(@RequestParam("subjective_objective_tempType")String subjectiveObjectivetempType) {
		log.info("In Subjective Objective Controller centerSubjectiveAutoSuggestion()");
		List<SubjectiveObjectiveDto> lstSubjectiveMaster = new ArrayList<SubjectiveObjectiveDto>();
		lstSubjectiveMaster = subjectiveObjectiveService.getAllSubjectiveMasterAutosuggestion(subjectiveObjectivetempType);
		SubjectiveObjectiveDto obj = new SubjectiveObjectiveDto();
		obj.setLstSubjectiveMaster(lstSubjectiveMaster);
		log.debug("Reponse----> "+obj);
		return obj;
	}
}
