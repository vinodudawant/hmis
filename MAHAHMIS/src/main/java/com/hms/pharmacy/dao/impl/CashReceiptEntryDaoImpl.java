package com.hms.pharmacy.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.CashReceiptEntryDao;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;

@Repository
public class CashReceiptEntryDaoImpl implements CashReceiptEntryDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public boolean saveOrUpdateCashReceiptEntry(
			CashReceiptMaster cashReceiptMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(cashReceiptMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<CashReceiptMaster> getCashs() {
		// TODO Auto-generated method stub
		List<CashReceiptMaster> ltCashMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashReceiptMaster.class);
			criteria.add(Restrictions.eq("cashReceiptDeleteFlag", 0));
			criteria.addOrder(Order.desc("cashReceiptId"));
			criteria.setMaxResults(10);
			ltCashMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCashMasters;
		}
		return ltCashMasters;
	}
		
	@Override
	public Boolean deleteCash(Integer cashId) {
		// TODO Auto-generated method stub
		/*try {
			CashReceiptMaster cashReceiptMaster = (CashReceiptMaster) sessionFactory
					.getCurrentSession().get(CashReceiptMaster.class, cashId);
			cashReceiptMaster.setCashReceiptDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;*/
		try
		{
			org.hibernate.Query query=sessionFactory.getCurrentSession().createSQLQuery("update pharma_cash_receipt_master set cash_receipt_delete_flag=1 where cash_receipt_id="+cashId);
			int rowDeleted=query.executeUpdate();
			
			
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
	return true;
		
		
	}
	@Override
	public List<CashReceiptMaster> getCashById(Integer cashId) {
		// TODO Auto-generated method stub
		List<CashReceiptMaster> ltCashMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashReceiptMaster.class);
			criteria.add(Restrictions.eq("cashReceiptDeleteFlag", 0));
			if (cashId != 0) {
				criteria.add(Restrictions.eq("cashReceiptId", cashId));
			}

			ltCashMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCashMasters;
		}
		return ltCashMasters;
	}
	
	// /for list
		@Override
		public List<CashReceiptMaster> getCashbyVendorId(Integer vendorId,Integer vendorAddId) {
			// TODO Auto-generated method stub
			List<CashReceiptMaster> ltCashMasters = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(CashReceiptMaster.class);
				criteria.add(Restrictions.eq("cashReceiptDeleteFlag", 0));
				if (vendorId != 0) {
					criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
				}
				if (vendorAddId != 0) {
					criteria.add(Restrictions.eq("vendorAddress.vendorAddressId", vendorAddId));
				}
				ltCashMasters = criteria.list();

			} catch (Exception e) {
				e.printStackTrace();
				return ltCashMasters;
			}
			return ltCashMasters;
		}

		@Override
		public CashReceiptMaster getCashReceiptDataById(Integer cashId) {
			CashReceiptMaster ltCashReceiptMasters = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(CashReceiptMaster.class);
				criteria.add(Restrictions.eq("cashReceiptDeleteFlag", 0));
				if (cashId != 0) {
					criteria.add(Restrictions.eq("cashReceiptId", cashId));
				}
				ltCashReceiptMasters = (CashReceiptMaster) criteria.uniqueResult();

			} catch (Exception e) {
				e.printStackTrace();
				return ltCashReceiptMasters;
			}
			return ltCashReceiptMasters;
		}
		
	
	
	
}
