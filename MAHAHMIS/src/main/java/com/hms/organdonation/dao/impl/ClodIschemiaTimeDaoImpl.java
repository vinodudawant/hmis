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

import com.hms.organdonation.dao.ClodIschemiaTimeDao;
import com.hms.organdonation.dto.ClodIschemiaTimeDto;

@Repository
public class ClodIschemiaTimeDaoImpl implements ClodIschemiaTimeDao {

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	private ClodIschemiaTimeDto clodIschemiaTimedto;

	@Override
	public int saveClodIschemiaTime(ClodIschemiaTimeDto obj, HttpServletRequest request) {

		int status = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			String saveSqlQuery = "";
			if (obj.getClodIschemiaTimeId() == 0) {
				
				saveSqlQuery="SELECT count(*) from organ_clod_Ischemia_Time s where s.deleted='N' and s.clodIschemiaTime_name='"+obj.getClodIschemiaTimeName()+"'";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(saveSqlQuery);	
				int countNew = ((Number)countQuery.uniqueResult()).intValue();
				if(countNew > 0){
					status = 3;
				}else {
					obj.setCreatedBy(userId);
					obj.setUnitId(unitId);
					System.out.println(unitId);
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
	public List<ClodIschemiaTimeDto> getAllClodIschemiaTime(HttpServletRequest request) {

		List<ClodIschemiaTimeDto> lstClodIschemiaTimeDto = new ArrayList<ClodIschemiaTimeDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ClodIschemiaTimeDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstClodIschemiaTimeDto = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstClodIschemiaTimeDto;

	}

	@Override
	public ClodIschemiaTimeDto editClodIschemiaTime(Integer clodIschemiaTimeId) {

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ClodIschemiaTimeDto.class);
			criteria.add(Restrictions.eq("id", clodIschemiaTimeId));
			clodIschemiaTimedto = (ClodIschemiaTimeDto) criteria.uniqueResult();
			return clodIschemiaTimedto;
		} catch (Exception e) {
			e.printStackTrace();
			return clodIschemiaTimedto;
		}
	}

	@Override
	public List<ClodIschemiaTimeDto> clodIschemiaTimeAutoSuggestion(String clodIschemiaTimeName) {

		String sql = "";

		List<ClodIschemiaTimeDto> lstClodIschemiaTimeDto = new ArrayList<ClodIschemiaTimeDto>();
		try {
			sql = "SELECT b.id, b.clodIschemiaTime_name FROM clod_Ischemia_Time b  where b.clodIschemiaTime_name like '"
					+ clodIschemiaTimeName + "%' and b.deleted='N' limit 20 ";
			System.err.println("-------" + sql);
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				ClodIschemiaTimeDto obj = new ClodIschemiaTimeDto();
				obj.setClodIschemiaTimeName((String) row.get("clodIschemiaTime_name"));
				obj.setClodIschemiaTimeId((Integer) row.get("id"));
				lstClodIschemiaTimeDto.add(obj);
				obj = null;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return lstClodIschemiaTimeDto;
	}

	@Override
	public boolean deleteClodIschemiaTime(Integer clodIschemiaTimeId, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			ClodIschemiaTimeDto obj = (ClodIschemiaTimeDto) sessionFactory.getCurrentSession()
					.get(ClodIschemiaTimeDto.class, clodIschemiaTimeId);
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

}
