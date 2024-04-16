package com.hms.rostermanagement.dto;

import java.util.Date;
import java.util.List;

public class FollowUpResponseDTO {

	private Integer follow_up_id;
	
	private Integer doctor_id;
	

	private String doctor_name;
	
	
	private Integer patient_id;
	
	
	private String patient_name;
	
	private Date date;
	
	private List<FollowUpResponseDTO> lstFolloupPatientList;


	public Integer getDoctor_id() {
		return doctor_id;
	}


	public void setDoctor_id(Integer doctor_id) {
		this.doctor_id = doctor_id;
	}


	public String getDoctor_name() {
		return doctor_name;
	}


	public void setDoctor_name(String doctor_name) {
		this.doctor_name = doctor_name;
	}


	public Integer getPatient_id() {
		return patient_id;
	}


	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}


	public String getPatient_name() {
		return patient_name;
	}


	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}


	public List<FollowUpResponseDTO> getLstFolloupPatientList() {
		return lstFolloupPatientList;
	}


	public void setLstFolloupPatientList(List<FollowUpResponseDTO> lstFolloupPatientList) {
		this.lstFolloupPatientList = lstFolloupPatientList;
	}


	public Integer getFollow_up_id() {
		return follow_up_id;
	}


	public void setFollow_up_id(Integer follow_up_id) {
		this.follow_up_id = follow_up_id;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}
	
	
	
	
	


	
	
	
}
