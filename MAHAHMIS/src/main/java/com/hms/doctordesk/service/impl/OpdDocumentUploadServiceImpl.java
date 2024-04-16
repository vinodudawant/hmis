package com.hms.doctordesk.service.impl;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hms.doctordesk.dao.OpdDocumentUploadDao;
import com.hms.doctordesk.dto.OpdDocumentUploadDto;
import com.hms.doctordesk.service.OpdDocumentUploadService;
import com.hms.ehat.dto.DoctorDto;

@Service
@Transactional
public class OpdDocumentUploadServiceImpl implements OpdDocumentUploadService {
	
	@Autowired
	OpdDocumentUploadDao opdDocumentUploadDao;

	@Override
	public int uploadDoctorDeskDocument(OpdDocumentUploadDto obj,Integer patientId,Integer treatmentId, MultipartFile[] uploadDocs,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return opdDocumentUploadDao.uploadDoctorDeskDocument(obj,patientId,treatmentId,uploadDocs, request);
	}

	@Override
	public List<OpdDocumentUploadDto> getAllOPDDocuments(Integer patientId,Integer treatmentId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return opdDocumentUploadDao.getAllOPDDocuments(patientId,treatmentId,request);
	}

	@Override
	public boolean deleteOPDDocuments(Integer documentId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return opdDocumentUploadDao.deleteOPDDocuments(documentId,request);
	}

	@Override
	public OpdDocumentUploadDto editOPDDocuments(Integer documentId) {
		// TODO Auto-generated method stub
		return opdDocumentUploadDao.editOPDDocuments(documentId);
	}
}
