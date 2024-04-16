/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This is all methods use in this temp master
 ******************************************************************************/
package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.TempMasterDto;


public interface TempService {

	int saveOrUpdateTemp(TempMasterDto tempMaster,HttpServletRequest request);

	List<TempMasterDto> getTemp();

	boolean deleteTemp(Integer tempId,HttpServletRequest request);

	List<TempMasterDto> getAutoSuggestionTempNames(String letter);

	List<TempMasterDto> getTempById(Integer tempId);

	List<TempMasterDto> getAllTemp();

	List<TempMasterDto> getAllTempwithDeleted();
	
	Long getTempCount();


	

}
