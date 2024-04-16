package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.NarrationDto;
public interface NarrationService {

	int saveOrUpdateTemp(NarrationDto narrsMaster, HttpServletRequest request);

	List<NarrationDto> getAllNarrations();

	boolean deleteNarrMaster(Integer narrId, HttpServletRequest request);

	List<NarrationDto> getautoSuggestionNarrationMasterNames(String letter);

	Long getNarrationCount();




}
