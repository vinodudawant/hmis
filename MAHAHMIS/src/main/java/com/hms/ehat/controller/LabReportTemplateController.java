package com.hms.ehat.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.LabReportTemplateMasterDto;
import com.hms.ehat.service.LabReportTemplateService;

@RestController
@RequestMapping(value = "/labReportTemplate")
public class LabReportTemplateController {

	@Autowired
	LabReportTemplateService labReportTemplateService;
	
	@RequestMapping(value = "/getAllLabProfiles", method = RequestMethod.GET)
	public LabProfileDTO getAllLabProfiles(HttpServletRequest request) {
		LabProfileDTO dto = labReportTemplateService.getAllLabProfiles(request);
		return dto;
	}
	
	@RequestMapping(value = "/getAllTestsUnderProfile/{profileId}", method = RequestMethod.GET)
	public LabProfileDTO getAllTestsUnderProfile(@PathVariable("profileId") Integer profileId, HttpServletRequest request) {
		LabProfileDTO dto = labReportTemplateService.getAllTestsUnderProfile(profileId, request);
		return dto;
	}
	
	@RequestMapping(value = "/saveLabReportTemplate", method = RequestMethod.POST)
	public String saveLabReportTemplate(LabReportTemplateMasterDto dto) {
		return  labReportTemplateService.saveLabReportTemplate(dto);
	}
	
	@RequestMapping(value = "/getAllReportTemplates", method = RequestMethod.GET)
	public LabReportTemplateMasterDto getAllReportTemplates(@RequestParam("unitId") Integer unitId) {
		LabReportTemplateMasterDto dto = labReportTemplateService.getAllReportTemplates(unitId);
		return dto;
	}
	
	@RequestMapping(value = "/editLabReportTemplate/{id}", method = RequestMethod.GET)
	public LabReportTemplateMasterDto editLabReportTemplate(@PathVariable("id") Integer id) {
		LabReportTemplateMasterDto dto = labReportTemplateService.editLabReportTemplate(id);
		return dto;
	}
}