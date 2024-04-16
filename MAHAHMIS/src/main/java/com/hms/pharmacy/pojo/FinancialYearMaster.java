package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_financial_year_master")
public class FinancialYearMaster implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "year_id")
	private Integer yearId;

	@Column(name = "year_start_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date yearStartDate;

	@Column(name = "year_end_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date yearEndDate;

	@Column(name = "year")
	private String yearFinancial;

	@Column(name = "year_delete_flag")
	private Integer yearDeleteFlag;

	
	
	@CreationTimestamp
	@Column(name="year_add_date")
	private Date yearAddDate;
	@UpdateTimestamp
	@Column(name="year_update_date")
	private Date yearUpdateDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	public Date getYearAddDate() {
		return yearAddDate;
	}

	public void setYearAddDate(Date yearAddDate) {
		this.yearAddDate = yearAddDate;
	}

	public Integer getYearId() {
		return yearId;
	}

	public void setYearId(Integer yearId) {
		this.yearId = yearId;
	}

	public Date getYearStartDate() {
		return yearStartDate;
	}

	public void setYearStartDate(Date yearStartDate) {
		this.yearStartDate = yearStartDate;
	}

	public Date getYearEndDate() {
		return yearEndDate;
	}

	public void setYearEndDate(Date yearEndDate) {
		this.yearEndDate = yearEndDate;
	}

	public String getYearFinancial() {
		return yearFinancial;
	}

	public void setYearFinancial(String yearFinancial) {
		this.yearFinancial = yearFinancial;
	}

	public Integer getYearDeleteFlag() {
		return yearDeleteFlag;
	}

	public void setYearDeleteFlag(Integer yearDeleteFlag) {
		this.yearDeleteFlag = yearDeleteFlag;
	}

	public Date getYearUpdateDate() {
		return yearUpdateDate;
	}

	public void setYearUpdateDate(Date yearUpdateDate) {
		this.yearUpdateDate = yearUpdateDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

}
