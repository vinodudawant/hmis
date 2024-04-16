package com.hms.administrator.dao.impl;

import java.util.List;

import com.hms.administrator.dao.AdminDoctorSpecilityDao;
import com.hms.dto.DoctorSpecility;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;




@Repository
public class AdminDoctorSpecilityDaoImpl implements AdminDoctorSpecilityDao {
	static Logger log=Logger.getLogger(AdminDoctorSpecilityDaoImpl.class.getName());

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveDoctorSpeciality(DoctorSpecility cobj) {
		try {
			if(cobj.getIdDoctorSpecilities()==0)
			{
				System.err.println("Inside dao");
			sessionFactory.getCurrentSession().merge(cobj);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(cobj);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("saveDoctorSpeciality....."+e);
			return 0;
		}
	}

	@Override
	public List<DoctorSpecility> defaultViewDoctorSpeciality(Integer unitId) {
		List<DoctorSpecility> lstdoctor=new ArrayList<DoctorSpecility>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DoctorSpecility.class);
	//	criteria.add(Restrictions.eq("deleted", "N"));
		//criteria.add(Restrictions.eq("unitId", unitId));
		criteria.addOrder(Order.desc("idDoctorSpecilities"));
		criteria.add(Restrictions.eq("status", "Y"));
		lstdoctor=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("defaultViewDoctorSpeciality....."+e);

		}
		
	
		return lstdoctor;
	}

	@Override
	public DoctorSpecility editDoctorSpeciality(Integer splId) {
		DoctorSpecility obj=	(DoctorSpecility)sessionFactory.getCurrentSession().get(DoctorSpecility.class, splId);
		return obj;
	
	}

	@Override
	public boolean deleteDoctorSpecility(DoctorSpecility cobj) {
		try
		{
			sessionFactory.getCurrentSession().merge(cobj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			log.error("deleteDoctorSpecility....."+e);
		}
		return false;
	}

	@Override
	public List<DoctorSpecility> doctorSpecilityAutoSuggestion(String splName,Integer unitId) {
		List<DoctorSpecility> lstdoctor=new ArrayList<DoctorSpecility>();
		Criteria query = sessionFactory.getCurrentSession().createCriteria(DoctorSpecility.class);
		//query.add(Restrictions.eq("unitId", unitId));
		query.add(Restrictions.like("specialityName",splName, MatchMode.START));
		lstdoctor=query.list();
		return lstdoctor;
	}

}
