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
@Table(name = "pathology_labsample")
public class LabTestSampleDTO implements Serializable {


	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer idTestSample;
	
	@Column(name = "sample_name")
	private String sampleName;
	
	@Column(name = "deleted", length = 2)
	private String deleted = "N";
	
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
	private List<LabTestSampleDTO> testSamplelist;


	public Integer getIdTestSample() {
		return idTestSample;
	}

	public void setIdTestSample(Integer idTestSample) {
		this.idTestSample = idTestSample;
	}

	public String getSampleName() {
		return sampleName;
	}

	public void setSampleName(String sampleName) {
		this.sampleName = sampleName;
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

	public List<LabTestSampleDTO> getTestSamplelist() {
		return testSamplelist;
	}

	public void setTestSamplelist(List<LabTestSampleDTO> testSamplelist) {
		this.testSamplelist = testSamplelist;
	}

	@Override
	public String toString() {
		return "LabTestSampleDTO [idTestSample=" + idTestSample
				+ ", sampleName=" + sampleName + ", deleted=" + deleted
				+ ", unitId=" + unitId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy
				+ ", createDate=" + createDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", testSamplelist="
				+ testSamplelist + "]";
	}
}