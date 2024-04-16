package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.TaxMaster;

public interface TaxService {

	List<TaxMaster> getTax();

	boolean saveTax(TaxMaster taxMaster);

	boolean deleteTax(Integer taxId);

	List<TaxMaster> getAutoSuggestionTaxName(String letter);

	List<TaxMaster> getTaxById(Integer taxId);

	List<TaxMaster> getAllTaxDetails();

	List<TaxMaster> getgstList();

}
