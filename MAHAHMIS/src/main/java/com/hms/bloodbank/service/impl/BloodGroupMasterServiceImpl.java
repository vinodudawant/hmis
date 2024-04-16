package com.hms.bloodbank.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.bloodbank.dao.BloodGroupMasterDao;
import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.bloodbank.service.BloodGroupMasterService;



@Service
@Transactional
public class BloodGroupMasterServiceImpl implements BloodGroupMasterService {
	
	@Autowired
	BloodGroupMasterDao bloodGroupMasterDao;

	@Override
	public int saveBloodGroup(BloodGroupMaster bloodGroupDetails, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		bloodGroupDetails.setCreatedBy(userId);
		bloodGroupDetails.setUpdatedBy(userId);
		String ipaddress = request.getRemoteAddr();
		bloodGroupDetails.setIpAddress(ipaddress);
		return bloodGroupMasterDao.saveBloodGroup(bloodGroupDetails,request);
	}
	
	@Override
	public List<BloodGroupMaster> getAllBloodGroupMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodGroupMasterDao.getAllBloodGroupMaster(request);
	}

	@Override
	public BloodGroupMaster editBloodGrouptMaster(Integer bloodGroupId) {
		// TODO Auto-generated method stub
		return bloodGroupMasterDao.editBloodGrouptMaster(bloodGroupId);
	}

	@Override
	public boolean deleteBloodGroupMaster(Integer bloodGroupId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return bloodGroupMasterDao.deleteBloodGroupMaster(bloodGroupId,userId,request);
	}

	@Override
	public List<BloodGroupMaster> centerBloodGroupAutoSuggestion(String bloodGroupName) {
		// TODO Auto-generated method stub
		return bloodGroupMasterDao.centerBloodGroupAutoSuggestion(bloodGroupName);
	}

}
