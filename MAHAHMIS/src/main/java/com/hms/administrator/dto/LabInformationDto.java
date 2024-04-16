package com.hms.administrator.dto;

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

@Entity
@Table(name = "hmis_lab_information")
public class LabInformationDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private int labId;
	@Column(name = "lab_code")
	private String labCode;
	@Column(name = "lab_name")
	private String labName;
	@Column(name = "lab_address")
	private String labAddress;
	@Column(name = "email")
	private String email;
	@Column(name = "pathalogist")
	private String pathalogist;
	@Column(name = "degree")
	private String degree;
	@Column(name = "telephone_no")
	private String telephoneNo;
	@Column(name = "opening_time")
	private String openingTime;
	@Column(name = "closing_time")
	private String closingTime;
	@Column(name = "lunch_time")
	private String lunchTime;
	@Column(name = "closed_day")
	private String closedDay;
	@Column(name = "unit_id")
	private int unitId;
	@Column(name = "deleted_status", length = 2)
	private String deleted = "N";
	@Column(name = "created_by")
	private int createdBy;
	@Column(name = "updated_by")
	private int updatedBy;
	@Column(name = "deleted_by")
	private int deletedBy;
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date", updatable = false)
	private Date createDate;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date")
	private Date deletedDate;
	
	@Transient
	private List<LabInformationDto> labInfoList;

	
	public int getLabId() {
		return labId;
	}

	
	public void setLabId(int labId) {
		this.labId = labId;
	}

	public String getLabCode() {
		return labCode;
	}

	public void setLabCode(String labCode) {
		this.labCode = labCode;
	}

	public String getLabName() {
		return labName;
	}

	public void setLabName(String labName) {
		this.labName = labName;
	}

	public String getLabAddress() {
		return labAddress;
	}

	public void setLabAddress(String labAddress) {
		this.labAddress = labAddress;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPathalogist() {
		return pathalogist;
	}

	public void setPathalogist(String pathalogist) {
		this.pathalogist = pathalogist;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getTelephoneNo() {
		return telephoneNo;
	}

	public void setTelephoneNo(String telephoneNo) {
		this.telephoneNo = telephoneNo;
	}

	public String getOpeningTime() {
		return openingTime;
	}

	public void setOpeningTime(String openingTime) {
		this.openingTime = openingTime;
	}

	public String getClosingTime() {
		return closingTime;
	}

	public void setClosingTime(String closingTime) {
		this.closingTime = closingTime;
	}

	public String getLunchTime() {
		return lunchTime;
	}

	public void setLunchTime(String lunchTime) {
		this.lunchTime = lunchTime;
	}

	public String getClosedDay() {
		return closedDay;
	}

	public void setClosedDay(String closedDay) {
		this.closedDay = closedDay;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
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


	public List<LabInformationDto> getLabInfoList() {
		return labInfoList;
	}


	public void setLabInfoList(List<LabInformationDto> labInfoList) {
		this.labInfoList = labInfoList;
	}


	@Override
	public String toString() {
		return "LabInformationDto [labId=" + labId + ", labCode=" + labCode + ", labName=" + labName + ", labAddress="
				+ labAddress + ", email=" + email + ", pathalogist=" + pathalogist + ", degree=" + degree
				+ ", telephoneNo=" + telephoneNo + ", openingTime=" + openingTime + ", closingTime=" + closingTime
				+ ", lunchTime=" + lunchTime + ", closedDay=" + closedDay + ", unitId=" + unitId + ", deleted="
				+ deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy
				+ ", createDate=" + createDate + ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate
				+ ", labInfoList=" + labInfoList + "]";
	}
}	