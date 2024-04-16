package com.hms.organdonation.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.SurgeryTechniqueDto;

public interface SurgeryTechniqueService {

	int saveSurgeryTechnique(SurgeryTechniqueDto obj, HttpServletRequest request);

	List<SurgeryTechniqueDto> getAllSurgeryTechnique(HttpServletRequest request);

	SurgeryTechniqueDto editSurgeryTechnique(Integer stId);

	boolean deleteSurgeryTechnique(Integer stId, HttpServletRequest request);
	
	List<SurgeryTechniqueDto> surgeryTechniqueAutoSuggestion(String stName);

}
