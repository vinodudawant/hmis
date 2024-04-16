package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.RoomMasterDto;

public interface RackMasterService {
	public int saveorUpdateRackMaster(RackMasterDto rackmaster,HttpServletRequest request);

	public List<RackMasterDto> getAllRackMaster(HttpServletRequest request);

	public RackMasterDto editRackDoc(Integer rackId);

	public boolean deleteRackMaster(Integer rackId, HttpServletRequest request);


}
