package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.Test;

public interface RadiologyTestGroupService {
	public int saveOrUpdateRadiologyTestGroup(Test robj,HttpServletRequest request);

	public List<Test> getAllRadiologyTestGroup(Integer unitId,HttpServletRequest request);

	public Test editRadiologyTestGroup(Integer groupId);

	public boolean deleteRadiologyTestGroup(Integer groupId, HttpServletRequest request);
	
	public List<Test> radiologyTestGroupAutoSuggestion(String groupName,Integer unitId);

}
