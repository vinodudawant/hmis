package com.hms.organdonation.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.PreservationMethodMasterDto;

public interface PreservationMethodMasterDao {
	
	int savePreservationMethodMaster(PreservationMethodMasterDto obj, HttpServletRequest request);

	List<PreservationMethodMasterDto> getAllPreservationMethodMaster(HttpServletRequest request);

	PreservationMethodMasterDto editPreservationMethodMaster(Integer preservationMethodMasterId);

	List<PreservationMethodMasterDto> preservationMethodMasterAutoSuggestion(String preservationMethodName);

	boolean deletePreservationMethodMaster(Integer preservationMethodMasterId, HttpServletRequest request);


}
