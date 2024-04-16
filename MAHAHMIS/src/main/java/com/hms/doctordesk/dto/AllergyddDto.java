package com.hms.doctordesk.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="dd_allergy")
public class AllergyddDto {

	@Id
	@GeneratedValue
	@Column(name="allergy_master_id")
	private int id;
	@Column(name="allergy_name")
	private String allergyName;
	@Column(name="allergy_type_id")
	private int allergyTypeId;
	@Column(name="allergy_react_id")
	private int allergyReactId;
	@Column(name="allergy_type_name")
	private String allergyTypeName;
	@Column(name="allergy_react_name")
	private String allergyReactName;
	@Column(name="first_obs_date")
	private String fos;
	@Column(name="notes")
	private String notes;
	@Column(name="patient_id")
	private int patientId;
	

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
	private int createdBy;
	@Column(name = "updated_by")
	private int updatedBy;
	@Column(name = "deleted_by")
	private int deleted_by;
	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	@Column(name = "unit_id")
	private Integer unitId;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAllergyTypeId() {
		return allergyTypeId;
	}
	public void setAllergyTypeId(int allergyTypeId) {
		this.allergyTypeId = allergyTypeId;
	}
	public int getAllergyReactId() {
		return allergyReactId;
	}
	public void setAllergyReactId(int allergyReactId) {
		this.allergyReactId = allergyReactId;
	}
	public String getAllergyTypeName() {
		return allergyTypeName;
	}
	public void setAllergyTypeName(String allergyTypeName) {
		this.allergyTypeName = allergyTypeName;
	}
	public String getAllergyReactName() {
		return allergyReactName;
	}
	public void setAllergyReactName(String allergyReactName) {
		this.allergyReactName = allergyReactName;
	}
	public String getFos() {
		return fos;
	}
	public void setFos(String fos) {
		this.fos = fos;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
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
	public int getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}
	public int getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
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
	public String getAllergyName() {
		return allergyName;
	}
	public void setAllergyName(String allergyName) {
		this.allergyName = allergyName;
	}
	
	
	
	
	
}
