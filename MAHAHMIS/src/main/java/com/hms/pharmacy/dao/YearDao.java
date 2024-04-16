package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.FinancialYearMaster;

public interface YearDao {
	Boolean saveOrUpdateYear(FinancialYearMaster financialYearMaster);

	List<FinancialYearMaster> getYear();

	Boolean deleteYear(Integer yearId);

	List<FinancialYearMaster> getAutoSuggestionYear(String letter);

	List<FinancialYearMaster> getYearById(Integer yearId);
	
	FinancialYearMaster getYearByIdForDate(Integer yearId);
}
