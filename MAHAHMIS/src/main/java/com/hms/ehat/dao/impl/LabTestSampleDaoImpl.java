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

import com.hms.ehat.dao.LabTestSampleDao;
import com.hms.pathology.dto.LabTestSampleDTO;

@SuppressWarnings("unchecked")
@Repository
public class LabTestSampleDaoImpl implements LabTestSampleDao {
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public String saveTestSample(LabTestSampleDTO dto) {

		Session session = null;
		try{
			session = sessionFactory.getCurrentSession();
			if(dto.getIdTestSample() == 0){
				Criteria criteria = session.createCriteria(LabTestSampleDTO.class);
				 criteria.add(Restrictions.eq("sampleName", dto.getSampleName()));
				 criteria.add(Restrictions.eq("deleted", "N"));
				 LabTestSampleDTO testSample = (LabTestSampleDTO) criteria.uniqueResult();

				if(testSample != null) {
					return "The test sample is already exist.";
				}else {	
					session.merge(dto);
					return "Test sample added successfully...";
				}
			}else{
				String hqlQuery = "SELECT COUNT(*) FROM LabTestSampleDTO WHERE idTestSample NOT IN (:idTestSample) AND deleted=:deleted AND sampleName =:sampleName";
				Query hql = session.createQuery(hqlQuery);
					  hql.setParameter("idTestSample", dto.getIdTestSample());	  
					  hql.setParameter("sampleName", dto.getSampleName());
					  hql.setParameter("deleted", "N");
					  
					  Long count = (Long) hql.uniqueResult();
						
				if(count >= 1) {
					return "The test sample is already exist.";
				}else {
					LabTestSampleDTO obj = (LabTestSampleDTO) session.get(LabTestSampleDTO.class, dto.getIdTestSample());
					if(obj != null){
						obj.setSampleName(dto.getSampleName());
						obj.setUpdatedBy(dto.getCreatedBy());
					
						session.merge(obj);
					}
					return "Test sample updated successfully...";
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			return "Oops some problem occured while adding the Test sample...";
		}
	}

	@Override
	public LabTestSampleDTO fetchAllTestSamples(String searchText, String type) {

		Session session = null;
		LabTestSampleDTO dto = new LabTestSampleDTO();
		try {
			session = sessionFactory.getCurrentSession();
	
			if(type.equalsIgnoreCase("onload")){
				Criteria criteria = session.createCriteria(LabTestSampleDTO.class);
						 criteria.add(Restrictions.eq("deleted", "N"));
						 //criteria.setMaxResults(20);
						 criteria.addOrder(Order.desc("idTestSample"));
				dto.setTestSamplelist(criteria.list());
				}else if(type.equalsIgnoreCase("searchBtn")) {
					Criteria criteria = session.createCriteria(LabTestSampleDTO.class);
			 				 criteria.add(Restrictions.eq("deleted", "N"));
			 				 criteria.add(Restrictions.ilike("sampleName", searchText, MatchMode.ANYWHERE));
			 		dto.setTestSamplelist(criteria.list());
				}else{
					Criteria criteria = session.createCriteria(LabTestSampleDTO.class);
							 criteria.add(Restrictions.eq("deleted", "N"));
							 criteria.setMaxResults(20);
							 criteria.add(Restrictions.ilike("sampleName", searchText, MatchMode.ANYWHERE));
			 		 dto.setTestSamplelist(criteria.list());
				}
			}catch(Exception e){
				e.printStackTrace();
			}
		return dto;
	}

	@Override
	public LabTestSampleDTO editTestSample(int testSampleId) {

		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("Select sampleName FROM LabTestSampleDTO WHERE idTestSample =:idTestSample");
				  query.setParameter("idTestSample", testSampleId);
			String sampleName = (String) query.uniqueResult();
			
			LabTestSampleDTO dto = new LabTestSampleDTO();
						 dto.setSampleName(sampleName);
						dto.setIdTestSample(testSampleId);
			return dto;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;	
	}

	@Override
	public boolean deleteTestSample(int testSampleId, int userId) {

		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update LabTestSampleDTO set deletedBy = :deletedBy, deleted = :deleted, deletedDate = :deletedDate where idTestSample = :idTestSample");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("deleted", "Y");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("idTestSample", testSampleId);
				  query.executeUpdate();
				  
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;	
	}

}
