package com.hms.pharmacy.pojo;

public class PatientSaleBill
{
	private String patientName;
	private String patientAddress;
	private String patientMobileNumber;
	private String treatmentId;
	private String sponserName;
	private String ConsultantName;
	private String patientId;
	
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getConsultantName() {
		return ConsultantName;
	}
	public void setConsultantName(String consultantName) {
		ConsultantName = consultantName;
	}
	public String getSponserName() {
		return sponserName;
	}
	public void setSponserName(String sponserName) {
		this.sponserName = sponserName;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getPatientAddress() {
		return patientAddress;
	}
	public void setPatientAddress(String patientAddress) {
		this.patientAddress = patientAddress;
	}
	public String getPatientMobileNumber() {
		return patientMobileNumber;
	}
	public void setPatientMobileNumber(String patientMobileNumber) {
		this.patientMobileNumber = patientMobileNumber;
	}
	public String getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}
	
	
}
