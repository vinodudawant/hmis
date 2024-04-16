/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This is all methods use in this unit master
 ******************************************************************************/
package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.UnitMasterDto;


public interface UnitService {

	int saveOrUpdateUnit(UnitMasterDto unitMaster,HttpServletRequest request);

	List<UnitMasterDto> getUnit();

	boolean deleteUnit(Integer unitId,HttpServletRequest request);

	List<UnitMasterDto> getAutoSuggestionUnitNames(String letter);

	List<UnitMasterDto> getUnitById(Integer unitId);

	List<UnitMasterDto> getAllUnit1(HttpServletRequest request); //Added by Sagar 
	List<UnitMasterDto> getAllUnit();

	List<UnitMasterDto> getAllUnitwithDeleted();
	
	Long getUnitCount();

	List<UnitMasterDto> unitMasterListlogin(String ulogin);
	
	Long getCountOfActiveUnit();

	List<UnitMasterDto> getAllUnitListMaster();

}
