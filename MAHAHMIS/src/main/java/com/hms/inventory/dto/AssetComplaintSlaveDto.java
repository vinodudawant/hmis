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
@Table(name = "inv_asset_complaint_slave_new")
public class AssetComplaintSlaveDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@CreationTimestamp
	@Column(name="created_date_time" , updatable = false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;

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
	
	@Column(name="raised_by")
	private String raisedBy;
	
	@Column(name="comment")
	private String comment;
	
	@Column(name="created_slave_date")
	private String createdSlaveDate;
	
	@Transient
	private List<AssetComplaintSlaveDto> lstAssetComplaintSlaveDto;

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

	public String getRaisedBy() {
		return raisedBy;
	}

	public void setRaisedBy(String raisedBy) {
		this.raisedBy = raisedBy;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public List<AssetComplaintSlaveDto> getLstAssetComplaintSlaveDto() {
		return lstAssetComplaintSlaveDto;
	}

	public void setLstAssetComplaintSlaveDto(
			List<AssetComplaintSlaveDto> lstAssetComplaintSlaveDto) {
		this.lstAssetComplaintSlaveDto = lstAssetComplaintSlaveDto;
	}

	public String getCreatedSlaveDate() {
		return createdSlaveDate;
	}

	public void setCreatedSlaveDate(String createdSlaveDate) {
		this.createdSlaveDate = createdSlaveDate;
	}

	@Override
	public String toString() {
		return "AssetComplaintSlaveDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by
				+ ", deleted=" + deleted + ", deletedDate=" + deletedDate
				+ ", unitId=" + unitId + ", raisedBy=" + raisedBy
				+ ", comment=" + comment + ", lstAssetComplaintSlaveDto="
				+ lstAssetComplaintSlaveDto + "]";
	}
	
	
	
}
