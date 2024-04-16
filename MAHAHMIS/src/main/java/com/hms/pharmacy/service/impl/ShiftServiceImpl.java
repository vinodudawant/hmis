package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.ShiftDao;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.ShiftMaster;
import com.hms.pharmacy.service.ShiftService;

@Service
public class ShiftServiceImpl implements ShiftService{

	@Autowired
	ShiftDao shiftDao;
	
	@Override
	@Transactional
	public List<ShiftMaster> getShiftDetails(String type) {
		return shiftDao.getShiftDetails(type);
	}

	@Override
	@Transactional
	public boolean saveOrUpdateShift(ShiftMaster shiftMaster,HttpServletRequest request) {
		
		if(shiftMaster.getShiftId()==null)
		{
			shiftMaster.setShiftDeleteFlag(0);
			shiftMaster.setShiftAddDate(new Date(new java.util.Date()
					.getTime()));
			shiftMaster.setShiftUpdateDate(new Date(new java.util.Date()
					.getTime()));
			
			HttpSession session = request.getSession(true);
			Integer userId=(Integer)session.getAttribute("userId1");
			shiftMaster.setShiftAddedBy(userId.toString());
			shiftMaster.setShiftModBy(userId.toString());
			
		}
		
		if (shiftDao.saveOrUpdateShift(shiftMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public List<ShiftMaster> getAutoSuggestionShiftTypes(String letter) {
		return shiftDao.getAutoSuggestionShiftTypes(letter);
	}

	@Override
	@Transactional
	public List<ShiftMaster> getShiftById(Integer shiftId) {
		return shiftDao.getShiftById(shiftId);
	}

	@Override
	@Transactional
	public boolean deleteShift(Integer shiftId) {
		return shiftDao.deleteShift(shiftId);
	}

}
