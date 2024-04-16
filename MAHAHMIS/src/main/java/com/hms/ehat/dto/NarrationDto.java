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
@Table(name = "narration_master")
public class NarrationDto {
	
	@Id
	@GeneratedValue
	@Column(name = "narr_id")
	private Integer narrId;

	@Column(name = "narr_name")
	private String narrName;
	
	@Column(name = "narr_code")
	private String narrCode;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;	

	@Column(name = "deleted")
	private String deleted="N";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@Transient
	private List<NarrationDto> listNarr;

	public Integer getNarrId() {
		return narrId;
	}

	public String getNarrName() {
		return narrName;
	}

	public String getNarrCode() {
		return narrCode;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}


	public void setNarrId(Integer narrId) {
		this.narrId = narrId;
	}

	public void setNarrName(String narrName) {
		this.narrName = narrName;
	}

	public void setNarrCode(String narrCode) {
		this.narrCode = narrCode;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<NarrationDto> getListNarr() {
		return listNarr;
	}

	public void setListNarr(List<NarrationDto> listNarr) {
		this.listNarr = listNarr;
	}



	
	
	
	
}
