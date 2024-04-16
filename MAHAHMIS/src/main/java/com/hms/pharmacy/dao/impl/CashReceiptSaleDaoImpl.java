package com.hms.pharmacy.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.CashReceiptSaleDao;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.CashReceiptSaleMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;

@Repository
public class CashReceiptSaleDaoImpl implements CashReceiptSaleDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public boolean saveOrUpdateCashReceiptEntry(
			CashReceiptSaleMaster cashReceiptSaleMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(cashReceiptSaleMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<CashReceiptSaleMaster> getCashs() {
		// TODO Auto-generated method stub
		List<CashReceiptSaleMaster> ltCashMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashReceiptSaleMaster.class);
			criteria.add(Restrictions.eq("cashReceiptSaleDeleteFlag", 0));
			criteria.addOrder(Order.desc("cashReceiptSaleId"));
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
			CashReceiptSaleMaster cashReceiptSaleMaster = (CashReceiptSaleMaster) sessionFactory
					.getCurrentSession().get(CashReceiptSaleMaster.class, cashId);
			cashReceiptSaleMaster.setCashReceiptSaleDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;*/
		
		try
		{
			org.hibernate.Query query=sessionFactory.getCurrentSession().createSQLQuery("update pharma_cash_receipt_sale_master set cash_receipt_sale_delete_flag=1 where cash_receipt_sale_id="+cashId);
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
	public List<CashReceiptSaleMaster> getCashById(Integer cashId) {
		// TODO Auto-generated method stub
		List<CashReceiptSaleMaster> ltCashMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CashReceiptSaleMaster.class);
			criteria.add(Restrictions.eq("cashReceiptSaleDeleteFlag", 0));
			if (cashId != 0) {
				criteria.add(Restrictions.eq("cashReceiptSaleId", cashId));
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
		public List<CashReceiptSaleMaster> getCashbyPatientId(Integer patientId) {
			// TODO Auto-generated method stub
			List<CashReceiptSaleMaster> ltCashMasters = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(CashReceiptSaleMaster.class);
				criteria.add(Restrictions.eq("cashReceiptSaleDeleteFlag", 0));
				if (patientId != 0) {
					criteria.add(Restrictions.eq("patientMaster.patId", patientId));
				}
				ltCashMasters = criteria.list();

			} catch (Exception e) {
				e.printStackTrace();
				return ltCashMasters;
			}
			return ltCashMasters;
		}

		@Override
		public CashReceiptSaleMaster getCashReceiptDataSaleById(Integer cashId) {
			CashReceiptSaleMaster ltCashReceiptMasters = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(CashReceiptSaleMaster.class);
				criteria.add(Restrictions.eq("cashReceiptSaleDeleteFlag", 0));
				if (cashId != 0) {
					criteria.add(Restrictions.eq("cashReceiptSaleId", cashId));
				}
				ltCashReceiptMasters = (CashReceiptSaleMaster) criteria.uniqueResult();

			} catch (Exception e) {
				e.printStackTrace();
				return ltCashReceiptMasters;
			}
			return ltCashReceiptMasters;
		}
		
	
	
	
}
