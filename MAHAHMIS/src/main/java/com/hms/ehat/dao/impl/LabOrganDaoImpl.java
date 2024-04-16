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

import com.hms.dto.Laborgans;
import com.hms.ehat.dao.LabOrganDao;
import com.hms.ehat.dto.LabOrgansDTO;

@SuppressWarnings("unchecked")
@Repository
public class LabOrganDaoImpl implements LabOrganDao {

	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public String saveLabOrgan(LabOrgansDTO dto) {
		Session session = null;
		String message = null;
		try {
			
			session = sessionFactory.getCurrentSession();
			
			if(dto.getIdlabOrgans() == 0){
				session.merge(dto);
				message = "Lab Organ added successfully...";
			}else{
				LabOrgansDTO obj = (LabOrgansDTO) session.get(LabOrgansDTO.class, dto.getIdlabOrgans());
					
				if(obj != null){
					obj.setOrganName(dto.getOrganName());
					obj.setUpdatedBy(dto.getCreatedBy());
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
			
			Query query = session.createQuery("update LabOrgansDTO set deletedBy = :deletedBy, orgStatus = :orgStatus, deletedDate = :deletedDate where idlabOrgans = :idlabOrgans");
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
	public LabOrgansDTO fetchLabOrgans(String searchText, String type) {
		
		Session session = null;
		LabOrgansDTO dto = new LabOrgansDTO();
		try {
				session = sessionFactory.getCurrentSession();
	
				if(type.equalsIgnoreCase("onload")){
					Criteria criteria = session.createCriteria(LabOrgansDTO.class);
							 criteria.add(Restrictions.eq("orgStatus", "Y"));
							 criteria.addOrder(Order.desc("idlabOrgans"));
							 criteria.setMaxResults(20);
					dto.setLabOrgansList(criteria.list());
				}else if(type.equalsIgnoreCase("searchBtn")){
					Criteria criteria = session.createCriteria(LabOrgansDTO.class);
							 criteria.add(Restrictions.eq("orgStatus", "Y"));
							 criteria.add(Restrictions.ilike("organName", searchText, MatchMode.ANYWHERE));
					dto.setLabOrgansList(criteria.list());
				}else{
					Criteria criteria = session.createCriteria(LabOrgansDTO.class);
							 criteria.add(Restrictions.eq("orgStatus", "Y"));
							 criteria.add(Restrictions.ilike("organName", searchText, MatchMode.ANYWHERE));
							 criteria.setMaxResults(20);
			 		dto.setLabOrgansList(criteria.list());
				}
			}catch(Exception e){
				e.printStackTrace();
			}
		return dto;
	}

	@Override
	public LabOrgansDTO getLabOrganById(int labOrganId) {
		
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("Select organName FROM LabOrgansDTO WHERE idlabOrgans =:idlabOrgans");
				  query.setParameter("idlabOrgans", labOrganId);
			String name = (String) query.uniqueResult();
			
			LabOrgansDTO dto = new LabOrgansDTO();
						 dto.setOrganName(name);
						 dto.setIdlabOrgans(labOrganId);
			return dto;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
}
