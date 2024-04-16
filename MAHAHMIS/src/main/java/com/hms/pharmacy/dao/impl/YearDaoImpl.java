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

import com.hms.pharmacy.dao.YearDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.FinancialYearMaster;

@Repository
public class YearDaoImpl implements YearDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdateYear(FinancialYearMaster financialYearMaster) {
		// TODO Auto-generated method stub
		try {
			
			Integer yearId = financialYearMaster.getYearId();
			if(yearId==null) {
				yearId=0;
			}
			
			if(yearId==0) {
				Query hql = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM FinancialYearMaster WHERE yearDeleteFlag=0 AND yearFinancial= :yearFinancial");
				hql.setParameter("yearFinancial", financialYearMaster.getYearFinancial());
				long count =(Long) hql.uniqueResult();
				if(count !=0){	
						return false;
					
				}
				sessionFactory.getCurrentSession().saveOrUpdate(financialYearMaster);
				
			}else {
				sessionFactory.getCurrentSession().saveOrUpdate(financialYearMaster);
				
			}
		
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<FinancialYearMaster> getYear() {
		// TODO Auto-generated method stub
		List<FinancialYearMaster> ltFinancialYearMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(FinancialYearMaster.class);
			criteria.add(Restrictions.eq("yearDeleteFlag", 0));
			criteria.addOrder(Order.desc("yearId"));
			criteria.setMaxResults(10);
			ltFinancialYearMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltFinancialYearMasters;
		}
		return ltFinancialYearMasters;
	}

	@Override
	public List<FinancialYearMaster> getYearById(Integer yearId) {
		// TODO Auto-generated method stub
		List<FinancialYearMaster> ltYearMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(FinancialYearMaster.class);
			criteria.add(Restrictions.eq("yearDeleteFlag", 0));
			if (yearId != 0) {
				criteria.add(Restrictions.eq("yearId", yearId));
			}

			ltYearMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltYearMasters;
		}
		return ltYearMasters;
	}

	@Override
	public Boolean deleteYear(Integer yearId) {
		// TODO Auto-generated method stub
		try {
			FinancialYearMaster yearMaster = (FinancialYearMaster) sessionFactory
					.getCurrentSession().get(FinancialYearMaster.class, yearId);
			yearMaster.setYearDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<FinancialYearMaster> getAutoSuggestionYear(String letter) {
		// TODO Auto-generated method stub
		List<FinancialYearMaster> ltYearMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(FinancialYearMaster.class);
			criteria.add(Restrictions.eq("yearDeleteFlag", 0));
			criteria.add(Restrictions.like("yearFinancial", letter,
					MatchMode.ANYWHERE));
			ltYearMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltYearMasters;
		}
		return ltYearMasters;
	}
	
	
	@Override
	public FinancialYearMaster getYearByIdForDate(Integer yearId) {
		
		FinancialYearMaster yearMaster = new FinancialYearMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(FinancialYearMaster.class);
			criteria.add(Restrictions.eq("yearDeleteFlag", 0));
			if (yearId != 0) {
				criteria.add(Restrictions.eq("yearId", yearId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("yearAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    yearMaster.setYearAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return yearMaster;
		}
		return yearMaster;
	}
	
	
	
	
	
	
	
	
	
	
}
