package com.hms.pathology.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.LabPhlebotomyMaster;
import com.hms.ehat.dto.LabResultMstViewDto;
import com.hms.pathology.service.LabTestResultService;


@Controller
@RequestMapping(value ="/labresult")
public class LabTestResultController {

	@Autowired
	private LabTestResultService labTestResultService;
	
/*****************************************************************************************************
 * @author Ganesh Patil
 * @since 12-02-2020
 * @comment This method is to get 
 * @param request
 * @return
 ****************************************************************************************************/
	@RequestMapping(value = "/getAllCurrentLabTestResult", method = RequestMethod.POST)
	public @ResponseBody  LabResultMstViewDto getAllCurrentLabTestResult(@RequestParam("patientType")String patienttype,@RequestParam("callFrom") String callFrom,HttpServletRequest request){
		String count = labTestResultService.getPageCount(patienttype, callFrom);
		LabResultMstViewDto dto = labTestResultService.getAllCurrentLabTestResult(patienttype,callFrom,request);
							dto.setNoOfPages(count);
		return dto;
	}
	/*
	 * @RequestMapping(value = "/getpagecount", method = RequestMethod.GET)
	 * public @ResponseBody String getPageCount(@RequestParam("patientType")String
	 * patienttype,@RequestParam("callFrom") String callFrom){ return
	 * labTestResultService.getPageCount(patienttype,callFrom); }
	 */
	
	@RequestMapping(value = "/getLabTestResultPagination", method = RequestMethod.POST)
	public @ResponseBody
	LabResultMstViewDto getAllRecordsforPagination(@RequestParam("startIndex") Integer startIndex, @RequestParam("patientType")String patientType, @RequestParam("callFrom") String callFrom) {
		return labTestResultService.getAllRecordsforPagination(startIndex, patientType, callFrom);
	}
	
	@RequestMapping(value = "/searchlabtestresult", method = RequestMethod.GET)
	public @ResponseBody
	LabResultMstViewDto searchLabTestResult(@RequestParam("searchText") String searchText, @RequestParam("patientType")String patientType, @RequestParam("callFrom") String callFrom, @RequestParam("callFromTab") String callFromTab, 
			@RequestParam("searchBy") String searchBy, @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate) {
		return labTestResultService.searchLabTestResult(searchText, patientType, callFrom, callFromTab, searchBy, fromDate, toDate);
	}
	
	@RequestMapping(value = "/getlabtestresultbyid/{id}", method = RequestMethod.GET)
	public @ResponseBody
	LabResultMstViewDto getLabTestResultById(@PathVariable("id") Integer patientId, @RequestParam("callFromTab") String callFromTab) {
		return labTestResultService.getLabTestResultById(patientId, callFromTab);
	}
	
	@RequestMapping(value = "/searchprocessarearesult", method = RequestMethod.GET)
	public @ResponseBody
	LabPhlebotomyMaster searchProcessAreaResult(@RequestParam("searchText") String searchText, @RequestParam("patientType")String patientType, @RequestParam("callFrom") String callFrom, @RequestParam("callFromTab") String callFromTab, 
			@RequestParam("searchBy") String searchBy, @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate) {
		return labTestResultService.searchProcessAreaResult(searchText, patientType, callFrom, callFromTab, searchBy, fromDate, toDate);
	}
	
	@RequestMapping(value = "/getprocessarearesultbyid/{id}", method = RequestMethod.GET)
	public @ResponseBody
	LabPhlebotomyMaster getProcessAreaResultById(@PathVariable("id") Integer patientId, @RequestParam("callFromTab") String callFromTab) {
		return labTestResultService.getProcessAreaResultById(patientId, callFromTab);
	}
}
