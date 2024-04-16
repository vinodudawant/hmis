package com.hms.pharmacy.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

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

import com.hms.dto.Doctor;
import com.hms.pharmacy.dao.DoctorDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;

@Repository
public class DoctorDaoImpl implements DoctorDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public Boolean saveOrUpdateDoctor(DoctorMaster doctorMaster) {
		// TODO Auto-generated method stub
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(doctorMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<DoctorMaster> getDoctors() {
		// TODO Auto-generated method stub
		List<DoctorMaster> ltDoctorMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DoctorMaster.class);
			criteria.add(Restrictions.eq("doctorDeleteFlag", 0));
			criteria.addOrder(Order.desc("doctorId"));
			criteria.setMaxResults(10);
			ltDoctorMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDoctorMasters;
		}
		return ltDoctorMasters;
	}

	@Override
	public Boolean deleteDoctor(Integer doctorId) {
		// TODO Auto-generated method stub
		try {
			DoctorMaster doctorMaster = (DoctorMaster) sessionFactory
					.getCurrentSession().get(DoctorMaster.class, doctorId);
			doctorMaster.setDoctorDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<DoctorMaster> getAutoSuggestionDoctorNames(String letter) {
		// TODO Auto-generated method stub
		List<DoctorMaster> ltDoctorMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DoctorMaster.class);
			criteria.add(Restrictions.eq("doctorDeleteFlag", 0));
			criteria.add(Restrictions.like("doctorName", letter,
					MatchMode.ANYWHERE));
			ltDoctorMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDoctorMasters;
		}
		return ltDoctorMasters;
	}

	@Override
	public List<DoctorMaster> getDoctorById(Integer doctorId) {
		// TODO Auto-generated method stub
		List<DoctorMaster> ltDoctorMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DoctorMaster.class);
			criteria.add(Restrictions.eq("doctorDeleteFlag", 0));
			if (doctorId != 0) {
				criteria.add(Restrictions.eq("doctorId", doctorId));
			}

			ltDoctorMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltDoctorMasters;
		}
		return ltDoctorMasters;
	}
	
	
	@Override
	public DoctorMaster getDoctorByIdForDate(Integer doctorId) {
		
		DoctorMaster doctorMaster = new DoctorMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DoctorMaster.class);
			criteria.add(Restrictions.eq("doctorDeleteFlag", 0));
			if (doctorId != 0) {
				criteria.add(Restrictions.eq("doctorId", doctorId));
			}
			
			ProjectionList proList = Projections.projectionList();
		    proList.add(Projections.property("doctorAddDate"));
		    criteria.setProjection(proList);
			
		    Date date;
		    date=(Date) criteria.uniqueResult();
		    doctorMaster.setDoctorAddDate(date);

		} catch (Exception e) {
			e.printStackTrace();
			return doctorMaster;
		}
		return doctorMaster;
	}
	
	@Override
	public List<Doctor> fetchAutoListForDoctorName(String letter,
			String autoSuggest) {
		/*List<String> doctorName = new ArrayList<String>();

		String query = "select distinct d.doc_name,d.Doctor_ID,d.address from doctor d  where d.doc_Type = 'doctor' and (d.doc_name like '%" + letter + "%' )";
		Query docQuery1 = sessionFactory.getCurrentSession().createSQLQuery(query);				
		docQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		List<Map<String, Object>> Dname =docQuery1.list();
		
		for (Map rs : Dname) {
			String dname = (String) rs.get("doc_name");
			Integer dId = (Integer) rs.get("Doctor_ID");
			String dAdd = (String) rs.get("address");

			String name = dname + "_" + dId;

			doctorName.add(name);
		}

		return doctorName;
	}*/
	
		List<Doctor> doctor = new ArrayList<>();
		
		try {
			Criteria c =sessionFactory.getCurrentSession().createCriteria(Doctor.class);
		
			c.add(Restrictions.ilike("doc_name",letter,MatchMode.ANYWHERE));
			c.add(Restrictions.eq("deleted", "N"));
			doctor =c.list();
	
		} catch (Exception e) {
			e.printStackTrace();
	}
	return doctor;
	}	
}
