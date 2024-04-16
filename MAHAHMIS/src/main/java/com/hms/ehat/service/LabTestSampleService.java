package com.hms.ehat.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.pathology.dto.LabTestSampleDTO;

public interface LabTestSampleService {
	
	public String saveTestSample(LabTestSampleDTO dto, HttpServletRequest request);
	public LabTestSampleDTO getAllTestSamples(String searchText, String type);
	public LabTestSampleDTO editTestSample(int testSampleId);
	public boolean deleteTestSample(int testSampleId, HttpServletRequest request);

}
