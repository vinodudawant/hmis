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
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.bloodbank.dao.BloodTypeMasterDao;
import com.hms.bloodbank.dto.BloodBagMaster;
import com.hms.bloodbank.dto.BloodTypeMaster;

@SuppressWarnings("unchecked")
@Repository
public class BloodTypeMasterDaoImpl implements BloodTypeMasterDao {

static Logger log=Logger.getLogger(BloodTypeMasterDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	Session session;
	@Override
	public int saveTypeGroup(BloodTypeMaster bloodBagDetails, HttpServletRequest request) {

		
		  Criteria criteria =
				  sessionFactory.getCurrentSession().createCriteria(BloodTypeMaster.class);
		  		Criterion name = Restrictions.eq("bloodTypeName",bloodBagDetails.getBloodTypeName());
		  		Criterion Status = Restrictions.eq("status","Y");
		  		LogicalExpression orExp = Restrictions.and(name,Status);
		  		criteria.add(orExp);
				  
				 
				  
				  if(bloodBagDetails.getBloodTypeId() == 0) {
					  if(criteria.uniqueResult() != null){
						  return 3;
					  }else{
							 
				 sessionFactory.getCurrentSession().merge(bloodBagDetails); 
				 return 1;
					  }
				 } 
				  else {
					  BloodTypeMaster bloodTypeMaster = (BloodTypeMaster)
				  sessionFactory.getCurrentSession().get(BloodTypeMaster.class,
						  bloodBagDetails.getBloodTypeId());
				  if(bloodTypeMaster != null) {
					  
					  bloodTypeMaster.setBloodTypeName(bloodBagDetails.getBloodTypeName());
					 
					  bloodTypeMaster.setUpdatedBy(bloodBagDetails.getCreatedBy());
				  sessionFactory.getCurrentSession().merge(bloodTypeMaster); 
				  } 
				  return 2; 
				  }

	}
	@Override
	public List<BloodTypeMaster> getAllBloodTypeMaster(HttpServletRequest request) {
		List<BloodTypeMaster> lstBloodBagMaster=new ArrayList<BloodTypeMaster>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodTypeMaster.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			lstBloodBagMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstBloodBagMaster;
	}
	@Override
	public BloodTypeMaster editBloodTypeMaster(Integer bloodTypeId) {
		BloodTypeMaster obj=new BloodTypeMaster();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodTypeMaster.class);
			criteria.add(Restrictions.eq("bloodTypeId", bloodTypeId));
			obj=(BloodTypeMaster) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}
	@Override
	public boolean deleteBloodTypeMaster(Integer bloodTypeId, HttpServletRequest request) {
		try {
			BloodTypeMaster obj =	(BloodTypeMaster)sessionFactory.getCurrentSession().get(BloodTypeMaster.class, bloodTypeId);
			obj.setStatus("N");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		return false;
	}
	@Override
	public List<BloodTypeMaster> centerBloodTypeAutoSuggestion(String bloodTypeName) {
		String sql = "";
		 List<BloodTypeMaster> lstbloodBagMaster=new ArrayList<BloodTypeMaster>();
		 try{
				sql = "SELECT b.idblood_type, b.blood_type_name FROM bb_blood_type_master b  where b.blood_type_name like '"	+ bloodTypeName +   "%' and b.status='Y' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					BloodTypeMaster obj = new BloodTypeMaster();
					obj.setBloodTypeName((String) row.get("blood_type_name"));
					obj.setBloodTypeId((Integer) row.get("idblood_type"));
					lstbloodBagMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return lstbloodBagMaster;
	}
	
}
