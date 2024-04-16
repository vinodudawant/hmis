package com.hms.ipd.dto;

import java.io.Serializable;

@SuppressWarnings("serial")
public class DoctorListDTO implements Serializable{

	private Integer doctor_id;
	
	private String doc_name;
	
	private String speciality;

	public Integer getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(Integer doctor_id) {
		this.doctor_id = doctor_id;
	}

	public String getDoc_name() {
		return doc_name;
	}

	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	
	
	
}
