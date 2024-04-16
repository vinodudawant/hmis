package com.hms.administrator.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dao.AdminCityDao;
import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.service.AdminCityService;

@Service
@Transactional
public class AdminCityServiceImpl implements AdminCityService {

	@Autowired
	AdminCityDao adminCityDao;
	
	@Override
	public int saveAdminCity(AdminCityDTO city, HttpServletRequest request) {
		return adminCityDao.saveAdminCity(city, request);
	}

	@Override
	public List<AdminCityDTO> getAllCities() {
		return adminCityDao.getAllCities();
	}

	@Override
	public AdminCityDTO editCityById(int city_id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return adminCityDao.editCityById(city_id, request);
	}

	@Override
	public boolean deleteCityById(int city_id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return adminCityDao.deleteCityById(city_id, request);
	}

	@Override
	public List<AdminCityDTO> searchCityByName(String name,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return adminCityDao.searchCityByName(name, request);
	}

}
