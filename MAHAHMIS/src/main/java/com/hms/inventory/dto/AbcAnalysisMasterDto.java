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
@Table(name="inv_abcanalysis_master_new")
public class AbcAnalysisMasterDto {
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
	@Column(name = "item_a_min_range")
	private Integer itemAMinRange;
	@Column(name = "item_a_max_range")
	private Integer itemAMaxRange;
	@Column(name = "item_b_min_range")
	private Integer itemBMinRange;
	@Column(name = "item_b_max_range")
	private Integer itemBMaxRange;
	@Column(name = "item_c_min_range")
	private Integer itemCMinRange;
	@Column(name = "item_c_max_range")
	private Integer itemCMaxRange;
	@Transient
	private List<AbcAnalysisMasterDto> lstAbcAnalysisMaster;
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
	public Integer getItemAMinRange() {
		return itemAMinRange;
	}
	public void setItemAMinRange(Integer itemAMinRange) {
		this.itemAMinRange = itemAMinRange;
	}
	public Integer getItemAMaxRange() {
		return itemAMaxRange;
	}
	public void setItemAMaxRange(Integer itemAMaxRange) {
		this.itemAMaxRange = itemAMaxRange;
	}
	public Integer getItemBMinRange() {
		return itemBMinRange;
	}
	public void setItemBMinRange(Integer itemBMinRange) {
		this.itemBMinRange = itemBMinRange;
	}
	public Integer getItemBMaxRange() {
		return itemBMaxRange;
	}
	public void setItemBMaxRange(Integer itemBMaxRange) {
		this.itemBMaxRange = itemBMaxRange;
	}
	public Integer getItemCMinRange() {
		return itemCMinRange;
	}
	public void setItemCMinRange(Integer itemCMinRange) {
		this.itemCMinRange = itemCMinRange;
	}
	public Integer getItemCMaxRange() {
		return itemCMaxRange;
	}
	public void setItemCMaxRange(Integer itemCMaxRange) {
		this.itemCMaxRange = itemCMaxRange;
	}
	public List<AbcAnalysisMasterDto> getLstAbcAnalysisMaster() {
		return lstAbcAnalysisMaster;
	}
	public void setLstAbcAnalysysMaster(
			List<AbcAnalysisMasterDto> lstAbcAnalysisMaster) {
		this.lstAbcAnalysisMaster = lstAbcAnalysisMaster;
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
		result = prime * result
				+ ((itemAMaxRange == null) ? 0 : itemAMaxRange.hashCode());
		result = prime * result
				+ ((itemAMinRange == null) ? 0 : itemAMinRange.hashCode());
		result = prime * result
				+ ((itemBMaxRange == null) ? 0 : itemBMaxRange.hashCode());
		result = prime * result
				+ ((itemBMinRange == null) ? 0 : itemBMinRange.hashCode());
		result = prime * result
				+ ((itemCMaxRange == null) ? 0 : itemCMaxRange.hashCode());
		result = prime * result
				+ ((itemCMinRange == null) ? 0 : itemCMinRange.hashCode());
		result = prime
				* result
				+ ((lstAbcAnalysisMaster == null) ? 0 : lstAbcAnalysisMaster
						.hashCode());
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
		AbcAnalysisMasterDto other = (AbcAnalysisMasterDto) obj;
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
		if (itemAMaxRange == null) {
			if (other.itemAMaxRange != null)
				return false;
		} else if (!itemAMaxRange.equals(other.itemAMaxRange))
			return false;
		if (itemAMinRange == null) {
			if (other.itemAMinRange != null)
				return false;
		} else if (!itemAMinRange.equals(other.itemAMinRange))
			return false;
		if (itemBMaxRange == null) {
			if (other.itemBMaxRange != null)
				return false;
		} else if (!itemBMaxRange.equals(other.itemBMaxRange))
			return false;
		if (itemBMinRange == null) {
			if (other.itemBMinRange != null)
				return false;
		} else if (!itemBMinRange.equals(other.itemBMinRange))
			return false;
		if (itemCMaxRange == null) {
			if (other.itemCMaxRange != null)
				return false;
		} else if (!itemCMaxRange.equals(other.itemCMaxRange))
			return false;
		if (itemCMinRange == null) {
			if (other.itemCMinRange != null)
				return false;
		} else if (!itemCMinRange.equals(other.itemCMinRange))
			return false;
		if (lstAbcAnalysisMaster == null) {
			if (other.lstAbcAnalysisMaster != null)
				return false;
		} else if (!lstAbcAnalysisMaster.equals(other.lstAbcAnalysisMaster))
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
