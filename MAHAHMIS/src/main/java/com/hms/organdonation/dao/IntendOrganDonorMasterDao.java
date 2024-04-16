package com.hms.organdonation.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.IntendOrganDonorMasterDto;

public interface IntendOrganDonorMasterDao {
	
	int saveIntendOrganDonorMaster(IntendOrganDonorMasterDto obj,HttpServletRequest request);

	List<IntendOrganDonorMasterDto> getAllIntendOrganDonorMaster(HttpServletRequest request);

	IntendOrganDonorMasterDto editIntendOrganDonorMaster(Integer intendOrganDonorId);

	boolean deleteIntendOrganDonorMaster(Integer intendOrganDonorId,
			HttpServletRequest request);

	List<IntendOrganDonorMasterDto> intendOrganDonorMasterAutoSuggestion(String intendOrganDonor);
}
