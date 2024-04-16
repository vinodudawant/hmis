package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_cheque_paid_master")
public class ChequePaidMaster implements Serializable
{

	@Id
	@GeneratedValue
	@Column(name = "cheque_paid_id")
	private Integer chequePaidId;
	
	@Column(name = "cheque_paid_doc_id")
	private String chequePaidDocId;
	
	@Column(name = "cheque_paid_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date chequePaidDate=new Date();
	
	@ManyToOne
	@JoinColumn(name = "cheque_paid_vendor_id")
	private VendorMaster vendorMaster;
	
	@ManyToOne
	@JoinColumn(name = "cheque_paid_bank_id")
	private BankMaster bankMaster;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_paid_master_id", referencedColumnName = "cheque_paid_id")
	private List<ChequePaidSlave> chequePaidSlaves = new ArrayList<ChequePaidSlave>();
	
	@Column(name = "cheque_paid_amt")
	private Double chequePaidAmt;
	
	@Column(name = "cheque_paid_cheque_num")
	private String chequePaidChequeNum;
	
	@Column(name = "cheque_paid_cheque_date")
	private Date chequePaidChequeDate;
	
	@Column(name = "cheque_paid_narration")
	private String chequePaidNarration;
	
	@Column(name = "cheque_paid_made_by")
	private String chequePaidMadeBy;
	
	@Column(name = "cheque_paid_delete_flag")
	private Integer chequePaidDeleteFlag;
	
	/*
	 * @Column(name = "cheque_paid_update_date") private Date chequePaidUpdateDate;
	 */
	
	@Column(name = "cheque_trans_type")
	private String chequeTransType;
	
	@CreationTimestamp
	@Column(name="cheque_paid_add_date")
	private Date chequePaidAddDate;
	public Date getChequePaidAddDate() {
		return chequePaidAddDate;
	}

	public void setChequePaidAddDate(Date chequePaidAddDate) {
		this.chequePaidAddDate = chequePaidAddDate;
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
	@Column(name="cheque_paid_update_date")
	private Date chequePaidUpdateDate;
	
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
	
	public String getChequeTransType() {
		return chequeTransType;
	}

	public void setChequeTransType(String chequeTransType) {
		this.chequeTransType = chequeTransType;
	}

	public Integer getChequePaidId() {
		return chequePaidId;
	}

	public void setChequePaidId(Integer chequePaidId) {
		this.chequePaidId = chequePaidId;
	}

	public String getChequePaidDocId() {
		return chequePaidDocId;
	}

	public void setChequePaidDocId(String chequePaidDocId) {
		this.chequePaidDocId = chequePaidDocId;
	}

	public Date getChequePaidDate() {
		return chequePaidDate;
	}

	public void setChequePaidDate(Date chequePaidDate) {
		this.chequePaidDate = chequePaidDate;
	}

	public VendorMaster getVendorMaster() {
		return vendorMaster;
	}

	public void setVendorMaster(VendorMaster vendorMaster) {
		this.vendorMaster = vendorMaster;
	}


	public BankMaster getBankMaster() {
		return bankMaster;
	}

	public void setBankMaster(BankMaster bankMaster) {
		this.bankMaster = bankMaster;
	}

	public Double getChequePaidAmt() {
		return chequePaidAmt;
	}

	public void setChequePaidAmt(Double chequePaidAmt) {
		this.chequePaidAmt = chequePaidAmt;
	}

	public String getChequePaidChequeNum() {
		return chequePaidChequeNum;
	}

	public void setChequePaidChequeNum(String chequePaidChequeNum) {
		this.chequePaidChequeNum = chequePaidChequeNum;
	}

	public Date getChequePaidChequeDate() {
		return chequePaidChequeDate;
	}

	public void setChequePaidChequeDate(Date chequePaidChequeDate) {
		this.chequePaidChequeDate = chequePaidChequeDate;
	}

	public String getChequePaidNarration() {
		return chequePaidNarration;
	}

	public void setChequePaidNarration(String chequePaidNarration) {
		this.chequePaidNarration = chequePaidNarration;
	}

	public String getChequePaidMadeBy() {
		return chequePaidMadeBy;
	}

	public void setChequePaidMadeBy(String chequePaidMadeBy) {
		this.chequePaidMadeBy = chequePaidMadeBy;
	}

	public Integer getChequePaidDeleteFlag() {
		return chequePaidDeleteFlag;
	}

	public void setChequePaidDeleteFlag(Integer chequePaidDeleteFlag) {
		this.chequePaidDeleteFlag = chequePaidDeleteFlag;
	}

	public Date getChequePaidUpdateDate() {
		return chequePaidUpdateDate;
	}

	public void setChequePaidUpdateDate(Date chequePaidUpdateDate) {
		this.chequePaidUpdateDate = chequePaidUpdateDate;
	}

	public List<ChequePaidSlave> getChequePaidSlaves() {
		return chequePaidSlaves;
	}

	public void setChequePaidSlaves(List<ChequePaidSlave> chequePaidSlaves) {
		this.chequePaidSlaves = chequePaidSlaves;
	}
	

}
