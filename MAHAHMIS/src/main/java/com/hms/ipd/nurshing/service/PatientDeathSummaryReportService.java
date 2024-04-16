package com.hms.ipd.nurshing.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ipd.nurshing.dto.PatientDeathSummaryReportDTO;

public interface PatientDeathSummaryReportService {

	int savePatientDeathSummary(PatientDeathSummaryReportDTO pobj, HttpServletRequest request);

	List<PatientDeathSummaryReportDTO> getListOfDeathSummaryReportByTreatmentId(Integer treatmentId);
	


}
