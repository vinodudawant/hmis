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

@Entity 
@Table(name="pharma_shelf_master")
public class ShelfMaster implements Serializable
{
	
	@Id
	@GeneratedValue 
	@Column(name="shelf_id")
	private Integer shelfId;
	
	@Column(name="shelf_name")
	private String shelfName;
	
	
	@Column(name="shelf_delete_flag")
	private  Integer shelfDeleteFlag;
	@CreationTimestamp
	@Column(name="shelf_update_date")
	private Date shelfUpdateDate;
	@UpdateTimestamp
	@Column(name = "shelf_add_date")
	private Date shelfAddDate;
	
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

	public Date getShelfAddDate() {
		return shelfAddDate;
	}

	public void setShelfAddDate(Date shelfAddDate) {
		this.shelfAddDate = shelfAddDate;
	}

	public Integer getShelfId() {
		return shelfId;
	}

	public void setShelfId(Integer shelfId) {
		this.shelfId = shelfId;
	}

	public String getShelfName() {
		return shelfName;
	}

	public void setShelfName(String shelfName) {
		this.shelfName = shelfName;
	}

	public Integer getShelfDeleteFlag() {
		return shelfDeleteFlag;
	}

	public void setShelfDeleteFlag(Integer shelfDeleteFlag) {
		this.shelfDeleteFlag = shelfDeleteFlag;
	}

	public Date getShelfUpdateDate() {
		return shelfUpdateDate;
	}

	public void setShelfUpdateDate(Date shelfUpdateDate) {
		this.shelfUpdateDate = shelfUpdateDate;
	}

	
	
	
}
