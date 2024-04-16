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
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.bloodbank.dao.BloodGroupMasterDao;
import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.doctordesk.dto.ComplaintMasterDto;
import com.hms.patient.util.ConfigUIJSONUtility;


@SuppressWarnings("unchecked")
@Repository
public class BloodGroupMasterDaoImpl implements BloodGroupMasterDao{
	
static Logger log=Logger.getLogger(BloodGroupMasterDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	Session session;

	@Override
	public int saveBloodGroup(BloodGroupMaster bloodGroupDetails, HttpServletRequest request) {
		try {
			
			  Criteria criteria =
					  sessionFactory.getCurrentSession().createCriteria(BloodGroupMaster.class);
			  		Criterion name = Restrictions.eq("bloodGrouptName",bloodGroupDetails.getBloodGrouptName());
			  		Criterion Status = Restrictions.eq("status","Y");
			  		LogicalExpression orExp = Restrictions.and(name,Status);
			  		criteria.add(orExp);
					  
					 
					  
					  if(bloodGroupDetails.getBloodGroupId() == 0) {
						  if(criteria.uniqueResult() != null){
							  return 3;
						  }else{
								 
					 sessionFactory.getCurrentSession().merge(bloodGroupDetails); 
					 return 1;
						  }
					 } 
					  else {
						  BloodGroupMaster bloodGroupMaster = (BloodGroupMaster)
					  sessionFactory.getCurrentSession().get(BloodGroupMaster.class,
							  bloodGroupDetails.getBloodGroupId());
					  if(bloodGroupMaster != null) {
						  
						  bloodGroupMaster.setBloodGrouptName(bloodGroupDetails.getBloodGrouptName());
						 
						  bloodGroupMaster.setUpdatedBy(bloodGroupDetails.getCreatedBy());
					  sessionFactory.getCurrentSession().merge(bloodGroupMaster); 
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
	public List<BloodGroupMaster> getAllBloodGroupMaster(HttpServletRequest request) {
		List<BloodGroupMaster> lstBloodGroupMaster=new ArrayList<BloodGroupMaster>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodGroupMaster.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			lstBloodGroupMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstBloodGroupMaster;
	}

	@Override
	public BloodGroupMaster editBloodGrouptMaster(Integer bloodGroupId) {
		
		BloodGroupMaster obj=new BloodGroupMaster();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodGroupMaster.class);
			criteria.add(Restrictions.eq("bloodGroupId", bloodGroupId));
			obj=(BloodGroupMaster) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}

	@Override
	public boolean deleteBloodGroupMaster(Integer bloodGroupId,Integer userId, HttpServletRequest request) {
		try {
			BloodGroupMaster obj =	(BloodGroupMaster)sessionFactory.getCurrentSession().get(BloodGroupMaster.class, bloodGroupId);
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
	public List<BloodGroupMaster> centerBloodGroupAutoSuggestion(String bloodGroupName) {
		String sql = "";
		 List<BloodGroupMaster> lstbloodGroupMaster=new ArrayList<BloodGroupMaster>();
		 try{
				sql = "SELECT b.idblood_group, b.blood_group_name FROM bb_blood_group_master b  where b.blood_group_name like '"	+ bloodGroupName +   "%' and b.status='Y' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					BloodGroupMaster obj = new BloodGroupMaster();
					obj.setBloodGrouptName((String) row.get("blood_group_name"));
					obj.setBloodGroupId((Integer) row.get("idblood_group"));
					lstbloodGroupMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return lstbloodGroupMaster;
	}
}
