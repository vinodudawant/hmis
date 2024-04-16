package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.EhatDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.service.EhatService;

@Service
public class EhatServiceImpl implements EhatService {

	@Autowired
	EhatDao ehatDao;

	/**
	 * @author: Bilal @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	/*@Override
	@Transactional
	public Boolean saveOrUpdateCharges(ChargesMasterDto chargesMaster,
			HttpServletRequest request) {
		if (chargesMaster.getChargesId() == null) {
			chargesMaster.setChargesName(chargesMaster.getChargesName());
			chargesMaster.setCodeName(chargesMaster.getCodeName());

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			chargesMaster.setCreatedBy(userId);
			//System.out.println("userid>>>>>" + userId);
			// HttpSession obj= chargesMaster.setCreatedBy();

			chargesMaster.setCreatedBy(chargesMaster.getCreatedBy());
			chargesMaster.setDeleted("N");
			chargesMaster.setCreatedDate(new Date(new java.util.Date()
					.getTime()));

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			chargesMaster.setUpdatedBy(userId);
fetchUnitList
			chargesMaster.setUpdatedBy(chargesMaster.getUpdatedBy());
			chargesMaster.setDeleted("N");

			chargesMaster.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		if (ehatDao.saveOrUpdateCharges(chargesMaster)) {
			return true;
		} else {
			return false;
		}
	}

	*//** End of save or update methods **//*

	*//**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methodsfetchUnitList
	 * ***//*
	@Override
	@Transactional
	public List<ChargesMasterDto> getCharges() {

		return ehatDao.getAllCharges();
	}

	*//** End of get method ***//*

	*//**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 * ***//*
	@Override
	@Transactional
	public Boolean deleteCharges(Integer ChargesId, HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		ChargesMasterDto chargesMasterdao=new ChargesMasterDto();
		System.err.println("userId=-=-=-=-=->"+userId);
		chargesMasterdao.setDeletedBy(userId);
		
		//chargesMasterdao.setDeletedBy(chargesMasterdao.getDeletedBy());
		
		return ehatDao.deleteCharges(ChargesId );
	}

	*//** End of get method ***//*

	*//**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 * ***//*
	@Override
	@Transactional
	public List<ChargesMasterDto> getAutoSuggestionChargesNames(String letter) {

		return ehatDao.getAutoSuggestionChargesNames(letter);
	}

	*//** End of get method ***//*

	*//**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 * ***//*
	@Override
	@Transactional
	public List<ChargesMasterDto> getChargesById(Integer chargesId) {

		return ehatDao.getChargesById(chargesId);
	}

	*//** End of get method ***//*

	*//**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 * ***//*
	@Override
	@Transactional
	public List<ChargesMasterDto> getAllCharges() {

		return ehatDao.getAllCharges();
	}

	*//** End of get method ***//*

	*//**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 * ***//*
	@Override
	@Transactional
	public List<ChargesMasterDto> getAllChargeswithDeleted() {

		return ehatDao.getAllChargeswithDeleted();
	}
*/
	/** End of get method ***/

	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public Boolean saveOrUpdateDept(DeptMasterDto deptMaster) {

		if (ehatDao.saveOrUpdateDept(deptMaster)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<DeptMasterDto> getDept() {
		// TODO Auto-generated method stub
		return ehatDao.getDept();
	}

	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public Boolean deleteDept(Integer deptId) {
		// TODO Auto-generated method stub
		return ehatDao.deleteDept(deptId);
	}

	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<DeptMasterDto> getAutoSuggestionDeptNames(String letter) {
		// TODO Auto-generated method stub
		return ehatDao.getAutoSuggestionDeptNames(letter);
	}

	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<DeptMasterDto> getDeptById(Integer deptId) {
		// TODO Auto-generated method stub
		return ehatDao.getDeptById(deptId);
	}

	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<DeptMasterDto> getAllDept() {
		// TODO Auto-generated method stub
		return ehatDao.getAllDept();
	}

	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<DeptMasterDto> getAllDeptwithDeleted() {
		// TODO Auto-generated method stub
		return ehatDao.getAllDeptwithDeleted();
	}
	/** End of Departments method **/

}
