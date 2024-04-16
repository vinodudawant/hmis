package com.hms.patientsearch.entity;

public class PatientSearchDTO {
 
	int  searchType;
	
	String searchText;
	
	String callFrom;
	
	int treatmentId;
	
	int patientId;
	

	public int getSearchType() {
		return searchType;
	}

	public void setSearchType(int searchType) {
		this.searchType = searchType;
	}

	public String getSearchText() {
		return searchText;
	}

	public void setSearchText(String searchText) {
		this.searchText = searchText;
	}

	public String getCallFrom() {
		return callFrom;
	}

	public void setCallFrom(String callFrom) {
		this.callFrom = callFrom;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	@Override
	public String toString() {
		return "PatientSearchDTO [searchType=" + searchType + ", searchText=" + searchText + ", callFrom=" + callFrom
				+ ", treatmentId=" + treatmentId + ", patientId=" + patientId + "]";
	}

	
	

	
	
	
}
