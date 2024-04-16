package com.hms.bloodbank.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.bloodbank.dao.ComponentDao;
import com.hms.bloodbank.dto.BloodBagMaster;
import com.hms.bloodbank.dto.Component;

@SuppressWarnings("unchecked")
@Repository
public class ComponentDaolmpl implements ComponentDao {

static Logger log=Logger.getLogger(ComponentDaolmpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveComponent(Component componentDetails, HttpServletRequest request) {
		try {
			
			  Criteria criteria =
					  sessionFactory.getCurrentSession().createCriteria(Component.class);
			  		Criterion name = Restrictions.eq("componentName",componentDetails.getComponentName());
			  		Criterion Status = Restrictions.eq("status","Y");
			  		LogicalExpression orExp = Restrictions.and(name,Status);
			  		criteria.add(orExp);
					  
					 
					  
					  if(componentDetails.getComponentId() == 0) {
						  if(criteria.uniqueResult() != null){
							  return 3;
						  }else{
								 
					 sessionFactory.getCurrentSession().merge(componentDetails); 
					 return 1;
						  }
					 } 
					  else {
						  Component Master = (Component)
					  sessionFactory.getCurrentSession().get(Component.class,
							  componentDetails.getComponentId());
					  if(Master != null) {
						  
						  Master.setComponentName(componentDetails.getComponentName());
						 
						  Master.setUpdatedBy(componentDetails.getCreatedBy());
					  sessionFactory.getCurrentSession().merge(Master); 
					  } 
					  return 2; 
					  }
			
		
		} catch(Exception e) {
	            log.error("Exception----> ",e);
	            System.out.println(e);
  }
  return 0;
	}

	@Override
	public Component editComponentMaster(Integer componentId) {
		Component obj=new Component();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(Component.class);
			criteria.add(Restrictions.eq("componentId", componentId));
			obj=(Component) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}

	@Override
	public boolean deleteComponentMaster(Integer componentId,Integer userId, HttpServletRequest request) {
		try {
			Component obj =	(Component)sessionFactory.getCurrentSession().get(Component.class, componentId);
			obj.setStatus("N");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		return false;
	}

	@Override
	public List<Component> getAllComponentMaster(HttpServletRequest request) {
		List<Component> lstBloodBagMaster=new ArrayList<Component>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(Component.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			lstBloodBagMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstBloodBagMaster;
	}

	@Override
	public List<Component> centerComponentAutoSuggestion(String componentName) {
		String sql = "";
		 List<Component> lstMaster=new ArrayList<Component>();
		 try{
				sql = "SELECT b.idcomponent, b.component_name FROM bb_component_master b  where b.component_name like '"	+ componentName +   "%' and b.status='Y' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					Component obj = new Component();
					obj.setComponentName((String) row.get("component_name"));
					obj.setComponentId((Integer) row.get("idcomponent"));
					lstMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return lstMaster;
	}

}
