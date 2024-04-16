package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.TaxDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.service.TaxService;

@Service
public class TaxServiceImpl implements TaxService 
{
	@Autowired
	TaxDao taxDao;
	
	@Override
	@Transactional
	public List<TaxMaster> getTax() 
	{
		return taxDao.getTax();
	}

	@Override
	@Transactional
	public boolean saveTax(TaxMaster taxMaster) 
	{
		
		if(taxMaster.getTaxId()==null)
		{
			taxMaster.setTaxDeleteFlag(0);
			taxMaster.setTaxAddDate(new Date(new java.util.Date()
					.getTime()));
			taxMaster.setTaxUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
			TaxMaster taxMaster2= taxDao.getTaxByIdForDate(taxMaster.getTaxId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			taxMaster.setTaxAddDate(taxMaster2.getTaxAddDate());
			taxMaster.setTaxDeleteFlag(0);
			taxMaster.setTaxUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		if (taxDao.saveTax(taxMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteTax(Integer taxId) 
	{
		return taxDao.deleteTax(taxId);
	}

	@Override
	@Transactional
	public List<TaxMaster> getAutoSuggestionTaxName(String letter) 
	{
		return taxDao.getAutoSuggestionTaxName(letter);
	}

	@Override
	@Transactional
	public List<TaxMaster> getTaxById(Integer taxId) 
	{
		return taxDao.getTaxById(taxId);
	}

	@Override
	@Transactional
	public List<TaxMaster> getAllTaxDetails() {
		return taxDao.getAllTaxDetails();
	}

	@Override
	@Transactional
	public List<TaxMaster> getgstList() {
		
		return taxDao.getgstList();
	}

	
}
