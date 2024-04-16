package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.hms.doctordesk.dto.OpdDocumentUploadDto;
import com.hms.doctordesk.dto.ImmunizationConfigurationMaster;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.doctordesk.dto.VitalMaster;
import com.hms.ehat.dto.DoctorDto;
import com.hms.pharmacy.pojo.PreparationMaster;

public interface OpdDocumentUploadService {

	int uploadDoctorDeskDocument(OpdDocumentUploadDto obj, Integer patientId, Integer treatmentId,
			MultipartFile[] uploadDocs, HttpServletRequest request);

	List<OpdDocumentUploadDto> getAllOPDDocuments(Integer patientId, Integer treatmentId,HttpServletRequest request);

	boolean deleteOPDDocuments(Integer documentId, HttpServletRequest request);
	OpdDocumentUploadDto editOPDDocuments(Integer documentId);

}
