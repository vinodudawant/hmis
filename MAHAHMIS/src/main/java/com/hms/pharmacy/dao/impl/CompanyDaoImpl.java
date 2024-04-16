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

import com.hms.pharmacy.dao.CompanyDao;
import com.hms.pharmacy.pojo.CompanyMaster;

@Repository
public class CompanyDaoImpl implements CompanyDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public Boolean saveOrUpdateCompany(CompanyMaster companyMaster) {
		// TODO Auto-generated method stub
		try {
			Integer compId = companyMaster.getCompId();
			if(compId==null) {
				compId=0;
			}
			if(compId==0) {
			Query bet = sessionFactory.getCurrentSession().createQuery
					("SELECT count(*) FROM CompanyMaster WHERE compDeleteFlag=0 AND compName= :compName");
			bet.setParameter("compName", companyMaster.getCompName());
			long count =(Long) bet.uniqueResult();
			if(count==0) {
			sessionFactory.getCurrentSession().merge(companyMaster);
			}else {
				return false;
			}
			
			}else {
				sessionFactory.getCurrentSession().merge(companyMaster);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<CompanyMaster> getCompanies() {
		// TODO Auto-generated method stub
		List<CompanyMaster> ltCompanyMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CompanyMaster.class);
			criteria.add(Restrictions.eq("compDeleteFlag", 0));
			criteria.addOrder(Order.desc("compId"));
			/*criteria.setMaxResults(10);*/
			ltCompanyMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCompanyMasters;
		}
		return ltCompanyMasters;
	}

	@Override
	public Boolean deleteCompany(Integer companyId) {
		// TODO Auto-generated method stub
		try {
			CompanyMaster companyMaster = (CompanyMaster) sessionFactory
					.getCurrentSession().get(CompanyMaster.class, companyId);
			companyMaster.setCompDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<CompanyMaster> getAutoSuggestionCompanyNames(String letter) {
		// TODO Auto-generated method stub
		List<CompanyMaster> ltCompanyMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CompanyMaster.class);
			criteria.add(Restrictions.eq("compDeleteFlag", 0));
			criteria.add(Restrictions.like("compName", letter,
					MatchMode.ANYWHERE));
			ltCompanyMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCompanyMasters;
		}
		return ltCompanyMasters;
	}

	@Override
	public List<CompanyMaster> getCompanyById(Integer companyId) {
		// TODO Auto-generated method stub
		List<CompanyMaster> ltCompanyMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CompanyMaster.class);
			criteria.add(Restrictions.eq("compDeleteFlag", 0));
			if (companyId != 0) {
				criteria.add(Restrictions.eq("compId", companyId));
			}

			ltCompanyMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCompanyMasters;
		}
		return ltCompanyMasters;
	}

	@Override
	public CompanyMaster getCompanyByIdForDate(Integer compId) {
		
		CompanyMaster companyMaster = new CompanyMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CompanyMaster.class);
			criteria.add(Restrictions.eq("compDeleteFlag", 0));
			if (compId != 0) {
				criteria.add(Restrictions.eq("compId", compId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("compAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
			companyMaster.setCompAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return companyMaster;
		}
		return companyMaster;
	}

	@Override
	public List<CompanyMaster> getAllCompanies() {
		List<CompanyMaster> ltCompanyMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CompanyMaster.class);
			criteria.add(Restrictions.eq("compDeleteFlag", 0));
			criteria.addOrder(Order.desc("compId"));
			ltCompanyMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCompanyMasters;
		}
		return ltCompanyMasters;
	}
	
	
	@Override
	public List<CompanyMaster> getAllCompanieswithDeleted() {
		List<CompanyMaster> ltCompanyMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CompanyMaster.class);
			criteria.addOrder(Order.desc("compId"));
			ltCompanyMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltCompanyMasters;
		}
		return ltCompanyMasters;
	}
	
	
}
