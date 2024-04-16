package com.hms.pharmacy.service;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.JsonObject;
import com.hms.pharmacy.pojo.WardConsumptionMaster;

public interface WardConsumptionService {

	JSONArray getWards();

	Map<String, String> saveWardConsumption(
			WardConsumptionMaster consumptionMaster);

	JSONArray getWardConsumptionDetails(Integer treatmentId);
	
	JSONArray getPrevWardConsumptionDetails(Integer treatmentId);

	List<WardConsumptionMaster> getWardConsumptionDetailsById(Integer wardId);

	JSONObject getStoreName(Integer wardSaleStoreId);

	JSONObject getWardName(Integer wardSaleWardId);

}
