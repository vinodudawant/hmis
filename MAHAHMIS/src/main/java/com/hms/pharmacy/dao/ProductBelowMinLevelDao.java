package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.ProductBelowMinLevel;
import com.hms.pharmacy.pojo.ProductMaster;

public interface ProductBelowMinLevelDao {

	//List<ProductMaster> getMinLevelProductList();
	
	List<ProductMaster> getMinLevelProductListData();

	Boolean saveOrUpdatePO(PoMaster poMaster);
	
	PoMaster getPOByIdForPrint(Integer poId);
	
	List<PoMaster> getPOList();
	
	List<PoMaster> getPObyVendorId(Integer vendorId);

	List<ProductBelowMinLevel> getMinLevelProductListnew();

	List<ProductBelowMinLevel> getMaxLevelProductList();
}
