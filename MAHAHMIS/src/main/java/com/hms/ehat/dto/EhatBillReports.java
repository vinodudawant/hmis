package com.hms.ehat.dto;

import java.util.List;

public class EhatBillReports {

	String ipdno,patientName,doctorName,patientType,service_name;
	double charges;
	int servId,patient_id;
	List<Integer> lstServIds;
	List<String> lstServNames;
	List<EhatBillReports> lstBillrpt;
	


	public int getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}
	public String getService_name() {
		return service_name;
	}
	public void setService_name(String service_name) {
		this.service_name = service_name;
	}
	public String getIpdno() {
		return ipdno;
	}
	public void setIpdno(String ipdno) {
		this.ipdno = ipdno;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public String getPatientType() {
		return patientType;
	}
	public void setPatientType(String patientType) {
		this.patientType = patientType;
	}
	public double getCharges() {
		return charges;
	}
	public void setCharges(double charges) {
		this.charges = charges;
	}	
	public int getServId() {
		return servId;
	}
	public void setServId(int servId) {
		this.servId = servId;
	}
	public List<Integer> getLstServIds() {
		return lstServIds;
	}
	public void setLstServIds(List<Integer> lstServIds) {
		this.lstServIds = lstServIds;
	}	
	public List<String> getLstServNames() {
		return lstServNames;
	}
	public void setLstServNames(List<String> lstServNames) {
		this.lstServNames = lstServNames;
	}
	public List<EhatBillReports> getLstBillrpt() {
		return lstBillrpt;
	}
	public void setLstBillrpt(List<EhatBillReports> lstBillrpt) {
		this.lstBillrpt = lstBillrpt;
	}	
}
