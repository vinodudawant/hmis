package com.hms.ehat.service.impl;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.LabReportTemplateDao;
import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.LabReportTemplateMasterDto;
import com.hms.ehat.service.LabReportTemplateService;

@Service
@Transactional
public class LabReportTemplateServiceImpl implements LabReportTemplateService {

	@Autowired
	LabReportTemplateDao labReportTemplateDao;


	@Override
	public LabProfileDTO getAllLabProfiles(HttpServletRequest request) {
		return labReportTemplateDao.getAllLabProfiles(request);
	}

	@Override
	public LabProfileDTO getAllTestsUnderProfile(Integer profileId, HttpServletRequest request) {
		return labReportTemplateDao.getAllTestsUnderProfile(profileId, request);
	}

	@Override
	public String saveLabReportTemplate(LabReportTemplateMasterDto dto) {
		return labReportTemplateDao.saveLabReportTemplate(dto);
	}

	@Override
	public LabReportTemplateMasterDto getAllReportTemplates(Integer unitId) {
		return labReportTemplateDao.getAllReportTemplates(unitId);
	}

	@Override
	public LabReportTemplateMasterDto editLabReportTemplate(Integer id) {
		return labReportTemplateDao.editLabReportTemplate(id);
	}
}