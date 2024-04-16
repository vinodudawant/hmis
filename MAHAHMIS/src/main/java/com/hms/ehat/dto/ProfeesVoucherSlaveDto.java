package com.hms.ehat.dto;

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

@Entity
@Table(name = "ehat_profees_voucher_slave")
public class ProfeesVoucherSlaveDto {

	@Id
	@GeneratedValue
	@Column(name = "voucher_slave_id")
	private int voucherSlaveId;
	
	@Column(name = "voucher_master_id")
	private int voucherMasterId;
	
	@Column(name = "bill_receipt_master_id")
	private int billReceiptMasterId;
	
	@Column(name = "bill_receipt_slave_id")
	private int billReceiptSlaveId;
	
	@Column(name = "rate",columnDefinition="double default 0")
	private double rate;
	
	@Column(name = "concession",columnDefinition="double default 0")
	private double concession;
	
	@Column(name = "amount",columnDefinition="double default 1")
	private double amount;
	
	@Column(name = "hosp_amount",columnDefinition="double default 0")
	private double hospAmount;
	
	@Column(name = "pf_amount",columnDefinition="double default 0")
	private double pfAmount;
	
	@Column(name = "pf_paid",columnDefinition="double default 0")
	private double pfPaid;
	
	@Column(name = "pf_unpaid",columnDefinition="double default 0")
	private double pfUnpaid;
	
	@Column(name = "reduction",columnDefinition="double default 0")
	private double reduction;
	
	@Column(name = "profees_id")
	private int profeesId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted;

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Transient
	private List<ProfessionalFeesDto> listProFees;
	
	@Transient
	private List<ProfeesVoucherSlaveDto> listVoucherSlave;

	//setter and getter
	
	public int getVoucherSlaveId() {
		return voucherSlaveId;
	}

	public void setVoucherSlaveId(int voucherSlaveId) {
		this.voucherSlaveId = voucherSlaveId;
	}

	public int getVoucherMasterId() {
		return voucherMasterId;
	}

	public void setVoucherMasterId(int voucherMasterId) {
		this.voucherMasterId = voucherMasterId;
	}

	public int getBillReceiptMasterId() {
		return billReceiptMasterId;
	}

	public void setBillReceiptMasterId(int billReceiptMasterId) {
		this.billReceiptMasterId = billReceiptMasterId;
	}

	public int getBillReceiptSlaveId() {
		return billReceiptSlaveId;
	}

	public void setBillReceiptSlaveId(int billReceiptSlaveId) {
		this.billReceiptSlaveId = billReceiptSlaveId;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public double getConcession() {
		return concession;
	}

	public void setConcession(double concession) {
		this.concession = concession;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double getHospAmount() {
		return hospAmount;
	}

	public void setHospAmount(double hospAmount) {
		this.hospAmount = hospAmount;
	}

	public double getPfAmount() {
		return pfAmount;
	}

	public void setPfAmount(double pfAmount) {
		this.pfAmount = pfAmount;
	}

	public double getPfPaid() {
		return pfPaid;
	}

	public void setPfPaid(double pfPaid) {
		this.pfPaid = pfPaid;
	}

	public double getReduction() {
		return reduction;
	}

	public void setReduction(double reduction) {
		this.reduction = reduction;
	}

	public int getProfeesId() {
		return profeesId;
	}

	public void setProfeesId(int profeesId) {
		this.profeesId = profeesId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public List<ProfessionalFeesDto> getListProFees() {
		return listProFees;
	}

	public void setListProFees(List<ProfessionalFeesDto> listProFees) {
		this.listProFees = listProFees;
	}

	public List<ProfeesVoucherSlaveDto> getListVoucherSlave() {
		return listVoucherSlave;
	}

	public void setListVoucherSlave(List<ProfeesVoucherSlaveDto> listVoucherSlave) {
		this.listVoucherSlave = listVoucherSlave;
	}

	public double getPfUnpaid() {
		return pfUnpaid;
	}

	public void setPfUnpaid(double pfUnpaid) {
		this.pfUnpaid = pfUnpaid;
	}
	
}
