package com.hms.organdonation.service;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.PreservationMethodMasterDto;

public interface PreservationMethodMasterService {
	
	int savePreservationMethodMaster(PreservationMethodMasterDto obj, HttpServletRequest request);

	List<PreservationMethodMasterDto> getAllPreservationMethodMaster(HttpServletRequest request);

	PreservationMethodMasterDto editPreservationMethodMaster(Integer preservationMethodMasterId);

	List<PreservationMethodMasterDto> preservationMethodMasterAutoSuggestion(String preservationMethodName);

	boolean deletePreservationMethodMaster(Integer preservationMethodMasterId, HttpServletRequest request);


	
}
