package com.hms.pharmacy.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonObject;
import com.hms.pharmacy.dao.WardConsumtionDao;
import com.hms.pharmacy.pojo.IndentSaleMaster;
import com.hms.pharmacy.pojo.WardConsumptionMaster;
import com.hms.pharmacy.service.WardConsumptionService;

@Service
public class WardConsumtionServiceImpl implements WardConsumptionService{

	@Autowired
	WardConsumtionDao wardConsumptionDao;
	
	@Override
	@Transactional
	public JSONArray getWards() {
		return wardConsumptionDao.getWards();
	}

	@Override
	@Transactional
	public Map<String, String> saveWardConsumption(
			WardConsumptionMaster consumptionMaster) {
		Map<String, String> result= new HashMap<String, String>();
		boolean statusResult=false;
		
		result=wardConsumptionDao.saveWardConsumption(consumptionMaster);
		String str=result.get("result");
		saveWardConsumptionDetails(consumptionMaster);
		
		if(str.equals("Record Save Succesfully"))
		{
		}
		return result;
	}

	public void saveWardConsumptionDetails(WardConsumptionMaster wardConsumptionMaster)
	{
		wardConsumptionDao.saveWardConsumptionDetails(wardConsumptionMaster);
	}
	
	@Override
	@Transactional
	public JSONArray getWardConsumptionDetails(Integer treatmentId) {
		return wardConsumptionDao.getWardConsumptionDetails(treatmentId);
	}
	
	@Override
	@Transactional
	public JSONArray getPrevWardConsumptionDetails(Integer treatmentId) {
		return wardConsumptionDao.getPrevWardConsumptionDetails(treatmentId);
	}

	@Override
	@Transactional
	public List<WardConsumptionMaster> getWardConsumptionDetailsById(
			Integer wardId) {
		return wardConsumptionDao.getWardConsumptionDetailsById(wardId);
	}

	@Override
	@Transactional
	public JSONObject getStoreName(Integer wardSaleStoreId) {
		return wardConsumptionDao.getStoreName(wardSaleStoreId);
	}

	@Override
	@Transactional
	public JSONObject getWardName(Integer wardSaleWardId) {
		return wardConsumptionDao.getWardName(wardSaleWardId);
	}
	
}
