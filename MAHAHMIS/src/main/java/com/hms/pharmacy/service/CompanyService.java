package com.hms.pharmacy.service;
import java.util.List;

import com.hms.pharmacy.pojo.CompanyMaster;

public interface CompanyService 
{
	Boolean saveOrUpdateCompany(CompanyMaster companyMaster);

List<CompanyMaster> getCompanies();

Boolean deleteCompany(Integer companyId);

List<CompanyMaster> getAutoSuggestionCompanyNames(String letter);

List<CompanyMaster> getCompanyById(Integer companyId);

List<CompanyMaster> getAllCompanies();

List<CompanyMaster> getAllCompanieswithDeleted();

}
