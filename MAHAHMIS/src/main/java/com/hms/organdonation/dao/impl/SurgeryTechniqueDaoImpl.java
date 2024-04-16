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

import com.hms.organdonation.dao.SurgeryTechniqueDao;
import com.hms.organdonation.dto.SurgeryTechniqueDto;

@Repository
public class SurgeryTechniqueDaoImpl implements SurgeryTechniqueDao {

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	private SurgeryTechniqueDto surgerytechniquedto;

	@Override
	public int saveSurgeryTechnique(SurgeryTechniqueDto obj, HttpServletRequest request) {

		int status = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			String saveSqlQuery = "";
			if (obj.getStId() == 0) {
				
				saveSqlQuery="SELECT count(*) from organ_surgery_technique s where s.deleted='N' and s.surgery_technique_name='"+obj.getStName()+"'";
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
	public List<SurgeryTechniqueDto> getAllSurgeryTechnique(HttpServletRequest request) {

		List<SurgeryTechniqueDto> lstSurgeryTechniqueDto = new ArrayList<SurgeryTechniqueDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SurgeryTechniqueDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstSurgeryTechniqueDto = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstSurgeryTechniqueDto;
	}

	@Override
	public SurgeryTechniqueDto editSurgeryTechnique(Integer stId) {

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SurgeryTechniqueDto.class);
			criteria.add(Restrictions.eq("id", stId));
			surgerytechniquedto = (SurgeryTechniqueDto) criteria.uniqueResult();
			return surgerytechniquedto;
		} catch (Exception e) {
			e.printStackTrace();
			return surgerytechniquedto;
		}
	}

	@Override
	public boolean deleteSurgeryTechnique(Integer stId, HttpServletRequest request) {

		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			SurgeryTechniqueDto obj = (SurgeryTechniqueDto) sessionFactory.getCurrentSession()
					.get(SurgeryTechniqueDto.class, stId);
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
	public List<SurgeryTechniqueDto> surgeryTechniqueAutoSuggestion(String stName) {

		String sql = "";

		List<SurgeryTechniqueDto> lstSurgeryTechniqueDto = new ArrayList<SurgeryTechniqueDto>();
		try {
			sql = "SELECT b.id, b.surgery_technique_name FROM surgery_technique b  where b.surgery_technique_name like '"
					+ stName + "%' and b.deleted='N' limit 20 ";
			System.err.println("-------" + sql);
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				SurgeryTechniqueDto obj = new SurgeryTechniqueDto();
				obj.setStName((String) row.get("surgery_technique_name"));
				obj.setStId((Integer) row.get("id"));
				lstSurgeryTechniqueDto.add(obj);
				obj = null;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return lstSurgeryTechniqueDto;
	}

}
