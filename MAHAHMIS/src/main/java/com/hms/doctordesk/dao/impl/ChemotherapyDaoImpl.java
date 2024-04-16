package com.hms.doctordesk.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.controller.ChemotherapyController;
import com.hms.doctordesk.dao.ChemotherapyDao;
import com.hms.doctordesk.dto.ChemotherapyDto;

@SuppressWarnings("unchecked")
@Repository
public class ChemotherapyDaoImpl implements ChemotherapyDao {
	
	static Logger log=Logger.getLogger(ChemotherapyController.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveChemoMaster(ChemotherapyDto chemo, HttpServletRequest request) {
		try {
			Criteria criteria =
					  sessionFactory.getCurrentSession().createCriteria(ChemotherapyDto.class);
					 criteria.add(Restrictions.eq("chemotherapyName", chemo.getChemotherapyName()));
					// criteria.add(Restrictions.eq("historyCode", history.getHistoryCode()));
					  criteria.add(Restrictions.eq("deleted", "N"));
					  
					 if(criteria.uniqueResult() != null) 
						 return 3;
					  
					  if(chemo.getChemotherapyId() == 0) {
					 sessionFactory.getCurrentSession().merge(chemo); 
					 return 1;
					 } 
					  else {
						  ChemotherapyDto chemoDTO = (ChemotherapyDto)
					  sessionFactory.getCurrentSession().get(ChemotherapyDto.class,
							  chemo.getChemotherapyId());
					  if(chemoDTO != null) {
						  
						  chemoDTO.setChemotherapyName(chemo.getChemotherapyName());
						 // historyDTO.setHistoryCode(history.getHistoryCode());
						  chemoDTO.setUpdatedBy(chemo.getCreatedBy());
					  sessionFactory.getCurrentSession().merge(chemoDTO); 
					  } 
					  return 2; 
					  }
			
			/*sessionFactory.getCurrentSession().merge(chemo);
            return 1;*/
		
		} catch(Exception e) {
	           log.error("Exception---> ",e);
        }
        return 0;
	}

	@Override
	public List<ChemotherapyDto> getAllChemoMaster() {
		List<ChemotherapyDto> lstChemoMaster=new ArrayList<ChemotherapyDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ChemotherapyDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstChemoMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception---> ",e);
		}		
		return lstChemoMaster;
	}

	@Override
	public boolean deleteChemoMaster(Integer chemotherapyId, Integer userId) {
		try {
			ChemotherapyDto obj=(ChemotherapyDto)sessionFactory.getCurrentSession().get(ChemotherapyDto.class, chemotherapyId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception---> ",e);
		}
		return false;
	}

	@Override
	public ChemotherapyDto editChemoMaster(Integer chemotherapyId) {
		ChemotherapyDto obj=new ChemotherapyDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ChemotherapyDto.class);
			criteria.add(Restrictions.eq("chemotherapyId", chemotherapyId));
			obj=(ChemotherapyDto) criteria.uniqueResult();
			obj.setUpdatedDate(new Date(new java.util.Date().getTime()));
			return obj;
		}catch(Exception e) {
			log.error("Exception---> ",e);
		}
		return obj;
	}

	@Override
	public List<ChemotherapyDto> getAllChemoMasterAutosuggestion(String chemotherapyName) {
		 String sql = "";
		 List<ChemotherapyDto> lstchemoMaster=new ArrayList<ChemotherapyDto>();
		 try{
				sql = "SELECT c.idchemotherapy, c.chemotherapy_name FROM chemotherapy_master c  where c.chemotherapy_name like '"	+ chemotherapyName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					ChemotherapyDto obj = new ChemotherapyDto();
					obj.setChemotherapyName((String) row.get("chemotherapy_name"));
					obj.setChemotherapyId((Integer) row.get("idchemotherapy"));
					lstchemoMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception---> ",e);
			}
				 
		return lstchemoMaster;
	}

}
