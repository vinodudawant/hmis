package com.hms.doctordesk.service;

import java.util.List;

import com.hms.dto.StandardAndPatientBMIDetailsDTO;

public interface GrowthChartService {

	public List<StandardAndPatientBMIDetailsDTO> getGrowthChartDetails(String perform, String patientId);
}
