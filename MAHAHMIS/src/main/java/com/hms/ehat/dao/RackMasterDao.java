package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.RoomMasterDto;

public interface RackMasterDao {
	public int saveorUpdateRackMaster(RackMasterDto rackmaster);

	public List<RackMasterDto> getAllRackMaster();
	public RackMasterDto editRackDoc(Integer roomId);
	public boolean deleteRackMaster(RackMasterDto rackmaster);

}
