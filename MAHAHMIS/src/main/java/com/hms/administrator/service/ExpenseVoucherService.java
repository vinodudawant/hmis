package com.hms.administrator.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.ExpenseVoucherGroup;

public interface ExpenseVoucherService {

	public Integer getNextId(String callFrom);
	public String saveVoucherMaster(ExpenseVoucherGroup dto, HttpServletRequest request);
	public ExpenseVoucherGroup getAllVouchers(String callFrom);
	public ExpenseVoucherGroup editVoucher(Integer voucherId);
	public boolean deleteVoucher(Integer voucherId, HttpServletRequest request);
	public ExpenseVoucherGroup searchVoucher(String searchText, String callFrom);
}
