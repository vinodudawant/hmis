package com.hms.ipdupdation.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ipdupdation.service.IpdUpdationReportService;

@Controller
@RequestMapping(value = "/ipdupdationreport")
public class IpdUpdationReportController {
	
	@Autowired
	IpdUpdationReportService service;

	@RequestMapping(value = "/fetchIpdPatientsRecords", method = RequestMethod.POST)
	public @ResponseBody
	RegTreBillDto fetchIpdPatientsRecords(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = service.fetchIpdPatientsRecords(unitId,userId,fromDate,toDate,callFrom);		
		RegTreBillDto obj=new RegTreBillDto();
		obj.setListRegTreBillDto(ltRegMasterDto);			
		return obj;		
	}
	 
}
