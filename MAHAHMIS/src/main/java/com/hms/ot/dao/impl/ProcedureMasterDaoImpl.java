package com.hms.ot.dao.impl;

import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.ot.dao.*;
import com.hms.ot.dto.*;
@Repository
@Transactional
public class ProcedureMasterDaoImpl implements ProcedureDao{

	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public String saveProcedureMaster(
			ProcedureMasterDto procedureMasterDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		procedureMasterDto.setUserId(userId);
		procedureMasterDto.setUnitId(unitId);		
		
		 ProcedureTypeMasterDto protypedto = (ProcedureTypeMasterDto) sessionFactory.getCurrentSession().get(ProcedureTypeMasterDto.class, procedureMasterDto.getProTypeId());
		 ProcedureGroupMasterDto progrpto =(ProcedureGroupMasterDto) sessionFactory.getCurrentSession().get(ProcedureGroupMasterDto.class,procedureMasterDto.getProGrpId());
		
		 procedureMasterDto.setProcedureGroupMasterDto(progrpto);
		 procedureMasterDto.setProcedureTypeMasterDto(protypedto);
		 
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureMasterDto.class);
         criteria.add(Restrictions.eq("procedureName",procedureMasterDto.getProcedureName()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
		
		if(procedureMasterDto.getId()==0){
			 if(criteria.uniqueResult() != null){
	        	 return "procedure name alredy exist";
	         }
			procedureMasterDto.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(procedureMasterDto);
			return "procedure  saved successfully";
		}
		else{
			procedureMasterDto.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(procedureMasterDto);
		}
		return "procedure  updated successfully";
	}

	@Override
	public List<ProcedureMasterDto> getProcedureMasterList(String callfrom) {
		List<ProcedureMasterDto> list = new ArrayList<ProcedureMasterDto>(); 
		if(callfrom.equals("") || callfrom.equals(null) || callfrom.equals("undefined")){
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureMasterDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			list = criteria.list();
		}
		else{
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureMasterDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.ilike("procedureName",callfrom,MatchMode.START));
			list = criteria.list();
		}	
		return list;
	}

	@Override
	public List<ProcedureMasterDto> getProcedureMasterById(int id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureMasterDto.class);
		criteria.add(Restrictions.eq("deleted","N"));
		criteria.add(Restrictions.eq("id",id));
		return criteria.list();
	}

	@Override
	public String deleteProcedureMaster(int id, HttpServletRequest request){
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		ProcedureMasterDto object = (ProcedureMasterDto) sessionFactory.getCurrentSession().get(ProcedureMasterDto.class,id);
		object.setDeleted_by(userId);
		object.setDeletedDate(new Date());
		object.setDeleted("Y");
		return "procedure deleted successfully";
	}

}
