/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This is all methods use in this unit master
 ******************************************************************************/
package com.hms.ehat.dao;

import java.util.List;

import com.hms.administrator.dto.processMasterDto;

//import com.hms.ehat.dto.UnitMasterDto;

public interface processDao {

	int saveOrUpdateProcess(processMasterDto processMaster);
	List<processMasterDto> getAllprocess();
	boolean deleteProcess(Integer processId , Integer userId);
	List<processMasterDto> getAutoSuggestionPNames(String letter);

	/*List<UnitMasterDto> getUnit();

	

	List<UnitMasterDto> getAutoSuggestionUnitNames(String letter);

	List<UnitMasterDto> getUnitById(Integer unitId);

	
 	List<UnitMasterDto> getAllUnitwithDeleted();
	
	Long getUnitCount();
	
	List<UnitMasterDto> unitMasterListlogin(String ulogin);
	
	List<UnitMasterDto> getAllUnitByUserAccess(int userId); //Added by Sagar
*/
	
	
}
