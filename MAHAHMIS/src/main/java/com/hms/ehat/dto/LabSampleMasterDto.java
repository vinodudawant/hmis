package com.hms.ehat.dto;

import java.util.List;

public class LabSampleMasterDto {

	String SampleID;
	String PatientName,RegnDateTime;
	Integer VisitNo;
	List<Tests> Tests;
	
	
	public String getSampleID() {
		return SampleID;
	}
	public void setSampleID(String sampleID) {
		SampleID = sampleID;
	}
	public String getPatientName() {
		return PatientName;
	}
	public void setPatientName(String patientName) {
		PatientName = patientName;
	}
	
	public Integer getVisitNo() {
		return VisitNo;
	}
	public void setVisitNo(Integer visitNo) {
		VisitNo = visitNo;
	}
	public String getRegnDateTime() {
		return RegnDateTime;
	}
	public void setRegnDateTime(String regnDateTime) {
		RegnDateTime = regnDateTime;
	}
	public List<Tests> getTests() {
		return Tests;
	}
	public void setTests(List<Tests> tests) {
		Tests = tests;
	}	
}
