package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.UomMaster;

public interface UomService 
{
	Boolean saveOrUpdateUom(UomMaster uomMaster);

	List<UomMaster> getUoms();

	Boolean deleteUom(Integer uomId);

	List<UomMaster> getAutoSuggestionUomNames(String letter);

	List<UomMaster> getUomById(Integer uomId);

}
