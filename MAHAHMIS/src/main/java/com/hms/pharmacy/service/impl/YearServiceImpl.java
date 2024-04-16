package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.YearDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.FinancialYearMaster;
import com.hms.pharmacy.service.YearService;

@Service
public class YearServiceImpl implements YearService {

	@Autowired
	YearDao yearDao;

	@Override
	@Transactional
	public List<FinancialYearMaster> getYear() {
		// TODO Auto-generated method stub
		return yearDao.getYear();
	}

	@Override
	@Transactional
	public Boolean saveOrUpdateYear(FinancialYearMaster financialYearMaster) {
		// TODO Auto-generated method stub
		
		if(financialYearMaster.getYearId()==null)
		{
			financialYearMaster.setYearDeleteFlag(0);

			financialYearMaster.setYearAddDate(new Date(new java.util.Date()
					.getTime()));
			financialYearMaster.setYearUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
			FinancialYearMaster yearMaster2= yearDao.getYearByIdForDate(financialYearMaster.getYearId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			financialYearMaster.setYearAddDate(yearMaster2.getYearAddDate());
			financialYearMaster.setYearDeleteFlag(0);

			financialYearMaster.setYearUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
							
		
		return yearDao.saveOrUpdateYear(financialYearMaster);
	}

	@Override
	@Transactional
	public Boolean deleteYear(Integer yearId) {
		// TODO Auto-generated method stub
		return yearDao.deleteYear(yearId);
	}

	@Override
	@Transactional
	public List<FinancialYearMaster> getAutoSuggestionYear(String letter) {
		// TODO Auto-generated method stub
		return yearDao.getAutoSuggestionYear(letter);
	}

	@Override
	@Transactional
	public List<FinancialYearMaster> getYearById(Integer yearId) {
		// TODO Auto-generated method stub
		return yearDao.getYearById(yearId);
	}
}
