package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.PartywisePoMaster;;

public interface PartywisePoDao
{
	Boolean saveOrUpdatePO(PartywisePoMaster poMaster);

	Boolean deletePO(Integer poId);
	
	List<PartywisePoMaster> getPOList();
	
	List<PartywisePoMaster> getPObyVendorId(Integer vendorId);
	
	PartywisePoMaster getPOById(Integer poId);

	List<PurchaseMaster> getLastPurchaseVendor(Integer productId);
	
	PartywisePoMaster getPOByIdEdit(Integer poId);
}
