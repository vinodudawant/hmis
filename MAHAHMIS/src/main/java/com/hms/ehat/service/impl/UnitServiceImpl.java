package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.DeptDao;
import com.hms.ehat.dao.UnitDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.UnitMasterDto;
import com.hms.ehat.service.UnitService;

@Service
public class UnitServiceImpl implements UnitService {

	@Autowired
	UnitDao unitdao;
	@Autowired
	SessionFactory sessionFactory;
	
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
	public int saveOrUpdateUnit(UnitMasterDto unitMaster,HttpServletRequest request) {
		
		String sName="SELECT  r.state_name from ehat_center_state_master r where r.deleted='N' and r.state_id="+unitMaster.getStateId();
		Query stateDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sName);
		String stateName  = stateDetailsQuery.uniqueResult().toString();
		
		String dsql="SELECT  r.district_name from ehat_center_district_master r where r.deleted='N' and r.district_id="+unitMaster.getDistrictId();
		Query districtDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(dsql);
		String distictName  = districtDetailsQuery.uniqueResult().toString();
		
		String tsql="SELECT  r.type_name from ehat_type_doc r where r.deleted='N' and r.type_id="+unitMaster.getTypeId();
		Query typeDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(tsql);
		String typeName  = typeDetailsQuery.uniqueResult().toString();
		
		String hsql="SELECT  r.hospital_code from ehat_hospital_doc r where r.deleted='N' and r.hospital_id="+unitMaster.getHospitalId();
		Query hospitalDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(hsql);
		String hospitalCode  = hospitalDetailsQuery.uniqueResult().toString();
		
		String ysql="SELECT  r.year from ehat_year_doc r where r.deleted='N' and r.year_id="+unitMaster.getYearId();
		Query yearDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(ysql);
		String year  = yearDetailsQuery.uniqueResult().toString();
		
		unitMaster.setStateName(stateName);
		unitMaster.setDistrictName(distictName);
		unitMaster.setTypeName(typeName);
		unitMaster.setHospitalName(hospitalCode);
		unitMaster.setYear(year);
		
		if (unitMaster.getUnitId() == 0) {
			unitMaster.setUnitName(unitMaster.getUnitName());
			unitMaster.setUnitCode(unitMaster.getUnitCode());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			unitMaster.setCreatedBy(userId);
			//System.out.println("userid>>>>>" + userId);
			// HttpSession obj= chargesMaster.setCreatedBy();

			unitMaster.setCreatedBy(unitMaster.getCreatedBy());
			unitMaster.setDeleted("N");
			//unitMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			unitMaster.setCreatedBy(userId);
			
			unitMaster.setUpdatedBy(unitMaster.getUpdatedBy());
			unitMaster.setDeleted("N");
			unitMaster.setUpdatedBy(userId);
			
			unitMaster.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		
		if (unitdao.saveOrUpdateUnit(unitMaster)==1) 
		{
			if(unitMaster.getUnitId() == 0)
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
	@Transactional
	public List<UnitMasterDto> getUnit() {
		// TODO Auto-generated method stub
		return unitdao.getUnit();
	}	
	
	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/
	
	@Override
	@Transactional
	public boolean deleteUnit(Integer unitId,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		ChargesMasterDto chargesMasterdao = new ChargesMasterDto();
		

		unitdao.deleteUnit(unitId, userId);
		return true;
	}	

	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/
	
	@Override
	@Transactional
	public List<UnitMasterDto> getAutoSuggestionUnitNames(String letter) {
		// TODO Auto-generated method stub
		return unitdao.getAutoSuggestionUnitNames(letter);
	}	

	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<UnitMasterDto> getUnitById(Integer unitId) {
		// TODO Auto-generated method stub
		return unitdao.getUnitById(unitId);
	}	

	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/

	@Override
	public List<UnitMasterDto> getAllUnit() {
		// TODO Auto-generated method stub
		return unitdao.getAllUnit();
	}	
	

	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<UnitMasterDto> getAllUnitwithDeleted() {
		// TODO Auto-generated method stub
		return unitdao.getAllUnitwithDeleted();
	}

	/**
	 * @author: Kishor Lokhabde
	 *  @date 22_May_2017 this Methods is used to call dao methods
	 * ***/
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

	
	
	
	/**
	 * @author: Sagar Kadam 
	 * @date 11-july_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/

	@Override
	@Transactional
	public List<UnitMasterDto> getAllUnit1(HttpServletRequest request) {
				//***** Added by Sagar *****//
 		
	/*	if(userAccessFlow.equalsIgnoreCase("on")){
 			
			HttpSession session = request.getSession();
			int userId = (Integer) session.getAttribute("userId1");
 		 
			return unitdao.getAllUnitByUserAccess(userId);
		}*/
		//else{
 
			//***** Added by Sagar @reason -to fetch all units  *****//
			return unitdao.getAllUnit();
		//}
		
 		
		
	}

	@Override
	@Transactional
	public Long getCountOfActiveUnit() {		
		return unitdao.getCountOfActiveUnit();
	}
	
	@Override
	@Transactional
	public List<UnitMasterDto> getAllUnitListMaster() {
		// TODO Auto-generated method stub
		return unitdao.getAllUnitListMaster();
	}
}
