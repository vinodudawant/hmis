package com.hms.patientsearch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.patientsearch.entity.PatientSearchDTO;
import com.hms.patientsearch.service.PatientSearchService;

@Controller
@RequestMapping(value="/patientSearch")
public class PatientSearchController {
	
	@Autowired
	PatientSearchService service;
	
	@ResponseBody
	@RequestMapping(value = "/getPatientAutoDetails", method = RequestMethod.POST)
	public RegistrationViewDto  getPatientAutoDetails(PatientSearchDTO obj) {
		
	  return service.getPatientAutoDetails(obj);
	}

	@RequestMapping(value = "/getPatientDetailsByLegacyUHIDNumber", method = RequestMethod.POST)
	@ResponseBody
	public PatientSearchDTO getPatientDetailsByLegacyUHIDNumber(PatientSearchDTO obj) {
		 
		
		PatientSearchDTO obj1 =service.getPatientDetailsByLegacyUHIDNumber(obj);	
		return obj1;
	}
	
}
