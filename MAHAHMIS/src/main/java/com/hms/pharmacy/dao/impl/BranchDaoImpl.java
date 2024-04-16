package com.hms.pharmacy.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.BranchDao;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.BranchMaster;
import com.hms.pharmacy.pojo.CompanyMaster;

@Repository
public class BranchDaoImpl implements BranchDao {
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<BranchMaster> getBranch() {
		List<BranchMaster> branchMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BranchMaster.class);
			criteria.add(Restrictions.eq("branchDeleteFlag", 0));
			criteria.addOrder(Order.desc("branchId"));
			criteria.setMaxResults(10);
		    branchMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return branchMasters;
		}
		return branchMasters;
	}

	@Override
	public boolean saveOrUpdateBranch(BranchMaster branchMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(branchMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean deleteBranch(Integer branchId) {
		// TODO Auto-generated method stub
		try {
			BranchMaster branchMaster = (BranchMaster) sessionFactory
					.getCurrentSession().get(BranchMaster.class, branchId);
			branchMaster.setBranchDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<BranchMaster> getAutoSuggestionBranchNames(String letter) {
		List<BranchMaster> branchMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BranchMaster.class);
			criteria.add(Restrictions.eq("branchDeleteFlag", 0));
			
			criteria.add(Restrictions.like("branchName", letter,
					MatchMode.ANYWHERE));
			branchMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return branchMasters;
		}
		return branchMasters;
	}

	@Override
	public List<BranchMaster> getBranchById(Integer branchId) {
		List<BranchMaster> branchMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BranchMaster.class);
			criteria.add(Restrictions.eq("branchDeleteFlag", 0));
			if (branchId != 0) {
				criteria.add(Restrictions.eq("branchId", branchId));
			}

			branchMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return branchMasters;
		}
		return branchMasters;
	}

	@Override
	public BranchMaster getBranchByIdForDate(Integer branchId) {
		
		BranchMaster branchMaster = new BranchMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BranchMaster.class);
			criteria.add(Restrictions.eq("branchDeleteFlag", 0));
			if (branchId != 0) {
				criteria.add(Restrictions.eq("branchId", branchId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("branchAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    branchMaster.setBranchAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return branchMaster;
		}
		return branchMaster;
	}
	

}