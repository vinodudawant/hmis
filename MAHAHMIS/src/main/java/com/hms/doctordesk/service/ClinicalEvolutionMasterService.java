package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.ClinicalEvolutionMasterDto;

public interface ClinicalEvolutionMasterService {

	int saveClinicalEvolutionMaster(ClinicalEvolutionMasterDto clinical, HttpServletRequest request);

	List<ClinicalEvolutionMasterDto> getAllClinialEvolutionMaster(HttpServletRequest request);

	ClinicalEvolutionMasterDto editClinicalEvolutionMaster(Integer clinicalId);

	boolean deleteClinicalEvolutionMaster(Integer clinicalId, HttpServletRequest request);

	List<ClinicalEvolutionMasterDto> centerClinicalEvolutionAutoSuggestion(String clinicalName,String clinicalCode);

}
