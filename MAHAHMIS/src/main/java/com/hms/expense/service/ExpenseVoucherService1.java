package com.hms.expense.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.AdminCashVoucherDTO;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.LedgerHead;
import com.hms.dto.Doctor;
import com.hms.dto.GeneralVouchersDTO;
import com.hms.administrator.dto.IpdExpenceVoucher;


public interface ExpenseVoucherService1 {

	 List<IpdExpenceVoucher> getIpdExpenseVoucher(HttpServletRequest request,String fromdate,String fromtime,
			 String todate,String totome,String callfrom,int voucherId,int ledgerid,String referto,int autosuggestionuserid);
	 
	 List<ExpenseVoucherGroup> getVoucherList();

     List<LedgerHead> getLedgerList(int id);
     
     List<Doctor> getUserAutoSuggestion(String searchtext);
     
     List<AdminCashVoucherDTO> getGeneralRVoucher(HttpServletRequest request,String fromdate,String fromtime,
 			String todate,String totime,String callfrom,String voucherId,String ledgerName,int userid);
}
