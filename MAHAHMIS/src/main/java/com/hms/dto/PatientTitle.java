package com.hms.dto;

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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "patient_title")
public class PatientTitle {

	@Id
	@GeneratedValue
	@Column(name = "patient_title_id")
	private Integer patientTitleID;
	
	@Column(name = "title")
	private String patientTitle;

	@Column(name = "gender")
	private String patientTitleGender;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "status", length = 2)
	private String deleteStatus = "Y";
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	
	@Transient
	private List<PatientTitle> listPatientTitle;

	@JsonGetter("gender")
	public String getPatientTitleGender() {
		return patientTitleGender;
	}

	public void setPatientTitleGender(String patientTitleGender) {
		this.patientTitleGender = patientTitleGender;
	}

	@JsonGetter("plist")
	public List<PatientTitle> getListPatientTitle() {
		return listPatientTitle;
	}

	public void setListPatientTitle(List<PatientTitle> listPatientTitle) {
		this.listPatientTitle = listPatientTitle;
	}
	
	@JsonGetter("ptid")
	public Integer getPatientTitleID() {
		return patientTitleID;
	}

	public void setPatientTitleID(Integer patientTitleID) {
		this.patientTitleID = patientTitleID;
	}

	@JsonGetter("title")
	public String getPatientTitle() {
		return patientTitle;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getDeleteStatus() {
		return deleteStatus;
	}

	public void setDeleteStatus(String deleteStatus) {
		this.deleteStatus = deleteStatus;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public void setPatientTitle(String patientTitle) {
		this.patientTitle = patientTitle;
	}


	@Override
	public String toString() {
		return "PatientTitle [patientTitleID=" + patientTitleID + ", patientTitle=" + patientTitle
				+ ", patientTitleGender=" + patientTitleGender + ", unitId=" + unitId + ", deleteStatus=" + deleteStatus
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy + ", createDate="
				+ createDate + ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate + ", listPatientTitle="
				+ listPatientTitle + "]";
	}
}