package com.hms.pharmacy.dao;

import java.util.List;
import com.hms.pharmacy.pojo.UomMaster;
public interface UomDao
{
	Boolean saveOrUpdateUom(UomMaster uomMaster);

	List<UomMaster> getUoms();

	Boolean deleteUom(Integer uomId);

	List<UomMaster> getAutoSuggestionUomNames(String letter);

	List<UomMaster> getUomById(Integer uomId);
	
	UomMaster getUomByIdForDate(Integer uomId);

}
