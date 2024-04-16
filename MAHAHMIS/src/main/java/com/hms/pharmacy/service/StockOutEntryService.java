package com.hms.pharmacy.service;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.*;

public interface StockOutEntryService {
	/*Boolean saveOrUpdateStockOutEntry(StockOutEntry stockOutEntry);*/

	Map<String, String> saveOrUpdateStockOutEntry(StockOutEntry stockOutEntry);

	Map<String,org.json.simple.JSONArray> getStockEntryDetails(Integer stockIn);  
	


}
