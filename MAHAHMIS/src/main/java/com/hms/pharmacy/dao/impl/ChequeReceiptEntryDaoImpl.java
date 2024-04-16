package com.hms.pharmacy.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.pharmacy.dao.ChequeReceiptEntryDao;
import com.hms.pharmacy.pojo.*;

@Repository
public class ChequeReceiptEntryDaoImpl implements ChequeReceiptEntryDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public boolean saveOrUpdateChequeReceiptEntry(
			ChequeReceiptMaster chequeReceiptMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(chequeReceiptMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<ChequeReceiptMaster> getCheques() {
		// TODO Auto-generated method stub
		List<ChequeReceiptMaster> ltChequeMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChequeReceiptMaster.class);
			criteria.add(Restrictions.eq("chequeReceiptDeleteFlag", 0));
			criteria.addOrder(Order.desc("chequeReceiptId"));
			criteria.setMaxResults(10);
			ltChequeMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChequeMasters;
		}
		return ltChequeMasters;
	}
		
	@Override
	public Boolean deleteCheque(Integer chequeId) {
		// TODO Auto-generated method stub
	/*	try {
			ChequeReceiptMaster chequeReceiptMaster = (ChequeReceiptMaster) sessionFactory
					.getCurrentSession().get(ChequeReceiptMaster.class, chequeId);
			chequeReceiptMaster.setChequeReceiptDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;*/
		try
		{
			org.hibernate.Query query=sessionFactory.getCurrentSession().createSQLQuery("update pharma_cheque_receipt_master set cheque_receipt_delete_flag=1 where cheque_receipt_id="+chequeId); 
 
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
	public List<ChequeReceiptMaster> getChequeById(Integer chequeId) {
		// TODO Auto-generated method stub
		List<ChequeReceiptMaster> ltChequeMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChequeReceiptMaster.class);
			criteria.add(Restrictions.eq("chequeReceiptDeleteFlag", 0));
			if (chequeId != 0) {
				criteria.add(Restrictions.eq("chequeReceiptId", chequeId));
			}

			ltChequeMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChequeMasters;
		}
		return ltChequeMasters;
	}
	
	// /for list
		@Override
		public List<ChequeReceiptMaster> getChequebyVendorId(Integer vendorId) {
			// TODO Auto-generated method stub
			List<ChequeReceiptMaster> ltChequeMasters = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ChequeReceiptMaster.class);
				criteria.add(Restrictions.eq("chequeReceiptDeleteFlag", 0));
				if (vendorId != 0) {
					criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
				}
				ltChequeMasters = criteria.list();

			} catch (Exception e) {
				e.printStackTrace();
				return ltChequeMasters;
			}
			return ltChequeMasters;
		}
		@SuppressWarnings("unchecked")
		@Override
		public List<BankMaster> getAutoSuggestionBranch(String letter,String BankName) 
		{
			// TODO Auto-generated method stub
			List<BankMaster> bankMasters = null;
			try {
				/*
				 * @SuppressWarnings("deprecation") Criteria criteria =
				 * sessionFactory.openSession()
				 * .createCriteria(BankMaster.class).createAlias("branchMasters",
				 * "branch",CriteriaSpecification.LEFT_JOIN);
				 */
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(BranchMaster.class);
				/*criteria.add(Restrictions.eq("productDeleteFlag", 0));*/
				criteria.add(Restrictions.like("branchName", letter,
						MatchMode.ANYWHERE));
				//criteria.add(Restrictions.eq("bankName", BankName));
				criteria.add(Restrictions.eq("branchDeleteFlag", 0));
						
				bankMasters = criteria.list();

			} catch (Exception e) {
				e.printStackTrace();
				return bankMasters;
			}
			return bankMasters;
		}
	
		@Override
		public ChequeReceiptMaster getChequeReceiptDataSaleById(Integer cashId) {
			ChequeReceiptMaster ltCashReceiptMasters = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ChequeReceiptMaster.class);
				criteria.add(Restrictions.eq("chequeReceiptDeleteFlag", 0));
				if (cashId != 0) {
					criteria.add(Restrictions.eq("chequeReceiptId", cashId));
				}
				ltCashReceiptMasters = (ChequeReceiptMaster) criteria.uniqueResult();

			} catch (Exception e) {
				e.printStackTrace();
				return ltCashReceiptMasters;
			}
			return ltCashReceiptMasters;
		}
		
	
}
