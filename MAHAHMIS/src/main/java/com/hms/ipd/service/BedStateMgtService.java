package com.hms.ipd.service;

import java.util.List;

import com.hms.administrator.dto.Beds;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dto.BedStateSettingDTO;

public interface BedStateMgtService {

	List<ChargesMasterSlave> getHallMasterList();
	Beds viewBedsOfHall(int hallId);
	int deallocateCleanedBeds(String bedIds,int userId);
	
	void autoDeallocateCleanedBeds();
	BedStateSettingDTO getBedStateSetting();
}
