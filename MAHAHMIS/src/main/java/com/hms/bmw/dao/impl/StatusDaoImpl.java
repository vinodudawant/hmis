package com.hms.bmw.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.jfree.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.bmw.dao.StatusDao;
import com.hms.bmw.dto.BmwStatusDto;

@SuppressWarnings("unchecked")
@Repository
public class StatusDaoImpl implements StatusDao{

static Logger log=Logger.getLogger(StatusDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	Session session;

	
	@Override
	public int savebmwStatusMaster(BmwStatusDto bmwStatusDto, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BmwStatusDto.class);
			criteria.add(Restrictions.eq("bag_Status", bmwStatusDto.getBag_Status()));
			if (criteria.uniqueResult() != null)
				return 3;

			if (bmwStatusDto.getBag_Status() == null) {

				bmwStatusDto.setCreatedBy(userId);
				bmwStatusDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(bmwStatusDto);
				return 1;
			} else {
				bmwStatusDto.setUpdatedBy(userId);
				bmwStatusDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(bmwStatusDto);
				return 2;
			}
		
		} catch (Exception e) {
		Log.error("Exception--> ", e);
	}

		return 0;
	}


	@Override
	public List<BmwStatusDto> getstatustypes(HttpServletRequest request) {
		// TODO Auto-generated method stub
		
		List<BmwStatusDto> list =new ArrayList<BmwStatusDto>();
		
		try {
			
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BmwStatusDto.class);
			
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("deleted", "N"));
			list = criteria.list();
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return list;
		}
		
		return list;
	}


	@Override
	public BmwStatusDto editBmwStatus(Integer statusID) {
		
		BmwStatusDto obj = new BmwStatusDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BmwStatusDto.class);
			criteria.add(Restrictions.eq("statusID", statusID));
			obj = (BmwStatusDto) criteria.uniqueResult();
			return obj;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return obj;
	}


	@Override
	public boolean deleteBmwStatus(Integer statusID, HttpServletRequest request) {
		
		try {
			
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			BmwStatusDto obj = (BmwStatusDto) sessionFactory.getCurrentSession().get(BmwStatusDto.class,
					statusID);
			
			obj.setStatus("N");
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
