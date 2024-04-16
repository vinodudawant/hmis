package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestParam;

import com.hms.administrator.dto.AdminStateDTO;


public interface AdminStateService {
	
	int saveAdminState(AdminStateDTO state,	HttpServletRequest request);
	
	public List<AdminStateDTO> getAllState();
	
	public AdminStateDTO editStateById(int state_id,HttpServletRequest request);
	
	public boolean deleteStateById(int state_id,HttpServletRequest request);
	
	public List<AdminStateDTO> searchSateByName(String name,HttpServletRequest request);

}
