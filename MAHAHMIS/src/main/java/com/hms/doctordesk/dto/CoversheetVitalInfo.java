package com.hms.doctordesk.dto;

import java.util.List;

public class CoversheetVitalInfo {

	 int patient_id;
	 
	 int treatment_id;
	 
	 String vital;
	 
	 String vital_value;
	 
	 String vital_date;
	 
	 String result;
	 
	 
	 List<CoversheetVitalInfo> lstCoversheetVitalInfo;


	public int getPatient_id() {
		return patient_id;
	}


	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}


	public int getTreatment_id() {
		return treatment_id;
	}


	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}


	public String getVital() {
		return vital;
	}


	public void setVital(String vital) {
		this.vital = vital;
	}


	public String getVital_value() {
		return vital_value;
	}


	public void setVital_value(String vital_value) {
		this.vital_value = vital_value;
	}


	public String getVital_date() {
		return vital_date;
	}


	public void setVital_date(String vital_date) {
		this.vital_date = vital_date;
	}


	public String getResult() {
		return result;
	}


	public void setResult(String result) {
		this.result = result;
	}


	public List<CoversheetVitalInfo> getLstCoversheetVitalInfo() {
		return lstCoversheetVitalInfo;
	}


	public void setLstCoversheetVitalInfo(List<CoversheetVitalInfo> lstCoversheetVitalInfo) {
		this.lstCoversheetVitalInfo = lstCoversheetVitalInfo;
	}
	 
	 
	 
	
}
