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

import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "inv_purchase_quotation_termandcondition_info")
@JsonDeserialize(as = PurchaseQuotationTermAndConditionDto.class)
public class PurchaseQuotationTermAndConditionDto {
	@Id
	@GeneratedValue
	@Column(name = "term_cond_id")
	private Integer termConditionId;

	@Column(name = "term_condition_address")
	private String termConditionAddress;	
	

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	@Column(name = "updated_date_time")
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
	private List<PurchaseQuotationTermAndConditionDto> lstpurcaseTermConditionInfoDto;

	public Integer getTermConditionId() {
		return termConditionId;
	}

	public void setTermConditionId(Integer termConditionId) {
		this.termConditionId = termConditionId;
	}

	public String getTermConditionAddress() {
		return termConditionAddress;
	}

	public void setTermConditionAddress(String termConditionAddress) {
		this.termConditionAddress = termConditionAddress;
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

	public List<PurchaseQuotationTermAndConditionDto> getLstpurcaseTermConditionInfoDto() {
		return lstpurcaseTermConditionInfoDto;
	}

	public void setLstpurcaseTermConditionInfoDto(
			List<PurchaseQuotationTermAndConditionDto> lstpurcaseTermConditionInfoDto) {
		this.lstpurcaseTermConditionInfoDto = lstpurcaseTermConditionInfoDto;
	}

	

}
