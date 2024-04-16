package com.hms.pharmacy.service;

import java.util.List;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.IndentTemplateMaster;

public interface IndentTemplateService {

	void saveIndentTemplate(IndentTemplateMaster newIndentMaster);

	JSONArray getIndentTemplateDetails();

	List<IndentTemplateMaster> getIndentTemplateDetailsById(
			Integer indentTemplateId);

	void deleteIndentTemplateDetails(Integer indentTemplateId);

}
