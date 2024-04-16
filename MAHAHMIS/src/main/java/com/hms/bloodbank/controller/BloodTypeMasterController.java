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
import com.hms.bloodbank.dto.BloodTypeMaster;
import com.hms.bloodbank.service.BloodTypeMasterService;

@RestController
@RequestMapping(value="/bb_blood_type")
public class BloodTypeMasterController {
	
static Logger log=Logger.getLogger(BloodTypeMasterController.class.getName());
	
	@Autowired
	BloodTypeMasterService bloodTypeMasterService;
	
	static {
		System.out.println("BloodTypeMasterController Loaded...!");
	}
	
	@RequestMapping(value = "/saveTypeGroup", method = RequestMethod.POST)
	public int saveTypeGroup(BloodTypeMaster bloodBagDetails, HttpServletRequest request) {
		log.info("In BloodTypeMasterController saveBloodBagMaster()");
		int response = bloodTypeMasterService.saveTypeGroup(bloodBagDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllBloodTypeMaster", method = RequestMethod.GET)
	public @ResponseBody
	BloodTypeMaster getAllBloodTypeMaster(HttpServletRequest request) {
		log.info("In BloodTypeMasterController getAllBloodBagMaster()");
		List<BloodTypeMaster> lstBloodTypeMaster = new ArrayList<BloodTypeMaster>();
		lstBloodTypeMaster = bloodTypeMasterService.getAllBloodTypeMaster(request);
		BloodTypeMaster obj = new BloodTypeMaster();
		obj.setLstBloodTypeMaster(lstBloodTypeMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/editBloodTypeMaster", method = RequestMethod.GET)
	public @ResponseBody
	BloodTypeMaster editBloodTypeMaster(@RequestParam("bloodTypeId") Integer bloodTypeId) {
		log.info("In BloodTypeMasterController editBloodTypeMaster()");
		BloodTypeMaster obj = new BloodTypeMaster();
		obj = bloodTypeMasterService.editBloodTypeMaster(bloodTypeId);
		log.error("Response-----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteBloodTypeMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBloodTypeMaster(@RequestParam("bloodTypeId") Integer bloodTypeId,HttpServletRequest request) {
		log.info("In BloodTypeMasterController deleteBloodTypeMaster()");
		System.out.println("bloodTypeId :"+bloodTypeId);
		boolean response = bloodTypeMasterService.deleteBloodTypeMaster(bloodTypeId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	@RequestMapping(value = "/centerBloodTypeAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	BloodTypeMaster centerBloodTypeAutoSuggestion(@RequestParam("bloodTypeName")String bloodTypeName) {
		log.info("In BloodBagMasterController centerBloodTypeAutoSuggestion()");
		List<BloodTypeMaster> lstBloodTypeMaster = new ArrayList<BloodTypeMaster>();
		lstBloodTypeMaster = bloodTypeMasterService.centerBloodTypeAutoSuggestion(bloodTypeName);
		BloodTypeMaster obj = new BloodTypeMaster();
		obj.setLstBloodTypeMaster(lstBloodTypeMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
}
