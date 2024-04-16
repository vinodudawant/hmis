package com.hms.ambulance.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ambulance.dto.StatusMasterDto;

public interface StatusMasterService {

	int saveStatus(StatusMasterDto statusDto, HttpServletRequest request);

	List<StatusMasterDto> getAllStatusMaster(HttpServletRequest request);

	StatusMasterDto editStatusMaster(Integer statusId);

	boolean deleteStatusMaster(Integer statusId, HttpServletRequest request);

}
