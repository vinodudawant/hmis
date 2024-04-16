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

import com.hms.organdonation.dto.ClodIschemiaTimeDto;
import com.hms.organdonation.service.ClodIschemiaTimeService;

@Controller
@RequestMapping(value = "/clodIschemiaTime")
public class ClodIschemiaTimeController {
	
	static Logger log=Logger.getLogger(ClodIschemiaTimeController.class.getName());
	
	@Autowired
	private ClodIschemiaTimeDto cITdto;
	
	@Autowired
	private ClodIschemiaTimeService cITservice;
	
	@RequestMapping(value = "/saveClodIschemiaTime", method = RequestMethod.POST)
	@ResponseBody
	public int saveClodIschemiaTime(ClodIschemiaTimeDto obj,HttpServletRequest request) {
		int status = cITservice.saveClodIschemiaTime(obj, request);
		return status;
	}
	
	@RequestMapping(value = "/getAllClodIschemiaTime", method = RequestMethod.GET)
	public @ResponseBody
	ClodIschemiaTimeDto getAllClodIschemiaTime(HttpServletRequest request) {
		log.info("In ClodIschemiaTimeController getAllClodIschemiaTime()");
		List<ClodIschemiaTimeDto> lstClodIschemiaTimeDto = new ArrayList<ClodIschemiaTimeDto>();
		lstClodIschemiaTimeDto = cITservice.getAllClodIschemiaTime(request);
		cITdto.setLstClodIschemiaTimeDto(lstClodIschemiaTimeDto);
		log.debug("Response----> "+cITdto);
		return cITdto;

	}
	
	@RequestMapping(value = "/editClodIschemiaTime", method = RequestMethod.GET)
	public @ResponseBody
	ClodIschemiaTimeDto editClodIschemiaTime(@RequestParam("id") Integer clodIschemiaTimeId) {
		log.info("In ClodIschemiaTimeController editClodIschemiaTime()");
		cITdto = cITservice.editClodIschemiaTime(clodIschemiaTimeId);
		log.error("Response-----> "+cITdto);
		return cITdto;
	}	
	
	@RequestMapping(value = "/deleteClodIschemiaTime", method = RequestMethod.POST)
	public @ResponseBody
	String deleteClodIschemiaTime(@RequestParam("clodIschemiaTimeId") Integer clodIschemiaTimeId,HttpServletRequest request) {
		log.info("In ClodIschemiaTimeController deleteClodIschemiaTime()");
		System.out.println("clodIschemiaTimeId :"+clodIschemiaTimeId);
		boolean response = cITservice.deleteClodIschemiaTime(clodIschemiaTimeId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	@RequestMapping(value = "/clodIschemiaTimeAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	ClodIschemiaTimeDto clodIschemiaTimeAutoSuggestion(@RequestParam("clodIschemiaTimeName")String clodIschemiaTimeName) {
		log.info("In ClodIschemiaTimeController clodIschemiaTimeAutoSuggestion()");
		List<ClodIschemiaTimeDto> lstClodIschemiaTimeDto = new ArrayList<ClodIschemiaTimeDto>();
		lstClodIschemiaTimeDto = cITservice.clodIschemiaTimeAutoSuggestion(clodIschemiaTimeName);
		cITdto.setLstClodIschemiaTimeDto(lstClodIschemiaTimeDto);
		log.debug("Response----> "+cITdto);
		return cITdto;
	}
}
