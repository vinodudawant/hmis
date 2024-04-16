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
import com.hms.doctordesk.dto.ComplaintMasterDto;
import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.doctordesk.service.ComplaintMasterService;


@RestController
@RequestMapping(value="/complaint_master")
public class ComplaintMasterController {
	
	static Logger log=Logger.getLogger(ComplaintMasterController.class.getName());
	
	@Autowired
	ComplaintMasterService complaintMasterService;
	
	static {
		System.out.println("stateDemoController Loaded...!");
	}

	@RequestMapping(value = "/saveComplaint", method = RequestMethod.POST)
	public int saveComplaint(ComplaintMasterDto complaint, HttpServletRequest request) {
		log.info("In ComplaintMasterController saveComplaint()");
		//String msg = "";
		int response = complaintMasterService.saveComplaintMaster(complaint, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllComplaintMaster", method = RequestMethod.GET)
	public @ResponseBody
	ComplaintMasterDto getAllComplaintMaster(HttpServletRequest request) {
		log.info("In ComplaintMasterController getAllComplaintMaster()");
		List<ComplaintMasterDto> lstComplaintMaster = new ArrayList<ComplaintMasterDto>();
		lstComplaintMaster = complaintMasterService.getAllComplaintMaster(request);
		ComplaintMasterDto obj = new ComplaintMasterDto();
		obj.setLstComplaintMaster(lstComplaintMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/editComplaintMaster", method = RequestMethod.GET)
	public @ResponseBody
	ComplaintMasterDto editComplaintMaster(@RequestParam("complaintId") Integer complaintId) {
		log.info("In ComplaintMasterController editComplaintMaster()");
		ComplaintMasterDto obj = new ComplaintMasterDto();
		obj = complaintMasterService.editComplaintMaster(complaintId);
		log.error("Response-----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteComplaintMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteComplaintMaster(@RequestParam("complaintId") Integer complaintId,HttpServletRequest request) {
		log.info("In ComplaintMasterController deleteComplaintMaster()");
		System.out.println("complaintId :"+complaintId);
		boolean response = complaintMasterService.deleteComplaintMaster(complaintId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}	
	
	@RequestMapping(value = "/centerComplaintAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	ComplaintMasterDto centerComplaintAutoSuggestion(@RequestParam("complaintName")String complaintName,@RequestParam("complaintCode")String complaintCode) {
		log.info("In ComplaintMasterController centerComplaintAutoSuggestion()");
		List<ComplaintMasterDto> lstComplaintMaster = new ArrayList<ComplaintMasterDto>();
		lstComplaintMaster = complaintMasterService.centerComplaintAutoSuggestion(complaintName,complaintCode);
		ComplaintMasterDto obj = new ComplaintMasterDto();
		obj.setLstComplaintMaster(lstComplaintMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	
}
