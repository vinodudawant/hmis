package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.CompanyDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.service.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService{

	@Autowired
	CompanyDao companyDao;

	@Override
	@Transactional
	public Boolean saveOrUpdateCompany(CompanyMaster companyMaster) {

		if(companyMaster.getCompId()==null)
		{
			companyMaster.setCompDeleteFlag(0);
			companyMaster.setCompAddDate(new Date(new java.util.Date()
					.getTime()));
			companyMaster.setCompUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
			CompanyMaster companyMaster2= companyDao.getCompanyByIdForDate(companyMaster.getCompId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			companyMaster.setCompAddDate(companyMaster2.getCompAddDate());
			companyMaster.setCompDeleteFlag(0);
			companyMaster.setCompUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		
		if (companyDao.saveOrUpdateCompany(companyMaster)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	@Transactional
	public List<CompanyMaster> getCompanies() {
		// TODO Auto-generated method stub
		return companyDao.getCompanies();
	}
	
	@Override
	@Transactional
	public Boolean deleteCompany(Integer compId) {
		// TODO Auto-generated method stub
		
		return companyDao.deleteCompany(compId);
	}
	
	@Override
	@Transactional
	public List<CompanyMaster> getAutoSuggestionCompanyNames(String letter) {
		// TODO Auto-generated method stub
		return companyDao.getAutoSuggestionCompanyNames(letter);
	}
	
	@Override
	@Transactional
	public List<CompanyMaster> getCompanyById(Integer compId) {
		// TODO Auto-generated method stub
		return companyDao.getCompanyById(compId);
	}

	@Override
	@Transactional
	public List<CompanyMaster> getAllCompanies() {
		// TODO Auto-generated method stub
		return companyDao.getAllCompanies();
	}
	@Override
	@Transactional
	public List<CompanyMaster> getAllCompanieswithDeleted() {
		// TODO Auto-generated method stub
		return companyDao.getAllCompanieswithDeleted();
	}
}
