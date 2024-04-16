package com.hms.organdonation.service;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.IntendOrganDonorMasterDto;

public interface IntendOrganDonorMasterService {
	
	int saveIntendOrganDonorMaster(IntendOrganDonorMasterDto obj,HttpServletRequest request);

	List<IntendOrganDonorMasterDto> getAllIntendOrganDonorMaster(HttpServletRequest request);

	IntendOrganDonorMasterDto editIntendOrganDonorMaster(Integer intendOrganDonorId);

	boolean deleteIntendOrganDonorMaster(Integer intendOrganDonorId,
			HttpServletRequest request);

	List<IntendOrganDonorMasterDto> intendOrganDonorMasterAutoSuggestion(String intendOrganDonor);

}
