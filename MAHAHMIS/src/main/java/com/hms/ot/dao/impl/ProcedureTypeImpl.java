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

import com.hms.doctordesk.dto.PrescrptionMasterDto;
import com.hms.ot.dao.ProcedureTypeDao;
import com.hms.ot.dto.ProcedureTypeMasterDto;

@Repository
@Transactional
public class ProcedureTypeImpl implements ProcedureTypeDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public String saveProcedureType(
			ProcedureTypeMasterDto procedureTypeMasterDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		procedureTypeMasterDto.setUserId(userId);
		procedureTypeMasterDto.setUnitId(unitId);
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureTypeMasterDto.class);
         criteria.add(Restrictions.eq("proName",procedureTypeMasterDto.getProName()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
         
        
		
		if(procedureTypeMasterDto.getId()==0){
			 if(criteria.uniqueResult() != null){
	        	 return "procedure type alredy exist";
	         }
			procedureTypeMasterDto.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(procedureTypeMasterDto);
			return "Procedure type saved successfully";
		}
		else{
			procedureTypeMasterDto.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(procedureTypeMasterDto);
		}
		return "Procedure type updated successfully";
	}

	@Override
	public List<ProcedureTypeMasterDto> getProcedureTypeList(String callfrom) {
		// TODO Auto-generated method stuba
		List<ProcedureTypeMasterDto> list = new ArrayList<ProcedureTypeMasterDto>(); 
		if(callfrom.equals("") || callfrom.equals(null) ||callfrom.equals("undefined")){
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureTypeMasterDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			list = criteria.list();
		}
		else{
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureTypeMasterDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.ilike("proName", callfrom,MatchMode.START));
			list = criteria.list();
		}
		
		return list;
	}

	@Override
	public List<ProcedureTypeMasterDto> getProcedureTypeById(int id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureTypeMasterDto.class);
		criteria.add(Restrictions.eq("deleted","N"));
		criteria.add(Restrictions.eq("id",id));
		return criteria.list();
	}

	@Override
	public String deleteProcedureType(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		ProcedureTypeMasterDto object = (ProcedureTypeMasterDto) sessionFactory.getCurrentSession().get(ProcedureTypeMasterDto.class,id);
		object.setDeleted_by(userId);
		object.setDeletedDate(new Date());
		object.setDeleted("Y");
		return "procedure type deleted successfully";
	}

}
