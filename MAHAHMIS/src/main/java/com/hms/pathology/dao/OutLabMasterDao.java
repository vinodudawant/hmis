package com.hms.pathology.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.SubServiceDto;
import com.hms.pathology.dto.OutLabMasterDto;

public interface OutLabMasterDao {

	List<SubServiceDto> autoSuggestionForTestName(String testname);

	public int saveOutLabMaster(OutLabMasterDto outLabMasterDto,
			String outlabrGeneralInfoDtoList,
			String outlabContactInfoDtoList,
			String outlabAddressInfoDtoList,
			String outlabPaymentInfoDtoList,
			String outlabTermsAndConditionInfoDtoList,
			String outlabTestInfoDetails,
			HttpServletRequest request);
	
	public List<OutLabMasterDto> getAllOutLabMaster();
	
	boolean deleteOutLabMasterId(Integer outlabmasterId, HttpServletRequest request);
	
	public OutLabMasterDto editOutLabMasterById(Integer outlabmasterId);

	public boolean deleteOutLabMasterSlave(Integer outlabslaveId,Integer labMasterId, String callFrom, 
			HttpServletRequest request);
	
	public OutLabMasterDto outLabMasterAutoSuggestion(String outLabName, HttpServletRequest request);
	
	public OutLabMasterDto getOutLabLabMasterById(Integer outlabmasterId, HttpServletRequest request);
	
	public List<OutLabMasterDto> getAllOutLabMasterByTestId(int testId);
}
