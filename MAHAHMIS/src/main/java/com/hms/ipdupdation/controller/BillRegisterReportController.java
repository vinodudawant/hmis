package com.hms.ipdupdation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.BillRegisterReportDto;
import com.hms.ehat.dto.SpecialityWiseCountReport;
import com.hms.ehat.dto.UserEntryLogReportDto;
import com.hms.ipdupdation.service.BillRegisterReportService;


@Controller
@RequestMapping(value = "/billregisterreport")
public class BillRegisterReportController {

	
	@Autowired
	BillRegisterReportService  service;

	@RequestMapping(value = "/fetchbillRegister", method = RequestMethod.POST)
	public @ResponseBody
	BillRegisterReportDto fetchbillRegister(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		
		BillRegisterReportDto obj = service.fetchIpdPatientsRecords(unitId, userId, fromDate, toDate, callFrom);	
	
				
		return obj;		
	}
	
	@RequestMapping(value = "/getUserEntryLogReport", method = RequestMethod.POST)
	public @ResponseBody
	List<UserEntryLogReportDto> getUserEntryLogReport(
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<UserEntryLogReportDto> userEntryInstance = service.getUserEntryLogReport(unitId, fromDate, toDate);	
		return userEntryInstance;		
	}
	
	@RequestMapping(value = "/getSpecialityWiseReport", method = RequestMethod.POST)
	public @ResponseBody
	List<SpecialityWiseCountReport> getSpecialityWiseReport(
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "CallFrom") String CallFrom) {
		
		List<SpecialityWiseCountReport> userEntryInstance = service.getSpecialityWiseReport(unitId, fromDate, toDate, CallFrom);	
		return userEntryInstance;		
	}
	
	
	@RequestMapping(value = "/getLabBillRegisterReport", method = RequestMethod.POST)
	public @ResponseBody
	BillRegisterReportDto getLabBillRegisterReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		
		BillRegisterReportDto obj = service.getLabBillRegisterReport(unitId, userId, fromDate, toDate, callFrom);	
	
				
		return obj;		
	}
	
	@RequestMapping(value = "/setDistributeAmountForLab", method = RequestMethod.POST)
	public @ResponseBody
	int setDistributeAmountForLab(
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "departmentId") Integer departmentId) {		
		
		int result = service.setDistributeAmountForLab(fromDate, toDate,departmentId);					
		return result;		
	}
	

}
