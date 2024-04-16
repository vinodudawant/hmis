package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.RoomMasterDto;

public interface RoomMasterService {
	
	public int saveorUpdateRoomMaster(RoomMasterDto roommsater,HttpServletRequest request);
	public List<RoomMasterDto> getAllRoomMaster(HttpServletRequest request);
	public RoomMasterDto editRoomDoc(Integer roomId);
	public boolean deleteRoomMaster(Integer roomId, HttpServletRequest request);
}
