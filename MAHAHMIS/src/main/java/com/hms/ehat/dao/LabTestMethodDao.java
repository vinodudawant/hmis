package com.hms.ehat.dao;

import com.hms.ehat.dto.LabTestMethodDTO;

public interface LabTestMethodDao {
	
	public String saveTestMethod(LabTestMethodDTO dto);
	public LabTestMethodDTO fetchAllTestMethods(String searchText, String type);
	public LabTestMethodDTO editTestMethod(int testMethodId);
	public boolean deleteTestMethod(int testMethodId, int userId);

}
