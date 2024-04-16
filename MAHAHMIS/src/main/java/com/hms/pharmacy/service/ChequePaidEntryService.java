package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.ChequePaidMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;

public interface ChequePaidEntryService {

	boolean saveOrUpdateChequePaidEntry(ChequePaidMaster chequePaidMaster);

	List<ChequePaidMaster> getChequePaidEntryLIst();

	boolean deleteChequePaidEntry(Integer chequePaidId);
	List<ChequePaidMaster> getChequePaidbyVendorId(Integer vendorId);
	ChequePaidMaster getChequeReceiptDataById(Integer cashId);
	
	ChequePaidMaster getBankDataById(Integer cashId);
	
}