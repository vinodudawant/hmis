package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.doctordesk.dto.GroupInstructionMaster;
import com.hms.doctordesk.service.PreviousTreatmentService;
import com.hms.dto.Treatment;

@RestController
@RequestMapping("/previousTreatemnt")
public class PreviousTreatmentController {
	
	@Autowired
	PreviousTreatmentService previousTreatmentService;
	
	@RequestMapping(value = "/setPrevPresciptionToCurrent", method = RequestMethod.POST)
	@ResponseBody
	public int setPrevPresciptionToCurrent(HttpServletRequest request) {
		Integer userId = 1;
		
		Integer patId = Integer.parseInt(request.getParameter("patId"));
		Integer prev = Integer.parseInt(request.getParameter("prev"));
		Integer current = Integer.parseInt(request.getParameter("current"));
		
		int response = previousTreatmentService.setPrevPresciptionToCurrent(userId, patId, prev,
				 current, request);
		return response;

	}
	
	@RequestMapping(value = "/fetchPreviousTreatmentsByTreatmentID", method = RequestMethod.POST)
	@ResponseBody
	public	Treatment fetchPreviousTreatmentsByTreatmentIDIVF(@RequestParam("treatmentId") Integer treatmentId,	HttpServletRequest request) {
		List<Treatment> lstTreatdetails = new ArrayList<Treatment>();
		lstTreatdetails = previousTreatmentService.fetchPreviousTreatmentsByTreatmentID(treatmentId,request);
		Treatment obj = new Treatment();
		obj.setLitreatment(lstTreatdetails);
		return obj;
	}
	
	@RequestMapping(value = "/setPreviousDataToCurrentTreatment", method = RequestMethod.POST)
	@ResponseBody
	public int setPreviousDataToCurrentTreatment(HttpServletRequest request) {
		Integer userId = 1;
		
		Integer patId = Integer.parseInt(request.getParameter("patId"));
		Integer prev = Integer.parseInt(request.getParameter("prev"));
		Integer current = Integer.parseInt(request.getParameter("current"));
		
		int response = previousTreatmentService.setPreviousDataToCurrentTreatment(userId, patId, prev,
				 current, request);
		return response;

	}

}
