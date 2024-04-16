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

import com.hms.bloodbank.dao.BloodItemMasterDao;
import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.bloodbank.dto.BloodItemMaster;

@SuppressWarnings("unchecked")
@Repository
public class BloodItemMasterDaoImpl implements BloodItemMasterDao {
	
static Logger log=Logger.getLogger(BloodItemMasterDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	Session session;

	@Override
	public int saveBloodItemMaster(BloodItemMaster bloodItemDetails, HttpServletRequest request) {
		try {
			
			  Criteria criteria =
					  sessionFactory.getCurrentSession().createCriteria(BloodItemMaster.class);
			  		Criterion name = Restrictions.eq("bloodItemName",bloodItemDetails.getBloodItemName());
			  		Criterion Status = Restrictions.eq("status","Y");
			  		LogicalExpression orExp = Restrictions.and(name,Status);
			  		criteria.add(orExp);
					  
					 
					  
					  if(bloodItemDetails.getBloodItemId() == 0) {
						  if(criteria.uniqueResult() != null){
							  return 3;
						  }else{
								 
					 sessionFactory.getCurrentSession().merge(bloodItemDetails); 
					 return 1;
						  }
					 } 
					  else {
						  BloodItemMaster blooditemMaster = (BloodItemMaster)
					  sessionFactory.getCurrentSession().get(BloodItemMaster.class,
							  bloodItemDetails.getBloodItemId());
					  if(blooditemMaster != null) {
						  
						  blooditemMaster.setBloodItemName(bloodItemDetails.getBloodItemName());
						 
						  blooditemMaster.setUpdatedBy(bloodItemDetails.getCreatedBy());
					  sessionFactory.getCurrentSession().merge(blooditemMaster); 
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
	public List<BloodItemMaster> getAllBloodItemMaster(HttpServletRequest request) {
		List<BloodItemMaster> lstBloodItemMaster=new ArrayList<BloodItemMaster>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodItemMaster.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			lstBloodItemMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstBloodItemMaster;
	}

	@Override
	public BloodItemMaster editBloodItemMaster(Integer bloodItemId) {
		BloodItemMaster obj=new BloodItemMaster();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodItemMaster.class);
			criteria.add(Restrictions.eq("bloodItemId", bloodItemId));
			obj=(BloodItemMaster) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}

	@Override
	public boolean deleteBloodItemMaster(Integer bloodItemId, Integer userId, HttpServletRequest request) {
		try {
			BloodItemMaster obj =	(BloodItemMaster)sessionFactory.getCurrentSession().get(BloodItemMaster.class, bloodItemId);
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
	public List<BloodItemMaster> centerBloodItemAutoSuggestion(String bloodItemName) {
		String sql = "";
		 List<BloodItemMaster> lstbloodItemMaster=new ArrayList<BloodItemMaster>();
		 try{
				sql = "SELECT b.idblood_item, b.blood_item_name FROM bb_blood_item_master b  where b.blood_item_name like '"	+ bloodItemName +   "%' and b.status='Y' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					BloodItemMaster obj = new BloodItemMaster();
					obj.setBloodItemName((String) row.get("blood_item_name"));
					obj.setBloodItemId((Integer) row.get("idblood_item"));
					lstbloodItemMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return lstbloodItemMaster;
	}
	

}
