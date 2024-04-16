package com.hms.pharmacy.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.hms.pharmacy.pojo.PoMaster;

public interface POService {
	Integer saveOrUpdatePO(PoMaster poMaster);
	
	Boolean deletePO(Integer poId);
	
	List<PoMaster> getPOList(Integer unitId);
	
	List<PoMaster> getPObyVendorId(Integer vendorId,Integer unitId);
		
	PoMaster getPOById(Integer poId);

	List<String> getLastPurchaseVendor(Integer productId);

	PoMaster getPurchaseOrderByPurchaseId(Integer poId);

	PoMaster getPOByIdForPrint(Integer poId);
	
	Integer getNextAutoIncrement();

	List<PoMaster> getPendingPO();
	
	Map<String, String> saveOrUpdatePOInSale(PoMaster poMaster);

	Integer savePO(PoMaster poMaster);
}
