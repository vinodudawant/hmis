package com.hms.ambulance.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ambulance.dto.StatusMasterDto;

public interface StatusMasterDao {

	int saveStatus(StatusMasterDto statusDto, HttpServletRequest request);

	List<StatusMasterDto> getAllStatusMaster(HttpServletRequest request);

	StatusMasterDto editStatusMaster(Integer statusId);

	boolean deleteStatusMaster(Integer statusId, HttpServletRequest request);

}
