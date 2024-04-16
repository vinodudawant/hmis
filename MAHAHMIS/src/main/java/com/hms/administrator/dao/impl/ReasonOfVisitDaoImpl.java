package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.ReasonOfVisitDao;
import com.hms.administrator.dto.UserAccessModuleDto;
import com.hms.administrator.dto.district_taluka_city;

@Repository
public class ReasonOfVisitDaoImpl implements ReasonOfVisitDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public String saveReasonOfVisit(district_taluka_city dto, Integer moduleId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			UserAccessModuleDto masterDto = (UserAccessModuleDto) session.get(UserAccessModuleDto.class, moduleId);
			dto.setUserAccessModuleDto(masterDto);
			
			session.merge(dto);
			
			return "Reason added successfully.";
			
		}catch (Exception e) {
			e.printStackTrace();
			return "Oops some problem occured while adding reason.";
		}
	}
	
	public district_taluka_city getAllReasons(String searchText, String callFrom) {
		Session session = null;
		district_taluka_city dto = new district_taluka_city();
		List<district_taluka_city> list=new ArrayList<district_taluka_city>();
		try {
			session = sessionFactory.getCurrentSession();
			if(callFrom.equalsIgnoreCase("masterForm")) {
				Criteria criteria = session.createCriteria(district_taluka_city.class);
						 criteria.add(Restrictions.eq("deleteStatus", "Y"));
						 criteria.setMaxResults(20);
						 criteria.addOrder(Order.desc("ReasonOfVisit_ID"));
						 list=criteria.list();
				dto.setReasonOfVisitDetails(list);
			}else if(callFrom.equalsIgnoreCase("searchBtn")) {
				Criteria criteria = session.createCriteria(district_taluka_city.class);
				 		 criteria.add(Restrictions.eq("deleteStatus", "Y"));
				 		 criteria.add(Restrictions.ilike("ReasonOfVisit_Name", searchText, MatchMode.ANYWHERE));
				dto.setReasonOfVisitDetails(criteria.list());
			}else {
				Criteria criteria = session.createCriteria(district_taluka_city.class);
						 criteria.add(Restrictions.eq("deleteStatus", "Y"));
						 criteria.setMaxResults(20);
						 criteria.add(Restrictions.ilike("ReasonOfVisit_Name", searchText, MatchMode.ANYWHERE));
				dto.setReasonOfVisitDetails(criteria.list());
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	@Override
	public district_taluka_city editReasons(Integer reasonId) {

		Session session = null;
		district_taluka_city dto = null;
		try {
			session = sessionFactory.getCurrentSession();
			dto = (district_taluka_city) session.get(district_taluka_city.class, reasonId);
			return dto;
		}catch(Exception e){
			e.printStackTrace();
		}
		return dto;	
	}

	@Override
	public boolean deleteReasons(Integer reasonId, Integer userId) {

		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update district_taluka_city set deletedBy = :deletedBy, deleteStatus = :deleteStatus, deletedDate = :deletedDate where ReasonOfVisit_ID = :reasonId");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("deleteStatus", "N");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("reasonId", reasonId);
				  query.executeUpdate();
				  
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;	
	}
}
