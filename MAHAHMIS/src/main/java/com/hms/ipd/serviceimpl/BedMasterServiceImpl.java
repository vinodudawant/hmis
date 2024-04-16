package com.hms.ipd.serviceimpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dao.BedMasterDao;
import com.hms.ipd.service.BedMasterService;

@Service
@Transactional
public class BedMasterServiceImpl implements BedMasterService{

	private @Autowired  BedMasterDao bedMasterDao;
	
	@Override
	public int saveOrUpdateBedMaster(ChargesMasterSlave chargesMasterSlave) {

		return bedMasterDao.saveOrUpdateBedMaster(chargesMasterSlave);
	}
	
	@Override
	@Transactional
	public List<ChargesMasterSlave> getBedMasterList() {

		return bedMasterDao.getBedMasterList();
	}
	
	@Override
	public int deleteHallById(int hallId, HttpServletRequest request) {
		
		return bedMasterDao.deleteHallById(hallId, request);
	}
	
	@Override
	public ChargesMasterSlave viewBedsOfHall(int hallId) {

		return bedMasterDao.viewBedsOfHall(hallId);
	}
	
	@Override
	public int deleteBedById(int hallId, int bedId, HttpServletRequest request) {

		return bedMasterDao.deleteBedById(hallId, bedId, request);
	}

	@Override
	public List<ChargesMasterSlave> autoSuggestionsubCharges(String letter) {
		
		return bedMasterDao.autoSuggestionsubCharges(letter);
	}
}
