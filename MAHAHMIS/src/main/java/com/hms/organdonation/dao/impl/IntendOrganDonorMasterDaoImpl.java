package com.hms.organdonation.dao.impl;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.organdonation.dao.IntendOrganDonorMasterDao;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;

@Repository
public class IntendOrganDonorMasterDaoImpl implements IntendOrganDonorMasterDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	IntendOrganDonorMasterDto intendOrganDonorMasterDto;

	@Override
	public int saveIntendOrganDonorMaster(IntendOrganDonorMasterDto obj,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (obj.getIntendId() == 0) {
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(IntendOrganDonorMasterDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.ilike("intendOrganDonor",obj.getIntendOrganDonor(),MatchMode.EXACT));
				criteria.setProjection(Projections.rowCount());
				Long count = (Long)criteria.uniqueResult();
				if(count > 0){
					return 3;
				}else{
					obj.setCreatedBy(userId);
					obj.setUnitId(unitId);
					sessionFactory.getCurrentSession().merge(obj);
					return 1;
				}

			} else {

				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(obj);
				return 2;

			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<IntendOrganDonorMasterDto> getAllIntendOrganDonorMaster(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<IntendOrganDonorMasterDto> lstIntendOrganDonorMasterDto=new ArrayList<IntendOrganDonorMasterDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(IntendOrganDonorMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstIntendOrganDonorMasterDto = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstIntendOrganDonorMasterDto;
	}

	@Override
	public IntendOrganDonorMasterDto editIntendOrganDonorMaster(
			Integer intendOrganDonorId) {
		// TODO Auto-generated method stub
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(IntendOrganDonorMasterDto.class);
			criteria.add(Restrictions.eq("intendId", intendOrganDonorId));
			intendOrganDonorMasterDto=(IntendOrganDonorMasterDto) criteria.uniqueResult();
			return intendOrganDonorMasterDto;
		}catch(Exception e) {
			e.printStackTrace();
			return intendOrganDonorMasterDto;
		}
	}

	@Override
	public boolean deleteIntendOrganDonorMaster(Integer intendOrganDonorId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			IntendOrganDonorMasterDto obj =	(IntendOrganDonorMasterDto)sessionFactory.getCurrentSession().get(IntendOrganDonorMasterDto.class, intendOrganDonorId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
			
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		
	}

	@Override
	public List<IntendOrganDonorMasterDto> intendOrganDonorMasterAutoSuggestion(
			String intendOrganDonor) {
		// TODO Auto-generated method stub
		String sql = "";
		 List<IntendOrganDonorMasterDto> lstIntendOrganDonorMasterDto=new ArrayList<IntendOrganDonorMasterDto>();
		 try{
				sql = "SELECT b.id, b.intend_organ_donor FROM organ_donor_intend_master b  where b.intend_organ_donor like '"	+ intendOrganDonor +   "%' and b.deleted='N' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					IntendOrganDonorMasterDto obj = new IntendOrganDonorMasterDto();
					obj.setIntendOrganDonor((String) row.get("intend_organ_donor"));
					obj.setIntendId((Integer) row.get("id"));
					lstIntendOrganDonorMasterDto.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 e.printStackTrace();
			}
				 
		return lstIntendOrganDonorMasterDto;
	}

}
