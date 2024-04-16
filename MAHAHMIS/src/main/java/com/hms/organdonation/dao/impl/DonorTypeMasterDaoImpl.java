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

import com.hms.organdonation.dao.DonorTypeMasterDao;
import com.hms.organdonation.dto.DonorTypeMasterDto;

@Repository
public class DonorTypeMasterDaoImpl implements DonorTypeMasterDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	DonorTypeMasterDto donorTypeMasterDto;

	@Override
	public int saveDonorTypeMaster(DonorTypeMasterDto obj,
			HttpServletRequest request) {

		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (obj.getDonorTypeId() == 0) {
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(DonorTypeMasterDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.ilike("donorType",obj.getDonorType(),MatchMode.EXACT));
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
	public List<DonorTypeMasterDto> getAllDonorTypeMaster(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<DonorTypeMasterDto> lstDonorTypeMasterDto=new ArrayList<DonorTypeMasterDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DonorTypeMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstDonorTypeMasterDto = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstDonorTypeMasterDto;
	}

	@Override
	public DonorTypeMasterDto editDonorTypeMaster(Integer donorTypeId) {
		// TODO Auto-generated method stub
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DonorTypeMasterDto.class);
			criteria.add(Restrictions.eq("id", donorTypeId));
			donorTypeMasterDto=(DonorTypeMasterDto) criteria.uniqueResult();
			return donorTypeMasterDto;
		}catch(Exception e) {
			e.printStackTrace();
			return donorTypeMasterDto;
		}
	}

	@Override
	public boolean deleteDonorTypeMaster(Integer donorTypeId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			DonorTypeMasterDto obj =	(DonorTypeMasterDto)sessionFactory.getCurrentSession().get(DonorTypeMasterDto.class, donorTypeId);
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
	public List<DonorTypeMasterDto> donorTypeMasterAutoSuggestion(
			String donorType) {
		// TODO Auto-generated method stub
		String sql = "";
		 List<DonorTypeMasterDto> lstDonorTypeMasterDto=new ArrayList<DonorTypeMasterDto>();
		 try{
				sql = "SELECT b.id, b.donor_type FROM organ_donor_type_master b  where b.donor_type like '"	+ donorType +   "%' and b.deleted='N' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					DonorTypeMasterDto obj = new DonorTypeMasterDto();
					obj.setDonorType((String) row.get("donor_type"));
					obj.setDonorTypeId((Integer) row.get("id"));
					lstDonorTypeMasterDto.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return lstDonorTypeMasterDto;
	}

}
