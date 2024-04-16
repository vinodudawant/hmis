package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.*;

public interface StrengthService 
{
	List<StrengthMaster> getStrength();
	Boolean saveOrUpdateStrength(StrengthMaster strengthMaster);

	Boolean deleteStrength(Integer preparationId);

	List<StrengthMaster> getAutoSuggestionStrengthNames(String letter);

	List<StrengthMaster> getStrengthById(Integer strengthId);
}
