package com.hms.doctordesk.dao;

import java.util.List;

import com.hms.dto.StandardAndPatientBMIDetailsDTO;

public interface GrowthChartDao {

	public List<StandardAndPatientBMIDetailsDTO> getGrowthChartDetailsLessThanFiveYears(String patientId);
	public List<StandardAndPatientBMIDetailsDTO> getGrowthChartDetailsGreaterThanFiveYears(String patientId);
}
