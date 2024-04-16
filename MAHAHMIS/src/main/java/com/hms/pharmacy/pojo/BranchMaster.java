package com.hms.pharmacy.pojo;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="pharma_branch_master")
public class BranchMaster 
{
	@Id
	@GeneratedValue
	@Column(name="branch_id")
	private Integer branchId;
	
	@Column(name="branch_name")
	private String branchName;
	
	@Column(name="branch_address")
	private String branchAddress;
	
	@Column(name="branch_delete_flag")
	private Integer  branchDeleteFlag;
	
	/*
	 * @Column(name="branch_update_date") private Date branchUpdateDate;
	 */
	
	
	@Column(name="branch_phone")
	private String branchPhone;
	
	@Column(name="branch_mobile_num")
	private String branchMobileNum;
	
	@Column(name="branch_email_id")
	private String branchEmailId;
	
	@JsonBackReference
	@ManyToMany
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinTable(name = "pharma_bank_branch_relation", joinColumns = { @JoinColumn(name = "branch_id") }, inverseJoinColumns = { @JoinColumn(name = "bank_id") })
	private List<BankMaster> bankMasters = new ArrayList<BankMaster>();

	/*
	 * @Column(name = "branch_add_date") private Date branchAddDate;
	 */
	@CreationTimestamp
	@Column(name="branch_add_date")
	private Date branchAddDate;
	@UpdateTimestamp
	@Column(name="branch_update_date")
	private Date branchUpdateDate;
	
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
	public Date getBranchAddDate() {
		return branchAddDate;
	}


	public void setBranchAddDate(Date branchAddDate) {
		this.branchAddDate = branchAddDate;
	}


	/*@OneToMany
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_branch_id", referencedColumnName = "branch_id")
	private List<ChequeReceiptMaster> chequeReceiptMaster2 = new ArrayList<ChequeReceiptMaster>();
	
	@OneToMany
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_branch_id", referencedColumnName = "branch_id")
	private List<ChequeReceiptMaster> chequeReceiptMaster3 = new ArrayList<ChequeReceiptMaster>();
	
	public List<ChequeReceiptMaster> getChequeReceiptMaster2() {
		return chequeReceiptMaster2;
	}


	public void setChequeReceiptMaster2(
			List<ChequeReceiptMaster> chequeReceiptMaster2) {
		this.chequeReceiptMaster2 = chequeReceiptMaster2;
	}


	public List<ChequeReceiptMaster> getChequeReceiptMaster3() {
		return chequeReceiptMaster3;
	}


	public void setChequeReceiptMaster3(
			List<ChequeReceiptMaster> chequeReceiptMaster3) {
		this.chequeReceiptMaster3 = chequeReceiptMaster3;
	}
*/
	public String getBranchPhone() {
		return branchPhone;
	}


	public void setBranchPhone(String branchPhone) {
		this.branchPhone = branchPhone;
	}


	public String getBranchMobileNum() {
		return branchMobileNum;
	}


	public void setBranchMobileNum(String branchMobileNum) {
		this.branchMobileNum = branchMobileNum;
	}


	public String getBranchEmailId() {
		return branchEmailId;
	}


	public void setBranchEmailId(String branchEmailId) {
		this.branchEmailId = branchEmailId;
	}

	@JsonIgnore
	public List<BankMaster> getBankMasters() {
		return bankMasters;
	}

	
	public void setBankMasters(List<BankMaster> bankMasters) {
		this.bankMasters = bankMasters;
	}

	public void setBranchId(Integer branchId) {
		this.branchId = branchId;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getBranchAddress() {
		return branchAddress;
	}

	public void setBranchAddress(String branchAddress) {
		this.branchAddress = branchAddress;
	}

	public Integer getBranchDeleteFlag() {
		return branchDeleteFlag;
	}

	public void setBranchDeleteFlag(Integer branchDeleteFlag) {
		this.branchDeleteFlag = branchDeleteFlag;
	}

	public Date getBranchUpdateDate() {
		return branchUpdateDate;
	}

	public void setBranchUpdateDate(Date branchUpdateDate) {
		this.branchUpdateDate = branchUpdateDate;
	}
	
	public Integer getBranchId() {
		return branchId;
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