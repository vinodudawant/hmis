package com.hms.organdonation.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.organdonation.dao.PreservationMethodMasterDao;
import com.hms.organdonation.dto.PreservationMethodMasterDto;

@Repository
public class PreservationMethodMasterDaoImpl implements PreservationMethodMasterDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	private PreservationMethodMasterDto preservationMethodMasterdto;
	
	@Override
	public int savePreservationMethodMaster(PreservationMethodMasterDto obj, HttpServletRequest request) {
		int status=0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			String saveSqlQuery = "";
			if(obj.getPreservationMethodMasterId() == 0) {
				
				saveSqlQuery="SELECT count(*) from organ_preservation_method_master s where s.deleted='N' and s.preservation__method_name='"+obj.getPreservationMethodName()+"'";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					status = 3;
				}else {
					obj.setCreatedBy(userId);
					obj.setUnitId(unitId);
					sessionFactory.getCurrentSession().merge(obj);
					status=1;
				}
			}else {
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(obj);
				status = 2;
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return status;
	}

	@Override
	public List<PreservationMethodMasterDto> getAllPreservationMethodMaster(HttpServletRequest request) {
		
		List<PreservationMethodMasterDto> lstPreservationMethodMasterDto = new ArrayList<PreservationMethodMasterDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PreservationMethodMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstPreservationMethodMasterDto = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstPreservationMethodMasterDto;
	}

	@Override
	public PreservationMethodMasterDto editPreservationMethodMaster(Integer preservationMethodMasterId) {
		
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PreservationMethodMasterDto.class);
			criteria.add(Restrictions.eq("id", preservationMethodMasterId));
			preservationMethodMasterdto=(PreservationMethodMasterDto) criteria.uniqueResult();
			return preservationMethodMasterdto;
		}catch(Exception e) {
			e.printStackTrace();
			return preservationMethodMasterdto;
		}
	}

	@Override
	public List<PreservationMethodMasterDto> preservationMethodMasterAutoSuggestion(
			String preservationMethodName) {
		
		String sql = "";
		
		 List<PreservationMethodMasterDto> lstPreservationMethodMasterDto=new ArrayList<PreservationMethodMasterDto>();
		 try{
				sql = "SELECT b.id, b.preservation__method_name FROM preservation_method_master b  where b.preservation__method_name like '"	+ preservationMethodName +   "%' and b.deleted='N' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					PreservationMethodMasterDto obj = new PreservationMethodMasterDto();
					obj.setPreservationMethodName((String) row.get("preservation__method_name"));
					obj.setPreservationMethodMasterId((Integer) row.get("id"));
					lstPreservationMethodMasterDto.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return lstPreservationMethodMasterDto;
	}
	

	@Override
	public boolean deletePreservationMethodMaster(Integer preservationMethodMasterId, HttpServletRequest request) {
		try {
			
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				PreservationMethodMasterDto obj =	(PreservationMethodMasterDto)sessionFactory.getCurrentSession().get(PreservationMethodMasterDto.class, preservationMethodMasterId);
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
	

	
}
