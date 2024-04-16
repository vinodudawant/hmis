package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dto.processMasterDto;
import com.hms.ehat.dao.DeptDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.service.processService;

@Service
public class processServiceimpl implements processService {

	@Autowired
	com.hms.ehat.dao.processDao processDao;
	
	//*****@uthor-Sagar *****
	
	DeptDao deptDao;
	ResourceBundle resourceBundleEhat = ResourceBundle
			.getBundle("EhatEnterpriseConfigurationFile");
	String userAccessFlow = resourceBundleEhat.getObject(
			"userAccessFlow").toString();

	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all impletented save or update methods. 
	 ******************************************************************************/
	@Override
	@Transactional
	public int saveOrUpdateProcess(processMasterDto processMaster,HttpServletRequest request) {
		if (processMaster.getProcessId()== 0) {
			processMaster.setProcessName(processMaster.getProcessName());
			processMaster.setProcessCode(processMaster.getProcessCode());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			processMaster.setCreatedBy(userId);
			//System.out.println("userid>>>>>" + userId);
			// HttpSession obj= chargesMaster.setCreatedBy();

			processMaster.setCreatedBy(processMaster.getCreatedBy());
			processMaster.setDeleted("N");
			//unitMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			processMaster.setCreatedBy(userId);
			
			processMaster.setUpdatedBy(processMaster.getUpdatedBy());
			processMaster.setDeleted("N");
			processMaster.setUpdatedBy(userId);
			
			processMaster.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		
		if (processDao.saveOrUpdateProcess(processMaster)==1) 
		{
			if(processMaster.getProcessId() == 0)
			{
				return 1;
			}else{
				return 2;
			}
		} else 
		{
			return 0;
		}
	}
	
	
	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/

	@Override
	public List<processMasterDto> getAllProcess() {
		// TODO Auto-generated method stub
		return processDao.getAllprocess();
	}	
	
	
	 


	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/
	
	@Override
	@Transactional
	public boolean deleteProcess(Integer processId,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		ChargesMasterDto chargesMasterdao = new ChargesMasterDto();
		

		processDao.deleteProcess(processId, userId);
		return true;
	}


	@Override
	@Transactional
	public List<processMasterDto> getAllProcess1(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return processDao.getAllprocess();
	}


	@Override
	@Transactional
	public List<processMasterDto> getAutoSuggestionPNames(String letter) {
		// TODO Auto-generated method stub
		return processDao.getAutoSuggestionPNames(letter);
	}	

	/*@Override
	public boolean deleteProcess(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return false;
	}


	@Override
	public List<UnitMasterDto> getUnit() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<UnitMasterDto> getAutoSuggestionUnitNames(String letter) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<UnitMasterDto> getUnitById(Integer unitId) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<UnitMasterDto> getAllUnitwithDeleted() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Long getUnitCount() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<UnitMasterDto> unitMasterListlogin(String ulogin) {
		// TODO Auto-generated method stub
		return null;
	}*/
		 
	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/

	/*@Override
	@Transactional
	public List<UnitMasterDto> getUnit() {
		// TODO Auto-generated method stub
		return unitdao.getUnit();
	}	
	
	*//**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***//*
	
	@Override
	@Transactional
	public boolean deleteProcess(Integer unitId,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		ChargesMasterDto chargesMasterdao = new ChargesMasterDto();
		

		unitdao.deleteUnit(unitId, userId);
		return true;
	}	

	*//**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***//*
	
	@Override
	@Transactional
	public List<UnitMasterDto> getAutoSuggestionUnitNames(String letter) {
		// TODO Auto-generated method stub
		return unitdao.getAutoSuggestionUnitNames(letter);
	}	

	*//**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***//*
	@Override
	@Transactional
	public List<UnitMasterDto> getUnitById(Integer unitId) {
		// TODO Auto-generated method stub
		return unitdao.getUnitById(unitId);
	}	

	
	

	*//**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***//*
	@Override
	@Transactional
	public List<UnitMasterDto> getAllUnitwithDeleted() {
		// TODO Auto-generated method stub
		return unitdao.getAllUnitwithDeleted();
	}

	*//**
	 * @author: Kishor Lokhabde
	 *  @date 22_May_2017 this Methods is used to call dao methods
	 * ***//*
	@Transactional
	public Long getUnitCount() {
		// TODO Auto-generated method stub
		
		
		return (long) unitdao.getUnitCount();
	}

	@Override
	@Transactional
	public List<UnitMasterDto> unitMasterListlogin(String ulogin) {
		
		return unitdao.unitMasterListlogin(ulogin);
	}

	
	*/
	
	
}
