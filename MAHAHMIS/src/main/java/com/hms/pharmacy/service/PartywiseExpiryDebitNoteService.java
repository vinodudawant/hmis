package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.PartywiseExpiryDebitNoteMaster;

public interface PartywiseExpiryDebitNoteService 
{
	boolean saveOrUpdateDebitNote(PartywiseExpiryDebitNoteMaster debitNoteMaster);

	List<PartywiseExpiryDebitNoteMaster> getDebitNoteList();

	List<PartywiseExpiryDebitNoteMaster> getDebitNotebyVendorId(Integer vendorId);

	PartywiseExpiryDebitNoteMaster getDebitNotebyDebitId(Integer debitNoteId);

	boolean deleteDebitNote(Integer debitNoteId);
}
