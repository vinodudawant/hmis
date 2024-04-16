package com.hms.administrator.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.ReasonOfVisitDao;
import com.hms.administrator.dto.district_taluka_city;
import com.hms.administrator.service.ReasonOfVisitService;

@Service
@Transactional
public class ReasonOfVisitServiceImpl implements ReasonOfVisitService{

	@Autowired
	ReasonOfVisitDao mastersDao;
	
	@Override
	public String saveReasonOfVisit(district_taluka_city dto, Integer moduleId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		dto.setCreatedBy(userId);
		dto.setUnitId(unitId);
		return mastersDao.saveReasonOfVisit(dto, moduleId);
	}
	
	public district_taluka_city getAllReasons(String searchText, String callFrom) {
		return mastersDao.getAllReasons(searchText, callFrom);
	}

	@Override
	public district_taluka_city editReason(Integer reasonId) {
		return mastersDao.editReasons(reasonId);
	}

	@Override
	public boolean deleteReason(Integer reasonId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return mastersDao.deleteReasons(reasonId, userId);
	}
}
