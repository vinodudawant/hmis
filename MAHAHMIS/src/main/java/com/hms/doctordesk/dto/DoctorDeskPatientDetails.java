package com.hms.doctordesk.dto;

import java.util.*;

import javax.persistence.Column;

public class DoctorDeskPatientDetails {

	
	private Integer treatmentId;
	
	private int departmentId;
	
	private String departmentName;
	
	private String tFlag;
	
	private Date createdDateTime;

	private Integer seropositiveFlag;
	
	private Integer emrHighrisk=0;
	
	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public Integer getSeropositiveFlag() {
		return seropositiveFlag;
	}

	public void setSeropositiveFlag(Integer seropositiveFlag) {
		this.seropositiveFlag = seropositiveFlag;
	}

	public Integer getEmrHighrisk() {
		return emrHighrisk;
	}

	public void setEmrHighrisk(Integer emrHighrisk) {
		this.emrHighrisk = emrHighrisk;
	}
		
	
}
