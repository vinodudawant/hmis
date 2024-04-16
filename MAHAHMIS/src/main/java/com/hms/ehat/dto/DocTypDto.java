package com.hms.ehat.dto;

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

@Entity
@Table(name = "ehat_doctortype_master")
public class DocTypDto {
	@Id
	@GeneratedValue
	@Column(name = "doctype_id")
	private Integer doctypeId;
	
	@Column(name = "unit_id",columnDefinition = "default=1")
	private Integer unitId=1;

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	@Column(name = "doctype__name")
	private String doctypeName;

	
	@Column(name = "created_by",  updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by" )
	private Integer deletedBy;

	@Column(name = "deleted")
	private String deleted;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@Transient
	private List<DocTypDto> lstDocTyp;

	public Integer getDoctypeId() {
		return doctypeId;
	}

	public void setDoctypeId(Integer doctypeId) {
		this.doctypeId = doctypeId;
	}

	public String getDoctypeName() {
		return doctypeName;
	}

	public void setDoctypeName(String doctypeName) {
		this.doctypeName = doctypeName;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<DocTypDto> getLstDocTyp() {
		return lstDocTyp;
	}

	public void setLstDocTyp(List<DocTypDto> lstDocTyp) {
		this.lstDocTyp = lstDocTyp;
	}

}
