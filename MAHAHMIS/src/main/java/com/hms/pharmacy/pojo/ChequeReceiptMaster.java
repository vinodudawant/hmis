package com.hms.pharmacy.pojo;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "pharma_cheque_receipt_master")
public class ChequeReceiptMaster 
{
	@Id
	@GeneratedValue
	@Column(name = "cheque_receipt_id")
	private Integer chequeReceiptId;
	
	
	@Column(name = "cheque_receipt_narration")
	private String chequeReceiptNarration;
	
	@Column(name = "cheque_receipt_amt")
	private Integer chequeReceiptAmt;
	
	@Column(name = "cheque_receipt_cheque_no")
	private String chequeReceiptNo;
	
	
	@Column(name = "cheque_receipt_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date chequeReceiptDate;
	
//	@JsonBackReference
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "cheque_receipt_vendor_id")
	private VendorMaster vendorMaster=new VendorMaster();
	
	//@ManyToOne
	//@LazyCollection(LazyCollectionOption.FALSE)
//	@JsonBackReference
	@ManyToOne(fetch=FetchType.LAZY)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_bank_id")
	private BankMaster bankMaster=new BankMaster();
	
	//@ManyToOne
	//@LazyCollection(LazyCollectionOption.FALSE)
	//@JsonBackReference
	@ManyToOne(fetch=FetchType.EAGER)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_bank_id1")
	private BankMaster bankMaster1=new BankMaster();
	
	//@ManyToOne
//	@LazyCollection(LazyCollectionOption.FALSE)
	//@JsonBackReference
	@ManyToOne(fetch=FetchType.LAZY)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_branch_id")
	private BranchMaster branchMaster=new BranchMaster();
	
	//@ManyToOne
	//@LazyCollection(LazyCollectionOption.FALSE)
	//@JsonBackReference
	@ManyToOne(fetch=FetchType.LAZY)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_branch_id1")
	private BranchMaster branchMaster1=new BranchMaster();
	
	@Column(name = "cheque_receipt_made_by")
	private String chequeReceiptMadeBy;
	
	@Column(name = "cheque_receipt_delete_flag")
	private Integer chequeReceiptDeleteFlag;
	
	/*
	 * @Column(name = "cheque_receipt_update_date") private Date
	 * chequeReceiptUpdateDate;
	 */
	
	
	@CreationTimestamp
	@Column(name="cheque_receipt_add_date")
	private Date chequeReceiptAddDate;
	
	public Date getChequeReceiptAddDate() {
		return chequeReceiptAddDate;
	}

	public void setChequeReceiptAddDate(Date chequeReceiptAddDate) {
		this.chequeReceiptAddDate = chequeReceiptAddDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	@UpdateTimestamp
	@Column(name="chequeReceiptUpdateDate")
	private Date chequeReceiptUpdateDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	public BranchMaster getBranchMaster() {
		return branchMaster;
	}

	public void setBranchMaster(BranchMaster branchMaster) {
		this.branchMaster = branchMaster;
	}

	public BranchMaster getBranchMaster1() {
		return branchMaster1;
	}

	public void setBranchMaster1(BranchMaster branchMaster1) {
		this.branchMaster1 = branchMaster1;
	}
		
	public BankMaster getBankMaster1() {
		return bankMaster1;
	}

	public void setBankMaster1(BankMaster bankMaster1) {
		this.bankMaster1 = bankMaster1;
	}

	public BankMaster getBankMaster() {
		return bankMaster;
	}

	public void setBankMaster(BankMaster bankMaster) {
		this.bankMaster = bankMaster;
	}

		
	public String getChequeReceiptMadeBy() {
		return chequeReceiptMadeBy;
	}

	public void setChequeReceiptMadeBy(String chequeReceiptMadeBy) {
		this.chequeReceiptMadeBy = chequeReceiptMadeBy;
	}
    
	
	public VendorMaster getVendorMaster() {
		return vendorMaster;
	}

	public void setVendorMaster(VendorMaster vendorMaster) {
		this.vendorMaster = vendorMaster;
	}

	
	
	public Integer getChequeReceiptDeleteFlag() {
		return chequeReceiptDeleteFlag;
	}

	public void setChequeReceiptDeleteFlag(Integer chequeReceiptDeleteFlag) {
		this.chequeReceiptDeleteFlag = chequeReceiptDeleteFlag;
	}

	public Date getChequeReceiptUpdateDate() {
		return chequeReceiptUpdateDate;
	}

	public void setChequeReceiptUpdateDate(Date chequeReceiptUpdateDate) {
		this.chequeReceiptUpdateDate = chequeReceiptUpdateDate;
	}

	
   
	public Integer getChequeReceiptId() {
		return chequeReceiptId;
	}

	public void setChequeReceiptId(Integer chequeReceiptId) {
		this.chequeReceiptId = chequeReceiptId;
	}

	
	public String getChequeReceiptNarration() {
		return chequeReceiptNarration;
	}

	public void setChequeReceiptNarration(String chequeReceiptNarration) {
		this.chequeReceiptNarration = chequeReceiptNarration;
	}
	
	public Integer getChequeReceiptAmt() {
		return chequeReceiptAmt;
	}

	public void setChequeReceiptAmt(Integer chequeReceiptAmt) {
		this.chequeReceiptAmt = chequeReceiptAmt;
	}
		
	public String getChequeReceiptNo() {
		return chequeReceiptNo;
	}

	public void setChequeReceiptNo(String chequeReceiptNo) {
		this.chequeReceiptNo = chequeReceiptNo;
	}

	public Date getChequeReceiptDate() {
		return chequeReceiptDate;
	}

	public void setChequeReceiptDate(Date chequeReceiptDate) {
		this.chequeReceiptDate = chequeReceiptDate;
	}
		
}
