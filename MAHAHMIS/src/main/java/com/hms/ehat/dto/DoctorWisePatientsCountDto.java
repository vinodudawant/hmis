package com.hms.ehat.dto;

import java.util.List;

public class DoctorWisePatientsCountDto {

	int doctorId,patientCount;
	String docName;	
	List<DoctorWisePatientsCountDto> lstPatientCount;
	public int getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}
	public int getPatientCount() {
		return patientCount;
	}
	public void setPatientCount(int patientCount) {
		this.patientCount = patientCount;
	}
	public String getDocName() {
		return docName;
	}
	public void setDocName(String docName) {
		this.docName = docName;
	}
	public List<DoctorWisePatientsCountDto> getLstPatientCount() {
		return lstPatientCount;
	}
	public void setLstPatientCount(List<DoctorWisePatientsCountDto> lstPatientCount) {
		this.lstPatientCount = lstPatientCount;
	}	
}
