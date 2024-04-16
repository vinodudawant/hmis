package com.hms.ivf.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hms.ivf.dao.IvfDocumentUploadDao;
import com.hms.ivf.dto.IvfDocumentUploadDto;
import com.hms.ivf.service.IvfDocumentUploadService;

@Service
@Transactional
public class IvfDocumentUploadServiceImpl implements IvfDocumentUploadService{
	
	@Autowired
	IvfDocumentUploadDao ivfdao;

	@Override
	public int uploadDoctorDeskDocument(IvfDocumentUploadDto obj, Integer patientId, Integer treatmentId,
			MultipartFile[] uploadDocs,Integer ivftreatmentId, HttpServletRequest request) {
		
		return ivfdao.uploadDoctorDeskDocument(obj, patientId, treatmentId, uploadDocs, ivftreatmentId, request);
	}

	@Override
	public List<IvfDocumentUploadDto> getAllOPDDocuments(Integer patientId, Integer treatmentId,
			HttpServletRequest request) {
		
		return ivfdao.getAllOPDDocuments(patientId, treatmentId, request);
	}

	@Override
	public boolean deleteOPDDocuments(Integer documentId, HttpServletRequest request) {
		
		return ivfdao.deleteOPDDocuments(documentId, request);
	}

	@Override
	public IvfDocumentUploadDto editOPDDocuments(Integer documentId) {
		
		return ivfdao.editOPDDocuments(documentId);
	}

}
