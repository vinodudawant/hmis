package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.AdminDistrictDTO;

public interface AdminDistrictService {

	int saveAdminDistrict(AdminDistrictDTO district ,HttpServletRequest request);
	
	public List<AdminDistrictDTO> getAllDistrict();
	
	public AdminDistrictDTO editDistrictById(int district_id,HttpServletRequest request);
	
	public boolean deleteDistrictById(int district_id,HttpServletRequest request);
	
	public List<AdminDistrictDTO> getAllDistrictListByStateId(int stateId,HttpServletRequest request);
	
	public List<AdminDistrictDTO> searchDistrictByName(String name,HttpServletRequest request);
}
