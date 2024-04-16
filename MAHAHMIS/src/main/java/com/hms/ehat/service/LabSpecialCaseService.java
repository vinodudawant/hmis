package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabSpecialCasesDTO;

public interface LabSpecialCaseService {
	
	int savespecialcase(LabSpecialCasesDTO labSpecialCasesDTO,	HttpServletRequest request);
	
	public List<LabSpecialCasesDTO> getAllSpecialCase();
	
	public LabSpecialCasesDTO editSpecialCaseById(int id,HttpServletRequest request);
	
	public boolean deleteSpecialCaseById(int id,HttpServletRequest request);
	
	public List<LabSpecialCasesDTO> searchSpecialCaseByName(String name,HttpServletRequest request);


}
