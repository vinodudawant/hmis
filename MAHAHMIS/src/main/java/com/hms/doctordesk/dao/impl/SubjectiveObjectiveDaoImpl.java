package com.hms.doctordesk.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.hms.doctordesk.controller.SubjectiveObjectiveController;
import com.hms.doctordesk.dao.SubjectiveObjectiveDao;
import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.doctordesk.dto.SubjectiveObjectiveDto;

@SuppressWarnings("unchecked")
@Repository
public class SubjectiveObjectiveDaoImpl implements SubjectiveObjectiveDao{

	@Autowired
	SessionFactory sessionFactory;
	
	static Logger log=Logger.getLogger(SubjectiveObjectiveController.class.getName());
	
	//save details of subjective objective
	
	@Override
	public int saveSubjectiveMaster(SubjectiveObjectiveDto subjective,
			HttpServletRequest request) {
//		int status=0;  
//		  try {  
//	            sessionFactory.getCurrentSession().save(subjective);  
//	            status=1;  
//	        } catch (Exception e) {  
//	            e.printStackTrace();  
//	        }  
//	        return 1;  
	try {
		
			  Criteria criteria =
			  sessionFactory.getCurrentSession().createCriteria(SubjectiveObjectiveDto.class);
			 criteria.add(Restrictions.eq("subjectiveObjectivetempType", subjective.getSubjectiveObjectivetempType()));
			  criteria.add(Restrictions.eq("deleted", "N"));
		  
			 if(criteria.uniqueResult() != null) 
			 return 3;
			  
			  if(subjective.getSubjectiveId() == 0) {
			 sessionFactory.getCurrentSession().merge(subjective); 
			 return 1;
			 } 
			  else {
				  SubjectiveObjectiveDto subjectiveDTO = (SubjectiveObjectiveDto)
			  sessionFactory.getCurrentSession().get(SubjectiveObjectiveDto.class,
					  subjective.getSubjectiveId());
			  if(subjectiveDTO != null) {
				  
				  subjectiveDTO.setSubjectiveObjectivetempType(subjective.getSubjectiveObjectivetempType());
				  subjectiveDTO.setUpdatedBy(subjective.getCreatedBy());
			  sessionFactory.getCurrentSession().merge(subjectiveDTO); 
			  } 
			  return 2; 
			  }
			 
			/*sessionFactory.getCurrentSession().merge(organ);*/
			
        // return 1;
		
		} catch(Exception e) {
			log.error("Exception--> ",e);
      }
     return 0;
	}
	
	//List of subjective objective

	@Override
	public List<SubjectiveObjectiveDto> getAllSubjectiveMaster(
			HttpServletRequest request) {
		List<SubjectiveObjectiveDto> lstSubjectiveMaster=new ArrayList<SubjectiveObjectiveDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(SubjectiveObjectiveDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstSubjectiveMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception--> ",e);
		}		
		return lstSubjectiveMaster;
	}

	@Override
	public SubjectiveObjectiveDto editSubjectiveMaster(Integer subId) {
		SubjectiveObjectiveDto obj=new SubjectiveObjectiveDto();
		try{
			obj=	(SubjectiveObjectiveDto) sessionFactory.getCurrentSession().get(SubjectiveObjectiveDto.class, subId);
		}catch(Exception e){
			e.printStackTrace();
		}
		return obj;
	}

//	@Override
//	public int deleteSubjectiveDTO(Integer subId) {
//		try{
//			Query q= (Query) sessionFactory.getCurrentSession().createQuery("UPDATE SubjectiveObjectiveDto set deleted='Y ' where subjectiveId=:subjectiveId");
//			q.setParameter("subjectiveId", subId);
//			q.executeUpdate();
//			return 1;
//			
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//		return 0;
//	}

	
	//delete subjective objective
	
	@Override
	public boolean deleteSubjectiveDTO(Integer subId, Integer userId) {

		try {
			SubjectiveObjectiveDto obj=	(SubjectiveObjectiveDto)sessionFactory.getCurrentSession().get(SubjectiveObjectiveDto.class, subId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception--> ",e);
		}
		return false;
	

//		try{
//			Query q= (Query) sessionFactory.getCurrentSession().createQuery("UPDATE SubjectiveObjectiveDto set deleted='Y ' where subjectiveId=:subjectiveId");
//			q.setParameter("subjectiveId", subId);
//			q.executeUpdate();
//			return 1;
//			
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//		return 0;
	
	}

	@Override
	public List<SubjectiveObjectiveDto> getAllSubjectiveMasterAutosuggestion(
			String subjective_objective_tempType) {
		 String sql = "";
		 List<SubjectiveObjectiveDto> lstSubjectiveMaster=new ArrayList<SubjectiveObjectiveDto>();
		 try{
				sql = "SELECT c.subjectiveId, c.subjective_objective_tempType FROM opd_subjective_type_master  c  where c.subjective_objective_tempType like '"	+ subjective_objective_tempType + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				System.out.println("sql"+sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					SubjectiveObjectiveDto obj = new SubjectiveObjectiveDto();
					obj.setSubjectiveObjectivetempType((String) row.get("subjective_objective_tempType"));
					//obj.setOrganName((String) row.get("organ_name"));
					obj.setSubjectiveId((Integer) row.get("subjectiveId"));
					lstSubjectiveMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception--> ",e);
			}
				 
		return lstSubjectiveMaster;
	}

	

}
