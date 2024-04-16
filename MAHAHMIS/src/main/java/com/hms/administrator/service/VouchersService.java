package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.AdminCashVoucherDTO;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.IPDReceiptVoucherDTO;
import com.hms.administrator.dto.IpdExpenceVoucher;
import com.hms.administrator.dto.LedgerHead;


public interface VouchersService {

	int saveRecieptVoucher(IPDReceiptVoucherDTO ipdReceiptVoucherDTO,
			String queryType, HttpServletRequest request);

	List<IPDReceiptVoucherDTO> viewReceiptVoucher(String callFrom);

	IPDReceiptVoucherDTO editRecVoucher(Integer receiptVoucherId);

	Integer deleteReceiptVoucher(String receiptVoucherIdLst,
			HttpServletRequest request);

	IPDReceiptVoucherDTO autoSuggRcptVchrCmnyNm(String letter);

	List<IpdExpenceVoucher> fetchExpenceVoucher(int voucherID,String pageName, HttpServletRequest request);

	int saveExpenseVoucher(String ipdExpenceVoucher, String queryType, HttpServletRequest request);


	public IpdExpenceVoucher EditExpenceVoucher(Integer idipdExpenceVoucher,
			HttpServletRequest request);
	
	Integer deleteExpenceVoucher(Integer idipdExpenceVoucher,
			HttpServletRequest request);

	List<LedgerHead> setLedgerHead(Integer idLedgerHead,
			HttpServletRequest request);

	List<IpdExpenceVoucher> printExpenceVoucher(int idipdm,
			HttpServletRequest request);
	List<ExpenseVoucherGroup> groupName();
	List<LedgerHead> ledgerHead(Integer id);

	String convertAmountinWords(Float str);
	
	public List<IPDReceiptVoucherDTO> fetchReceiptVoucherForPrint(int voucherID,HttpServletRequest request);
	
}
