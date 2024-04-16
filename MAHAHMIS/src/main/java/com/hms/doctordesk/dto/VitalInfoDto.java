package com.hms.doctordesk.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "dd_vital_info_details")
public class VitalInfoDto {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "vital_info_id")
	private Integer id;
	
	@Column(name = "vital_id")
	private int vitalId;
	
	@Column(name = "value")
	private String value;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
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
	@Column(name = "vital_date")
	private String currentDate;
	
	@Transient
	List<VitalInfoDto> listOfVitals;
	
	@Transient
	List<VitalMaster> listOfVitalHeader;
	
	@Transient
	private String vitalName;

	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getVitalId() {
		return vitalId;
	}

	public void setVitalId(int vitalId) {
		this.vitalId = vitalId;
	}

	

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
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

	public List<VitalInfoDto> getListOfVitals() {
		return listOfVitals;
	}

	public void setListOfVitals(List<VitalInfoDto> listOfVitals) {
		this.listOfVitals = listOfVitals;
	}
	
	public List<VitalMaster> getListOfVitalHeader() {
		return listOfVitalHeader;
	}

	public void setListOfVitalHeader(List<VitalMaster> listOfVitalHeader) {
		this.listOfVitalHeader = listOfVitalHeader;
	}

	public String getVitalName() {
		return vitalName;
	}

	public void setVitalName(String vitalName) {
		this.vitalName = vitalName;
	}

	public String getCurrentDate() {
		return currentDate;
	}

	public void setCurrentDate(String currentDate) {
		this.currentDate = currentDate;
	}	
	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	
}
