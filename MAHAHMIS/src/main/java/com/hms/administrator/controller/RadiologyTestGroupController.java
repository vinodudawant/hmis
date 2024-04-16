package com.hms.administrator.controller;

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

import com.hms.administrator.service.RadiologyTestGroupService;
import com.hms.administrator.dto.Test;

@Controller 
@RequestMapping(value="/radiology")
public class RadiologyTestGroupController {
	static Logger log=Logger.getLogger(RadiologyTestGroupController.class.getName());

	@Autowired
	RadiologyTestGroupService  groupservice;
	
	@RequestMapping(value = "/saveradiologytestgroup", method = RequestMethod.POST)
	@ResponseBody
	public int saveRadiologyTestGroup(Test robj,HttpServletRequest request) {
		log.info("saveRadiologyTestGroup..");

		int response = groupservice.saveOrUpdateRadiologyTestGroup(robj, request);
	      log.debug("saveRadiologyTestGroup....."+response);

		return response;	
	}	
	@RequestMapping(value = "/getallradiologytestgroup", method = RequestMethod.GET)
	public @ResponseBody
	Test getAllRadiologyTestGroup(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		log.info("getallradiologytestgroup..");

		List<Test> lstgroup = new ArrayList<Test>();
		lstgroup = groupservice.getAllRadiologyTestGroup(unitId,request);
	      log.debug("getallradiologytestgroup....."+lstgroup);
	      Test obj = new Test();
		obj.setTestList(lstgroup);
		return obj;
	}	
	
	@RequestMapping(value = "/editradiologytestgroup", method = RequestMethod.GET)
	public @ResponseBody
	Test editRadiologyTestGroup(@RequestParam("id") Integer id) {
		log.info("editradiologytestgroup..");
		Test obj = new Test();
		obj = groupservice.editRadiologyTestGroup(id);	
		return obj;
	}	
	
	@RequestMapping(value = "/deleteradiologytestgroup", method = RequestMethod.POST)
	public @ResponseBody
	String deleteRadiologyTestGroup(@RequestParam("id") Integer id,HttpServletRequest request) {
		log.info("deleteradiologytestgroup..");
		boolean response = groupservice.deleteRadiologyTestGroup(id, request);
	      log.debug("deleteradiologytestgroup....."+response);

				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network Issue";
		}
		return msg;
	}	

	@RequestMapping(value = "/radiologytestgroupautosuggestion", method = RequestMethod.GET)
	public @ResponseBody
	Test radiologyTestGroupAutoSuggestion(@RequestParam("groupName") String groupName,HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		log.info("radiologyTestGroupAutoSuggestion..");

		List<Test> lstgroup = new ArrayList<Test>();
		lstgroup = groupservice.radiologyTestGroupAutoSuggestion(groupName,unitId);
	      log.debug("radiologyTestGroupAutoSuggestion....."+lstgroup);
	      Test obj = new Test();
		obj.setTestList(lstgroup);
		return obj;
	}	

}
