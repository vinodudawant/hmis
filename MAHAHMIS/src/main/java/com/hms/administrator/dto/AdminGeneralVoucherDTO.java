package com.hms.administrator.dto;

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


@SuppressWarnings("deprecation")
@Entity
@Table(name="ehat_general_voucher")
public class AdminGeneralVoucherDTO implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "voucher_id")
	private int voucherID;
	
	@Column(name = "voucher_name")
	private String voucherName;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date")
	private Date deletedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Transient
	private List<AdminGeneralVoucherDTO> voucherList;

	public int getVoucherID() {
		return voucherID;
	}

	public void setVoucherID(int voucherID) {
		this.voucherID = voucherID;
	}

	public String getVoucherName() {
		return voucherName;
	}

	public void setVoucherName(String voucherName) {
		this.voucherName = voucherName;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<AdminGeneralVoucherDTO> getVoucherList() {
		return voucherList;
	}

	public void setVoucherList(List<AdminGeneralVoucherDTO> voucherList) {
		this.voucherList = voucherList;
	}

	@Override
	public String toString() {
		return "AdminGeneralVoucherDTO [voucherID=" + voucherID
				+ ", voucherName=" + voucherName + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDate="
				+ deletedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", unitId=" + unitId + ", status=" + status
				+ ", voucherList=" + voucherList + "]";
	}

	
	
}
