package com.hms.pharmacy.dao;
import java.util.List;
import com.hms.pharmacy.pojo.PartywiseExpiryDebitNoteMaster;

public interface PartywiseExpiryDebitNoteDao {

	boolean saveOrUpdateDebitNote(PartywiseExpiryDebitNoteMaster debitNoteMaster);

	List<PartywiseExpiryDebitNoteMaster> getDebitNoteList();

	List<PartywiseExpiryDebitNoteMaster> getDebitNotebyVendorId(Integer vendorId);

	PartywiseExpiryDebitNoteMaster getDebitNotebyDebitId(Integer debitNoteId);

	boolean deleteDebitNote(Integer debitNoteId);

	

}
