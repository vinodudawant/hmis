package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.ChemotherapyDto;

public interface ChemotherapyDao {

	int saveChemoMaster(ChemotherapyDto chemo, HttpServletRequest request);

	List<ChemotherapyDto> getAllChemoMaster();

	boolean deleteChemoMaster(Integer chemotherapyId, Integer userId);

	ChemotherapyDto editChemoMaster(Integer chemotherapyId);

	List<ChemotherapyDto> getAllChemoMasterAutosuggestion(String chemotherapyName);


}
