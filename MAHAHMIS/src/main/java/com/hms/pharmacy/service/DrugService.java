package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.DrugMaster;

public interface DrugService {

	List<DrugMaster> getDrug();

	boolean saveDrug(DrugMaster drugMaster);

	boolean deleteDrug(Integer drugId);

	List<DrugMaster> getAutoSuggestionDrugName(String letter);

	List<DrugMaster> getDrugById(Integer drugId);

	List<DrugMaster> getAllDrugs();

}
