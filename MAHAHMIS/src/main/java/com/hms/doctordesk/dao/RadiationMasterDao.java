package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.RadiationDto;

public interface RadiationMasterDao {

	int saveRadiationMaster(RadiationDto radio, HttpServletRequest request);

	List<RadiationDto> getAllRadiationMaster();

	RadiationDto editRadiationMaster(Integer radiationId);

	boolean deleteRadiationMaster(Integer radiationId, Integer userId);

	List<RadiationDto> getAllRadiationMasterAutosuggestion(String radiationName);

	public String getNextRadiationMasterID();

	

}
