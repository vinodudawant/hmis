package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.BodyPartMasterDto;
import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.ShelfDocDto;

public interface ShelfDocService {
	
	public int saveorUpdateShelDoc(ShelfDocDto bodypartMaster,HttpServletRequest request);

	public List<ShelfDocDto> getAllShelDoc(HttpServletRequest request);

	public ShelfDocDto editShelfDoc(Integer selfDocId);

	public boolean deleteShelfDoc(Integer selfDocId, HttpServletRequest request);

	public List<RackMasterDto> getAllRackByRoomId(Integer roomID);

	public List<ShelfDocDto> getAllShelfByRackId(Integer rackId);

	

}
