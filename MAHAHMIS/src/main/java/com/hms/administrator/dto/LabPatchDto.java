package com.hms.administrator.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "admin_lab_patch")
public class LabPatchDto implements Serializable{

	private static final long serialVersionUID = 1L;

	
	@Id
	@GeneratedValue
	@Column(name = "patch_id")
	private Integer patchId;
	
	@Column(name = "patch_name")
	private String patchName;
	
	@Column(name = "patch_location")
	private String patchLocation;
	
	@Column(name = "patch_labs")
	private String patchLabs;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;
	
	@Column(name = "updated_by")
	private Integer updatedBy;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "deleted")
	private String deleted = "N";

	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<LabPatchDto> labPatchList;

	
	public Integer getPatchId() {
		return patchId;
	}

	public void setPatchId(Integer patchId) {
		this.patchId = patchId;
	}

	public String getPatchName() {
		return patchName;
	}

	public void setPatchName(String patchName) {
		this.patchName = patchName;
	}

	public String getPatchLocation() {
		return patchLocation;
	}

	public void setPatchLocation(String patchLocation) {
		this.patchLocation = patchLocation;
	}

	public String getPatchLabs() {
		return patchLabs;
	}

	public void setPatchLabs(String patchLabs) {
		this.patchLabs = patchLabs;
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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public List<LabPatchDto> getLabPatchList() {
		return labPatchList;
	}

	public void setLabPatchList(List<LabPatchDto> labPatchList) {
		this.labPatchList = labPatchList;
	}


	@Override
	public String toString() {
		return "LabPatchDto [patchId=" + patchId + ", patchName=" + patchName + ", patchLocation=" + patchLocation
				+ ", patchLabs=" + patchLabs + ", createdBy=" + createdBy + ", createdDate=" + createdDate
				+ ", updatedBy=" + updatedBy + ", updatedDate=" + updatedDate + ", deletedBy=" + deletedBy
				+ ", deleted=" + deleted + ", unitId=" + unitId + ", labPatchList=" + labPatchList + "]";
	}
}