package com.hms.ipd.dto;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@SuppressWarnings("serial")
@Entity
@Table(name = "ehat_doctor_round_template")
public class DoctorRoundTempDTO implements Serializable{
	
	@Id
	@GeneratedValue
	@Column(name = "doctor_round_template_id")
	private Integer doctorRoundTemplateId;

	@Column(name = "temp_name")
	private String tempName;
	
	@Column(name = "clinical_notes",columnDefinition="TEXT default ' '")
	private String clinicalNotes;
	
	@Column(name = "investigation_advice",columnDefinition="TEXT default ' '")
	private String investigationAdvice;
	
	@Column(name = "other",columnDefinition="TEXT default ' '")
	private String other;

	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "assigned_by")
	private String assignedBy;

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "assign_date_time")
	private Calendar assignDateTime;

	@Column(name = "unit_id")
	private Integer unitId=1;
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_datetime", updatable = false)
	private Calendar  createDateTime;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_datetime")
	private Calendar  updatedDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_datetime")
	private Calendar  deletedDateTime;

	public Integer getDoctorRoundTemplateId() {
		return doctorRoundTemplateId;
	}

	public void setDoctorRoundTemplateId(Integer doctorRoundTemplateId) {
		this.doctorRoundTemplateId = doctorRoundTemplateId;
	}

	public String getTempName() {
		return tempName;
	}

	public void setTempName(String tempName) {
		this.tempName = tempName;
	}

	public String getClinicalNotes() {
		return clinicalNotes;
	}

	public void setClinicalNotes(String clinicalNotes) {
		this.clinicalNotes = clinicalNotes;
	}

	public String getInvestigationAdvice() {
		return investigationAdvice;
	}

	public void setInvestigationAdvice(String investigationAdvice) {
		this.investigationAdvice = investigationAdvice;
	}

	public String getOther() {
		return other;
	}

	public void setOther(String other) {
		this.other = other;
	}

	public String getStatus() {
		return deleted;
	}

	public void setStatus(String status) {
		this.deleted = status;
	}

	public String getAssignedBy() {
		return assignedBy;
	}

	public void setAssignedBy(String assignedBy) {
		this.assignedBy = assignedBy;
	}

	public Calendar getAssignDateTime() {
		return assignDateTime;
	}

	public void setAssignDateTime(Calendar assignDateTime) {
		this.assignDateTime = assignDateTime;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	public Calendar getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(Calendar createDateTime) {
		this.createDateTime = createDateTime;
	}

	public Calendar getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Calendar updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Calendar getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Calendar deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public DoctorRoundTempDTO() {
		super();
	}

	public DoctorRoundTempDTO(Integer doctorRoundTemplateId, String tempName, String clinicalNotes,
			String investigationAdvice, String other, String status, String assignedBy, Calendar assignDateTime,
			Integer unitId, Integer createdBy, Integer updatedBy, Integer deletedBy, Calendar createDateTime,
			Calendar updatedDateTime, Calendar deletedDateTime) {
		super();
		this.doctorRoundTemplateId = doctorRoundTemplateId;
		this.tempName = tempName;
		this.clinicalNotes = clinicalNotes;
		this.investigationAdvice = investigationAdvice;
		this.other = other;
		this.deleted = status;
		this.assignedBy = assignedBy;
		this.assignDateTime = assignDateTime;
		this.unitId = unitId;
		this.createdBy = createdBy;
		this.updatedBy = updatedBy;
		this.deletedBy = deletedBy;
		this.createDateTime = createDateTime;
		this.updatedDateTime = updatedDateTime;
		this.deletedDateTime = deletedDateTime;
	}

	@Override
	public String toString() {
		return "DoctorRoundTempDTO [doctorRoundTemplateId=" + doctorRoundTemplateId + ", tempName=" + tempName
				+ ", clinicalNotes=" + clinicalNotes + ", investigationAdvice=" + investigationAdvice + ", other="
				+ other + ", status=" + deleted + ", assignedBy=" + assignedBy + ", assignDateTime=" + assignDateTime
				+ ", unitId=" + unitId + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedBy="
				+ deletedBy + ", createDateTime=" + createDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", deletedDateTime=" + deletedDateTime + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(assignDateTime, assignedBy, clinicalNotes, createDateTime, createdBy, deletedBy,
				deletedDateTime, doctorRoundTemplateId, investigationAdvice, other, deleted, tempName, unitId, updatedBy,
				updatedDateTime);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DoctorRoundTempDTO other = (DoctorRoundTempDTO) obj;
		return Objects.equals(assignDateTime, other.assignDateTime) && Objects.equals(assignedBy, other.assignedBy)
				&& Objects.equals(clinicalNotes, other.clinicalNotes)
				&& Objects.equals(createDateTime, other.createDateTime) && Objects.equals(createdBy, other.createdBy)
				&& Objects.equals(deletedBy, other.deletedBy) && Objects.equals(deletedDateTime, other.deletedDateTime)
				&& Objects.equals(doctorRoundTemplateId, other.doctorRoundTemplateId)
				&& Objects.equals(investigationAdvice, other.investigationAdvice)
				&& Objects.equals(this.other, other.other) && Objects.equals(deleted, other.deleted)
				&& Objects.equals(tempName, other.tempName) && Objects.equals(unitId, other.unitId)
				&& Objects.equals(updatedBy, other.updatedBy) && Objects.equals(updatedDateTime, other.updatedDateTime);
	}
	
	
}
