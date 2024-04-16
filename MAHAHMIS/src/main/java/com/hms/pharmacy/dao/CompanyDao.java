package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CompanyMaster;


public interface CompanyDao {
	Boolean saveOrUpdateCompany(CompanyMaster companyMaster);

	List<CompanyMaster> getCompanies();

	Boolean deleteCompany(Integer companyId);

	List<CompanyMaster> getAutoSuggestionCompanyNames(String letter);
	
	List<CompanyMaster> getCompanyById(Integer companyId);

	CompanyMaster getCompanyByIdForDate(Integer compId);

	List<CompanyMaster> getAllCompanies();
	
	List<CompanyMaster> getAllCompanieswithDeleted();
}
