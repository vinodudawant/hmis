package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.pharmacy.dao.PartywiseExpiryDebitNoteDao;
import com.hms.pharmacy.pojo.*;
import com.hms.pharmacy.service.*;

@Service
public class PartywiseExpiryDebitNoteServiceImpl implements PartywiseExpiryDebitNoteService{

	@Autowired
	PartywiseExpiryDebitNoteDao partywiseExpiryDebitNoteDao;
	
	@Override
	@Transactional
	public boolean saveOrUpdateDebitNote(PartywiseExpiryDebitNoteMaster debitNoteMaster) {
		debitNoteMaster.setDebitNoteDeleteFlag(0);
		debitNoteMaster.setDebitNoteUpdateDate(new Date(new java.util.Date()
				.getTime()));
		
		if (debitNoteMaster.getDebitNoteSlaves().get(debitNoteMaster.getDebitNoteSlaves().size() - 1)
				.getProductMaster().getProductId() == null) {
			debitNoteMaster.getDebitNoteSlaves().remove(debitNoteMaster.getDebitNoteSlaves().size() - 1);
		}
		
		
		return partywiseExpiryDebitNoteDao.saveOrUpdateDebitNote(debitNoteMaster);
	}

	@Override
	@Transactional
	public List<PartywiseExpiryDebitNoteMaster> getDebitNoteList() {
		return partywiseExpiryDebitNoteDao.getDebitNoteList();
	}

	@Override
	@Transactional
	public List<PartywiseExpiryDebitNoteMaster> getDebitNotebyVendorId(Integer vendorId) {
		return partywiseExpiryDebitNoteDao.getDebitNotebyVendorId(vendorId);
	}

	@Override
	@Transactional
	public PartywiseExpiryDebitNoteMaster getDebitNotebyDebitId(Integer debitNoteId) {
		return partywiseExpiryDebitNoteDao.getDebitNotebyDebitId(debitNoteId);
	}

	@Override
	@Transactional
	public boolean deleteDebitNote(Integer debitNoteId) {
		return partywiseExpiryDebitNoteDao.deleteDebitNote(debitNoteId);
	}

}
