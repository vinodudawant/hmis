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
@Table(name = "pharma_category_master")
public class CategoryMaster implements Serializable {
	
	@Id
	@GeneratedValue
	@Column(name = "cat_id")
	private Integer catId;
	
	@Column(name = "cat_name")
	private String catName;
	
	@Column(name = "cat_delete_flag")
	private Integer catDeleteFlag;
	
	/*
	 * @Column(name = "cat_update_date") private Date catUpdateDate;
	 * 
	 * @Column(name = "category_add_date") private Date categoryAddDate;
	 */
	
	@CreationTimestamp
	@Column(name="cat_add_date")
	private Date categoryAddDate;
	@UpdateTimestamp
	@Column(name="cat_update_date")
	private Date catUpdateDate;
	
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
   
	public Date getCategoryAddDate() {
		return categoryAddDate;
	}

	public void setCategoryAddDate(Date categoryAddDate) {
		this.categoryAddDate = categoryAddDate;
	}

	public Integer getCatId() {
		return catId;
	}

	public void setCatId(Integer catId) {
		this.catId = catId;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public Integer getCatDeleteFlag() {
		return catDeleteFlag;
	}

	public void setCatDeleteFlag(Integer catDeleteFlag) {
		this.catDeleteFlag = catDeleteFlag;
	}

	public Date getCatUpdateDate() {
		return catUpdateDate;
	}

	public void setCatUpdateDate(Date catUpdateDate) {
		this.catUpdateDate = catUpdateDate;
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
