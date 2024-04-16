package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.ChargesMasterDao;

import com.hms.ehat.dto.ChargesMasterDto;

import com.hms.ehat.service.ChargesMasterService;

@Service
public class ChargesMasterServiceImpl implements ChargesMasterService {

	/*
	 * @Autowired ChargesMasterDao ChargesMasterDao;
	 */

	@Autowired
	ChargesMasterDao chargesMasterDao;

	/**
	 * @author: Bilal @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public int saveOrUpdateCharges(ChargesMasterDto chargesMaster,
			HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current
																	// login
																	// user id

		if (chargesMaster.getChargesId() == 0) { // To Insert Record

			chargesMaster.setCreatedBy(userId);

			chargesMaster.setCreatedBy(chargesMaster.getCreatedBy());
			chargesMaster.setDeleted("N");
			chargesMaster.setCreatedDate(new Date(new java.util.Date()
					.getTime()));

		} else {// To Update Record

			chargesMaster.setUpdatedBy(userId);

			chargesMaster.setUpdatedBy(chargesMaster.getUpdatedBy());
			chargesMaster.setDeleted("N");
			chargesMaster.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));

		}

		// call dao interface methods
		int a = chargesMasterDao.saveOrUpdateCharges(chargesMaster);

		int val=0;
		if (a==3) {
			val=3;
		} else {
			val=((a == 1) ? (chargesMaster.getChargesId() == 0 ? 1 : 2) : 0);
		}
				
		return val;
		
	}

	/**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 * ***/
	@Override
	@Transactional
	public List<ChargesMasterDto> getCharges() {

		return chargesMasterDao.getAllCharges();
	}

	/**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 * ***/
	@Override
	@Transactional
	public boolean deleteCharges(Integer ChargesId, HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		ChargesMasterDto chargesMasterdao = new ChargesMasterDto();

		chargesMasterDao.deleteCharges(ChargesId, userId);
		return true;
	}

	/**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 ***/
	@Override
	@Transactional
	public List<ChargesMasterDto> getAutoSuggestionChargesNames(String letter) {

		return chargesMasterDao.getAutoSuggestionChargesNames(letter);
	}

	/**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 * ***/
	@Override
	@Transactional
	public List<ChargesMasterDto> getChargesById(Integer chargesId) {

		return chargesMasterDao.getChargesById(chargesId);
	}

	/**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 * ***/
	@Override
	@Transactional
	public List<ChargesMasterDto> getAllCharges() {

		return chargesMasterDao.getAllCharges();
	}

	/**
	 * @author: Bilal @date 16_May_2017 this Methods is used to used to call dao
	 *          methods
	 * ***/
	@Override
	@Transactional
	public List<ChargesMasterDto> getAllChargeswithDeleted() {

		return chargesMasterDao.getAllChargeswithDeleted();
	}

	/**
	 * @author: Bilal @date 06_JULY_2017 this Methods is used to count charges  
	 *          methods
	 * ***/
	@Override
	@Transactional
	public Long getChargesMasterCount() {
		
		return chargesMasterDao.getChargesMasterCount();
	}

	@Override
	@Transactional
	public List<ChargesMasterDto> sponsorandhallList(String callfrom) {
		
		return chargesMasterDao.sponsorandhallList(callfrom);
	}

	

}
