package com.hms.doctordesk.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@SuppressWarnings("deprecation")
@Entity
@Table(name="opd_subjective_type_master")

public class SubjectiveObjectiveDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "subjectiveId")
	private int subjectiveId;
	
	@Column(name = "subjective_objective_tempType")
	private String subjectiveObjectivetempType;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Transient
	private List<SubjectiveObjectiveDto> lstSubjectiveMaster;
	
	public List<SubjectiveObjectiveDto> getLstSubjectiveMaster() {
		return lstSubjectiveMaster;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	//@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
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
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
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
	public int getSubjectiveId() {
		return subjectiveId;
	}
	public void setSubjectiveId(int subjectiveId) {
		this.subjectiveId = subjectiveId;
	}
	public String getSubjectiveObjectivetempType() {
		return subjectiveObjectivetempType;
	}
	public void setSubjectiveObjectivetempType(String subjectiveObjectivetempType) {
		this.subjectiveObjectivetempType = subjectiveObjectivetempType;
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@CreationTimestamp
	@Column(name="created_date_time")
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;

	@Override
	public String toString() {
		return "SubjectiveObjectiveDto [subjectiveId=" + subjectiveId
				+ ", subjectiveObjectivetempType="
				+ subjectiveObjectivetempType + ", deleted=" + deleted
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedBy=" + deletedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDate="
				+ deletedDate + ", createdDateTime=" + createdDateTime
				+ ", updatedDateTime=" + updatedDateTime + ", getDeleted()="
				+ getDeleted() + ", getCreatedBy()=" + getCreatedBy()
				+ ", getUpdatedBy()=" + getUpdatedBy() + ", getDeletedBy()="
				+ getDeletedBy() + ", getCreatedDate()=" + getCreatedDate()
				+ ", getUpdatedDate()=" + getUpdatedDate()
				+ ", getDeletedDate()=" + getDeletedDate()
				+ ", getSubjectiveId()=" + getSubjectiveId()
				+ ", getSubjectiveObjectivetempType()="
				+ getSubjectiveObjectivetempType() + ", getCreatedDateTime()="
				+ getCreatedDateTime() + ", getUpdatedDateTime()="
				+ getUpdatedDateTime() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
	public void setLstSubjectiveMaster(
			List<SubjectiveObjectiveDto> lstSubjectiveMaster) {
		this.lstSubjectiveMaster = lstSubjectiveMaster;
		
	}
	
}
