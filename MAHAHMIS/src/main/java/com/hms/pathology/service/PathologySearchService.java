package com.hms.pathology.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HospitalDetails;
/*import com.hms.administrator.dto.BusinessCustMasterDto;
import com.hms.administrator.dto.CustomerTypeDto;*/
import com.hms.administrator.dto.LabPatchDto;
import com.hms.dto.Doctor;
import com.hms.pathology.dto.PathologySampleTransferDto;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.dto.PathologyTestReasonDto;

public interface PathologySearchService {

	public List<PathologySampleWiseMaster> phelbotomyPatientAutoSuggestion(String searchText, String searchBy, String callFrom, String tabId, String emergencyFlag, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> getPatientById(Integer patientId, String callFrom, String tabId, String emergencyFlag, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> searchLabTestPatient(String custTypeId, String custNameId, String fromDate, String toDate, String callFrom, String searchBy, String tabId, Integer startIndex, String emergencyFlag, HttpServletRequest request);
	
	public String getSearchRecordCount(String custTypeId, String custNameId, String fromDate, String toDate, String callFrom, String searchBy, String tabId, String emergencyFlag, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> getPhlebotomyPagination(String callFrom, Integer startIndex, String emergencyFlag, HttpServletRequest request);
	
	public String getRecordCount(HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> getStatus(String masterId, HttpServletRequest request);
	
	public String getRecollectionRecordCount(String callform, HttpServletRequest request);
	
	public String getForcedOutsourceSearchRecordCount(Integer outSourceType, Integer outSourceTypeId, String fromDate, String toDate, String tabId, String searchBy, String emergencyFlag, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> searchDateWiseOutSourced(Integer outSourceType, Integer outSourceTypeId, String tabId, String fromDate, String toDate, Integer startIndex, String searchBy, String emergencyFlag, HttpServletRequest request);

	public List<PathologySampleWiseMaster> getOutSourcePagination(String callFrom, Integer startIndex, String emergencyFlag, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> getOutsourceRecords(String callFrom, HttpServletRequest request);
	
	public String getPageCount(String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId);
	
	public List<PathologySampleWiseMaster> getB2BCollectionsRecords(String emergencyFlag, Integer startIndex, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId);
	
	public boolean collectB2BSample(String masterIds, String testStatus, String barcode, Integer unitId, String userId);
	
	public boolean submitB2BSample(String masterId, String testStatus, Integer unitId, String userId);
	
	public List<PathologySampleWiseMaster> searchB2BRecords(String custTypeId, String custNameId, String fromDate, String toDate, String searchBy, Integer startIndex, String emergencyFlag, String testStatus, Integer unitId, String userType, Integer userId);
	
	public String getB2BSearchRecordCount(String custTypeId, String custNameId, String fromDate, String toDate, String searchBy, String emergencyFlag, String testStatus, Integer unitId, String userType, Integer userId);
	
	public List<PathologySampleWiseMaster> b2BPatientAutoSuggestion(String searchText, String searchBy, String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId);
	
	public List<PathologySampleWiseMaster> getB2BPatientById(Integer patientId, String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId);
	
	public boolean rejectB2BSample(String masterIds, String testStatus, String reason, Integer rejectedFrom, Integer unitId, String userId);
	
	public boolean unrejectB2BSample(String masterIds, String testStatus, Integer unitId);
	
	public boolean dropB2BSample(String masterIds, String userId);
	
	public String getB2BSamplesCount(String emergencyFlag, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId);
	
	public List<PathologyTestReasonDto> getTestRejectionReasons(String reasonType);
	
	//public List<CustomerTypeDto> getAllCustomerType(String userCustomerType, String userType);
	
	//public List<BusinessCustMasterDto> getAllCustomers(String userCustomerName, String userType, String customerType);

	public List<LabPatchDto> getAllPatches(Integer unitId);

	public List<Doctor> getRunnerBoysByPatch(String patchId, Integer unitId);

	public boolean assignB2BSamples(String masterId, Integer testStatus, Integer unitId, Integer userId, Integer runnerBoyId);

	public List<PathologySampleWiseMaster> getB2BSamplesByRunnerBoy(String emergencyFlag, Integer runnerBoyId, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId);
	
	public List<Doctor> getAllRunnerBoys(Integer unitId);
	
	public boolean unassignB2BSample(String masterId, String testStatus, Integer unitId, String userId);
	
	public Integer transferB2BSamples(PathologySampleTransferDto pathologySampleTransferDto);

	public String getB2BAsssignAndTransferPageCount(String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId);
	
	public List<PathologySampleWiseMaster> getB2BAsssignAndTransferRecords(String emergencyFlag, Integer startIndex, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId);
	
	public List<PathologySampleWiseMaster> getB2BTransferedSamplesByRunnerBoy(String emergencyFlag, Integer runnerBoyId, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId);

	public List<PathologySampleWiseMaster> b2BAssignAndTransferAutoSuggestion(String searchText, String searchBy, String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId);
	
	public List<PathologySampleWiseMaster> getB2BAssignAndTransferPatientById(Integer patientId, String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId);
	
	public List<PathologySampleWiseMaster> searchB2BAssignAndTransferRecords(String custTypeId, String custNameId, String fromDate, String toDate, String searchBy, Integer startIndex, String emergencyFlag, String testStatus, Integer unitId, String userType);
	
	public String getB2BAssignAndTransferRecordsCount(String custTypeId, String custNameId, String fromDate, String toDate, String searchBy, String emergencyFlag, String testStatus, Integer unitId, String userType);
	
	public List<PathologySampleWiseMaster> getSamplesByCollectedAt(String callFrom, String tabId, Integer startIndex, String emergencyFlag, Integer collectedAtId, String txtFdate, String txtTdate, HttpServletRequest request);
	
	public String getSamplesCountByCollectedAt(String callFrom, String tabId, String emergencyFlag, Integer collectedAtId, String txtFdate, String txtTdate, HttpServletRequest request);
	
	public String getDynamicTabCount(String custTypeId, String custNameId, String fromDate, String toDate, String callFrom, String searchBy, String emergencyFlag, HttpServletRequest request);

	public String sendEmailByLifenityDomain(String emailId, String mailSubject, String mailBody, String filePath, String fileName, String createdBy) throws MalformedURLException, IOException;
	
	public List<PathologySampleWiseMaster> reportingPatientAutoSuggestion(String searchText, String searchBy, String callFrom, String tabId, String emergencyFlag, String emailStatus, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> getReportingPatientById(Integer patientId, String callFrom, String tabId, String emergencyFlag, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> searchReportingPatient(String custTypeId, String custNameId, String fromDate, String toDate, String callFrom, String searchBy, String tabId, Integer startIndex, String emergencyFlag, String emailStatus, HttpServletRequest request);
	
	public String getReportingRecordCount(String custTypeId, String custNameId, String fromDate, String toDate, String callFrom, String searchBy, String tabId, String emergencyFlag, String emailStatus, HttpServletRequest request);

	public List<PathologySampleWiseMaster> getReportingSamplesByCollectedAt(String callFrom, String tabId, Integer startIndex, String emergencyFlag, Integer collectedAtId, String txtFdate, String txtTdate, String emailStatus, HttpServletRequest request);

	public String getReportingSamplesCountByCollectedAt(String callFrom, String tabId, String emergencyFlag, Integer collectedAtId, String txtFdate, String txtTdate, String emailStatus, HttpServletRequest request);

	public List<PathologySampleWiseMaster> getAllPostedNoramlRecords(String todaysDate);
	
	public HospitalDetails getHospitalInfo();
	
	public boolean acceptInPhlebotomy(String idList, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> searchDateWiseOutSourceLabReport(Integer outSourceType, Integer outSourceTypeId, String tabId, String fromDate, String toDate, Integer startIndex, String searchBy, String getTestName, String emergencyFlag,Integer departmentId, HttpServletRequest request);
	
	public List<PathologySampleWiseMaster> searchDateWiseOutSourcedNew(Integer outSourceType, Integer outSourceTypeId, String tabId, String fromDate, String toDate, Integer startIndex, String searchBy, String emergencyFlag,Integer departmentId, HttpServletRequest request);
}