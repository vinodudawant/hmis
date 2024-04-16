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
@Table(name = "ehat_receipt_slave_ipd")
public class IpdBillReceiptSlaveDTO {

	@Id
	@GeneratedValue
	@Column(name = "bill_rec_slave_id")
	private Integer billRecSlaveId;
	
	@Column(name = "bill_receipt_master_id")
	private Integer billReceiptMasterId;
	
	@Column(name = "bill_id")
	private Integer billId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId=0;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Column(name = "comp_name")
	private String compName;
	
	@Column(name = "pay")
	private double pay;
	
	@Column(name = "co_pay")
	private double coPay;
		
	@Column(name = "doctor_id")
	private int doctorId;
	
	@Column(name = "source_type_id")
	private int sourceTypeId;
	
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "sub_service_id")
	private int subServiceId;
	
	// added for profees
	
	@Column(name = "actual_amt")
	private double actualAmt=0;
	
	@Column(name = "actual_concn_per")
	private double actualConcnPer=0;
	
	@Column(name = "actual_concn_amt")
	private double actualConcnAmt=0;
		
	@Column(name = "actual_payable")
	private double actualPayable=0;
	
	@Column(name = "actual_disc_per")
	private double actualDiscPer=0;
	
	@Column(name = "actual_disc_amt")
	private double actualDiscAmt=0;
	
	@Column(name = "actual_final_payable")
	private double actualFinalPayable=0;
	
	@Column(name = "actual_final_paid")
	private double actualFinalPaid=0;
	
	@Column(name = "advance_flag")
	private String advanceFlag="N";
	
	@Column(name = "actHospAmount")
	private double actHospAmount=0;
	// added for profees
		
	@Column(name = "rate")
	private double rate;
	
	@Column(name = "quantity")
	private double quantity;
	
	@Column(name = "concession")
	private double concession;
	
	@Column(name = "amount")
	private double amount;
	
	@Column(name = "discount")
	private double discount;
	
	@Column(name = "paid")
	private double paid;
	
	@Column(name = "remain")
	private double remain;
	
	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "service_assign_date",updatable=false)
	private Date serviceAssignDate;
	
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
		
	@Column(name = "unit_id")
	private int unitId;	
	
	@Column(name = "against_id")
	private int againstId;	
	
	@Column(name = "clinical_notes")
	private String clinicalnote="-";	
	
	@Column(name = "instructions")
	private String instructions="-";	
	
	@Column(name = "urgentflag")
	private String urgentfla="N";
	
	@Column(name = "refund_amt")
	private double refundAmt=0.0;
	
	@Column(name = "reduction")
	private double reduction=0.0;
	
	@Column(name = "refund_flag")
	private String refundFlag="N";
	
	@Column(name = "doctor_payment_flag")
	private String doctorPaymentFlag="N";
		
	@Transient
	private List<BillReceiptSlaveDTO> listBillReceiptSlave;
	
	@Column(name = "hospAmount")
	private double hospAmount=0;
	
	@Column(name = "pfAmount")
	private double pfAmount=0;
	
	@Column(name = "pfPaid")
	private double pfPaid=0;
	
	@Column(name = "pfUnpaid")
	private double pfUnpaid=0;
	
	@Column(name = "pfReduction")
	private double pfReduction=0;
	
	@Column(name = "pfAddition")
	private double pfAddition=0;
	
	@Column(name = "pfVoucherId")
	private int pfVoucherId=0;
	
	@Column(name = "pfVoucherFlag")
	private String pfVoucherFlag="N";
		
	@Transient
	private String patientName;
	@Transient
	private String doctorName;
	@Transient
	private String unitName;
	@Transient
	private String deptName;
	@Transient
	private String serviceName;
	
	@Column(name = "narration")
	private String narration="-";
	
	public Integer getBillRecSlaveId() {
		return billRecSlaveId;
	}
	public void setBillRecSlaveId(Integer billRecSlaveId) {
		this.billRecSlaveId = billRecSlaveId;
	}
	public Integer getBillReceiptMasterId() {
		return billReceiptMasterId;
	}
	public void setBillReceiptMasterId(Integer billReceiptMasterId) {
		this.billReceiptMasterId = billReceiptMasterId;
	}
	public Integer getBillId() {
		return billId;
	}
	public void setBillId(Integer billId) {
		this.billId = billId;
	}
	public Integer getBillDetailsId() {
		return billDetailsId;
	}
	public void setBillDetailsId(Integer billDetailsId) {
		this.billDetailsId = billDetailsId;
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
	public String getCompName() {
		return compName;
	}
	public void setCompName(String compName) {
		this.compName = compName;
	}
	public double getPay() {
		return pay;
	}
	public void setPay(double pay) {
		this.pay = pay;
	}
	public double getCoPay() {
		return coPay;
	}
	public void setCoPay(double coPay) {
		this.coPay = coPay;
	}
	public int getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}
	public int getSourceTypeId() {
		return sourceTypeId;
	}
	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}
	public int getServiceId() {
		return serviceId;
	}
	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}
	public int getSubServiceId() {
		return subServiceId;
	}
	public void setSubServiceId(int subServiceId) {
		this.subServiceId = subServiceId;
	}
	public double getActualAmt() {
		return actualAmt;
	}
	public void setActualAmt(double actualAmt) {
		this.actualAmt = actualAmt;
	}
	public double getActualConcnPer() {
		return actualConcnPer;
	}
	public void setActualConcnPer(double actualConcnPer) {
		this.actualConcnPer = actualConcnPer;
	}
	public double getActualConcnAmt() {
		return actualConcnAmt;
	}
	public void setActualConcnAmt(double actualConcnAmt) {
		this.actualConcnAmt = actualConcnAmt;
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
	public double getActualDiscAmt() {
		return actualDiscAmt;
	}
	public void setActualDiscAmt(double actualDiscAmt) {
		this.actualDiscAmt = actualDiscAmt;
	}
	public double getActualFinalPayable() {
		return actualFinalPayable;
	}
	public void setActualFinalPayable(double actualFinalPayable) {
		this.actualFinalPayable = actualFinalPayable;
	}
	public double getActualFinalPaid() {
		return actualFinalPaid;
	}
	public void setActualFinalPaid(double actualFinalPaid) {
		this.actualFinalPaid = actualFinalPaid;
	}
	public double getRate() {
		return rate;
	}
	public void setRate(double rate) {
		this.rate = rate;
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
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public double getPaid() {
		return paid;
	}
	public void setPaid(double paid) {
		this.paid = paid;
	}
	public double getRemain() {
		return remain;
	}
	public void setRemain(double remain) {
		this.remain = remain;
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
	public Date getServiceAssignDate() {
		return serviceAssignDate;
	}
	public void setServiceAssignDate(Date serviceAssignDate) {
		this.serviceAssignDate = serviceAssignDate;
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
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public int getAgainstId() {
		return againstId;
	}
	public void setAgainstId(int againstId) {
		this.againstId = againstId;
	}
	public String getClinicalnote() {
		return clinicalnote;
	}
	public void setClinicalnote(String clinicalnote) {
		this.clinicalnote = clinicalnote;
	}
	public String getInstructions() {
		return instructions;
	}
	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	public String getUrgentfla() {
		return urgentfla;
	}
	public void setUrgentfla(String urgentfla) {
		this.urgentfla = urgentfla;
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
	public String getDoctorPaymentFlag() {
		return doctorPaymentFlag;
	}
	public void setDoctorPaymentFlag(String doctorPaymentFlag) {
		this.doctorPaymentFlag = doctorPaymentFlag;
	}
	public List<BillReceiptSlaveDTO> getListBillReceiptSlave() {
		return listBillReceiptSlave;
	}
	public void setListBillReceiptSlave(
			List<BillReceiptSlaveDTO> listBillReceiptSlave) {
		this.listBillReceiptSlave = listBillReceiptSlave;
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
	public double getPfUnpaid() {
		return pfUnpaid;
	}
	public void setPfUnpaid(double pfUnpaid) {
		this.pfUnpaid = pfUnpaid;
	}
	public double getPfReduction() {
		return pfReduction;
	}
	public void setPfReduction(double pfReduction) {
		this.pfReduction = pfReduction;
	}
	public double getPfAddition() {
		return pfAddition;
	}
	public void setPfAddition(double pfAddition) {
		this.pfAddition = pfAddition;
	}
	public int getPfVoucherId() {
		return pfVoucherId;
	}
	public void setPfVoucherId(int pfVoucherId) {
		this.pfVoucherId = pfVoucherId;
	}
	public String getPfVoucherFlag() {
		return pfVoucherFlag;
	}
	public void setPfVoucherFlag(String pfVoucherFlag) {
		this.pfVoucherFlag = pfVoucherFlag;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getAdvanceFlag() {
		return advanceFlag;
	}
	public void setAdvanceFlag(String advanceFlag) {
		this.advanceFlag = advanceFlag;
	}
	public double getActHospAmount() {
		return actHospAmount;
	}
	public void setActHospAmount(double actHospAmount) {
		this.actHospAmount = actHospAmount;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	
}
