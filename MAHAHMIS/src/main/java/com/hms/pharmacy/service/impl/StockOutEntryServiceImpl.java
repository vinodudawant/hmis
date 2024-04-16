package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.StockOutEntryDao;
import com.hms.pharmacy.pojo.StockOutEntry;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.PurchaseService;
import com.hms.pharmacy.service.StockOutEntryService;

@Service
public class StockOutEntryServiceImpl implements StockOutEntryService 
{
	@Autowired
	StockOutEntryDao stockOutEntryDao;
	
	@Autowired
	CommonService commonService;
	
	@Autowired
	PurchaseService purchaseService;
	
	@Override
	@Transactional
	public Map<String, String> saveOrUpdateStockOutEntry(StockOutEntry stockOutEntry) 
	{
		stockOutEntry.setStockOutDeleteFlag(0);
		stockOutEntry.setStockOutDate(new Date(new java.util.Date().getTime()));
		Map<String, String> result= new HashMap<String, String>();
		/*productMaster.setProductAddDate();*/
		
		/*if(stockOutEntry.getStockEntryType()==0)				
			purchaseDao.decreaseStock(stockOutEntry.getStockBatchId(),
				stockOutEntry.getQty());
		else
			purchaseDao.increaseStock(stockOutEntry.getStockBatchId(),
					stockOutEntry.getQty());*/
		
		
		result=stockOutEntryDao.saveOrUpdateStockOutEntry(stockOutEntry);
		int id=Integer.parseInt(result.get("result"));
		
		try {
			Map<String, JSONArray> batchData=purchaseService.getBatchDetails(stockOutEntry.getProductId(),"");
			JSONArray list=batchData.get("result");
			JSONObject obj=null;
			for(int i=0;i<list.length();i++){
				obj = (JSONObject) list.get(i);
				if(obj.get("batchId").equals(stockOutEntry.getStockBatchId()+""))
					break;
			}
			
			int inQty=0,outQty=0;
			String type="";
			if(stockOutEntry.getStockEntryType()==0){
				outQty=stockOutEntry.getQty();
				type="StockOut";
			}
			else{
				inQty=stockOutEntry.getQty();
				type="StockIn";
			}
			
			commonService.setstockMasterSlave(id, type, 0, 0, stockOutEntry.getProductId(), stockOutEntry.getStockBatchId(), 
					obj.get("batchCode")+"", 0, inQty, outQty, Double.parseDouble(obj.get("vat")+""),0.0, 0.0, 0.0, 0, 0, Double.parseDouble(obj.get("mrp")+""), Double.parseDouble(obj.get("purchaseRate")+""));
		} catch (NumberFormatException e) {
			e.printStackTrace();

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		result.put("result", "Record Save Succesfully");
		return result;
	}

	@Override
	@Transactional
	public Map<String,org.json.simple.JSONArray> getStockEntryDetails(Integer stockOutEntry) 
	{
		return stockOutEntryDao.getStockEntryDetails(stockOutEntry);
	}
}
