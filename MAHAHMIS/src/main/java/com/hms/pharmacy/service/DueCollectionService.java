package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.CreditNoteMaster;
import com.hms.pharmacy.pojo.settalBillIndent;

public interface DueCollectionService 
{
	List<CreditNoteMaster> getDueCollectionNoteList();
	
	boolean savePatientPendingAmount(Integer treatmentId, Double amountReceive,Double discount,Double amountBalance);
	
	boolean saveIndentPatientPendingAmount(Integer treatmentId, Double amountReceive,Double discount,Double amountBalance);

	settalBillIndent getPatientDatabyPatientId(Integer treatmentId);
	
	boolean savePatientTotalBill(Integer treatmentId,Double amountBalance);
	
	boolean saveIndentTotalBill(Integer treatmentId,Double amountBalance);
}
