package com.hms.administrator.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;



@Entity
@Table(name = "ehat_ledger_heads")
public class LedgerHead {
	
	@Id
	@GeneratedValue
	@Column(name = "idehat_ledger_heads")
	private Integer ledger_head_ID;
	
	@Column(name = "ledgerHeadName")
	private String ledger_head_name;
	
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

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name ="idehat_expense_voucher_group")
	private ExpenseVoucherGroup expenseVoucherGroup;

	@Transient
	private String voucher_name;
	@Transient
	private Integer voucher_ID;
	@Transient
	private List<LedgerHead> ledger_headList;
	
	
	@JsonGetter("lhID")
	public Integer getLedger_head_ID() {
		return ledger_head_ID;
	}

	@JsonSetter("lhID")
	public void setLedger_head_ID(Integer ledger_head_ID) {
		this.ledger_head_ID = ledger_head_ID;
	}
	
	@JsonGetter("voucher_id")
	public Integer getVoucher_ID() {
		return voucher_ID;
	}
	
	@JsonSetter("voucher_id")
	public void setVoucher_ID(Integer voucher_ID) {
		this.voucher_ID = voucher_ID;
	}
	
	@JsonGetter("voucher_name")
	public String getVoucher_name() {
		return voucher_name;
	}
	
	@JsonSetter("voucher_name")
	public void setVoucher_name(String voucher_name) {
		this.voucher_name = voucher_name;
	}
	
	@JsonGetter("lhName")
	public String getLedger_head_name() {
		return ledger_head_name;
	}
	
	@JsonSetter("lhName")
	public void setLedger_head_name(String ledger_head_name) {
		this.ledger_head_name = ledger_head_name;
	}
	
	@JsonGetter("ledgerHeadList")
	public List<LedgerHead> getLedger_headList() {
		return ledger_headList;
	}
	
	@JsonSetter("ledgerHeadList")
	public void setLedger_headList(List<LedgerHead> ledger_headList) {
		this.ledger_headList = ledger_headList;
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

	public ExpenseVoucherGroup getExpenseVoucherGroup() {
		return expenseVoucherGroup;
	}

	public void setExpenseVoucherGroup(ExpenseVoucherGroup expenseVoucherGroup) {
		this.expenseVoucherGroup = expenseVoucherGroup;
	}


	@Override
	public String toString() {
		return "LedgerHead [ledger_head_ID=" + ledger_head_ID + ", ledger_head_name=" + ledger_head_name + ", unitId="
				+ unitId + ", deleteStatus=" + deleteStatus + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedBy=" + deletedBy + ", createDate=" + createDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", expenseVoucherGroup=" + expenseVoucherGroup + ", voucher_name="
				+ voucher_name + ", voucher_ID=" + voucher_ID + ", ledger_headList=" + ledger_headList + "]";
	}
}