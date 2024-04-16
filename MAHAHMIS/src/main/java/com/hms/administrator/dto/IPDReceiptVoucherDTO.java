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

@Entity 
@Table(name = "ehat_ipd_receipt_voucher")
public class IPDReceiptVoucherDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "receipt_voucher_id")
	private int receiptVoucherId;
	
	@Column(name = "company_name")
	private String companyName;
	
	@Column(name = "payment_mode",columnDefinition="int default 0")
	private int paymentMode=0;
	
	@Column(name = "ref_to",columnDefinition="int default 0")
	private int refTo=0;
	
	@Column(name = "received_from")
	private String receivedFrom="-";
	
	@Column(name = "amount_paid",columnDefinition="int default 0")
	private double amountPaid=0;
	
	@Column(name = "amount_in_words",columnDefinition="varchar(255) default '-'")
	private String amountInWords;
	
	@Column(name = "amount",columnDefinition="int default 0")
	private double amount=0;
	
	@Column(name = "cheque_no",columnDefinition="int default 0")
	private int chequeNo;

	@Column(name = "voucher_status",columnDefinition="varchar(2) default 'N'")
	private char voucherStatus='N';
	
	@Column(name = "remark",columnDefinition="varchar(500) default '-'")
	private String remark;
	
	@Column(name = "group_id",columnDefinition="int default 0")
	private int groupId=0;
	
	@Column(name = "ledger_head_id",columnDefinition="int default 0")
	private Integer ledgerHeadId=0;
	
	@Column(name = "insert_by",columnDefinition="int default 0")
	private int insertBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "insert_date_time",updatable=false)
	private Date insertDateTime;
	
	
	@Column(name = "updated_by",columnDefinition="int default 0")
	private int updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	
	@Column(name = "deleted_by",columnDefinition="int default 0")
	private int deletedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deleteDatetime;

	@Column(name = "cancel_flag",columnDefinition="varchar(2) default 'N'")
	private char cancelFlag='N';
	
	@Column(name = "canceled_by",columnDefinition="int default 0")
	private int canceledBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "cancel_date_time")
	private Date cancelDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId;
	
	@Transient
	private List<IPDReceiptVoucherDTO> listIPDReceiptVoucherDTO;
	
	@Transient
	private String payName;
	
	@Transient
	private String groupName;
	
	@Transient
	private String ledgerHeadName;

	public int getReceiptVoucherId() {
		return receiptVoucherId;
	}

	public void setReceiptVoucherId(int receiptVoucherId) {
		this.receiptVoucherId = receiptVoucherId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public int getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(int paymentMode) {
		this.paymentMode = paymentMode;
	}

	public int getRefTo() {
		return refTo;
	}

	public void setRefTo(int refTo) {
		this.refTo = refTo;
	}

	public String getReceivedFrom() {
		return receivedFrom;
	}

	public void setReceivedFrom(String receivedFrom) {
		this.receivedFrom = receivedFrom;
	}

	
	public double getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(double amountPaid) {
		this.amountPaid = amountPaid;
	}

	public String getAmountInWords() {
		return amountInWords;
	}

	public void setAmountInWords(String amountInWords) {
		this.amountInWords = amountInWords;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public int getChequeNo() {
		return chequeNo;
	}

	public void setChequeNo(int chequeNo) {
		this.chequeNo = chequeNo;
	}

	public char getVoucherStatus() {
		return voucherStatus;
	}

	public void setVoucherStatus(char voucherStatus) {
		this.voucherStatus = voucherStatus;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public Integer getLedgerHeadId() {
		return ledgerHeadId;
	}

	public void setLedgerHeadId(Integer ledgerHeadId) {
		this.ledgerHeadId = ledgerHeadId;
	}
	
	public Date getInsertDateTime() {
		return insertDateTime;
	}

	public void setInsertDateTime(Date insertDateTime) {
		this.insertDateTime = insertDateTime;
	}

	public int getInsertBy() {
		return insertBy;
	}

	public void setInsertBy(int insertBy) {
		this.insertBy = insertBy;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeleteDatetime() {
		return deleteDatetime;
	}

	public void setDeleteDatetime(Date deleteDatetime) {
		this.deleteDatetime = deleteDatetime;
	}

	public char getCancelFlag() {
		return cancelFlag;
	}

	public void setCancelFlag(char cancelFlag) {
		this.cancelFlag = cancelFlag;
	}

	public int getCanceledBy() {
		return canceledBy;
	}

	public void setCanceledBy(int canceledBy) {
		this.canceledBy = canceledBy;
	}

	public Date getCancelDateTime() {
		return cancelDateTime;
	}

	public void setCancelDateTime(Date cancelDateTime) {
		this.cancelDateTime = cancelDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public List<IPDReceiptVoucherDTO> getListIPDReceiptVoucherDTO() {
		return listIPDReceiptVoucherDTO;
	}

	public void setListIPDReceiptVoucherDTO(
			List<IPDReceiptVoucherDTO> listIPDReceiptVoucherDTO) {
		this.listIPDReceiptVoucherDTO = listIPDReceiptVoucherDTO;
	}

	public String getPayName() {
		return payName;
	}

	public void setPayName(String payName) {
		this.payName = payName;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getLedgerHeadName() {
		return ledgerHeadName;
	}

	public void setLedgerHeadName(String ledgerHeadName) {
		this.ledgerHeadName = ledgerHeadName;
	}
}
