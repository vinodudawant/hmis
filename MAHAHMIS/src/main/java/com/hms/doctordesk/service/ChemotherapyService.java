package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.ChemotherapyDto;

public interface ChemotherapyService {

	int saveChemoMaster(ChemotherapyDto clinical, HttpServletRequest request);

	List<ChemotherapyDto> getAllChemoMaster();

	boolean deleteChemoMaster(Integer chemotherapyId, HttpServletRequest request);

	ChemotherapyDto editChemoMaster(Integer chemotherapyId);

	List<ChemotherapyDto> getAllChemoMasterAutosuggestion(String chemotherapyName);

}
