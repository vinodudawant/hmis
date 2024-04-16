package com.hms.registration.dto;

import java.util.List;

public class RegistrationDataDto {

	int unitId,userId;
	String callFrom;
	List<PrefixDto> lstPrefix;
	List<SpecializationDto> lstSpecialization;
	List<SpecialityWiseDoctorDto> lstDoctorBySpecialization;
	
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getCallFrom() {
		return callFrom;
	}
	public void setCallFrom(String callFrom) {
		this.callFrom = callFrom;
	}
	public List<PrefixDto> getLstPrefix() {
		return lstPrefix;
	}
	public void setLstPrefix(List<PrefixDto> lstPrefix) {
		this.lstPrefix = lstPrefix;
	}
	public List<SpecializationDto> getLstSpecialization() {
		return lstSpecialization;
	}
	public void setLstSpecialization(List<SpecializationDto> lstSpecialization) {
		this.lstSpecialization = lstSpecialization;
	}
	public List<SpecialityWiseDoctorDto> getLstDoctorBySpecialization() {
		return lstDoctorBySpecialization;
	}
	public void setLstDoctorBySpecialization(List<SpecialityWiseDoctorDto> lstDoctorBySpecialization) {
		this.lstDoctorBySpecialization = lstDoctorBySpecialization;
	}	
}
