package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabGradingsDto;
import com.hms.pathology.dto.LabTestDTO;

public interface LabGradingsService {
	
	public Integer saveLabGrading(LabGradingsDto labGradingsDto, HttpServletRequest request);
	
	public List<LabGradingsDto> getAllGradings(Integer unitId);
	
	public LabGradingsDto editLabGrading(Integer id, HttpServletRequest request);
	
	public boolean deleteLabGrading(Integer id, HttpServletRequest request);
	
	public List<LabGradingsDto> searchGradings(String name, Integer unitId, HttpServletRequest request);
	
	public List<LabTestDTO> getAllLabTests(Integer unitId);
}