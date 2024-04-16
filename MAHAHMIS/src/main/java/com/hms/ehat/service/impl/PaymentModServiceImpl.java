package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.NarrationDao;
import com.hms.ehat.dao.PaymentModDao;
import com.hms.ehat.dto.PaymentModDto;
import com.hms.ehat.service.PaymentModService;

@Service
public class PaymentModServiceImpl implements PaymentModService{
	
	@Autowired
	PaymentModDao payDao;

	@Override
	@Transactional
	public int saveOrUpdatePay(PaymentModDto payDto, HttpServletRequest request) {
		if (payDto.getPayId() == 0) {
			payDto.setPayName(payDto.getPayName());
			 //payDto.setNarrCode(payDto.getNarrCode());
			//narrsMaster.setServId(narrsMaster.getServId());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			payDto.setCreatedBy(userId);
			//System.out.println("userid>>>>>" + userId);
			// HttpSession obj= chargesMaster.setCreatedBy();

			payDto.setCreatedBy(payDto.getCreatedBy());
			payDto.setDeleted("N");
			//tempMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			payDto.setCreatedBy(userId);
			
			payDto.setUpdatedBy(payDto.getUpdatedBy());
			payDto.setDeleted("N");
			payDto.setUpdatedBy(userId);
			
			payDto.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		
		if (payDao.saveOrUpdatePay(payDto)==1) 
		{
			if(payDto.getPayId() == 0)
			{
				return 1;
			}else{
				return 2;
			}
		} else 
		{
			return 0;
		}
	}

	
	
	@Override
	@Transactional
	public List<PaymentModDto> getAllPayments() {
		// TODO Auto-generated method stub
		return payDao.getAllPayments();
	}



	@Override
	@Transactional
	public boolean deletePayMaster(Integer payId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		payDao.deletePay(payId, userId);
		return true;
	}



	@Override
	@Transactional
	public List<PaymentModDto> getautoSuggestionPaymentMasterNames(String letter) 
	{
		return payDao.getautoSuggestionPaymentMasterNames(letter);
	}


	@Override
	@Transactional
	public List<PaymentModDto> getPaymodeById(int payId) {
		
		return payDao.getPaymodeById(payId);
	}

}
