package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.PaymentModDto;

public interface PaymentModService {

	int saveOrUpdatePay(PaymentModDto payDto, HttpServletRequest request);

	List<PaymentModDto> getAllPayments();

	boolean deletePayMaster(Integer payId, HttpServletRequest request);

	List<PaymentModDto> getautoSuggestionPaymentMasterNames(String letter); 
	
	List<PaymentModDto> getPaymodeById(int payId);
}
