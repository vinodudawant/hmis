package com.hms.ehat.dto;

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
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pathology_laborgans")
public class LabOrgansDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	protected Integer idlabOrgans;

	@Column(name = "organName")
	protected String organName;

	@Column(name = "orgStatus", length = 2)
	protected String orgStatus = "Y";

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Column(name = "update_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	@Transient
	private List<LabOrgansDTO> labOrgansList;

	public Integer getIdlabOrgans() {
		return idlabOrgans;
	}

	public void setIdlabOrgans(Integer idlabOrgans) {
		this.idlabOrgans = idlabOrgans;
	}

	public String getOrganName() {
		return organName;
	}

	public void setOrganName(String organName) {
		this.organName = organName;
	}

	public String getOrgStatus() {
		return orgStatus;
	}

	public void setOrgStatus(String orgStatus) {
		this.orgStatus = orgStatus;
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

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<LabOrgansDTO> getLabOrgansList() {
		return labOrgansList;
	}

	public void setLabOrgansList(List<LabOrgansDTO> labOrgansList) {
		this.labOrgansList = labOrgansList;
	}

	@Override
	public String toString() {
		return "LabOrgansDTO [idlabOrgans=" + idlabOrgans + ", organName="
				+ organName + ", orgStatus=" + orgStatus + ", unitId=" + unitId
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedBy=" + deletedBy + ", createDate=" + createDate
				+ ", updatedDate=" + updatedDate + ", deletedDate="
				+ deletedDate + ", labOrgansList=" + labOrgansList + "]";
	}
}
