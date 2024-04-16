package com.hms.bloodbank.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.bloodbank.dao.ComponentDao;
import com.hms.bloodbank.dto.Component;
import com.hms.bloodbank.service.ComponentService;

@Service
@Transactional
public class ComponentServiceImpl implements ComponentService {
		
	@Autowired
	ComponentDao componentDao;
	
	@Override
	public int saveComponent(Component componentDetails, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return componentDao.saveComponent(componentDetails,request);
	}

	@Override
	public List<Component> getAllComponentMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return componentDao.getAllComponentMaster(request);
	}

	@Override
	public boolean deleteComponentMaster(Integer componentId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return componentDao.deleteComponentMaster(componentId,userId,request);
	}

	@Override
	public Component editComponentMaster(Integer componentId) {
		// TODO Auto-generated method stub
		return componentDao.editComponentMaster(componentId);
	}

	@Override
	public List<Component> centerComponentAutoSuggestion(String componentName) {
		// TODO Auto-generated method stub
		return componentDao.centerComponentAutoSuggestion(componentName);
	}

}
