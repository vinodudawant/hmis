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
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.SubjectiveObjectiveTempMasterDao;
import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.doctordesk.dto.FindingMaster;
import com.hms.doctordesk.dto.SubjectiveObjectiveDto;
import com.hms.doctordesk.dto.SubjectiveObjectiveTempMasterDto;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.pharmacy.pojo.PreparationMaster;


@Repository
public class SubjectiveObjectiveTempMasterDaoImpl implements SubjectiveObjectiveTempMasterDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveSubjectiveObj(SubjectiveObjectiveTempMasterDto subjectiveObjectiveTempDto, HttpServletRequest request) {
		// TODO Auto-generated method stub
		
		try {
			
			if(subjectiveObjectiveTempDto.getSubObjTempId() == 0 || subjectiveObjectiveTempDto.getSubObjTempId() == null)
			{
				
				subjectiveObjectiveTempDto.setCreatedBy(subjectiveObjectiveTempDto.getUserId());
				subjectiveObjectiveTempDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				
				sessionFactory.getCurrentSession().merge(subjectiveObjectiveTempDto);
				return 1;
			} else {
				
				subjectiveObjectiveTempDto.setUpdatedBy(subjectiveObjectiveTempDto.getUserId());	
				subjectiveObjectiveTempDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				subjectiveObjectiveTempDto.setStatus("Y");
				
				sessionFactory.getCurrentSession().merge(subjectiveObjectiveTempDto);
				return 2;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<SubjectiveObjectiveTempMasterDto> getAllSubObjective(HttpServletRequest request) {
		
		
		List<SubjectiveObjectiveTempMasterDto> lstSubObj=new ArrayList<SubjectiveObjectiveTempMasterDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(SubjectiveObjectiveTempMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstSubObj = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstSubObj;
	}

	@Override
	public SubjectiveObjectiveTempMasterDto editSubObjMaster(Integer subObjTempId) {
		
		
		SubjectiveObjectiveTempMasterDto obj=new SubjectiveObjectiveTempMasterDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(SubjectiveObjectiveTempMasterDto.class);
			criteria.add(Restrictions.eq("subObjTempId", subObjTempId));
			obj=(SubjectiveObjectiveTempMasterDto) criteria.uniqueResult();
			//obj.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			return obj;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteSubObjMaster(Integer subObjTempId, Integer userId) {
		// TODO Auto-generated method stub
		try {
			SubjectiveObjectiveTempMasterDto obj=	(SubjectiveObjectiveTempMasterDto)sessionFactory.getCurrentSession().get(SubjectiveObjectiveTempMasterDto.class, subObjTempId);
			obj.setDeleted("Y");
			obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<SubjectiveObjectiveTempMasterDto> subjectiveObjAutoSuggestion(String subTempName) {
		String sql = "";
		 List<SubjectiveObjectiveTempMasterDto> lstSubObjMaster=new ArrayList<SubjectiveObjectiveTempMasterDto>();
		 try{
				sql = "SELECT c.sub_obj_temp_id, c.template_name FROM opd_subjective_objective_temp_master_dto  c  where c.template_name like '"	+ subTempName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					SubjectiveObjectiveTempMasterDto obj = new SubjectiveObjectiveTempMasterDto();
					
					obj.setSubTempName((String) row.get("template_name"));
					obj.setSubObjTempId((Integer) row.get("sub_obj_temp_id"));
					lstSubObjMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 e.printStackTrace();
			}
				 
		return lstSubObjMaster;
	}

	@Override
	public List<SubjectiveObjectiveDto> fetchSubjectiveTypeMaster() {
		List<SubjectiveObjectiveDto> list=null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SubjectiveObjectiveDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			list = criteria.list();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int saveFindingMaster(FindingMaster findingMaster, HttpServletRequest request) {

		
         try {
			
			if(findingMaster.getFindingMasterId() == 0 || findingMaster.getFindingMasterId() == null)
			{
				
				findingMaster.setCreatedBy(findingMaster.getUserId());
				findingMaster.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				
				sessionFactory.getCurrentSession().merge(findingMaster);
				return 1;
			} else {
				
				findingMaster.setUpdatedBy(findingMaster.getUserId());	
				findingMaster.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				findingMaster.setUpdateStatus("Y");
				
				sessionFactory.getCurrentSession().merge(findingMaster);
				return 2;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<FindingMaster> getAllFindingMasters(HttpServletRequest request) {
		// TODO Auto-generated method stub

		List<FindingMaster> lstfindingmaster=new ArrayList<FindingMaster>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(FindingMaster.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstfindingmaster = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstfindingmaster;
	}

	@Override
	public FindingMaster editFindingMaster(Integer findingMasterId) {
		// TODO Auto-generated method stub

		FindingMaster obj=new FindingMaster();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(FindingMaster.class);
			criteria.add(Restrictions.eq("findingMasterId", findingMasterId));
			obj=(FindingMaster) criteria.uniqueResult();
			//obj.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			return obj;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deletFindingMaster(Integer findingMasterIdd, Integer userId) {
		// TODO Auto-generated method stub
		try {
			FindingMaster obj=	(FindingMaster)sessionFactory.getCurrentSession().get(FindingMaster.class, findingMasterIdd);
			obj.setDeleted("Y");
			obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<FindingMaster> FindingMasterAutoSuggestion(String findingName) {
		// TODO Auto-generated method stub
		
		  String sql = ""; 
		  List<FindingMaster> lstFindingMaster=new ArrayList<FindingMaster>(); 
		  try{
			  sql =
		  "SELECT c.finding_master_id, c.finding_Name FROM opd_finding_master  c  where c.finding_Name like '"
		  + findingName + "%' and c.deleted='N' limit 20 ";
		
		  SQLQuery getMaster =  sessionFactory.getCurrentSession().createSQLQuery(sql);
		  getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		  List<Map<String, Object>> masterRow = getMaster.list(); for (Map<String,
		  Object> row : masterRow) { FindingMaster obj = new FindingMaster();
		  
		  obj.setFindingMasterId((Integer) row.get("finding_master_id"));
		  obj.setFindingName((String) row.get("finding_Name"));
		  
		  lstFindingMaster.add(obj); 
		  obj=null; 
		  }
		  
		  }catch (Exception e) {
		  
		  e.printStackTrace(); }
		  
		  return lstFindingMaster;
		 
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DdOrganMasterDTO> getBodyParts(HttpServletRequest request) {
		
		List<DdOrganMasterDTO> listDdOrganMasterDTO = new ArrayList<DdOrganMasterDTO>();
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DdOrganMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			listDdOrganMasterDTO = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return listDdOrganMasterDTO;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<HospitalSpecialisationDto> getAllSpeciality(HttpServletRequest request) {
		
		List<HospitalSpecialisationDto> listHospitalSpecialisationDto = new ArrayList<HospitalSpecialisationDto>();
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalSpecialisationDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			
			listHospitalSpecialisationDto = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return listHospitalSpecialisationDto;
	}
	


}
