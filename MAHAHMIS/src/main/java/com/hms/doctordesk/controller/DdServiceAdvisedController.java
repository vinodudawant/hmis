package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.hms.doctordesk.dto.DdServiceAdvisedDto;
import com.hms.doctordesk.service.DdServiceAdvisedService;
import com.hms.dto.Doctor;


@RestController
@RequestMapping(value="/dd_service_advised")
public class DdServiceAdvisedController {
static Logger log=Logger.getLogger(DdServiceAdvisedController.class.getName());
	
	@Autowired
	DdServiceAdvisedService ddServiceAdvisedService;
	
	static {
		System.out.println("DdServiceAdvisedController Loaded...!");
	}

	@RequestMapping(value = "/fetchDoctor", method = RequestMethod.POST)
	public @ResponseBody
	Doctor fetchDoctor(HttpServletRequest request) {
		log.info("In DdServiceAdvisedController fetchDoctor()");
		List<Doctor> listDoctorDetails = new ArrayList<Doctor>();
		listDoctorDetails = ddServiceAdvisedService.fetchDoctor();
		System.err.println(listDoctorDetails);
		Doctor obj = new Doctor();
		obj.setListDoctor(listDoctorDetails);
		log.debug("Response----> "+obj);
		return obj;
	}	
	@RequestMapping(value = "/saveService", method = RequestMethod.POST)
	public int saveService(DdServiceAdvisedDto service, HttpServletRequest request) {
		log.info("In DdServiceAdvisedController saveService()");
		int response = ddServiceAdvisedService.saveHistory(service, request);
		log.debug("Response--------> "+response);
		return response;
	}
	@RequestMapping(value = "/fetchService", method = RequestMethod.GET)
	public @ResponseBody
	DdServiceAdvisedDto fetchService(HttpServletRequest request) {
		log.info("In DdServiceAdvisedController fetchService()");
		List<DdServiceAdvisedDto> lstServiceMaster = new ArrayList<DdServiceAdvisedDto>();
		lstServiceMaster = ddServiceAdvisedService.fetchService();
		DdServiceAdvisedDto obj = new DdServiceAdvisedDto();
		obj.setLstddServiceList(lstServiceMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	
}
