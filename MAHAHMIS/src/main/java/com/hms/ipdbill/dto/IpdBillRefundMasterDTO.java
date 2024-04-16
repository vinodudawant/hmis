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
@Table(name = "ehat_refund_master_ipd")
public class IpdBillRefundMasterDTO {

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
		
	@Column(name = "total_amt")
	private double totalAmt=0;
	
	@Column(name = "total_qty")
	private double totalQty=1;
		
	@Column(name = "total_discount")
	private double totalDisc=0;
	
	@Column(name = "ref_per")
	private double refPer=0;
	
	@Column(name = "total_paid")
	private double totalPaid=0;
	
	@Column(name = "total_remain")
	private double totalRemain=0;
	
	@Column(name = "refund_flag")
	private String refundFlag="N";
	
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
	
	@Column(name = "extraRef_Flag")
	private String extraRefFlag="N";
	
	@Column(name = "remark")
	private String remark;
	
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
	private List<IpdBillRefundMasterDTO> listBillRefundMaster;
	
	@Transient
	private List<IpdBillRefundSlaveDTO> listBillRefundSlave;
		
	public IpdBillRefundMasterDTO() {
		super();
	}
	@Column(name = "remarkDeletedRefund",columnDefinition="varchar(225) default ''")
	private String remarkDeletedRefund="";
	
	@Transient
	private String patientName;
	
	@Transient
	private String userName;
	
	@Transient
	private String unit_name;
	
	@Transient
	private String pay_name;
	
	@Transient
	private String bank_name;
	
	@Transient
	private Integer invoice_count;
	
	public Integer getInvoice_count() {
		return invoice_count;
	}



	public void setInvoice_count(Integer invoice_count) {
		this.invoice_count = invoice_count;
	}



	public String getPay_name() {
		return pay_name;
	}



	public void setPay_name(String pay_name) {
		this.pay_name = pay_name;
	}



	public String getBank_name() {
		return bank_name;
	}



	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}
	@Transient
	private String deleted_user_name;
	
	public String getDeleted_user_name() {
		return deleted_user_name;
	}



	public void setDeleted_user_name(String deleted_user_name) {
		this.deleted_user_name = deleted_user_name;
	}



	public String getUnit_name() {
		return unit_name;
	}



	public void setUnit_name(String unit_name) {
		this.unit_name = unit_name;
	}



	public String getUserName() {
		return userName;
	}



	public void setUserName(String userName) {
		this.userName = userName;
	}



	public String getPatientName() {
		return patientName;
	}



	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}



	public String getRemarkDeletedRefund() {
		return remarkDeletedRefund;
	}



	public void setRemarkDeletedRefund(String remarkDeletedRefund) {
		this.remarkDeletedRefund = remarkDeletedRefund;
	}



	public IpdBillRefundMasterDTO(Integer billRefundId, Integer billId,
			Integer treatmentId, Integer patientId, Integer departmentId,
			int unitId, String doctorIds, Integer sourceTypeId,
			Integer sponsorCatId, Integer patientCatId, double totalAmt,
			double totalQty, double totalDisc, double totalPaid,
			double totalRemain, String refundFlag, String creditFlag,
			String receiptOf, String receiptStatus, Integer payMode,
			String bNumber, String bName, Integer againstId,
			Integer paymentType, String deleted, Integer createdBy,
			Date createdDateTime, Integer updatedBy, Date updatedDateTime,
			Integer deletedBy, Date deletedDateTime) {
		super();
		this.billRefundId = billRefundId;
		this.billId = billId;
		this.treatmentId = treatmentId;
		this.patientId = patientId;
		this.departmentId = departmentId;
		this.unitId = unitId;
		this.doctorIds = doctorIds;
		this.sourceTypeId = sourceTypeId;
		this.sponsorCatId = sponsorCatId;
		this.patientCatId = patientCatId;
		this.totalAmt = totalAmt;
		this.totalQty = totalQty;
		this.totalDisc = totalDisc;
		this.totalPaid = totalPaid;
		this.totalRemain = totalRemain;
		this.refundFlag = refundFlag;
		this.creditFlag = creditFlag;
		this.receiptOf = receiptOf;
		this.receiptStatus = receiptStatus;
		this.payMode = payMode;
		this.bNumber = bNumber;
		this.bName = bName;
		this.againstId = againstId;
		this.paymentType = paymentType;
		this.deleted = deleted;
		this.createdBy = createdBy;
		this.createdDateTime = createdDateTime;
		this.updatedBy = updatedBy;
		this.updatedDateTime = updatedDateTime;
		this.deletedBy = deletedBy;
		this.deletedDateTime = deletedDateTime;
	}



	public IpdBillRefundMasterDTO(Integer billId, Integer treatmentId,
			Integer patientId, int unitId, double totalAmt, double totalPaid,
			String receiptOf, Integer payMode, String bNumber, String batchNo, String bName,
			Integer againstId,Integer createdBy,double refPer) {
		super();
		this.billId = billId;
		this.treatmentId = treatmentId;
		this.patientId = patientId;
		this.unitId = unitId;
		this.totalAmt = totalAmt;
		this.totalPaid = totalPaid;
		this.receiptOf = receiptOf;
		this.payMode = payMode;
		this.bNumber = bNumber;
		this.batchNumber = batchNo;
		this.bName = bName;
		this.againstId = againstId;
		this.createdBy = createdBy;
		this.refPer=refPer;
	}	
	
	
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

	public List<IpdBillRefundMasterDTO> getListBillRefundMaster() {
		return listBillRefundMaster;
	}

	public void setListBillRefundMaster(
			List<IpdBillRefundMasterDTO> listBillRefundMaster) {
		this.listBillRefundMaster = listBillRefundMaster;
	}

	public List<IpdBillRefundSlaveDTO> getListBillRefundSlave() {
		return listBillRefundSlave;
	}

	public void setListBillRefundSlave(
			List<IpdBillRefundSlaveDTO> listBillRefundSlave) {
		this.listBillRefundSlave = listBillRefundSlave;
	}

	public double getRefPer() {
		return refPer;
	}

	public void setRefPer(double refPer) {
		this.refPer = refPer;
	}

	public String getExtraRefFlag() {
		return extraRefFlag;
	}

	public void setExtraRefFlag(String extraRefFlag) {
		this.extraRefFlag = extraRefFlag;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}	
	
}
