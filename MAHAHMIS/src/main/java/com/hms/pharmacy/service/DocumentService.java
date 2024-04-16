package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.DocumentMaster;

public interface DocumentService {
	Boolean saveOrUpdateDocument(DocumentMaster DocumentMaster);

	List<DocumentMaster> getDocuments();

	Boolean deleteDocument(Integer documentId);

	List<DocumentMaster> getAutoSuggestionDocumentNames(String letter);

	List<DocumentMaster> getDocumentById(Integer documentId);
}
