package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.CashPaidMaster;
import com.hms.pharmacy.pojo.PendingBill;

public interface CashPaidEntryService {

	boolean saveOrUpdateCashPaidEntry(CashPaidMaster cashPaidMaster);

	List<CashPaidMaster> getCashPaidEntryLIst();

	CashPaidMaster getCashPaidEntryById(Integer cashPaidId);

	boolean deleteCashPaidEntry(Integer cashPaidId);

	List<PendingBill> getPendingBills(Integer vendorId);
	List<CashPaidMaster> getCashPaidbyVendorId(Integer vendorId);
	CashPaidMaster getCashPaidDataSaleById(Integer cashId);

	List<CashPaidMaster> getAllCashPaidDataByVendorId(Integer vendorId);
}
