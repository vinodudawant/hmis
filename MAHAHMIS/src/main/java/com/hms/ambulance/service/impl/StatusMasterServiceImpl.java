package com.hms.ambulance.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ambulance.dao.StatusMasterDao;
import com.hms.ambulance.dto.StatusMasterDto;
import com.hms.ambulance.service.StatusMasterService;

@Service
@Transactional
public class StatusMasterServiceImpl implements StatusMasterService{
	
	@Autowired
	StatusMasterDao statusdao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveStatus(StatusMasterDto statusDto, HttpServletRequest request) {

		return statusdao.saveStatus(statusDto,request);
	}

	@Override
	public List<StatusMasterDto> getAllStatusMaster(HttpServletRequest request) {

		return statusdao.getAllStatusMaster(request);
	}

	@Override
	public StatusMasterDto editStatusMaster(Integer statusId) {
		// TODO Auto-generated method stub
		return statusdao.editStatusMaster(statusId);
	}

	@Override
	public boolean deleteStatusMaster(Integer statusId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return statusdao.deleteStatusMaster(statusId,request);
	}

}
