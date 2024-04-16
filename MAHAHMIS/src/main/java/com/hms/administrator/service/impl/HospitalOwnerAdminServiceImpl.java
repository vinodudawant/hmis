package com.hms.administrator.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dao.HospitalOwnerAdminDao;
import com.hms.administrator.dto.HospitalOwnerDetailDto;
import com.hms.administrator.service.HospitalOwnerAdminService;


@Service
@Transactional
public class HospitalOwnerAdminServiceImpl implements HospitalOwnerAdminService{

	@Autowired
	HospitalOwnerAdminDao hospitalOwnerAdminDao;
	
/*************************************************
* @author	:Dnyaneshwar Kadam
* @date		: 15-Jan-2020
* @codeFor	: savehospitalownerdetail
*************************************************/	
@Override
public int savehospitalownerdetail(String savehospitalownerdetail,
		HttpServletRequest request) {

	return hospitalOwnerAdminDao.savehospitalownerdetail(savehospitalownerdetail, request);
}

@Override
public HospitalOwnerDetailDto getListhospitalownerdetail() {
	
	
	return hospitalOwnerAdminDao.getListhospitalownerdetail();
}

@Override
public HospitalOwnerDetailDto edithospitalownerdetail(Integer idhospitalOwner,
		HttpServletRequest request) {
	
	return hospitalOwnerAdminDao.edithospitalownerdetail(idhospitalOwner, request);
}

@Override
public boolean delethospitalownerdetail(Integer idhospitalOwner,
		HttpServletRequest request) {

	return hospitalOwnerAdminDao.delethospitalownerdetail(idhospitalOwner, request);
}

	
	
	
	
}
