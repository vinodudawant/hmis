package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.CurrencyTypeDto;

public interface CurrenctTypeDao {

	int saveOrUpdateCurrencyMaster(CurrencyTypeDto currDto);

	List<CurrencyTypeDto> getAllCurrencyList();

	boolean deleteCurrMaster(Integer currencyId, Integer userId);

	List<CurrencyTypeDto> getautoSuggestionCurrencyMasterNames(String letter);

	List<CurrencyTypeDto> getOneCurrencyList();

	String getOneCurrencyListForSymbol();

}
