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
@Table(name = "sponsor_customer_wardname")
public class SponsorCustomWardNameDTO {


	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "sr_id")
	private int id;
	
	@Column(name = "sponsor_id",columnDefinition="int default 0")
	private int sponsorId=0;
	
	@Column(name = "service_id",columnDefinition="int default 0")
	private int serviceId=0;
	
	@Column(name = "charge_master_id",columnDefinition="int default 0")
	private int chargeMasterId=0;
	
	@Column(name = "ward_name",columnDefinition="varchar(5000) default ''")
	private String wardName;
	
	@Column(name = "custom_ward_name",columnDefinition="varchar(5000) default ''")
	private String customWardName;
	
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
	List<SponsorCustomWardNameDTO>  lstSponsorCustomWardName;

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

	public int getChargeMasterId() {
		return chargeMasterId;
	}

	public void setChargeMasterId(int chargeMasterId) {
		this.chargeMasterId = chargeMasterId;
	}

	public String getWardName() {
		return wardName;
	}

	public void setWardName(String wardName) {
		this.wardName = wardName;
	}

	public String getCustomWardName() {
		return customWardName;
	}

	public void setCustomWardName(String customWardName) {
		this.customWardName = customWardName;
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

	public List<SponsorCustomWardNameDTO> getLstSponsorCustomWardName() {
		return lstSponsorCustomWardName;
	}

	public void setLstSponsorCustomWardName(List<SponsorCustomWardNameDTO> lstSponsorCustomWardName) {
		this.lstSponsorCustomWardName = lstSponsorCustomWardName;
	}

	@Override
	public String toString() {
		return "SponsorCustomWardNameDTO [id=" + id + ", sponsorId=" + sponsorId + ", serviceId=" + serviceId
				+ ", chargeMasterId=" + chargeMasterId + ", wardName=" + wardName + ", customWardName=" + customWardName
				+ ", createdDateTime=" + createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy="
				+ deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId + ", userId=" + userId
				+ ", lstSponsorCustomWardName=" + lstSponsorCustomWardName + "]";
	}

	
}
