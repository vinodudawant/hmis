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
@Table(name="pathology_template_master")
public class PathologyTemplateMasterDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "template_id")
	private Integer templateId;

	@Column(name = "template_name")
	private String templateName;
	
	@Column(name = "template_data",columnDefinition="BLOB")
	private String templateData;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	

	@Column(name = "unit_id", columnDefinition="int(11) default 0")
	private Integer unitId;


	@Column(name = "profile_id", columnDefinition="int(11) default 0")
	private Integer profileId;


	@Column(name = "sample_id", columnDefinition="int(11) default 0")
	private Integer sampleId;
	
	@Column(name = "sample_name")
	private String sampleName;
	
	@Column(name = "heading_id", columnDefinition="int(11) default 0")
	private Integer headingId;
	
	@Column(name = "heading_name")
	private String headingName;


	@Column(name = "template_default",columnDefinition="varchar(2) default 'N'")
	private String templateDefault;

	

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Transient
	private List<PathologyTemplateMasterDTO> pathologytemplateList;

	public Integer getTemplateId() {
		return templateId;
	}

	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	public String getTemplateData() {
		return templateData;
	}

	public void setTemplateData(String templateData) {
		this.templateData = templateData;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
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

	public List<PathologyTemplateMasterDTO> getPathologytemplateList() {
		return pathologytemplateList;
	}

	public void setPathologytemplateList(List<PathologyTemplateMasterDTO> pathologytemplateList) {
		this.pathologytemplateList = pathologytemplateList;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	

	public Integer getProfileId() {
		return profileId;
	}

	public void setProfileId(Integer profileId) {
		this.profileId = profileId;
	}

	public Integer getSampleId() {
		return sampleId;
	}

	public void setSampleId(Integer sampleId) {
		this.sampleId = sampleId;
	}


	public Integer getHeadingId() {
		return headingId;
	}

	public void setHeadingId(Integer headingId) {
		this.headingId = headingId;
	}

	public String getSampleName() {
		return sampleName;
	}

	public void setSampleName(String sampleName) {
		this.sampleName = sampleName;
	}

	public String getHeadingName() {
		return headingName;
	}

	public void setHeadingName(String headingName) {
		this.headingName = headingName;
	}

	public String getTemplateDefault() {
		return templateDefault;
	}

	public void setTemplateDefault(String templateDefault) {
		this.templateDefault = templateDefault;
	}

	
	
	
	
	
	

	
	
	
}
