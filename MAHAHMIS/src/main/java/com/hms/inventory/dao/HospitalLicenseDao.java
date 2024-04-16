package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Doctor;
import com.hms.inventory.dto.HospitalLicenseDocUploadDto;
import com.hms.inventory.dto.HospitalLicenseDto;

public interface HospitalLicenseDao {
	
	public int[] saveHospitalLicense(String obj, HttpServletRequest request);
	
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

	HospitalLicenseDto hospitalLicenseRegNOLicenseNOAutoSuggestion(
			String regNolicenseNo, HttpServletRequest request);

	HospitalLicenseDto hospitalLicenseDocumentAutoSuggestion(
			String documentName, HttpServletRequest request);
	
	public String sendMailHospitalLicense(HospitalLicenseDto hospitalLicenseDto,String callFrom,
			HttpServletRequest request);

	public int deleteUploadedDocumentHospitalLicense(Integer hospitalLicenseId,
			HttpServletRequest request);

	public List<Doctor> getAllAdminUser(HttpServletRequest request);
	
}
