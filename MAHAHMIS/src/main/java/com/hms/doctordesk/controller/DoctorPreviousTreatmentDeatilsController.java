package com.hms.doctordesk.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.service.DoctorPreviousTreatmentDeatilsService;


@Controller
@RequestMapping(value="/ddPreviousTreamentDetails")
public class DoctorPreviousTreatmentDeatilsController {
	@Autowired
	DoctorPreviousTreatmentDeatilsService doctorPreviousTreatmentDeatilsService;
	
	static Logger log=Logger.getLogger(DoctorPreviousTreatmentDeatilsController.class.getName());
	
	@ResponseBody
	@RequestMapping(value="/previousPatientHeaderListTreatmentWise")
	public Doctordeskopderdto  previousPatientHeaderListTreatmentWise(@RequestParam ("tid")Integer treatmentId)
	{
		log.info("In DoctorDesk previousPatientHeaderListTreatmentWise()");
		Doctordeskopderdto obj=doctorPreviousTreatmentDeatilsService.previousPatientHeaderListTreatmentWise(treatmentId);
		log.debug("Reponse----> ");
		return obj;
	}
	
	

}
