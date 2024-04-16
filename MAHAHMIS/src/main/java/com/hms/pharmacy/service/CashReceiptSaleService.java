package com.hms.pharmacy.service;
import java.util.List;
import com.hms.pharmacy.pojo.CashReceiptSaleMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
public interface CashReceiptSaleService
{
	boolean saveOrUpdateCashReceiptEntry(CashReceiptSaleMaster cashReceiptMaster);
	List<CashReceiptSaleMaster> getCashs();

	Boolean deleteCash(Integer cashId);
	
	List<CashReceiptSaleMaster> getCashById(Integer cashId);
	
	List<CashReceiptSaleMaster> getCashbyPatientId(Integer patientId);
	CashReceiptSaleMaster getCashReceiptDataSaleById(Integer cashId);
	
	}
