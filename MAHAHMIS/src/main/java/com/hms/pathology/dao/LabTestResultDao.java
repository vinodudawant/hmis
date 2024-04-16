package com.hms.pathology.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabPhlebotomyMaster;
import com.hms.ehat.dto.LabResultMstViewDto;

public interface LabTestResultDao {
	
	public LabResultMstViewDto getAllCurrentLabTestResult(String patienTtype,String callFrom,HttpServletRequest request);
	public String getPageCount(String patienTtype,String callFrom);
	public LabResultMstViewDto getAllRecordsforPagination(Integer startIndex, String patientType, String callFrom);
	public LabResultMstViewDto searchLabTestResult(String searchText, String patientType, String callFrom, String callFromTab, String searchBy, String fromDate, String toDate);
	public LabResultMstViewDto getLabTestResultById(Integer patientId, String callFromTab);
	
	public LabPhlebotomyMaster searchProcessAreaResult(String searchText, String patientType, String callFrom, String callFromTab, String searchBy, String fromDate, String toDate);
	public LabPhlebotomyMaster getProcessAreaResultById(Integer patientId, String callFromTab);
}
