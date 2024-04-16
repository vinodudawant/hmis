package com.hms.ivf.dto;

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

import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.BillRefundSlaveDTO;

@Entity
@Table(name = "ivf_ehat_refund_master")
public class IvfBillRefundMasterDTO {

	@Id
	@GeneratedValue
	@Column(name = "bill_refund_id")
	private Integer billRefundId;
	
	@Column(name = "receipt_count")
	private Integer refundCount;
	
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
	
	@Column(name = "payee_type_id")
	private Integer payeeTypeId=0;
	
	@Column(name = "payee_main_id")
	private Integer payeeMainId=0;
	
	@Column(name = "payee_leaf_id")
	private Integer payeeLeafId=0;
		
	@Column(name = "total_amt")
	private double totalAmt=0;
	
	@Column(name = "total_qty")
	private double totalQty=1;
		
	@Column(name = "total_discount")
	private double totalDisc=0;
	
	@Column(name = "total_paid")
	private double totalPaid=0;
	
	@Column(name = "total_remain")
	private double totalRemain=0;
	
	@Column(name = "refund_flag")
	private String refundFlag="N";
		
	@Column(name = "ref_givenby")
	private Integer refGivenBy =0;
	
	/*@Column(name = "disc_narrarion")
	private String discNarrtn="-";*/
	
	@Column(name = "ref_remark")
	private String refRemark="-";
		
	@Column(name = "credit_flag")
	private String creditFlag="N";
	
	@Column(name = "receipt_of")
	private String receiptOf="general";
	
	@Column(name = "receipt_status")
	private String receiptStatus;
	
	@Column(name = "pay_mode")
	private Integer payMode;
	
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
	
	@Transient
	private List<IvfBillRefundMasterDTO> listBillRefundMaster;
	
	@Transient
	private List<IvfBillRefundSlaveDTO> listBillRefundSlave;
	
	public Integer getBillRefundId() {
		return billRefundId;
	}

	public void setBillRefundId(Integer billRefundId) {
		this.billRefundId = billRefundId;
	}

	public Integer getRefundCount() {
		return refundCount;
	}

	public void setRefundCount(Integer refundCount) {
		this.refundCount = refundCount;
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

	public Integer getPayeeTypeId() {
		return payeeTypeId;
	}

	public void setPayeeTypeId(Integer payeeTypeId) {
		this.payeeTypeId = payeeTypeId;
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

	public String getRefundFlag() {
		return refundFlag;
	}

	public void setRefundFlag(String refundFlag) {
		this.refundFlag = refundFlag;
	}

	public Integer getRefGivenBy() {
		return refGivenBy;
	}

	public void setRefGivenBy(Integer refGivenBy) {
		this.refGivenBy = refGivenBy;
	}

	public String getRefRemark() {
		return refRemark;
	}

	public void setRefRemark(String refRemark) {
		this.refRemark = refRemark;
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

	public List<IvfBillRefundMasterDTO> getListBillRefundMaster() {
		return listBillRefundMaster;
	}

	public void setListBillRefundMaster(List<IvfBillRefundMasterDTO> listBillRefundMaster) {
		this.listBillRefundMaster = listBillRefundMaster;
	}

	public List<IvfBillRefundSlaveDTO> getListBillRefundSlave() {
		return listBillRefundSlave;
	}

	public void setListBillRefundSlave(List<IvfBillRefundSlaveDTO> listBillRefundSlave) {
		this.listBillRefundSlave = listBillRefundSlave;
	}	
}
