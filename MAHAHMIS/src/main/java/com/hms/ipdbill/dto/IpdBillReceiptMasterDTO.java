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

import com.hms.ehat.dto.TreatmentDto;

@Entity
@Table(name = "ehat_receipt_master_ipd")
public class IpdBillReceiptMasterDTO {

	@Id
	@GeneratedValue
	@Column(name = "bill_receipt_id")
	private Integer billReceiptId;
	
	@Column(name = "receipt_count")
	private Integer receiptCount;
	
	@Column(name = "bill_id")
	private Integer billId=0;
	
	@Column(name = "treatment_id")
	private Integer treatmentId=0;
	
	@Column(name = "patient_id")
	private Integer patientId=0;
	
	@Column(name = "department_id")
	private Integer departmentId=0;
	
	@Column(name = "unit_id")
	private int unitId=0;
	
	@Column(name = "doctor_ids")
	private String doctorIds;
	
	@Column(name = "source_type_id")
	private Integer sourceTypeId=1;
	
	@Column(name = "sponsor_cat_id")
	private Integer sponsorCatId=0;
	
	@Column(name = "patient_cat_id")
	private Integer patientCatId=0;
		
	@Column(name = "total_amt")
	private double totalAmt=0;
	
	@Column(name = "total_qty")
	private double totalQty=1;
		
	@Column(name = "total_discount")
	private double totalDisc =0;
	
	@Column(name = "remark")
	private String remark;
	
	@Column(name = "bulk_mst_id")
	private Integer bulkMstId =0;
	
	// added for profees
	
	@Column(name = "actual_amt")
	private double actualAmt=0;
	
	@Column(name = "actual_tot_concn")
	private double actualTotConcn=0;
	
	@Column(name = "actual_payable")
	private double actualPayable=0;
	
	@Column(name = "actual_disc_per")
	private double actualDiscPer=0;
	
	@Column(name = "payable")
	private double payable=0;
	
	@Column(name = "bill_settled_flag")
	private String billSettledFlag="N";
	
	// added for profees	
	
	@Column(name = "total_paid")
	private double totalPaid=0;
	
	@Column(name = "total_remain")
	private double totalRemain=0;
	
	@Column(name = "refund_amt")
	private double refundAmt=0;
	
	@Column(name = "reduction")
	private double reduction=0;
	
	@Column(name = "refund_flag")
	private String refundFlag="N";
	
	@Column(name = "credit_flag")
	private String creditFlag="N";
	

	@Column(name = "account_status_ipd")
	private String accountStatusIpd="N";
	
	
	@Column(name = "receipt_of")
	private String receiptOf="general";
		
	@Column(name = "receipt_status")
	private String receiptStatus;
	
	@Column(name = "pay_mode")
	private Integer payMode=0;
	
	@Column(name = "bank_number")
	private String bNumber;
	
	@Column(name = "batch_number")
	private String batchNumber;
	
	@Column(name = "bank_name")
	private String bName;
	
	@Column(name = "against_id")
	private Integer againstId=0;
	
	@Column(name = "payment_type")
	private Integer paymentType=1;
	
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
	
	@Column(name = "paid_by_cash_flag",columnDefinition="varchar(2) default 'N'")
	private String paidByCashFlag="N";	
	
	@Column(name = "paid_by_cash_services",columnDefinition="varchar(500) default '0'")
	private String paidByCashServices="0";	
	
	@Transient
	private List<IpdBillReceiptMasterDTO> listBillReceiptMaster;
	
	@Transient
	private List<IpdBillReceiptSlaveDTO> listBillReceiptSlave;
	
	@Column(name = "delete_remark",columnDefinition="varchar(500) default '-' ")
	private String deleteRemark="-";
	
	
	@Transient
	private List<TreatmentDto> listTreatDto;
	
	public String getPaidByCashFlag() {
		return paidByCashFlag;
	}

	public void setPaidByCashFlag(String paidByCashFlag) {
		this.paidByCashFlag = paidByCashFlag;
	}	

	public String getPaidByCashServices() {
		return paidByCashServices;
	}

	public void setPaidByCashServices(String paidByCashServices) {
		this.paidByCashServices = paidByCashServices;
	}

	public Integer getBillReceiptId() {
		return billReceiptId;
	}

	public void setBillReceiptId(Integer billReceiptId) {
		this.billReceiptId = billReceiptId;
	}

	public Integer getReceiptCount() {
		return receiptCount;
	}

	public void setReceiptCount(Integer receiptCount) {
		this.receiptCount = receiptCount;
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

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getDeleteRemark() {
		return deleteRemark;
	}

	public void setDeleteRemark(String deleteRemark) {
		this.deleteRemark = deleteRemark;
	}

	public String getDoctorIds() {
		return doctorIds;
	}

	public void setDoctorIds(String doctorIds) {
		this.doctorIds = doctorIds;
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

	public Integer getPatientCatId() {
		return patientCatId;
	}

	public void setPatientCatId(Integer patientCatId) {
		this.patientCatId = patientCatId;
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

	public double getTotalDisc() {
		return totalDisc;
	}

	public void setTotalDisc(double totalDisc) {
		this.totalDisc = totalDisc;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getBulkMstId() {
		return bulkMstId;
	}

	public void setBulkMstId(Integer bulkMstId) {
		this.bulkMstId = bulkMstId;
	}

	public double getActualAmt() {
		return actualAmt;
	}

	public void setActualAmt(double actualAmt) {
		this.actualAmt = actualAmt;
	}

	public double getActualTotConcn() {
		return actualTotConcn;
	}

	public void setActualTotConcn(double actualTotConcn) {
		this.actualTotConcn = actualTotConcn;
	}

	public double getActualPayable() {
		return actualPayable;
	}

	public void setActualPayable(double actualPayable) {
		this.actualPayable = actualPayable;
	}

	public double getActualDiscPer() {
		return actualDiscPer;
	}

	public void setActualDiscPer(double actualDiscPer) {
		this.actualDiscPer = actualDiscPer;
	}

	public double getPayable() {
		return payable;
	}

	public void setPayable(double payable) {
		this.payable = payable;
	}

	public String getBillSettledFlag() {
		return billSettledFlag;
	}

	public void setBillSettledFlag(String billSettledFlag) {
		this.billSettledFlag = billSettledFlag;
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

	public double getRefundAmt() {
		return refundAmt;
	}

	public void setRefundAmt(double refundAmt) {
		this.refundAmt = refundAmt;
	}

	public double getReduction() {
		return reduction;
	}

	public void setReduction(double reduction) {
		this.reduction = reduction;
	}

	public String getRefundFlag() {
		return refundFlag;
	}

	public void setRefundFlag(String refundFlag) {
		this.refundFlag = refundFlag;
	}

	public String getCreditFlag() {
		return creditFlag;
	}

	public void setCreditFlag(String creditFlag) {
		this.creditFlag = creditFlag;
	}

	public String getReceiptOf() {
		return receiptOf;
	}

	public void setReceiptOf(String receiptOf) {
		this.receiptOf = receiptOf;
	}

	public String getReceiptStatus() {
		return receiptStatus;
	}

	public void setReceiptStatus(String receiptStatus) {
		this.receiptStatus = receiptStatus;
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

	public String getBatchNumber() {
		return batchNumber;
	}

	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}

	public String getbName() {
		return bName;
	}

	public void setbName(String bName) {
		this.bName = bName;
	}

	public Integer getAgainstId() {
		return againstId;
	}

	public void setAgainstId(Integer againstId) {
		this.againstId = againstId;
	}

	public Integer getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(Integer paymentType) {
		this.paymentType = paymentType;
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

	public List<IpdBillReceiptMasterDTO> getListBillReceiptMaster() {
		return listBillReceiptMaster;
	}

	public void setListBillReceiptMaster(
			List<IpdBillReceiptMasterDTO> listBillReceiptMaster) {
		this.listBillReceiptMaster = listBillReceiptMaster;
	}

	public List<IpdBillReceiptSlaveDTO> getListBillReceiptSlave() {
		return listBillReceiptSlave;
	}

	public void setListBillReceiptSlave(
			List<IpdBillReceiptSlaveDTO> listBillReceiptSlave) {
		this.listBillReceiptSlave = listBillReceiptSlave;
	}

	public String getAccountStatusIpd() {
		return accountStatusIpd;
	}

	public void setAccountStatusIpd(String accountStatusIpd) {
		this.accountStatusIpd = accountStatusIpd;
	}

	public List<TreatmentDto> getListTreatDto() {
		return listTreatDto;
	}

	public void setListTreatDto(List<TreatmentDto> listTreatDto) {
		this.listTreatDto = listTreatDto;
	}	
	
}
