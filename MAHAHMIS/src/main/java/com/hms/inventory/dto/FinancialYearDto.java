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
@Table(name="inv_financial_year_new")
public class FinancialYearDto {

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
	@Column(name = "year_start_date")
	private String yearStartDate;
	@Column(name = "year_end_date")
	private String yearEndDate;
	@Column(name = "year")	
	private String year;
	@Column(name="user_id")
	private Integer userId;
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
	private List<FinancialYearDto> lstFinancialMaster;
	
	public List<FinancialYearDto> getLstFinancialMaster() {
		return lstFinancialMaster;
	}
	public void setLstFinancialMaster(List<FinancialYearDto> lstFinancialMaster) {
		this.lstFinancialMaster = lstFinancialMaster;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getYearStartDate() {
		return yearStartDate;
	}
	public void setYearStartDate(String yearStartDate) {
		this.yearStartDate = yearStartDate;
	}
	public String getYearEndDate() {
		return yearEndDate;
	}
	public void setYearEndDate(String yearEndDate) {
		this.yearEndDate = yearEndDate;
	}
	
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
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
				+ ((lstFinancialMaster == null) ? 0 : lstFinancialMaster
						.hashCode());
		result = prime * result + ((unitId == null) ? 0 : unitId.hashCode());
		result = prime * result + updatedBy;
		result = prime * result
				+ ((updatedDateTime == null) ? 0 : updatedDateTime.hashCode());
		result = prime * result + ((unitId == null) ? 0 : unitId.hashCode());
		result = prime * result + ((year == null) ? 0 : year.hashCode());
		result = prime * result
				+ ((yearEndDate == null) ? 0 : yearEndDate.hashCode());
		result = prime * result
				+ ((yearStartDate == null) ? 0 : yearStartDate.hashCode());
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
		FinancialYearDto other = (FinancialYearDto) obj;
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
		if (lstFinancialMaster == null) {
			if (other.lstFinancialMaster != null)
				return false;
		} else if (!lstFinancialMaster.equals(other.lstFinancialMaster))
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
		if (year == null) {
			if (other.year != null)
				return false;
		} else if (!year.equals(other.year))
			return false;
		if (yearEndDate == null) {
			if (other.yearEndDate != null)
				return false;
		} else if (!yearEndDate.equals(other.yearEndDate))
			return false;
		if (yearStartDate == null) {
			if (other.yearStartDate != null)
				return false;
		} else if (!yearStartDate.equals(other.yearStartDate))
			return false;
		return true;
	}
	
	
	
}
