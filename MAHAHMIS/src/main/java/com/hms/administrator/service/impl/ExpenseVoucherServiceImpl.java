package com.hms.administrator.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.ExpenseVoucherDao;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.service.ExpenseVoucherService;

@Service
@Transactional
public class ExpenseVoucherServiceImpl implements ExpenseVoucherService {

	@Autowired
	ExpenseVoucherDao mastersDao;
	
	@Override
	public Integer getNextId(String callFrom) {
		return mastersDao.getNextId(callFrom);
	}

	@Override
	public String saveVoucherMaster(ExpenseVoucherGroup dto, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		dto.setCreatedBy(userId);
		dto.setUnitId(unitId);
		return mastersDao.saveVoucherMaster(dto);
	}

	@Override
	public ExpenseVoucherGroup getAllVouchers(String callFrom) {
		return mastersDao.getAllVouchers(callFrom);
	}
	
	public ExpenseVoucherGroup editVoucher(Integer voucherId) {
		return mastersDao.editVoucher(voucherId);
	}
	
	public boolean deleteVoucher(Integer voucherId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return mastersDao.deleteVoucher(voucherId, userId);
	}
	
	public ExpenseVoucherGroup searchVoucher(String searchText, String callFrom) {
		return mastersDao.searchVoucher(searchText, callFrom);
	}
}
