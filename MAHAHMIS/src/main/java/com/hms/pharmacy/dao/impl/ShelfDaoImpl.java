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

import com.hms.pharmacy.dao.ShelfDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.ShelfMaster;


@Repository
public class ShelfDaoImpl implements ShelfDao
{
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdateShelf(ShelfMaster shelfMaster) {
		// TODO Auto-generated method stub
		try {
			Integer shelfId = shelfMaster.getShelfId();
			if(shelfId==null) {
				shelfId=0;
			}
			if(shelfId==0) {
				Query hql = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM ShelfMaster WHERE shelfDeleteFlag=0 AND shelfName= :shelfName");
				hql.setParameter("shelfName", shelfMaster.getShelfName());
				long count =(Long) hql.uniqueResult();
				if(count !=0){	
						return false;
					
				}
				sessionFactory.getCurrentSession().saveOrUpdate(shelfMaster);
				
				
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(shelfMaster);
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<ShelfMaster> getShelfs(String type) {
		// TODO Auto-generated method stub
		List<ShelfMaster> ltShelfMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ShelfMaster.class);
			criteria.add(Restrictions.eq("shelfDeleteFlag", 0));
			criteria.addOrder(Order.desc("shelfId"));
			
			if(type.equals("all"))
			{
				
			}
			else
			{	
				criteria.setMaxResults(10);
			}	
			ltShelfMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltShelfMasters;
		}
		return ltShelfMasters;
	}

	@Override
	public Boolean deleteShelf(Integer shelfId) {
		// TODO Auto-generated method stub
		try {
			ShelfMaster shelfMaster = (ShelfMaster) sessionFactory
					.getCurrentSession().get(ShelfMaster.class, shelfId);
			shelfMaster.setShelfDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<ShelfMaster> getAutoSuggestionShelfNames(String letter) {
		// TODO Auto-generated method stub
		List<ShelfMaster> ltShelfMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ShelfMaster.class);
			criteria.add(Restrictions.eq("shelfDeleteFlag", 0));
			criteria.add(Restrictions.like("shelfName", letter,
					MatchMode.ANYWHERE));
			ltShelfMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltShelfMasters;
		}
		return ltShelfMasters;
	}

	@Override
	public List<ShelfMaster> getShelfById(Integer shelfId) {
		// TODO Auto-generated method stub
		List<ShelfMaster> ltShelfMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ShelfMaster.class);
			criteria.add(Restrictions.eq("shelfDeleteFlag", 0));
			if (shelfId != 0) {
				criteria.add(Restrictions.eq("shelfId", shelfId));
			}

			ltShelfMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltShelfMasters;
		}
		return ltShelfMasters;
	}
	
	@Override
	public ShelfMaster getShelfByIdForDate(Integer shelfId) {
		
		ShelfMaster shelfMaster = new ShelfMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ShelfMaster.class);
			criteria.add(Restrictions.eq("shelfDeleteFlag", 0));
			if (shelfId != 0) {
				criteria.add(Restrictions.eq("shelfId", shelfId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("shelfAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    shelfMaster.setShelfAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return shelfMaster;
		}
		return shelfMaster;
	}
	
	
	
	
	
	
	
	
	
	
	
}


