package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CashPaidMaster;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.PurchaseMaster;

public interface CashPaidEntryDao {

	boolean saveOrUpdateCashPaidEntry(CashPaidMaster cashPaidMaster);

	List<CashPaidMaster> getCashPaidEntryLIst();

	CashPaidMaster getCashPaidEntryById(Integer cashPaidId);

	boolean deleteCashPaidEntry(Integer cashPaidId);

	List<PendingBill> getPendingBills(Integer vendorId);

	void setPurchaseStatus(List<PurchaseMaster> purchaseMasters);
	List<CashPaidMaster> getCashPaidbyVendorId(Integer vendorId);
	CashPaidMaster getCashPaidDataSaleById(Integer cashId);
	
	List<CashPaidMaster> getAllCashPaidDataByVendorId(Integer vendorId);
}
