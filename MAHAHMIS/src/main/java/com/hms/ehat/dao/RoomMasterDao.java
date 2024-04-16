package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.RoomMasterDto;
import com.hms.ehat.dto.ShelfDocDto;

public interface RoomMasterDao {
	public int saveorUpdateRoomMaster(RoomMasterDto roommaster);

	public List<RoomMasterDto> getAllRoomMaster();
	public RoomMasterDto editRoomDoc(Integer roomId);
	public boolean deleteRoomMaster(RoomMasterDto roommaster);

}
