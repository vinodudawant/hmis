package com.hms.ipdbill.controller;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ipdbill.dto.BillComparisonDto;
import com.hms.ipdbill.service.IpdBillComparisonService;
@SuppressWarnings("unused")
@Controller
@RequestMapping(value = "/ipdBillComparison")
public class IpdBillComparisonController {


	private static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	static {
		System.out.println("IpdBillComparisonController is Loaded...!");
	}
	
	@Autowired
	IpdBillComparisonService ipdBillComparisonService;
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation for Ipd Bill Comparison
	================*/

	@RequestMapping(value = "/ipdBillComparison", method = RequestMethod.POST)
	public @ResponseBody
	BillComparisonDto ipdBillComparison(@RequestParam(value = "unit_id") Integer unit_id,			
			@RequestParam(value = "findText") String findText,	@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "wardType") Integer wardType, @RequestParam(value = "wardName") Integer wardName) {
		
		List<BillComparisonDto> ltBillComparisonDto = new ArrayList<BillComparisonDto>();
		ltBillComparisonDto = ipdBillComparisonService.ipdBillComparison(unit_id, callFrom, findText,wardType,wardName);		
		BillComparisonDto obj=new BillComparisonDto();
		obj.setLstIpdbillPatients(ltBillComparisonDto);
		return obj;		
	}
	

}
