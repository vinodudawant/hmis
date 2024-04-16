package com.hms.ipdbill.dto;

import java.util.List;

import javax.persistence.Transient;

public class AutosuggestionIpdQueueDto {

	private Integer patient_id;
	
	private Integer treatment_id;
	
	private String patient_name;
	
	private Integer department_id;
	
	private String opdipdno;
	
	private Integer unit_id;
	
	private String t_flag;
	
	private String mrnno;
	
	private String mobile;
	
	private String center_patient_id;
	
	private String specialityId;
	
	private String speciality_id;
	
	private String deleted;
	
	@Transient
	private List<AutosuggestionIpdQueueDto> lstIpdQueue;

	public Integer getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	

	public String getSpeciality_id() {
		return speciality_id;
	}

	public void setSpeciality_id(String speciality_id) {
		this.speciality_id = speciality_id;
	}

	public String getPatient_name() {
		return patient_name;
	}

	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}

	

	public Integer getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(Integer department_id) {
		this.department_id = department_id;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public Integer getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}

	public String getT_flag() {
		return t_flag;
	}

	public void setT_flag(String t_flag) {
		this.t_flag = t_flag;
	}

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getCenter_patient_id() {
		return center_patient_id;
	}

	public void setCenter_patient_id(String center_patient_id) {
		this.center_patient_id = center_patient_id;
	}

	

	public String getSpecialityId() {
		return specialityId;
	}

	public void setSpecialityId(String specialityId) {
		this.specialityId = specialityId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public List<AutosuggestionIpdQueueDto> getLstIpdQueue() {
		return lstIpdQueue;
	}

	public void setLstIpdQueue(List<AutosuggestionIpdQueueDto> lstIpdQueue) {
		this.lstIpdQueue = lstIpdQueue;
	}

	
	
	
}
