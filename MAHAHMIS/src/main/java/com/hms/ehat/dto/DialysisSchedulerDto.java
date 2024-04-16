package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity(name = "ehat_dialysis_Scheduler")
public class DialysisSchedulerDto {
	@Id
	@GeneratedValue
	
	@Column(name = "scheduler_Id")
	private int schedulerId;
	
	@Column(name = "scheduler_Date")
	private String schedulerDate;
	
	@Column(name = "ward_Id")
	private String wardid;
	
	@Column(name = "ward_BedId")
	private String wardBedId;
	
	@Column(name = "patient_Id")
	private String patientId;
	
	@Column(name = "patMob")
	private String patMob;
	
	@Column(name = "details")
	private String details;
	
	@Column(name = "startTime")
	private String startTime;
	
	@Column(name = "endTime")
	private String endTime;
	
	public int getSchedulerId() {
		return schedulerId;
	}

	public void setSchedulerId(int schedulerId) {
		this.schedulerId = schedulerId;
	}

	public String getSchedulerDate() {
		return schedulerDate;
	}

	public void setSchedulerDate(String schedulerDate) {
		this.schedulerDate = schedulerDate;
	}

	public String getWardid() {
		return wardid;
	}

	public void setWardid(String wardid) {
		this.wardid = wardid;
	}

	public String getWardBedId() {
		return wardBedId;
	}

	public void setWardBedId(String wardBedId) {
		this.wardBedId = wardBedId;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	

	public String getPatMob() {
		return patMob;
	}

	public void setPatMob(String patMob) {
		this.patMob = patMob;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public List<DialysisSchedulerDto> getListDialysis() {
		return listDialysis;
	}

	public void setListDialysis(List<DialysisSchedulerDto> listDialysis) {
		this.listDialysis = listDialysis;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Transient
	private List<DialysisSchedulerDto> listDialysis;

	@JsonGetter("listDialysis")
	public List<DialysisSchedulerDto> getListdialysis() {
		return listDialysis;
	}
    @JsonSetter("listDialysis")
	public void setListdialysis(List<DialysisSchedulerDto> listdialysis) {
		this.listDialysis = listdialysis;
	}
    
    @Transient
    private String patientname;

	public String getPatientname() {
		return patientname;
	}

	public void setPatientname(String patientname) {
		this.patientname = patientname;
	}
    
	
}
