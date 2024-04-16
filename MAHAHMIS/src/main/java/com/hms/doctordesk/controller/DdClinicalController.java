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

import com.hms.doctordesk.dto.DdClinicalDto;
import com.hms.doctordesk.service.DdClinicalService;

@RestController
@RequestMapping(value="/dd_clinical_master")
public class DdClinicalController {
	static Logger log=Logger.getLogger(DdClinicalController.class.getName());
	
	@Autowired
	DdClinicalService ddClinicalService;
	
	static {
		System.out.println("DdClinicalController Loaded...!");
	}
	@RequestMapping(value = "/fetchClinical", method = RequestMethod.GET)
	public @ResponseBody
	DdClinicalDto fetchClinical(@RequestParam("tid") int treatmentId,HttpServletRequest request) {
		log.info("In DdClinicalController fetchClinical()");
		List<DdClinicalDto> lstClinicalMaster = new ArrayList<DdClinicalDto>();
		lstClinicalMaster = ddClinicalService.fetchClinical(treatmentId);
		DdClinicalDto obj = new DdClinicalDto();
		obj.setLstDdClinicalMaster(lstClinicalMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/saveClinical", method = RequestMethod.POST)
	@ResponseBody	
	public synchronized int saveClinical(@RequestParam("clinicalDetails") String clinicalDetails,HttpServletRequest request) {
		int response = ddClinicalService.saveClinical(clinicalDetails, request);
		return response;
	}
	@RequestMapping(value = "/deleteDDClinical", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDDClinical(@RequestParam("clinicalid") Integer clinicalid,HttpServletRequest request) {
		log.info("In DdClinicalController deleteDDClinical()");
		System.out.println("clinicalid :"+clinicalid);
		boolean response = ddClinicalService.deleteDDClinical(clinicalid, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} /*else {
			msg = "Network issue";
		}*/
		log.debug("Response---> "+msg);
		return msg;
	}	
}
