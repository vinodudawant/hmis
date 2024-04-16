package com.hms.pharmacy.service.impl;
import java.sql.Date;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.pharmacy.dao.CashReceiptSaleDao;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.CashReceiptSaleMaster;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.service.CashReceiptSaleService;
import com.hms.pharmacy.service.DocumentNumberingService;

@Service
public class CashReceiptSaleServiceImpl implements CashReceiptSaleService {

	@Autowired
	CashReceiptSaleDao cashReceiptSaleDao;
	

	@Autowired
	DocumentNumberingService docNumberingService;

	@Override
	@Transactional
	public boolean saveOrUpdateCashReceiptEntry(
			CashReceiptSaleMaster cashReceiptSaleMaster)
	{
		cashReceiptSaleMaster.setCashReceiptSaleDeleteFlag(0);
		cashReceiptSaleMaster.setCashReceiptSaleUpdateDate(new Date(
				new java.util.Date().getTime()));
		// update document numbering

		DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
		DocumentMaster documentMaster = new DocumentMaster();
		documentMaster.setDocId(2);
		docNumberingMaster.setDocumentMaster(documentMaster);
		docNumberingService.updateDocumentNumbering(docNumberingMaster);
		
		
		
		if (cashReceiptSaleDao.saveOrUpdateCashReceiptEntry(cashReceiptSaleMaster)) {
			return true;
		} else {
			return false;
		}
	}
	@Override
	@Transactional
	public List<CashReceiptSaleMaster> getCashs() {
		// TODO Auto-generated method stub
		return cashReceiptSaleDao.getCashs();
	}
	
	@Override
	@Transactional
	public Boolean deleteCash(Integer cashId) {
		// TODO Auto-generated method stub
		
		return cashReceiptSaleDao.deleteCash(cashId);
	}
	@Override
	@Transactional
	public List<CashReceiptSaleMaster> getCashById(Integer cashId) {
		// TODO Auto-generated method stub
		return cashReceiptSaleDao.getCashById(cashId);
	}
	@Override
	@Transactional
	public List<CashReceiptSaleMaster> getCashbyPatientId(Integer patientId) {
		// TODO Auto-generated method stub
		return cashReceiptSaleDao.getCashbyPatientId(patientId);
	}
	
	
	@Override
	@Transactional
	public CashReceiptSaleMaster getCashReceiptDataSaleById(Integer cashId) {
		return cashReceiptSaleDao.getCashReceiptDataSaleById(cashId);
	}
				
}

