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

import com.hms.doctordesk.dto.FollowupDto;

import com.hms.doctordesk.service.FollowupService;


@RestController
@RequestMapping(value="/followup")
public class FollowupController {
	@Autowired
	FollowupService followupService;
	
	static Logger log=Logger.getLogger(FollowupController.class.getName());
	
	@RequestMapping(value = "/saveFollowup", method = RequestMethod.POST)
	public int saveFollowup(FollowupDto follow, HttpServletRequest request) {
		log.info("In FollowupController saveFollowup()");
		String msg = "";
		int response = followupService.saveFollowup(follow, request);
		log.debug("Reponse----> "+response);
		return response;
	}
	@RequestMapping(value = "/getFollowup", method = RequestMethod.GET)
	public @ResponseBody
	FollowupDto getFollowup(@RequestParam("tid") int treatmentId,HttpServletRequest request) {
		log.info("In FollowupController getFollowup()");
		List<FollowupDto> lstFollowup = new ArrayList<FollowupDto>();
		lstFollowup = followupService.getFollowup(treatmentId);
		FollowupDto obj = new FollowupDto();
		obj.setLstFollowUp(lstFollowup);
		log.debug("Response----> "+obj);
		return obj;
	}	
	

}
