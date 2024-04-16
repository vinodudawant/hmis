package com.hms.pathology.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.ResourceBundle;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.HospitalDetails;
import com.hms.administrator.dto.LabPatchDto;
import com.hms.api.controller.WhatsAppApi;
import com.hms.dto.Doctor;
import com.hms.ehat.controller.RegistrationController;
import com.hms.pathology.dto.PathologySampleTransferDto;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.service.PathologySearchService;
import com.hms.pathology.service.Phlebotomyservice;

@RestController
@RequestMapping(value = "/pathologysearch")
public class PathologySearchController {

	static Logger log=Logger.getLogger(PathologySearchController.class.getName());
	
	@Autowired
	PathologySearchService pathologySearchService;

	@Autowired
	Phlebotomyservice phlebotomyService;
	
	/**************************************************************************
	* @author Akshay Mache
	* @since 05-03-2020
	* @comment This method is to Auto-Suggest the patient record.
	* @param request
	* @return
	****************************************************************************/
	@RequestMapping(value = "/phelbotomypatientautosuggestion", method = RequestMethod.GET)
	public PathologySampleWiseMaster phelbotomyPatientAutoSuggestion(@RequestParam("searchText") String searchText, @RequestParam("searchBy") String searchBy, 
																				   @RequestParam("callFrom") String callFrom, @RequestParam("tabId") String tabId, 
																				   @RequestParam("emergencyFlag") String emergencyFlag, HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("phelbotomyPatientAutoSuggestion()...start");
		listsample = pathologySearchService.phelbotomyPatientAutoSuggestion(searchText, searchBy, callFrom, tabId, emergencyFlag, request);
		log.info("phelbotomyPatientAutoSuggestion()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}

	/**************************************************************************
	 * @author Akshay Mache
	 * @since 05-03-2020
	 * @comment This method is to get patient record by Id.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/getpatientbyid", method = RequestMethod.GET)
	public PathologySampleWiseMaster getPatientById(@RequestParam("id") Integer patientId, @RequestParam("callFrom") String callFrom, 
																  @RequestParam("tabId") String tabId, @RequestParam("emergencyFlag") String emergencyFlag, 
																  HttpServletRequest request){
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("getPatientById()...start");
		listsample = pathologySearchService.getPatientById(patientId, callFrom, tabId, emergencyFlag, request);
		log.info("getPatientById()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		
		return obj;
	}
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 05-03-2020
	 * @comment This method is to search patient records with different criteria.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/searchlabtestpatient", method = RequestMethod.GET)
	public PathologySampleWiseMaster searchLabTestPatient(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
																		@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
																		@RequestParam("callFrom") String callFrom, @RequestParam("searchBy") String searchBy, 
																		@RequestParam("tabId") String tabId, @RequestParam("startIndex") Integer startIndex, 
																		 @RequestParam("emergencyFlag") String emergencyFlag, HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("searchLabTestPatient()...start");
		String rowCount = pathologySearchService.getSearchRecordCount(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, emergencyFlag, request);
		listsample = pathologySearchService.searchLabTestPatient(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, startIndex, emergencyFlag, request);
		log.info("searchLabTestPatient()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		obj.setRowCount(rowCount);
		return obj;
	}
	
	@RequestMapping(value = "/getProcessingCount", method = RequestMethod.GET)
	public String getProcessingCount(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
																		@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
																		@RequestParam("callFrom") String callFrom, @RequestParam("searchBy") String searchBy, 
																		@RequestParam("tabId") String tabId, @RequestParam("startIndex") Integer startIndex, 
																		 @RequestParam("emergencyFlag") String emergencyFlag, HttpServletRequest request) {
		log.info("searchLabTestPatient()...start");
		String rowCount = pathologySearchService.getSearchRecordCount(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, emergencyFlag, request);
		return rowCount;
	}
	
	/**************************************************************************
	* @author Akshay Mache
	* @since 05-03-2020
	* @comment This method is pagination purpose.
	* @param request
	* @return
	****************************************************************************/
	@RequestMapping(value = "/getphlebotomypagination", method = RequestMethod.GET)
	public PathologySampleWiseMaster getPhlebotomyPagination(@RequestParam("callFrom") String callFrom, @RequestParam("startIndex") Integer startIndex,
																			@RequestParam("emergencyFlag") String emergencyFlag, HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("getPhlebotomyPagination()...start");
		listsample = pathologySearchService.getPhlebotomyPagination(callFrom, startIndex, emergencyFlag, request);
		log.info("getPhlebotomyPagination()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}

	/**************************************************************************
	 * @author Akshay Mache
	 * @since 05-03-2020
	 * @comment This method is used to get PARTIAL, COLLECTION, OPEN records count.
	 * @param request
	 * @return
	 ****************************************************************************/
	@RequestMapping(value = "/getRecordCount", method = RequestMethod.GET)
	public String getRecordCount(HttpServletRequest request) {
		log.info("getRecordCount()...start");
		String count = pathologySearchService.getRecordCount(request);
		log.info("getRecordCount()...end");
		return count;
	}
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 12-03-2020
	 * @comment This method used to get status of patient inside Accession Track
	 *          Status Report.
	 * @param request
	 * @return
	 ****************************************************************************/
	@RequestMapping(value = "/getstatus/{masterId}", method = RequestMethod.GET)
	public PathologySampleWiseMaster getStatus(@PathVariable("masterId") String masterId,
			HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();
		log.info("getStatus()...start");
		listsample = pathologySearchService.getStatus(masterId, request);
		log.info("getStatus()...end");
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}
	    
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 05-03-2020
	 * @comment This method is used to get Recollection BtoB and BtoC records count.
	 * @param request
	 * @return
	 ****************************************************************************/
	@RequestMapping(value = "/getRecollectionRecordCount", method = RequestMethod.POST)
	public String getRecollectionRecordCount(@RequestParam("callform") String callform,
			HttpServletRequest request) {
		log.info("getRecollectionRecordCount()...start");
		String count = pathologySearchService.getRecollectionRecordCount(callform, request);
		log.info("getRecollectionRecordCount()...end");
		return count;
	}
	
	/**************************************************************************
	* @author Ajay Khandare
	* @since 17-06-2020
	* @comment This method is to get the patient record by patientId.
	****************************************************************************/
	@RequestMapping(value = "/searchDateWiseOutSourced", method = RequestMethod.GET)
	public PathologySampleWiseMaster searchDateWiseOutSourced(@RequestParam("outSourceType") Integer outSourceType, @RequestParam("outSourceTypeId") Integer outSourceTypeId,
			@RequestParam("tabId") String tabId, @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
			@RequestParam("startIndex") Integer startIndex, @RequestParam("searchBy") String searchBy, String emergencyFlag, HttpServletRequest request){
		
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("getOutSourceTypeById()...start");
		String rowCount = pathologySearchService.getForcedOutsourceSearchRecordCount(outSourceType, outSourceTypeId, fromDate, toDate, tabId, searchBy, emergencyFlag, request);
		listsample = pathologySearchService.searchDateWiseOutSourced(outSourceType, outSourceTypeId, tabId, fromDate, toDate, startIndex, searchBy, emergencyFlag, request);
		log.info("getOutSourceTypeById()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		obj.setRowCount(rowCount);
		return obj;
	}
	
	/**************************************************************************
	* @author Akshay Mache
	* @since 05-03-2020
	* @comment This method is pagination purpose.
	* @param request
	* @return
	****************************************************************************/
	@RequestMapping(value = "/getoutsourcepagination", method = RequestMethod.GET)
	public PathologySampleWiseMaster getOutSourcePagination(@RequestParam("callFrom") String callFrom, @RequestParam("startIndex") Integer startIndex,
																			@RequestParam("emergencyFlag") String emergencyFlag, HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("getOutSourcePagination()...start");
		listsample = pathologySearchService.getOutSourcePagination(callFrom, startIndex, emergencyFlag, request);
		log.info("getOutSourcePagination()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}

	/**************************************************************************
	 * @author Akshay Mache
	 * @since 25-06-2020
	 * @comment This method is for pagination on search functionality.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/paginationonsearch", method = RequestMethod.GET)
	public PathologySampleWiseMaster paginationOnSearch(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
																		@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
																		@RequestParam("callFrom") String callFrom, @RequestParam("searchBy") String searchBy, 
																		@RequestParam("tabId") String tabId, @RequestParam("startIndex") Integer startIndex, 
																		String emergencyFlag, HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("paginationOnSearch()...start");
		listsample = pathologySearchService.searchLabTestPatient(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, startIndex, emergencyFlag, request);
		log.info("paginationOnSearch()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}
	
	/**************************************************************************
	* @author  Akshay Mache
	* @since 16-07-2020
	* @comment This method is for outsource pagination on search functionality.
	****************************************************************************/
	@RequestMapping(value = "/outsourcepaginationonsearch", method = RequestMethod.GET)
	public PathologySampleWiseMaster outSourcePaginationOnSearch(@RequestParam("outSourceType") Integer outSourceType, @RequestParam("outSourceTypeId") Integer outSourceTypeId,
			@RequestParam("tabId") String tabId, @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
			@RequestParam("startIndex") Integer startIndex, @RequestParam("searchBy") String searchBy, String emergencyFlag, HttpServletRequest request){
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("outSourcePaginationOnSearch()...start");
		listsample = pathologySearchService.searchDateWiseOutSourced(outSourceType, outSourceTypeId, tabId, fromDate, toDate, startIndex, searchBy, emergencyFlag, request);
		log.info("outSourcePaginationOnSearch()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}

	/********************************************************************
	 * @author Akshay Mache
	 * @since 24-07-2020
	 * @comment This method is to get Outsource Record List for exporting as pdf.
	 * @param request
	 **********************************************************************/
	@RequestMapping(value = "/getOutsourceRecords", method = RequestMethod.POST)
	public List<PathologySampleWiseMaster> getOutsourceRecords(String callFrom, HttpServletRequest request) {
		log.info("getOutsourceRecords()...start");
		List<PathologySampleWiseMaster> listsample = pathologySearchService.getOutsourceRecords(callFrom, request);
		log.info("getOutsourceRecords()...end");
		return listsample;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 01-09-2020
	  * @comment This method is to get b2b collection, collected and rejected samples.
	  * @param request 
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/getB2BCollectionsRecords", method = RequestMethod.POST)
	public PathologySampleWiseMaster getB2BCollectionsRecords(@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("startIndex") Integer startIndex, 
															@RequestParam("testStatus") String testStatus, @RequestParam("unitId") Integer unitId, 
															@RequestParam("userType") String userType, @RequestParam("userId") Integer userId,
															@RequestParam("userCustomerType") String userCustomerType, @RequestParam("userCustomerId") String userCustomerId) {
		
		log.info("getB2BCollectionsRecords()...start");
		String rowCount = pathologySearchService.getPageCount(emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
				
		List<PathologySampleWiseMaster> listsample = pathologySearchService.getB2BCollectionsRecords(emergencyFlag, startIndex, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setLabSampleWiseMasterDtoList(listsample);
				obj.setRowCount(rowCount);
		log.info("getB2BCollectionsRecords()...end");
		return obj;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 01-09-2020
	  * @comment This method is to collect B2B Sample.
	  * @param request
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/collectB2BSample", method = RequestMethod.POST)
	public boolean collectB2BSample(@RequestParam("masterIds") String masterIds,  @RequestParam("testStatus") String testStatus, 
			@RequestParam("barcode") String barcode, @RequestParam("unitId") Integer unitId, @RequestParam("userId") String userId) {
		
		log.info("collectB2BSample()...start");
		boolean result = pathologySearchService.collectB2BSample(masterIds, testStatus, barcode, unitId, userId);
		log.info("collectB2BSample()...end");
		return result;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 01-09-2020
	  * @comment This method is to collect B2B Sample.
	  * @param request
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/submitB2BSample", method = RequestMethod.POST)
	public boolean submitB2BSample(@RequestParam("masterIds") String masterIds, @RequestParam("testStatus") String testStatus, 
			@RequestParam("unitId") Integer unitId, @RequestParam("userId") String userId) {
		
		log.info("submitB2BSample()...start");
		boolean result = pathologySearchService.submitB2BSample(masterIds, testStatus, unitId, userId);
		log.info("submitB2BSample()...end");
		return result;
	}
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 01-09-2020
	 * @comment This method is to search b2b patients with different criteria.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/searchB2BRecords", method = RequestMethod.GET)
	public PathologySampleWiseMaster searchB2BRecords(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
													  	@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
														@RequestParam("searchBy") String searchBy, @RequestParam("startIndex") Integer startIndex, 
														@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("testStatus") String testStatus,
														@RequestParam("unitId") Integer unitId, @RequestParam("userId") Integer userId, @RequestParam("userType") String userType) {
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("searchB2BRecords()...start");
		String rowCount = pathologySearchService.getB2BSearchRecordCount(custTypeId, custNameId, fromDate, toDate, searchBy, emergencyFlag, testStatus, unitId, userType, userId);
		listsample = pathologySearchService.searchB2BRecords(custTypeId, custNameId, fromDate, toDate, searchBy, startIndex, emergencyFlag, testStatus, unitId, userType, userId);
		log.info("searchB2BRecords()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		obj.setRowCount(rowCount);
		return obj;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 02-09-2020
	  * @comment This method is for b2b patients pagination.
	  * @param request
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/getB2BPagination", method = RequestMethod.POST)
	public PathologySampleWiseMaster getB2BPagination(@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("startIndex") Integer startIndex, 
													@RequestParam("testStatus") String testStatus, @RequestParam("unitId") Integer unitId, 
													@RequestParam("userType") String userType, @RequestParam("userId") Integer userId, @RequestParam("userCustomerType") String userCustomerType, 
													@RequestParam("userCustomerId") String userCustomerId) {
		
		log.info("getB2BPagination()...start");
		List<PathologySampleWiseMaster> listsample = pathologySearchService.getB2BCollectionsRecords(emergencyFlag, startIndex, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setLabSampleWiseMasterDtoList(listsample);
		log.info("getB2BPagination()...end");
		return obj;
	}
	
	/**************************************************************************
	* @author Akshay Mache
	* @since 02-09-2020
	* @comment This method is to Auto-Suggest the b2b patients.
	* @param request
	* @return
	****************************************************************************/
	@RequestMapping(value = "/b2BPatientAutoSuggestion", method = RequestMethod.GET)
	public PathologySampleWiseMaster b2BPatientAutoSuggestion(@RequestParam("searchText") String searchText, @RequestParam("searchBy") String searchBy, 
															@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("testStatus") String testStatus,
															@RequestParam("unitId") Integer unitId,	@RequestParam("userType") String userType, @RequestParam("userId") Integer userId, 
															@RequestParam("userCustomerType") String userCustomerType, @RequestParam("userCustomerId") String userCustomerId)
	{
		
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("b2BPatientAutoSuggestion()...start");
		listsample = pathologySearchService.b2BPatientAutoSuggestion(searchText, searchBy, emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
		log.info("b2BPatientAutoSuggestion()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}

	/**************************************************************************
	 * @author Akshay Mache
	 * @since 02-09-2020
	 * @comment This method is to get patients by Id.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/getB2BPatientById", method = RequestMethod.GET)
	public PathologySampleWiseMaster getB2BPatientById(@RequestParam("id") Integer patientId, @RequestParam("emergencyFlag") String emergencyFlag, 
														@RequestParam("testStatus") String testStatus, @RequestParam("unitId") Integer unitId,	
														@RequestParam("userType") String userType, @RequestParam("userCustomerType") String userCustomerType, 
														@RequestParam("userCustomerId") String userCustomerId, @RequestParam("userId") Integer userId){
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("getB2BPatientById()...start");
		listsample = pathologySearchService.getB2BPatientById(patientId, emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
		log.info("getB2BPatientById()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 02-09-2020
	 * @comment This method is for patients pagination after search.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/b2BPaginationOnSearch", method = RequestMethod.GET)
	public PathologySampleWiseMaster b2BPaginationOnSearch(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
													  	@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
														@RequestParam("searchBy") String searchBy, @RequestParam("startIndex") Integer startIndex, 
														@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("testStatus") String testStatus,
														@RequestParam("unitId") Integer unitId, @RequestParam("userId") Integer userId, @RequestParam("userType") String userType) {

		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("b2BPaginationOnSearch()...start");
		listsample = pathologySearchService.searchB2BRecords(custTypeId, custNameId, fromDate, toDate, searchBy, startIndex, emergencyFlag, testStatus, unitId, userType, userId);
		log.info("b2BPaginationOnSearch()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 03-09-2020
	  * @comment This method is to reject B2B Sample.
	  * @param request
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/rejectB2BSample", method = RequestMethod.POST)
	public boolean rejectB2BSample(@RequestParam("masterIds") String masterIds,  @RequestParam("testStatus") String testStatus, 
			@RequestParam("reason") String reason, @RequestParam("rejectedFrom") Integer rejectedFrom, @RequestParam("unitId") Integer unitId, 
			@RequestParam("userId") String userId) {
		
		log.info("rejectB2BSample()...start");
		boolean result = pathologySearchService.rejectB2BSample(masterIds, testStatus, reason, rejectedFrom, unitId, userId);
		log.info("rejectB2BSample()...end");
		return result;
	}

	 /********************************************************************
	  * @author Akshay Mache
	  * @since 03-09-2020
	  * @comment This method is to unreject B2B Sample.
	  * @param request
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/unrejectB2BSample", method = RequestMethod.POST)
	public boolean unrejectB2BSample(@RequestParam("masterIds") String masterIds,  @RequestParam("testStatus") String testStatus, 
									@RequestParam("unitId") Integer unitId) {
		
		log.info("unrejectB2BSample()...start");
		boolean result = pathologySearchService.unrejectB2BSample(masterIds, testStatus, unitId);
		log.info("unrejectB2BSample()...end");
		return result;
	}
	
	/********************************************************************
	  * @author Akshay Mache
	  * @since 03-09-2020
	  * @comment This method is to drop B2B Sample.
	  * @param request
	  * @return
	 **********************************************************************/
	@RequestMapping(value = "/dropB2BSample", method = RequestMethod.POST)
	public boolean dropB2BSample(@RequestParam("masterIds") String masterIds, @RequestParam("userId") String userId) {
		log.info("dropB2BSample()...start");
		boolean result = pathologySearchService.dropB2BSample(masterIds, userId);
		log.info("dropB2BSample()...end");
		return result;
	}
	
	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to get all patches.
	 ************************************************************************/
	@RequestMapping(value = "/getAllPatches", method = RequestMethod.GET)
	public LabPatchDto getAllPatches(@RequestParam("unitId") Integer unitId) {
		List<LabPatchDto> labPatchList = new ArrayList<LabPatchDto>();
		log.info("getAllPatches()...start");
		labPatchList = pathologySearchService.getAllPatches(unitId);
		LabPatchDto labPatchDto = new LabPatchDto();
		labPatchDto.setLabPatchList(labPatchList);
		log.info("getAllPatches()...end");
		return labPatchDto;
	}

	/********************************************************************
	  * @author Akshay Mache
	  * @since 03-09-2020
	  * @comment This method is to drop B2B Sample.
	  * @param request
	  * @return
	 **********************************************************************/
	@RequestMapping(value = "/getRunnerBoysByPatch", method = RequestMethod.POST)
	public Doctor getRunnerBoysByPatch(@RequestParam("patchId") String patchId, @RequestParam("unitId") Integer unitId) {
		log.info("getRunnerBoysByPatch()...start");
		Doctor user = new Doctor();
		List<Doctor> usersList = pathologySearchService.getRunnerBoysByPatch(patchId, unitId);
		user.setListDoctor(usersList);
		log.info("getRunnerBoysByPatch()...end");
		return user;
	}

	 /********************************************************************
	  * @author Akshay Mache
	  * @since 01-09-2020
	  * @comment This method is to collect B2B Sample.
	  * @param request
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/assignB2BSamples", method = RequestMethod.POST)
	public boolean assignB2BSamples(@RequestParam("masterIds") String masterIds, @RequestParam("testStatus") Integer testStatus, 
			@RequestParam("unitId") Integer unitId, @RequestParam("userId") Integer userId, @RequestParam("runnerBoyId") Integer runnerBoyId) {
		
		log.info("assignB2BSamples()...start");
		boolean result = pathologySearchService.assignB2BSamples(masterIds, testStatus, unitId, userId, runnerBoyId);
		log.info("assignB2BSamples()...end");
		return result;
	}

	/********************************************************************
	 * @author Akshay Mache
	 * @since 01-09-2020
	 * @comment This method is to get b2b collection, collected and rejected samples.
	 * @param request 
	 * @return
	**********************************************************************/	
	@RequestMapping(value = "/getB2BSamplesByRunnerBoy", method = RequestMethod.POST)
	public PathologySampleWiseMaster getB2BSamplesByRunnerBoy(@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("runnerBoyId") Integer runnerBoyId, 
															@RequestParam("testStatus") String testStatus, @RequestParam("unitId") Integer unitId, 
															@RequestParam("userType") String userType, @RequestParam("userCustomerType") String userCustomerType, 
															@RequestParam("userCustomerId") String userCustomerId) {
		
		log.info("getB2BSamplesByRunnerBoy()...start");
		List<PathologySampleWiseMaster> listsample = pathologySearchService.getB2BSamplesByRunnerBoy(emergencyFlag, runnerBoyId, testStatus, unitId, userType, userCustomerType, userCustomerId);
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setLabSampleWiseMasterDtoList(listsample);
		log.info("getB2BSamplesByRunnerBoy()...end");
		return obj;
	}
	
	/********************************************************************
	  * @author Akshay Mache
	  * @since 03-09-2020
	  * @comment This method is to get All Runner Boys.
	  * @param request
	  * @return
	 **********************************************************************/
	@RequestMapping(value = "/getAllRunnerBoys", method = RequestMethod.GET)
	public Doctor getAllRunnerBoys(@RequestParam("unitId") Integer unitId) {
		log.info("getAllRunnerBoys()...start");
		Doctor user = new Doctor();
		List<Doctor> usersList = pathologySearchService.getAllRunnerBoys(unitId);
		//user.setListDoctorDetails(usersList);
		user.setListDoctor(usersList);
		log.info("getAllRunnerBoys()...end");
		return user;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 01-09-2020
	  * @comment This method is to collect B2B Sample.
	  * @param request
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/unassignB2BSample", method = RequestMethod.POST)
	public boolean unassignB2BSample(@RequestParam("masterIds") String masterIds, @RequestParam("testStatus") String testStatus, 
			@RequestParam("unitId") Integer unitId, @RequestParam("userId") String userId) {
		
		log.info("unassignB2BSample()...start");
		boolean result = pathologySearchService.unassignB2BSample(masterIds, testStatus, unitId, userId);
		log.info("unassignB2BSample()...end");
		return result;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 01-09-2020
	  * @comment This method is to collect B2B Sample.
	  * @param request
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/transferB2BSamples", method = RequestMethod.POST)
	public Integer transferB2BSamples(PathologySampleTransferDto pathologySampleTransferDto) {
		log.info("transferB2BSamples()...start");
		Integer result = pathologySearchService.transferB2BSamples(pathologySampleTransferDto);
		log.info("transferB2BSamples()...end");
		return result;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 01-09-2020
	  * @comment This method is to get b2b collection, collected and rejected samples.
	  * @param request 
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/getB2BAsssignAndTransferRecords", method = RequestMethod.POST)
	public PathologySampleWiseMaster getB2BAsssignAndTransferRecords(@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("startIndex") Integer startIndex, 
															@RequestParam("testStatus") String testStatus, @RequestParam("unitId") Integer unitId, 
															@RequestParam("userType") String userType, @RequestParam("userId") Integer userId,
															@RequestParam("userCustomerType") String userCustomerType, @RequestParam("userCustomerId") String userCustomerId) {
		
		log.info("getB2BAsssignAndTransferRecords()...start");
		String rowCount = pathologySearchService.getB2BAsssignAndTransferPageCount(emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
				
		List<PathologySampleWiseMaster> listsample = pathologySearchService.getB2BAsssignAndTransferRecords(emergencyFlag, startIndex, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setLabSampleWiseMasterDtoList(listsample);
				obj.setRowCount(rowCount);
		log.info("getB2BAsssignAndTransferRecords()...end");
		return obj;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @since 01-09-2020
	 * @comment This method is to get b2b collection, collected and rejected samples.
	 * @param request 
	 * @return
	**********************************************************************/	
	@RequestMapping(value = "/getB2BTransferedSamplesByRunnerBoy", method = RequestMethod.POST)
	public PathologySampleWiseMaster getB2BTransferedSamplesByRunnerBoy(@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("runnerBoyId") Integer runnerBoyId, 
															@RequestParam("testStatus") String testStatus, @RequestParam("unitId") Integer unitId, 
															@RequestParam("userType") String userType, @RequestParam("userCustomerType") String userCustomerType, 
															@RequestParam("userCustomerId") String userCustomerId) {
		
		log.info("getB2BTransferedSamplesByRunnerBoy()...start");
		List<PathologySampleWiseMaster> listsample = pathologySearchService.getB2BTransferedSamplesByRunnerBoy(emergencyFlag, runnerBoyId, testStatus, unitId, userType, userCustomerType, userCustomerId);
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setLabSampleWiseMasterDtoList(listsample);
		log.info("getB2BTransferedSamplesByRunnerBoy()...end");
		return obj;
	}
	
	/**************************************************************************
	* @author Akshay Mache
	* @since 02-09-2020
	* @comment This method is to Auto-Suggest the b2b patients.
	* @param request
	* @return
	****************************************************************************/
	@RequestMapping(value = "/b2BAssignAndTransferAutoSuggestion", method = RequestMethod.GET)
	public PathologySampleWiseMaster b2BAssignAndTransferAutoSuggestion(@RequestParam("searchText") String searchText, @RequestParam("searchBy") String searchBy, 
															@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("testStatus") String testStatus,
															@RequestParam("unitId") Integer unitId,	@RequestParam("userType") String userType, 
															@RequestParam("userCustomerType") String userCustomerType, @RequestParam("userCustomerId") String userCustomerId)
	{
		
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("b2BAssignAndTransferAutoSuggestion()...start");
		listsample = pathologySearchService.b2BAssignAndTransferAutoSuggestion(searchText, searchBy, emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId);
		log.info("b2BAssignAndTransferAutoSuggestion()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}

	/**************************************************************************
	 * @author Akshay Mache
	 * @since 02-09-2020
	 * @comment This method is to get patients by Id.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/getB2BAssignAndTransferPatientById", method = RequestMethod.GET)
	public PathologySampleWiseMaster getB2BAssignAndTransferPatientById(@RequestParam("id") Integer patientId, @RequestParam("emergencyFlag") String emergencyFlag, 
														@RequestParam("testStatus") String testStatus, @RequestParam("unitId") Integer unitId,	
														@RequestParam("userType") String userType, @RequestParam("userCustomerType") String userCustomerType, 
														@RequestParam("userCustomerId") String userCustomerId){
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("getB2BAssignAndTransferPatientById()...start");
		listsample = pathologySearchService.getB2BAssignAndTransferPatientById(patientId, emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId);
		log.info("getB2BAssignAndTransferPatientById()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 01-09-2020
	 * @comment This method is to search b2b patients with different criteria.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/searchB2BAssignAndTransferRecords", method = RequestMethod.GET)
	public PathologySampleWiseMaster searchB2BAssignAndTransferRecords(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
													  	@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
														@RequestParam("searchBy") String searchBy, @RequestParam("startIndex") Integer startIndex, 
														@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("testStatus") String testStatus,
														@RequestParam("unitId") Integer unitId, @RequestParam("userType") String userType) {
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("searchB2BAssignAndTransferRecords()...start");
		String rowCount = pathologySearchService.getB2BAssignAndTransferRecordsCount(custTypeId, custNameId, fromDate, toDate, searchBy, emergencyFlag, testStatus, unitId, userType);
		listsample = pathologySearchService.searchB2BAssignAndTransferRecords(custTypeId, custNameId, fromDate, toDate, searchBy, startIndex, emergencyFlag, testStatus, unitId, userType);
		log.info("searchB2BAssignAndTransferRecords()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		obj.setRowCount(rowCount);
		return obj;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 02-09-2020
	  * @comment This method is for b2b patients pagination.
	  * @param request
	  * @return
	 **********************************************************************/	
	@RequestMapping(value = "/b2BAssignAndTransferPagination", method = RequestMethod.POST)
	public PathologySampleWiseMaster b2BAssignAndTransferPagination(@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("startIndex") Integer startIndex, 
													@RequestParam("testStatus") String testStatus, @RequestParam("unitId") Integer unitId, 
													@RequestParam("userType") String userType, @RequestParam("userId") Integer userId, @RequestParam("userCustomerType") String userCustomerType, 
													@RequestParam("userCustomerId") String userCustomerId) {
		
		log.info("b2BAssignAndTransferPagination()...start");
		List<PathologySampleWiseMaster> listsample = pathologySearchService.getB2BAsssignAndTransferRecords(emergencyFlag, startIndex, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
				obj.setLabSampleWiseMasterDtoList(listsample);
		log.info("b2BAssignAndTransferPagination()...end");
		return obj;
	}
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 02-09-2020
	 * @comment This method is for patients pagination after search.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/b2BAssignAndTransferPaginationOnSearch", method = RequestMethod.GET)
	public PathologySampleWiseMaster b2BAssignAndTransferPaginationOnSearch(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
													  	@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
														@RequestParam("searchBy") String searchBy, @RequestParam("startIndex") Integer startIndex, 
														@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("testStatus") String testStatus,
														@RequestParam("unitId") Integer unitId, @RequestParam("userType") String userType) {

		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("b2BAssignAndTransferPaginationOnSearch()...start");
		listsample = pathologySearchService.searchB2BAssignAndTransferRecords(custTypeId, custNameId, fromDate, toDate, searchBy, startIndex, emergencyFlag, testStatus, unitId, userType);
		log.info("b2BAssignAndTransferPaginationOnSearch()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 16-12-2020
	  * @comment This method is to get samples by collected at.
	 **********************************************************************/	
	@RequestMapping(value = "/getSamplesByCollectedAt", method = RequestMethod.GET)
	public @ResponseBody PathologySampleWiseMaster getSamplesByCollectedAt(@RequestParam("callFrom") String callFrom, @RequestParam("tabId") String tabId, 
			@RequestParam("startIndex") Integer startIndex, @RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("collectedAtId") Integer collectedAtId, 
			@RequestParam("txtFdate") String txtFdate, @RequestParam("txtTdate") String txtTdate, HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();

		String rowCount = pathologySearchService.getSamplesCountByCollectedAt(callFrom, tabId, emergencyFlag, collectedAtId, txtFdate, txtTdate, request);
				
			listsample = pathologySearchService.getSamplesByCollectedAt(callFrom, tabId, startIndex, emergencyFlag, collectedAtId, txtFdate, txtTdate, request);
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
			obj.setLabSampleWiseMasterDtoList(listsample);
			obj.setRowCount(rowCount);
		return obj;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 16-12-2020
	  * @comment This method is to get samples by collected at.
	 **********************************************************************/	
	@RequestMapping(value = "/paginationOnCollectedAt", method = RequestMethod.GET)
	public @ResponseBody PathologySampleWiseMaster paginationOnCollectedAt(@RequestParam("callFrom") String callFrom, @RequestParam("tabId") String tabId, 
			@RequestParam("startIndex") Integer startIndex, @RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("collectedAtId") Integer collectedAtId, 
			@RequestParam("txtFdate") String txtFdate, @RequestParam("txtTdate") String txtTdate, HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> listsample = pathologySearchService.getSamplesByCollectedAt(callFrom, tabId, startIndex, emergencyFlag, collectedAtId, txtFdate, txtTdate, request);
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
			obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 05-03-2020
	 * @comment This method is to search patient records with different criteria.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/getDynamicTabCount", method = RequestMethod.GET)
	public String getDynamicTabCount(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
																		@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
																		@RequestParam("callFrom") String callFrom, @RequestParam("searchBy") String searchBy, 
																		@RequestParam("emergencyFlag") String emergencyFlag, HttpServletRequest request) {
		log.info("getDynamicTabCount()...start");
		String tabCount = pathologySearchService.getDynamicTabCount(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, emergencyFlag, request);
		log.info("getDynamicTabCount()...end");
		return tabCount;
	}
	
	@RequestMapping(value = "/sendEmailByLifenityDomain", method = RequestMethod.POST)
	public String sendEmailByLifenityDomain(String emailId, String mailSubject, String mailBody, String filePath, String fileName, String createdBy) {
		//filePath = "http://diagnostics.lifenitycare.com/PDFREPORT/160/LC002010000001.pdf";
		//fileName = "LC002010000001.pdf";

		log.info("sendEmailByLifenityDomain()...start");
		String tabCount = "";
		try {
			tabCount = pathologySearchService.sendEmailByLifenityDomain(emailId, mailSubject, mailBody, filePath, fileName, createdBy);
		} catch (IOException e) {
			e.printStackTrace();
		}
		log.info("sendEmailByLifenityDomain()...end");
		return tabCount;
	}
	
	/**************************************************************************
	* @author Akshay Mache
	* @since 05-03-2020
	* @comment This method is to Auto-Suggest the patient record.
	* @param request
	* @return
	****************************************************************************/
	@RequestMapping(value = "/reportingPatientAutoSuggestion", method = RequestMethod.GET)
	public PathologySampleWiseMaster reportingPatientAutoSuggestion(@RequestParam("searchText") String searchText, @RequestParam("searchBy") String searchBy, 
																				   @RequestParam("callFrom") String callFrom, @RequestParam("tabId") String tabId, 
																				   @RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("emailStatus") String emailStatus,
																				   HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("phelbotomyPatientAutoSuggestion()...start");
		listsample = pathologySearchService.reportingPatientAutoSuggestion(searchText, searchBy, callFrom, tabId, emergencyFlag, emailStatus, request);
		log.info("phelbotomyPatientAutoSuggestion()...end");
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}

	/**************************************************************************
	 * @author Akshay Mache
	 * @since 05-03-2020
	 * @comment This method is to get patient record by Id.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/getReportingPatientById", method = RequestMethod.GET)
	public PathologySampleWiseMaster getReportingPatientById(@RequestParam("id") Integer patientId, @RequestParam("callFrom") String callFrom, 
																  @RequestParam("tabId") String tabId, @RequestParam("emergencyFlag") String emergencyFlag, 
																  HttpServletRequest request){
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("getPatientById()...start");
		listsample = pathologySearchService.getReportingPatientById(patientId, callFrom, tabId, emergencyFlag, request);
		log.info("getPatientById()...end");
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		
		return obj;
	}
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 05-03-2020
	 * @comment This method is to search patient records with different criteria.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/searchReportingPatient", method = RequestMethod.GET)
	public PathologySampleWiseMaster searchReportingPatient(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
																		@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
																		@RequestParam("callFrom") String callFrom, @RequestParam("searchBy") String searchBy, 
																		@RequestParam("tabId") String tabId, @RequestParam("startIndex") Integer startIndex, 
																		@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("emailStatus") String emailStatus, 
																		HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("searchReportingPatient()...start");
		String rowCount = pathologySearchService.getReportingRecordCount(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, emergencyFlag, emailStatus, request);
		listsample = pathologySearchService.searchReportingPatient(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, startIndex, emergencyFlag, emailStatus, request);
		log.info("searchReportingPatient()...end");
		
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		obj.setRowCount(rowCount);
		return obj;
	}
	
	/**************************************************************************
	 * @author Akshay Mache
	 * @since 05-03-2020
	 * @comment This method is to search patient records with different criteria.
     * @param request
	 * @return
	****************************************************************************/
	@RequestMapping(value = "/reportingPagination", method = RequestMethod.GET)
	public PathologySampleWiseMaster reportingPagination(@RequestParam("custTypeId") String custTypeId, @RequestParam("custNameId") String custNameId,  
																		@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
																		@RequestParam("callFrom") String callFrom, @RequestParam("searchBy") String searchBy, 
																		@RequestParam("tabId") String tabId, @RequestParam("startIndex") Integer startIndex, 
																		@RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("emailStatus") String emailStatus, 
																		HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample=new ArrayList<PathologySampleWiseMaster>();
		log.info("reportingPagination()...start");
		listsample = pathologySearchService.searchReportingPatient(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, startIndex, emergencyFlag, emailStatus, request);
		log.info("reportingPagination()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 16-12-2020
	  * @comment This method is to get samples by collected at.
	 **********************************************************************/	
	@RequestMapping(value = "/getReportingSamplesByCollectedAt", method = RequestMethod.GET)
	public @ResponseBody PathologySampleWiseMaster getReportingSamplesByCollectedAt(@RequestParam("callFrom") String callFrom, @RequestParam("tabId") String tabId, 
			@RequestParam("startIndex") Integer startIndex, @RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("collectedAtId") Integer collectedAtId, 
			@RequestParam("txtFdate") String txtFdate, @RequestParam("txtTdate") String txtTdate, @RequestParam("emailStatus") String emailStatus, HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();

		String rowCount = pathologySearchService.getReportingSamplesCountByCollectedAt(callFrom, tabId, emergencyFlag, collectedAtId, txtFdate, txtTdate, emailStatus, request);
				
		listsample = pathologySearchService.getReportingSamplesByCollectedAt(callFrom, tabId, startIndex, emergencyFlag, collectedAtId, txtFdate, txtTdate, emailStatus, request);
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
			obj.setLabSampleWiseMasterDtoList(listsample);
			obj.setRowCount(rowCount);
		return obj;
	}
	
	 /********************************************************************
	  * @author Akshay Mache
	  * @since 16-12-2020
	  * @comment This method is to get samples by collected at.
	 **********************************************************************/	
	@RequestMapping(value = "/reportingPaginationOnCollectedAt", method = RequestMethod.GET)
	public @ResponseBody PathologySampleWiseMaster reportingPaginationOnCollectedAt(@RequestParam("callFrom") String callFrom, @RequestParam("tabId") String tabId, 
			@RequestParam("startIndex") Integer startIndex, @RequestParam("emergencyFlag") String emergencyFlag, @RequestParam("collectedAtId") Integer collectedAtId, 
			@RequestParam("txtFdate") String txtFdate, @RequestParam("txtTdate") String txtTdate, @RequestParam("emailStatus") String emailStatus, HttpServletRequest request) {
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();

		listsample = pathologySearchService.getReportingSamplesByCollectedAt(callFrom, tabId, startIndex, emergencyFlag, collectedAtId, txtFdate, txtTdate, emailStatus, request);
		PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
			obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}
	

	@RequestMapping(value = "/sendBulkEmailsOfNormalReports", method = RequestMethod.POST)
	public void sendBulkEmailsOfNormalReports() throws Exception {
		log.info("sendBulkEmailsOfNormalReports()...start");
		Date date = new Date();
		String todaysDate = new SimpleDateFormat("yyyy-MM-dd").format(date);
		
		List<PathologySampleWiseMaster> listSample = pathologySearchService.getAllPostedNoramlRecords(todaysDate);
		
		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String ReportUrlSmsLink = (String) resource.getObject("ReportUrlSmsLink").toString();
		ResourceBundle resourceBundle = ResourceBundle.getBundle("SMSFormat");
        String host = resourceBundle.getObject("host").toString();
        String port = resourceBundle.getObject("port").toString();
        final String mailFrom = resourceBundle.getObject("mailFrom").toString();
        final String password = resourceBundle.getObject("password").toString();
        String labName = resourceBundle.getObject("labName").toString();
        String regards = resourceBundle.getObject("regards").toString();
		
		/*String host = "smtp.gmail.com";
		String port = "587";//"465";
		final String mailFrom = "reports.lifenity@gmail.com";
        final String password ="cexraedexyrhahgl";*/

        //Set SMTP server properties
		Properties properties = new Properties();
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", port);
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.user", mailFrom);
		properties.put("mail.password", password);

		//Creates a new session with an authenticator
		Authenticator auth = new Authenticator() {
			public PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(mailFrom, password);
			}
		};

		Session mailSession = Session.getInstance(properties, auth);
		
		for(PathologySampleWiseMaster dto : listSample) {
			String pName = dto.getPatientname().replaceAll("\\s", "");
			String pNamee = dto.getPatientname().replaceAll("  ", " ");
				
			final String labReportPath = ReportUrlSmsLink+"/LabResultPdf/" + File.separator +
					dto.getMasterId() + File.separator + pName + File.separator +pName+".pdf";
			String filePath = labReportPath.replace("\\", "/");
			
			if(ReportUrlSmsLink.equalsIgnoreCase("https://disha.lifenitywellness.com") || ReportUrlSmsLink.equalsIgnoreCase("https://pluscare.disha.life")) {
				filePath = WhatsAppApi.convertUrlIntoTinyUrl(filePath);
			}
			
			//To send Lab Report through whatsapp.
			//RegistrationController.sendSmsForDishaUrl(labReportPath, pNamee, dto.getPatientmobile());
		
			//Message info
			String subject = labName+" Report";
			String message = "Dear <b>" + pNamee + "</b>," + "<br>" + "<br>" 
				+"Thank you for registering with us." + "<br>"
				+ " Please find your  <b>Lab Test Report</b>  click on this link : <br>"+filePath+ "<br>"
				+ "<br>" 
				+ " Conditions on reporting" + "<br>" + "1.This is a computer generated report." + "<br>"
				+ "2.Partial reproduction of this report is not permitted." + "<br>" + "" + "<br>"
				+ "<b>Regards</b>," + "<br>" + "<b>"+regards+"</b>" + "<br>" + "<br>" 
				+ "<b>Disclaimer -</b>" + "<br>"
				+ "<i>This e-mail may contain confidential information which is the property of "+labName+". It is intended only for the use of the individual or entity to which it is addressed. If you are not "
				+ "<br>"
				+ " the intended recipient, you are not authorized to read,retain,copy, print,distribute or use the contents of this e-mail. If you have received this communication in error please notify the "
				+ "<br>"
				+ " sender & delete all copies of this message. "+labName+" does not accept any liability for virus infected mails</i>.";

			
			String mailSendFrom = resourceBundle.getObject("mailSendFrom").toString();

			String mailStatus =WhatsAppApi.sendEmailUsingMsg91Domain(dto.getEmailId(), subject, message, "", "", "1","");
			phlebotomyService.updateEmailStatus(dto.getMasterId(), dto.getTreatmentId(), dto.getPatientgander(), 2, mailStatus, 1);

			/*if(mailSendFrom.equalsIgnoreCase("Lifenity")){
								
			String mailStatus =WhatsAppApi.sendEmailUsingMsg91Domain(dto.getEmailId(), subject, message, "", "", "1","");
				phlebotomyService.updateEmailStatus(dto.getMasterId(), dto.getTreatmentId(), dto.getPatientgander(), 2, mailStatus, 1);
			}else{
								

			
			//Creates a new e-mail message
			Message msg = new MimeMessage(mailSession);
			msg.setFrom(new InternetAddress(mailFrom));
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(dto.getEmailId()));
			msg.setSubject(subject);
			msg.setSentDate(new Date());
			msg.setContent(message, "text/html");

			SMTPTransport transport = (SMTPTransport) mailSession.getTransport("smtp");
			transport.connect(host, 587, mailFrom, password);
			
			transport.sendMessage(msg, msg.getAllRecipients());
			//You can get SMTP return code here
			int responseCode = transport.getLastReturnCode();
			String mailStatus = "";
			//250 � Requested action taken and completed. This is the best message for a sender to receive because it indicates that the SMTP communication was successful. SMTP response code 250 is also the most common response code in SMTP since it is issued in response to every accepted command (likely 4 to 6 times per message).
			if(responseCode == 250){
				mailStatus = "Success";
			}else{
				mailStatus = "Fail";
			}
			//Added by kishor for Function for update mail status.
			phlebotomyService.updateEmailStatus(dto.getMasterId(), dto.getTreatmentId(), dto.getPatientgander(), 2, mailStatus, 1);
		}*/
	}
	}
	
	@RequestMapping(value = "/getHospitalInfo", method = RequestMethod.GET)
	public HospitalDetails getHospitalInfo() {
		HospitalDetails dto = null;//pathologySearchService.getHospitalInfo();
		return dto;
	}

	@RequestMapping(value = "/acceptInPhlebotomy", method = RequestMethod.POST)
	public String acceptInPhlebotomy(@RequestParam("id") String idList, HttpServletRequest request) {
		log.info("acceptInPhlebotomy()...start");
		boolean response = pathologySearchService.acceptInPhlebotomy(idList, request);
		String msg = "";
		if(response == true) {
			msg = "Collection Successfully";
		}else {
			msg = "Something went wrong.";
		}
		log.info("acceptInPhlebotomy()...end");
		return msg;
	}
	
	@RequestMapping(value = "/searchDateWiseOutSourceLabReport", method = RequestMethod.GET)
	public PathologySampleWiseMaster searchDateWiseOutSourceLabReport(@RequestParam("outSourceType") Integer outSourceType, @RequestParam("outSourceTypeId") Integer outSourceTypeId,
			@RequestParam("tabId") String tabId, @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
			@RequestParam("startIndex") Integer startIndex, @RequestParam("searchBy") String searchBy, @RequestParam("getTestName") String getTestName, 
			String emergencyFlag, @RequestParam("departmentId") Integer departmentId, HttpServletRequest request){

		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("getOutSourceTypeById()...start");
		listsample = pathologySearchService.searchDateWiseOutSourceLabReport(outSourceType, outSourceTypeId, tabId, fromDate, toDate, startIndex, searchBy, getTestName, emergencyFlag,departmentId, request);
		log.info("getOutSourceTypeById()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		return obj;
	}	
	
	
	/**************************************************************************
	* @author Rohini Ambhore
	* @since 20-02-2024
	* @comment This method is to get the patient record by patientId.
	****************************************************************************/
	@RequestMapping(value = "/searchDateWiseOutSourcedNew", method = RequestMethod.GET)
	public PathologySampleWiseMaster searchDateWiseOutSourcedNew(@RequestParam("outSourceType") Integer outSourceType, @RequestParam("outSourceTypeId") Integer outSourceTypeId,
			@RequestParam("tabId") String tabId, @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate, 
			@RequestParam("startIndex") Integer startIndex, @RequestParam("searchBy") String searchBy, String emergencyFlag, @RequestParam("departmentId") Integer departmentId, HttpServletRequest request){
		
		List<PathologySampleWiseMaster> listsample = new ArrayList<PathologySampleWiseMaster>();	
		log.info("getOutSourceTypeById()...start");
		String rowCount = pathologySearchService.getForcedOutsourceSearchRecordCount(outSourceType, outSourceTypeId, fromDate, toDate, tabId, searchBy, emergencyFlag, request);
		listsample = pathologySearchService.searchDateWiseOutSourcedNew(outSourceType, outSourceTypeId, tabId, fromDate, toDate, startIndex, searchBy, emergencyFlag,departmentId, request);
		log.info("getOutSourceTypeById()...end");
		PathologySampleWiseMaster obj =new PathologySampleWiseMaster();
		obj.setLabSampleWiseMasterDtoList(listsample);
		obj.setRowCount(rowCount);
		return obj;
	}
}