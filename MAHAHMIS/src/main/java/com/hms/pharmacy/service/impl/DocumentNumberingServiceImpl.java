package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.DocumentNumberingDao;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.service.DocumentNumberingService;

@Service
public class DocumentNumberingServiceImpl implements DocumentNumberingService {
	@Autowired
	DocumentNumberingDao documentNumberingDao;

	@Override
	@Transactional
	public Boolean deleteDocumentNumbering(Integer documentNumId) {
		// TODO Auto-generated method stub
		return documentNumberingDao.deleteDocumentNumbering(documentNumId);
	}

	@Override
	@Transactional
	public Boolean updateDocumentNumbering(
			DocumentNumberingMaster docNumberingMaster) {
		// TODO Auto-generated method stub
		return documentNumberingDao.updateDocumentNumbering(docNumberingMaster);
	}
	
	@Override
	@Transactional
	public List<DocumentNumberingMaster> getDocumentNumberingById(
			Integer documentNumId) {
		return documentNumberingDao.getDocumentNumberingById(documentNumId);
	};

	@Override
	@Transactional
	public List<DocumentNumberingMaster> getDocumentNumberings() {
		// TODO Auto-generated method stub
		return documentNumberingDao.getDocumentNumberings();
	}

	@Override
	@Transactional
	public Boolean saveOrUpdateDocumentNumbering(
			DocumentNumberingMaster documentNumberingMaster) {

		documentNumberingMaster.setDocDeleteFlag(0);
		documentNumberingMaster.setDocUpdateDate(new Date(new java.util.Date()
				.getTime()));
		return documentNumberingDao
				.saveOrUpdateDocumentNumbering(documentNumberingMaster);
	};
}
