package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.OpeningStock;
import com.hms.pharmacy.pojo.OpeningStockResult;
import com.hms.pharmacy.pojo.ProductMaster;

public interface OpeningStockService
{
	Boolean saveOrUpdateOpeningStock(OpeningStock openingStock, int productunit, int purchaseSlaveId);
	List<BatchMaster> getBatchByBatchCode(String batchCode);
	List<OpeningStockResult> getOpeningStockList();
	List<OpeningStockResult> getOpeningStockByShlef(Integer shelfId);
	
	Boolean deleteOpeningStock(Integer companyId);
	
	OpeningStock getOpeningStockById(Integer openingStockId);
	
	ProductMaster getProductMasterDetails(Integer openingStockId);
	
	List<OpeningStockResult> getOpeningStockByProduct(Integer shelfId);
	
	double getGSTamount(int taxtId);
}

