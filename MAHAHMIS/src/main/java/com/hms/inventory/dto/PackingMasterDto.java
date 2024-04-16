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
@Table(name="inv_packing_master_new")
public class PackingMasterDto {
	
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
	@Column(name = "packing_name")
	private String packingName;
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
	private List<PackingMasterDto> lstPackingMaster;
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
	public String getPackingName() {
		return packingName;
	}
	public void setPackingName(String packingName) {
		this.packingName = packingName;
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
	public List<PackingMasterDto> getLstPackingMaster() {
		return lstPackingMaster;
	}
	public void setLstPackingMaster(List<PackingMasterDto> lstPackingMaster) {
		this.lstPackingMaster = lstPackingMaster;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + createdBy;
		result = prime * result
				+ ((createdDateTime == null) ? 0 : createdDateTime.hashCode());
		result = prime * result + ((deleted == null) ? 0 : deleted.hashCode());
		result = prime * result
				+ ((deletedDate == null) ? 0 : deletedDate.hashCode());
		result = prime * result + deleted_by;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime
				* result
				+ ((lstPackingMaster == null) ? 0 : lstPackingMaster.hashCode());
		result = prime * result
				+ ((packingName == null) ? 0 : packingName.hashCode());
		result = prime * result + ((unitId == null) ? 0 : unitId.hashCode());
		result = prime * result + updatedBy;
		result = prime * result
				+ ((updatedDateTime == null) ? 0 : updatedDateTime.hashCode());
		result = prime * result + userId;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PackingMasterDto other = (PackingMasterDto) obj;
		if (createdBy != other.createdBy)
			return false;
		if (createdDateTime == null) {
			if (other.createdDateTime != null)
				return false;
		} else if (!createdDateTime.equals(other.createdDateTime))
			return false;
		if (deleted == null) {
			if (other.deleted != null)
				return false;
		} else if (!deleted.equals(other.deleted))
			return false;
		if (deletedDate == null) {
			if (other.deletedDate != null)
				return false;
		} else if (!deletedDate.equals(other.deletedDate))
			return false;
		if (deleted_by != other.deleted_by)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (lstPackingMaster == null) {
			if (other.lstPackingMaster != null)
				return false;
		} else if (!lstPackingMaster.equals(other.lstPackingMaster))
			return false;
		if (packingName == null) {
			if (other.packingName != null)
				return false;
		} else if (!packingName.equals(other.packingName))
			return false;
		if (unitId == null) {
			if (other.unitId != null)
				return false;
		} else if (!unitId.equals(other.unitId))
			return false;
		if (updatedBy != other.updatedBy)
			return false;
		if (updatedDateTime == null) {
			if (other.updatedDateTime != null)
				return false;
		} else if (!updatedDateTime.equals(other.updatedDateTime))
			return false;
		if (userId != other.userId)
			return false;
		return true;
	}
	
	
	

}
