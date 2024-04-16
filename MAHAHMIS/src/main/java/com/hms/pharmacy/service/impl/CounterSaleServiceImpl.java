package com.hms.pharmacy.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.CounterSaleDao;
import com.hms.pharmacy.pojo.CounterSaleMaster;
import com.hms.pharmacy.pojo.CounterSaleSlave;
import com.hms.pharmacy.pojo.CreditNoteCounterSale;
import com.hms.pharmacy.pojo.FifthCounterSaleMaster;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.service.CounterSaleService;

@Service
public class CounterSaleServiceImpl implements CounterSaleService {
	@Autowired
	CounterSaleDao counterSaleDao;

	
	
	
	@Override
	@Transactional
	public  Boolean saveOrUpdateCounterSale(CounterSaleMaster counterSaleMaster,
			Integer counterSaleNumber,String storeId) {

		counterSaleMaster.setCounterSaleDeleteFlag(0);
		counterSaleMaster.setCounterSaleUpdateDate(new Date(
				new java.util.Date().getTime()));

		List<CounterSaleSlave> counterSaleSlaves = counterSaleMaster
				.getLtCounterSlave();		
		
		if (counterSaleDao.saveOrUpdateCounterSale(counterSaleMaster,storeId)) {
			return true;
		} else {
			return false;
		}

	}

	@Override
	@Transactional
	public CounterSaleMaster getCounterSlave(Integer counterId,Integer unitId) {
		// TODO Auto-generated method stub
		return counterSaleDao.getCounterSlave(counterId,unitId);
	}

	/*
	 * @Override
	 * 
	 * @Transactional public CounterSaleMaster getCounterById(Integer counterId)
	 * { // TODO Auto-generated method stub return
	 * counterSaleDao.getCounterById(counterId); }
	 */

	@Override
	@Transactional
	public Double getBatchwisePurchaseRate(String BatchCode) {
		// TODO Auto-generated method stub
		Double str = null;
		PurchaseSlave purchaseSlave = counterSaleDao
				.getBatchwisePurchaseRate(BatchCode);
		if (purchaseSlave != null) {
			str = purchaseSlave.getPurSlavePurchaseRate();

		}
		return str;
	}

	
	@Override
	@Transactional
	public List<CounterSaleMaster> getCounterSales(Integer unitId) {
		// TODO Auto-generated method stub
		return counterSaleDao.getCounterSales(unitId);
	}

	@Override
	@Transactional
	public Double getLastCounterAmount() {
		return counterSaleDao.getLastCounterAmount();
	}
	
	@Override
	@Transactional
	public Integer getLastBillNumber() {
		return counterSaleDao.getLastBillNumber();
	}
	@Override
	@Transactional
	public Boolean deleteCounterSale(Integer counterSaleId) {
		// TODO Auto-generated method stub
		
		return counterSaleDao.deleteCounterSale(counterSaleId);
	}
	
	@Override
	@Transactional
	public List<CounterSaleMaster> getAutoSuggestionPatientNames(String letter,Integer unitId) {
		return counterSaleDao.getAutoSuggestionPatientNames(letter,unitId);
	}
	
	@Override
	@Transactional
	public List<CounterSaleMaster> getAutoSuggestionRegNo(Integer letter,Integer unitId) {
		return counterSaleDao.getAutoSuggestionRegNo(letter,unitId);
	}
	
	@Override
	@Transactional
	public List<CounterSaleMaster> getCounterBillId(Integer counterSaleId,Integer unitId)
	{
		// TODO Auto-generated method stub
		return counterSaleDao.getCounterBillId(counterSaleId,unitId);
	}

	/*
	 * @Override
	 * 
	 * @Transactional public Boolean saveOrUpdateFifthCounterSale(
	 * FifthCounterSaleMaster fifthCounterSaleMaster, Integer saveNo) {
	 * fifthCounterSaleMaster.setCounterSaleDeleteFlag(0);
	 * fifthCounterSaleMaster.setCounterSaleUpdateDate(new Date( new
	 * java.util.Date().getTime()));
	 * 
	 * return counterSaleDao.saveOrUpdateFifthCounterSale(fifthCounterSaleMaster);
	 * 
	 * }
	 */

	/*
	 * @Override
	 * 
	 * @Transactional public FifthCounterSaleMaster getCounterSlaveForFifthCounter(
	 * Integer counterSaleId) { return
	 * counterSaleDao.getCounterSlaveForFifthCounter(counterSaleId); }
	 */
	
	@Override
	@Transactional
	public List<CounterSaleMaster> getAllCounterReceiptDataByPatientName(
			String patientName) {
		return counterSaleDao.getAllCounterReceiptDataByPatientName(patientName);
	}
	
	@Override
	@Transactional
	public List<CreditNoteCounterSale> getAllCounterSaleBillData(Integer patientId) {
		return counterSaleDao.getAllCounterSaleBillData(patientId);
	}
	
}