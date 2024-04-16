package com.hms.ipdbill.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ipdbill.dto.IpdGenFinalBillDTO;
import com.hms.ipdbill.dto.IpdPreviousBillDTO;
import com.hms.ipdbill.service.IpdGenAndFinalBillService;
import com.hms.ipdbill.service.IpdPreviousBillService;
@SuppressWarnings("unused")
@Controller
@RequestMapping(value = "/ipdPreviousBill")
public class IpdPreviousBillController {

	
	@Autowired
	IpdPreviousBillService ipdPreviousBillService;
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation Previous Bill Patients
	================*/

	@RequestMapping(value = "/autoSuggestationPreviousBillPatients", method = RequestMethod.POST)
	public @ResponseBody
	IpdPreviousBillDTO autoSuggestationPreviousBillPatients(@RequestParam(value = "unit_id") Integer unit_id,			
			@RequestParam(value = "findText") String findText,	@RequestParam(value = "callFrom") String callFrom,
			@RequestParam("startIndex") Integer startIndex) {
		
		List<IpdPreviousBillDTO> ltIpdPreviousBillDTO = new ArrayList<IpdPreviousBillDTO>();
		ltIpdPreviousBillDTO = ipdPreviousBillService.autoSuggestationPreviousBillPatients(unit_id, callFrom, findText, startIndex);		
		IpdPreviousBillDTO obj=new IpdPreviousBillDTO();
		Integer prevPatCount=ipdPreviousBillService.getPrevBillPatCount();
		obj.setPrevPatCount(prevPatCount);
		obj.setLstRegviewDto(ltIpdPreviousBillDTO);
		return obj;		
	}
	
}
