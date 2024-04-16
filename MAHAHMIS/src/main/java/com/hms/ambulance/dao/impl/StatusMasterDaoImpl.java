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
import com.hms.ambulance.dao.StatusMasterDao;
import com.hms.ambulance.dto.StatusMasterDto;

@Repository
public class StatusMasterDaoImpl implements StatusMasterDao{

	
	@Autowired
	SessionFactory sessionFactory;
	
	static Logger Log = Logger.getLogger(StatusMasterController.class.getName());
	
	
	@Override
	public int saveStatus(StatusMasterDto statusDto, HttpServletRequest request) {
	
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
		
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(StatusMasterDto.class);
			criteria.add(Restrictions.eq("statusType", statusDto.getStatusType()));
			if (criteria.uniqueResult() != null)
				return 3;

			if (statusDto.getStatusType() == null) {

				statusDto.setCreatedBy(userId);
				statusDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(statusDto);
				return 1;
			} else {
				statusDto.setUpdatedBy(userId);
				statusDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(statusDto);
				return 2;
			}
		
	} catch (Exception e) {
		Log.error("Exception--> ", e);
	}
		return 0;
	}


	@Override
	public List<StatusMasterDto> getAllStatusMaster(HttpServletRequest request) {

		List<StatusMasterDto> statusMaster = new ArrayList<StatusMasterDto>();

		try {

			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(StatusMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			statusMaster =criteria.list();
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return statusMaster;
	}


	@Override
	public StatusMasterDto editStatusMaster(Integer statusId) {
		
		StatusMasterDto obj = new StatusMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(StatusMasterDto.class);
			criteria.add(Restrictions.eq("statusId", statusId));
			obj = (StatusMasterDto) criteria.uniqueResult();
			return obj;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return obj;
	}


	@Override
	public boolean deleteStatusMaster(Integer statusId, HttpServletRequest request) {

		try {
			
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			StatusMasterDto obj = (StatusMasterDto) sessionFactory.getCurrentSession().get(StatusMasterDto.class,
					statusId);
			
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
