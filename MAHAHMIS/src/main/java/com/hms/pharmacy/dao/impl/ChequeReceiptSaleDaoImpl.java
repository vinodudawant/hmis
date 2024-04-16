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
import com.hms.pharmacy.dao.ChequeReceiptSaleDao;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.ChequeReceiptMaster;
import com.hms.pharmacy.pojo.ChequeReceiptSaleMaster;

@Repository
public class ChequeReceiptSaleDaoImpl implements ChequeReceiptSaleDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public boolean saveOrUpdateChequeReceiptEntry(
			ChequeReceiptSaleMaster chequeReceiptSaleMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(chequeReceiptSaleMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<ChequeReceiptSaleMaster> getCheques() {
		// TODO Auto-generated method stub
		List<ChequeReceiptSaleMaster> ltChequeMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChequeReceiptSaleMaster.class);
			criteria.add(Restrictions.eq("chequeReceiptSaleDeleteFlag", 0));
			criteria.addOrder(Order.desc("chequeReceiptSaleId"));
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
		/*try {
			ChequeReceiptSaleMaster chequeReceiptMaster = (ChequeReceiptSaleMaster) sessionFactory
					.getCurrentSession().get(ChequeReceiptSaleMaster.class, chequeId);
			chequeReceiptMaster.setChequeReceiptSaleDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;*/
		try
		{
			org.hibernate.Query query=sessionFactory.getCurrentSession().createSQLQuery("update pharma_cheque_receipt_sale_master set cheque_receipt_sale_delete_flag=1 where cheque_receipt_sale_id="+chequeId); 
 
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
	public List<ChequeReceiptSaleMaster> getChequeById(Integer chequeId) {
		// TODO Auto-generated method stub
		List<ChequeReceiptSaleMaster> ltChequeMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChequeReceiptSaleMaster.class);
			criteria.add(Restrictions.eq("chequeReceiptSaleDeleteFlag", 0));
			if (chequeId != 0) {
				criteria.add(Restrictions.eq("chequeReceiptSaleId", chequeId));
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
		public List<ChequeReceiptSaleMaster> getChequebyPatientId(Integer patientId) {
			// TODO Auto-generated method stub
			List<ChequeReceiptSaleMaster> ltChequeMasters = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ChequeReceiptSaleMaster.class);
				criteria.add(Restrictions.eq("chequeReceiptSaleDeleteFlag", 0));
				if (patientId != 0) {
					criteria.add(Restrictions.eq("patientMaster.patId", patientId));
				}
				ltChequeMasters = criteria.list();

			} catch (Exception e) {
				e.printStackTrace();
				return ltChequeMasters;
			}
			return ltChequeMasters;
		}
		@Override
		public List<BankMaster> getAutoSuggestionBranch(String letter,String BankName) 
		{
			// TODO Auto-generated method stub
			List<BankMaster> bankMasters = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(BankMaster.class).createAlias("branchMasters", "branch",CriteriaSpecification.LEFT_JOIN);
				
				/*criteria.add(Restrictions.eq("productDeleteFlag", 0));*/
				criteria.add(Restrictions.like("branch.branchName", letter,
						MatchMode.ANYWHERE));
				criteria.add(Restrictions.eq("bankName", BankName));
				criteria.add(Restrictions.eq("branch.branchDeleteFlag", 0));
						
				bankMasters = criteria.list();

			} catch (Exception e) {
				e.printStackTrace();
				return bankMasters;
			}
			return bankMasters;
		}
	
		@Override
		public ChequeReceiptSaleMaster getChequeReceiptDataSaleById(Integer cashId) {
			ChequeReceiptSaleMaster ltCashReceiptMasters = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ChequeReceiptSaleMaster.class);
				criteria.add(Restrictions.eq("chequeReceiptSaleDeleteFlag", 0));
				if (cashId != 0) {
					criteria.add(Restrictions.eq("chequeReceiptSaleId", cashId));
				}
				ltCashReceiptMasters = (ChequeReceiptSaleMaster) criteria.uniqueResult();

			} catch (Exception e) {
				e.printStackTrace();
				return ltCashReceiptMasters;
			}
			return ltCashReceiptMasters;
		}
		
}
