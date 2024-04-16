package com.hms.pharmacy.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.PatientDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PatientMaster;

@Repository
public class PatientDaoImpl implements PatientDao 
{
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<PatientMaster> getPatient() 
	{
		List<PatientMaster> patientMasters = null;
		try 
		{
			Criteria criteria = sessionFactory.openSession().createCriteria(PatientMaster.class);
			criteria.add(Restrictions.eq("patDeleteFlag", 0));
			criteria.addOrder(Order.desc("patId"));
			criteria.setMaxResults(10);
			patientMasters = criteria.list();

		}
		catch (Exception e) 
		{
			e.printStackTrace();
			return patientMasters;
		}
		return patientMasters;
	}

	@Override
	public boolean savePatient(PatientMaster patientMaster) {
		try 
		{
			sessionFactory.getCurrentSession().saveOrUpdate(patientMaster);
			
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean deletePatient(Integer patId) {
		try {
			PatientMaster patientMaster = (PatientMaster) sessionFactory
					.getCurrentSession().get(PatientMaster.class, patId);
			patientMaster.setPatDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	
		
	}

	@Override
	public List<PatientMaster> autoSuggestionPatient(String letter) {
		List<PatientMaster> patientMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientMaster.class);
			criteria.add(Restrictions.eq("patDeleteFlag", 0));
			criteria.add(Restrictions.like("patName", letter,
					MatchMode.ANYWHERE));
			patientMasters = criteria.list();

		} catch (Exception e)
		{
			e.printStackTrace();
			return patientMasters;
		}
		return patientMasters;
	}

	@Override
	public List<PatientMaster> getPatientById(Integer patId) {
		List<PatientMaster> patientMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientMaster.class);
			criteria.add(Restrictions.eq("patDeleteFlag", 0));
			if (patId != 0) {
				criteria.add(Restrictions.eq("patId", patId));
			}

			patientMasters = criteria.list();

		} catch (Exception e) 
		{
			e.printStackTrace();
			return patientMasters;
		}
		return patientMasters;
	}

	@Override
	public PatientMaster getPatientByIdForDate(Integer patId) {
		
		PatientMaster patientMaster = new PatientMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientMaster.class);
			criteria.add(Restrictions.eq("patDeleteFlag", 0));
			if (patId != 0) {
				criteria.add(Restrictions.eq("patId", patId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("patAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    patientMaster.setPatAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return patientMaster;
		}
		return patientMaster;
	}
	
	
	
	
				
}
