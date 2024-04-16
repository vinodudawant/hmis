package com.hms.pharmacy.dao;
import java.util.List;

import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.CashReceiptSaleMaster;

public interface CashReceiptSaleDao
{

	boolean saveOrUpdateCashReceiptEntry(CashReceiptSaleMaster cashReceiptSaleMaster);
	List<CashReceiptSaleMaster> getCashs();

	Boolean deleteCash(Integer cashId);
	List<CashReceiptSaleMaster> getCashbyPatientId(Integer patientId);
	List<CashReceiptSaleMaster> getCashById(Integer cashId);
	CashReceiptSaleMaster getCashReceiptDataSaleById(Integer cashId);
	
}
