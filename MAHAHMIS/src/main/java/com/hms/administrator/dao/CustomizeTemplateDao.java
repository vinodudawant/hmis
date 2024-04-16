package com.hms.administrator.dao;

import java.util.List;


import com.hms.administrator.dto.CustomizeTemplate;

public interface CustomizeTemplateDao {
	public int saveCustomizeTemplate(CustomizeTemplate cobj);

	public List<CustomizeTemplate> getTemplateListByType(String value,Integer unitId);
	
	public CustomizeTemplate getTemplateListByTemplateId(Integer id);
	
	public CustomizeTemplate getTemplateListByDepartmentId(Integer departmentid);


}
