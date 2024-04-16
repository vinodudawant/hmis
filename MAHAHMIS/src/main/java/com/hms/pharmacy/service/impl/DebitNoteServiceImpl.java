package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.DebitNoteDao;
import com.hms.pharmacy.pojo.CreditNoteSlave;
import com.hms.pharmacy.pojo.DebitNoteMaster;
import com.hms.pharmacy.pojo.DebitNoteSlave;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.HospitalSaleBillSlave;
import com.hms.pharmacy.service.DebitNoteService;
import com.hms.pharmacy.service.DocumentNumberingService;

@Service
public class DebitNoteServiceImpl implements DebitNoteService{

	@Autowired
	DebitNoteDao debitNoteDao;
	
	@Autowired
	DocumentNumberingService docNumberingService;
	
	@Override
	@Transactional
	public boolean saveOrUpdateDebitNote(DebitNoteMaster debitNoteMaster) {
		
		debitNoteMaster.setDebitNoteDeleteFlag(0);
		debitNoteMaster.setDebitNoteUpdateDate(new Date(new java.util.Date()
				.getTime()));
		debitNoteMaster.setAccountStatusDebit("N");
		Integer grnid=debitNoteMaster.getPurchaseEntryId();
		if (grnid == 0 || grnid == null) {
			debitNoteMaster.getDebitNoteSlaves().remove(debitNoteMaster.getDebitNoteSlaves().size() - 1);
		}
		
		for (Iterator<DebitNoteSlave> iterator = debitNoteMaster.getDebitNoteSlaves().iterator(); iterator.hasNext(); ) 
		{
			 DebitNoteSlave debitNoteSlave=iterator.next();
				if (debitNoteSlave.getProductMaster().getProductId() == null) {
					iterator.remove();
				}
				else{ 
					if(debitNoteSlave.getDebitNoteSlavePurchaseId()!=0)
					{
						debitNoteDao.changePurchaseEntryIssueQty(debitNoteSlave.getDebitNoteSlavePurchaseId(),debitNoteSlave.getDebitNoteSlaveQty());
					}
					
					if(debitNoteSlave.getProductMaster().getBatchMaster().get(0).getBatchId()!=null)
					{
						debitNoteSlave.setDebitNoteSlaveBatchId(debitNoteSlave.getProductMaster().getBatchMaster().get(0).getBatchId());
						debitNoteMaster.getDebitNoteSlaves().set(debitNoteMaster.getDebitNoteSlaves().indexOf(debitNoteSlave), debitNoteSlave);
					}
					
					debitNoteSlave.setAccountStatusDebit("N");
				}
			}
		
		
		if(debitNoteMaster.getPurchaseEntryId()>0)
		{
			debitNoteDao.changePurchaseEntryStatus(debitNoteMaster.getPurchaseEntryId());
		}
		
		DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
		DocumentMaster documentMaster = new DocumentMaster();
		documentMaster.setDocId(2);
		docNumberingMaster.setDocumentMaster(documentMaster);
		docNumberingService.updateDocumentNumbering(docNumberingMaster);
		return debitNoteDao.saveOrUpdateDebitNote(debitNoteMaster);
	}

	@Override
	@Transactional
	public List<DebitNoteMaster> getDebitNoteList(Integer unitId) {
		return debitNoteDao.getDebitNoteList(unitId);
	}

	@Override
	@Transactional
	public List<DebitNoteMaster> getDebitNotebyVendorId(Integer vendorId,Integer unitId) {
		return debitNoteDao.getDebitNotebyVendorId(vendorId,unitId);
	}

	@Override
	@Transactional
	public DebitNoteMaster getDebitNotebyDebitId(Integer debitNoteId,Integer unitId) {
		return debitNoteDao.getDebitNotebyDebitId(debitNoteId,unitId);
	}

	@Override
	@Transactional
	public boolean deleteDebitNote(Integer debitNoteId,Integer unitId) {
		return debitNoteDao.deleteDebitNote(debitNoteId,unitId);
	}
	
	@Override
	@Transactional
	public JSONArray getDebitNoteDetailsBySaleId(Integer saleId) {
		return debitNoteDao.getDebitNoteDetailsBySaleId(saleId);
	}
}
