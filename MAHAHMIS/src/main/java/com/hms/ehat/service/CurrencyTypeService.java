package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.CurrencyTypeDto;

public interface CurrencyTypeService {

	int saveOrUpdateCurrencyMaster(CurrencyTypeDto currDto,
			HttpServletRequest request);

	List<CurrencyTypeDto> getAllCurrencyList();

	boolean deleteCurrMaster(Integer currencyId, HttpServletRequest request);

	List<CurrencyTypeDto> getautoSuggestionCurrencyMasterNames(String letter);
	
	List<CurrencyTypeDto> getOneCurrencyList();

	String getOneCurrencyListForSymbol();

}
