package com.hms.ipd.nurshing.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ipd.nurshing.dto.PatientDeathSummaryReportDTO;
import com.hms.ipd.nurshing.service.PatientDeathSummaryReportService;

@Controller
@RequestMapping(value = "/deathsummary")
public class PatientDeathSummaryReportController {

	
	@Autowired
	PatientDeathSummaryReportService pservice;
	
	@RequestMapping(value = "/savepatientdeathsummary", method = RequestMethod.POST)
	@ResponseBody
	public int savePatientDeathSummary(PatientDeathSummaryReportDTO pobj,HttpServletRequest request) {
		
		int response = pservice.savePatientDeathSummary(pobj, request);
	     

		return response;	
	}
	
	@RequestMapping(value = "/getlistOfdeathsummaryreportbytreatmentId", method = RequestMethod.GET)
	public @ResponseBody
	PatientDeathSummaryReportDTO getListOfDeathSummaryReportByTreatmentId(@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {
	

		List<PatientDeathSummaryReportDTO> lstsummary = new ArrayList<PatientDeathSummaryReportDTO>();
		lstsummary = pservice.getListOfDeathSummaryReportByTreatmentId(treatmentId);
	    
	      PatientDeathSummaryReportDTO obj = new PatientDeathSummaryReportDTO();
		obj.setLstpatientDeathSummaryReportDto(lstsummary);
		return obj;
	}
}
