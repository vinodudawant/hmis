package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.ProductMaster;

public interface ProductWithZeroStockDao 
{
	List<ProductMaster> getZeroStockProductList();
	Boolean saveOrUpdatePO(PoMaster poMaster);
	
	PoMaster getPOByIdForPrint(Integer poId);
	
	List<PoMaster> getPOList();
	
	List<PoMaster> getPObyVendorId(Integer vendorId);
}
