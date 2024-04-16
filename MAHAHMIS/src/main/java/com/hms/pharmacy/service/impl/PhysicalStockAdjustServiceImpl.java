package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.*;
import com.hms.pharmacy.pojo.*;
import com.hms.pharmacy.service.*;

@Service
public class PhysicalStockAdjustServiceImpl implements PhysicalStockAdjustService 
{
	@Autowired
	PhysicalStockAdjustDao physicalStockAdjustDao;
	
	

	

	@Override
	@Transactional
	public void savePhysicalStockOutEntry(String jsonString) {
		physicalStockAdjustDao.savePhysicalStockOutEntry(jsonString);
		
	}
	
	

	@Override
	@Transactional
	public List<StockOutEntry> getStockEntryDetailsForAdj() {
		// TODO Auto-generated method stub
		return physicalStockAdjustDao.getStockEntryDetailsForAdj();
	}


	@Override
	@Transactional
	public List<StockOutEntry> getStockEntryDetailByBatchId(Integer BatchId) {
		// TODO Auto-generated method stub
		return physicalStockAdjustDao.getStockEntryDetailByBatchId(BatchId);
	}


	@Override
	@Transactional
	public List<StockOutEntry> getStockEntryDetailByVoucherNo(String voucher_no) {
		// TODO Auto-generated method stub
		return physicalStockAdjustDao.getStockEntryDetailByVoucherNo(voucher_no);
	}



	@Override
	@Transactional
	public List<StockOutEntry> getStockEntryDetailByProductId(Integer productId) {
		// TODO Auto-generated method stub
		return physicalStockAdjustDao.getStockEntryDetailByProductId(productId);
	}
	
}
