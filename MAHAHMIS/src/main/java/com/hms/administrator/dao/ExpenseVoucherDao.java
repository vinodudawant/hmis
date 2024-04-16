package com.hms.administrator.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.ExpenseVoucherGroup;

public interface ExpenseVoucherDao {

	public Integer getNextId(String callFrom);
	public String saveVoucherMaster(ExpenseVoucherGroup dto);
	public ExpenseVoucherGroup getAllVouchers(String callFrom);
	public ExpenseVoucherGroup editVoucher(Integer voucherId);
	public boolean deleteVoucher(Integer voucherId,Integer userId);
	public ExpenseVoucherGroup searchVoucher(String searchText, String callFrom);
}
