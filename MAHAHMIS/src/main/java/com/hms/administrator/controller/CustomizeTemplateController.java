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

import com.hms.administrator.service.CustomizeTemplateService;
import com.hms.administrator.dto.CustomizeTemplate;

@Controller 
@RequestMapping(value="/admin")
public class CustomizeTemplateController {
	static Logger log=Logger.getLogger(CustomizeTemplateController.class.getName());

	@Autowired
	CustomizeTemplateService cservice;
	
	@RequestMapping(value = "/savecustomizetemplate", method = RequestMethod.POST)
	@ResponseBody
	public int saveCustomizeTemplate(CustomizeTemplate cobj,HttpServletRequest request) {
		
		log.info("savecustomizetemplate.. savecustomizetemplate:: +" + cobj);

		int response = cservice.saveCustomizeTemplate(cobj, request);
	      log.debug("savecustomizetemplate....."+response);

		return response;	
	}
	
	@RequestMapping(value = "/gettemplatelistbytype", method = RequestMethod.GET)
	public @ResponseBody
	CustomizeTemplate getTemplateListByType(HttpServletRequest request,@RequestParam("type") String value,@RequestParam("unitId") Integer unitId) {
		log.info("getTemplateListByType..");

		List<CustomizeTemplate> lstcustomtemp = new ArrayList<CustomizeTemplate>();
		lstcustomtemp = cservice.getTemplateListByType(value,unitId);
	      log.debug("getTemplateListByType....."+lstcustomtemp);
	      CustomizeTemplate obj = new CustomizeTemplate();
		obj.setCustomizeTemplateList(lstcustomtemp);
		return obj;
	}
	
	@RequestMapping(value = "/gettemplatelistbytemplateid", method = RequestMethod.GET)
	public @ResponseBody
	CustomizeTemplate getTemplateListByTemplateId(@RequestParam("id") Integer id) {
		log.info("getTemplateListByTemplateId..");
		CustomizeTemplate obj = new CustomizeTemplate();
		obj = cservice.getTemplateListByTemplateId(id);
		 log.debug("getTemplateListByTemplateId....."+obj);
		return obj;
	}
	
	
	@RequestMapping(value = "/getTemplateListByDepartmentId", method = RequestMethod.GET)
	public @ResponseBody
	CustomizeTemplate getTemplateListByDepartmentId(@RequestParam("departmentId") Integer departmentId) {
		log.info("getTemplateListByDepartmentId..");
		CustomizeTemplate obj = new CustomizeTemplate();
		obj = cservice.getTemplateListByDepartmentId(departmentId);
		 log.debug("getTemplateListByDepartmentId....."+obj);
		return obj;
	}

}
