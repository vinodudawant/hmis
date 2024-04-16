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

import com.hms.bloodbank.dto.BloodBagMaster;
import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.bloodbank.service.BloodBagMasterService;


@RestController
@RequestMapping(value="/bb_bag_master")
public class BloodBagMasterController {
	
static Logger log=Logger.getLogger(BloodBagMasterController.class.getName());
	
	@Autowired
	BloodBagMasterService bloodBagMasterService;
	
	static {
		System.out.println("BloodBagMasterController Loaded...!");
	}

	
	@RequestMapping(value = "/saveBloodBagMaster", method = RequestMethod.POST)
	public int saveBloodBagMaster(BloodBagMaster bloodBagDetails, HttpServletRequest request) {
		log.info("In BloodBagMasterController saveBloodBagMaster()");
		int response = bloodBagMasterService.saveBloodBagMaster(bloodBagDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllBloodBagMaster", method = RequestMethod.GET)
	public @ResponseBody
	BloodBagMaster getAllBloodBagMaster(HttpServletRequest request) {
		log.info("In BloodBagMasterController getAllBloodBagMaster()");
		List<BloodBagMaster> lstBloodBagMaster = new ArrayList<BloodBagMaster>();
		lstBloodBagMaster = bloodBagMasterService.getAllBloodBagMaster(request);
		BloodBagMaster obj = new BloodBagMaster();
		obj.setLstBloodBagMaster(lstBloodBagMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/editBloodBagtMaster", method = RequestMethod.GET)
	public @ResponseBody
	BloodBagMaster editBloodBagtMaster(@RequestParam("bloodBagId") Integer bloodBagId) {
		log.info("In BloodBagMasterController editBloodBagtMaster()");
		BloodBagMaster obj = new BloodBagMaster();
		obj = bloodBagMasterService.editBloodBagtMaster(bloodBagId);
		log.error("Response-----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteBloodBagMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBloodBagMaster(@RequestParam("bloodBagId") Integer bloodBagId,HttpServletRequest request) {
		log.info("In BloodBagMasterController deleteBloodBagMaster()");
		boolean response = bloodBagMasterService.deleteBloodBagMaster(bloodBagId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}	

	@RequestMapping(value = "/centerBloodBagAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	BloodBagMaster centerBloodBagAutoSuggestion(@RequestParam("bloodBagName")String bloodBagName) {
		log.info("In BloodBagMasterController centerBloodBagAutoSuggestion()");
		List<BloodBagMaster> lstBloodBagMaster = new ArrayList<BloodBagMaster>();
		lstBloodBagMaster = bloodBagMasterService.centerBloodBagAutoSuggestion(bloodBagName);
		BloodBagMaster obj = new BloodBagMaster();
		obj.setLstBloodBagMaster(lstBloodBagMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	
	@RequestMapping(value = "/saveBloodBagMaster1", method = RequestMethod.POST)
	public int saveBloodBagMaster1(BloodBagMaster bloodBagDetails, HttpServletRequest request) {
		log.info("In BloodBagMasterController saveBloodBagMaster()");
		int response = bloodBagMasterService.saveBloodBagMaster1(bloodBagDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
}
