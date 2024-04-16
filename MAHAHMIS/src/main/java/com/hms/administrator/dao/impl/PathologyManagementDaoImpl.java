package com.hms.administrator.dao.impl;

import java.util.Date;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.PathologyManagementDao;
import com.hms.dto.LabMainlab;
import com.hms.dto.LabUnitType;
import com.hms.dto.Laborgans;

@Repository
public class PathologyManagementDaoImpl implements PathologyManagementDao {

	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public String saveLabOrgan(Laborgans dto) {
		Session session = null;
		String message = null;
		try {
			
			session = sessionFactory.getCurrentSession();
			
			if(dto.getIdlabOrgans() == 0){
				session.merge(dto);
				message = "Lab Organ added successfully...";
			}else{
				Laborgans obj = (Laborgans) session.get(Laborgans.class, dto.getIdlabOrgans());
					
				if(obj != null){
					obj.setOrganName(dto.getOrganName());
					//obj.setUpdatedBy(dto.getCreatedBy());
					session.merge(obj);
					message = "Lab Organ updated successfully...";
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			message = "Oops some problem occured while adding Lab Organ...";
		}
		return message;
	}


	@Override
	public boolean deleteLabOrgan(int labOrganId, int userId) {
		
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update Laborgans set deletedBy = :deletedBy, orgStatus = :orgStatus, deletedDate = :deletedDate where idlabOrgans = :idlabOrgans");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("orgStatus", "N");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("idlabOrgans", labOrganId);
				  query.executeUpdate();
				  
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}


	@Override
	public Laborgans fetchLabOrgans(String searchText, String type) {
		
		Session session = null;
		Laborgans dto = new Laborgans();
		try {
				session = sessionFactory.getCurrentSession();
	
				if(type.equalsIgnoreCase("onload")){
					System.out.println("Onload...!");
					Criteria criteria = session.createCriteria(Laborgans.class);
							 criteria.add(Restrictions.eq("orgStatus", "Y"));
							 criteria.addOrder(Order.desc("idlabOrgans"));
							 criteria.setMaxResults(20);
					dto.setLaborgansList(criteria.list());
				}else if(type.equalsIgnoreCase("searchBtn")){
					System.out.println("searchBtn...!");
					Criteria criteria = session.createCriteria(Laborgans.class);
							 criteria.add(Restrictions.eq("orgStatus", "Y"));
							 criteria.add(Restrictions.ilike("organName", searchText, MatchMode.ANYWHERE));
					dto.setLaborgansList(criteria.list());
				}else{
					System.out.println("Auto Sugg...!");
					Criteria criteria = session.createCriteria(Laborgans.class);
							 criteria.add(Restrictions.eq("orgStatus", "Y"));
							 criteria.add(Restrictions.ilike("organName", searchText, MatchMode.ANYWHERE));
							 criteria.setMaxResults(20);
			 		 dto.setLaborgansList(criteria.list());
				}
			}catch(Exception e){
				e.printStackTrace();
			}
		return dto;
	}

	@Override
	public Laborgans getLabOrganById(int labOrganId) {
		
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("Select organName FROM Laborgans WHERE idlabOrgans =:idlabOrgans");
				  query.setParameter("idlabOrgans", labOrganId);
			String name = (String) query.uniqueResult();
			
			Laborgans dto = new Laborgans();
						 dto.setOrganName(name);
						 dto.setIdlabOrgans(labOrganId);
			return dto;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}


	@Override
	public String saveLabInfo(LabMainlab dto) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			session.merge(dto);
			
			if(dto.getIdownlab() == 0)
				return "Lab information saved.";
			else
				return "Lab information updated.";
		}catch(Exception e) {
			e.printStackTrace();
		}
		return "Oops some problem occured while adding Lab information";
	}

	@Override
	public LabMainlab getLabInfo() {
		
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			Criteria criteria = session.createCriteria(LabMainlab.class);
					 criteria.add(Restrictions.eq("deleted", "N"));
			
			return(LabMainlab) criteria.uniqueResult();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	@Override
	public String saveUnitType(LabUnitType dto) {
		
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Criteria criteria = session.createCriteria(LabUnitType.class);
					 criteria.add(Restrictions.eq("unitName", dto.getUnitName()));
					 criteria.add(Restrictions.eq("unitStatus", "N"));
					 
			if(criteria.uniqueResult() != null)
				return "This unit type is already exist.";
			
			if(dto.getIdunitType() == 0) {
				session.merge(dto);
				return "Unit type added.";
			} else {
				LabUnitType unitTypeObj = (LabUnitType) session.get(LabUnitType.class, dto.getIdunitType());
				
				if(unitTypeObj != null){
					unitTypeObj.setUnitName(dto.getUnitName());
					//unitTypeObj.setUpdatedBy(dto.getCreatedBy());
					session.merge(unitTypeObj);
				}
				return "Unit type updated.";
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	@Override
	public LabUnitType fetchAllUnitTypes(String searchText, String type) {
		Session session = null;
		LabUnitType dto = new LabUnitType();
		try {
				session = sessionFactory.getCurrentSession();
	
				if(type.equalsIgnoreCase("onload")){
					Criteria criteria = session.createCriteria(LabUnitType.class);
							 criteria.add(Restrictions.eq("unitStatus", "N"));
							 criteria.setMaxResults(20);
							 criteria.addOrder(Order.desc("idunitType"));
					dto.setUnitTypeList(criteria.list());
				}else{
					Criteria criteria = session.createCriteria(LabUnitType.class);
							 criteria.add(Restrictions.eq("unitStatus", "N"));
							 criteria.add(Restrictions.ilike("unitName", searchText, MatchMode.ANYWHERE));
			 		 dto.setUnitTypeList(criteria.list());
				}
			}catch(Exception e){
				e.printStackTrace();
			}
		return dto;
	}


	@Override
	public LabUnitType getUnitTypeId(int unitTypeId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("Select unitName FROM LabUnitType WHERE idunitType =:idunitType");
				  query.setParameter("idunitType", unitTypeId);
			String name = (String) query.uniqueResult();
			
			LabUnitType dto = new LabUnitType();
						 dto.setUnitName(name);
						 dto.setIdunitType(unitTypeId);
			return dto;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;	
	}

	@Override
	public boolean deleteUnitType(int unitTypeId, int userId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update LabUnitType set deletedBy = :deletedBy, unitStatus = :unitStatus, deletedDate = :deletedDate where idunitType = :idunitType");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("unitStatus", "Y");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("idunitType", unitTypeId);
				  query.executeUpdate();
				  
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;	
	}
}