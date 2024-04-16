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
@Table(name="dd_followup")
public class FollowupDto implements Serializable {
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "idfollowup")
	private int followupId;
	
	@Column(name="followupdate")
	private String followupdate;
	
	@Column(name="followuptime")
	private String followuptime;
	
	@Column(name="followupday")
	private String followupday;
	
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id")
	private Integer unitId;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	private Integer treatment_id;
	
	@Transient
	private List<FollowupDto> lstFollowUp;

	public int getFollowupId() {
		return followupId;
	}

	public void setFollowupId(int followupId) {
		this.followupId = followupId;
	}

	public String getFollowupdate() {
		return followupdate;
	}

	public void setFollowupdate(String followupdate) {
		this.followupdate = followupdate;
	}

	public String getFollowuptime() {
		return followuptime;
	}

	public void setFollowuptime(String followuptime) {
		this.followuptime = followuptime;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getFollowupday() {
		return followupday;
	}

	public void setFollowupday(String followupday) {
		this.followupday = followupday;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public List<FollowupDto> getLstFollowUp() {
		return lstFollowUp;
	}

	public void setLstFollowUp(List<FollowupDto> lstFollowUp) {
		this.lstFollowUp = lstFollowUp;
	}
	
	
}
