package com.hms.pathology.serviceImpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dto.LabPhlebotomyMaster;
import com.hms.ehat.dto.LabResultMstViewDto;
import com.hms.pathology.dao.LabTestResultDao;
import com.hms.pathology.service.LabTestResultService;

@Service
@Transactional
public class LabTestResultServiceImpl implements LabTestResultService{
	@Autowired
	private LabTestResultDao labTestResultDao;

	@Override
	public LabResultMstViewDto getAllCurrentLabTestResult(String patienTtype,String callFrom,
			HttpServletRequest request) {
		return labTestResultDao.getAllCurrentLabTestResult(patienTtype,callFrom, request);
	}

	@Override
	public String getPageCount(String patienTtype, String callFrom) {
		return labTestResultDao.getPageCount(patienTtype,callFrom);
	}

	@Override
	public LabResultMstViewDto getAllRecordsforPagination(Integer startIndex, String patientType, String callFrom) {
		return labTestResultDao.getAllRecordsforPagination(startIndex, patientType, callFrom);
	}

	@Override
	public LabResultMstViewDto searchLabTestResult(String searchText, String patientType, String callFrom,
			String callFromTab, String searchBy, String fromDate, String toDate) {
		return labTestResultDao.searchLabTestResult(searchText, patientType, callFrom, callFromTab, searchBy, fromDate, toDate);
	}

	@Override
	public LabResultMstViewDto getLabTestResultById(Integer patientId, String callFromTab) {
		return labTestResultDao.getLabTestResultById(patientId, callFromTab);
	}


	@Override
	public LabPhlebotomyMaster searchProcessAreaResult(String searchText, String patientType, String callFrom,
			String callFromTab, String searchBy, String fromDate, String toDate) {
		return labTestResultDao.searchProcessAreaResult(searchText, patientType, callFrom, callFromTab, searchBy, fromDate, toDate);
	}

	@Override
	public LabPhlebotomyMaster getProcessAreaResultById(Integer patientId, String callFromTab) {
		return labTestResultDao.getProcessAreaResultById(patientId, callFromTab);
	}
}