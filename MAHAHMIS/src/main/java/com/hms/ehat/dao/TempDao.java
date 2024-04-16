/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 * @Code This is all methods use in this temp master
 ******************************************************************************/
package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.TempMasterDto;

public interface TempDao {

	int saveOrUpdateTemp(TempMasterDto tempMaster);

	List<TempMasterDto> getTemp();

	boolean deleteTemp(Integer TempId , Integer userId);

	List<TempMasterDto> getAutoSuggestionTempNames(String letter);

	List<TempMasterDto> getTempById(Integer tempId);

	List<TempMasterDto> getAllTemp();

	List<TempMasterDto> getAllTempwithDeleted();
	
	Long getTempCount();
	


	
}
