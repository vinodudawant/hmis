package com.hms.bmw.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.bmw.dao.StatusDao;
import com.hms.bmw.dto.BmwStatusDto;
import com.hms.bmw.service.StatusService;
@Service
@Transactional
public class StatusServiceImpl implements StatusService{

	@Autowired 
	StatusDao statusDao;
	@Override
	public int savebmwStatusMaster(BmwStatusDto bmwStatusDto, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return statusDao.savebmwStatusMaster(bmwStatusDto,request);
	}
	@Override
	public List<BmwStatusDto> getstatustypes(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return statusDao.getstatustypes(request);
	}
	@Override
	public BmwStatusDto editBmwStatus(Integer statusID) {
		// TODO Auto-generated method stub
		return statusDao.editBmwStatus(statusID);
	}
	@Override
	public boolean deleteBmwStatus(Integer statusID, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return statusDao.deleteBmwStatus(statusID, request);
	}

}
