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

import com.hms.pharmacy.dao.UomDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.UomMaster;
@Repository
public class UomDaoImpl implements UomDao
{
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdateUom(UomMaster uomMaster) {
		// TODO Auto-generated method stub
		try {
			Integer uomId = uomMaster.getUomId();
			if(uomId==null) {
				uomId=0;
			}
			if(uomId==0) {
				Query hql = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM UomMaster WHERE uomDeleteFlag=0 AND uomName= :uomName");
				hql.setParameter("uomName", uomMaster.getUomName());
				long count =(Long) hql.uniqueResult();
				if(count !=0){	
						return false;
					
				}
				
				sessionFactory.getCurrentSession().saveOrUpdate(uomMaster);
				
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(uomMaster);
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<UomMaster> getUoms() {
		// TODO Auto-generated method stub
		List<UomMaster> ltUomMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UomMaster.class);
			criteria.add(Restrictions.eq("uomDeleteFlag", 0));
			criteria.addOrder(Order.desc("uomId"));
			criteria.setMaxResults(10);
			ltUomMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltUomMasters ;
		}
		return ltUomMasters ;
	}

	@Override
	public Boolean deleteUom(Integer uomId) {
		// TODO Auto-generated method stub
		try {
			UomMaster uomMaster = (UomMaster) sessionFactory
					.getCurrentSession().get(UomMaster.class, uomId);
			uomMaster.setUomDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<UomMaster> getAutoSuggestionUomNames(String letter) {
		// TODO Auto-generated method stub
		List<UomMaster> ltUomMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UomMaster.class);
			criteria.add(Restrictions.eq("uomDeleteFlag", 0));
			criteria.add(Restrictions.like("uomName", letter,
					MatchMode.ANYWHERE));
			ltUomMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltUomMasters ;
		}
		return ltUomMasters ;
	}

	@Override
	public List<UomMaster> getUomById(Integer uomId) {
		// TODO Auto-generated method stub
		List<UomMaster> ltUomMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UomMaster.class);
			criteria.add(Restrictions.eq("uomDeleteFlag", 0));
			if (uomId != 0) {
				criteria.add(Restrictions.eq("uomId", uomId));
			}

			ltUomMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltUomMasters ;
		}
		return ltUomMasters ;
	}
	
	@Override
	public UomMaster getUomByIdForDate(Integer uomId) {
		
		UomMaster uomMaster = new UomMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(UomMaster.class);
			criteria.add(Restrictions.eq("uomDeleteFlag", 0));
			if (uomId != 0) {
				criteria.add(Restrictions.eq("uomId", uomId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("uomAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    uomMaster.setUomAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return uomMaster;
		}
		return uomMaster;
	}
	
	
	
	
	
	
}



