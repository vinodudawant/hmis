package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabMicroorganismsDto;
import com.hms.pathology.dto.LabTestDTO;

public interface LabMicroorganismsDao {

	public Integer saveMicroorganisms(LabMicroorganismsDto labMicroorganismsDto, HttpServletRequest request);
	
	public List<LabMicroorganismsDto> getAllMicroorganisms(Integer unitId);
	
	public LabMicroorganismsDto editMicroorganism(Integer id, HttpServletRequest request);
	
	public boolean deleteMicroorganism(Integer id, HttpServletRequest request);
	
	public List<LabMicroorganismsDto> searchMicroorganisms(String name, Integer unitId, HttpServletRequest request);
	
	public List<LabTestDTO> getAllLabTests(Integer unitId);
}
