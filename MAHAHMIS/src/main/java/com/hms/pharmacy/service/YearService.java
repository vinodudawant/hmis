package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.FinancialYearMaster;

public interface YearService {
	Boolean saveOrUpdateYear(FinancialYearMaster financialYearMaster);

	List<FinancialYearMaster> getYear();

	Boolean deleteYear(Integer yearId);

	List<FinancialYearMaster> getAutoSuggestionYear(String letter);

	List<FinancialYearMaster> getYearById(Integer yearId);
}
