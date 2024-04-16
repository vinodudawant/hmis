package com.hms.ehat.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.dto.LabInformationDTO;
import com.hms.ehat.service.LabInformationService;


@RestController
@RequestMapping(value = "/labinformation")
public class LabInformationController {
	
	@Autowired
	LabInformationService labInformationService;
	
	
	@RequestMapping(value = "/savelabinfo", method = RequestMethod.POST)
	public String saveLabInfo(LabInformationDTO dto, HttpServletRequest request){
		return labInformationService.saveLabInfo(dto, request);
	}
	
	@RequestMapping(value = "/getlabinfo", method = RequestMethod.GET)
	public LabInformationDTO getLabInfo(){
		return labInformationService.getLabInfo();
	}


}
