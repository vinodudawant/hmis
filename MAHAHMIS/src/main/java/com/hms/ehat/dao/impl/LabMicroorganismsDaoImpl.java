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
import com.hms.ehat.dao.LabMicroorganismsDao;
import com.hms.ehat.dto.LabMicroorganismsDto;
import com.hms.pathology.dto.LabTestDTO;

@Repository
public class LabMicroorganismsDaoImpl implements LabMicroorganismsDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public Integer saveMicroorganisms(LabMicroorganismsDto labMicroorganismsDto, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");	
           
			LabTestDTO dto = (LabTestDTO) sessionFactory.getCurrentSession().get(LabTestDTO.class, labMicroorganismsDto.getTestId());
			
            if(labMicroorganismsDto.getMicroorganismId() == 0) {
            	Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabMicroorganismsDto.class);
                criteria.add(Restrictions.eq("microorganismName", labMicroorganismsDto.getMicroorganismName()));
                criteria.add(Restrictions.eq("labTestDTO", dto));
                criteria.add(Restrictions.eq("deleted", "N"));
                criteria.add(Restrictions.eq("unitId", labMicroorganismsDto.getUnitId()));
                         
                if(criteria.uniqueResult() != null) {
                    return 3;
                }else if(isMicroorganismLimitExceeded(dto, labMicroorganismsDto.getMicroorganismCount(), labMicroorganismsDto.getUnitId())) {
                	return 4;
                }else {
                	labMicroorganismsDto.setCreatedBy(userId);
                	labMicroorganismsDto.setLabTestDTO(dto);
                	sessionFactory.getCurrentSession().merge(labMicroorganismsDto);
                	return 1;
                }
            } else {
            	String hqlQuery = "SELECT COUNT(*) FROM LabMicroorganismsDto WHERE microorganismId NOT IN (:microorganismId) AND deleted=:deleted AND microorganismName =:microorganismName AND labTestDTO =:labTestDTO AND unitId =:unitId";
				Query hql = sessionFactory.getCurrentSession().createQuery(hqlQuery);
					  hql.setParameter("microorganismId", labMicroorganismsDto.getMicroorganismId());	  
					  hql.setParameter("microorganismName", labMicroorganismsDto.getMicroorganismName());
					  hql.setParameter("labTestDTO", dto);
					  hql.setParameter("unitId", labMicroorganismsDto.getUnitId());
					  hql.setParameter("deleted", "N");
					  
					  Long count = (Long) hql.uniqueResult();
						
				if(count >= 1) {
					return 3;
				}
				/*else if(isMicroorganismLimitExceeded(dto, labMicroorganismsDto.getMicroorganismCount(), labMicroorganismsDto.getUnitId())) {
                	return 4;
                }*/
				else {
					LabMicroorganismsDto microorganismsDto = (LabMicroorganismsDto) sessionFactory.getCurrentSession().get(LabMicroorganismsDto.class, labMicroorganismsDto.getMicroorganismId());
					if(microorganismsDto != null){
						microorganismsDto.setMicroorganismName(labMicroorganismsDto.getMicroorganismName());
						microorganismsDto.setUpdatedBy(userId);
						labMicroorganismsDto.setLabTestDTO(dto);
						sessionFactory.getCurrentSession().merge(microorganismsDto);
					}
					return 2;
				}
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return 0;
	}

	private boolean isMicroorganismLimitExceeded(LabTestDTO dto, Integer microorganismLimit, Integer unitId) {
		Session session = null;
		boolean response = true;
		try{
			session = sessionFactory.getCurrentSession();
			Query qry = session.createQuery("SELECT Count(*) FROM LabMicroorganismsDto WHERE deleted =:deleted AND unitId=:unitId AND labTestDTO =:labTestDTO"); 
		  	  	  qry.setParameter("deleted", "N");
		  	  	  qry.setParameter("unitId", unitId);
		  	  	  qry.setParameter("labTestDTO", dto);

		  	Integer count = ((Long) qry.uniqueResult()).intValue();
		  	
		  	if(count < microorganismLimit)
		  		response = false;
		  	
		  	return response;
		}catch(Exception e){
			e.printStackTrace();
			return response;
		}
	}
	
	@Override
	public List<LabMicroorganismsDto> getAllMicroorganisms(Integer unitId) {
		List<LabMicroorganismsDto> labMicroorganismsList = new ArrayList<LabMicroorganismsDto>();
		try {
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabMicroorganismsDto.class);
            criteria.add(Restrictions.eq("deleted", "N"));
            criteria.add(Restrictions.eq("unitId", unitId));
            criteria.addOrder(Order.asc("microorganismName"));
            labMicroorganismsList = criteria.list();
            return  labMicroorganismsList;      
        } catch(Exception e) {
            e.printStackTrace();
            return labMicroorganismsList;
        }
	}

	@Override
	public LabMicroorganismsDto editMicroorganism(Integer id, HttpServletRequest request) {
		LabMicroorganismsDto labMicroorganismsDto = new LabMicroorganismsDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabMicroorganismsDto.class);
	            criteria.add(Restrictions.eq("microorganismId", id));
	            criteria.add(Restrictions.eq("deleted", "N"));
	            labMicroorganismsDto = (LabMicroorganismsDto) criteria.uniqueResult();
	        return labMicroorganismsDto;      
	    } catch(Exception e) {
	    	e.printStackTrace();
	        return labMicroorganismsDto;
	    }
	}

	@Override
	public boolean deleteMicroorganism(Integer id, HttpServletRequest request) {
		try {
			LabMicroorganismsDto labMicroorganismsDto = (LabMicroorganismsDto) sessionFactory.getCurrentSession().get(LabMicroorganismsDto.class,id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			labMicroorganismsDto.setDeleted("Y");
			labMicroorganismsDto.setDeletedBy(userId);
			
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<LabMicroorganismsDto> searchMicroorganisms(String name, Integer unitId, HttpServletRequest request) {
		List<LabMicroorganismsDto> labMicroorganismsList = new ArrayList<LabMicroorganismsDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabMicroorganismsDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.like("microorganismName", name, MatchMode.ANYWHERE));
			criteria.addOrder(Order.asc("microorganismName"));
			labMicroorganismsList = criteria.list();
			
			return labMicroorganismsList;
		} catch (Exception e) {
			e.printStackTrace();
			return labMicroorganismsList;
		}
	}

	@Override
	public List<LabTestDTO> getAllLabTests(Integer unitId) {
		Session session = null;
		LabTestDTO dto = new LabTestDTO();
		List<LabTestDTO> labTestsList = new ArrayList<>();
		try{
			session = sessionFactory.getCurrentSession();
			Query qry = session.createQuery("SELECT idTest AS id, testName AS testName, microorganismCount AS microorganismCount FROM LabTestDTO WHERE status =:status AND unitId=:unitId AND microorganism =:microorganism"); 
		  	  	  qry.setParameter("status", "Y");
		  	  	  qry.setParameter("unitId", unitId.toString());
		  	  	  qry.setParameter("microorganism", "Y");
		  	
		  	  	  qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
		  	List<Map<String, Object>> list = qry.list();
			for(Map<String, Object> row : list){
				LabTestDTO obj = new LabTestDTO();
					obj.setIdTest((Integer)row.get("id"));
					obj.setTestName((String)row.get("testName"));
					obj.setMicroorganismCount((Integer)row.get("microorganismCount"));
					
					labTestsList.add(obj);
			}
			
			return labTestsList;
		}catch(Exception e){
			e.printStackTrace();
			return labTestsList;
		}
	}
}