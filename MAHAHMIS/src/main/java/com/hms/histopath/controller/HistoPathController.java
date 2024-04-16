package com.hms.histopath.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.histopath.dto.HistopathMaster;
import com.hms.histopath.service.HistoPathService;

@RestController
@RequestMapping(value = "/histopath")
public class HistoPathController {
	static Logger log=Logger.getLogger(HistoPathController.class.getName());
	
	@Autowired
	HistoPathService histoPathService;
	
	
	@RequestMapping(value = "/searchHistopathTestPatient", method = RequestMethod.GET)
	public HistopathMaster searchHistopathTestPatient(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
			 @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
			 @RequestParam("searchBy") String searchBy, 
			 @RequestParam("startIndex") Integer startIndex, 
			 @RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("patientType") Integer patientType, 
			 @RequestParam("searchTypeby") String searchTypeby,
			 @RequestParam("statuscodea") Integer statuscodea, @RequestParam("statuscodeb") Integer statuscodeb,
			 @RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		
		HistopathMaster obj =new HistopathMaster();
		String rowCount = histoPathService.getSearchRecordCount(custTypeId, custNameId, fromDate, toDate,  searchBy,startIndex,   emergencyFlag,patientType,searchTypeby,statuscodea,statuscodeb,callFrom, request);
		List<HistopathMaster> list = histoPathService.searchHistopathTestPatient(custTypeId, custNameId, fromDate, toDate,  searchBy,startIndex,   emergencyFlag,patientType,searchTypeby,statuscodea,statuscodeb,callFrom, request);
		obj.setLstHistoPathol(list);
		obj.setRowCount(rowCount);
		return obj;
	}
	
	/**************************************************************************
	* @author Amol
	* @since 17-05-2020
	* @comment This method is to Auto-Suggest the patient record.
	* @param request
	* @return
	****************************************************************************/
	@RequestMapping(value = "/histopathopatientautosuggestion", method = RequestMethod.GET)
	public HistopathMaster histoPathoPatientAutosuggestion(@RequestParam("searchText") String searchText, @RequestParam("searchBy") String searchBy, 
																				   @RequestParam("callFrom") String callFrom, @RequestParam("tabId") String tabId, 
																				   @RequestParam("emergencyFlag") String emergencyFlag,
																				   @RequestParam("statuscodeA") Integer statuscodeA, @RequestParam("statuscodeB")Integer statuscodeB,HttpServletRequest request) {
		List<HistopathMaster> listsample=new ArrayList<HistopathMaster>();
		log.info("histopathopatientautosuggestion()...start");
		listsample = histoPathService.histoPathoPatientAutosuggestion(searchText, searchBy, callFrom, tabId, emergencyFlag,statuscodeA,statuscodeB,request);
		log.info("histopathopatientautosuggestion()...end");
		HistopathMaster obj =new HistopathMaster();
		obj.setLstHistoPathol(listsample);
		return obj;
	}
	/**************************************************************************
	* @author Amol
	* @since 12-03-2021
	* @comment This method is to Auto-Suggest the patient record.
	* @param request
	* @return
	****************************************************************************/
	@RequestMapping(value = "/getHistopathResultById/{id}", method = RequestMethod.GET)
	public HistopathMaster getHistopathResultById(@PathVariable("id") Integer patientId, @RequestParam("callFromTab") String callFromTab,HttpServletRequest request) {
		return histoPathService.getHistopathResultById(patientId, callFromTab, request);
	}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 13_May_2020 
	 * @Code Update histo status flag.
	 ******************************************************************************/
		
	@RequestMapping(value = "/updateHistoStatus", method = RequestMethod.POST)
	public @ResponseBody String updateHistoStatus( 
			 @RequestParam("histopathMasterId") Integer histopathMasterId, @RequestParam("statusCode") Integer statusCode, HttpServletRequest request
			 ) {
	 
	log.info("updateHistoStatus..");
	String result = histoPathService.updateHistoStatus(histopathMasterId,statusCode,request);
	log.debug("updateHistoStatus" + result);
	return result;
}	
	@RequestMapping(value = "/paginationonsearch", method = RequestMethod.GET)
	public HistopathMaster paginationOnSearch(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
			 @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
			 @RequestParam("searchBy") String searchBy, 
			 @RequestParam("startIndex") Integer startIndex, 
			 @RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("patientType") Integer patientType, 
			 @RequestParam("searchTypeby") String searchTypeby,
			 @RequestParam("statuscodea") Integer statuscodea, @RequestParam("statuscodeb") Integer statuscodeb,
			 @RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		List<HistopathMaster> listsample=new ArrayList<HistopathMaster>();
		log.info("paginationOnSearch()...start");
		listsample = histoPathService.searchHistopathTestPatient(custTypeId, custNameId, fromDate, toDate,  searchBy,startIndex,   emergencyFlag,patientType,searchTypeby,statuscodea,statuscodeb,callFrom, request);
		log.info("paginationOnSearch()...end");
		HistopathMaster obj =new HistopathMaster();
		obj.setLstHistoPathol(listsample);
		return obj;
	}
	

}
