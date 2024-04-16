package com.hms.bloodbank.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.bloodbank.dao.BloodTypeMasterDao;
import com.hms.bloodbank.dto.BloodTypeMaster;
import com.hms.bloodbank.service.BloodTypeMasterService;

@Service
@Transactional
public class BloodTypeMasterServiceImpl implements BloodTypeMasterService{

	@Autowired
	BloodTypeMasterDao bloodTypeMasterDao;
	
	@Override
	public int saveTypeGroup(BloodTypeMaster bloodBagDetails, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodTypeMasterDao.saveTypeGroup(bloodBagDetails,request);
	}

	@Override
	public List<BloodTypeMaster> getAllBloodTypeMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodTypeMasterDao.getAllBloodTypeMaster(request);
	}

	@Override
	public BloodTypeMaster editBloodTypeMaster(Integer bloodTypeId) {
		// TODO Auto-generated method stub
		return bloodTypeMasterDao.editBloodTypeMaster(bloodTypeId);
	}

	@Override
	public boolean deleteBloodTypeMaster(Integer bloodTypeId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bloodTypeMasterDao.deleteBloodTypeMaster(bloodTypeId,request);
	}

	@Override
	public List<BloodTypeMaster> centerBloodTypeAutoSuggestion(String bloodTypeName) {
		// TODO Auto-generated method stub
		return bloodTypeMasterDao.centerBloodTypeAutoSuggestion(bloodTypeName);
	}
	

}
