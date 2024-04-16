package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.PackingMaster;

public interface PackingService {
	List<PackingMaster> getPacking();

	Boolean deletePacking(Integer packId);
	
	List<PackingMaster> getPackingById(Integer packId);

	Boolean saveOrUpdatePacking(PackingMaster packingMaster);

	List<PackingMaster> getAutoSuggestionPackingNames(String letter);

}
