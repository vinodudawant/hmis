package com.hms.bloodbank.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.bloodbank.dao.BloodBagMasterDao;

import com.hms.bloodbank.dto.BloodBagMaster;
import com.hms.bloodbank.service.BloodBagMasterService;

@Service
@Transactional
public class BloodBagMasterServiceImpl implements BloodBagMasterService {
	
	@Autowired
	BloodBagMasterDao bloodBagMasterDao;

	@Override
	public int saveBloodBagMaster(BloodBagMaster bloodBagDetails, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		bloodBagDetails.setCreatedBy(userId);
		bloodBagDetails.setUpdatedBy(userId);
		String ipaddress = request.getRemoteAddr();
		bloodBagDetails.setIpAddress(ipaddress);
		return bloodBagMasterDao.saveBloodBagMaster(bloodBagDetails,request);
	}

	@Override
	public List<BloodBagMaster> getAllBloodBagMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBagMasterDao.getAllBloodBagMaster(request);
	}

	@Override
	public BloodBagMaster editBloodBagtMaster(Integer bloodBagId) {
		// TODO Auto-generated method stub
		return bloodBagMasterDao.editBloodBagtMaster(bloodBagId);
	}
	
	@Override
	public boolean deleteBloodBagMaster(Integer bloodBagId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return bloodBagMasterDao.deleteBloodBagMaster(bloodBagId,userId,request);
	}

	@Override
	public List<BloodBagMaster> centerBloodBagAutoSuggestion(String bloodBagName) {
		// TODO Auto-generated method stub
		return bloodBagMasterDao.centerBloodBagAutoSuggestion(bloodBagName);
	}

	@Override
	public int saveBloodBagMaster1(BloodBagMaster bloodBagDetails, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodBagMasterDao.saveBloodBagMaster1(bloodBagDetails,request);
	}

}
