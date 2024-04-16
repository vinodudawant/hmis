package com.hms.ehat.dao.impl;

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

import com.hms.ehat.dao.LabUnitTypeDao;
import com.hms.pathology.dto.LabUnitTypeDTO;

@SuppressWarnings("unchecked")
@Repository
public class LabUnitTypeDaoImpl implements LabUnitTypeDao {
	
	@Autowired
	SessionFactory sessionFactory;


	@Override
	public String saveUnitType(LabUnitTypeDTO dto) {
		
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Criteria criteria = session.createCriteria(LabUnitTypeDTO.class);
					 criteria.add(Restrictions.eq("unitName", dto.getUnitName()));
					 criteria.add(Restrictions.eq("unitStatus", "N"));
					 
			if(criteria.uniqueResult() != null)
				return "This unit type is already exist.";
			
			if(dto.getIdunitType() == 0) {
				session.merge(dto);
				return "Unit type added.";
			} else {
				LabUnitTypeDTO unitTypeObj = (LabUnitTypeDTO) session.get(LabUnitTypeDTO.class, dto.getIdunitType());
				
				if(unitTypeObj != null){
					unitTypeObj.setUnitName(dto.getUnitName());
					unitTypeObj.setUpdatedBy(dto.getCreatedBy());
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
	public LabUnitTypeDTO fetchAllUnitTypes(String searchText, String type) {
		Session session = null;
		LabUnitTypeDTO dto = new LabUnitTypeDTO();
		try {
				session = sessionFactory.getCurrentSession();
	
				if(type.equalsIgnoreCase("onload")){
					Criteria criteria = session.createCriteria(LabUnitTypeDTO.class);
							 criteria.add(Restrictions.eq("unitStatus", "N"));
							 criteria.setMaxResults(20);
							 criteria.addOrder(Order.desc("idunitType"));
					dto.setUnitTypeList(criteria.list());
				}else{
					Criteria criteria = session.createCriteria(LabUnitTypeDTO.class);
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
	public LabUnitTypeDTO getUnitTypeId(int unitTypeId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("Select unitName FROM LabUnitTypeDTO WHERE idunitType =:idunitType");
				  query.setParameter("idunitType", unitTypeId);
			String name = (String) query.uniqueResult();
			
			LabUnitTypeDTO dto = new LabUnitTypeDTO();
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
			
			Query query = session.createQuery("update LabUnitTypeDTO set deletedBy = :deletedBy, unitStatus = :unitStatus, deletedDate = :deletedDate where idunitType = :idunitType");
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


	@Override
	public LabUnitTypeDTO getAllUnitTypesList() {
		Session session = null;
		LabUnitTypeDTO dto = new LabUnitTypeDTO();
		try {
				session = sessionFactory.getCurrentSession();
					Criteria criteria = session.createCriteria(LabUnitTypeDTO.class);
					criteria.add(Restrictions.eq("unitStatus", "N"));
					criteria.addOrder(Order.desc("idunitType"));
					dto.setUnitTypeList(criteria.list());
				
			}catch(Exception e){
				e.printStackTrace();
				return null;
			}
		return dto;
	}



}
