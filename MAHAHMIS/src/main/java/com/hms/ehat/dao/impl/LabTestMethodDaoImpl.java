package com.hms.ehat.dao.impl;

import java.util.Date;

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

import com.hms.ehat.dao.LabTestMethodDao;
import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.pathology.dto.LabTestDTO;


@Repository
public class LabTestMethodDaoImpl implements LabTestMethodDao {
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public String saveTestMethod(LabTestMethodDTO dto) {

		Session session = null;
		try{
			session = sessionFactory.getCurrentSession();
			
			if(dto.getIdtestMethod() == 0){
				
				String hqlQuery = "SELECT COUNT(*) FROM LabTestMethodDTO WHERE  deleted=:deleted AND (methodName =:methodName OR methodCode =:methodCode)";
				Query hql = session.createQuery(hqlQuery);
					  //hql.setParameter("idtestMethod", dto.getIdtestMethod());	  
					  hql.setParameter("methodName", dto.getMethodName());
					  hql.setParameter("methodCode", dto.getMethodCode());
					  hql.setParameter("deleted", "N");
					  
					  Long count = (Long) hql.uniqueResult();
					  if(count >= 1) {
							return "The test method is already exist.";
						}else {
							Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabTestMethodDTO.class);
							Criterion testCode = Restrictions.eq("methodCode", dto.getMethodCode());
					        Criterion testName = Restrictions.eq("methodName", dto.getMethodName());
					        LogicalExpression orExp = Restrictions.or(testCode, testName);
					        criteria.add(orExp);
				            criteria.add(Restrictions.eq("deleted", "N"));
							
							LabTestMethodDTO testMethod = (LabTestMethodDTO) criteria.uniqueResult();
							
								session.merge(dto); 
								return "Test method added successfully...";
							
							
							/*
							 * if(testMethod != null) { return "The test method is already exist."; }else {
							 * session.merge(dto); return "Test method added successfully..."; }
							 */
						}

			
			}else{
				 String hqlQuery = "SELECT COUNT(*) FROM LabTestMethodDTO WHERE idtestMethod NOT IN (:idtestMethod) AND deleted=:deleted AND (methodName =:methodName OR methodCode =:methodCode)";
					Query hql = session.createQuery(hqlQuery);
						  hql.setParameter("idtestMethod", dto.getIdtestMethod());	  
						  hql.setParameter("methodName", dto.getMethodName());
						  hql.setParameter("methodCode", dto.getMethodCode());
						  hql.setParameter("deleted", "N");
						  
						  Long count = (Long) hql.uniqueResult();
							
				 if(count >= 1) {
					return "The test method is already exist.";
				}else {
					LabTestMethodDTO obj = (LabTestMethodDTO) session.get(LabTestMethodDTO.class, dto.getIdtestMethod());
					if(obj != null){
						obj.setMethodName(dto.getMethodName());
						obj.setMethodCode(dto.getMethodCode());
						obj.setUpdatedBy(dto.getCreatedBy());
					
						session.merge(obj);
					}
					return "Test method updated successfully...";
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			return "Oops some problem occured while adding the Test method...";
		}
	}


	@Override
	public LabTestMethodDTO fetchAllTestMethods(String searchText, String type) {

		Session session = null;
		LabTestMethodDTO dto = new LabTestMethodDTO();
		try {
			session = sessionFactory.getCurrentSession();
	
			if(type.equalsIgnoreCase("onload")){
				Criteria criteria = session.createCriteria(LabTestMethodDTO.class);
						 criteria.add(Restrictions.eq("deleted", "N"));
						 criteria.setMaxResults(20);
						 criteria.addOrder(Order.desc("idtestMethod"));
				dto.setTestMethodlist(criteria.list());
				}else if(type.equalsIgnoreCase("searchBtn")) {
					Criteria criteria = session.createCriteria(LabTestMethodDTO.class);
			 				 criteria.add(Restrictions.eq("deleted", "N"));
			 				 criteria.add(Restrictions.ilike("methodName", searchText, MatchMode.ANYWHERE));
			 		dto.setTestMethodlist(criteria.list());
				}else{
					Criteria criteria = session.createCriteria(LabTestMethodDTO.class);
							 criteria.add(Restrictions.eq("deleted", "N"));
							 criteria.setMaxResults(20);
							 criteria.add(Restrictions.ilike("methodName", searchText, MatchMode.ANYWHERE));
			 		 dto.setTestMethodlist(criteria.list());
				}
			}catch(Exception e){
				e.printStackTrace();
			}
		return dto;
	}


	@Override
	public LabTestMethodDTO editTestMethod(int testMethodId) {

		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("Select methodName, methodCode FROM LabTestMethodDTO WHERE idtestMethod =:idtestMethod");
				  query.setParameter("idtestMethod", testMethodId);
			Object[] array = (Object[]) query.uniqueResult();
			
			LabTestMethodDTO dto = new LabTestMethodDTO();
						 dto.setMethodName((String) array[0]);
						 dto.setMethodCode((String) array[1]);
						 dto.setIdtestMethod(testMethodId);
			return dto;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;	
	}

	@Override
	public boolean deleteTestMethod(int testMethodId, int userId) {

		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update LabTestMethodDTO set deletedBy = :deletedBy, deleted = :deleted, deletedDate = :deletedDate where idtestMethod = :idtestMethod");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("deleted", "Y");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("idtestMethod", testMethodId);
				  query.executeUpdate();
				  
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;	
	}
}
