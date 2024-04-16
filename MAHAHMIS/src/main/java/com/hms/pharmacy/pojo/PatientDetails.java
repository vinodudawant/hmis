package com.hms.pharmacy.pojo;

public class PatientDetails
{
	private String patientId;
	private String patientAdd;
	private String treatmentId;
	private String patientName;
	
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getPatientAdd() {
		return patientAdd;
	}
	public void setPatientAdd(String patientAdd) {
		this.patientAdd = patientAdd;
	}
	
}
