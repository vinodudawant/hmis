package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import com.hms.ehat.dto.DeptMasterDto;

public interface DeptService {
	
	/** @Sagar 16_May_2017 
	 * declared Methods for Department Master 
	 * ***/
	int saveOrUpdateDept(DeptMasterDto deptMaster,HttpServletRequest request);
	List<DeptMasterDto> getDept();
	boolean deleteDept(Integer unitId,HttpServletRequest request);
	List<DeptMasterDto> getDeptById(Integer unitId);
	List<DeptMasterDto> getAllDeptLst(HttpServletRequest request);
	DeptMasterDto getAutoSuggestionDeptNames(String letter);
	List<DeptMasterDto> getAllDeptwithDeleted();
	Long getDeptCount();
	List<DeptMasterDto> getDeptMasterListAll(HttpServletRequest request);

}
