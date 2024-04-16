package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.PaymentModDto;

public interface PaymentModDao {

	int saveOrUpdatePay(PaymentModDto payDto);

	List<PaymentModDto> getAllPayments();

	boolean deletePay(Integer payId, Integer userId);

	List<PaymentModDto> getautoSuggestionPaymentMasterNames(String letter); 
		
	List<PaymentModDto> getPaymodeById(int payId);
}
