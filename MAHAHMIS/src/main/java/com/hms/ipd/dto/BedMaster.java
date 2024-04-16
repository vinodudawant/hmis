package com.hms.ipd.dto;

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
@Table(name="bed_master")
public class BedMaster {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)	
	@Column(name="id")
	private int id;
	
	@Column(name = "self_id")
	private int selfId;
	
	@Column(name="category_name")
	private String categoryName;
	
	@Column(name="bed_name")
	private String bed_name;
	
	@Column(name="is_category")
	private String isCategory;
	
	@Column(name="idbedstate",columnDefinition="varchar(2) default '4'")
	private String bedstate="4";

	@Column(name = "created_by",updatable=false)
	private int createdBy;

	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Column(name = "updated_by")
	private int updatedBy;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private int deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;	
	
	@Transient
	private List<BedMaster> bedList;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getSelfId() {
		return selfId;
	}

	public void setSelfId(Integer selfId) {
		this.selfId = selfId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getBed_name() {
		return bed_name;
	}

	public void setBed_name(String bed_name) {
		this.bed_name = bed_name;
	}

	public String getIsCategory() {
		return isCategory;
	}

	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
	}

	public String getBedstate() {
		return bedstate;
	}

	public void setBedstate(String bedstate) {
		this.bedstate = bedstate;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<BedMaster> getBedList() {
		return bedList;
	}

	public void setBedList(List<BedMaster> bedList) {
		this.bedList = bedList;
	}
}
