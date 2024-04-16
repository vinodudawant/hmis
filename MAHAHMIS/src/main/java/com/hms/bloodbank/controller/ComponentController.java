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
import com.hms.bloodbank.dto.Component;
import com.hms.bloodbank.service.BloodIssueService;
import com.hms.bloodbank.service.ComponentService;



@RestController
@RequestMapping(value = "/component")
public class ComponentController {

	static Logger log=Logger.getLogger(ComponentController.class.getName());
	
	@Autowired
	ComponentService componentService;
	
	static {
		System.out.println("componentController Loaded...!");
	}
		
	@RequestMapping(value = "saveComponent", method = RequestMethod.POST)
	public int saveComponent(Component componentDetails, HttpServletRequest request) {
		log.info("In componentController saveComponent()");
		System.out.println("componentDetails"+componentDetails);
		int response = componentService.saveComponent(componentDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllComponentMaster", method = RequestMethod.GET)
	public @ResponseBody
	Component getAllComponentMaster(HttpServletRequest request) {
		log.info("In componentController getAllComponentMaster()");
		List<Component> lstComponentMaster = new ArrayList<Component>();
		lstComponentMaster = componentService.getAllComponentMaster(request);
		Component obj = new Component();
		obj.setLstComponentMaster(lstComponentMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/editComponentMaster", method = RequestMethod.GET)
	public @ResponseBody
	Component editComponentMaster(@RequestParam("componentId") Integer componentId) {
		log.info("In componentController editComponentMaster()");
		Component obj = new Component();
		obj = componentService.editComponentMaster(componentId);
		log.error("Response-----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteComponentMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteComponentMaster(@RequestParam("componentId") Integer componentId,HttpServletRequest request) {
		log.info("In componentController deleteComponentMaster()");
		System.out.println("componentId :"+componentId);
		boolean response = componentService.deleteComponentMaster(componentId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}	

	@RequestMapping(value = "/centerComponentAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	Component centerComponentAutoSuggestion(@RequestParam("componentName")String componentName) {
		log.info("In componentController centerComponentAutoSuggestion()");
		List<Component> lstComponentMaster = new ArrayList<Component>();
		lstComponentMaster = componentService.centerComponentAutoSuggestion(componentName);
		Component obj = new Component();
		obj.setLstComponentMaster(lstComponentMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
}
