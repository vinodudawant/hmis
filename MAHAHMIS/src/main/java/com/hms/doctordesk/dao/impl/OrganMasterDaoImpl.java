package com.hms.doctordesk.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.controller.OrganMasterController;
import com.hms.doctordesk.dao.OrganMasterDao;
import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.doctordesk.dto.IPDHistoryTemplateMasterDTO;




@SuppressWarnings("unchecked")
@Repository
public class OrganMasterDaoImpl implements OrganMasterDao {
	
	@Autowired
	SessionFactory sessionFactory;
	
	static Logger log=Logger.getLogger(OrganMasterController.class.getName());
	
	@Override
	public int saveOrganMaster(DdOrganMasterDTO organ, HttpServletRequest request) {
		try {
			  if(organ.getOrganId() == 0) {
				  Criteria criteria =
						  sessionFactory.getCurrentSession().createCriteria(DdOrganMasterDTO.class);
						 criteria.add(Restrictions.eq("organName", organ.getOrganName()));
						  criteria.add(Restrictions.eq("deleted", "N"));
						  criteria.setProjection(Projections.rowCount());
							Integer count = ((Number)criteria.uniqueResult()).intValue();
							if(count ==0) {
								sessionFactory.getCurrentSession().merge(organ); 
							}else {
								return 3;
							}
			 return 1;
			 } 
			  else {
			  DdOrganMasterDTO organDTO = (DdOrganMasterDTO)
			  sessionFactory.getCurrentSession().get(DdOrganMasterDTO.class,
			  organ.getOrganId());
			  if(organDTO != null) {
				  
			  organDTO.setOrganName(organ.getOrganName());
			 organDTO.setUpdatedBy(organ.getCreatedBy());
			  sessionFactory.getCurrentSession().merge(organDTO); 
			  } 
			  return 2; 
			/*
				 * DdOrganMasterDTO organDTO = (DdOrganMasterDTO)
				 * sessionFactory.getCurrentSession().get(DdOrganMasterDTO.class,
				 * organ.getOrganId()); if(organDTO != null) { List<Integer> nlist=new
				 * ArrayList<>(); nlist.add(organ.getOrganId()); Criteria crit =
				 * sessionFactory.getCurrentSession().createCriteria(DdOrganMasterDTO.class);
				 * 
				 * crit.add( Restrictions.eq("organName", organ.getOrganName()));
				 * crit.add(Restrictions.not(Restrictions.in("organId",nlist))); crit.add(
				 * Restrictions.eq("deleted", "N")); crit.setProjection(Projections.rowCount());
				 * Integer count = ((Number)crit.uniqueResult()).intValue(); if(count==0) {
				 * sessionFactory.getCurrentSession().merge(organDTO); return 2; }else { return
				 * 3; } }
				 */
			  }
			 
			
		
		} catch(Exception e) {
			log.error("Exception--> ",e);
        }
        return 0;
	}
	
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<DdOrganMasterDTO> getAllOrganMaster(HttpServletRequest request) {
		List<DdOrganMasterDTO> lstOrganMaster=new ArrayList<DdOrganMasterDTO>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DdOrganMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstOrganMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception--> ",e);
		}		
		return lstOrganMaster;
	}



	@Override
	public boolean deleteOrganMaster(Integer organId, Integer userId) {
		try {
			DdOrganMasterDTO obj=	(DdOrganMasterDTO)sessionFactory.getCurrentSession().get(DdOrganMasterDTO.class, organId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception--> ",e);
		}
		return false;
	}

	@Override
	public DdOrganMasterDTO editOrganMaster(Integer organ_Id) {
		DdOrganMasterDTO obj=new DdOrganMasterDTO();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DdOrganMasterDTO.class);
			criteria.add(Restrictions.eq("organId", organ_Id));
			obj=(DdOrganMasterDTO) criteria.uniqueResult();
			obj.setUpdatedDate(new Date(new java.util.Date().getTime()));
			return obj;
		}catch(Exception e) {
			log.error("Exception--> ",e);
		}
		return obj;
	
	
	}



	@Override
	public List<DdOrganMasterDTO> getAllOrganMasterAutosuggestion(String organName) {
		 String sql = "";
		 List<DdOrganMasterDTO> lstorganMaster=new ArrayList<DdOrganMasterDTO>();
		 try{
				sql = "SELECT c.idorgan, c.organ_name FROM organ  c  where c.organ_name like '"	+ organName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					DdOrganMasterDTO obj = new DdOrganMasterDTO();
					obj.setOrganName((String) row.get("organ_name"));
					obj.setOrganId((Integer) row.get("idorgan"));
					lstorganMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception--> ",e);
			}
				 
		return lstorganMaster;
	}
}
