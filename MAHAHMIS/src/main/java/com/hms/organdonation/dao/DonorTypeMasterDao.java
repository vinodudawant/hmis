package com.hms.organdonation.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.DonorTypeMasterDto;

public interface DonorTypeMasterDao {
	
	int saveDonorTypeMaster(DonorTypeMasterDto obj,HttpServletRequest request);
	
	List<DonorTypeMasterDto> getAllDonorTypeMaster(HttpServletRequest request);
	
	DonorTypeMasterDto editDonorTypeMaster(Integer donorTypeId);

	boolean deleteDonorTypeMaster(Integer donorTypeId,
			HttpServletRequest request);
	
	List<DonorTypeMasterDto> donorTypeMasterAutoSuggestion(String donorType);
}
