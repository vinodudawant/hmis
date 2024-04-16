package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.DeptMasterDto;

public interface DeptDao {

	
	/**
	 * @sagar 16_May_2017 declared Methods for Department Master
	 * ***/
	int saveOrUpdateDept(DeptMasterDto deptMaster);

	List<DeptMasterDto> getDept();

	boolean deleteDept(Integer unitId,Integer userId);

	List<DeptMasterDto> getDeptById(Integer unitId);

	DeptMasterDto getAutoSuggestionDeptNames(String letter);

	List<DeptMasterDto> getAllDeptwithDeleted();

	List<DeptMasterDto> getAllDeptLst();
	
	Long getDeptCount();

	List<DeptMasterDto> getAllDeptLstByUser(int userId);
	
}
