/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This is all methods use in this unit master
 ******************************************************************************/
package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.processMasterDto;


public interface processService {

	int saveOrUpdateProcess(processMasterDto processMaster,HttpServletRequest request);
	
	boolean deleteProcess(Integer unitId,HttpServletRequest request);
	
	List<processMasterDto> getAllProcess1(HttpServletRequest request); //Added by Sagar 
	List<processMasterDto> getAllProcess();

	List<processMasterDto> getAutoSuggestionPNames(String letter);
	

	/*List<UnitMasterDto> getUnit();

	

	List<UnitMasterDto> getAutoSuggestionUnitNames(String letter);

	List<UnitMasterDto> getUnitById(Integer unitId);

	

	List<UnitMasterDto> getAllUnitwithDeleted();
	
	Long getUnitCount();

	List<UnitMasterDto> unitMasterListlogin(String ulogin);
*/
	

}
