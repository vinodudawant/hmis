package com.hms.administrator.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.Doctor;
import com.hms.administrator.dto.AdminCashVoucherDTO;

public interface AdminCashVoucherDao {

	int saveCashVoucher(String cashVoucherDTO,HttpServletRequest request);
	
	public List<Doctor> getAllAuthorisedDoctor();
	
	public List<AdminCashVoucherDTO> getAllCashVoucher();
	
	public List<AdminCashVoucherDTO> getAllCancelCashVoucher();
	
	public boolean cancelCashVoucher(int voucherId,HttpServletRequest request);
	
	public List<AdminCashVoucherDTO> searchVoucherBy(String name,HttpServletRequest request);
	
	public List<AdminCashVoucherDTO> fetchVoucherForPrint(int voucherID,HttpServletRequest request);
}
