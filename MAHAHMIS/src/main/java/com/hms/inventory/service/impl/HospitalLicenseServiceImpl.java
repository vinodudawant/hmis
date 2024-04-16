package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Doctor;
import com.hms.inventory.dao.HospitalLicenseDao;
import com.hms.inventory.dto.HospitalLicenseDocUploadDto;
import com.hms.inventory.dto.HospitalLicenseDto;
import com.hms.inventory.service.HospitalLicenseService;

@Service
public class HospitalLicenseServiceImpl implements HospitalLicenseService {

	@Autowired
	HospitalLicenseDao hospitalLicenseDao;

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public int[] saveHospitalLicense(String hospitalLicenseDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.saveHospitalLicense(hospitalLicenseDto,request);
	}

	@Override
	@Transactional
	public List<HospitalLicenseDto> getAllHospitalLicense(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.getAllHospitalLicense(request);
	}

	@Override
	@Transactional
	public HospitalLicenseDto editHospitalLicense(Integer hospitalLicenseId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.editHospitalLicense(hospitalLicenseId, request);
	}
	
	@Override
	@Transactional
	public int deleteHospitalLicense(Integer hospitalLicenseId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.deleteHospitalLicense(hospitalLicenseId, request);
	}
	
	@Override
	@Transactional
	public int uploadHospitalLicenseDocument(String document,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.uploadHospitalLicenseDocument(document, request);
	}

	@Override
	@Transactional
	public HospitalLicenseDocUploadDto getUploadedHospitalLicenseDocuments(
			Integer hospitalLicenseId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.getUploadedHospitalLicenseDocuments(hospitalLicenseId, request);
	}

	@Override
	@Transactional
	public Integer getAllPageCountHospitalLicense(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.getAllPageCountHospitalLicense(request);
	}

	@Override
	@Transactional
	public HospitalLicenseDto getHospitalLicensePagination(Integer startIndex,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.getHospitalLicensePagination(startIndex, request);
	}

	@Override
	@Transactional
	public String getUserLogedInDateTime(Integer userId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.getUserLogedInDateTime(userId, request);
	}

	@Override
	@Transactional
	public String getUserName(Integer userId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.getUserName(userId, request);
	}

	@Override
	@Transactional
	public List<HospitalLicenseDto> getAllHospitalLicenseReports(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.getAllHospitalLicenseReports(request);
	}

	@Override
	@Transactional
	public HospitalLicenseDto searchHospitalLicense(String searchByDate,
			String fromDate, String toDate, String searchByDocument,
			String documentName, String licenseNo, String status,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.searchHospitalLicense(searchByDate, fromDate, toDate, searchByDocument, documentName, licenseNo, status, request);
	}

	@Override
	@Transactional
	public HospitalLicenseDto hospitalLicenseDocumentAutoSuggestion(
			String documentName, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.hospitalLicenseDocumentAutoSuggestion(documentName, request);
	}

	@Override
	@Transactional
	public HospitalLicenseDto hospitalLicenseRegNOLicenseNOAutoSuggestion(
			String regNolicenseNo, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.hospitalLicenseRegNOLicenseNOAutoSuggestion(regNolicenseNo, request);
	}

	@Override
	@Transactional
	public String sendMailHospitalLicense(HospitalLicenseDto hospitalLicenseDto,String callFrom,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.sendMailHospitalLicense(hospitalLicenseDto,callFrom, request);
	}
	
	@Override
	@Transactional
	public int deleteUploadedDocumentHospitalLicense(Integer hospitalLicenseId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.deleteUploadedDocumentHospitalLicense(hospitalLicenseId, request);
	}
	
	@Override
	@Transactional
	public List<Doctor> getAllAdminUser(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return hospitalLicenseDao.getAllAdminUser(request);
	}
}
