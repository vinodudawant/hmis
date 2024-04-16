package com.hms.sandbox.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "abdm_data")
public class SandboxData {

	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private int id;

	@Column(name = "patient_name")
	private String patientName;

	@Column(name = "health_id")
	private String healthId;
	
	@Column(name = "health_id_number")
	private String healthIdNumber;

	@Column(name = "gender")
	private String gender;
	
	@Column(name = "dob")
	private String dob;

	@Column(name = "patient_data")
	private String patientData;

	
	
	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getHealthId() {
		return healthId;
	}

	public void setHealthId(String healthId) {
		this.healthId = healthId;
	}

	public String getHealthIdNumber() {
		return healthIdNumber;
	}

	public void setHealthIdNumber(String healthIdNumber) {
		this.healthIdNumber = healthIdNumber;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPatientData() {
		return patientData;
	}

	public void setPatientData(String patientData) {
		this.patientData = patientData;
	}

	@Override
	public String toString() {
		return "SandboxData [id=" + id + ", patientName=" + patientName + ", healthId=" + healthId + ", healthIdNumber="
				+ healthIdNumber + ", gender=" + gender + ", dob=" + dob + ", patientData=" + patientData + "]";
	}

	
	
}
