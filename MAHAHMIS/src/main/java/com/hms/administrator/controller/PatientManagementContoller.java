package com.hms.administrator.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.service.PatientManagementService;
import com.hms.dto.PatientTitle;
import com.hms.dto.SymptomsDetailsComp;

@RestController
@RequestMapping(value = "/admin")
public class PatientManagementContoller {

	@Autowired
	private PatientManagementService patientManagementService;
	
	
	public PatientManagementContoller() {
	
	}

	@RequestMapping(value = "/savepatienttitle", method = RequestMethod.POST)
	public String savePatientTitle(PatientTitle patientTitle, HttpServletRequest request){
		return patientManagementService.savePatientTitle(patientTitle, request);
	}
	
	@RequestMapping(value = "/getallpatienttitles", method = RequestMethod.GET)
	public PatientTitle getAllPatientTitles(){
		return patientManagementService.getAllPatientTitles();
	}
	
	@RequestMapping(value = "/editpatientTitle/{id}", method = RequestMethod.GET)
	public PatientTitle getTitleById(@PathVariable("id") Integer patientTitleId){
		return patientManagementService.getTitleById(patientTitleId);
	}
	
	@RequestMapping(value = "/deletepatienttitle/{ptid}", method = RequestMethod.DELETE)
	public boolean deletePatientTitle(@PathVariable("ptid") int patientTitleId, HttpServletRequest request){
		return patientManagementService.deletePatientTitle(patientTitleId, request);
	}
	
	
	@RequestMapping(value = "/savesymptomdetails", method = RequestMethod.POST)
	public String saveSymptomDetails(@RequestParam("specializationId") int specializationId, @RequestParam("objSKC") String symptomDetailsString, HttpServletRequest request){
		return patientManagementService.saveSymptomDetails(specializationId, symptomDetailsString, request);
	}
	
	@RequestMapping(value = "/getsymptomdetails", method = RequestMethod.GET)
	public SymptomsDetailsComp getSymptomDetails(@RequestParam("hospitalSpecializationId") int specializationId){
		List<SymptomsDetailsComp> list = patientManagementService.getSymptomDetails(specializationId);
		SymptomsDetailsComp dto = new SymptomsDetailsComp();
						   dto.setSymptomsMasterList(list);
		return dto;
	}
	
	@RequestMapping(value = "/deletesymptomdetail/{ids}", method = RequestMethod.DELETE)
	public boolean deleteSymptomDetails(@PathVariable("ids") int[] symptomDetailIds, HttpServletRequest request){
		return patientManagementService.removeSymptomDetails(symptomDetailIds, request);
	}
}