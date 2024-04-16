package com.hms.ehat.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.LabReportTemplateMasterDto;

public interface LabReportTemplateDao {

	public LabProfileDTO getAllLabProfiles(HttpServletRequest request);
	
	public LabProfileDTO getAllTestsUnderProfile(Integer profileId, HttpServletRequest request);
	
	public String saveLabReportTemplate(LabReportTemplateMasterDto dto);
	
	public LabReportTemplateMasterDto getAllReportTemplates(Integer unitId);

	public LabReportTemplateMasterDto editLabReportTemplate(Integer id);
}