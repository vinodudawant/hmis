package com.hms.bmw.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bmw.dto.BmwStatusDto;

public interface StatusDao {

	int savebmwStatusMaster(BmwStatusDto bmwStatusDto, HttpServletRequest request);

	List<BmwStatusDto> getstatustypes(HttpServletRequest request);

	BmwStatusDto editBmwStatus(Integer statusID);
	
	boolean deleteBmwStatus(Integer statusID, HttpServletRequest request);
}
