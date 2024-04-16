package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.GroupMasterDTO;
import com.hms.ehat.dao.GroupMasterDao;
import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.ehat.dto.SubServiceDto;
@Repository
public class GroupMasterDaoImpl implements GroupMasterDao {
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public String saveGroupmasterRecord(GroupMasterDTO dto) {
		Session session = null;
		try{
			session = sessionFactory.getCurrentSession();
			
			if(dto.getIdgroupMaster() == 0){
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GroupMasterDTO.class);
				Criterion testCode = Restrictions.eq("groupCode", dto.getGroupCode());
		        Criterion testName = Restrictions.eq("groupName", dto.getGroupName());
		        LogicalExpression orExp = Restrictions.or(testCode, testName);
		        criteria.add(orExp);
	            criteria.add(Restrictions.eq("deleted", "N"));
				
	            GroupMasterDTO groupMethod = (GroupMasterDTO) criteria.uniqueResult();

				if(groupMethod != null) {
					return "The Group Name is already exist.";
				 }else {
					 session.merge(dto);
					 return "Group record added successfully...";
				 }
			}else{
				 String hqlQuery = "SELECT COUNT(*) FROM GroupMasterDTO WHERE idgroupMaster NOT IN (:idgroupMaster) AND deleted=:deleted AND (groupName =:groupName OR groupCode =:groupCode)";
					Query hql = session.createQuery(hqlQuery);
						  hql.setParameter("idgroupMaster", dto.getIdgroupMaster());	  
						  hql.setParameter("groupName", dto.getGroupName());
						  hql.setParameter("groupCode", dto.getGroupCode());
						  hql.setParameter("deleted", "N");
						  
						  Long count = (Long) hql.uniqueResult();
							
				 if(count >= 1) {
					return "The group name exist.";
				}else {
					GroupMasterDTO obj = (GroupMasterDTO) session.get(GroupMasterDTO.class, dto.getIdgroupMaster());
					if(obj != null){
						obj.setGroupName(dto.getGroupName());
						obj.setGroupCode(dto.getGroupCode());
						obj.setUpdatedBy(dto.getCreatedBy());
					
						session.merge(obj);
					}
					return "Group Master Record updated successfully...";
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			return "Oops some problem occured while adding the Group Master record...";
		}
	}

	@Override
	public GroupMasterDTO fetchAllGroupMaster(String searchText, String type) {
		Session session = null;
		GroupMasterDTO dto = new GroupMasterDTO();
		try {
			session = sessionFactory.getCurrentSession();
	
			if(type.equalsIgnoreCase("onload")){
				Criteria criteria = session.createCriteria(GroupMasterDTO.class);
						 criteria.add(Restrictions.eq("deleted", "N"));
						 criteria.setMaxResults(20);
						 criteria.addOrder(Order.desc("idgroupMaster"));
				dto.setGroupmasterlist(criteria.list());
				}else if(type.equalsIgnoreCase("searchBtn")) {
					Criteria criteria = session.createCriteria(GroupMasterDTO.class);
			 				 criteria.add(Restrictions.eq("deleted", "N"));
			 				 criteria.add(Restrictions.ilike("groupName", searchText, MatchMode.ANYWHERE));
			 		dto.setGroupmasterlist(criteria.list());
				}else{
					Criteria criteria = session.createCriteria(GroupMasterDTO.class);
							 criteria.add(Restrictions.eq("deleted", "N"));
							 criteria.setMaxResults(20);
							 criteria.add(Restrictions.ilike("groupName", searchText, MatchMode.ANYWHERE));
			 		 dto.setGroupmasterlist(criteria.list());
				}
			}catch(Exception e){
				e.printStackTrace();
			}
		return dto;
}

	@Override
	public GroupMasterDTO editGroupMasterrecord(int groupMasterId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("Select groupName, groupCode FROM GroupMasterDTO WHERE idgroupMaster =:idgroupMaster");
				  query.setParameter("idgroupMaster", groupMasterId);
			Object[] array = (Object[]) query.uniqueResult();
			
			GroupMasterDTO dto = new GroupMasterDTO();
						 dto.setGroupName((String) array[0]);
						 dto.setGroupCode((String) array[1]);
						 dto.setIdgroupMaster(groupMasterId);
			return dto;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;	
}

	@Override
	public boolean deleteGroupMasterRecord(int groupMasterId,int userId) {
		
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update GroupMasterDTO set deletedBy = :deletedBy, deleted = :deleted, deletedDate = :deletedDate where idgroupMaster = :idgroupMaster");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("deleted", "Y");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("idgroupMaster", groupMasterId);
				  query.executeUpdate();
				  
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;	
	}

	@Override
	public GroupMasterDTO getAllHeadingList(HttpServletRequest request) {
		List<GroupMasterDTO> list= new ArrayList<GroupMasterDTO>();
		GroupMasterDTO groupMasterDTO=new GroupMasterDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GroupMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("idgroupMaster"));
			list = criteria.list();
			if(list.size() > 0){
				groupMasterDTO.setGroupmasterlist(list);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return groupMasterDTO;
	}
	
}

