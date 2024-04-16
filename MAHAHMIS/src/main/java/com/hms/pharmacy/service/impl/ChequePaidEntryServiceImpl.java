package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.CashPaidEntryDao;
import com.hms.pharmacy.dao.ChequePaidEntryDao;
import com.hms.pharmacy.pojo.CashPaidMaster;
import com.hms.pharmacy.pojo.ChequePaidMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.service.ChequePaidEntryService;

@Service
public class ChequePaidEntryServiceImpl implements ChequePaidEntryService {

	@Autowired
	ChequePaidEntryDao chequePaidEntryDao;

	@Autowired
	CashPaidEntryDao cashPaidEntryDao;
	
	@Override
	@Transactional
	public boolean saveOrUpdateChequePaidEntry(ChequePaidMaster chequePaidMaster) {
		chequePaidMaster.setChequePaidDeleteFlag(0);
		chequePaidMaster.setChequePaidUpdateDate(new Date(new java.util.Date()
				.getTime()));
		
		List<PurchaseMaster> purchaseMasters=new ArrayList<PurchaseMaster>();
		for(int i=0;i<chequePaidMaster.getChequePaidSlaves().size();i++)
		{
			PurchaseMaster purchaseMaster=new PurchaseMaster();
			if(chequePaidMaster.getChequePaidSlaves().get(i).getPurchaseMaster().getPurId()!=null)
			{
				purchaseMaster.setPurId(chequePaidMaster.getChequePaidSlaves().get(i).getPurchaseMaster().getPurId());
			}
			purchaseMasters.add(purchaseMaster);
		}
		cashPaidEntryDao.setPurchaseStatus(purchaseMasters);
		if (chequePaidEntryDao.saveOrUpdateChequePaidEntry(chequePaidMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public List<ChequePaidMaster> getChequePaidEntryLIst() {
		return chequePaidEntryDao.getChequePaidEntryLIst();
	}

	@Override
	@Transactional
	public boolean deleteChequePaidEntry(Integer chequePaidId) {
		return chequePaidEntryDao.deleteChequePaidEntry(chequePaidId);
	}

	@Override
	@Transactional
	public List<ChequePaidMaster> getChequePaidbyVendorId(Integer vendorId) {
		// TODO Auto-generated method stub
		return chequePaidEntryDao.getChequePaidbyVendorId(vendorId);
	}
	
	@Override
	@Transactional
	public ChequePaidMaster getChequeReceiptDataById(Integer cashId) {
		return chequePaidEntryDao.getChequeReceiptDataById(cashId);
	}
	
	@Override
	@Transactional
	public ChequePaidMaster getBankDataById(Integer cashId) {
		return chequePaidEntryDao.getBankDataById(cashId);
	}
	
	
}
