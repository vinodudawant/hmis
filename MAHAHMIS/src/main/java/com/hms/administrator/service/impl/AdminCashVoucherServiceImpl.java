package com.hms.administrator.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.Doctor;
import com.hms.administrator.dao.AdminCashVoucherDao;
import com.hms.administrator.dto.AdminCashVoucherDTO;
import com.hms.administrator.service.AdminCashVoucherService;

@Service
@Transactional
public class AdminCashVoucherServiceImpl implements AdminCashVoucherService {

	@Autowired
	AdminCashVoucherDao adminCashVoucherDao;
	
	@Override
	public int saveCashVoucher(String cashVoucher,
			HttpServletRequest request) {
		return adminCashVoucherDao.saveCashVoucher(cashVoucher, request);
	}

	@Override
	public List<Doctor> getAllAuthorisedDoctor() {
		return adminCashVoucherDao.getAllAuthorisedDoctor();
	}

	@Override
	public List<AdminCashVoucherDTO> getAllCashVoucher() {
		return adminCashVoucherDao.getAllCashVoucher();
	}

	@Override
	public List<AdminCashVoucherDTO> getAllCancelCashVoucher() {
		return adminCashVoucherDao.getAllCancelCashVoucher();
	}

	@Override
	public boolean cancelCashVoucher(int voucherId, HttpServletRequest request) {
		return adminCashVoucherDao.cancelCashVoucher(voucherId, request);
	}

	@Override
	public List<AdminCashVoucherDTO> searchVoucherBy(String name,
			HttpServletRequest request) {
		return adminCashVoucherDao.searchVoucherBy(name, request);
	}

	@Override
	public List<AdminCashVoucherDTO> fetchVoucherForPrint(int voucherID, HttpServletRequest request) {
		
		return adminCashVoucherDao.fetchVoucherForPrint(voucherID,request);
	}

}
