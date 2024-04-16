package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.PresTemplateMaster;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;

public interface PrescriptionInstructionService {

String savePreInstrutionDetals(PrescriptionInstructionDto prescriptionInstructionDto,HttpServletRequest request);
	
	List<PrescriptionInstructionDto> getAllPreDetails(HttpServletRequest request);
	
	List<PrescriptionInstructionDto> getAllPreDetailsById(int id);
	
	List<PrescriptionInstructionDto> getAllPreDetailByName(String searchText,HttpServletRequest request);
	
	String saveTemplate(PresTemplateMaster presTemplateMaster,HttpServletRequest request);
	
	List<PresTemplateMaster> getTemplateList( HttpServletRequest request);
	
    List<PresTemplateMaster> getInstListByTempId(int templateId);
    
    String deletePrescript(int id,HttpServletRequest request);
    
    String deleteTemplate(int id,HttpServletRequest request);
	
}