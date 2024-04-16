package com.hms.pathology.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.pathology.service.UpdateDuplicateProfileService;

@Controller
@RequestMapping(value = "/pathologyupdateprofile")
public class UpdateDuplicateProfileController {
	
	@Autowired
	UpdateDuplicateProfileService service;
	
	@RequestMapping(value = "/updateDuplicateProfileIds", method = RequestMethod.POST)
	@ResponseBody	
	public int updateDuplicateProfileIds(@RequestParam("treatmentID") Integer treatmentID, HttpServletRequest request) {
		
		int res=service.updateDuplicateProfileIds(treatmentID);
		return res;
	}
	

}
