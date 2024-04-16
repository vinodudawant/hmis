package com.hms.administrator.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@SuppressWarnings("deprecation")
@Entity
@Table(name="ehat_vouchers")
public class AdminCashVoucherDTO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "voucherid", columnDefinition="default 0")
	private int voucherId;
	
	@Column(name = "amount")
	private double amount;
	
	@Column(name = "vouchertype")
	private String voucherType;
	
	@Column(name = "payto")
	private String payTo;
	
	@Column(name = "groupname")
	private String groupName;
	
	@Column(name = "ledgerhead")
	private String ledgerHead;
	
	@Column(name = "referedto")
	private String referedTo;
	
	@Column(name = "autherisedby")
	private String authorisedBy;
	
	@Column(name = "narration",columnDefinition="TEXT")
	private String narration;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "cancelflag")
	private String cancelflag="N";
	
	@CreationTimestamp
	@Column(name = "createddate", updatable = false)
	private Date createdDate;
	
	@UpdateTimestamp
	@Column(name = "updateddate")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleteddate")
	private Date deleteddate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "group_name_id")
	private int groupNameId;
	
	@Column(name = "ledger_head_id")
	private int ledgerHeadId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Transient
	private List<AdminCashVoucherDTO> cashVouchersList;

	@Transient
	String authByName;

	public int getVoucherId() {
		return voucherId;
	}

	public void setVoucherId(int voucherId) {
		this.voucherId = voucherId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getVoucherType() {
		return voucherType;
	}

	public void setVoucherType(String voucherType) {
		this.voucherType = voucherType;
	}

	public String getPayTo() {
		return payTo;
	}

	public void setPayTo(String payTo) {
		this.payTo = payTo;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getLedgerHead() {
		return ledgerHead;
	}

	public void setLedgerHead(String ledgerHead) {
		this.ledgerHead = ledgerHead;
	}

	public String getReferedTo() {
		return referedTo;
	}

	public void setReferedTo(String referedTo) {
		this.referedTo = referedTo;
	}

	public String getAuthorisedBy() {
		return authorisedBy;
	}

	public void setAuthorisedBy(String authorisedBy) {
		this.authorisedBy = authorisedBy;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCancelflag() {
		return cancelflag;
	}

	public void setCancelflag(String cancelflag) {
		this.cancelflag = cancelflag;
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

	public Date getDeleteddate() {
		return deleteddate;
	}

	public void setDeleteddate(Date deleteddate) {
		this.deleteddate = deleteddate;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	//@JsonProperty("cashVouchersList")
	public List<AdminCashVoucherDTO> getCashVouchersList() {
		return cashVouchersList;
	}

	//@JsonProperty("cashVouchersList")
	public void setCashVouchersList(List<AdminCashVoucherDTO> cashVouchersList) {
		this.cashVouchersList = cashVouchersList;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public int getGroupNameId() {
		return groupNameId;
	}

	public void setGroupNameId(int groupNameId) {
		this.groupNameId = groupNameId;
	}

	public int getLedgerHeadId() {
		return ledgerHeadId;
	}

	public void setLedgerHeadId(int ledgerHeadId) {
		this.ledgerHeadId = ledgerHeadId;
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

	public String getAuthByName() {
		return authByName;
	}

	public void setAuthByName(String authByName) {
		this.authByName = authByName;
	}

	@Override
	public String toString() {
		return "AdminCashVoucherDTO [voucherId=" + voucherId + ", amount=" + amount + ", voucherType=" + voucherType
				+ ", payTo=" + payTo + ", groupName=" + groupName + ", ledgerHead=" + ledgerHead + ", referedTo="
				+ referedTo + ", authorisedBy=" + authorisedBy + ", narration=" + narration + ", status=" + status
				+ ", cancelflag=" + cancelflag + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate
				+ ", deleteddate=" + deleteddate + ", unitId=" + unitId + ", deleted=" + deleted + ", groupNameId="
				+ groupNameId + ", ledgerHeadId=" + ledgerHeadId + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", cashVouchersList=" + cashVouchersList + ", authByName=" + authByName + "]";
	}

	
	

}
