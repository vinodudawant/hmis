package com.hms.ivf.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;


import com.hms.ivf.dto.IvfDocumentUploadDto;

public interface IvfDocumentUploadService {


	int uploadDoctorDeskDocument(IvfDocumentUploadDto obj, Integer patientId, Integer treatmentId,
			MultipartFile[] uploadDocs,Integer ivftreatmentId, HttpServletRequest request);

	List<IvfDocumentUploadDto> getAllOPDDocuments(Integer patientId, Integer treatmentId,HttpServletRequest request);

	boolean deleteOPDDocuments(Integer documentId, HttpServletRequest request);
	IvfDocumentUploadDto editOPDDocuments(Integer documentId);



}
