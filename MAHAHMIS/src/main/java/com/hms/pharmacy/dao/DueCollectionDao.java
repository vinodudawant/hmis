package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CreditNoteMaster;
import com.hms.pharmacy.pojo.settalBillIndent;

public interface DueCollectionDao 
{
	List<CreditNoteMaster> getDueCollectionNoteList();
	
	List<CreditNoteMaster> getUniqueDueCollectionNoteList(List<CreditNoteMaster> creditNote);
	
	boolean savePatientPendingAmount(Integer treatmentId, Double amountReceive,Double discount,Double amountBalance);
		
	boolean saveIndentPatientPendingAmount(Integer treatmentId, Double amountReceive,Double discount,Double amountBalance);
	
	settalBillIndent getPatientDatabyPatientId(Integer treatmentId);
	
	boolean savePatientTotalBill(Integer treatmentId,Double amountBalance);
	
	boolean saveIndentTotalBill(Integer treatmentId,Double amountBalance);
}
