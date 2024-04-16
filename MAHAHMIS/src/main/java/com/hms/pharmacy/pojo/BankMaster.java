package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name="pharma_bank_master")
public class BankMaster implements Serializable
{
	@Id
	@GeneratedValue
	@Column(name="bank_id")
	private Integer bankId;
	
	@Column(name="bank_name")
	private String bankName;
	
	@Column(name="bank_opening_debit")
	private Integer  bankOpeningDebit;
	
	@Column(name="bank_opening_credit")
	private Integer  bankOpeningCredit;
	
	@Transient
	private List<BankMaster> ltBankMaster = new ArrayList<BankMaster>();
	
	public List<BankMaster> getLtBankMaster() {
		return ltBankMaster;
	}

	public void setLtBankMaster(List<BankMaster> ltBankMaster) {
		this.ltBankMaster = ltBankMaster;
	}

	@JsonBackReference
	@ManyToMany(mappedBy = "bankMasters")
	//@LazyCollection(LazyCollectionOption.FALSE)
	@JsonIgnoreProperties
	private List<BranchMaster> branchMasters = new ArrayList<BranchMaster>();
	
	@Column(name="bank_delete_flag")
	private Integer  bankDeleteFlag;
	
	/*
	 * @Column(name="bank_update_date") private Date bankUpdateDate;
	 * 
	 * @Column(name = "bank_add_date") private Date bankAddDate;
	 */
	
	@CreationTimestamp
	@Column(name="bank_add_date")
	private Date bankAddDate;
	
	@UpdateTimestamp
	@Column(name="bank_update_date")
	private Date bankUpdateDate;
	
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

	/*@OneToMany
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_bank_id", referencedColumnName = "bank_id")
	private List<ChequeReceiptMaster> chequeReceiptMaster = new ArrayList<ChequeReceiptMaster>();
	
	@OneToMany
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_bank_id1", referencedColumnName = "bank_id")
	private List<ChequeReceiptMaster> chequeReceiptMaster1 = new ArrayList<ChequeReceiptMaster>();
			
	
	public List<ChequeReceiptMaster> getChequeReceiptMaster() {
		return chequeReceiptMaster;
	}

	public void setChequeReceiptMaster(List<ChequeReceiptMaster> chequeReceiptMaster) {
		this.chequeReceiptMaster = chequeReceiptMaster;
	}

	public List<ChequeReceiptMaster> getChequeReceiptMaster1() {
		return chequeReceiptMaster1;
	}

	public void setChequeReceiptMaster1(
			List<ChequeReceiptMaster> chequeReceiptMaster1) {
		this.chequeReceiptMaster1 = chequeReceiptMaster1;
	}
*/
	
	public Date getBankAddDate() {
		return bankAddDate;
	}

	public void setBankAddDate(Date bankAddDate) {
		this.bankAddDate = bankAddDate;
	}

	public Integer getBankId() {
		return bankId;
	}

	public void setBankId(Integer bankid) {
		this.bankId = bankid;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public Integer getBankOpeningDebit() {
		return bankOpeningDebit;
	}

	public void setBankOpeningDebit(Integer bankOpeningDebit) {
		this.bankOpeningDebit = bankOpeningDebit;
	}

	public Integer getBankOpeningCredit() {
		return bankOpeningCredit;
	}

	public void setBankOpeningCredit(Integer bankOpeningCredit) {
		this.bankOpeningCredit = bankOpeningCredit;
	}

	public Integer getBankDeleteFlag() {
		return bankDeleteFlag;
	}

	public void setBankDeleteFlag(Integer bankDeleteFlag) {
		this.bankDeleteFlag = bankDeleteFlag;
	}

	public Date getBankUpdateDate() {
		return bankUpdateDate;
	}

	public void setBankUpdateDate(Date bankUpdateDate) {
		this.bankUpdateDate = bankUpdateDate;
	}
	
	
	public List<BranchMaster> getBranchMasters() {
		return branchMasters;
	}
    

	public void setBranchMasters(List<BranchMaster> branchMasters) {
		this.branchMasters = branchMasters;
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
	
	
}
