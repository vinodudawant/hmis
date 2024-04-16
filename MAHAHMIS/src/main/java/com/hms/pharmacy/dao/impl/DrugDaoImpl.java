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

import com.hms.pharmacy.dao.DrugDao;
import com.hms.pharmacy.pojo.DrugMaster;

@Repository
public class DrugDaoImpl implements DrugDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<DrugMaster> getDrug() {
		List<DrugMaster> drugMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
					DrugMaster.class);
			criteria.add(Restrictions.eq("drugDeleteFlag", 0));
			criteria.addOrder(Order.desc("drugId"));
			/*criteria.setMaxResults(10);*/
			drugMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return drugMasters;
		}
		return drugMasters;
	}

	@Override
	public boolean saveDrug(DrugMaster drugMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(drugMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean deleteDrug(Integer drugId) {
		try {
			DrugMaster drugMaster = (DrugMaster) sessionFactory
					.getCurrentSession().get(DrugMaster.class, drugId);
			drugMaster.setDrugDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<DrugMaster> getAutoSuggestionDrugName(String letter) {
		List<DrugMaster> drugMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DrugMaster.class);
			criteria.add(Restrictions.eq("drugDeleteFlag", 0));
			criteria.add(Restrictions.like("drugName", letter,
					MatchMode.ANYWHERE));
			drugMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return drugMasters;
		}
		return drugMasters;
	}

	@Override
	public List<DrugMaster> getDrugById(Integer drugId) {
		List<DrugMaster> drugMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DrugMaster.class);
			criteria.add(Restrictions.eq("drugDeleteFlag", 0));
			if (drugId != 0) {
				criteria.add(Restrictions.eq("drugId", drugId));
			}

			drugMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return drugMasters;
		}
		return drugMasters;
	}


	@Override
	public DrugMaster getDrugByIdForDate(Integer drugId) {
		
		DrugMaster drugMaster = new DrugMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DrugMaster.class);
			criteria.add(Restrictions.eq("drugDeleteFlag", 0));
			if (drugId != 0) {
				criteria.add(Restrictions.eq("drugId", drugId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("drugAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    drugMaster.setDrugAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return drugMaster;
		}
		return drugMaster;
	}

	@Override
	public List<DrugMaster> getAllDrugs() {
		List<DrugMaster> drugMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
					DrugMaster.class);
			criteria.add(Restrictions.eq("drugDeleteFlag", 0));
			criteria.addOrder(Order.desc("drugId"));
			
			drugMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return drugMasters;
		}
		return drugMasters;
	}
	
}
