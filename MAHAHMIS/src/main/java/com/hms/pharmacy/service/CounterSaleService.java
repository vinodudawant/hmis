package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.CounterSaleMaster;
import com.hms.pharmacy.pojo.CreditNotePatient;
import com.hms.pharmacy.pojo.FifthCounterSaleMaster;
import com.hms.pharmacy.pojo.CreditNoteCounterSale;

public interface CounterSaleService 
{
	Boolean saveOrUpdateCounterSale(CounterSaleMaster counterSaleMaster, Integer counterSaleNumber,String storeId);
	public Double getBatchwisePurchaseRate(String BatchCode);
	List<CounterSaleMaster> getCounterSales(Integer unitId);
	/*public String getLastBillNumber(Integer productId);*/
	Double getLastCounterAmount();
	Integer getLastBillNumber();
	Boolean deleteCounterSale(Integer counterSaleId);
	public CounterSaleMaster getCounterSlave(Integer counterId,Integer unitId);
	
	List<CounterSaleMaster> getAutoSuggestionPatientNames(String letter,Integer unitId);
	List<CounterSaleMaster> getAutoSuggestionRegNo(Integer letter,Integer unitId);
	List<CounterSaleMaster> getCounterBillId(Integer counterSaleId,Integer unitId);
	/*
	 * Boolean saveOrUpdateFifthCounterSale( FifthCounterSaleMaster
	 * fifthCounterSaleMaster, Integer saveNo); FifthCounterSaleMaster
	 * getCounterSlaveForFifthCounter(Integer counterSaleId);
	 */
	
	List<CounterSaleMaster> getAllCounterReceiptDataByPatientName(String patientName);
	
	List<CreditNoteCounterSale> getAllCounterSaleBillData(Integer patientId);
}
