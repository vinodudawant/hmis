package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.ChargesMasterSlave;

public interface ChargesSlaveDao {

	/**
	 * @Bilal 18_May_2017 declared Methods for Charges Master slave
	 * ***/

	int saveOrUpdateChargesSlave(ChargesMasterSlave chargesMasterSlave);

	List<ChargesMasterSlave> getChragesSlave();

	boolean deleteChragesSlave(Integer slaveId, Integer userId);

	List<ChargesMasterSlave> getAutoSuggestionChargesSlave(String letter);

	List<ChargesMasterSlave> getChargesSlaveById(Integer masterId,
			Integer selfId);



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

	int importSubcharges(String file);

	List<ChargesMasterSlave> fetchsup(Integer chargesMasterDto);

	List<ChargesMasterSlave> getChragesSlaveByIddr(Integer masterId,
			Integer selfId);

	List<ChargesMasterSlave> fetchSuperCatogoiresSlaveReg(Integer chargesMasterDto);

	/* List<ChargesMasterDto> getAllChargeswithDeleted(); */
	/***************************************/

}
