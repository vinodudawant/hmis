package com.hms.pathology.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pathology_test_reason")
public class PathologyTestReasonDto implements Serializable  {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer idTestreason;
		
	@Column(name = "test_reason_name")
	private String testReasonName;
		
	@Column(name = "reason_Type")
	private String reasonType;

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

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "sampletype_id") 
	private LabTestSampleDTO labTestSampleType;
	
	@Transient
	private List<PathologyTestReasonDto> testReasonlist;

	
	public Integer getIdTestreason() {
		return idTestreason;
	}
	public void setIdTestreason(Integer idTestreason) {
		this.idTestreason = idTestreason;
	}
	public String getTestReasonName() {
		return testReasonName;
	}
	public void setTestReasonName(String testReasonName) {
		this.testReasonName = testReasonName;
	}
	public String getReasonType() {
		return reasonType;
	}
	public void setReasonType(String reasonType) {
		this.reasonType = reasonType;
	}
	public List<PathologyTestReasonDto> getTestReasonlist() {
		return testReasonlist;
	}
	public void setTestReasonlist(List<PathologyTestReasonDto> testReasonlist) {
		this.testReasonlist = testReasonlist;
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
	public LabTestSampleDTO getLabTestSampleType() {
		return labTestSampleType;
	}
	public void setLabTestSampleType(LabTestSampleDTO labTestSampleType) {
		this.labTestSampleType = labTestSampleType;
	}
}