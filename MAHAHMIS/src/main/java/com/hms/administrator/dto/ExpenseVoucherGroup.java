package com.hms.administrator.dto;

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

import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "ehat_expense_voucher_group")
public class ExpenseVoucherGroup {
	
	@Id
	@GeneratedValue
	@Column(name = "idehat_expense_voucher_group")
	private Integer voucher_ID;
	
	@Column(name = "voucher_name")
	private String voucherName;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "status", length = 2)
	private String deleteStatus = "Y";
	
	@Column(name = "assigned_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "assign_date_time", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	@Transient
	private List<ExpenseVoucherGroup> voucherList;
	
	@JsonProperty("voucher_id")
	public Integer getVoucher_ID() {
		return voucher_ID;
	}

	@JsonProperty("voucher_id")
	public void setVoucher_ID(Integer voucher_ID) {
		this.voucher_ID = voucher_ID;
	}
	
	@JsonProperty("voucher_name")
	public String getVoucherName() {
		return voucherName;
	}
	
	@JsonSetter("voucher_name")
	public void setVoucherName(String voucherName) {
		this.voucherName = voucherName;
	}
	
	@JsonProperty("voucherList")
	public List<ExpenseVoucherGroup> getVoucherList() {
		return voucherList;
	}
	
	@JsonProperty("voucherList")
	public void setVoucherList(List<ExpenseVoucherGroup> voucherList) {
		this.voucherList = voucherList;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getDeleteStatus() {
		return deleteStatus;
	}

	public void setDeleteStatus(String deleteStatus) {
		this.deleteStatus = deleteStatus;
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


	@Override
	public String toString() {
		return "ExpenseVoucherGroup [voucher_ID=" + voucher_ID + ", voucherName=" + voucherName + ", unitId=" + unitId
				+ ", deleteStatus=" + deleteStatus + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedBy=" + deletedBy + ", createDate=" + createDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", voucherList=" + voucherList + "]";
	}
}
