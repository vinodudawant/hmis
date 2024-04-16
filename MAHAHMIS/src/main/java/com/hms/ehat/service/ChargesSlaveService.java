package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;

public interface ChargesSlaveService {
	/**
	 * @Bilal 18_May_2017 declared Methods for Charges Master slave
	 * ***/

	int saveOrUpdateChargesSlave(ChargesMasterSlave chargesMasterSlave,
			HttpServletRequest request, ChargesMasterDto chargesMaster, Integer slaveId, Integer selfId);

	List<ChargesMasterSlave> getChragesSlave();

	boolean deleteChragesSlave(Integer slaveId, HttpServletRequest request);

	List<ChargesMasterSlave> getAutoSuggestionChargesSlave(String letter);

	List<ChargesMasterSlave> getChargesSlaveById(Integer masterId , Integer selfId);
	//

	List<ChargesMasterSlave> getAllChargesSlave();
	
	List<ChargesMasterSlave> fetchSuperCatogoires(Integer chargesMasterDto);

	Long getSubChargesCount();

	List<ChargesMasterSlave> fetchargesinfo();

	List<ChargesMasterSlave> fetchargesinfomaster(Integer masterId,
			Integer selfId);

	List<ChargesMasterSlave> setChargesInfoData(String letter);

	List<ChargesMasterSlave> fetcatY(Integer masterId, Integer selfId);

	List<ChargesMasterSlave> getAllChargesforhall();

	List<ChargesMasterSlave> getSponsorList();

	int importSubcharges(String string);

	List<ChargesMasterSlave> fetchsup(Integer chargesMasterDto);

	List<ChargesMasterSlave> getChragesSlaveByIddr(Integer masterId,
			Integer selfId);

	List<ChargesMasterSlave> fetchSuperCatogoiresSlaveReg(Integer chargesMasterDto);

	/* List<ChargesMasterDto> getAllChargeswithDeleted(); */
	/***************************************/
}
