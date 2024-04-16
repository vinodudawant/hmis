/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This is all methods use in this unit master
 ******************************************************************************/
package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.UnitMasterDto;

public interface UnitDao {

	int saveOrUpdateUnit(UnitMasterDto unitMaster);

	List<UnitMasterDto> getUnit();

	boolean deleteUnit(Integer UnitId , Integer userId);

	List<UnitMasterDto> getAutoSuggestionUnitNames(String letter);

	List<UnitMasterDto> getUnitById(Integer unitId);

	List<UnitMasterDto> getAllUnit();
 	List<UnitMasterDto> getAllUnitwithDeleted();
	
	Long getUnitCount();
	
	List<UnitMasterDto> unitMasterListlogin(String ulogin);
	
	List<UnitMasterDto> getAllUnitByUserAccess(int userId); //Added by Sagar
	Long getCountOfActiveUnit();
	List<UnitMasterDto> getAllUnitListMaster();	
	
}
