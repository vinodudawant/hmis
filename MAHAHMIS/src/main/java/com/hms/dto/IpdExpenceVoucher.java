package com.hms.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.hms.dao.ExpenseVoucherGroup;
import com.hms.dao.LedgerHead;
import com.hms.ehat.dto.PharmaConsumtionSlaveDTO;


//@Entity
//@Component
//@Table(name="ipdexpencevoucher")
public class IpdExpenceVoucher {
	/*
	 * 
	 * @Id
	 * 
	 * @GeneratedValue
	 * 
	 * @Column(name = "idipdExpenceVoucher") private Integer idipdExpenceVoucher;
	 * 
	 * @Column(name = "voucherDate") private String voucherDate;
	 * 
	 * @Column(name = "voucherTime") private String voucherTime;
	 * 
	 * @Column(name = "companyName") private String companyName;
	 * 
	 * @Column(name = "paymentMode") private String paymentMode;
	 * 
	 * @Column(name = "refTo") private String refTo;
	 * 
	 * @Column(name = "paymentTo") private String paymentTo;
	 * 
	 * @Column(name = "paidAmount") private Double paidAmount;
	 * 
	 * @Column(name = "amountInWords") private String amountInWords;
	 * 
	 * @Column(name = "amount") private Double amount;
	 * 
	 * @Column(name = "chequeNumber") private Integer chequeNumber;
	 * 
	 * @Column(name = "voucherStatus",columnDefinition="varchar(2) default 'Y'")
	 * private String voucherStatus;
	 * 
	 * @Column(name = "remark") private String remark;
	 * 
	 * 
	 * @LazyCollection(value = LazyCollectionOption.FALSE)
	 * 
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "groupId", nullable =
	 * false,insertable=false,updatable=false ) private ExpenseVoucherGroup
	 * ExpenseVoucherGroup;
	 * 
	 * 
	 * @Column(name = "groupId") private Integer grpid;
	 * 
	 * 
	 * @LazyCollection(value = LazyCollectionOption.FALSE)
	 * 
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "ledgerHeadid", nullable =
	 * false,insertable=false,updatable=false ) private LedgerHead LedgerHead;
	 * 
	 * @Column(name = "ledgerHeadid") private Integer ledgerHeadid;
	 * 
	 * @Column(name="assigned_by",updatable = false) private Integer assignedBy;
	 * 
	 * @CreationTimestamp
	 * 
	 * @Column(name="assign_date_time") private Date assignDateTime;
	 * 
	 * @Column(name="updated_by") private Integer updatedBy=0;
	 * 
	 * @UpdateTimestamp
	 * 
	 * @Column(name="update_date_time") private Date updateDateTime;
	 * 
	 * @Column(name="deleted_by") private Integer deleted_by;
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "delete_date_time") private Date deleteDateTime;
	 * 
	 * @Column(name = "cancel_flag") private Integer cancel_flag;
	 * 
	 * @Column(name="canceled_by") private Integer canceledBy;
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "cancel_date_time") private Date cancelDateDime;
	 * 
	 * @Column(name="unit_id") private Integer unitId;
	 * 
	 * @Column(name="ledger_head_name") private String ledgerHeadname;
	 * 
	 * @Column(name="group_name") private String grpname;
	 * 
	 * @Column(name="pay_mode_name") private String payModeName;
	 * 
	 * @Transient private String userName;
	 * 
	 * 
	 * 
	 * 
	 * @Transient private String payName;
	 * 
	 * @Transient private List<IpdExpenceVoucher> ipdExpenceVoucherLi;
	 * 
	 * @Transient private List<ExpenseVoucherGroup> voucherList;
	 * 
	 * @JsonGetter("grpnm") public String getGrpname() { return grpname; }
	 * 
	 * @JsonSetter("grpnm") public void setGrpname(String grpname) { this.grpname =
	 * grpname; }
	 * 
	 * @JsonGetter("ledgerheadnm") public String getLedgerHeadname() { return
	 * ledgerHeadname; }
	 * 
	 * @JsonSetter("ledgerheadnm") public void setLedgerHeadname(String
	 * ledgerHeadname) { this.ledgerHeadname = ledgerHeadname; }
	 * 
	 * @JsonGetter("idgrp") public Integer getGrpid() { return grpid; }
	 * 
	 * @JsonSetter("idgrp") public void setGrpid(Integer grpid) { this.grpid =
	 * grpid; }
	 * 
	 * @JsonGetter("idlh") public Integer getLedgerHeadid() { return ledgerHeadid; }
	 * 
	 * @JsonSetter("idlh") public void setLedgerHeadid(Integer ledgerHeadid) {
	 * this.ledgerHeadid = ledgerHeadid; }
	 * 
	 * @JsonGetter("ipdExpenseLi") public List<IpdExpenceVoucher>
	 * getIpdExpenceVoucherLi() { return ipdExpenceVoucherLi; }
	 * 
	 * @JsonSetter("ipdExpenseLi") public void setIpdExpenceVoucherLi(
	 * List<IpdExpenceVoucher> ipdExpenceVoucherLi) { this.ipdExpenceVoucherLi =
	 * ipdExpenceVoucherLi; }
	 * 
	 * @JsonGetter("idipdExpense") public Integer getIdipdExpenceVoucher() { return
	 * idipdExpenceVoucher; }
	 * 
	 * @JsonSetter("idipdExpense") public void setIdipdExpenceVoucher(Integer
	 * idipdExpenceVoucher) { this.idipdExpenceVoucher = idipdExpenceVoucher; }
	 * 
	 * @JsonGetter("voucherDate") public String getVoucherDate() { return
	 * voucherDate; }
	 * 
	 * @JsonSetter("voucherDate") public void setVoucherDate(String voucherDate) {
	 * this.voucherDate = voucherDate; }
	 * 
	 * @JsonGetter("paymode") public String getPaymentMode() { return paymentMode; }
	 * 
	 * @JsonSetter("paymode") public void setPaymentMode(String paymentMode) {
	 * this.paymentMode = paymentMode; }
	 * 
	 * @JsonGetter("chequeNumber") public Integer getChequeNumber() { return
	 * chequeNumber; }
	 * 
	 * @JsonSetter("chequeNumber") public void setChequeNumber(Integer chequeNumber)
	 * { this.chequeNumber = chequeNumber; }
	 * 
	 * @JsonGetter("ipdCompName") public String getCompanyName() { return
	 * companyName; }
	 * 
	 * @JsonSetter("ipdCompName") public void setCompanyName(String companyName) {
	 * this.companyName = companyName; }
	 * 
	 * @JsonGetter("ipdPayTo") public String getPaymentTo() { return paymentTo; }
	 * 
	 * @JsonSetter("ipdPayTo") public void setPaymentTo(String paymentTo) {
	 * this.paymentTo = paymentTo; }
	 * 
	 * @JsonGetter("ipdPaidAmt") public Double getPaidAmount() { return paidAmount;
	 * }
	 * 
	 * @JsonSetter("ipdPaidAmt") public void setPaidAmount(Double paidAmount) {
	 * this.paidAmount = paidAmount; }
	 * 
	 * @JsonGetter("ipdAmtInWords") public String getAmountInWords() { return
	 * amountInWords; }
	 * 
	 * @JsonSetter("ipdAmtInWords") public void setAmountInWords(String
	 * amountInWords) { this.amountInWords = amountInWords; }
	 * 
	 * @JsonGetter("amount") public Double getAmount() { return amount; }
	 * 
	 * @JsonSetter("amount") public void setAmount(Double amount) { this.amount =
	 * amount; }
	 * 
	 * @JsonGetter("voucherStatus") public String getVoucherStatus() { return
	 * voucherStatus; }
	 * 
	 * @JsonSetter("voucherStatus") public void setVoucherStatus(String
	 * voucherStatus) { this.voucherStatus = voucherStatus; }
	 * 
	 * @JsonGetter("remark") public String getRemark() { return remark; }
	 * 
	 * @JsonSetter("remark") public void setRemark(String remark) { this.remark =
	 * remark; }
	 * 
	 * @JsonGetter("refTo") public String getRefTo() { return refTo; }
	 * 
	 * @JsonSetter("refTo") public void setRefTo(String refTo) { this.refTo = refTo;
	 * }
	 * 
	 * @JsonGetter("cancel_flag") public Integer getCancel_flag() { return
	 * cancel_flag; }
	 * 
	 * @JsonSetter("cancel_flag") public void setCancel_flag(Integer cancel_flag) {
	 * this.cancel_flag = cancel_flag; }
	 * 
	 * @JsonGetter("payName") public String getPayName() { return payName; }
	 * 
	 * @JsonSetter("payName") public void setPayName(String payName) { this.payName
	 * = payName; }
	 * 
	 * public String getVoucherTime() { return voucherTime; } public void
	 * setVoucherTime(String voucherTime) { this.voucherTime = voucherTime; } public
	 * Integer getAssignedBy() { return assignedBy; } public void
	 * setAssignedBy(Integer assignedBy) { this.assignedBy = assignedBy; } public
	 * Date getAssignDateTime() { return assignDateTime; } public void
	 * setAssignDateTime(Date assignDateTime) { this.assignDateTime =
	 * assignDateTime; } public Integer getUpdatedBy() { return updatedBy; } public
	 * void setUpdatedBy(Integer updatedBy) { this.updatedBy = updatedBy; } public
	 * Date getUpdateDateTime() { return updateDateTime; } public void
	 * setUpdateDateTime(Date updateDateTime) { this.updateDateTime =
	 * updateDateTime; } public Integer getDeleted_by() { return deleted_by; }
	 * public void setDeleted_by(Integer deleted_by) { this.deleted_by = deleted_by;
	 * } public Date getDeleteDateTime() { return deleteDateTime; } public void
	 * setDeleteDateTime(Date deleteDateTime) { this.deleteDateTime =
	 * deleteDateTime; } public Integer getCanceledBy() { return canceledBy; }
	 * public void setCanceledBy(Integer canceledBy) { this.canceledBy = canceledBy;
	 * } public Date getCancelDateDime() { return cancelDateDime; } public void
	 * setCancelDateDime(Date cancelDateDime) { this.cancelDateDime =
	 * cancelDateDime; } public Integer getUnitId() { return unitId; } public void
	 * setUnitId(Integer unitId) { this.unitId = unitId; } public
	 * List<ExpenseVoucherGroup> getVoucherList() { return voucherList; } public
	 * void setVoucherList(List<ExpenseVoucherGroup> voucherList) { this.voucherList
	 * = voucherList; } public ExpenseVoucherGroup getExpenseVoucherGroup() { return
	 * ExpenseVoucherGroup; } public void setExpenseVoucherGroup(ExpenseVoucherGroup
	 * expenseVoucherGroup) { ExpenseVoucherGroup = expenseVoucherGroup; } public
	 * LedgerHead getLedgerHead() { return LedgerHead; } public void
	 * setLedgerHead(LedgerHead ledgerHead) { LedgerHead = ledgerHead; } public
	 * String getUserName() { return userName; } public void setUserName(String
	 * userName) { this.userName = userName; } public String getPayModeName() {
	 * return payModeName; } public void setPayModeName(String payModeName) {
	 * this.payModeName = payModeName; }
	 * 
	 * 
	 * 
	 * 
	 */}
