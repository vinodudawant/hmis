package com.hms.pathology.dto;

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
@Table(name = "pathology_labunittype")
public class LabUnitTypeDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private int idunitType;
	
	@Column(name = "unitName")
	private String unitName;
	
	@Column(name = "unitStatus", length = 2)
	private String unitStatus = "N";
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Column(name = "created_by")
	private int createdBy;
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date")
	private Date deletedDate;

	@Transient
	private List<LabUnitTypeDTO> unitTypeList;
	
	@Transient
	private List<LabUnitTypeDTO> proLi;

	public int getIdunitType() {
		return idunitType;
	}

	public void setIdunitType(int idunitType) {
		this.idunitType = idunitType;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getUnitStatus() {
		return unitStatus;
	}

	public void setUnitStatus(String unitStatus) {
		this.unitStatus = unitStatus;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
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

	public List<LabUnitTypeDTO> getUnitTypeList() {
		return unitTypeList;
	}

	public void setUnitTypeList(List<LabUnitTypeDTO> unitTypeList) {
		this.unitTypeList = unitTypeList;
	}

	public List<LabUnitTypeDTO> getProLi() {
		return proLi;
	}

	public void setProLi(List<LabUnitTypeDTO> proLi) {
		this.proLi = proLi;
	}

	@Override
	public String toString() {
		return "LabUnitTypeDTO [idunitType=" + idunitType + ", unitName="
				+ unitName + ", unitStatus=" + unitStatus + ", unitId="
				+ unitId + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", deletedBy=" + deletedBy + ", createDate="
				+ createDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", unitTypeList="
				+ unitTypeList + "]";
	}

	
}
