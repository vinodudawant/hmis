package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.ProductBelowMinLevel;

public interface ProductBelowMinLevelService {

	//List<ProductBelowMinLevel> getMinLevelProductList();
	
	List<ProductBelowMinLevel> getMinLevelProductListData();

	Boolean saveOrUpdatePO(PoMaster poMaster);
	
	PoMaster getPOByIdForPrint(Integer poId);
	
	List<PoMaster> getPOList();
	
	List<PoMaster> getPObyVendorId(Integer vendorId);

	List<ProductBelowMinLevel> getMinLevelProductListnew();

	List<ProductBelowMinLevel> getMaxLevelProductList();
}
