package com.hms.ipd.nurshing.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.hms.ipd.nurshing.dto.NursingDocumentDTO;

public interface NursingDocumentDao {

	int uploadNursingDocument(NursingDocumentDTO obj, Integer patientId, Integer treatmentId,
			MultipartFile[] uploadDocs, HttpServletRequest request);
	
	List<NursingDocumentDTO> getNursingDocument(Integer patientId, Integer treatmentId, HttpServletRequest request);

	boolean deleteNursingDocuments(Integer documentId, HttpServletRequest request);

}
