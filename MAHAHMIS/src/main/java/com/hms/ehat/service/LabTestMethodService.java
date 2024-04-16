package com.hms.ehat.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabTestMethodDTO;

public interface LabTestMethodService {
	
	public String saveTestMethod(LabTestMethodDTO dto, HttpServletRequest request);
	public LabTestMethodDTO getAllTestMethods(String searchText, String type);
	public LabTestMethodDTO editTestMethod(int testMethodId);
	public boolean deleteTestMethod(int testMethodId, HttpServletRequest request);

}
