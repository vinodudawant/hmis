package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.TaxMaster;

public interface TaxDao {

	List<TaxMaster> getTax();

	boolean saveTax(TaxMaster taxMaster);

	boolean deleteTax(Integer taxId);

	List<TaxMaster> getAutoSuggestionTaxName(String letter);

	List<TaxMaster> getTaxById(Integer taxId);
	
	TaxMaster getTaxByIdForDate(Integer taxId);
  
	List<TaxMaster> getAllTaxDetails();

	List<TaxMaster> getgstList();
}
