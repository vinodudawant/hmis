package com.hms.ipd.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.ChargesMasterSlave;

public interface BedMasterDao {

	int saveOrUpdateBedMaster(ChargesMasterSlave chargesMasterSlave);
	List<ChargesMasterSlave> getBedMasterList();
	int deleteHallById(int hallId, HttpServletRequest request);
	ChargesMasterSlave viewBedsOfHall(int hallId);
	int deleteBedById(int hallId, int bedId, HttpServletRequest request);
	List<ChargesMasterSlave> autoSuggestionsubCharges(String letter);
}
