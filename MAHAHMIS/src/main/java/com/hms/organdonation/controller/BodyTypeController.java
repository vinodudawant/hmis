package com.hms.organdonation.controller;

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

import com.hms.organdonation.dto.BodyTypeDto;
import com.hms.organdonation.service.BodyTypeService;

@Controller
@RequestMapping(value = "/bodyType")
public class BodyTypeController {
	
	static Logger log=Logger.getLogger(BodyTypeController.class.getName());
	
	@Autowired
	private BodyTypeDto bodytypedto;
	
	@Autowired
	private BodyTypeService bodytypeservice;
	
	@RequestMapping(value = "/saveBodyType", method = RequestMethod.POST)
	@ResponseBody
	public int saveBodyType(BodyTypeDto obj,HttpServletRequest request) {
		int status = bodytypeservice.saveBodyType(obj, request);
		return status;
	}
	
	@RequestMapping(value = "/getAllBodyType", method = RequestMethod.GET)
	public @ResponseBody
	BodyTypeDto getAllBodyType(HttpServletRequest request) {
		log.info("In BodyTypeController getAllBodyType()");
		List<BodyTypeDto> lstBodyTypeDto = new ArrayList<BodyTypeDto>();
		lstBodyTypeDto = bodytypeservice.getAllBodyType(request);
		bodytypedto.setLstBodyTypeDto(lstBodyTypeDto);
		log.debug("Response----> "+bodytypedto);
		return bodytypedto;
	}	
	
	@RequestMapping(value = "/editBodyType", method = RequestMethod.GET)
	public @ResponseBody
	BodyTypeDto editBodyType(@RequestParam("id") Integer bodyTypeId) {
		log.info("In BodyTypeController editBodyType()");
		bodytypedto = bodytypeservice.editBodyType(bodyTypeId);
		log.error("Response-----> "+bodytypedto);
		return bodytypedto;
	}
	
	@RequestMapping(value = "/deleteBodyType", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBodyType(@RequestParam("bodyTypeId") Integer bodyTypeId,HttpServletRequest request) {
		log.info("In BodyTypeController deleteBodyTypes()");
		System.out.println("bodyTypeId :"+bodyTypeId);
		boolean response = bodytypeservice.deleteBodyType(bodyTypeId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	
	@RequestMapping(value = "/bodyTypeAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	BodyTypeDto bodyTypeAutoSuggestion(@RequestParam("bodyTypeName")String bodyTypeName) {
		log.info("In BodyTypeController bodyTypeAutoSuggestion()");
		List<BodyTypeDto> lstBodyTypeDto = new ArrayList<BodyTypeDto>();
		lstBodyTypeDto = bodytypeservice.bodyTypeAutoSuggestion(bodyTypeName);
		bodytypedto.setLstBodyTypeDto(lstBodyTypeDto);
		log.debug("Response----> "+bodytypedto);
		return bodytypedto;
	}
}
