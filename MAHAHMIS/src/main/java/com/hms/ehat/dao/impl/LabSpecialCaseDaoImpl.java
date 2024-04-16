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

import com.hms.ehat.dao.LabSpecialCaseDao;
import com.hms.ehat.dto.LabSpecialCasesDTO;

@SuppressWarnings("unchecked")
@Repository
public class LabSpecialCaseDaoImpl implements LabSpecialCaseDao{

	
	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public int savespecialcase(LabSpecialCasesDTO labSpecialCasesDTO,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");	
           
            if(labSpecialCasesDTO.getIdSpecialCase() == 0) {
            	Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabSpecialCasesDTO.class);
                criteria.add(Restrictions.eq("spacialCaseName", labSpecialCasesDTO.getSpacialCaseName()));
                criteria.add(Restrictions.eq("deleted", "N"));
                         
                if(criteria.uniqueResult() != null)
                    return 3;
                else {
                	labSpecialCasesDTO.setCreatedBy(userId);
                	sessionFactory.getCurrentSession().merge(labSpecialCasesDTO);
                	return 1;
                }
            } else {
            	String hqlQuery = "SELECT COUNT(*) FROM LabSpecialCasesDTO WHERE idSpecialCase NOT IN (:idSpecialCase) AND deleted=:deleted AND spacialCaseName =:spacialCaseName";
				Query hql = sessionFactory.getCurrentSession().createQuery(hqlQuery);
					  hql.setParameter("idSpecialCase", labSpecialCasesDTO.getIdSpecialCase());	  
					  hql.setParameter("spacialCaseName", labSpecialCasesDTO.getSpacialCaseName());
					  hql.setParameter("deleted", "N");
					  
					  Long count = (Long) hql.uniqueResult();
						
				if(count >= 1) {
					return 3;
				}else {
					LabSpecialCasesDTO labSpecialDTO = (LabSpecialCasesDTO) sessionFactory.getCurrentSession().get(LabSpecialCasesDTO.class, labSpecialCasesDTO.getIdSpecialCase());
					if(labSpecialDTO != null){
						labSpecialDTO.setSpacialCaseName(labSpecialCasesDTO.getSpacialCaseName());
						labSpecialDTO.setUpdatedBy(userId);
						sessionFactory.getCurrentSession().merge(labSpecialDTO);
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
	public List<LabSpecialCasesDTO> getAllSpecialCase() {
		try {
        	List<LabSpecialCasesDTO> specialCaseList=new ArrayList<LabSpecialCasesDTO>();
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabSpecialCasesDTO.class);
            criteria.add(Restrictions.eq("deleted", "N"));
            criteria.addOrder(Order.asc("spacialCaseName"));
            specialCaseList=criteria.list();
            return  specialCaseList;      
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }
	}

	@Override
	public LabSpecialCasesDTO editSpecialCaseById(int id,HttpServletRequest request) {
		 try {
			 LabSpecialCasesDTO labSpecialCasesDTO=new LabSpecialCasesDTO();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabSpecialCasesDTO.class);
	            criteria.add(Restrictions.eq("idSpecialCase", id));
	            criteria.add(Restrictions.eq("deleted", "N"));
	            labSpecialCasesDTO=(LabSpecialCasesDTO) criteria.uniqueResult();
	            return labSpecialCasesDTO;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}

	@Override
	public boolean deleteSpecialCaseById(int id,HttpServletRequest request) {
		try {
			LabSpecialCasesDTO labSpecialCasesDTO = (LabSpecialCasesDTO) sessionFactory.getCurrentSession().get(LabSpecialCasesDTO.class,id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			labSpecialCasesDTO.setDeleted("Y");
			labSpecialCasesDTO.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<LabSpecialCasesDTO> searchSpecialCaseByName(String name,HttpServletRequest request) {
		try {
			List<LabSpecialCasesDTO> labSpecialCasesList = new ArrayList<LabSpecialCasesDTO>();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabSpecialCasesDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.like("spacialCaseName", name, MatchMode.START));
			criteria.addOrder(Order.asc("spacialCaseName"));
			labSpecialCasesList = criteria.list();
			return labSpecialCasesList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
}
