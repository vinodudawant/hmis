package com.hms.ot.dao.impl;

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

import com.hms.ot.dao.*;
import com.hms.ot.dto.ProcedureGroupMasterDto;
import com.hms.ot.dto.ProcedureTypeMasterDto;

@Repository
@Transactional
public class ProcedureGrpDaoImpl implements ProcedureGrpDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public String saveProcedureGrp(
			ProcedureGroupMasterDto ProcedureGrpMasterDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		ProcedureGrpMasterDto.setUserId(userId);
		ProcedureGrpMasterDto.setUnitId(unitId);
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureGroupMasterDto.class);
         criteria.add(Restrictions.eq("proGrpName",ProcedureGrpMasterDto.getProGrpName()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
         
        
		
		if(ProcedureGrpMasterDto.getId()==0){
			 if(criteria.uniqueResult() != null){
	        	 return "procedure group alredy exist";
	         }
			ProcedureGrpMasterDto.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(ProcedureGrpMasterDto);
			return "Procedure group saved successfully";
		}
		else{
			ProcedureGrpMasterDto.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(ProcedureGrpMasterDto);
		}
		return "Procedure group updated successfully";
	}

	@Override
	public List<ProcedureGroupMasterDto> getProcedureGrpList(String callfrom) {
		List<ProcedureGroupMasterDto> list = new ArrayList<ProcedureGroupMasterDto>(); 
		if(callfrom.equals("") || callfrom.equals(null) || callfrom.equals("undefined")){
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureGroupMasterDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			list = criteria.list();
		}
		else{
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureGroupMasterDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.ilike("proGrpName", callfrom,MatchMode.START));
			list = criteria.list();
		}
		
		return list;
	}

	@Override
	public List<ProcedureGroupMasterDto> getProcedureGrpById(int id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureGroupMasterDto.class);
		criteria.add(Restrictions.eq("deleted","N"));
		criteria.add(Restrictions.eq("id",id));
		return criteria.list();
	}

	@Override
	public String deleteProcedureGrp(int id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		ProcedureGroupMasterDto object = (ProcedureGroupMasterDto) sessionFactory.getCurrentSession().get(ProcedureGroupMasterDto.class,id);
		object.setDeleted_by(userId);
		object.setDeletedDate(new Date());
		object.setDeleted("Y");
		return "procedure group deleted successfully";
	}

}
