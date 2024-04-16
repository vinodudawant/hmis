package com.hms.administrator.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dao.AdminGeneralVoucherDao;
import com.hms.administrator.service.AdminGeneralVoucherService;
import com.hms.administrator.dto.AdminGeneralVoucherDTO;

@Service
@Transactional
public class AdminGeneralVoucherServiceImpl implements
		AdminGeneralVoucherService {
	
	@Autowired
	AdminGeneralVoucherDao adminGeneralVoucherDao;

	@Override
	public int saveGeneralVoucher(AdminGeneralVoucherDTO voucher,
			HttpServletRequest request) {
		return adminGeneralVoucherDao.saveGeneralVoucher(voucher, request);
	}

	@Override
	public List<AdminGeneralVoucherDTO> getAllGeneralVoucher() {
		return adminGeneralVoucherDao.getAllGeneralVoucher();
	}

	@Override
	public AdminGeneralVoucherDTO editVoucherById(int voucherid,
			HttpServletRequest request) {
		return adminGeneralVoucherDao.editVoucherById(voucherid, request);
	}

	@Override
	public boolean deleteVoucherById(int voucherid, HttpServletRequest request) {
		return adminGeneralVoucherDao.deleteVoucherById(voucherid, request);
	}

	@Override
	public List<AdminGeneralVoucherDTO> searchVoucherByName(String name,
			HttpServletRequest request) {
		return adminGeneralVoucherDao.searchVoucherByName(name, request);
	}

}
