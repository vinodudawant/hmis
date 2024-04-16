package com.hms.pathology.dao;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;

public interface LabInterfacingDao 
{
	
	public Object getTestDetailsFromSampleId(Integer sampleId);
	public boolean savemachinevalues(JSONArray jsonArray1);

}
