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

import com.hms.organdonation.dao.BodyTypeDao;
import com.hms.organdonation.dto.BodyTypeDto;

@Repository
public class BodyTypeDaoImpl implements BodyTypeDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private BodyTypeDto bodytypedto;

	@Override
	public int saveBodyType(BodyTypeDto obj, HttpServletRequest request) {

		int status = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			String saveSqlQuery = "";
			if (obj.getBodyTypeId() == 0) {
				
				saveSqlQuery="SELECT count(*) from organ_body_type s where s.deleted='N' and s.bodyType_Name='"+obj.getBodyTypeName()+"'";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					status = 3;
				}else {
					obj.setCreatedBy(userId);
					obj.setUnitId(unitId);
					sessionFactory.getCurrentSession().merge(obj);
					status = 1;
				}
			} else {
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(obj);
				status = 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return status;
	}

	@Override
	public List<BodyTypeDto> getAllBodyType(HttpServletRequest request) {

		List<BodyTypeDto> lstBodyTypeDto = new ArrayList<BodyTypeDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BodyTypeDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstBodyTypeDto = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstBodyTypeDto;

	}

	@Override
	public BodyTypeDto editBodyType(Integer bodyTypeId) {

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BodyTypeDto.class);
			criteria.add(Restrictions.eq("id", bodyTypeId));
			bodytypedto = (BodyTypeDto) criteria.uniqueResult();
			return bodytypedto;
		} catch (Exception e) {
			e.printStackTrace();
			return bodytypedto;
		}

	}

	@Override
	public boolean deleteBodyType(Integer bodyTypeId, HttpServletRequest request) {

		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			BodyTypeDto obj = (BodyTypeDto) sessionFactory.getCurrentSession().get(BodyTypeDto.class, bodyTypeId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<BodyTypeDto> bodyTypeAutoSuggestion(String bodyTypeName) {

		String sql = "";

		List<BodyTypeDto> lstBodyTypeDto = new ArrayList<BodyTypeDto>();
		try {
			sql = "SELECT b.id, b.bodyType_Name FROM body_type b  where b.bodyType_Name like '" + bodyTypeName
					+ "%' and b.deleted='N' limit 20 ";
			System.err.println("-------" + sql);
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				BodyTypeDto obj = new BodyTypeDto();
				obj.setBodyTypeName((String) row.get("bodyType_Name"));
				obj.setBodyTypeId((Integer) row.get("id"));
				lstBodyTypeDto.add(obj);
				obj = null;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return lstBodyTypeDto;
	}

}
