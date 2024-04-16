package com.hms.pathology.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pathology_labtest_generalvalues")
public class LabTestGeneralValueDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer idGeneralValue;

	@Column(name = "test_general")
	private String testGeneral;
	
	//added by Rohit on 12-09-2021
	@Column(name = "general_type")
	private String generalType;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="idLabUnit",unique = false)
	private LabUnitTypeDTO labUnit;
	
	@Column(name = "unit_id")
	private String unitId;
	
	@Column(name = "deleted", length = 2)
	private String deleted = "N";
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private int deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Transient
	private Integer generalValueId;
	
	@Transient
	private List<LabTestGeneralValueDto> generalValuesList;

	
	public Integer getIdGeneralValue() {
		return idGeneralValue;
	}

	public void setIdGeneralValue(Integer idGeneralValue) {
		this.idGeneralValue = idGeneralValue;
	}

	public String getTestGeneral() {
		return testGeneral;
	}

	public void setTestGeneral(String testGeneral) {
		this.testGeneral = testGeneral;
	}

	public String getUnitId() {
		return unitId;
	}

	public void setUnitId(String unitId) {
		this.unitId = unitId;
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

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
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

	public Integer getGeneralValueId() {
		return generalValueId;
	}

	public void setGeneralValueId(Integer generalValueId) {
		this.generalValueId = generalValueId;
	}

	public List<LabTestGeneralValueDto> getGeneralValuesList() {
		return generalValuesList;
	}

	public void setGeneralValuesList(List<LabTestGeneralValueDto> generalValuesList) {
		this.generalValuesList = generalValuesList;
	}

	public LabUnitTypeDTO getLabUnit() {
		return labUnit;
	}

	public void setLabUnit(LabUnitTypeDTO labUnit) {
		this.labUnit = labUnit;
	}

	public String getGeneralType() {
		return generalType;
	}

	public void setGeneralType(String generalType) {
		this.generalType = generalType;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "LabTestGeneralValueDto [idGeneralValue=" + idGeneralValue
				+ ", testGeneral=" + testGeneral + ", generalType="
				+ generalType + ", labUnit=" + labUnit + ", unitId=" + unitId
				+ ", deleted=" + deleted + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy
				+ ", createDate=" + createDate + ", updatedDate=" + updatedDate
				+ ", generalValueId=" + generalValueId + ", generalValuesList="
				+ generalValuesList + "]";
	}

	
	
}