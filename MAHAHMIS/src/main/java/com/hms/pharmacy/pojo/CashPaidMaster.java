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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="pharma_cash_paid_master")
public class CashPaidMaster implements Serializable 
{
	@Id
	@GeneratedValue
	@Column(name="cash_paid_id")
	private Integer cashPaidId;
	
	@Column(name="cash_paid_doc_id")
	private String cashPaidDocId;
	
	@ManyToOne
	@JoinColumn(name = "cash_paid_vendor_id")
	private VendorMaster vendorMaster;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "cash_paid_master_id", referencedColumnName = "cash_paid_id")
	private List<CashPaidSlave> cashPaidSlaves = new ArrayList<CashPaidSlave>();
	
	@Column(name="cash_paid_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date cashPaidDate;
	
	@Column(name="cash_paid_amt")
	private Double cashPaidAmt;
	
	@Column(name="cash_paid_narration")
	private String cashPaidNarration;
	
	@Column(name="cash_paid_made_by")
	private String cashPaidMadeBy;
	
	@Column(name="cash_paid_delete_flag")
	private Integer cashPaidDeleteFlag;
	
	/*
	 * @Column(name="cash_paid_update_date") private Date cashPaidUpdateDate;
	 */
	
	@CreationTimestamp
	@Column(name="cash_paid_add_date")
	private Date cashPaidAddDate;
	@UpdateTimestamp
	@Column(name="cash_paid_update_date")
	private Date cashPaidUpdateDate;
	
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

	public Integer getCashPaidId() {
		return cashPaidId;
	}

	public void setCashPaidId(Integer cashPaidId) {
		this.cashPaidId = cashPaidId;
	}

	public String getCashPaidDocId() {
		return cashPaidDocId;
	}

	public void setCashPaidDocId(String cashPaidDocId) {
		this.cashPaidDocId = cashPaidDocId;
	}

	public Date getCashPaidDate() {
		return cashPaidDate;
	}

	public void setCashPaidDate(Date cashPaidDate) {
		this.cashPaidDate = cashPaidDate;
	}

	public Double getCashPaidAmt() {
		return cashPaidAmt;
	}

	public void setCashPaidAmt(Double cashPaidAmt) {
		this.cashPaidAmt = cashPaidAmt;
	}

	public String getCashPaidNarration() {
		return cashPaidNarration;
	}

	public void setCashPaidNarration(String cashPaidNarration) {
		this.cashPaidNarration = cashPaidNarration;
	}

	public String getCashPaidMadeBy() {
		return cashPaidMadeBy;
	}

	public void setCashPaidMadeBy(String cashPaidMadeBy) {
		this.cashPaidMadeBy = cashPaidMadeBy;
	}

	public Integer getCashPaidDeleteFlag() {
		return cashPaidDeleteFlag;
	}

	public void setCashPaidDeleteFlag(Integer cashPaidDeleteFlag) {
		this.cashPaidDeleteFlag = cashPaidDeleteFlag;
	}

	public Date getCashPaidUpdateDate() {
		return cashPaidUpdateDate;
	}

	public void setCashPaidUpdateDate(Date cashPaidUpdateDate) {
		this.cashPaidUpdateDate = cashPaidUpdateDate;
	}
	public VendorMaster getVendorMaster() {
		return vendorMaster;
	}

	public void setVendorMaster(VendorMaster vendorMaster) {
		this.vendorMaster = vendorMaster;
	}
	
	public List<CashPaidSlave> getCashPaidSlaves() {
		return cashPaidSlaves;
	}

	public void setCashPaidSlaves(List<CashPaidSlave> cashPaidSlaves) {
		this.cashPaidSlaves = cashPaidSlaves;
	}

	public Date getCashPaidAddDate() {
		return cashPaidAddDate;
	}

	public void setCashPaidAddDate(Date cashPaidAddDate) {
		this.cashPaidAddDate = cashPaidAddDate;
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
