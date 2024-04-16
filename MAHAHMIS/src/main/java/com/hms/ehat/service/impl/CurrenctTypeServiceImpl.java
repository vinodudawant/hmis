package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.CurrenctTypeDao;
import com.hms.ehat.dao.PaymentModDao;
import com.hms.ehat.dto.CurrencyTypeDto;
import com.hms.ehat.service.CurrencyTypeService;

@Service
public class CurrenctTypeServiceImpl implements CurrencyTypeService{
	
	@Autowired
	CurrenctTypeDao currDao;
	
	@Override
	@Transactional
	public int saveOrUpdateCurrencyMaster(CurrencyTypeDto currDto,
			HttpServletRequest request) {
		if (currDto.getCurrencyId() == 0) {
			//payDto.setPayName(payDto.getPayName());
			 //payDto.setNarrCode(payDto.getNarrCode());
			//narrsMaster.setServId(narrsMaster.getServId());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			currDto.setCreatedBy(userId);
			//System.out.println("userid>>>>>" + userId);
			// HttpSession obj= chargesMaster.setCreatedBy();

			currDto.setCreatedBy(currDto.getCreatedBy());
			currDto.setDeleted("N");
			//tempMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			currDto.setCreatedBy(userId);
			
			currDto.setUpdatedBy(currDto.getUpdatedBy());
			currDto.setDeleted("N");
			currDto.setUpdatedBy(userId);
			
			currDto.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		
		if (currDao.saveOrUpdateCurrencyMaster(currDto)==1) 
		{
			if(currDto.getCurrencyId() == 0)
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
	public List<CurrencyTypeDto> getAllCurrencyList() {
		// TODO Auto-generated method stub
		return currDao.getAllCurrencyList();
	}


	@Override
	@Transactional
	public boolean deleteCurrMaster(Integer currencyId,
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		return currDao.deleteCurrMaster(currencyId, userId);
		//return true;
	}


	@Override
	@Transactional
	public List<CurrencyTypeDto> getautoSuggestionCurrencyMasterNames(
			String letter) {
		return currDao.getautoSuggestionCurrencyMasterNames(letter);
		}


	@Override
	@Transactional
	public List<CurrencyTypeDto> getOneCurrencyList() {
		// TODO Auto-generated method stub
		return currDao.getOneCurrencyList();
	}


	@Override
	@Transactional
	public String getOneCurrencyListForSymbol() {
		// TODO Auto-generated method stub
		return currDao.getOneCurrencyListForSymbol();
	}

}
