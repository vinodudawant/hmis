package com.hms.accessmanagement.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.accessmanagement.dao.NewUserAccessDao;
import com.hms.accessmanagement.service.NewUserAccessService;
import com.hms.dto.ModuleMasterDto;
import com.hms.dto.NewUserAccessDto;
@Service
@Transactional
public class NewUserAccessServiceImpl  implements NewUserAccessService{
	
	@Autowired
	NewUserAccessDao userAccessDao;
	
	@Override
	public ModuleMasterDto getModuleList() {
		
		return userAccessDao.getModuleList();
	}

	@Override
	public NewUserAccessDto getUserAccess(int moduleId) {
		// TODO Auto-generated method stub
		return userAccessDao.getUserAccessToPage(moduleId);
	}
}
