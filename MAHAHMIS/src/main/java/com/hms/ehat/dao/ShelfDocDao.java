package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.ShelfDocDto;

public interface ShelfDocDao {
	public int saveorUpdateShelDoc(ShelfDocDto bodypartMaster);

	public List<ShelfDocDto> getAllShelDoc();
	public ShelfDocDto editShelfDoc(Integer selfDocId);
	public boolean deleteShelfDoc(ShelfDocDto shelfdocobj);
	public List<RackMasterDto> getAllRackByRoomId(Integer roomID);
	public List<ShelfDocDto> getAllShelfByRackId(Integer rackId);






}
