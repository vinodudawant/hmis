package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;

public interface ChargesMasterService {

	/**
	 * @Bilal 16_May_2017 declared Methods for Charges Master
	 * ***/

	int saveOrUpdateCharges(ChargesMasterDto chargesMaster,
			HttpServletRequest request);

	List<ChargesMasterDto> getCharges();

	boolean deleteCharges(Integer ChargesId, HttpServletRequest request);

	List<ChargesMasterDto> getAutoSuggestionChargesNames(String letter);

	List<ChargesMasterDto> getChargesById(Integer chargesId);

	List<ChargesMasterDto> getAllCharges();

	List<ChargesMasterDto> getAllChargeswithDeleted();
	/***************************************/

	Long getChargesMasterCount();

	List<ChargesMasterDto> sponsorandhallList(String callfrom);

	
}
