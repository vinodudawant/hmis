package com.hms.rostermanagement.dto;

import java.util.List;

public class SchedularExistingPatientDTO {

	  int patient_id;
	  String patient_name;
	  String  mobile;
	  
	  List<SchedularExistingPatientDTO> getSchedularExistingPatientDTOList;

	public int getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}

	public String getPatient_name() {
		return patient_name;
	}

	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public List<SchedularExistingPatientDTO> getGetSchedularExistingPatientDTOList() {
		return getSchedularExistingPatientDTOList;
	}

	public void setGetSchedularExistingPatientDTOList(
			List<SchedularExistingPatientDTO> getSchedularExistingPatientDTOList) {
		this.getSchedularExistingPatientDTOList = getSchedularExistingPatientDTOList;
	}

	
	  
	  
	
}
