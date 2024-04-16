package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.OpeningStock;
import com.hms.pharmacy.pojo.OpeningStockResult;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;

public interface OpeningStockDao
{
	Boolean saveOrUpdateOpeningStock(OpeningStock openingStock);
	List<BatchMaster> getBatchByBatchCode(String batchCode);
	BatchMaster getStockDetails(Integer batchId);
	void saveBatchDetails(BatchMaster batchMaster);
	List<OpeningStockResult> getOpeningStockList();
	List<OpeningStockResult> getOpeningStockByShlef(Integer shelfId);
	
	Boolean deleteOpeningStock(Integer companyId);
	
	OpeningStock getOpeningStockById(Integer openingStockId);
   
	ProductMaster getProductMasterDetails(Integer openingStockId);
	
	List<OpeningStockResult> getOpeningStockByProduct(Integer productId);
	
	double getGSTamount(int taxtId);
}
