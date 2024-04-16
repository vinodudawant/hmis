package com.hms.administrator.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.AdminGeneralVoucherDTO;

public interface AdminGeneralVoucherDao {
	
	int saveGeneralVoucher(AdminGeneralVoucherDTO voucher,HttpServletRequest request);
	
	public List<AdminGeneralVoucherDTO> getAllGeneralVoucher();
	
	public AdminGeneralVoucherDTO editVoucherById(int voucherid,HttpServletRequest request);
	
	public boolean deleteVoucherById(int voucherid,HttpServletRequest request);
	
	public List<AdminGeneralVoucherDTO> searchVoucherByName(String name,HttpServletRequest request);

}
