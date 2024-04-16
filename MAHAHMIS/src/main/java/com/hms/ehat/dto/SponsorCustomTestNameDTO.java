package com.hms.ehat.dto;

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
@Table(name = "sponsor_customer_testname")
public class SponsorCustomTestNameDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "sr_id")
	private int id;
	
	@Column(name = "sponsor_id",columnDefinition="int default 0")
	private int sponsorId=0;
	
	@Column(name = "service_id",columnDefinition="int default 0")
	private int serviceId=0;
	
	@Column(name = "sub_service_id",columnDefinition="int default 0")
	private int subServiceId=0;
	
	@Column(name = "category_name",columnDefinition="varchar(5000) default ''")
	private String categoryName;
	
	@Column(name = "testname",columnDefinition="varchar(5000) default ''")
	private String testName;
	
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
	List<SponsorCustomTestNameDTO>  lstSponsorCustomTestName;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getSponsorId() {
		return sponsorId;
	}

	public void setSponsorId(int sponsorId) {
		this.sponsorId = sponsorId;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public int getSubServiceId() {
		return subServiceId;
	}

	public void setSubServiceId(int subServiceId) {
		this.subServiceId = subServiceId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
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

	public List<SponsorCustomTestNameDTO> getLstSponsorCustomTestName() {
		return lstSponsorCustomTestName;
	}

	public void setLstSponsorCustomTestName(List<SponsorCustomTestNameDTO> lstSponsorCustomTestName) {
		this.lstSponsorCustomTestName = lstSponsorCustomTestName;
	}

	@Override
	public String toString() {
		return "SponsorCustomTestNameDTO [id=" + id + ", sponsorId=" + sponsorId + ", serviceId=" + serviceId
				+ ", subServiceId=" + subServiceId + ", categoryName=" + categoryName + ", testName=" + testName
				+ ", createdDateTime=" + createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy="
				+ deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId + ", userId=" + userId
				+ ", lstSponsorCustomTestName=" + lstSponsorCustomTestName + "]";
	}

	
}
