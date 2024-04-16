package com.hms.ehat.dto;

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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pathology_report_template_master")
public class LabReportTemplateMasterDto implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer reportTemplateMasterId;

	@Column(name = "template_for", length = 15)
	private String templateFor;
	
	/*@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "profile_id")
	private LabProfileDTO labProfileDTO;*/

	@Column(name = "default_for", length = 15)
	private String defaultFor;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "report_template_master_id",nullable = false)
	private List<LabReportTemplateSlaveDto> LabReportTemplateSlaveList;
	
	/*@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "test_id")
	private LabTestDTO labTestDTO;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "service_id")
	private ServiceMasterDto serviceMasterDto;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "subservice_id")
	private SubServiceDto subServiceDto;*/

	@Column(name = "contents")
	private String contents;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@Column(name = "createdBy")
	private Integer createdBy;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted", length = 2)
	private String deleted = "N";
	
	@Transient
	private Integer serviceId;
	
	@Transient
	private Integer testId;
	
	@Transient
	private String profileIds;
	
	@Transient
	private List<LabReportTemplateMasterDto> reportTemplateList;

	
	public Integer getReportTemplateMasterId() {
		return reportTemplateMasterId;
	}

	public void setReportTemplateMasterId(Integer reportTemplateMasterId) {
		this.reportTemplateMasterId = reportTemplateMasterId;
	}

	public String getTemplateFor() {
		return templateFor;
	}

	public void setTemplateFor(String templateFor) {
		this.templateFor = templateFor;
	}

	public List<LabReportTemplateSlaveDto> getLabReportTemplateSlaveList() {
		return LabReportTemplateSlaveList;
	}

	public void setLabReportTemplateSlaveList(List<LabReportTemplateSlaveDto> labReportTemplateSlaveList) {
		LabReportTemplateSlaveList = labReportTemplateSlaveList;
	}

	public String getDefaultFor() {
		return defaultFor;
	}

	public void setDefaultFor(String defaultFor) {
		this.defaultFor = defaultFor;
	}

	public String getContents() {
		return contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getServiceId() {
		return serviceId;
	}

	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	public String getProfileIds() {
		return profileIds;
	}

	public void setProfileIds(String profileIds) {
		this.profileIds = profileIds;
	}

	public List<LabReportTemplateMasterDto> getReportTemplateList() {
		return reportTemplateList;
	}

	public void setReportTemplateList(List<LabReportTemplateMasterDto> reportTemplateList) {
		this.reportTemplateList = reportTemplateList;
	}

	public Integer getTestId() {
		return testId;
	}

	public void setTestId(Integer testId) {
		this.testId = testId;
	}


	@Override
	public String toString() {
		return "LabReportTemplateMasterDto [reportTemplateMasterId=" + reportTemplateMasterId + ", templateFor="
				+ templateFor + ", defaultFor=" + defaultFor + ", LabReportTemplateSlaveList="
				+ LabReportTemplateSlaveList + ", contents=" + contents + ", unitId=" + unitId + ", createdDate="
				+ createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy
				+ ", deletedDate=" + deletedDate + ", deletedBy=" + deletedBy + ", deleted=" + deleted + ", serviceId="
				+ serviceId + ", testId=" + testId + ", profileIds=" + profileIds + ", reportTemplateList="
				+ reportTemplateList + "]";
	}
}