package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;

public interface CashReceiptEntryService {

	boolean saveOrUpdateCashReceiptEntry(CashReceiptMaster cashReceiptMaster);
	List<CashReceiptMaster> getCashs();

	Boolean deleteCash(Integer cashId);
	
	List<CashReceiptMaster> getCashById(Integer cashId);
	
	List<CashReceiptMaster> getCashbyVendorId(Integer vendorId, Integer vendorAddId);
	
	CashReceiptMaster getCashReceiptDataById(Integer cashId);
	

}
