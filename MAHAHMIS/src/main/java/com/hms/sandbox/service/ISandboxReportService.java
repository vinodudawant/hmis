package com.hms.sandbox.service;

import javax.servlet.http.HttpServletRequest;

/******
 * @author   :Vishant Pawar
 * @Date     :10-12-2022
 * *****/
public interface ISandboxReportService {

	public String sendPrescriptionData(int patientId);
	
	public String sendDiagnosisData(int patientId);
	
	public String immunizationData(Integer patientId, HttpServletRequest request);
	
	public String wellnessReportData(Integer patientId);
	
	public String dischargeSummaryData(Integer patientId);
}
