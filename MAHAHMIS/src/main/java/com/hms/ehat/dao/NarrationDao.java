package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.NarrationDto;

public interface NarrationDao {

	int saveOrUpdateTemp(NarrationDto narrsMaster);

	List<NarrationDto> getAllNarrations();

	boolean deleteTemp(Integer narrId, Integer userId);

	List<NarrationDto> getautoSuggestionNarrationMasterNames(String letter);

	long getNarrationCount();

}
