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

import com.hms.pharmacy.dao.FormDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.FormMaster;

@Repository
public class FormDaoImpl implements FormDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdateForm(FormMaster formMaster) {
		// TODO Auto-generated method stub
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(formMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<FormMaster> getForm() {
		// TODO Auto-generated method stub
		List<FormMaster> ltFormMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(FormMaster.class);
			criteria.add(Restrictions.eq("formDeleteFlag", 0));
			criteria.addOrder(Order.desc("formId"));
			criteria.setMaxResults(10);
			ltFormMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltFormMasters;
		}
		return ltFormMasters;
	}

	@Override
	public Boolean deleteForm(Integer formId) {
		// TODO Auto-generated method stub
		try {
			FormMaster formMaster = (FormMaster) sessionFactory
					.getCurrentSession().get(FormMaster.class, formId);
			formMaster.setFormDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<FormMaster> getAutoSuggestionFormNames(String letter) {
		// TODO Auto-generated method stub
		List<FormMaster> ltFormMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(FormMaster.class);
			criteria.add(Restrictions.eq("formDeleteFlag", 0));
			criteria.add(Restrictions.like("formName", letter,
					MatchMode.ANYWHERE));
			ltFormMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltFormMasters;
		}
		return ltFormMasters;
	}

	@Override
	public List<FormMaster> getFormById(Integer formId) {
		// TODO Auto-generated method stub
		List<FormMaster> ltFormMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(FormMaster.class);
			criteria.add(Restrictions.eq("formDeleteFlag", 0));
			if (formId != 0) {
				criteria.add(Restrictions.eq("formId", formId));
			}

			ltFormMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltFormMasters;
		}
		return ltFormMasters;
	}
	
	@Override
	public FormMaster getFormByIdForDate(Integer formId) {
		
		FormMaster formMaster = new FormMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(FormMaster.class);
			criteria.add(Restrictions.eq("formDeleteFlag", 0));
			if (formId != 0) {
				criteria.add(Restrictions.eq("formId", formId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("formAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    formMaster.setFormAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return formMaster;
		}
		return formMaster;
	}
	
	
	
	
	
}
