package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.PhysicalStockUpdateDao;
import com.hms.pharmacy.dao.PurchaseDao;
import com.hms.pharmacy.dao.StockOutEntryDao;
import com.hms.pharmacy.pojo.StockOutEntry;
import com.hms.pharmacy.pojo.VoucherNumberPhysicalStock;
import com.hms.pharmacy.service.PhysicalStockUpdateService;

@Service
public class PhysicalStockUpdateServiceImpl  implements PhysicalStockUpdateService{
	
	

	@Autowired
    PhysicalStockUpdateDao  physicalStockUpdateDao;
	
	@Autowired
	PurchaseDao purchaseDao;
	
	
	@Override
	@Transactional
	public Map<String, String> saveOrUpdatePhyStock(StockOutEntry stockOutEntry)
	{
		stockOutEntry.setStockOutDeleteFlag(0);
		stockOutEntry.setStockOutDate(new Date(new java.util.Date().getTime()));
		Map<String, String> result= new HashMap<String, String>();
			result=physicalStockUpdateDao.saveOrUpdatePhyStock(stockOutEntry);
		
		return result;
	}
	
	/*
	 * @Override
	 * 
	 * @Transactional public Map<String, JSONArray> getPhyStockUpdateDetails() {
	 * return physicalStockUpdateDao.getPhyStockUpdateDetails();
	 * 
	 * }
	 */
	
	@Override
	@Transactional
	public void saveVoucherNumber(Integer voucherno) {
		physicalStockUpdateDao.saveVoucherNumber(voucherno);
		
	}

	@Override
	@Transactional
	public List<Object> getVoucherNumbers() {
		// TODO Auto-generated method stub
		return physicalStockUpdateDao.getVoucherNumbers();
	}

	@Override
	@Transactional
	public List<VoucherNumberPhysicalStock> getVoucherNumbersList() {
		
		return physicalStockUpdateDao.getVoucherNumbersList();
	}

	@Override
	@Transactional
	public List<StockOutEntry> getPhyStockUpdateDetails() {
		// TODO Auto-generated method stub
		return physicalStockUpdateDao.getPhyStockUpdateDetails();
	}
	
	}

	

