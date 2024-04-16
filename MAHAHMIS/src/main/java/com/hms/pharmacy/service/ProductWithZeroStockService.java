package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.ProductwithZeroStock;

public interface ProductWithZeroStockService {
	List<ProductwithZeroStock> getZeroStockProductList();
	Boolean saveOrUpdatePO(PoMaster poMaster);
	
	PoMaster getPOByIdForPrint(Integer poId);
	
	List<PoMaster> getPOList();
	List<PoMaster> getPObyVendorId(Integer vendorId);
}
