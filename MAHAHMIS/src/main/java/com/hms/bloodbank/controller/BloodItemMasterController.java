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
import com.hms.bloodbank.dto.BloodItemMaster;
import com.hms.bloodbank.service.BloodItemMasterService;

@RestController
@RequestMapping(value="bb_blood_item")
public class BloodItemMasterController {
	
static Logger log=Logger.getLogger(BloodItemMasterController.class.getName());
	
	@Autowired
	BloodItemMasterService bloodItemMasterService;
	
	static {
		System.out.println("BloodItemMasterController Loaded...!");
	}
		
	@RequestMapping(value = "/saveBloodItemMaster", method = RequestMethod.POST)
	public int saveBloodItemMaster(BloodItemMaster bloodItemDetails, HttpServletRequest request) {
		log.info("In BloodItemMasterController saveBloodItemMaster()");
		int response = bloodItemMasterService.saveBloodItemMaster(bloodItemDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllBloodItemMaster", method = RequestMethod.GET)
	public @ResponseBody
	BloodItemMaster getAllBloodItemMaster(HttpServletRequest request) {
		log.info("In BloodItemMasterController getAllBloodItemMaster()");
		List<BloodItemMaster> lstBloodItemMaster = new ArrayList<BloodItemMaster>();
		lstBloodItemMaster = bloodItemMasterService.getAllBloodItemMaster(request);
		BloodItemMaster obj = new BloodItemMaster();
		obj.setLstBloodItemMaster(lstBloodItemMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/editBloodItemMaster", method = RequestMethod.GET)
	public @ResponseBody
	BloodItemMaster editBloodItemMaster(@RequestParam("bloodItemId") Integer bloodItemId) {
		log.info("In BloodItemMasterController editBloodItemMaster()");
		BloodItemMaster obj = new BloodItemMaster();
		obj = bloodItemMasterService.editBloodItemMaster(bloodItemId);
		log.error("Response-----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteBloodItemMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBloodItemMaster(@RequestParam("bloodItemId") Integer bloodItemId,HttpServletRequest request) {
		log.info("In BloodItemMasterController deleteBloodItemMaster()");
		boolean response = bloodItemMasterService.deleteBloodItemMaster(bloodItemId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}	

	@RequestMapping(value = "/centerBloodItemAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	BloodItemMaster centerBloodItemAutoSuggestion(@RequestParam("bloodItemName")String bloodItemName) {
		log.info("In BloodItemMasterController centerBloodItemAutoSuggestion()");
		List<BloodItemMaster> lstBloodItemMaster = new ArrayList<BloodItemMaster>();
		lstBloodItemMaster = bloodItemMasterService.centerBloodItemAutoSuggestion(bloodItemName);
		BloodItemMaster obj = new BloodItemMaster();
		obj.setLstBloodItemMaster(lstBloodItemMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
}
