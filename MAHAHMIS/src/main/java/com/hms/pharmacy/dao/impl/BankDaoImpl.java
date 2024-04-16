package com.hms.pharmacy.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.BankDao;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.CompanyMaster;

@Repository
public class BankDaoImpl implements BankDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdateBank(BankMaster bankMaster) {
		// TODO Auto-generated method stub
		try {
			Integer bankId = bankMaster.getBankId();
			if(bankId==null) {
				bankId=0;
			}
			if(bankId==0) {
				Query hql = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM BankMaster WHERE bankDeleteFlag=0 AND bankName= :bankName");
				hql.setParameter("bankName", bankMaster.getBankName());
				long count =(Long) hql.uniqueResult();
				if(count !=0){	
						return false;
					
				}
				sessionFactory.getCurrentSession().saveOrUpdate(bankMaster);
				
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(bankMaster);
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<BankMaster> getBanks() {
		// TODO Auto-generated method stub
		List<BankMaster> ltBankMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BankMaster.class);
			criteria.add(Restrictions.eq("bankDeleteFlag", 0));
			criteria.addOrder(Order.desc("bankId"));
			criteria.setMaxResults(10);
			ltBankMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltBankMasters;
		}
		return ltBankMasters;
	}

	@Override
	public Boolean deleteBank(Integer bankId) {
		// TODO Auto-generated method stub
		try {
			BankMaster bankMaster = (BankMaster) sessionFactory
					.getCurrentSession().get(BankMaster.class, bankId);
			bankMaster.setBankDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<BankMaster> getAutoSuggestionBankNames(String letter) {
		// TODO Auto-generated method stub
		List<BankMaster> ltBankMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BankMaster.class);
			criteria.add(Restrictions.eq("bankDeleteFlag", 0));
			criteria.add(Restrictions.like("bankName", letter,
					MatchMode.ANYWHERE));
			
			ltBankMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltBankMasters;
		}
		return ltBankMasters;
	}

	@Override
	public List<BankMaster> getBankById(Integer bankId) {
		// TODO Auto-generated method stub
		List<BankMaster> ltBankMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BankMaster.class);
			criteria.add(Restrictions.eq("bankDeleteFlag", 0));
			if (bankId != 0) {
				criteria.add(Restrictions.eq("bankId", bankId));
			}

			ltBankMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltBankMasters;
		}
		return ltBankMasters;
	}
	
	
	@Override
	public BankMaster getBankByIdForDate(Integer bankId) {
		
		BankMaster bankMaster = new BankMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BankMaster.class);
			criteria.add(Restrictions.eq("bankDeleteFlag", 0));
			if (bankId != 0) {
				criteria.add(Restrictions.eq("bankId", bankId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("bankAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    bankMaster.setBankAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return bankMaster;
		}
		return bankMaster;
	}

	@Override
	public List<BankMaster> getAllBanks() {
		List<BankMaster> ltBankMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BankMaster.class);
			criteria.add(Restrictions.eq("bankDeleteFlag", 0));
			criteria.addOrder(Order.desc("bankId"));
		
			ltBankMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltBankMasters;
		}
		return ltBankMasters;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<BankMaster> getAutoSuggestionBankNames1(String letter) {
		List<BankMaster> ltBankMasters = null;
		try {
			Query hql= sessionFactory.getCurrentSession().createQuery("Select bankId,bankName from BankMaster where bankName like:bankName");
			hql.setParameter("bankName", letter);
			
			ltBankMasters = hql.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltBankMasters;
		}
		return ltBankMasters;
	}
	
	
	
	
}