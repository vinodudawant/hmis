package com.hms.ambulance.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.jfree.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ambulance.dto.ChecklistMasterDto;
import com.hms.ambulance.service.ChecklistMasterService;

@RestController
@RequestMapping( value = "/checklistMaster")
public class ChecklistMasterController {
	
	@Autowired
	ChecklistMasterService checklistService;
	
	static Logger log = Logger.getLogger(ChecklistMasterController.class.getName());
	
	
	@RequestMapping(value = "/saveChecklist", method = RequestMethod.POST)
	public int saveChecklist(ChecklistMasterDto checklistDto, HttpServletRequest request) {

		log.info("In ChecklistMasterController saveChecklist()");
		String msg = "";
		int response = checklistService.saveChecklist(checklistDto, request);
		log.debug("Reponse----> " + response);
		return response;
		
	}
	
	@RequestMapping(value = "/getAllChecklistMaster", method = RequestMethod.GET)
	public @ResponseBody ChecklistMasterDto getAllChecklistMaster(HttpServletRequest request) {
		log.info("In ChecklistController getAllChecklistMaster()");
		List<ChecklistMasterDto> listChecklistMasterDto = new ArrayList<ChecklistMasterDto>();
		listChecklistMasterDto = checklistService.getAllChecklistMaster(request);
		ChecklistMasterDto obj = new ChecklistMasterDto();
		obj.setListChecklistMasterDto(listChecklistMasterDto);
		System.out.println("list :  " + listChecklistMasterDto);
		return obj;
	}
	
	@RequestMapping(value = "/editChecklistMaster", method = RequestMethod.GET)
	public @ResponseBody ChecklistMasterDto editChecklistMaster(@RequestParam("checklistId") Integer checklistId) {
		log.info("In ChecklistMasterController editChecklistMaster()");
		ChecklistMasterDto obj = new ChecklistMasterDto();
		obj = checklistService.editChecklistMaster(checklistId);
		Log.debug("Response----->" + obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteChecklistMaster", method = RequestMethod.POST)
	public @ResponseBody String deleteChecklistMaster(@RequestParam("checklist_Id") Integer checklistId,
			HttpServletRequest request) {
		log.info("In ChecklistMasterController deleteChecklistMaster()");
		
		boolean response = checklistService.deleteChecklistMaster(checklistId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Network issue";
		}
		Log.debug("Response------>" + msg);
		return msg;
	}
	
}
