package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.DocumentNumberingMaster;

public interface DocumentNumberingDao {
	Boolean saveOrUpdateDocumentNumbering(
			DocumentNumberingMaster documentNumberingMaster);

	List<DocumentNumberingMaster> getDocumentNumberings();

	Boolean deleteDocumentNumbering(Integer documentNumId);

	List<DocumentNumberingMaster> getDocumentNumberingById(Integer documentNumId);
	
	Boolean updateDocumentNumbering(DocumentNumberingMaster docNumberingMaster);

}
