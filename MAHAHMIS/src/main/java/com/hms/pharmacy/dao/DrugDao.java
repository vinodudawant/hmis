package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DrugMaster;

public interface DrugDao {

	List<DrugMaster> getDrug();

	boolean saveDrug(DrugMaster drugMaster);

	boolean deleteDrug(Integer drugId);

	List<DrugMaster> getAutoSuggestionDrugName(String letter);

	List<DrugMaster> getDrugById(Integer drugId);
	
	DrugMaster getDrugByIdForDate(Integer drugId);

	List<DrugMaster> getAllDrugs();

}
