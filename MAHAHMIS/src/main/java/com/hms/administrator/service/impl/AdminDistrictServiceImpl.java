package com.hms.administrator.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dao.AdminDistrictDao;
import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.service.AdminDistrictService;
@Service
@Transactional
public class AdminDistrictServiceImpl implements AdminDistrictService {

	@Autowired
	AdminDistrictDao adminDistrictDao;
	
	@Override
	public int saveAdminDistrict(AdminDistrictDTO district,
			HttpServletRequest request) {
		return adminDistrictDao.saveAdminDistrict(district, request);
	}

	@Override
	public List<AdminDistrictDTO> getAllDistrict() {
		return adminDistrictDao.getAllDistrict();
	}

	@Override
	public AdminDistrictDTO editDistrictById(int district_id,
			HttpServletRequest request) {
		return adminDistrictDao.editDistrictById(district_id, request);
	}

	@Override
	public boolean deleteDistrictById(int district_id,
			HttpServletRequest request) {
		return adminDistrictDao.deleteDistrictById(district_id, request);
	}

	@Override
	public List<AdminDistrictDTO> getAllDistrictListByStateId(int stateId,
			HttpServletRequest request) {
		return adminDistrictDao.getAllDistrictListByStateId(stateId, request);
	}

	@Override
	public List<AdminDistrictDTO> searchDistrictByName(String name,
			HttpServletRequest request) {
		return adminDistrictDao.searchDistrictByName( name, request);
	}


}
