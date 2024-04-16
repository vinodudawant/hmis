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

import com.hms.bloodbank.dao.BloodBagMasterDao;
import com.hms.bloodbank.dto.BloodBagMaster;
import com.hms.bloodbank.dto.BloodGroupMaster;

@SuppressWarnings("unchecked")
@Repository
public class BloodBagMasterDaoImpl implements BloodBagMasterDao {
	
static Logger log=Logger.getLogger(BloodGroupMasterDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	Session session;

	@Override
	public int saveBloodBagMaster(BloodBagMaster bloodBagDetails, HttpServletRequest request) {
		try {
			
			  Criteria criteria =
					  sessionFactory.getCurrentSession().createCriteria(BloodBagMaster.class);
			  		Criterion name = Restrictions.eq("bloodBagtName",bloodBagDetails.getBloodBagtName());
			  		Criterion Status = Restrictions.eq("status","Y");
			  		LogicalExpression orExp = Restrictions.and(name,Status);
			  		criteria.add(orExp);
					  
					 
					  
					  if(bloodBagDetails.getBloodBagId() == 0) {
						  if(criteria.uniqueResult() != null){
							  return 3;
						  }else{
								 
					 sessionFactory.getCurrentSession().merge(bloodBagDetails); 
					 return 1;
						  }
					 } 
					  else {
						  BloodBagMaster bloodBagMaster = (BloodBagMaster)
					  sessionFactory.getCurrentSession().get(BloodBagMaster.class,
							  bloodBagDetails.getBloodBagId());
					  if(bloodBagMaster != null) {
						  
						  bloodBagMaster.setBloodBagtName(bloodBagDetails.getBloodBagtName());
						 
						  bloodBagMaster.setUpdatedBy(bloodBagDetails.getCreatedBy());
					  sessionFactory.getCurrentSession().merge(bloodBagMaster); 
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
	public List<BloodBagMaster> getAllBloodBagMaster(HttpServletRequest request) {
		List<BloodBagMaster> lstBloodBagMaster=new ArrayList<BloodBagMaster>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodBagMaster.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			lstBloodBagMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstBloodBagMaster;
	}

	@Override
	public BloodBagMaster editBloodBagtMaster(Integer bloodBagId) {
		BloodBagMaster obj=new BloodBagMaster();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodBagMaster.class);
			criteria.add(Restrictions.eq("bloodBagId", bloodBagId));
			obj=(BloodBagMaster) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}

	
	@Override
	public boolean deleteBloodBagMaster(Integer bloodBagId,Integer userId, HttpServletRequest request) {
		try {
			BloodBagMaster obj =	(BloodBagMaster)sessionFactory.getCurrentSession().get(BloodBagMaster.class, bloodBagId);
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
	public List<BloodBagMaster> centerBloodBagAutoSuggestion(String bloodBagName) {
		String sql = "";
		 List<BloodBagMaster> lstbloodBagMaster=new ArrayList<BloodBagMaster>();
		 try{
				sql = "SELECT b.idblood_bag, b.blood_bag_name FROM bb_blood_bag_master b  where b.blood_bag_name like '"	+ bloodBagName +   "%' and b.status='Y' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					BloodBagMaster obj = new BloodBagMaster();
					obj.setBloodBagtName((String) row.get("blood_bag_name"));
					obj.setBloodBagId((Integer) row.get("idblood_bag"));
					lstbloodBagMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return lstbloodBagMaster;
	}

	@Override
	public int saveBloodBagMaster1(BloodBagMaster bloodBagDetails, HttpServletRequest request) {
		 if(bloodBagDetails.getBloodBagId() == 0) {
			 int count =bloodBagDetails.getBloodBagCount();
			 Integer id=0;
			 int i=0;
			 while (i < count) {
				 try {
						
						org.hibernate.Query query = sessionFactory.getCurrentSession()
								.createQuery(
										"SELECT MAX(bloodBagId) FROM BloodBagMaster");
						Object id1 = query.uniqueResult();

						if (id1 == null) {
							id1 = 0;
						}
						id = Integer.parseInt(id1.toString()) + 1;
						String BagName="BAG"+"00"+id;
						bloodBagDetails.setBloodBagtName(BagName);
						sessionFactory.getCurrentSession().merge(bloodBagDetails); 
						i++;
						
					} catch (Exception e) {
						e.printStackTrace();
						return id;
			 }
		 }
		
	}
		 return 1; 
}
}
