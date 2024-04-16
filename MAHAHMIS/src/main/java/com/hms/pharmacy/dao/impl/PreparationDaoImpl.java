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

import com.hms.pharmacy.dao.PreparationDao;
import com.hms.pharmacy.pojo.*;

@Repository
public class PreparationDaoImpl implements PreparationDao
{

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdatePreparation(PreparationMaster preparationMaster) {
		// TODO Auto-generated method stub
		try {
			Integer preId = preparationMaster.getPreparationId();
			if(preId==null) {
				preId=0;
			}
			if(preId==0) {
				Query hql = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM PreparationMaster WHERE preparationDeleteFlag=0 AND preparationName= :preparationName");
				hql.setParameter("preparationName", preparationMaster.getPreparationName());
				long count =(Long) hql.uniqueResult();
				if(count !=0){	
						return false;
					
				}
				sessionFactory.getCurrentSession().saveOrUpdate(preparationMaster);
				
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(preparationMaster);
				
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<PreparationMaster> getPreparation() {
		// TODO Auto-generated method stub
		List<PreparationMaster> ltPreparationMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PreparationMaster.class);
			criteria.add(Restrictions.eq("preparationDeleteFlag", 0));
			criteria.addOrder(Order.desc("preparationId"));
			criteria.setMaxResults(10);
			ltPreparationMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltPreparationMasters;
		}
		return ltPreparationMasters;
	}

	@Override
	public Boolean deletePreparation(Integer preparationId) {
		// TODO Auto-generated method stub
		try {
			PreparationMaster preparationMaster = (PreparationMaster) sessionFactory
					.getCurrentSession().get(PreparationMaster.class, preparationId);
			preparationMaster.setPreparationDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<PreparationMaster> getAutoSuggestionPreparationNames(String letter) {
		// TODO Auto-generated method stub
		List<PreparationMaster> ltPreparationMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PreparationMaster.class);
			criteria.add(Restrictions.eq("preparationDeleteFlag", 0));
			criteria.add(Restrictions.like("preparationName", letter,
					MatchMode.ANYWHERE));
			ltPreparationMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltPreparationMasters;
		}
		return ltPreparationMasters;
	}

	@Override
	public List<PreparationMaster> getPreparationById(Integer preparationId) {
		// TODO Auto-generated method stub
		List<PreparationMaster> ltPreparationMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PreparationMaster.class);
			criteria.add(Restrictions.eq("preparationDeleteFlag", 0));
			if (preparationId != 0) {
				criteria.add(Restrictions.eq("preparationId", preparationId));
			}

			ltPreparationMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltPreparationMasters;
		}
		return ltPreparationMasters;
	}
	
	
}
