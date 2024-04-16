package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.RadiationDto;

public interface RadiationMasterService {

	int saveRadiationMaster(RadiationDto radio, HttpServletRequest request);

	List<RadiationDto> getAllRadiationMaster();

	RadiationDto editRadiationMaster(Integer radiationId);

	boolean deleteRadiationMaster(Integer radiationId, HttpServletRequest request);

	List<RadiationDto> getAllRadiationMasterAutosuggestion(String radiationName);

	public String getNextRadiationMasterID();


}
