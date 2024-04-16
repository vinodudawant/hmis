package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.PackingMaster;

public interface PackingDao {

	List<PackingMaster> getPacking();

	Boolean deletePacking(Integer packId);

	List<PackingMaster> getPackingById(Integer packId);

	Boolean saveOrUpdatePacking(PackingMaster packingMaster);

	List<PackingMaster> getAutoSuggestionPackingNames(String letter);
	
	PackingMaster getPackingByIdForDate(Integer packId);
}
