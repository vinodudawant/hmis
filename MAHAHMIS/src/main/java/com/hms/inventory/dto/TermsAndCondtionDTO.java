package com.hms.inventory.dto;

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
@Table(name="ehat_termsandcondition_doc")
public class TermsAndCondtionDTO {
	@Id
	@GeneratedValue
	@Column(name = "termcondition_id")
	private Integer termConditionId;
	
	@Column(name = "terms_condition_name",columnDefinition="text" )
	private String termconditionName;
	
	@Column(name = "heading_name")
	private String headingName;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	@UpdateTimestamp
	private Date updatedDate;
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<TermsAndCondtionDTO> lsttermcondition;

	public Integer getTermConditionId() {
		return termConditionId;
	}

	public void setTermConditionId(Integer termConditionId) {
		this.termConditionId = termConditionId;
	}

	public String getTermconditionName() {
		return termconditionName;
	}

	public void setTermconditionName(String termconditionName) {
		this.termconditionName = termconditionName;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public String getHeadingName() {
		return headingName;
	}

	public void setHeadingName(String headingName) {
		this.headingName = headingName;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public List<TermsAndCondtionDTO> getLsttermcondition() {
		return lsttermcondition;
	}

	public void setLsttermcondition(List<TermsAndCondtionDTO> lsttermcondition) {
		this.lsttermcondition = lsttermcondition;
	}

}
