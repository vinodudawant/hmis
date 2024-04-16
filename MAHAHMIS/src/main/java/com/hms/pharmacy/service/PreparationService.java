package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.*;

public interface PreparationService 
{
	List<PreparationMaster> getPreparation();
	Boolean saveOrUpdateForm(PreparationMaster preparationMaster);

	Boolean deletePreparation(Integer preparationId);

	List<PreparationMaster> getAutoSuggestionPreparationNames(String letter);

	List<PreparationMaster> getPreparationById(Integer preparationId);
}
