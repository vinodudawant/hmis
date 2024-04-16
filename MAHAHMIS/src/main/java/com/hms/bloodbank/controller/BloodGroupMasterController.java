package com.hms.bloodbank.controller;

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

import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.bloodbank.service.BloodGroupMasterService;
import com.hms.doctordesk.dto.ComplaintMasterDto;

@RestController
@RequestMapping(value="/bb_blood_group_master")
public class BloodGroupMasterController {

static Logger log=Logger.getLogger(BloodGroupMasterController.class.getName());
	
	@Autowired
	BloodGroupMasterService bloodGroupMasterService;
	
	static {
		System.out.println("BloodGroupMasterController Loaded...!");
	}
		
	@RequestMapping(value = "/saveBloodGroup", method = RequestMethod.POST)
	public int saveBloodGroup(BloodGroupMaster bloodGroupDetails, HttpServletRequest request) {
		log.info("In BloodGroupMasterController saveBloodGroup()");
		System.out.println("checkuplist"+bloodGroupDetails);
		int response = bloodGroupMasterService.saveBloodGroup(bloodGroupDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllBloodGroupMaster", method = RequestMethod.GET)
	public @ResponseBody
	BloodGroupMaster getAllBloodGroupMaster(HttpServletRequest request) {
		log.info("In BloodGroupMasterController getAllBloodGroupMaster()");
		List<BloodGroupMaster> lstBloodGroupMaster = new ArrayList<BloodGroupMaster>();
		lstBloodGroupMaster = bloodGroupMasterService.getAllBloodGroupMaster(request);
		BloodGroupMaster obj = new BloodGroupMaster();
		obj.setLstBloodGroupMaster(lstBloodGroupMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/editBloodGrouptMaster", method = RequestMethod.GET)
	public @ResponseBody
	BloodGroupMaster editBloodGrouptMaster(@RequestParam("bloodGroupId") Integer bloodGroupId) {
		log.info("In BloodGroupMasterController editBloodGrouptMaster()");
		BloodGroupMaster obj = new BloodGroupMaster();
		obj = bloodGroupMasterService.editBloodGrouptMaster(bloodGroupId);
		log.error("Response-----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteBloodGroupMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBloodGroupMaster(@RequestParam("bloodGroupId") Integer bloodGroupId,HttpServletRequest request) {
		log.info("In BloodGroupMasterController deleteBloodGroupMaster()");
		System.out.println("bloodGroupId :"+bloodGroupId);
		boolean response = bloodGroupMasterService.deleteBloodGroupMaster(bloodGroupId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}	

	@RequestMapping(value = "/centerBloodGroupAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	BloodGroupMaster centerBloodGroupAutoSuggestion(@RequestParam("bloodGroupName")String bloodGroupName) {
		log.info("In BloodGroupMasterController centerBloodGroupAutoSuggestion()");
		List<BloodGroupMaster> lstBloodGroupMaster = new ArrayList<BloodGroupMaster>();
		lstBloodGroupMaster = bloodGroupMasterService.centerBloodGroupAutoSuggestion(bloodGroupName);
		BloodGroupMaster obj = new BloodGroupMaster();
		obj.setLstBloodGroupMaster(lstBloodGroupMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	}
