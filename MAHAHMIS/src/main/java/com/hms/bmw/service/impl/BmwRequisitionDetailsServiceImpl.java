package com.hms.bmw.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.bmw.dao.BmwRequisitionDetailsDao;
import com.hms.bmw.dto.BmwRequisitionCountDto;
import com.hms.bmw.dto.BmwRequisitionDetails;
import com.hms.bmw.service.BmwRequisitionDetailsService;
import com.hms.dto.Users;
@Service
@Transactional
public class BmwRequisitionDetailsServiceImpl implements BmwRequisitionDetailsService {

	
	@Autowired 
	BmwRequisitionDetailsDao bmwRequisitionDetailsDao;
	
	@Override
	public int saveBmwRequisitionDetailsMaster(BmwRequisitionDetails bmwRequisitionDetails,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.saveBmwRequisitionDetailsMaster(bmwRequisitionDetails,request);
	}

	@Override
	public List<BmwRequisitionDetails> getBmwRequisitionDetailsMaster(String status,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.getBmwRequisitionDetailsMaster(status,request);
	}

	@Override
	public BmwRequisitionDetails editBmwRequisitionDetailsMaster(Integer bmwUserId) {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.editBmwRequisitionDetailsMaster(bmwUserId);
	}

	@Override
	public boolean deleteBmwRequisitionDetailsMaster(Integer bmwUserId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return bmwRequisitionDetailsDao.deleteBmwRequisitionDetailsMaster(bmwUserId,userId,request);
		// TODO Auto-generated method stub

	}
	
	@Override
	public List<Users> getNurse(Integer user_ID) {

		return bmwRequisitionDetailsDao.getNurse(user_ID);
	}

	@Override
	public Integer getNextAutoIncrement() {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.getNextAutoIncrement();
	}

	@Override
	public List<BmwRequisitionDetails> getfilterBmwRequisitionDetailsMaster(String fdate, String tdate, String department,
			String wardTypeSelect, String typeOfBag, String bag_Status) {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.getfilterBmwRequisitionDetailsMaster(fdate, tdate, department, wardTypeSelect, typeOfBag, bag_Status);
	}

	@Override
	public int approveBmwRequisition(String id, Integer userId) {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.approveBmwRequisition(id, userId);
	}

	@Override
	public List<Users> getBMWusers() {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.getBMWusers();
	}

	@Override
	public int assignBmwRequisition(String id, Integer userId) {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.assignBmwRequisition(id, userId) ;
	}

	@Override
	public int completeBmwRequisition(String id, Integer userId) {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.completeBmwRequisition(id, userId);
	}

	@Override
	public BmwRequisitionCountDto getBmwRequisitionCount(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.getBmwRequisitionCount(id, request);
	}

	@Override
	public List<BmwRequisitionDetails> getBmwBagWiseCount(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return bmwRequisitionDetailsDao.getBmwBagWiseCount( id, request);
	}
}
