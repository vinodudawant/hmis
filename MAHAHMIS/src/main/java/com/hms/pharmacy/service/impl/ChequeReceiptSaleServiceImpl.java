package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.pharmacy.dao.ChequeReceiptSaleDao;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.ChequeReceiptMaster;
import com.hms.pharmacy.pojo.ChequeReceiptSaleMaster;
import com.hms.pharmacy.service.ChequeReceiptSaleService;

@Service
public class ChequeReceiptSaleServiceImpl implements ChequeReceiptSaleService {

	@Autowired
	ChequeReceiptSaleDao chequeReceiptSaleDao;

	@Override
	@Transactional
	public boolean saveOrUpdateChequeReceiptEntry(
			ChequeReceiptSaleMaster chequeReceiptSaleMaster)
	{
		chequeReceiptSaleMaster.setChequeReceiptSaleDeleteFlag(0);
		chequeReceiptSaleMaster.setChequeReceiptSaleUpdateDate(new Date(
				new java.util.Date().getTime()));
		if (chequeReceiptSaleDao.saveOrUpdateChequeReceiptEntry(chequeReceiptSaleMaster)) {
			return true;
		} else {
			return false;
		}
	}
	@Override
	@Transactional
	public List<ChequeReceiptSaleMaster> getCheques() {
		// TODO Auto-generated method stub
		return chequeReceiptSaleDao.getCheques();
	}
	
	@Override
	@Transactional
	public Boolean deleteCheque(Integer chequeId) {
		// TODO Auto-generated method stub
		
		return chequeReceiptSaleDao.deleteCheque(chequeId);
	}
	@Override
	@Transactional
	public List<ChequeReceiptSaleMaster> getChequeById(Integer chequeId) {
		// TODO Auto-generated method stub
		return chequeReceiptSaleDao.getChequeById(chequeId);
	}
	@Override
	@Transactional
	public List<ChequeReceiptSaleMaster> getChequebyPatientId(Integer patientId) {
		// TODO Auto-generated method stub
		return chequeReceiptSaleDao.getChequebyPatientId(patientId);
	}
	@Override
	@Transactional
	public List<BankMaster> getAutoSuggestionBranch(String letter,String BankName) {
		// TODO Auto-generated method stub
		return chequeReceiptSaleDao.getAutoSuggestionBranch(letter,BankName);
	}
	@Override
	@Transactional
	public ChequeReceiptSaleMaster getChequeReceiptDataSaleById(Integer cashId) {
		return chequeReceiptSaleDao.getChequeReceiptDataSaleById(cashId);
	}
}

