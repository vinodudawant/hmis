package com.hms.administrator.dao;

import java.util.List;

import com.hms.administrator.dto.Test;

public interface RadiologyTestGroupDao {
	public int saveOrUpdateRadiologyTestGroup(Test robj);

	public List<Test> getAllRadiologyTestGroup(Integer unitId);
	public Test editRadiologyTestGroup(Integer groupId);
	public boolean deleteRadiologyTestGroup(Test robj);
	public List<Test> radiologyTestGroupAutoSuggestion(String groupName,Integer unitId);


}
