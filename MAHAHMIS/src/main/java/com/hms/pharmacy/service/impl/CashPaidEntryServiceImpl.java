package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.CashPaidEntryDao;
import com.hms.pharmacy.pojo.CashPaidMaster;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.ChequePaidMaster;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.service.CashPaidEntryService;

@Service
public class CashPaidEntryServiceImpl implements CashPaidEntryService {
	@Autowired
	CashPaidEntryDao cashPaidEntryDao;

	@Override
	@Transactional
	public boolean saveOrUpdateCashPaidEntry(CashPaidMaster cashPaidMaster) {
		cashPaidMaster.setCashPaidDeleteFlag(0);
		cashPaidMaster.setCashPaidUpdateDate(new Date(new java.util.Date()
				.getTime()));
		
		
		List<PurchaseMaster> purchaseMasters=new ArrayList<PurchaseMaster>();
		for(int i=0;i<cashPaidMaster.getCashPaidSlaves().size();i++)
		{
			PurchaseMaster purchaseMaster=new PurchaseMaster();
			if(cashPaidMaster.getCashPaidSlaves().get(i).getPurchaseMaster().getPurId()!=null)
			{
				purchaseMaster.setPurId(cashPaidMaster.getCashPaidSlaves().get(i).getPurchaseMaster().getPurId());
			}
			purchaseMasters.add(purchaseMaster);
		}
		cashPaidEntryDao.setPurchaseStatus(purchaseMasters);
		
		if (cashPaidEntryDao.saveOrUpdateCashPaidEntry(cashPaidMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public List<CashPaidMaster> getCashPaidEntryLIst() {
		return cashPaidEntryDao.getCashPaidEntryLIst();

	}

	@Override
	@Transactional
	public CashPaidMaster getCashPaidEntryById(Integer cashPaidId) {
		return cashPaidEntryDao.getCashPaidEntryById(cashPaidId);
	}

	@Override
	@Transactional
	public boolean deleteCashPaidEntry(Integer cashPaidId) {
		return cashPaidEntryDao.deleteCashPaidEntry(cashPaidId);
	}

	@Override
	@Transactional
	public List<CashPaidMaster> getCashPaidbyVendorId(Integer vendorId) {
		// TODO Auto-generated method stub
		return cashPaidEntryDao.getCashPaidbyVendorId(vendorId);
	}
	
	
	
	@Override
	@Transactional
	public List<PendingBill> getPendingBills(Integer vendorId) {
		List<PendingBill> pendingBills = cashPaidEntryDao
				.getPendingBills(vendorId);
		return pendingBills;
		/*List<PendingBill> finalPendingBills = new ArrayList<PendingBill>();

		PendingBill bill = null;
		if (pendingBills.size() >0)
			bill = pendingBills.get(0);
		for (int i = 0; i < pendingBills.size(); i++) {
			if (!bill.getPurchaseId().equals(
					pendingBills.get(i).getPurchaseId())
					&& i > 0) {
				bill = pendingBills.get(i);

				if (finalPendingBills.contains(bill) == false) {
					for (int j = 0; j < pendingBills.size(); j++) {
						if (bill.getPurchaseId().equals(
								pendingBills.get(j).getPurchaseId())) {
							if (Double.parseDouble(pendingBills.get(j)
									.getAmountBal()) < Double.parseDouble(bill
									.getAmountBal())) {
								bill = pendingBills.get(j);
								
								 * if(finalPendingBills.contains(bill)==false) {
								 * finalPendingBills.add(pendingBills.get(j)); }
								 
							}
						}
					}
					if (finalPendingBills.contains(bill) == false) {
						finalPendingBills.add(bill);
					}
				}
			} else if (i == 0) {
				for (int j = 0; j < pendingBills.size(); j++) {
					if (bill.getPurchaseId().equals(
							pendingBills.get(j).getPurchaseId())) {
						if (Double.parseDouble(bill.getAmountBal()) > Double
								.parseDouble(pendingBills.get(j).getAmountBal())) {
							finalPendingBills.add(pendingBills.get(j));
						}
					}
				}
				if (finalPendingBills.size() == 0) {
					finalPendingBills.add(bill);
				}
			}
		}
		return finalPendingBills;*/
	}

	@Override
	@Transactional
	public CashPaidMaster getCashPaidDataSaleById(Integer cashId) {
		return cashPaidEntryDao.getCashPaidDataSaleById(cashId);
	}

	@Override
	@Transactional
	public List<CashPaidMaster> getAllCashPaidDataByVendorId(Integer vendorId) {
		return cashPaidEntryDao.getAllCashPaidDataByVendorId(vendorId);
	}
}
