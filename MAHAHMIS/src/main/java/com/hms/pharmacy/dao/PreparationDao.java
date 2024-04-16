package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.*;

public interface PreparationDao
{
	List<PreparationMaster> getPreparation();
	Boolean saveOrUpdatePreparation(PreparationMaster preparationMaster);

	Boolean deletePreparation(Integer preparationId);

	List<PreparationMaster> getAutoSuggestionPreparationNames(String letter);

	List<PreparationMaster> getPreparationById(Integer preparationId);
}
