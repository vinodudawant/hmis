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
@Table(name = "profees_group_master")
public class GroupMasterDto {

	@Id
	@GeneratedValue
	@Column(name = "group_master_id")
	private int groupMasterId;
	
	@Column(name = "group_name")
	private String groupName;
	
	@Column(name = "equal_percent")
	private double equalPercent=0.0;
	
	@Column(name = "individual_percent")
	private double individualPercent=0.0;
	
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
	private List<GroupMasterDto> listGroupMaster;

	public int getGroupMasterId() {
		return groupMasterId;
	}

	public void setGroupMasterId(int groupMasterId) {
		this.groupMasterId = groupMasterId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public double getEqualPercent() {
		return equalPercent;
	}

	public void setEqualPercent(double equalPercent) {
		this.equalPercent = equalPercent;
	}

	public double getIndividualPercent() {
		return individualPercent;
	}

	public void setIndividualPercent(double individualPercent) {
		this.individualPercent = individualPercent;
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

	public List<GroupMasterDto> getListGroupMaster() {
		return listGroupMaster;
	}

	public void setListGroupMaster(List<GroupMasterDto> listGroupMaster) {
		this.listGroupMaster = listGroupMaster;
	}
	
	
}