package com.hms.registration.dto;

import java.util.List;

public class SpecializationDto {

	int idhospital_Specialization;
	String specialization_name;
	int userId,unitId;
	String callFrom;
	List<SpecializationDto> lstSpecialization;
	
	public int getIdhospital_Specialization() {
		return idhospital_Specialization;
	}
	public void setIdhospital_Specialization(int idhospital_Specialization) {
		this.idhospital_Specialization = idhospital_Specialization;
	}
	public String getSpecialization_name() {
		return specialization_name;
	}
	public void setSpecialization_name(String specialization_name) {
		this.specialization_name = specialization_name;
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
	public List<SpecializationDto> getLstSpecialization() {
		return lstSpecialization;
	}
	public void setLstSpecialization(List<SpecializationDto> lstSpecialization) {
		this.lstSpecialization = lstSpecialization;
	}
}
