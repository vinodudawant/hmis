package com.hms.pharmacy.service;

import java.util.List;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.DebitNoteMaster;

public interface DebitNoteService {

	boolean saveOrUpdateDebitNote(DebitNoteMaster debitNoteMaster);

	List<DebitNoteMaster> getDebitNoteList(Integer unitId);

	List<DebitNoteMaster> getDebitNotebyVendorId(Integer vendorId,Integer unitId);

	DebitNoteMaster getDebitNotebyDebitId(Integer debitNoteId,Integer unitId);

	boolean deleteDebitNote(Integer debitNoteId,Integer unitId);

	JSONArray getDebitNoteDetailsBySaleId(Integer saleId);
}
