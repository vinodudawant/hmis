package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.SymptomsDetailsDto;

public interface SymptomDetailsService {

	public String saveSymptomDetails(int specializationId, String symptomDetailsString, HttpServletRequest request);
	public List<SymptomsDetailsDto> getSymptomDetails(int specializationId);
	public boolean removeSymptomDetails(int[] symptomDetailIds, HttpServletRequest request);
}
