package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.DocumentDao;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.service.DocumentService;

@Service
public class DocumentServiceImpl implements DocumentService {

	@Autowired
	DocumentDao documentDao;

	@Override
	@Transactional
	public Boolean saveOrUpdateDocument(DocumentMaster documentMaster) {
		// TODO Auto-generated method stub

		if(documentMaster.getDocId()==null)
		{
			documentMaster.setDocDeleteFlag(0);
			documentMaster.setDocumentAddDate(new Date(new java.util.Date()
					.getTime()));
			documentMaster
			.setDocUpdateDate(new Date(new java.util.Date().getTime()));
		}
		else
		{
			
			
			DocumentMaster documentMaster2= documentDao.getDocumentByIdForDate(documentMaster.getDocId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			documentMaster.setDocumentAddDate(documentMaster2.getDocumentAddDate());
			documentMaster.setDocDeleteFlag(0);
			documentMaster.setDocUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
					
	
		if (documentDao.saveOrUpdateDocument(documentMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public Boolean deleteDocument(Integer documentId) {
		return documentDao.deleteDocument(documentId);

	};

	@Override
	@Transactional
	public List<DocumentMaster> getAutoSuggestionDocumentNames(String letter) {
		// TODO Auto-generated method stub
		return documentDao.getAutoSuggestionDocumentNames(letter);
	}

	
	@Override
	@Transactional
	public List<DocumentMaster> getDocumentById(Integer documentId) {
		// TODO Auto-generated method stub
		return documentDao.getDocumentById(documentId);
	}	
	
	@Override
	@Transactional
	public List<DocumentMaster> getDocuments() {
		// TODO Auto-generated method stub
		return documentDao.getDocuments();
	}
}
