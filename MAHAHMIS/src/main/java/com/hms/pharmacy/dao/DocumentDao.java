package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DocumentMaster;

public interface DocumentDao {
	Boolean saveOrUpdateDocument(DocumentMaster DocumentMaster);

	List<DocumentMaster> getDocuments();

	Boolean deleteDocument(Integer documentId);

	List<DocumentMaster> getAutoSuggestionDocumentNames(String letter);

	List<DocumentMaster> getDocumentById(Integer documentId);
	
	DocumentMaster getDocumentByIdForDate(Integer DocumentMaster);
}
