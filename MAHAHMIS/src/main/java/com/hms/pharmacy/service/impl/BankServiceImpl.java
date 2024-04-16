package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.BankDao;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.service.BankService;

@Service
public class BankServiceImpl implements BankService{

	@Autowired
	BankDao bankDao;

	@Override
	@Transactional
	public Boolean saveOrUpdateBank(BankMaster bankMaster) {

		
		if(bankMaster.getBankId()==null)
		{
			bankMaster.setBankDeleteFlag(0);
			bankMaster.setBankAddDate(new Date(new java.util.Date()
					.getTime()));
			bankMaster.setBankUpdateDate(new Date(new java.util.Date()
					.getTime()));
			if(bankMaster.getBankOpeningCredit()==null || bankMaster.getBankOpeningCredit().equals("")) {
				bankMaster.setBankOpeningCredit(0);
			}
			if(bankMaster.getBankOpeningDebit()==null || bankMaster.getBankOpeningDebit().equals("")) {
				bankMaster.setBankOpeningDebit(0);
			}
		}
		else
		{
			
			
			BankMaster bankMaster2= bankDao.getBankByIdForDate(bankMaster.getBankId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			bankMaster.setBankAddDate(bankMaster2.getBankAddDate());
			bankMaster.setBankDeleteFlag(0);
			bankMaster.setBankUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
				
		if (bankDao.saveOrUpdateBank(bankMaster)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	@Transactional
	public List<BankMaster> getBanks() {
		// TODO Auto-generated method stub
		return bankDao.getBanks();
	}
	
	@Override
	@Transactional
	public Boolean deleteBank(Integer bankId) {
		// TODO Auto-generated method stub
		
		return bankDao.deleteBank(bankId);
	}
	
	@Override
	@Transactional
	public List<BankMaster> getAutoSuggestionBankNames(String letter) {
		// TODO Auto-generated method stub
		return bankDao.getAutoSuggestionBankNames(letter);
	}
	
	@Override
	@Transactional
	public List<BankMaster> getBankById(Integer bankId) {
		// TODO Auto-generated method stub
		return bankDao.getBankById(bankId);
	}

	@Override
	@Transactional
	public List<BankMaster> getAllBanks() {
		return bankDao.getAllBanks();
	}

	@Override
	@Transactional
	public List<BankMaster> getAutoSuggestionBankNames1(String letter) {
		// TODO Auto-generated method stub
		return bankDao.getAutoSuggestionBankNames1(letter);
	}	
}
