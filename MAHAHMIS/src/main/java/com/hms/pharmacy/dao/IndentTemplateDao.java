package com.hms.pharmacy.dao;

import java.util.List;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.IndentTemplateMaster;

public interface IndentTemplateDao {

	void saveIndentTemplate(IndentTemplateMaster indentTemplateMaster);

	JSONArray getIndentTemplateDetails();

	List<IndentTemplateMaster> getIndentTemplateDetailsById(
			Integer indentTemplateId);

	void deleteIndentTemplateDetails(Integer indentTemplateId);

}
