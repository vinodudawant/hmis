package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

 
import com.hms.ehat.dao.MasterConfigDao;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.MasterConfigDto;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.UnitMasterDto;
import com.hms.ehat.service.MasterConfigService;

@Service

public class MasterConfigServiceImpl implements MasterConfigService {
	
	@Autowired
	MasterConfigDao MasterConfigDao;
	
	/**
	 * @author: Sagar @date 26_May_2017 this Methods is used to call dao methods and Buissness logic
	 * ***/
	@Override
	@Transactional
	public int saveOrUpdateConfigMaster(String[] configList,HttpServletRequest request,MasterConfigDto configMaster) 
	{
		String setCount=request.getParameter("setcount");
		
		//String s[] = request.getParameterValues("ulist");
		
		if (Integer.parseInt(setCount) == 0) {
			//System.err.println("ur config id<<<<<<<<<<<<<<<<<<<<<<<<<<<"+configMaster.getConfigCount());

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			
			configMaster.setCreatedBy(userId);
			configMaster.setCreatedBy(configMaster.getCreatedBy());
			
			configMaster.setDeleted("N");
			configMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
			int response =  MasterConfigDao.saveOrUpdateConfigMaster(configList,configMaster,setCount);

			return response;
		} else {

			//System.err.println("in update loop<<<<<<<<<<<<<<<<<<<<<<<<<<<"+configMaster.getConfigCount());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			configMaster.setUpdatedBy(userId);
			configMaster.setUpdatedBy(configMaster.getUpdatedBy());
			configMaster.setDeleted("N");
			configMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));
			int response = MasterConfigDao.saveOrUpdateConfigMaster(configList,configMaster,setCount);
			if (response == 1) {
				response = 2;
			}
			return response;
		}

	}

	/**
	 * @author: Sagar @date 26_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<MasterConfigDto> getConfigMasterListByCount(int count) {

		return MasterConfigDao.getConfigMasterListByCount(count);
	}
	
	/**
	 * @author: Sagar @date 26_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<MasterConfigDto> getConfigMasterCount() {
		
		return MasterConfigDao.getConfigMasterCount();
		 
		 
	}
	/**
	 * @author: Sagar @date 26_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public boolean deleteConfigMaster(int cnfId,HttpServletRequest request) {
		
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return MasterConfigDao.deleteConfigMaster(cnfId,userId);
		 
	}
	
	/**
	 * @author: Sagar @date 26_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<MasterConfigDto> getConfigMasterListByUnitId(String[] configList,HttpServletRequest request,int i) {
		
		return MasterConfigDao.getConfigMasterListByUnitId(configList,i);
		 
		 
	}
	
	
	
	

}
