package com.hms.inventory.dto;

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
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="inv_subinventory_master_new")
public class SubInventoryMasterDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	@CreationTimestamp
	@Column(name="created_date_time" ,updatable = false)
	private Date createdDateTime;
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	@Column(name = "subinventory_name")
	private String subInventoryName;
	@Column(name = "contact_number")
	private String contactNumber;
	@Column(name = "contact_number2")
	private String contactNumber2;
	
	public String getContactNumber2() {
		return contactNumber2;
	}
	public void setContactNumber2(String contactNumber2) {
		this.contactNumber2 = contactNumber2;
	}
	@Column(name="user_id")
	private int userId;
	@Column(name="created_by",updatable = false)
	private int createdBy;
	@Column(name="updated_by")
	private int updatedBy;
	@Column(name="deleted_by")
	private int deleted_by;
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	@Column(name="unit_id")
	private Integer unitId;
	@Transient
	private List<SubInventoryMasterDto> lstSubInventoryMaster;
	
	@Transient
	private Integer noOfPages;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
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
	public String getSubInventoryName() {
		return subInventoryName;
	}
	public void setSubInventoryName(String subInventoryName) {
		this.subInventoryName = subInventoryName;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
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
	public int getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public Date getDeletedDate() {
		return deletedDate;
	}
	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	public List<SubInventoryMasterDto> getLstSubInventoryMaster() {
		return lstSubInventoryMaster;
	}
	public void setLstSubInventoryMaster(
			List<SubInventoryMasterDto> lstSubInventoryMaster) {
		this.lstSubInventoryMaster = lstSubInventoryMaster;
	}
	public Integer getNoOfPages() {
		return noOfPages;
	}
	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}
	@Override
	public String toString() {
		return "SubInventoryMasterDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", subInventoryName=" + subInventoryName + ", contactNumber="
				+ contactNumber + ", contactNumber2=" + contactNumber2
				+ ", userId=" + userId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by
				+ ", deleted=" + deleted + ", deletedDate=" + deletedDate
				+ ", unitId=" + unitId + ", lstSubInventoryMaster="
				+ lstSubInventoryMaster + ", noOfPages=" + noOfPages + "]";
	}
	
	
	
	
}
