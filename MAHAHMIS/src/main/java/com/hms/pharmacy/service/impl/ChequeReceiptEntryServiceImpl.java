package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.pharmacy.dao.ChequeReceiptEntryDao;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.ChequeReceiptMaster;
import com.hms.pharmacy.service.ChequeReceiptEntryService;

@Service
public class ChequeReceiptEntryServiceImpl implements ChequeReceiptEntryService {

	@Autowired
	ChequeReceiptEntryDao chequeReceiptEntryDao;

	@Override
	@Transactional
	public boolean saveOrUpdateChequeReceiptEntry(
			ChequeReceiptMaster chequeReceiptMaster)
	{
		chequeReceiptMaster.setChequeReceiptDeleteFlag(0);
		chequeReceiptMaster.setChequeReceiptUpdateDate(new Date(
				new java.util.Date().getTime()));
		if (chequeReceiptEntryDao.saveOrUpdateChequeReceiptEntry(chequeReceiptMaster)) {
			return true;
		} else {
			return false;
		}
	}
	@Override
	@Transactional
	public List<ChequeReceiptMaster> getCheques() {
		// TODO Auto-generated method stub
		return chequeReceiptEntryDao.getCheques();
	}
	
	@Override
	@Transactional
	public Boolean deleteCheque(Integer chequeId) {
		// TODO Auto-generated method stub
		
		return chequeReceiptEntryDao.deleteCheque(chequeId);
	}
	@Override
	@Transactional
	public List<ChequeReceiptMaster> getChequeById(Integer chequeId) {
		// TODO Auto-generated method stub
		return chequeReceiptEntryDao.getChequeById(chequeId);
	}
	@Override
	@Transactional
	public List<ChequeReceiptMaster> getChequebyVendorId(Integer vendorId) {
		// TODO Auto-generated method stub
		return chequeReceiptEntryDao.getChequebyVendorId(vendorId);
	}
	@Override
	@Transactional
	public List<BankMaster> getAutoSuggestionBranch(String letter,String BankName) {
		// TODO Auto-generated method stub
		return chequeReceiptEntryDao.getAutoSuggestionBranch(letter,BankName);
	}
	@Override
	@Transactional
	public ChequeReceiptMaster getChequeReceiptDataSaleById(Integer cashId) {
		return chequeReceiptEntryDao.getChequeReceiptDataSaleById(cashId);
	}
}

