package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.ClinicalEvolutionMasterDto;

public interface ClinicalEvolutionMasterDao {

	int saveClinicalEvolutionMaster(ClinicalEvolutionMasterDto clinical, HttpServletRequest request);

	List<ClinicalEvolutionMasterDto> getAllClinialEvolutionMaster(HttpServletRequest request);

	ClinicalEvolutionMasterDto editClinicalEvolutionMaster(Integer clinicalId);

	boolean deleteClinicalEvolutionMaster(Integer clinicalId, Integer userId);

	List<ClinicalEvolutionMasterDto> centerClinicalEvolutionAutoSuggestion(String clinicalName, String clinicalCode);

}
