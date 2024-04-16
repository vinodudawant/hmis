package com.hms.doctordesk.dto;

import java.io.Serializable;
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


@Entity
@Table(name = "opd_finding_master")
public class FindingMaster implements Serializable {
	
	
      private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "finding_master_id")
	private Integer findingMasterId;
	
	@Column(name = "finding_Name")
	private String findingName;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private Integer unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private Integer userId=1;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;	

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	//@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "update_status",columnDefinition="varchar(2) default 'N'")
	private String updateStatus="N";
	
	@Transient
	private List<FindingMaster> lstFindingMaster;

	public Integer getFindingMasterId() {
		return findingMasterId;
	}

	public void setFindingMasterId(Integer findingMasterId) {
		this.findingMasterId = findingMasterId;
	}

	public String getFindingName() {
		return findingName;
	}

	public void setFindingName(String findingName) {
		this.findingName = findingName;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
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

	public String getUpdateStatus() {
		return updateStatus;
	}

	public void setUpdateStatus(String updateStatus) {
		this.updateStatus = updateStatus;
	}

	public List<FindingMaster> getLstFindingMaster() {
		return lstFindingMaster;
	}

	public void setLstFindingMaster(List<FindingMaster> lstFindingMaster) {
		this.lstFindingMaster = lstFindingMaster;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	


}
