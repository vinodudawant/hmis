package com.hms.ehat.dao;

import com.hms.pathology.dto.LabTestSampleDTO;

public interface LabTestSampleDao {

	public String saveTestSample(LabTestSampleDTO dto);
	public LabTestSampleDTO fetchAllTestSamples(String searchText, String type);
	public LabTestSampleDTO editTestSample(int testSampleId);
	public boolean deleteTestSample(int testSampleId, int userId);
	
}
