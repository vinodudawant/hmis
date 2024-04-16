package com.hms.administrator.service.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.VouchersDao;
import com.hms.administrator.dto.ExpenseVoucherGroup;
import com.hms.administrator.dto.IPDReceiptVoucherDTO;
import com.hms.administrator.dto.IpdExpenceVoucher;
import com.hms.administrator.dto.LedgerHead;
import com.hms.administrator.service.VouchersService;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.utility.EnglishNumberToWords;

@Service
public class VouchersServiceImpl implements VouchersService{

	@Autowired
	VouchersDao vouchersDao;

	@Override
	@Transactional
	public int saveRecieptVoucher(IPDReceiptVoucherDTO ipdReceiptVoucherDTO,
			String queryType, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current login user id
		Integer unitId =(Integer) session.getAttribute("uId");
		if (ipdReceiptVoucherDTO.getReceiptVoucherId() == 0) {
			
			ipdReceiptVoucherDTO.setInsertBy(userId);
			ipdReceiptVoucherDTO.setInsertDateTime(new Date(new java.util.Date().getTime()));
			ipdReceiptVoucherDTO.setVoucherStatus('N');
			ipdReceiptVoucherDTO.setUnitId(unitId);
		
		}else {
			
			ipdReceiptVoucherDTO.setUpdatedBy(userId);
			ipdReceiptVoucherDTO.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			ipdReceiptVoucherDTO.setVoucherStatus('N');
			ipdReceiptVoucherDTO.setUnitId(unitId);
		}
		
		return vouchersDao.saveRecieptVoucher(ipdReceiptVoucherDTO, queryType, request);
	}

	@Override
	@Transactional
	public List<IPDReceiptVoucherDTO> viewReceiptVoucher(String callFrom) {
		
		return vouchersDao.viewReceiptVoucher(callFrom);
	}

	@Override
	@Transactional
	public IPDReceiptVoucherDTO editRecVoucher(Integer receiptVoucherId) {
		
		return vouchersDao.editRecVoucher(receiptVoucherId);
	}

	@Override
	@Transactional
	public Integer deleteReceiptVoucher(String receiptVoucherIdLst,
			HttpServletRequest request) {
		return vouchersDao.deleteReceiptVoucher(receiptVoucherIdLst,request);
	}

	@Override
	@Transactional
	public IPDReceiptVoucherDTO autoSuggRcptVchrCmnyNm(String letter) {
		return  vouchersDao.autoSuggRcptVchrCmnyNm(letter);
	}

	@Override
	@Transactional
	public List<IpdExpenceVoucher> fetchExpenceVoucher(int voucherID, String pageName, HttpServletRequest request) {
		return  vouchersDao.fetchExpenceVoucher(voucherID,pageName,request);
	}
	
	@Override
	@Transactional
	public int saveExpenseVoucher(String ipdExpenceVoucher, String queryType, HttpServletRequest request) {
		
		
		
		return vouchersDao.saveExpenseVoucher(ipdExpenceVoucher, queryType, request);
	}

	@Override
	@Transactional
	public Integer deleteExpenceVoucher(Integer idipdExpenceVoucher,
			HttpServletRequest request) {
		return vouchersDao.deleteExpenceVoucher(idipdExpenceVoucher, request);
	}
	
	@Override
	@Transactional
	public IpdExpenceVoucher EditExpenceVoucher(Integer idipdExpenceVoucher,
			HttpServletRequest request) {
		return vouchersDao.EditExpenceVoucher(idipdExpenceVoucher, request);
	}
	

	@Override
	@Transactional
	public List<LedgerHead> setLedgerHead(Integer idLedgerHead,
			HttpServletRequest request) {
		
		return vouchersDao.setLedgerHead(idLedgerHead, request);
	}

	@Override
	@Transactional
	public List<IpdExpenceVoucher> printExpenceVoucher(int idipdm,
			HttpServletRequest request) {
		return  vouchersDao.printExpenceVoucher(idipdm,request);

	}
	@Transactional
	@Override
	public List<ExpenseVoucherGroup> groupName() {
		return vouchersDao.groupName();
	}
	@Transactional
	@Override
	public List<LedgerHead> ledgerHead(Integer id) {
		return vouchersDao.ledgerHead(id);
	}

	@Override
	@Transactional
	public String convertAmountinWords(Float amount) {
		String myString = "";
		try {
			if (amount != null) {
				long newAmt = Math.round(amount);
				myString = EnglishNumberToWords.convert(newAmt);
				myString = myString.toUpperCase();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return myString;
	}

	@Override
	@Transactional
	public List<IPDReceiptVoucherDTO> fetchReceiptVoucherForPrint(int voucherID, HttpServletRequest request) {
		return vouchersDao.fetchReceiptVoucherForPrint(voucherID,request);
	}
	
}
