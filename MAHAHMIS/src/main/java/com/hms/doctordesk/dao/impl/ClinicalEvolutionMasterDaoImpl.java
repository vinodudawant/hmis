package com.hms.doctordesk.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.doctordesk.dao.ClinicalEvolutionMasterDao;
import com.hms.doctordesk.dto.ClinicalEvolutionMasterDto;
import com.hms.doctordesk.dto.ComplaintMasterDto;


@SuppressWarnings("unchecked")
@Repository
public class ClinicalEvolutionMasterDaoImpl implements ClinicalEvolutionMasterDao {
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveClinicalEvolutionMaster(ClinicalEvolutionMasterDto clinical, HttpServletRequest request) {
try {
			
	Criteria criteria =
			  sessionFactory.getCurrentSession().createCriteria(ClinicalEvolutionMasterDto.class);
			Criterion code = Restrictions.eq("clinicalName",clinical.getClinicalName());
			Criterion name = Restrictions.eq("clinicalCode",clinical.getClinicalCode());
			LogicalExpression orExp = Restrictions.or(code,name);
			criteria.add(orExp);
			//criteria.add(Restrictions.eq("clinicalName", clinical.getClinicalName()));
			 //criteria.add(Restrictions.eq("clinicalCode", clinical.getClinicalCode()));
			  criteria.add(Restrictions.eq("deleted", "N"));
			  
			 
			  
			  if(clinical.getClinicalId() == 0) {
				  if(criteria.uniqueResult() != null) {
					  return 3;
				  }else{
						
					  sessionFactory.getCurrentSession().merge(clinical); 
					  return 1;
				  }
			 } 
			  else {
				  ClinicalEvolutionMasterDto clinicalDTO = (ClinicalEvolutionMasterDto)
			  sessionFactory.getCurrentSession().get(ClinicalEvolutionMasterDto.class,
					  clinical.getClinicalId());
			  if(clinicalDTO != null) {
				  
				  clinicalDTO.setClinicalName(clinical.getClinicalName());
				  clinicalDTO.setClinicalCode(clinical.getClinicalCode());
				  clinicalDTO.setUpdatedBy(clinical.getCreatedBy());
			  sessionFactory.getCurrentSession().merge(clinicalDTO); 
			  } 
			  return 2; 
			  }
			/*sessionFactory.getCurrentSession().merge(clinical);
            return 1;*/
		
		} catch(Exception e) {
	            e.printStackTrace();
        }
        return 0;
	}

	@Override
	public List<ClinicalEvolutionMasterDto> getAllClinialEvolutionMaster(HttpServletRequest request) {
		List<ClinicalEvolutionMasterDto> lstClinicalEvolutionMaster=new ArrayList<ClinicalEvolutionMasterDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ClinicalEvolutionMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstClinicalEvolutionMaster = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstClinicalEvolutionMaster;
	}

	@Override
	public ClinicalEvolutionMasterDto editClinicalEvolutionMaster(Integer clinicalId) {
		ClinicalEvolutionMasterDto obj=new ClinicalEvolutionMasterDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ClinicalEvolutionMasterDto.class);
			criteria.add(Restrictions.eq("clinicalId", clinicalId));
			obj=(ClinicalEvolutionMasterDto) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
				e.printStackTrace();
		}
		return obj;

	}

	@Override
	public boolean deleteClinicalEvolutionMaster(Integer clinicalId, Integer userId) {
		try {
			ClinicalEvolutionMasterDto obj=	(ClinicalEvolutionMasterDto)sessionFactory.getCurrentSession().get(ClinicalEvolutionMasterDto.class, clinicalId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<ClinicalEvolutionMasterDto> centerClinicalEvolutionAutoSuggestion(String clinicalName, String clinicalCode) {
		String sql = "";
		 List<ClinicalEvolutionMasterDto> lstclinicalEvolutionMaster=new ArrayList<ClinicalEvolutionMasterDto>();
		 try{
				sql = "SELECT c.idclinical, c.clinical_name, c.clinical_code FROM clinical_evolution_master c  where c.clinical_name like '"	+ clinicalName + "%' or c.clinical_code like '"	+ clinicalCode + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					ClinicalEvolutionMasterDto obj = new ClinicalEvolutionMasterDto();
					obj.setClinicalName((String) row.get("clinical_name"));
					obj.setClinicalCode((String) row.get("clinical_code"));
					obj.setClinicalId((Integer) row.get("idclinical"));
					//obj.setUnitId((Integer) row.get("unitId"));
					lstclinicalEvolutionMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
				 
		return lstclinicalEvolutionMaster;
	}
}
