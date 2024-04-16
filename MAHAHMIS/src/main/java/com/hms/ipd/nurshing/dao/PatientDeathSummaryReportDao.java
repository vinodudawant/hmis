package com.hms.ipd.nurshing.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ipd.nurshing.dto.PatientDeathSummaryReportDTO;

public interface PatientDeathSummaryReportDao {

	int savePatientDeathSummary(PatientDeathSummaryReportDTO pobj, HttpServletRequest request);
	
	List<PatientDeathSummaryReportDTO> getListOfDeathSummaryReportByTreatmentId(Integer treatmentId);


}
