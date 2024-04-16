package com.hms.bmw.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.jfree.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.bmw.dao.TypeOfBagDao;
import com.hms.bmw.dto.TypeOfBagDto;
@SuppressWarnings("unchecked")
@Repository
public class TypeOfBagDaoImpl implements TypeOfBagDao{

	

static Logger log=Logger.getLogger(TypeOfBagDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	Session session;

	@Override
	public int saveTypeOfBagMaster( TypeOfBagDto typeOfBagdto, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");

	try {
		typeOfBagdto.setUnitId(unitId);
		System.out.println("Hello World   "+typeOfBagdto.getBag_type());
		/*
		 * if(typeOfBagdto.getBag_ID()==0) {
		 * sessionFactory.getCurrentSession().merge(typeOfBagdto); return 1; }else {
		 * sessionFactory.getCurrentSession().merge(typeOfBagdto); return 2; }
		 */
		sessionFactory.getCurrentSession().merge(typeOfBagdto);
		
		return 1;
		
		
	} catch (Exception e) {
		Log.error("Exception--> ", e);
	}
		return 0;
	}

	@Override
	public List<TypeOfBagDto> getbagtypes(HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<TypeOfBagDto> list =new ArrayList<TypeOfBagDto>();
		
		try {
			
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TypeOfBagDto.class);
			
			criteria.add(Restrictions.eq("deleted", "N"));
			
			list = criteria.list();
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return list;
		}
		
		return list;
	}

	@Override
	public TypeOfBagDto editTypeOfBagMaster(Integer bag_ID) {
		
		TypeOfBagDto obj = new TypeOfBagDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TypeOfBagDto.class);
			criteria.add(Restrictions.eq("bag_ID", bag_ID));
			obj = (TypeOfBagDto) criteria.uniqueResult();
			return obj;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return obj;
	}

	@Override
	public boolean deleteTypeOfBagMaster(Integer bag_ID, HttpServletRequest request) {
		
	try {
			
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			TypeOfBagDto obj = (TypeOfBagDto) sessionFactory.getCurrentSession().get(TypeOfBagDto.class,
					bag_ID);
			
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return false;
	}
	
}
