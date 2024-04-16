package com.hms.ipdbill.dto;

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
@Table(name = "ehat_bulk_settlement_slave")
public class BulkSettlementSlaveDTO {
	
	@Id
	@GeneratedValue
	@Column(name = "bulk_slave_id")
	private Integer bulkSlaveId;
	
	@Column(name = "bulk_master_id")
	private Integer bulkMasterId=0;
	
	@Column(name = "bill_id")
	private Integer billId=0;
	
	@Column(name = "treatment_id")
	private Integer treatmentId=0;
	
	@Column(name = "patient_id")
	private Integer patientId=0;
	
	@Transient
	private String centerPatientId;
	
	@Column(name = "department_id")
	private Integer departmentId=0;
	
	@Column(name = "unit_id")
	private Integer unitId=0;
	
	@Column(name = "from_date")
	private String fromDate;
	
	@Column(name = "to_date")
	private String toDate;
	
	@Column(name = "payee_type")
	private Integer payeeType=1;
	
	@Column(name = "payee_main_id")
	private Integer payeeMainId=0;
	
	@Column(name = "payee_leaf_id")
	private Integer payeeLeafId=0;
	
	@Column(name = "source_type_id")
	private Integer sourceTypeId=1;
	
	@Column(name = "sponsor_cat_id")
	private Integer sponsorCatId=0;
	
	@Column(name = "pay_mode")
	private Integer payMode=1;
	
	@Column(name = "bank_number")
	private String bNumber;
		
	@Column(name = "bank_name")
	private String bName;
	
	@Column(name = "cheque_no")
	private String chequeNo;
	
	@Column(name = "bill_total")
	private double billTotal=0;
	
	@Column(name = "bill_paid")
	private double billPaid=0;
		
	@Column(name = "amount")
	private double amount=0;
	
	@Column(name = "quantity")
	private double quantity=1;
		
	@Column(name = "concession")
	private double concession =0;
	
	@Column(name = "tds_amt")
	private double tdsAmt =0;
	
	@Column(name = "paid_amt")
	private double paidAmt=0;
	
	@Column(name = "redcn_amt")
	private double redcnAmt =0;
	
	@Column(name = "remain_amt")
	private double remainAmt=0;
	
	@Column(name = "deleted")
	private String deleted="N";
	
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
	
	@Column(name = "account_status_bulk")
	private String accountStatusBulk;

	@Transient
	private List<BulkSettlementSlaveDTO> listBulkSettlementSlave;
	@Transient
	private String patientname;
	@Transient
	private Date billDate;
	@Transient
	private Integer billno;
	@Transient
	private String companyname;
	@Transient
	private double totalpaidrecipt;
	
	public double getTotalpaidrecipt() {
		return totalpaidrecipt;
	}

	public void setTotalpaidrecipt(double totalpaidrecipt) {
		this.totalpaidrecipt = totalpaidrecipt;
	}

	public String getCompanyname() {
		return companyname;
	}

	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}

	public String getPatientname() {
		return patientname;
	}

	public void setPatientname(String patientname) {
		this.patientname = patientname;
	}

	public Date getBillDate() {
		return billDate;
	}

	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}

	public Integer getBillno() {
		return billno;
	}

	public void setBillno(Integer billno) {
		this.billno = billno;
	}

	public Integer getBulkSlaveId() {
		return bulkSlaveId;
	}

	public void setBulkSlaveId(Integer bulkSlaveId) {
		this.bulkSlaveId = bulkSlaveId;
	}

	public Integer getBulkMasterId() {
		return bulkMasterId;
	}

	public void setBulkMasterId(Integer bulkMasterId) {
		this.bulkMasterId = bulkMasterId;
	}

	public Integer getBillId() {
		return billId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public Integer getPayeeType() {
		return payeeType;
	}

	public void setPayeeType(Integer payeeType) {
		this.payeeType = payeeType;
	}

	public Integer getPayeeMainId() {
		return payeeMainId;
	}

	public void setPayeeMainId(Integer payeeMainId) {
		this.payeeMainId = payeeMainId;
	}

	public Integer getPayeeLeafId() {
		return payeeLeafId;
	}

	public void setPayeeLeafId(Integer payeeLeafId) {
		this.payeeLeafId = payeeLeafId;
	}

	public Integer getSourceTypeId() {
		return sourceTypeId;
	}

	public void setSourceTypeId(Integer sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public Integer getSponsorCatId() {
		return sponsorCatId;
	}

	public void setSponsorCatId(Integer sponsorCatId) {
		this.sponsorCatId = sponsorCatId;
	}

	public Integer getPayMode() {
		return payMode;
	}

	public void setPayMode(Integer payMode) {
		this.payMode = payMode;
	}

	public String getbNumber() {
		return bNumber;
	}

	public void setbNumber(String bNumber) {
		this.bNumber = bNumber;
	}

	public String getbName() {
		return bName;
	}

	public void setbName(String bName) {
		this.bName = bName;
	}

	public String getChequeNo() {
		return chequeNo;
	}

	public void setChequeNo(String chequeNo) {
		this.chequeNo = chequeNo;
	}

	public double getBillTotal() {
		return billTotal;
	}

	public void setBillTotal(double billTotal) {
		this.billTotal = billTotal;
	}

	public double getBillPaid() {
		return billPaid;
	}

	public void setBillPaid(double billPaid) {
		this.billPaid = billPaid;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public double getConcession() {
		return concession;
	}

	public void setConcession(double concession) {
		this.concession = concession;
	}

	public double getTdsAmt() {
		return tdsAmt;
	}

	public void setTdsAmt(double tdsAmt) {
		this.tdsAmt = tdsAmt;
	}

	public double getPaidAmt() {
		return paidAmt;
	}

	public void setPaidAmt(double paidAmt) {
		this.paidAmt = paidAmt;
	}

	public double getRedcnAmt() {
		return redcnAmt;
	}

	public void setRedcnAmt(double redcnAmt) {
		this.redcnAmt = redcnAmt;
	}

	public double getRemainAmt() {
		return remainAmt;
	}

	public void setRemainAmt(double remainAmt) {
		this.remainAmt = remainAmt;
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

	public List<BulkSettlementSlaveDTO> getListBulkSettlementSlave() {
		return listBulkSettlementSlave;
	}

	public void setListBulkSettlementSlave(
			List<BulkSettlementSlaveDTO> listBulkSettlementSlave) {
		this.listBulkSettlementSlave = listBulkSettlementSlave;
	}

	public String getAccountStatusBulk() {
		return accountStatusBulk;
	}

	public void setAccountStatusBulk(String accountStatusBulk) {
		this.accountStatusBulk = accountStatusBulk;
	}	
	
	
}
