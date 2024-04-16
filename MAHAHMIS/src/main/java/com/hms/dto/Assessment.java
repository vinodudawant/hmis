package com.hms.dto;

import java.io.Serializable;
import java.util.List;

public class Assessment implements Serializable {
	
	private int diagno_master_id;
	private int diagno_slave_id;
	private int treatmentId;
	private int icd10_id;
	
	private String diagnosis;
	private String diagno_description;
	private String icd10_code;
	private String date;
	private String diagno_type;
	private String diagnosed_by;
	private String comment;
	
	private List<Assessment> assessmentList;
	
	//diagno_master_id, diagno_slave_id,treatmentId, icd10_id, diagnosis, diagno_description, icd10_code, date, diagno_type, diagnosed_by, comment 
		
	public int getDiagno_master_id() {
		return diagno_master_id;
	}
	public void setDiagno_master_id(int diagno_master_id) {
		this.diagno_master_id = diagno_master_id;
	}
	public int getDiagno_slave_id() {
		return diagno_slave_id;
	}
	public void setDiagno_slave_id(int diagno_slave_id) {
		this.diagno_slave_id = diagno_slave_id;
	}
	public int getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	public int getIcd10_id() {
		return icd10_id;
	}
	public void setIcd10_id(int icd10_id) {
		this.icd10_id = icd10_id;
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
	public String getDiagnosed_by() {
		return diagnosed_by;
	}
	public void setDiagnosed_by(String diagnosed_by) {
		this.diagnosed_by = diagnosed_by;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public List<Assessment> getAssessmentList() {
		return assessmentList;
	}
	public void setAssessmentList(List<Assessment> assessmentList) {
		this.assessmentList = assessmentList;
	}

	
}
