package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.CashPaidEntryDao;
import com.hms.pharmacy.dao.CashReceiptEntryDao;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.service.CashReceiptEntryService;
import com.hms.pharmacy.service.DocumentNumberingService;

@Service
public class CashReceiptEntryServiceImpl implements CashReceiptEntryService {

	@Autowired
	CashReceiptEntryDao cashReceiptEntryDao;
	

	@Autowired
	DocumentNumberingService docNumberingService;

	@Override
	@Transactional
	public boolean saveOrUpdateCashReceiptEntry(
			CashReceiptMaster cashReceiptMaster)
	{
		cashReceiptMaster.setCashReceiptDeleteFlag(0);
		cashReceiptMaster.setCashReceiptUpdateDate(new Date(
				new java.util.Date().getTime()));
		// update document numbering

		DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
		DocumentMaster documentMaster = new DocumentMaster();
		documentMaster.setDocId(2);
		docNumberingMaster.setDocumentMaster(documentMaster);
		docNumberingService.updateDocumentNumbering(docNumberingMaster);
		
		
		
		if (cashReceiptEntryDao.saveOrUpdateCashReceiptEntry(cashReceiptMaster)) {
			return true;
		} else {
			return false;
		}
	}
	@Override
	@Transactional
	public List<CashReceiptMaster> getCashs() {
		// TODO Auto-generated method stub
		return cashReceiptEntryDao.getCashs();
	}
	
	@Override
	@Transactional
	public Boolean deleteCash(Integer cashId) {
		// TODO Auto-generated method stub
		
		return cashReceiptEntryDao.deleteCash(cashId);
	}
	@Override
	@Transactional
	public List<CashReceiptMaster> getCashById(Integer cashId) {
		// TODO Auto-generated method stub
		return cashReceiptEntryDao.getCashById(cashId);
	}
	@Override
	@Transactional
	public List<CashReceiptMaster> getCashbyVendorId(Integer vendorId,Integer vendorAddId) {
		// TODO Auto-generated method stub
		return cashReceiptEntryDao.getCashbyVendorId(vendorId,vendorAddId);
	}
	
	@Override
	@Transactional
	public CashReceiptMaster getCashReceiptDataById(Integer cashId) {
		return cashReceiptEntryDao.getCashReceiptDataById(cashId);
	}
	
}

