package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.ChequeReceiptMaster;
import com.hms.pharmacy.pojo.ChequeReceiptSaleMaster;

public interface ChequeReceiptSaleDao 
{
	boolean saveOrUpdateChequeReceiptEntry(ChequeReceiptSaleMaster chequeReceiptMaster);
	List<ChequeReceiptSaleMaster> getCheques();

	Boolean deleteCheque(Integer chequeId);
	
	List<ChequeReceiptSaleMaster> getChequeById(Integer chequeId);
	List<BankMaster> getAutoSuggestionBranch(String letter,String BankName);
	List<ChequeReceiptSaleMaster> getChequebyPatientId(Integer patientId);
	ChequeReceiptSaleMaster getChequeReceiptDataSaleById(Integer cashId);
	
}
