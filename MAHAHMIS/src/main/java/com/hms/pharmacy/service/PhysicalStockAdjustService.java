package com.hms.pharmacy.service;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.*;

public interface PhysicalStockAdjustService
{
	
	
	
	void savePhysicalStockOutEntry(String jsonString);  
	
	List<StockOutEntry> getStockEntryDetailsForAdj();

	List<StockOutEntry> getStockEntryDetailByBatchId(Integer BatchId);

	List<StockOutEntry> getStockEntryDetailByVoucherNo(String voucher_no);

	List<StockOutEntry> getStockEntryDetailByProductId(Integer productId);

	

}