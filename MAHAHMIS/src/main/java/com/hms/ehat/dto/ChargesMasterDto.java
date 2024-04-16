package com.hms.ehat.dto;

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

@Entity
@Table(name = "ehat_charges_master")
public class ChargesMasterDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "charges_id")
	private Integer chargesId;

	@Column(name = "charges_name")
	private String chargesName;

	@Column(name = "code_name")
	private String codeName;

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
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
	private List<ChargesMasterDto> lstCharges;

	public List<ChargesMasterDto> getLstCharges() {
		return lstCharges;
	}

	public void setLstCharges(List<ChargesMasterDto> lstCharges) {
		this.lstCharges = lstCharges;
	}

	public Integer getChargesId() {
		return chargesId;
	}

	public void setChargesId(Integer chargesId) {
		this.chargesId = chargesId;
	}

	public String getChargesName() {
		return chargesName;
	}

	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public void setChargesName(String chargesName) {
		this.chargesName = chargesName;
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

	@Override
	public String toString() {
		return "ChargesMasterDto [chargesId=" + chargesId + ", chargesName=" + chargesName + ", codeName=" + codeName
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy + ", deleted="
				+ deleted + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate + ", deletedDate="
				+ deletedDate + ", lstCharges=" + lstCharges + "]";
	}

}
