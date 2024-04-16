package com.hms.bloodbank.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.bloodbank.dao.BloodItemMasterDao;
import com.hms.bloodbank.dto.BloodItemMaster;
import com.hms.bloodbank.service.BloodItemMasterService;

@Service
@Transactional
public class BloodItemMasterServiceImpl implements BloodItemMasterService {
	
	@Autowired
	BloodItemMasterDao bloodItemMasterDao;

	@Override
	public int saveBloodItemMaster(BloodItemMaster bloodItemDetails, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		bloodItemDetails.setCreatedBy(userId);
		bloodItemDetails.setUpdatedBy(userId);
		String ipaddress = request.getRemoteAddr();
		bloodItemDetails.setIpAddress(ipaddress);
		return bloodItemMasterDao.saveBloodItemMaster(bloodItemDetails,request);
	}

	@Override
	public List<BloodItemMaster> getAllBloodItemMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodItemMasterDao.getAllBloodItemMaster(request);
	}

	@Override
	public BloodItemMaster editBloodItemMaster(Integer bloodItemId) {
		// TODO Auto-generated method stub
		return bloodItemMasterDao.editBloodItemMaster(bloodItemId);
	}

	@Override
	public boolean deleteBloodItemMaster(Integer bloodItemId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return bloodItemMasterDao.deleteBloodItemMaster(bloodItemId,userId,request);
	}

	@Override
	public List<BloodItemMaster> centerBloodItemAutoSuggestion(String bloodItemName) {
		// TODO Auto-generated method stub
		return bloodItemMasterDao.centerBloodItemAutoSuggestion(bloodItemName);
	}

}
