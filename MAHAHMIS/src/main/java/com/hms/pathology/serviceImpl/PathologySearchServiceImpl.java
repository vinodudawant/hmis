package com.hms.pathology.serviceImpl;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dto.HospitalDetails;
/*import com.hms.administrator.dto.BusinessCustMasterDto;
import com.hms.administrator.dto.CustomerTypeDto;*/
import com.hms.administrator.dto.LabPatchDto;
import com.hms.dto.Doctor;
import com.hms.pathology.dao.PathologySearchDao;
import com.hms.pathology.dto.PathologySampleTransferDto;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.dto.PathologyTestReasonDto;
import com.hms.pathology.service.PathologySearchService;


@Service
@Transactional
public class PathologySearchServiceImpl implements PathologySearchService {

	@Autowired
	PathologySearchDao pathologySearchDao;
	
	
	@Override
	public List<PathologySampleWiseMaster> phelbotomyPatientAutoSuggestion(String searchText, String searchBy,
			String callFrom, String tabId, String emergencyFlag, HttpServletRequest request) {
		return pathologySearchDao.phelbotomyPatientAutoSuggestion(searchText, searchBy, callFrom, tabId, emergencyFlag, request);
	}
	
	@Override
	public List<PathologySampleWiseMaster> getPatientById(Integer patientId, String callFrom, String tabId, String emergencyFlag, HttpServletRequest request) {
		return pathologySearchDao.getPatientById(patientId, callFrom, tabId, emergencyFlag, request);
	}
	
	@Override
	public List<PathologySampleWiseMaster> searchLabTestPatient(String custTypeId, String custNameId, String fromDate, String toDate,
			String callFrom, String searchBy, String tabId, Integer startIndex,  String emergencyFlag, HttpServletRequest request) {
		return pathologySearchDao.searchLabTestPatient(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, startIndex, emergencyFlag, request);
	}
	
	@Override
	public String getSearchRecordCount(String custTypeId, String custNameId,
			String fromDate, String toDate, String callFrom, String searchBy,
			String tabId,  String emergencyFlag, HttpServletRequest request) {
		return pathologySearchDao.getSearchRecordCount(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, emergencyFlag, request);
	}
	
	@Override
	public List<PathologySampleWiseMaster> getPhlebotomyPagination(String callFrom, Integer startIndex,
																   String emergencyFlag, HttpServletRequest request) {
		return pathologySearchDao.getPhlebotomyPagination(callFrom, startIndex, emergencyFlag, request);
	}
	
	@Override
	public String getRecordCount(HttpServletRequest request) {
		return pathologySearchDao.getRecordCount(request);
	}

	@Override
	public List<PathologySampleWiseMaster> getStatus(String masterId, HttpServletRequest request) {
		return pathologySearchDao.getStatus(masterId, request);
	}
	
	@Override
	public String getRecollectionRecordCount(String callform, HttpServletRequest request) {
		return pathologySearchDao.getRecollectionRecordCount(callform, request);
	}
	
	@Override
	public String getForcedOutsourceSearchRecordCount(Integer outSourceType,
			Integer outSourceTypeId, String fromDate, String toDate,
			String tabId, String searchBy, String emergencyFlag, HttpServletRequest request) {
		return pathologySearchDao.getForcedOutsourceSearchRecordCount(outSourceType, outSourceTypeId, fromDate, toDate, tabId, searchBy, emergencyFlag, request);
	}

	@Override
	public List<PathologySampleWiseMaster> searchDateWiseOutSourced(
			Integer outSourceType, Integer outSourceTypeId, String tabId,
			String fromDate, String toDate, Integer startIndex, String searchBy, String emergencyFlag, HttpServletRequest request) {
		
		return pathologySearchDao.searchDateWiseOutSourced(outSourceType, outSourceTypeId, tabId, fromDate, toDate, startIndex, searchBy, emergencyFlag, request);
	}
	
	@Override
	public List<PathologySampleWiseMaster> getOutSourcePagination(String callFrom, Integer startIndex,
			 										String emergencyFlag, HttpServletRequest request) {
		return pathologySearchDao.getOutSourcePagination(callFrom, startIndex, emergencyFlag, request);
	}
	
	@Override
	public List<PathologySampleWiseMaster> getOutsourceRecords(String callFrom, HttpServletRequest request) {
		return pathologySearchDao.getOutsourceRecords(callFrom, request);
	}

	@Override
	public String getPageCount(String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId) {
		return pathologySearchDao.getPageCount(emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BCollectionsRecords(String emergencyFlag,
			Integer startIndex, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId) {
		return pathologySearchDao.getB2BCollectionsRecords(emergencyFlag, startIndex, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
	}

	@Override
	public boolean collectB2BSample(String masterIds, String testStatus, String barcode, Integer unitId, String userId) {
		return pathologySearchDao.collectB2BSample(masterIds, testStatus, barcode, unitId, userId);
	}
	
	@Override
	public boolean submitB2BSample(String masterIds, String testStatus, Integer unitId, String userId) {
		return pathologySearchDao.submitB2BSample(masterIds, testStatus, unitId, userId);
	}

	@Override
	public List<PathologySampleWiseMaster> searchB2BRecords(String custTypeId, String custNameId, String fromDate,
			String toDate, String searchBy, Integer startIndex, String emergencyFlag, String testStatus,
			Integer unitId, String userType,  Integer userId) {
		return pathologySearchDao.searchB2BRecords(custTypeId, custNameId, fromDate, toDate, searchBy, startIndex, emergencyFlag, testStatus, unitId, userType, userId);
	}

	@Override
	public String getB2BSearchRecordCount(String custTypeId, String custNameId, String fromDate, String toDate,
			String searchBy, String emergencyFlag, String testStatus, Integer unitId, String userType, Integer userId) {
		return pathologySearchDao.getB2BSearchRecordCount(custTypeId, custNameId, fromDate, toDate, searchBy, emergencyFlag, testStatus, unitId, userType, userId);
	}

	@Override
	public List<PathologySampleWiseMaster> b2BPatientAutoSuggestion(String searchText, String searchBy,
			String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId) {
		return pathologySearchDao.b2BPatientAutoSuggestion(searchText, searchBy, emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BPatientById(Integer patientId, String emergencyFlag,
							String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId) {
		return pathologySearchDao.getB2BPatientById(patientId, emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
	}

	@Override
	public boolean rejectB2BSample(String masterIds, String testStatus, String reason, Integer rejectedFrom, Integer unitId, String userId) {
		return pathologySearchDao.rejectB2BSample(masterIds, testStatus, reason, rejectedFrom, unitId, userId);
	}

	@Override
	public boolean unrejectB2BSample(String masterIds, String testStatus, Integer unitId) {
		return pathologySearchDao.unrejectB2BSample(masterIds, testStatus, unitId);
	}

	@Override
	public boolean dropB2BSample(String masterIds, String userId) {
		return pathologySearchDao.dropB2BSample(masterIds, userId);
	}

	@Override
	public String getB2BSamplesCount(String emergencyFlag, Integer unitId, String userType, String userCustomerType,
			String userCustomerId, Integer userId) {
		return pathologySearchDao.getB2BSamplesCount(emergencyFlag, unitId, userType, userCustomerType, userCustomerId, userId);
	}

	@Override
	public List<PathologyTestReasonDto> getTestRejectionReasons(String reasonType) {
		return pathologySearchDao.getTestRejectionReasons(reasonType);
	}

	/*@Override
	public List<CustomerTypeDto> getAllCustomerType(String userCustomerType, String userType) {
		return pathologySearchDao.getAllCustomerType(userCustomerType, userType);
	}

	@Override
	public List<BusinessCustMasterDto> getAllCustomers(String userCustomerName, String userType, String customerType) {
		return pathologySearchDao.getAllCustomers(userCustomerName, userType, customerType);
	}*/

	@Override
	public List<LabPatchDto> getAllPatches(Integer unitId) {
		return pathologySearchDao.getAllPatches(unitId);
	}

	@Override
	public List<Doctor> getRunnerBoysByPatch(String patchId, Integer unitId) {
		return pathologySearchDao.getRunnerBoysByPatch(patchId, unitId);
	}

	@Override
	public boolean assignB2BSamples(String masterId, Integer testStatus, Integer unitId, Integer userId,
			Integer runnerBoyId) {
		return pathologySearchDao.assignB2BSamples(masterId, testStatus, unitId, userId, runnerBoyId);
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BSamplesByRunnerBoy(String emergencyFlag, Integer runnerBoyId,
			String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId) {
		return pathologySearchDao.getB2BSamplesByRunnerBoy(emergencyFlag, runnerBoyId, testStatus, unitId, userType, userCustomerType, userCustomerId);
	}

	@Override
	public List<Doctor> getAllRunnerBoys(Integer unitId) {
		return pathologySearchDao.getAllRunnerBoys(unitId);
	}

	@Override
	public boolean unassignB2BSample(String masterId, String testStatus, Integer unitId, String userId) {
		return pathologySearchDao.unassignB2BSample(masterId, testStatus, unitId, userId);
	}

	@Override
	public Integer transferB2BSamples(PathologySampleTransferDto pathologySampleTransferDto) {
		return pathologySearchDao.transferB2BSamples(pathologySampleTransferDto);
	}

	@Override
	public String getB2BAsssignAndTransferPageCount(String emergencyFlag, String testStatus, Integer unitId,
			String userType, String userCustomerType, String userCustomerId, Integer userId) {
		return pathologySearchDao.getB2BAsssignAndTransferPageCount(emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BAsssignAndTransferRecords(String emergencyFlag, Integer startIndex,
			String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId,
			Integer userId) {
		return pathologySearchDao.getB2BAsssignAndTransferRecords(emergencyFlag, startIndex, testStatus, unitId, userType, userCustomerType, userCustomerId, userId);
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BTransferedSamplesByRunnerBoy(String emergencyFlag, Integer runnerBoyId,
			String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId) {
		return pathologySearchDao.getB2BTransferedSamplesByRunnerBoy(emergencyFlag, runnerBoyId, testStatus, unitId, userType, userCustomerType, userCustomerId);
	}

	@Override
	public List<PathologySampleWiseMaster> b2BAssignAndTransferAutoSuggestion(String searchText, String searchBy,
			String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType,
			String userCustomerId) {
		return pathologySearchDao.b2BAssignAndTransferAutoSuggestion(searchText, searchBy, emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId);
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BAssignAndTransferPatientById(Integer patientId, String emergencyFlag,
			String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId) {
		return pathologySearchDao.getB2BAssignAndTransferPatientById(patientId, emergencyFlag, testStatus, unitId, userType, userCustomerType, userCustomerId);
	}

	@Override
	public List<PathologySampleWiseMaster> searchB2BAssignAndTransferRecords(String custTypeId, String custNameId,
			String fromDate, String toDate, String searchBy, Integer startIndex, String emergencyFlag,
			String testStatus, Integer unitId, String userType) {
		return pathologySearchDao.searchB2BAssignAndTransferRecords(custTypeId, custNameId, fromDate, toDate, searchBy, startIndex, emergencyFlag, testStatus, unitId, userType);
	}

	@Override
	public String getB2BAssignAndTransferRecordsCount(String custTypeId, String custNameId, String fromDate,
			String toDate, String searchBy, String emergencyFlag, String testStatus, Integer unitId, String userType) {
		return pathologySearchDao.getB2BAssignAndTransferRecordsCount(custTypeId, custNameId, fromDate, toDate, searchBy, emergencyFlag, testStatus, unitId, userType);
	}

	@Override
	public List<PathologySampleWiseMaster> getSamplesByCollectedAt(String callFrom, String tabId, Integer startIndex,
			String emergencyFlag, Integer collectedAtId, String txtFdate, String txtTdate, HttpServletRequest request) {
		return pathologySearchDao.getSamplesByCollectedAt(callFrom, tabId, startIndex, emergencyFlag, collectedAtId, txtFdate, txtTdate, request);
	}

	@Override
	public String getSamplesCountByCollectedAt(String callFrom, String tabId, String emergencyFlag,
			Integer collectedAtId, String txtFdate, String txtTdate, HttpServletRequest request) {
		return pathologySearchDao.getSamplesCountByCollectedAt(callFrom, tabId, emergencyFlag, collectedAtId, txtFdate, txtTdate, request);
	}

	@Override
	public String getDynamicTabCount(String custTypeId, String custNameId, String fromDate, String toDate,
			String callFrom, String searchBy, String emergencyFlag, HttpServletRequest request) {
		return pathologySearchDao.getDynamicTabCount(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, emergencyFlag, request);
	}

	@Override
	public String sendEmailByLifenityDomain(String emailId, String mailSubject, String mailBody, String filePath,
			String fileName, String createdBy) throws MalformedURLException, IOException {
		return pathologySearchDao.sendEmailByLifenityDomain(emailId, mailSubject, mailBody, filePath, fileName, createdBy);
	}

	@Override
	public List<PathologySampleWiseMaster> reportingPatientAutoSuggestion(String searchText, String searchBy,
			String callFrom, String tabId, String emergencyFlag, String emailStatus, HttpServletRequest request) {
		return pathologySearchDao.reportingPatientAutoSuggestion(searchText, searchBy, callFrom, tabId, emergencyFlag, emailStatus, request);
	}

	@Override
	public List<PathologySampleWiseMaster> getReportingPatientById(Integer patientId, String callFrom, String tabId,
			String emergencyFlag, HttpServletRequest request) {
		return pathologySearchDao.getReportingPatientById(patientId, callFrom, tabId, emergencyFlag, request);
	}

	@Override
	public List<PathologySampleWiseMaster> searchReportingPatient(String custTypeId, String custNameId, String fromDate,
			String toDate, String callFrom, String searchBy, String tabId, Integer startIndex, String emergencyFlag,
			String emailStatus, HttpServletRequest request) {
		return pathologySearchDao.searchReportingPatient(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, startIndex, emergencyFlag, emailStatus, request);
	}

	@Override
	public String getReportingRecordCount(String custTypeId, String custNameId, String fromDate, String toDate,
			String callFrom, String searchBy, String tabId, String emergencyFlag, String emailStatus,
			HttpServletRequest request) {
		return pathologySearchDao.getReportingRecordCount(custTypeId, custNameId, fromDate, toDate, callFrom, searchBy, tabId, emergencyFlag, emailStatus, request);
	}

	@Override
	public List<PathologySampleWiseMaster> getReportingSamplesByCollectedAt(String callFrom, String tabId, Integer startIndex,
			String emergencyFlag, Integer collectedAtId, String txtFdate, String txtTdate, String emailStatus,
			HttpServletRequest request) {
		return pathologySearchDao.getReportingSamplesByCollectedAt(callFrom, tabId, startIndex, emergencyFlag, collectedAtId, txtFdate, txtTdate, emailStatus, request);
	}

	@Override
	public String getReportingSamplesCountByCollectedAt(String callFrom, String tabId, String emergencyFlag,
			Integer collectedAtId, String txtFdate, String txtTdate, String emailStatus, HttpServletRequest request) {
		return pathologySearchDao.getReportingSamplesCountByCollectedAt(callFrom, tabId, emergencyFlag, collectedAtId, txtFdate, txtTdate, emailStatus, request);
	}

	@Override
	public List<PathologySampleWiseMaster> getAllPostedNoramlRecords(String todaysDate) {
		return pathologySearchDao.getAllPostedNoramlRecords(todaysDate);
	}

	@Override
	public HospitalDetails getHospitalInfo() {
		return pathologySearchDao.getHospitalInfo();
	}

	@Override
	public boolean acceptInPhlebotomy(String idList, HttpServletRequest request) {
		return pathologySearchDao.acceptInPhlebotomy(idList, request);
	}

	@Override
	public List<PathologySampleWiseMaster> searchDateWiseOutSourceLabReport(Integer outSourceType,
			Integer outSourceTypeId, String tabId, String fromDate, String toDate, Integer startIndex, String searchBy,
			String getTestName, String emergencyFlag,Integer departmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return pathologySearchDao.searchDateWiseOutSourceLabReport(outSourceType, outSourceTypeId, tabId, fromDate, toDate, startIndex, searchBy, getTestName, emergencyFlag,departmentId, request);
	}
	
	@Override
	public List<PathologySampleWiseMaster> searchDateWiseOutSourcedNew(
			Integer outSourceType, Integer outSourceTypeId, String tabId,
			String fromDate, String toDate, Integer startIndex, String searchBy, String emergencyFlag,Integer departmentId, HttpServletRequest request) {
		
		return pathologySearchDao.searchDateWiseOutSourcedNew(outSourceType, outSourceTypeId, tabId, fromDate, toDate, startIndex, searchBy, emergencyFlag,departmentId, request);
	}
}