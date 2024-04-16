package com.hms.administrator.dao;

import java.util.List;

import com.hms.administrator.dto.SymptomsDetailsDto;

public interface SymptomDetailsDao {

	public String saveSymptomDetails(int specializationId, List<SymptomsDetailsDto> symptomsDetailsDtoList);
	public List<SymptomsDetailsDto> fetchSymptomDetails(int specializationId);
	public boolean deleteSymptomDetails(int[] symptomDetailIds, int userId);
}
