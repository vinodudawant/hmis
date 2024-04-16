package com.hms.pharmacy.dao;

import java.util.List;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.DebitNoteMaster;

public interface DebitNoteDao {

	boolean saveOrUpdateDebitNote(DebitNoteMaster debitNoteMaster);

	List<DebitNoteMaster> getDebitNoteList(Integer unitId);

	List<DebitNoteMaster> getDebitNotebyVendorId(Integer vendorId,Integer unitId);

	DebitNoteMaster getDebitNotebyDebitId(Integer debitNoteId,Integer unitId);

	boolean deleteDebitNote(Integer debitNoteId,Integer unitId);

	void changePurchaseEntryStatus(Integer poId);
	
	void changePurchaseEntryIssueQty(Integer creditNoteSlaveIndentId,Integer Qty);

	JSONArray getDebitNoteDetailsBySaleId(Integer saleId);
}
