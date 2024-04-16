package com.hms.pathology.service;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;


public interface LabInterfacingApiService {

	
	public Object getTestDetailsFromSampleId(Integer sampleId);
	
	public boolean savemachinevalues(JSONArray jsonArray1);
}
