package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.CashReceiptSaleMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;

public interface CashReceiptEntryDao {

	boolean saveOrUpdateCashReceiptEntry(CashReceiptMaster cashReceiptMaster);
	List<CashReceiptMaster> getCashs();

	Boolean deleteCash(Integer cashId);
	List<CashReceiptMaster> getCashbyVendorId(Integer vendorId, Integer vendorAddId);
	List<CashReceiptMaster> getCashById(Integer cashId);
	CashReceiptMaster getCashReceiptDataById(Integer cashId);
	
}
