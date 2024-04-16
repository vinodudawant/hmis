package com.hms.ipd.nurshing.serviceimpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hms.ipd.nurshing.dao.NursingDocumentDao;
import com.hms.ipd.nurshing.dto.NursingDocumentDTO;
import com.hms.ipd.nurshing.service.NursingDocumentService;

@Service
@Transactional
public class NursingDocumentServiceImpl implements NursingDocumentService{
	
	@Autowired
	NursingDocumentDao nursingDocumentDao;

	@Override
	public int uploadNursingDocument(NursingDocumentDTO obj, Integer patientId, Integer treatmentId,
			MultipartFile[] uploadDocs, HttpServletRequest request) {
		
		return nursingDocumentDao.uploadNursingDocument(obj, patientId, treatmentId, uploadDocs, request);
	}

	@Override
	public List<NursingDocumentDTO> getNursingDocument(Integer patientId, Integer treatmentId,
			HttpServletRequest request) {
		
			return nursingDocumentDao.getNursingDocument(patientId, treatmentId, request);
	}

	@Override
	public boolean deleteNursingDocuments(Integer documentId, HttpServletRequest request) {
	
		return nursingDocumentDao.deleteNursingDocuments(documentId,request);
	}

}
