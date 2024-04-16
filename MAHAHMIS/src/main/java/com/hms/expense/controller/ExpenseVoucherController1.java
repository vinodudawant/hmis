package com.hms.expense.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.AdminCashVoucherDTO;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.LedgerHead;
import com.hms.dto.Doctor;
import com.hms.dto.GeneralVouchersDTO;
import com.hms.administrator.dto.IpdExpenceVoucher;


import com.hms.expense.service.ExpenseVoucherService1;

@Controller
@RequestMapping("/expensreport")
public class ExpenseVoucherController1 {

	@Autowired
	ExpenseVoucherService1 expenseVoucherService;
	
	@RequestMapping(value="/expenselist",method=RequestMethod.POST)
	@ResponseBody
	public List<IpdExpenceVoucher> getExpenseList(HttpServletRequest request,@RequestParam("fromdate")String fromdate
			,@RequestParam("fromtime")String fromtime,@RequestParam("todate")String todate,
			@RequestParam("totime")String totime,@RequestParam("voucherId") Integer voucherId,@RequestParam("ledgerid") 
	        int ledgerid,@RequestParam("referto") String referto,
			@RequestParam("callfrom")String callfrom, @RequestParam("userid") int userId){
		List<IpdExpenceVoucher> list = expenseVoucherService.getIpdExpenseVoucher(request, fromdate, fromtime, todate, totime, callfrom, voucherId, ledgerid, referto, userId);
		return list;
	}
	
	@RequestMapping(value="/voucherlist",method=RequestMethod.POST)
	@ResponseBody
	public List<ExpenseVoucherGroup> getvoucherlistList(HttpServletRequest request){
		List<ExpenseVoucherGroup> list = expenseVoucherService.getVoucherList();
		return list;
	}

	@RequestMapping(value="/ledgerlistt",method=RequestMethod.POST)
	@ResponseBody
	public List<LedgerHead> getLedgetrList(@RequestParam("voucherid") int id){
		List<LedgerHead> list = expenseVoucherService.getLedgerList(id);
		return list;
	}
	@RequestMapping(value="/userautoSuggestion",method=RequestMethod.POST)
	@ResponseBody
	public List<Doctor> getUserList(@RequestParam("searchtext") String searchtext){
		List<Doctor> list = expenseVoucherService.getUserAutoSuggestion(searchtext);
		return list;
	}
	@RequestMapping(value="/generallist",method=RequestMethod.POST)
	@ResponseBody
	public List<AdminCashVoucherDTO> getGeneralList(HttpServletRequest request,@RequestParam("fromdate")String fromdate
			,@RequestParam("fromtime")String fromtime,@RequestParam("todate")String todate,
			@RequestParam("totime")String totime,@RequestParam("voucherId") String voucherId,@RequestParam("ledgername") 
	        String ledgername,@RequestParam("callfrom")String callfrom, @RequestParam("userid") int userId){
		List<AdminCashVoucherDTO> list = expenseVoucherService.getGeneralRVoucher(request, fromdate, fromtime, todate, totime, callfrom, voucherId, ledgername, userId);
		return list;
}
}