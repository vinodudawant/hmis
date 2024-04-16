package com.hms.pharmacy.dao;

import java.util.List;
import java.util.Map;

import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;

public interface PODao {
	Integer saveOrUpdatePO(PoMaster poMaster);

	Boolean deletePO(Integer poId);
	
	List<PoMaster> getPOList(Integer unitId);
	
	List<PoMaster> getPObyVendorId(Integer vendorId,Integer unitId);
	
	PoMaster getPOById(Integer poId);

	List<PurchaseMaster> getLastPurchaseVendor(Integer productId);

	PoMaster getPurchaseOrderByPurchaseId(Integer poId);

	PoMaster getPOByIdForPrint(Integer poId);
	
	Integer getNextAutoIncrement();

	List<PoMaster> getPendingPO();
	
	Map<String, String> saveOrUpdatePOInSale(PoMaster poMaster);
	
}
