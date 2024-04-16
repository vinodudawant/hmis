package com.hms.pharmacy.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.IndentTemplateDao;
import com.hms.pharmacy.pojo.IndentTemplateMaster;
import com.hms.pharmacy.service.IndentTemplateService;

@Service
public class IndentTemplateServiceImpl implements IndentTemplateService{

	@Autowired
	IndentTemplateDao indentTemplateDao;
	
	@Override
	@Transactional
	public void saveIndentTemplate(IndentTemplateMaster indentTemplateMaster) {
		indentTemplateDao.saveIndentTemplate(indentTemplateMaster);
	}


	@Override
	@Transactional
	public JSONArray getIndentTemplateDetails() {
		return indentTemplateDao.getIndentTemplateDetails();
	}


	@Override
	@Transactional
	public List<IndentTemplateMaster> getIndentTemplateDetailsById(
			Integer indentTemplateId) {
		return indentTemplateDao.getIndentTemplateDetailsById(indentTemplateId);
	}


	@Override
	@Transactional
	public void deleteIndentTemplateDetails(Integer indentTemplateId) {
		indentTemplateDao.deleteIndentTemplateDetails(indentTemplateId);
	}
	
	
}
