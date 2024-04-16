package com.hms.administrator.dao;

import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.LedgerHead;
import com.hms.administrator.dto.district_taluka_city;

public interface MastersDao {

	public Integer getNextId(String callFrom);
	public String saveVoucherMaster(ExpenseVoucherGroup dto);
	public ExpenseVoucherGroup getAllVouchers(String callFrom);
	public ExpenseVoucherGroup editVoucher(Integer voucherId);
	public boolean deleteVoucher(Integer voucherId, Integer userId);
	public ExpenseVoucherGroup searchVoucher(String searchText, String callFrom);
	
	public String saveLedgerHead(LedgerHead dto, Integer voucherId);
	public LedgerHead getAllLedgerHeads(String searchText, String callFrom);
	public LedgerHead editLedgerHead(Integer ledgerHeadId);
	public boolean deleteLedgerHead(Integer ledgerHeadId, Integer userId);
	
	public String saveReasonOfVisit(district_taluka_city dto, Integer moduleId);
	public district_taluka_city getAllReasons(String searchText, String callFrom);
	public district_taluka_city editReasons(Integer reasonId);
	public boolean deleteReasons(Integer reasonId, Integer userId);
	public String fetchTitleGender(String title);
}
