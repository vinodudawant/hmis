package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.PartywisePoMaster;

public interface PartywisePoService 
{
   Boolean saveOrUpdatePO(PartywisePoMaster poMaster);
	
	Boolean deletePO(Integer poId);
	
	List<PartywisePoMaster> getPOList();
	
	List<PartywisePoMaster> getPObyVendorId(Integer vendorId);
		
	PartywisePoMaster getPOById(Integer poId);

	List<String> getLastPurchaseVendor(Integer productId);
	
	PartywisePoMaster getPOByIdEdit(Integer poId);
}
