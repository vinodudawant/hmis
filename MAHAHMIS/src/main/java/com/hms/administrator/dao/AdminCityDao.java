package com.hms.administrator.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.AdminCityDTO;

public interface AdminCityDao {
	
int saveAdminCity(AdminCityDTO city,HttpServletRequest request);
	
	public List<AdminCityDTO> getAllCities();
	
	public AdminCityDTO editCityById(int city_id,HttpServletRequest request);
	
	public boolean deleteCityById(int city_id,HttpServletRequest request);
	
	public List<AdminCityDTO> searchCityByName(String name,HttpServletRequest request);

}
