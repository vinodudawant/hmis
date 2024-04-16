package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.ChequeReceiptMaster;

public interface ChequeReceiptEntryService 
{
	boolean saveOrUpdateChequeReceiptEntry(ChequeReceiptMaster chequeReceiptMaster);
	List<ChequeReceiptMaster> getCheques();

	Boolean deleteCheque(Integer chequeId);
	
	List<ChequeReceiptMaster> getChequeById(Integer chequeId);
	List<BankMaster> getAutoSuggestionBranch(String letter,String BankName); 
	List<ChequeReceiptMaster> getChequebyVendorId(Integer vendorId);
	ChequeReceiptMaster getChequeReceiptDataSaleById(Integer cashId);
}
