package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.ChargesSlaveDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.service.ChargesSlaveService;

@Service
public class ChargesSlaveServiceImpl implements ChargesSlaveService {

	@Autowired
	ChargesSlaveDao chargesSlaveDao;

	/**
	 * @author Bilal
	 * @date 18_May_2017
	 * @code For save or update records 
	 ***/
	@Override
	@Transactional
	public int saveOrUpdateChargesSlave(ChargesMasterSlave chargesMasterSlave,
			HttpServletRequest request, ChargesMasterDto chargesMaster,
			Integer slaveId, Integer selfId) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current
																	// login
																	// user id

		if (chargesMasterSlave.getSlaveId() == 0) { // To Insert Record

			chargesMasterSlave.setCreatedBy(userId);
			chargesMasterSlave.setCreatedBy(chargesMasterSlave.getCreatedBy());

			chargesMasterSlave.setDeleted("N");
			chargesMasterSlave.setCreatedDate(new Date(new java.util.Date()
					.getTime()));
			chargesMasterSlave
					.setChargesMasterDto(chargesMaster.getChargesId());
			chargesMasterSlave.setSelfId(selfId);

		} else {// To Update Record

			chargesMasterSlave.setUpdatedBy(userId);
			chargesMasterSlave.setUpdatedBy(chargesMasterSlave.getUpdatedBy());

			chargesMasterSlave.setDeleted("N");
			chargesMasterSlave.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
			chargesMasterSlave.setSelfId(selfId);
			chargesMasterSlave
					.setChargesMasterDto(chargesMaster.getChargesId());

		}
		
		int a = chargesSlaveDao.saveOrUpdateChargesSlave(chargesMasterSlave);

		int val=0;
		if (a==3) {
			val=3;
		} else {
			val=((a == 1) ? (chargesMasterSlave.getSlaveId() == 0 ? 1 : 2) : 0);
		}
						
		return val;

	}

	/**
	 * @author Bilal
	 * @date 18_May_2017
	 * @code For get charges slave list 
	 ***/
	@Override
	@Transactional
	public List<ChargesMasterSlave> getChragesSlave() {

		return chargesSlaveDao.getChragesSlave();
	}

	/**
	 * @author Bilal
	 * @date 18_May_2017
	 * @code For delete charges slave 
	 ***/
	@Override
	@Transactional
	public boolean deleteChragesSlave(Integer slaveId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		return chargesSlaveDao.deleteChragesSlave(slaveId, userId);
	}

	/**
	 * @author Bilal
	 * @date 18_May_2017
	 * @code For auto suggestions 
	 ***/
	@Override
	@Transactional
	public List<ChargesMasterSlave> getAutoSuggestionChargesSlave(String letter) {

		return chargesSlaveDao.getAutoSuggestionChargesSlave(letter);
	}

	/**
	 * @author Bilal
	 * @date 18_May_2017
	 * @code Fetch charges slave by id 
	 ***/
	@Override
	@Transactional
	public List<ChargesMasterSlave> getChargesSlaveById(Integer masterId,
			Integer selfId) {

		return chargesSlaveDao.getChargesSlaveById(masterId, selfId);
	}

	/**
	 * @author Bilal
	 * @date 18_May_2017
	 * @code For fetching all charges slave  
	 ***/
	@Override
	@Transactional
	public List<ChargesMasterSlave> getAllChargesSlave() {

		return chargesSlaveDao.getAllChargesSlave();
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> fetchSuperCatogoires(
			Integer chargesMasterDto) {
		
		return chargesSlaveDao.fetchSuperCatogoires(chargesMasterDto);
	}

	@Override
	@Transactional
	public Long getSubChargesCount() {
		// TODO Auto-generated method stub
		return chargesSlaveDao.getSubChargesCount();
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> fetchargesinfo() {
		
		return chargesSlaveDao.fetchargesinfo();
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> fetchargesinfomaster(Integer masterId,
			Integer selfId) {
		
		return chargesSlaveDao.fetchargesinfomaster(masterId,selfId);
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> setChargesInfoData(String letter) {
		
		return chargesSlaveDao.setChargesInfoData(letter);
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> fetcatY(Integer masterId, Integer selfId) {
		return chargesSlaveDao.fetcatY(masterId, selfId);
		
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> getAllChargesforhall() {
		return chargesSlaveDao.getAllChargesforhall();
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> getSponsorList() {
				
		return chargesSlaveDao.getSponsorList();
	}

	@Override
	@Transactional
	public int importSubcharges(String file) {
		
		return chargesSlaveDao.importSubcharges(file);
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> fetchsup(Integer chargesMasterDto) {
		
		return chargesSlaveDao.fetchsup(chargesMasterDto);
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> getChragesSlaveByIddr(Integer masterId,
			Integer selfId) {
		// TODO Auto-generated method stub
		return chargesSlaveDao.getChragesSlaveByIddr(masterId, selfId);
	}
	
	@Override
	@Transactional
	public List<ChargesMasterSlave> fetchSuperCatogoiresSlaveReg(
			Integer chargesMasterDto) {
		
		return chargesSlaveDao.fetchSuperCatogoiresSlaveReg(chargesMasterDto);
	}

	/** End of get method ***/

}
