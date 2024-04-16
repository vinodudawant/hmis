package com.hms.pharmacy.service;

import java.util.List;
import java.util.Map;

import com.hms.pharmacy.pojo.StockOutEntry;
import com.hms.pharmacy.pojo.VoucherNumberPhysicalStock;

public interface PhysicalStockUpdateService {
	
	Map<String, String> saveOrUpdatePhyStock(StockOutEntry stockOutEntry);
	//Map<String,org.json.simple.JSONArray> getPhyStockUpdateDetails();  
	void saveVoucherNumber(Integer voucherno);
	List<Object> getVoucherNumbers();
	
	List<VoucherNumberPhysicalStock> getVoucherNumbersList();
	List<StockOutEntry> getPhyStockUpdateDetails();  

}
