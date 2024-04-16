package com.hms.ehat.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Doctor;
import com.hms.dto.Patient;
import com.hms.dto.Users;
import com.hms.ehat.dao.BillingDao;
import com.hms.ehat.service.BillingService;

@Service
public class BillingServiceImpl implements BillingService {
	
	@Autowired
	BillingDao adminDao;

	@Override
	@Transactional
	public List<Doctor> fetchAuthorisedBy() {
		List<Doctor> list=adminDao.fetchAuthorisedBy();
		return list;
	}

	@Override
	@Transactional
	public List<Users> fetchAvaStatus() {
		List<Users> arrUsers = adminDao.fetchAvaStatus();
		return arrUsers;
	}

	@Override
	@Transactional
	public List<Patient> showDiscountApproval(String searchOn, String searchBy, String value) {
		List<Patient> list=adminDao.showDiscountApproval(searchOn,searchBy,value);
		return list;
	}

	@Override
	@Transactional
	public List<Patient> showSurgeonDiscountApproval(String searchOn, String searchBy, String value) {
		
		return adminDao.showSurgeonDiscountApproval(searchOn,searchBy,value);
	}

}
