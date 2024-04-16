package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Doctor;
import com.hms.inventory.dto.HospitalLicenseDocUploadDto;
import com.hms.inventory.dto.HospitalLicenseDto;

public interface HospitalLicenseService {

	public int[] saveHospitalLicense(String obj,HttpServletRequest request);

	public List<HospitalLicenseDto> getAllHospitalLicense(
			HttpServletRequest request);

	public HospitalLicenseDto editHospitalLicense(Integer hospitalLicenseId, HttpServletRequest request);
	
	public int deleteHospitalLicense(Integer hospitalLicenseId, HttpServletRequest request);
	
	public Integer getAllPageCountHospitalLicense(HttpServletRequest request);

	public HospitalLicenseDto getHospitalLicensePagination(Integer startIndex, HttpServletRequest request);
	
	public int uploadHospitalLicenseDocument(String document, HttpServletRequest request);
	
	public HospitalLicenseDocUploadDto getUploadedHospitalLicenseDocuments(Integer hospitalLicenseId,HttpServletRequest request);
	
	String getUserLogedInDateTime(Integer userId, HttpServletRequest request);

	String getUserName(Integer userId, HttpServletRequest request);
	public List<HospitalLicenseDto> getAllHospitalLicenseReports(
			HttpServletRequest request);

	public HospitalLicenseDto searchHospitalLicense(String searchByDate,
			String fromDate, String toDate, String searchByDocument,
			String documentName, String licenseNo, String status,
			HttpServletRequest request);

	public HospitalLicenseDto hospitalLicenseDocumentAutoSuggestion(
			String documentName, HttpServletRequest request);
	
	public HospitalLicenseDto hospitalLicenseRegNOLicenseNOAutoSuggestion(
			String regNolicenseNo, HttpServletRequest request);

	public String sendMailHospitalLicense(HospitalLicenseDto hospitalLicenseDto,String callFrom,
			HttpServletRequest request);

	int deleteUploadedDocumentHospitalLicense(Integer hospitalLicenseId,
			HttpServletRequest request);

	List<Doctor> getAllAdminUser(HttpServletRequest request);
	
}
