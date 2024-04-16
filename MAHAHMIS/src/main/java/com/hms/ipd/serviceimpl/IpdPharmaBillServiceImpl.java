package com.hms.ipd.serviceimpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dao.IpdPharmaBillDao;
import com.hms.ipd.service.IpdPharmaBillService;

@Service
@Transactional
public class IpdPharmaBillServiceImpl implements IpdPharmaBillService{

	private @Autowired  
	IpdPharmaBillDao ipdPharmaBillDao;
	
	@Override
	public int saveOrUpdateBedMaster(ChargesMasterSlave chargesMasterSlave) {

		return ipdPharmaBillDao.saveOrUpdateBedMaster(chargesMasterSlave);
	}
	
	@Override
	@Transactional
	public List<ChargesMasterSlave> getBedMasterList() {

		return ipdPharmaBillDao.getBedMasterList();
	}
	
	@Override
	public int deleteHallById(int hallId, HttpServletRequest request) {
		
		return ipdPharmaBillDao.deleteHallById(hallId, request);
	}
	
	@Override
	public ChargesMasterSlave viewBedsOfHall(int hallId) {

		return ipdPharmaBillDao.viewBedsOfHall(hallId);
	}
	
	@Override
	public int deleteBedById(int hallId, int bedId, HttpServletRequest request) {

		return ipdPharmaBillDao.deleteBedById(hallId, bedId, request);
	}

	@Override
	public List<ChargesMasterSlave> autoSuggestionsubCharges(String letter) {
		
		return ipdPharmaBillDao.autoSuggestionsubCharges(letter);
	}
}
