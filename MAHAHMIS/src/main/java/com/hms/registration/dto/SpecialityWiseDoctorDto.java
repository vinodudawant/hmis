package com.hms.registration.dto;

import java.util.List;

public class SpecialityWiseDoctorDto {

	int doctor_id;
	String doc_name;
	int userId,unitId;
	String callFrom;
	List<SpecialityWiseDoctorDto> lstDoctorBySpecialization;
	
	public int getDoctor_id() {
		return doctor_id;
	}
	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}
	public String getDoc_name() {
		return doc_name;
	}
	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public String getCallFrom() {
		return callFrom;
	}
	public void setCallFrom(String callFrom) {
		this.callFrom = callFrom;
	}
	public List<SpecialityWiseDoctorDto> getLstDoctorBySpecialization() {
		return lstDoctorBySpecialization;
	}
	public void setLstDoctorBySpecialization(List<SpecialityWiseDoctorDto> lstDoctorBySpecialization) {
		this.lstDoctorBySpecialization = lstDoctorBySpecialization;
	}
}
