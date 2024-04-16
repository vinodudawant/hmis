package com.hms.doctordesk.dto;

import java.util.List;

public class OPDConstultantDoctorDto {
	
	String  doctor_id;
	
	String doctor_name;
	String specialisation;
	String department;
	String app_date;
	
	List<OPDConstultantDoctorDto> lstOPDDoctorConsultantlist;

	public String getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(String doctor_id) {
		this.doctor_id = doctor_id;
	}

	public String getDoctor_name() {
		return doctor_name;
	}

	public void setDoctor_name(String doctor_name) {
		this.doctor_name = doctor_name;
	}

	public String getSpecialisation() {
		return specialisation;
	}

	public void setSpecialisation(String specialisation) {
		this.specialisation = specialisation;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getApp_date() {
		return app_date;
	}

	public void setApp_date(String app_date) {
		this.app_date = app_date;
	}

	public List<OPDConstultantDoctorDto> getLstOPDDoctorConsultantlist() {
		return lstOPDDoctorConsultantlist;
	}

	public void setLstOPDDoctorConsultantlist(List<OPDConstultantDoctorDto> lstOPDDoctorConsultantlist) {
		this.lstOPDDoctorConsultantlist = lstOPDDoctorConsultantlist;
	}

	
	
	
	
	
	
	
	

}
