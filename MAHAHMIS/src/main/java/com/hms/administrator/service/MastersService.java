package com.hms.administrator.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.LedgerHead;
import com.hms.administrator.dto.district_taluka_city;

public interface MastersService {

	public Integer getNextId(String callFrom);
	public String saveVoucherMaster(ExpenseVoucherGroup dto, HttpServletRequest request);
	public ExpenseVoucherGroup getAllVouchers(String callFrom);
	public ExpenseVoucherGroup editVoucher(Integer voucherId);
	public boolean deleteVoucher(Integer voucherId, HttpServletRequest request);
	public ExpenseVoucherGroup searchVoucher(String searchText, String callFrom);
	
	public String saveLedgerHead(LedgerHead dto, Integer voucherId, HttpServletRequest request);
	public LedgerHead getAllLedgerHeads(String searchText, String callFrom);
	public LedgerHead editLedgerHead(Integer ledgerHeadId);
	public boolean deleteLedgerHead(Integer ledgerHeadId, HttpServletRequest request);
	
	public String saveReasonOfVisit(district_taluka_city dto, Integer moduleId, HttpServletRequest request);
	public district_taluka_city getAllReasons(String searchText, String callFrom);
	public district_taluka_city editReason(Integer reasonId);
	public boolean deleteReason(Integer reasonId, HttpServletRequest request);
	public String fetchTitleGender(String title);
}
