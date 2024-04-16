package com.hms.ehat.dto;

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

@Entity
@Table(name = "profees_dynamic_group_master")
public class DynamicGroupMasterDto {

	@Id
	@GeneratedValue
	@Column(name = "d_master_id")
	private int dMasterId;
	
	@Column(name = "d_group_name")
	private String dGroupName;
	
	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "created_date",updatable=false)
	private Date createdDate;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Transient
	private List<DynamicGroupMasterDto> listDynamicGroupMaster;

	public int getdMasterId() {
		return dMasterId;
	}

	public void setdMasterId(int dMasterId) {
		this.dMasterId = dMasterId;
	}

	public String getdGroupName() {
		return dGroupName;
	}

	public void setdGroupName(String dGroupName) {
		this.dGroupName = dGroupName;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public List<DynamicGroupMasterDto> getListDynamicGroupMaster() {
		return listDynamicGroupMaster;
	}

	public void setListDynamicGroupMaster(
			List<DynamicGroupMasterDto> listDynamicGroupMaster) {
		this.listDynamicGroupMaster = listDynamicGroupMaster;
	}
	
	
}
