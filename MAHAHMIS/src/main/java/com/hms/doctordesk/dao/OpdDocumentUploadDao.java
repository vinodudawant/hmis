package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.hms.doctordesk.dto.OpdDocumentUploadDto;

public interface OpdDocumentUploadDao {
	
	int uploadDoctorDeskDocument(OpdDocumentUploadDto obj, Integer patientId, Integer treatmentId,
			MultipartFile[] uploadDocs, HttpServletRequest request);

	List<OpdDocumentUploadDto> getAllOPDDocuments(Integer patientId, Integer treatmentId, HttpServletRequest request);

	boolean deleteOPDDocuments(Integer documentId, HttpServletRequest request);
	OpdDocumentUploadDto editOPDDocuments(Integer documentId);
}
