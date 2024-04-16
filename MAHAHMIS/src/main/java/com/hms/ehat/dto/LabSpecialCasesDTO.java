package com.hms.ehat.dto;

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
@Table(name ="pathology_specialcase")
public class LabSpecialCasesDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer idSpecialCase;
	
	@Column(name = "special_case_name")
	private String spacialCaseName;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Transient
	List<LabSpecialCasesDTO> specialCaseList;
	

	public Integer getIdSpecialCase() {
		return idSpecialCase;
	}

	public void setIdSpecialCase(Integer idSpecialCase) {
		this.idSpecialCase = idSpecialCase;
	}

	public String getSpacialCaseName() {
		return spacialCaseName;
	}

	public void setSpacialCaseName(String spacialCaseName) {
		this.spacialCaseName = spacialCaseName;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public List<LabSpecialCasesDTO> getSpecialCaseList() {
		return specialCaseList;
	}

	public void setSpecialCaseList(List<LabSpecialCasesDTO> specialCaseList) {
		this.specialCaseList = specialCaseList;
	}

	@Override
	public String toString() {
		return "LabSpecialCasesDTO [idSpecialCase=" + idSpecialCase
				+ ", spacialCaseName=" + spacialCaseName + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", deletedBy="
				+ deletedBy + ", deleted=" + deleted + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", unitId="
				+ unitId + ", specialCaseList=" + specialCaseList + "]";
	}
	

	
}
