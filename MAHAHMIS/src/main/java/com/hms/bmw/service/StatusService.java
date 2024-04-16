package com.hms.bmw.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bmw.dto.BmwStatusDto;

public interface StatusService {

	int savebmwStatusMaster(BmwStatusDto bmwStatusDto, HttpServletRequest request);

	List<BmwStatusDto> getstatustypes(HttpServletRequest request);

	BmwStatusDto editBmwStatus(Integer statusID);

	boolean deleteBmwStatus(Integer statusID, HttpServletRequest request);
    
}
