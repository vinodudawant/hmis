package com.hms.ipd.dao;

import java.util.List;

import com.hms.administrator.dto.Beds;
import com.hms.ehat.dto.ChargesMasterSlave;

public interface BedStateMgtDao {

	List<ChargesMasterSlave> getHallMasterList();
	Beds viewBedsOfHall(int hallId);
	int deallocateCleanedBeds(String bedIds,int userId);
}
