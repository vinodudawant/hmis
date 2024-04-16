package com.hms.pharmacy.service;

import com.hms.ecogreenapi.EcogreenItemMasterDto;

public interface EcogreenApiService {
	
	EcogreenItemMasterDto getItemList(int masterId);
	
	int saveProductMasterData(String productlst);
}
