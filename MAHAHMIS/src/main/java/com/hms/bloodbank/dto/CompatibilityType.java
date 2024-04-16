package com.hms.bloodbank.dto;

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
@Table(name = "bb_compatibility_type_master")
public class CompatibilityType implements Serializable{

	private static final long serialVersionUID = -2033999004466095367L;

	@Id
	@GeneratedValue
	@Column(name = "id_compatibility_type")
	private int compatibilityTypeId;
	
	@Column(name = "compatibility_type")
	private String compatibilityType;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_datetime", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_datetime")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_datetime")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "compatibility_type_ip")
	private String ipAddress = null;
	
	@Transient
	private List<CompatibilityType> listCompatibilityType;

	public int getCompatibilityTypeId() {
		return compatibilityTypeId;
	}

	public void setCompatibilityTypeId(int compatibilityTypeId) {
		this.compatibilityTypeId = compatibilityTypeId;
	}

	public String getCompatibilityType() {
		return compatibilityType;
	}

	public void setCompatibilityType(String compatibilityType) {
		this.compatibilityType = compatibilityType;
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

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public List<CompatibilityType> getListCompatibilityType() {
		return listCompatibilityType;
	}

	public void setListCompatibilityType(
			List<CompatibilityType> listCompatibilityType) {
		this.listCompatibilityType = listCompatibilityType;
	}

	@Override
	public String toString() {
		return "CompatibilityType [compatibilityTypeId=" + compatibilityTypeId
				+ ", compatibilityType=" + compatibilityType + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", deletedBy=" + deletedBy
				+ ", unitId=" + unitId + ", status=" + status + ", ipAddress="
				+ ipAddress + ", listCompatibilityType="
				+ listCompatibilityType + "]";
	}
	
	
}
