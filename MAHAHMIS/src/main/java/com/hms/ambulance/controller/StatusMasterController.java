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

import com.hms.ambulance.dto.StatusMasterDto;
import com.hms.ambulance.service.StatusMasterService;

@RestController
@RequestMapping(value = "/statusMaster")
public class StatusMasterController {

	
	@Autowired
	StatusMasterService statusService;
	
	static Logger log = Logger.getLogger(StatusMasterController.class.getName());

	@RequestMapping(value = "/saveStatus", method = RequestMethod.POST)
	public int saveStatus(StatusMasterDto statusDto, HttpServletRequest request) {

		log.info("In StatusController saveStatus()");
		String msg = "";
		int response = statusService.saveStatus(statusDto, request);
		log.debug("Reponse----> " + response);
		return response;
		
	}
	
	@RequestMapping(value = "/getAllStatusMaster", method = RequestMethod.GET)
	public @ResponseBody StatusMasterDto getAllStatusMaster(HttpServletRequest request) {
		log.info("In StatusController getAllStatusMaster()");
		List<StatusMasterDto> listStatusMasterDto = new ArrayList<StatusMasterDto>();
		listStatusMasterDto = statusService.getAllStatusMaster(request);
		StatusMasterDto obj = new StatusMasterDto();
		obj.setListStatusMasterDto(listStatusMasterDto);
		System.out.println("list :  " + listStatusMasterDto);
		return obj;
	}

	@RequestMapping(value = "/editStatusMaster", method = RequestMethod.GET)
	public @ResponseBody StatusMasterDto editStatusMaster(@RequestParam("statusId") Integer statusId) {
		log.info("In StatusMasterController editStatusMaster()");
		StatusMasterDto obj = new StatusMasterDto();
		obj = statusService.editStatusMaster(statusId);
		Log.debug("Response----->" + obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteStatusMaster", method = RequestMethod.POST)
	public @ResponseBody String deleteVehicleMaster(@RequestParam("status_Id") Integer statusId,
			HttpServletRequest request) {
		log.info("In StatusMasterController deleteStatusMaster()");
		
		boolean response = statusService.deleteStatusMaster(statusId, request);

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
