package com.hms.administrator.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dao.AdminStateDao;
import com.hms.administrator.dto.AdminStateDTO;
import com.hms.administrator.service.AdminStateService;

@Service
@Transactional
public class AdminStateServiceImpl implements AdminStateService {

	@Autowired 
	AdminStateDao adminStateDao;
	
	@Override
	public int saveAdminState(AdminStateDTO state, HttpServletRequest request) {
		return adminStateDao.saveAdminState(state, request);
	}

	@Override
	public List<AdminStateDTO> getAllState() {
		return adminStateDao.getAllState();
	}

	@Override
	public AdminStateDTO editStateById(int state_id,HttpServletRequest request) {
		return adminStateDao.editStateById(state_id,request);
	}

	@Override
	public boolean deleteStateById(int state_id,HttpServletRequest request) {
		return adminStateDao.deleteStateById(state_id,request);
	}

	@Override
	public List<AdminStateDTO> searchSateByName(String name,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return adminStateDao.searchSateByName(name, request);
	}

}
