package com.hms.histopath.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.histopath.dto.HistopathMaster;

public interface HistoPathService {

	List<HistopathMaster> searchHistopathTestPatient(String custTypeId, String custNameId, String fromDate, String toDate,  String searchBy, Integer startIndex, String emergencyFlag,Integer patientType, String searchTypeby, Integer statuscodea, Integer statuscodeb, String callFrom, HttpServletRequest request);

	List<HistopathMaster> histoPathoPatientAutosuggestion(String searchText, String searchBy, String callFrom,
			String tabId, String emergencyFlag, Integer statuscodeA, Integer statuscodeB,HttpServletRequest request);

	HistopathMaster getHistopathResultById(Integer patientId, String callFromTab,HttpServletRequest request);

	String updateHistoStatus(Integer histopathMasterId,Integer statusCode,HttpServletRequest request);

	String getSearchRecordCount(String custTypeId, String custNameId, String fromDate, String toDate, String searchBy,
			Integer startIndex, String emergencyFlag, Integer patientType, String searchTypeby, Integer statuscodea,
			Integer statuscodeb, String callFrom, HttpServletRequest request);

	
	

}
