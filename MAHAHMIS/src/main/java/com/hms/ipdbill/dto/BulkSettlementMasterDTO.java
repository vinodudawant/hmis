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
@Table(name = "ehat_bulk_settlement_master")
public class BulkSettlementMasterDTO {
	
	@Id
	@GeneratedValue
	@Column(name = "bulk_master_id")
	private Integer bulkMasterId;
	
	@Column(name = "bulk_master_id",insertable=false , updatable=false)
	private String bulk_id;
	
	@Column(name = "bill_id")
	private Integer billId=0;
	
	@Column(name = "treatment_id")
	private Integer treatmentId=0;
	
	@Column(name = "patient_id")
	private Integer patientId=0;
	
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
		
	@Column(name = "total_amt")
	private double totalAmt=0;
	
	@Column(name = "total_qty")
	private double totalQty=1;
		
	@Column(name = "total_Concn")
	private double totalConsn =0;
	
	@Column(name = "total_Tds")
	private double totalTds =0;
	
	@Column(name = "total_paid")
	private double totalPaid=0;
	
	@Column(name = "total_remain")
	private double totalRemain=0;
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Column(name = "created_date_time_str")
	private String createdDateTimeStr;

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
	private Integer settledBillCount;
	

	@Transient
	private List<BulkSettlementMasterDTO> listBulkSettlementMst;
	
	@Transient
	private List<BulkSettlementSlaveDTO> listBulkSettlementSlave;

	public Integer getBulkMasterId() {
		return bulkMasterId;
	}

	public void setBulkMasterId(Integer bulkMasterId) {
		this.bulkMasterId = bulkMasterId;
	}

	public String getBulk_id() {
		return bulk_id;
	}

	public void setBulk_id(String bulk_id) {
		this.bulk_id = bulk_id;
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

	public double getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(double totalAmt) {
		this.totalAmt = totalAmt;
	}

	public double getTotalQty() {
		return totalQty;
	}

	public void setTotalQty(double totalQty) {
		this.totalQty = totalQty;
	}

	public double getTotalConsn() {
		return totalConsn;
	}

	public void setTotalConsn(double totalConsn) {
		this.totalConsn = totalConsn;
	}

	public double getTotalTds() {
		return totalTds;
	}

	public void setTotalTds(double totalTds) {
		this.totalTds = totalTds;
	}

	public double getTotalPaid() {
		return totalPaid;
	}

	public void setTotalPaid(double totalPaid) {
		this.totalPaid = totalPaid;
	}

	public double getTotalRemain() {
		return totalRemain;
	}

	public void setTotalRemain(double totalRemain) {
		this.totalRemain = totalRemain;
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
	
	public String getCreatedDateTimeStr() {
		return createdDateTimeStr;
	}

	public void setCreatedDateTimeStr(String createdDateTimeStr) {
		this.createdDateTimeStr = createdDateTimeStr;
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

	public List<BulkSettlementMasterDTO> getListBulkSettlementMst() {
		return listBulkSettlementMst;
	}

	public void setListBulkSettlementMst(
			List<BulkSettlementMasterDTO> listBulkSettlementMst) {
		this.listBulkSettlementMst = listBulkSettlementMst;
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

	public Integer getSettledBillCount() {
		return settledBillCount;
	}

	public void setSettledBillCount(Integer settledBillCount) {
		this.settledBillCount = settledBillCount;
	}	
	
	
}
