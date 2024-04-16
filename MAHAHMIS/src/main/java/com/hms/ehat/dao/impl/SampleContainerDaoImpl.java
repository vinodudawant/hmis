package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.SampleContainerDao;
import com.hms.pathology.dto.SampleContainerDTO;

@SuppressWarnings("unchecked")
@Repository
public class SampleContainerDaoImpl implements SampleContainerDao {

	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public int saveSampleContainer(SampleContainerDTO sampleContainer,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");	
           
            if(sampleContainer.getIdSampleConatiner() == 0) {
            	Query hqlQry = sessionFactory.getCurrentSession().createQuery("SELECT COUNT(*) FROM SampleContainerDTO WHERE conatinerName=:conatinerName AND deleted=:deleted ");
				  	  hqlQry.setParameter("conatinerName", sampleContainer.getConatinerName());
				  	  hqlQry.setParameter("deleted", "N");
				  
				Long count = (Long)hqlQry.uniqueResult();
				
				if(count > 0)
					return 3;
				
            	sampleContainer.setCreatedBy(userId);
            	sessionFactory.getCurrentSession().merge(sampleContainer);
                return 1;
            }else{
            	String hqlQuery = "SELECT COUNT(*) FROM SampleContainerDTO WHERE idSampleConatiner NOT IN (:idSampleConatiner) AND conatinerName=:conatinerName AND deleted=:deleted ";
            	Query hqlQry = sessionFactory.getCurrentSession().createQuery(hqlQuery);
            		  hqlQry.setParameter("idSampleConatiner", sampleContainer.getIdSampleConatiner()); 
            		  hqlQry.setParameter("conatinerName", sampleContainer.getConatinerName());
            		  hqlQry.setParameter("deleted", "N");
				  
				Long count = (Long)hqlQry.uniqueResult();
            	
				if(count > 0)
					return 3;
					
            	SampleContainerDTO sampleContainerDTO = (SampleContainerDTO) sessionFactory.getCurrentSession().get(SampleContainerDTO.class, sampleContainer.getIdSampleConatiner());
                if(sampleContainerDTO != null){
                	sampleContainerDTO.setConatinerName(sampleContainer.getConatinerName());
                	sampleContainerDTO.setUpdatedBy(userId);
                	sessionFactory.getCurrentSession().merge(sampleContainerDTO);
                }
                return 2;
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return 0;
	}

	
	@Override
	public List<SampleContainerDTO> getAllSampleContainer() {
		try {
        	List<SampleContainerDTO> sampleContainerList=new ArrayList<SampleContainerDTO>();
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SampleContainerDTO.class);
            criteria.add(Restrictions.eq("deleted", "N"));
            criteria.addOrder(Order.asc("conatinerName"));
            sampleContainerList=criteria.list();
            return  sampleContainerList;      
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }
	}

	@Override
	public SampleContainerDTO editSampleContainerById(int sampleContainerId,
			HttpServletRequest request) {
		 try {
			 SampleContainerDTO sampleContainerDTO=new SampleContainerDTO();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SampleContainerDTO.class);
	            criteria.add(Restrictions.eq("idSampleConatiner", sampleContainerId));
	            criteria.add(Restrictions.eq("deleted", "N"));
	            sampleContainerDTO=(SampleContainerDTO) criteria.uniqueResult();
	            return sampleContainerDTO;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}

	@Override
	public boolean deleteSampleContainerById(int sampleContainerId,
			HttpServletRequest request) {
		try {
			SampleContainerDTO sampleContainerDTO = (SampleContainerDTO) sessionFactory.getCurrentSession().get(SampleContainerDTO.class,sampleContainerId);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			sampleContainerDTO.setDeleted("Y");
			sampleContainerDTO.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<SampleContainerDTO> searchSampleContainerByName(String name,
			HttpServletRequest request) {
		try {
			List<SampleContainerDTO> sampleContainerList = new ArrayList<SampleContainerDTO>();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SampleContainerDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.like("conatinerName", name, MatchMode.START));
			criteria.addOrder(Order.asc("conatinerName"));
			sampleContainerList = criteria.list();
			return sampleContainerList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
