package com.hms.pharmacy.dao.impl;

import java.util.Date;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.*;
import com.hms.pharmacy.pojo.*;

@Repository
public class StrengthDaoImpl implements StrengthDao
{
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdateStrength(StrengthMaster strengthMaster) 
	{
		// TODO Auto-generated method stub
		try {
			Integer strengthtId = strengthMaster.getStrengthId();
			if(strengthtId==null) {
				strengthtId=0;
			}
			if(strengthtId==0) {
				Query hql = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM StrengthMaster WHERE strengthDeleteFlag=0 AND strengthName= :strengthName");
				hql.setParameter("strengthName", strengthMaster.getStrengthName());
				long count =(Long) hql.uniqueResult();
				if(count !=0){	
						return false;
					
				}
				sessionFactory.getCurrentSession().saveOrUpdate(strengthMaster);
				
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(strengthMaster);
				
			}
			
		  } 
		catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<StrengthMaster> getStrength() 
	{
		// TODO Auto-generated method stub
		List<StrengthMaster> ltStrengthMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(StrengthMaster.class);
			criteria.add(Restrictions.eq("strengthDeleteFlag", 0));
			criteria.addOrder(Order.desc("strengthId"));
			/*criteria.setMaxResults(10);*/
			ltStrengthMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltStrengthMasters;
		}
		return ltStrengthMasters;
	}

	@Override
	public Boolean deleteStrength(Integer strengthId) 
	{
		// TODO Auto-generated method stub
		try {
			StrengthMaster strengthMaster = (StrengthMaster) sessionFactory
					.getCurrentSession().get(StrengthMaster.class,strengthId);
			strengthMaster.setStrengthDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<StrengthMaster> getAutoSuggestionStrengthNames(String letter) 
	{
		// TODO Auto-generated method stub
		List<StrengthMaster> ltStrengthMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(StrengthMaster.class);
			criteria.add(Restrictions.eq("strengthDeleteFlag", 0));
			criteria.add(Restrictions.like("strengthName", letter,
					MatchMode.ANYWHERE));
			ltStrengthMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltStrengthMasters;
		}
		return ltStrengthMasters;
	}

	@Override
	public List<StrengthMaster> getStrengthById(Integer strengthId)
	{
		// TODO Auto-generated method stub
		List<StrengthMaster> ltStrengthMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(StrengthMaster.class);
			criteria.add(Restrictions.eq("strengthDeleteFlag", 0));
			if (strengthId != 0) {
				criteria.add(Restrictions.eq("strengthId",strengthId));
			}

			ltStrengthMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltStrengthMasters;
		}
		return ltStrengthMasters;
	}
	
}