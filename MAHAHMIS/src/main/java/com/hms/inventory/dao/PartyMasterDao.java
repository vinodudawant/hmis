package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.PartyMasterDto;

public interface PartyMasterDao {

	public int savePartyMaster(PartyMasterDto partyMasterDto,
			String partyMasterGeneralInfoDtoList,
			String partyMasterContactInfoDtoList,
			String partyMasterAddressInfoDtoList,
			String partyMasterPaymentInfoDtoList,
			String partyMasterTermsAndConditionInfoDtoList, 
			HttpServletRequest request);

	public List<PartyMasterDto> getAllPartyMaster(Integer unitId);

	public PartyMasterDto editPartyMaster(Integer partyMasterId);

	public boolean deletePartyMaster(Integer partyMasterId,
			HttpServletRequest request);

	public PartyMasterDto partyMasterAutoSuggestion(String partyMasterName);

	public PartyMasterDto getPartyMasterById(Integer partyMasterId);
	public boolean deletePartyMasterSlave(Integer partyMasterSlaveId,Integer partyMasterId,String callFrom,
			HttpServletRequest request);
	public Integer getPageCountAllPartyMaster();
}