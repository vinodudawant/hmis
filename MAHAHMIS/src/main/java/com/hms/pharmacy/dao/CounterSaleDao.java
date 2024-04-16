package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.*;

public interface CounterSaleDao {
	Boolean saveOrUpdateCounterSale(CounterSaleMaster counterSaleMaster,String storeId);

	public PurchaseSlave getBatchwisePurchaseRate(String BatchCode);

	List<CounterSaleMaster> getCounterSales(Integer unitId);

	/* public PurchaseSlave getLastBillNumber(Integer productId); */
	Double getLastCounterAmount();

	Integer getLastBillNumber();

	CounterSaleMaster getCounterSlave(Integer counterId,Integer unitId);

	Boolean deleteCounterSale(Integer counterSaleId);

	List<CounterSaleMaster> getAutoSuggestionPatientNames(String letter,Integer unitId);
	List<CounterSaleMaster> getAutoSuggestionRegNo(Integer letter,Integer unitId);
	List<CounterSaleMaster> getCounterBillId(Integer counterSaleId,Integer unitIdR);

	/*
	 * Boolean saveOrUpdateFifthCounterSale( FifthCounterSaleMaster
	 * fifthCounterSaleMaster); FifthCounterSaleMaster
	 * getCounterSlaveForFifthCounter(Integer counterSaleId);
	 */
	List<CounterSaleMaster> getAllCounterReceiptDataByPatientName(String patientName);

	List<CreditNoteCounterSale> getAllCounterSaleBillData(Integer patientId);
	
}
