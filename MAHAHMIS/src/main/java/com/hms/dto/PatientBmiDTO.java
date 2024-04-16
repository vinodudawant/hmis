package com.hms.dto;



import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="patient_bmi_details")
@JsonIgnoreProperties(ignoreUnknown=true)

public class PatientBmiDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "patient_bmi_id")
	private int patient_bmi_id;
	
	@Column(name="patient_id")
	private int patient_id;
	
	@Column(name="patient_treat_id")
	private int patient_treat_id;
	
	@Column(name="patient_treat_count")
	private String patient_treat_count;
	
	@Column(name="patient_weight")
	private Double patient_weight;
	
	@Column(name="patient_height")
	private Double patient_height;
	
	@Column(name="patient_bmi")
	private Double patient_bmi;
	
	@Column(name="patient_bsa")
	private Double patient_bsa;
	
	@Column(name="patient_headcim")
	private Double patient_headcim;
	
	
	@Column(name="status",columnDefinition = "varchar(2) default 'Y'")
	private String status="Y";
	
	@Column(name="patient_bmi_date")
	private String date;
	
	@Column(name="finalAgeInMonths")
	private String finalAgeInMonths;
	
	@Transient
	private List<PatientBmiDTO> lsPatientBmi;
	
	
	// logs
		@CreationTimestamp
		@Column(name = "created_date_time", updatable = false)
		private Date createdDateTime;
		
		@UpdateTimestamp
		@Column(name = "updated_date_time")
		private Date updatedDateTime;
		
		@Column(name = "user_id")
		private int userId;
		
		@Column(name = "created_by", updatable = false)
		private Integer createdBy;
		
		@Column(name = "updated_by" ,columnDefinition = "default 0")
		private Integer updatedBy;
		
		@Column(name = "deleted_by", columnDefinition = "default 0")
		private Integer deleted_by=0;
		
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "delete_date_time")
		private Date deletedDate;
		
		@Column(name = "unit_id")
		private Integer unitId;

	@JsonGetter("finalAgeInMonths")
	public String getFinalAgeInMonths() {
		return finalAgeInMonths;
	}

	@JsonSetter("finalAgeInMonths")
	public void setFinalAgeInMonths(String finalAgeInMonths) {
		this.finalAgeInMonths = finalAgeInMonths;
	}

	@JsonGetter("lsPatientBmi")
	public List<PatientBmiDTO> getLsPatientBmi() {
		return lsPatientBmi;
	}

	@JsonSetter("lsPatientBmi")
	public void setLsPatientBmi(List<PatientBmiDTO> lsPatientBmi) {
		this.lsPatientBmi = lsPatientBmi;
	}

	@JsonGetter("date")
	public String getDate() {
		return date;
	}

	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}

	@JsonGetter("patient_bmi")
	public Double getPatient_bmi() {
		return patient_bmi;
	}

	@JsonSetter("patient_bmi")
	public void setPatient_bmi(Double patient_bmi) {
		this.patient_bmi = patient_bmi;
	}

	@JsonGetter("patient_bmi_id")
	public int getPatient_bmi_id() {
		return patient_bmi_id;
	}

	@JsonSetter("patient_bmi_id")
	public void setPatient_bmi_id(int patient_bmi_id) {
		this.patient_bmi_id = patient_bmi_id;
	}

	@JsonGetter("patient_id")
	public int getPatient_id() {
		return patient_id;
	}

	@JsonSetter("patient_id")
	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}

	@JsonGetter("patient_treat_id")
	public int getPatient_treat_id() {
		return patient_treat_id;
	}

	@JsonSetter("patient_treat_id")
	public void setPatient_treat_id(int patient_treat_id) {
		this.patient_treat_id = patient_treat_id;
	}

	@JsonGetter("patient_treat_count")
	public String getPatient_treat_count() {
		return patient_treat_count;
	}

	@JsonSetter("patient_treat_count")
	public void setPatient_treat_count(String patient_treat_count) {
		this.patient_treat_count = patient_treat_count;
	}

	@JsonGetter("patient_weight")
	public Double getPatient_weight() {
		return patient_weight;
	}

	@JsonSetter("patient_weight")
	public void setPatient_weight(Double patient_weight) {
		this.patient_weight = patient_weight;
	}

	@JsonGetter("patient_height")
	public Double getPatient_height() {
		return patient_height;
	}

	@JsonSetter("patient_height")
	public void setPatient_height(Double patient_height) {
		this.patient_height = patient_height;
	}

	@JsonGetter("patient_headcim")
	public Double getPatient_headcim() {
		return patient_headcim;
	}

	@JsonSetter("patient_headcim")
	public void setPatient_headcim(Double patient_headcim) {
		this.patient_headcim = patient_headcim;
	}

	
	
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}

	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("patient_bsa")
	public Double getPatient_bsa() {
		return patient_bsa;
	}

	@JsonSetter("patient_bsa")
	public void setPatient_bsa(Double patient_bsa) {
		this.patient_bsa = patient_bsa;
	}

	
	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
	
	@JsonIgnore
	public int getUpdatedBy() {
		return updatedBy;
	}

	
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	@JsonIgnore
	public int getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	
}
