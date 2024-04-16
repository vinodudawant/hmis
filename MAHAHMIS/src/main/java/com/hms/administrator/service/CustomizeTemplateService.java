package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.CustomizeTemplate;

public interface CustomizeTemplateService {
	public int saveCustomizeTemplate(CustomizeTemplate cobj,HttpServletRequest request);

	public List<CustomizeTemplate> getTemplateListByType(String value,Integer unitId);
	
	public CustomizeTemplate getTemplateListByTemplateId(Integer id);
	
	public CustomizeTemplate getTemplateListByDepartmentId(Integer departmentid);


}
