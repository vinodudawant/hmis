package com.hms.pharmacy.dao;

import java.util.Map;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.StockOutEntry;

public interface StockOutEntryDao 
{
	/*Boolean saveOrUpdateStockOutEntry(StockOutEntry stockOutEntry);*/
	
	Map<String, String> saveOrUpdateStockOutEntry(StockOutEntry stockOutEntry);

	Map<String, org.json.simple.JSONArray> getStockEntryDetails(Integer stockOutEntry);  
}
