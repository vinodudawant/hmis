package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.LabGradingsDao;
import com.hms.ehat.dto.LabGradingsDto;
import com.hms.ehat.dto.LabMicroorganismsDto;
import com.hms.pathology.dto.LabTestDTO;

@Repository
public class LabGradingsDaoImpl implements LabGradingsDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public Integer saveLabGrading(LabGradingsDto labGradingsDto, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");	
           
			LabTestDTO dto = (LabTestDTO) sessionFactory.getCurrentSession().get(LabTestDTO.class, labGradingsDto.getTestId());
			
            if(labGradingsDto.getLabGradingId() == 0) {
            	Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabGradingsDto.class);
                criteria.add(Restrictions.eq("labGradingName", labGradingsDto.getLabGradingName()));
                criteria.add(Restrictions.eq("labTestDTO", dto));
                criteria.add(Restrictions.eq("deleted", "N"));
                criteria.add(Restrictions.eq("unitId", labGradingsDto.getUnitId()));
                         
                if(criteria.uniqueResult() != null) {
                    return 3;
                }else {
                	labGradingsDto.setCreatedBy(userId);
                	labGradingsDto.setLabTestDTO(dto);
                	sessionFactory.getCurrentSession().merge(labGradingsDto);
                	return 1;
                }
            } else {
            	String hqlQuery = "SELECT COUNT(*) FROM LabGradingsDto WHERE labGradingId NOT IN (:labGradingId) AND deleted=:deleted AND labGradingName =:labGradingName AND labTestDTO =:labTestDTO AND unitId =:unitId";
				Query hql = sessionFactory.getCurrentSession().createQuery(hqlQuery);
					  hql.setParameter("labGradingId", labGradingsDto.getLabGradingId());	  
					  hql.setParameter("labGradingName", labGradingsDto.getLabGradingName());
					  hql.setParameter("labTestDTO", dto);
					  hql.setParameter("unitId", labGradingsDto.getUnitId());
					  hql.setParameter("deleted", "N");
					  
					  Long count = (Long) hql.uniqueResult();
						
				if(count >= 1) {
					return 3;
				}else {
					LabGradingsDto gradingsDto = (LabGradingsDto) sessionFactory.getCurrentSession().get(LabGradingsDto.class, labGradingsDto.getLabGradingId());
					if(gradingsDto != null){
						gradingsDto.setLabGradingName(labGradingsDto.getLabGradingName());
						gradingsDto.setUpdatedBy(userId);
						gradingsDto.setLabTestDTO(dto);
						sessionFactory.getCurrentSession().merge(gradingsDto);
					}
					return 2;
				}
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return 0;
	}

	@Override
	public List<LabGradingsDto> getAllGradings(Integer unitId) {
		List<LabGradingsDto> labGradingsList = new ArrayList<LabGradingsDto>();
		try {
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabGradingsDto.class);
            criteria.add(Restrictions.eq("deleted", "N"));
            criteria.add(Restrictions.eq("unitId", unitId));
            criteria.addOrder(Order.asc("labGradingName"));
            labGradingsList = criteria.list();
            return  labGradingsList;      
        } catch(Exception e) {
            e.printStackTrace();
            return labGradingsList;
        }
	}

	@Override
	public LabGradingsDto editLabGrading(Integer id, HttpServletRequest request) {
		LabGradingsDto labGradingsDto = new LabGradingsDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabGradingsDto.class);
	            criteria.add(Restrictions.eq("labGradingId", id));
	            criteria.add(Restrictions.eq("deleted", "N"));
	            labGradingsDto = (LabGradingsDto) criteria.uniqueResult();
	        return labGradingsDto;      
	    } catch(Exception e) {
	    	e.printStackTrace();
	        return labGradingsDto;
	    }
	}

	@Override
	public boolean deleteLabGrading(Integer id, HttpServletRequest request) {
		try {
			LabGradingsDto labGradingsDto = (LabGradingsDto) sessionFactory.getCurrentSession().get(LabGradingsDto.class,id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			labGradingsDto.setDeleted("Y");
			labGradingsDto.setDeletedBy(userId);
			
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<LabGradingsDto> searchGradings(String name, Integer unitId, HttpServletRequest request) {
		List<LabGradingsDto> labGradingsList = new ArrayList<LabGradingsDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabGradingsDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.like("labGradingName", name, MatchMode.ANYWHERE));
			criteria.addOrder(Order.asc("labGradingName"));
			labGradingsList = criteria.list();
			
			return labGradingsList;
		} catch (Exception e) {
			e.printStackTrace();
			return labGradingsList;
		}
	}

	@Override
	public List<LabTestDTO> getAllLabTests(Integer unitId) {
		Session session = null;
		LabTestDTO dto = new LabTestDTO();
		List<LabTestDTO> labTestsList = new ArrayList<>();
		try{
			session = sessionFactory.getCurrentSession();
			Query qry = session.createQuery("SELECT idTest AS id, testName AS testName FROM LabTestDTO WHERE status =:status AND unitId=:unitId"); 
		  	  	  qry.setParameter("status", "Y");
		  	  	  qry.setParameter("unitId", unitId.toString());
		  	
		  	  	  qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
		  	List<Map<String, Object>> list = qry.list();
			for(Map<String, Object> row : list){
				LabTestDTO obj = new LabTestDTO();
					obj.setIdTest((Integer)row.get("id"));
					obj.setTestName((String)row.get("testName"));
					
					labTestsList.add(obj);
			}
			
			return labTestsList;
		}catch(Exception e){
			e.printStackTrace();
			return labTestsList;
		}
	}
}