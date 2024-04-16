package com.hms.administrator.dto;

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
@Table(name = "hmis_lab_organs")
public class LabOrgansDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private int labOrganId;
	@Column(name = "lab_organ_name")
	private String labOrganName;
	@Column(name = "unit_id")
	private int unitId;
	@Column(name = "deleted_status", length = 2)
	private String deleted = "N";
	@Column(name = "created_by")
	private int createdBy;
	@Column(name = "updated_by")
	private int updatedBy;
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date", updatable = false) 
	private Date createDate;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date") 
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date") 
	private Date deletedDate;
	
	@Transient
	private List<LabOrgansDto> labOrgansList;

	
	public int getLabOrganId() {
		return labOrganId;
	}

	public void setLabOrganId(int labOrganId) {
		this.labOrganId = labOrganId;
	}

	public String getLabOrganName() {
		return labOrganName;
	}

	public void setLabOrganName(String labOrganName) {
		this.labOrganName = labOrganName;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
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

	public List<LabOrgansDto> getLabOrgansList() {
		return labOrgansList;
	}

	public void setLabOrgansList(List<LabOrgansDto> labOrgansList) {
		this.labOrgansList = labOrgansList;
	}


	@Override
	public String toString() {
		return "LabOrgansDto [labOrganId=" + labOrganId + ", labOrganName=" + labOrganName + ", unitId=" + unitId
				+ ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedBy="
				+ deletedBy + ", createDate=" + createDate + ", updatedDate=" + updatedDate + ", deletedDate="
				+ deletedDate + ", labOrgansList=" + labOrgansList + "]";
	}
}