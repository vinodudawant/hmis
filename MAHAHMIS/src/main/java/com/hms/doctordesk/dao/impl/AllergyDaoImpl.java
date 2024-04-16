package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.AllergyTypeDao;
import com.hms.doctordesk.dto.AllergyReaction;
import com.hms.doctordesk.dto.AllergyTypeDto;

@Repository
@Transactional
public class AllergyDaoImpl implements AllergyTypeDao{

	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public String saveAllergyType(AllergyTypeDto allergyTypeDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		allergyTypeDto.setUserId(userId);
		allergyTypeDto.setUnitId(unitId);
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AllergyTypeDto.class);
         criteria.add(Restrictions.eq("allergyType", allergyTypeDto.getAllergyType()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
        
		
		if(allergyTypeDto.getId()==0){
			
			 if(criteria.uniqueResult() != null){
	        	 return "allergy type already exist";
	         }
			
			allergyTypeDto.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(allergyTypeDto);
			return "allergy type saved successfully";
		}
		else{
			allergyTypeDto.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(allergyTypeDto);
		}
		return "allergy type updated successfully";
	}

	@Override
	public List<AllergyTypeDto> getAllergyTypes(HttpServletRequest request,String searchText) {
		// TODO Auto-generated method stub
		List<AllergyTypeDto> list = new ArrayList<AllergyTypeDto>();
		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");
		
		if(searchText.equals("") || searchText.equals(null) || searchText.equals("undefined")){
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AllergyTypeDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));		
			criteria.add(Restrictions.eq("unitId",unitId));
			list = criteria.list();
		}
		else{
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AllergyTypeDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.ilike("allergyType",searchText,MatchMode.START));
			criteria.add(Restrictions.eq("unitId",unitId));
			list = criteria.list();
		}

		return list;
	}

	@Override
	public List<AllergyTypeDto> getAllergyById(int id) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AllergyTypeDto.class);
		criteria.add(Restrictions.eq("id",id));
		criteria.add(Restrictions.eq("deleted", "N"));		
		List<AllergyTypeDto> list = criteria.list();
		return list;
	}

	@Override
	public String deletAllergyType(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		AllergyTypeDto allergyTypeDto = (AllergyTypeDto) sessionFactory.getCurrentSession().get(AllergyTypeDto.class,id);
		allergyTypeDto.setDeleted("Y");
		allergyTypeDto.setDeletedDate(new Date());
		allergyTypeDto.setDeleted_by(userId);
		return "allergy type deleted successfully";
	}

	@Override
	public String saveAllergyRecation(AllergyReaction allergyReaction,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		allergyReaction.setUserId(userId);
		allergyReaction.setUnitId(unitId);
		System.out.println("ID"+allergyReaction.getId());
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AllergyReaction.class);
         criteria.add(Restrictions.eq("allergyReaction", allergyReaction.getAllergyReaction()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
         
		if(allergyReaction.getId()==0){
			
			if(criteria.uniqueResult() != null){
	        	 return "allergy reaction already exist";
	         }
			
			allergyReaction.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(allergyReaction);
			return "allergy type saved successfully";
		}
		else{
			allergyReaction.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(allergyReaction);
		}
		return "allergy reaction updated successfully";
	}

	@Override
	public List<AllergyReaction> getallergyReaction(HttpServletRequest request,String searchText) {
		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");
		List<AllergyReaction> list = new ArrayList<>();
		if(searchText.equals("") || searchText.equals(null) || searchText.equals("undefined")){
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AllergyReaction.class);
			criteria.add(Restrictions.eq("deleted", "N"));		
			criteria.add(Restrictions.eq("unitId",unitId));
			list = criteria.list();
		}
		else{
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AllergyReaction.class);
			criteria.add(Restrictions.eq("deleted", "N"));		
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.ilike("allergyReaction",searchText,MatchMode.START));
			list = criteria.list();
		}
		return list;
	}

	@Override
	public List<AllergyReaction> getallergyReactionById(int id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AllergyReaction.class);
		criteria.add(Restrictions.eq("id",id));
		criteria.add(Restrictions.eq("deleted", "N"));		
		List<AllergyReaction> list = criteria.list();
		return list;
	}

	@Override
	public String deletallergyReaction(int id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		AllergyReaction allergyReaction = (AllergyReaction) sessionFactory.getCurrentSession().get(AllergyReaction.class,id);
		allergyReaction.setDeleted("Y`");
		allergyReaction.setDeletedDate(new Date());
		allergyReaction.setDeleted_by(userId);
		return "allergy reaction deleted successfully";
	}

	
	

}
