package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@SuppressWarnings("deprecation")
@Entity
@Table(name="bb_bloodrequest_sample_dispatch")
public class SampleDispatch implements Serializable {
	
private static final long serialVersionUID = 0;
	
	
	@Id
	@GeneratedValue
	@Column(name = "sample_dispatch_id")
	private Integer SampleDispatchId;
	
	@Column(name = "patient_name")
	private String 	patientName;
	
	@Column(name = "blood_requestid")
	private Integer bloodRequestId=0;
	
	@Column(name = "send_status")
	private String 	sendStatus="N";
	
	@Column(name = "sample_status")
	private Integer	sampleStatus=0;
	
	@Column(name = "priority")
	private String	priority;

	@Column(name = "remarks")
	private String remarks;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "ward_name")
	private String wardName;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_datetime", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_datetime")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_datetime")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "ip")
	private String ipAddress = null;
	
	@Column(name = "sampleTestingStatus") //Added By Annapurna
	private String sampleTestingStatus = "N";
	
	
	public String getSampleTestingStatus() {
		return sampleTestingStatus;
	}

	public void setSampleTestingStatus(String sampleTestingStatus) {
		this.sampleTestingStatus = sampleTestingStatus;
	}

	@Transient
	private List<SampleDispatch> sampleDispatchList; //Added By Annapurna


	public List<SampleDispatch> getSampleDispatchList() {
		return sampleDispatchList;
	}

	public void setSampleDispatchList(List<SampleDispatch> sampleDispatchList) {
		sampleDispatchList = sampleDispatchList;
	}

	public Integer getSampleDispatchId() {
		return SampleDispatchId;
	}

	public void setSampleDispatchId(Integer sampleDispatchId) {
		SampleDispatchId = sampleDispatchId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public Integer getBloodRequestId() {
		return bloodRequestId;
	}

	public void setBloodRequestId(Integer bloodRequestId) {
		this.bloodRequestId = bloodRequestId;
	}

	public String getSendStatus() {
		return sendStatus;
	}

	public void setSendStatus(String sendStatus) {
		this.sendStatus = sendStatus;
	}

	public Integer getSampleStatus() {
		return sampleStatus;
	}

	public void setSampleStatus(Integer sampleStatus) {
		this.sampleStatus = sampleStatus;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}



	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getWardName() {
		return wardName;
	}

	public void setWardName(String wardName) {
		this.wardName = wardName;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}
	
	
}
