package com.hms.ambulance.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ambulance.controller.StatusMasterController;
import com.hms.ambulance.dao.ChecklistMasterDao;
import com.hms.ambulance.dto.ChecklistMasterDto;

@Repository
public class ChecklistMasterDaoImpl implements ChecklistMasterDao{

	@Autowired
	SessionFactory sessionFactory;
	
	static Logger Log = Logger.getLogger(StatusMasterController.class.getName());
	
	@Override
	public int saveChecklist(ChecklistMasterDto checklistDto, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
		
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChecklistMasterDto.class);
			criteria.add(Restrictions.eq("checklistType", checklistDto.getChecklistType()));
			if (criteria.uniqueResult() != null)
				return 3;

			if (checklistDto.getChecklistType() == null) {

				checklistDto.setCreatedBy(userId);
				checklistDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(checklistDto);
				return 1;
			} else {
				checklistDto.setUpdatedBy(userId);
				checklistDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(checklistDto);
				return 2;
			}
		
	} catch (Exception e) {
		Log.error("Exception--> ", e);
	}
		return 0;
	}

	@Override
	public List<ChecklistMasterDto> getAllChecklistMaster(HttpServletRequest request) {

		List<ChecklistMasterDto> checklistMaster = new ArrayList<ChecklistMasterDto>();

		try {

			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChecklistMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			checklistMaster =criteria.list();
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return checklistMaster;
	}

	@Override
	public ChecklistMasterDto editChecklistMaster(Integer checklistId) {

		ChecklistMasterDto obj = new ChecklistMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChecklistMasterDto.class);
			criteria.add(Restrictions.eq("checklistId", checklistId));
			obj = (ChecklistMasterDto) criteria.uniqueResult();
			return obj;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return obj;
	}

	@Override
	public boolean deleteChecklistMaster(Integer checklistId, HttpServletRequest request) {

		try {
			
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			ChecklistMasterDto obj = (ChecklistMasterDto) sessionFactory.getCurrentSession().get(ChecklistMasterDto.class,
					checklistId);
			
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return false;
	}

}
