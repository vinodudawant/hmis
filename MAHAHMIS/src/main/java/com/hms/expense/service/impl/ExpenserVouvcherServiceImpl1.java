package com.hms.expense.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dto.AdminCashVoucherDTO;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.LedgerHead;
import com.hms.dto.Doctor;
import com.hms.dto.GeneralVouchersDTO;
import com.hms.administrator.dto.IpdExpenceVoucher;

import com.hms.expense.dao.ExpenseVoucherDao1;
import com.hms.expense.service.ExpenseVoucherService1;

@Service
@Transactional
public class ExpenserVouvcherServiceImpl1 implements ExpenseVoucherService1{

	@Autowired
	ExpenseVoucherDao1 expenseVoucherDao;
	
	@Override
	public List<IpdExpenceVoucher> getIpdExpenseVoucher(
			HttpServletRequest request,String fromdate,String fromtime,String todate,
			String totime,String callfrom,int voucherId,int ledgerid,String referto,int autosuggestionuserid) {
		// TODO Auto-generated method stub
		return expenseVoucherDao.getExpenseRVoucher(request,fromdate,fromtime,todate,totime,callfrom,voucherId,ledgerid,referto,autosuggestionuserid);
	}

	@Override
	public List<ExpenseVoucherGroup> getVoucherList() {
		// TODO Auto-generated method stub
		return expenseVoucherDao.getVoucherList();
	}

	@Override
	public List<LedgerHead> getLedgerList(int id) {
		// TODO Auto-generated method stub
		return expenseVoucherDao.getLedgerList(id);
	}

	@Override
	public List<Doctor> getUserAutoSuggestion(String searchtext) {
		// TODO Auto-generated method stub
		return expenseVoucherDao.getUserAutoSuggestion(searchtext);
	}

	@Override
	public List<AdminCashVoucherDTO> getGeneralRVoucher(
			HttpServletRequest request, String fromdate, String fromtime,
			String todate, String totime, String callfrom, String voucherId,
			String ledgerName, int userid) {
		// TODO Auto-generated method stub
		return expenseVoucherDao.getGeneralRVoucher(request, fromdate, fromtime, todate, totime, callfrom, voucherId, ledgerName, userid);
	}

	
}