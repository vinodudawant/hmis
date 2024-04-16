package com.hms.ot.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "patient_daignosis_slave")
public class PatientDaignosisSlave implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "patient_daignosis_masterId")
	private int patient_daignosis_masterId;
	
	@Column(name = "diagnosis")
	private String diagnosis;
	
	@Column(name = "diagno_Description")
	private String diagno_description;
	
	@Column(name = "icd10_Code")
	private String icd10_code;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "diagnosis_Type")
	private String diagno_type;
	
	@Column(name = "comment")
	private String comment;
	
	@Column(name = "daignosis_Id")
	private int daignosis_Id;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "diagnosed_By")
	private String diagnosed_by;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPatient_daignosis_masterId() {
		return patient_daignosis_masterId;
	}

	public void setPatient_daignosis_masterId(int patient_daignosis_masterId) {
		this.patient_daignosis_masterId = patient_daignosis_masterId;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public String getDiagno_description() {
		return diagno_description;
	}

	public void setDiagno_description(String diagno_description) {
		this.diagno_description = diagno_description;
	}

	public String getIcd10_code() {
		return icd10_code;
	}

	public void setIcd10_code(String icd10_code) {
		this.icd10_code = icd10_code;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getDiagno_type() {
		return diagno_type;
	}

	public void setDiagno_type(String diagno_type) {
		this.diagno_type = diagno_type;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getDaignosis_Id() {
		return daignosis_Id;
	}

	public void setDaignosis_Id(int daignosis_Id) {
		this.daignosis_Id = daignosis_Id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDiagnosed_by() {
		return diagnosed_by;
	}

	public void setDiagnosed_by(String diagnosed_by) {
		this.diagnosed_by = diagnosed_by;
	}
	
	
}
