package com.hms.histopath.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.hms.histopath.dao.HistoPathDao;
import com.hms.histopath.dto.HistopathMaster;
import com.hms.histopath.service.HistoPathService;

@Service
@Transactional
public class HistoPathServiceImpl implements HistoPathService{
 @Autowired
 HistoPathDao histoPathDao;
 
 @Override
 public List<HistopathMaster> searchHistopathTestPatient(String custTypeId, String custNameId, String fromDate,
			String toDate, String searchBy, Integer startIndex, String emergencyFlag, Integer patientType,
			String searchTypeby, Integer statuscodea, Integer statuscodeb, String callFrom, HttpServletRequest request){
		return histoPathDao.searchHistopathTestPatient(custTypeId, custNameId, fromDate, toDate,  searchBy,startIndex,   emergencyFlag,patientType,searchTypeby,statuscodea,statuscodeb,callFrom, request);
	}

@Override
public List<HistopathMaster> histoPathoPatientAutosuggestion(String searchText, String searchBy, String callFrom,
		String tabId, String emergencyFlag,Integer statuscodeA,Integer statuscodeB, HttpServletRequest request) {
	return histoPathDao.histoPathoPatientAutosuggestion(searchText, searchBy, callFrom, tabId, emergencyFlag,statuscodeA,statuscodeB,request);
}

@Override
public HistopathMaster getHistopathResultById(Integer patientId, String callFromTab,HttpServletRequest request) {
	return histoPathDao.getHistopathResultById(patientId,callFromTab,request);
}

@Override
public String updateHistoStatus(Integer histopathMasterId,Integer statusCode,HttpServletRequest request) {
	return histoPathDao.getUpdateHistoStatus(histopathMasterId,statusCode,request);
}

@Override
public String getSearchRecordCount(String custTypeId, String custNameId, String fromDate, String toDate,
		String searchBy, Integer startIndex, String emergencyFlag, Integer patientType, String searchTypeby,
		Integer statuscodea, Integer statuscodeb, String callFrom, HttpServletRequest request) {
	return histoPathDao.getSearchRecordCount(custTypeId, custNameId, fromDate, toDate,  searchBy,startIndex,   emergencyFlag,patientType,searchTypeby,statuscodea,statuscodeb,callFrom, request);
}







 
}
