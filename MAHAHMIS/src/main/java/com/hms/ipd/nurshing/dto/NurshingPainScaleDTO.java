package com.hms.ipd.nurshing.dto;

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
@Table(name = "nurshing_pain_scale")
public class NurshingPainScaleDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	
	@Column(name = "treatment_id")
	int treatmentId;
	
	@Column(name = "patient_id")
	int patientId;

	@Column(name = "pain_scale_date",columnDefinition="varchar(20) default ''")
	private String painScaleDate;
	
	@Column(name = "pain_scale",columnDefinition="varchar(20) default ''")
	private String painScale;
	
	@Column(name = "acute",columnDefinition="varchar(20) default ''")
	private String acute;
	
	@Column(name = "chronic",columnDefinition="varchar(20) default ''")
	private String 	chronic;
	
	@Column(name = "location",columnDefinition="varchar(20) default ''")
	private String 	location;
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Transient
	List<NurshingPainScaleDTO>  lstNurshingPainScale;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getPainScaleDate() {
		return painScaleDate;
	}

	public void setPainScaleDate(String painScaleDate) {
		this.painScaleDate = painScaleDate;
	}

	public String getPainScale() {
		return painScale;
	}

	public void setPainScale(String painScale) {
		this.painScale = painScale;
	}

	public String getAcute() {
		return acute;
	}

	public void setAcute(String acute) {
		this.acute = acute;
	}

	public String getChronic() {
		return chronic;
	}

	public void setChronic(String chronic) {
		this.chronic = chronic;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<NurshingPainScaleDTO> getLstNurshingPainScale() {
		return lstNurshingPainScale;
	}

	public void setLstNurshingPainScale(List<NurshingPainScaleDTO> lstNurshingPainScale) {
		this.lstNurshingPainScale = lstNurshingPainScale;
	}

	@Override
	public String toString() {
		return "NurshingPainScaleDTO [id=" + id + ", treatmentId=" + treatmentId + ", patientId=" + patientId
				+ ", painScaleDate=" + painScaleDate + ", painScale=" + painScale + ", acute=" + acute + ", chronic="
				+ chronic + ", location=" + location + ", createdDateTime=" + createdDateTime + ", updatedDateTime="
				+ updatedDateTime + ", deletedBy=" + deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId
				+ ", userId=" + userId + ", lstNurshingPainScale=" + lstNurshingPainScale + "]";
	}
	
	
	
	
}
