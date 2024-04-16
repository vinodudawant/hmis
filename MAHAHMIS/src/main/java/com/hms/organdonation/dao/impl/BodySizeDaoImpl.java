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
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.organdonation.dao.BodySizeDao;
import com.hms.organdonation.dto.BodySizeDto;

@Repository
public class BodySizeDaoImpl implements BodySizeDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private BodySizeDto bodySizedto;
	
	@Override
	public int saveBodySize(BodySizeDto obj, HttpServletRequest request) {
		
		int status=0;
		try
		{
			HttpSession session=request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			if(obj.getBodySizeId()==0)
			{
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(obj);
				status=1;
			}else {
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(obj);
				status=2;
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return status;
	}

	@Override
	public List<BodySizeDto> getAllBodySize(HttpServletRequest request) {

		List<BodySizeDto> lstBodySizeDto = new ArrayList<BodySizeDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BodySizeDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstBodySizeDto = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstBodySizeDto;
	}

	@Override
	public BodySizeDto editBodySize(Integer bodySizeId) {

		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BodySizeDto.class);
			criteria.add(Restrictions.eq("id", bodySizeId));
			bodySizedto=(BodySizeDto) criteria.uniqueResult();
			return bodySizedto;
		}catch(Exception e) {
			e.printStackTrace();
			return bodySizedto;
		}
	}

	@Override
	public boolean deleteBodySize(Integer bodySizeId, HttpServletRequest request) {
		
	try {
				
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				BodySizeDto obj =	(BodySizeDto)sessionFactory.getCurrentSession().get(BodySizeDto.class, bodySizeId);
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
	public List<BodySizeDto> bodySizeAutoSuggestion(String bodySizeName) {

	String sql = "";
	
	 List<BodySizeDto> lstBodySizeDto=new ArrayList<BodySizeDto>();
	 try{
			sql = "SELECT b.id, b.bodySize_Name FROM body_size b  where b.bodySize_Name like '"	+ bodySizeName +   "%' and b.deleted='N' limit 20 ";
			System.err.println("-------"+sql);
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				BodySizeDto obj = new BodySizeDto();
				obj.setBodySizeName((String) row.get("bodySize_Name"));
				obj.setBodySizeId((Integer) row.get("id"));
				lstBodySizeDto.add(obj);
				obj=null;
			}				
	 
	 }catch (Exception e) {
		 e.printStackTrace();
	}
			 
	return lstBodySizeDto;
	
	}


}
