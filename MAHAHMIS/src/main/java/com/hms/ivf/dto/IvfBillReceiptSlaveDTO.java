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

import com.hms.ipdbill.dto.BillReceiptSlaveDTO;

@Entity
@Table(name = "ivf_ehat_receipt_slave")
public class IvfBillReceiptSlaveDTO {

	@Id
	@GeneratedValue
	@Column(name = "bill_rec_slave_id")
	private Integer billRecSlaveId;
	
	@Column(name = "bill_receipt_master_id")
	private Integer billReceiptMasterId=0;
	
	@Column(name = "receipt_master_count",columnDefinition="int default 0")
	private Integer ReceiptMasterCount=0;
	
	@Column(name = "bill_id")
	private Integer billId=0;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId=0;
	
	@Column(name = "treatment_id")
	private Integer treatmentId=0;
	
	@Column(name = "patient_id")
	private Integer patientId=0;
	
	@Column(name = "department_id")
	private Integer departmentId=0;
	
	@Column(name = "comp_name")
	private String compName;
	
	@Column(name = "unit_id")
	private int unitId=1;	
	
	@Column(name = "against_id")
	private int againstId=0;	
	
	@Column(name = "clinical_notes")
	private String clinicalnotes="-";	
	
	@Column(name = "instructions")
	private String instructions="-";	
	
	@Column(name = "urgentflag")
	private String urgentflag="N";
	
	@Column(name = "pay")
	private double pay=0.0;
	
	@Column(name = "co_pay")
	private double coPay=0.0;
		
	@Column(name = "doctor_id")
	private int doctorId=0;
	
	@Column(name = "source_type_id")
	private int sourceTypeId=1;
	
	@Column(name = "service_id")
	private int serviceId=0;
	
	@Column(name = "sub_service_id")
	private int subServiceId=0;
	
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
	
	// added for refund
	@Column(name = "actual_ref_per")
	private double actualRefPer=0;
	
	@Column(name = "actual_ref_amt")
	private double actualRefAmt=0;
	// added for refund
	
	@Column(name = "actual_final_payable")
	private double actualFinalPayable=0;
	
	@Column(name = "actual_final_paid")
	private double actualFinalPaid=0;
	
	@Column(name = "narrationid")
	private String narrationid;
	
	@Column(name = "advance_flag")
	private String advanceFlag="N";
	
	@Transient
	private Double totalBillAmount=0.0;
	
	// added for profees
	
	@Column(name = "rate")
	private double rate=0.0;
	
	@Column(name = "quantity")
	private double quantity=1.0;
	
	@Column(name = "concession")
	private double concession=0.0;
	
	@Column(name = "amount")
	private double amount=0.0;
	
	@Column(name = "discount")
	private double discount=0.0;
	
	@Column(name = "paid")
	private double paid=0.0;
	
	@Column(name = "remain")
	private double remain=0.0;
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "refund_amt")
	private double refundAmt=0.0;
	
	@Column(name = "reduction")
	private double reduction=0.0;
	
	@Column(name = "refund_flag")
	private String refundFlag="N";

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
		
	@Column(name = "doctor_payment_flag")
	private String doctorPaymentFlag="N";
	
	@Transient
	private Double sumAmount=0.0;
	
	@Transient
	private Double sumConcession=0.0;
	
	@Transient
	private Double sumHospAmount=0.0;
	
	@Transient
	private Double sumNet=0.0;
	
	@Column(name = "ref_dr_id")
	private Integer refDrId=0;
	
	@Column(name = "ref_dr_percent")
	private Double refDrPercent=0.0;
	
	@Column(name = "ref_dr_amount")
	private Double refDrAmount=0.0;
	
	@Transient
	private List<IvfBillReceiptSlaveDTO> listBillReceiptSlave;
	
	@Transient
	private List<IvfBillReceiptSlaveDTO> listBillReceiptSlaveDiago;

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

	public Integer getReceiptMasterCount() {
		return ReceiptMasterCount;
	}

	public void setReceiptMasterCount(Integer receiptMasterCount) {
		ReceiptMasterCount = receiptMasterCount;
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

	public String getClinicalnotes() {
		return clinicalnotes;
	}

	public void setClinicalnotes(String clinicalnotes) {
		this.clinicalnotes = clinicalnotes;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public String getUrgentflag() {
		return urgentflag;
	}

	public void setUrgentflag(String urgentflag) {
		this.urgentflag = urgentflag;
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

	public double getActualRefPer() {
		return actualRefPer;
	}

	public void setActualRefPer(double actualRefPer) {
		this.actualRefPer = actualRefPer;
	}

	public double getActualRefAmt() {
		return actualRefAmt;
	}

	public void setActualRefAmt(double actualRefAmt) {
		this.actualRefAmt = actualRefAmt;
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

	//adding more variables
	
	public List<IvfBillReceiptSlaveDTO> getListBillReceiptSlave() {
		return listBillReceiptSlave;
	}

	public void setListBillReceiptSlave(List<IvfBillReceiptSlaveDTO> listBillReceiptSlave) {
		this.listBillReceiptSlave = listBillReceiptSlave;
	}
	
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
	
	@Column(name = "hospAmount")
	private double hospAmount=0;
	
	@Column(name = "actHospAmount")
	private double actHospAmount=0;
	
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

	public String getDoctorPaymentFlag() {
		return doctorPaymentFlag;
	}

	public void setDoctorPaymentFlag(String doctorPaymentFlag) {
		this.doctorPaymentFlag = doctorPaymentFlag;
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

	public double getActualPayable() {
		return actualPayable;
	}

	public void setActualPayable(double actualPayable) {
		this.actualPayable = actualPayable;
	}

	public String getNarrationid() {
		return narrationid;
	}

	public void setNarrationid(String narrationid) {
		this.narrationid = narrationid;
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

	public Double getSumAmount() {
		return sumAmount;
	}

	public void setSumAmount(Double sumAmount) {
		this.sumAmount = sumAmount;
	}

	public Double getSumConcession() {
		return sumConcession;
	}

	public void setSumConcession(Double sumConcession) {
		this.sumConcession = sumConcession;
	}

	public Double getSumHospAmount() {
		return sumHospAmount;
	}

	public void setSumHospAmount(Double sumHospAmount) {
		this.sumHospAmount = sumHospAmount;
	}

	public Double getSumNet() {
		return sumNet;
	}

	public void setSumNet(Double sumNet) {
		this.sumNet = sumNet;
	}

	public List<IvfBillReceiptSlaveDTO> getListBillReceiptSlaveDiago() {
		return listBillReceiptSlaveDiago;
	}

	public void setListBillReceiptSlaveDiago(List<IvfBillReceiptSlaveDTO> listBillReceiptSlaveDiago) {
		this.listBillReceiptSlaveDiago = listBillReceiptSlaveDiago;
	}

	public int getRefDrId() {
		return refDrId;
	}

	public void setRefDrId(int refDrId) {
		this.refDrId = refDrId;
	}

	public Double getRefDrPercent() {
		return refDrPercent;
	}

	public void setRefDrPercent(Double refDrPercent) {
		this.refDrPercent = refDrPercent;
	}

	public Double getRefDrAmount() {
		return refDrAmount;
	}

	public void setRefDrAmount(Double refDrAmount) {
		this.refDrAmount = refDrAmount;
	}

	public Double getTotalBillAmount() {
		return totalBillAmount;
	}

	public void setTotalBillAmount(Double totalBillAmount) {
		this.totalBillAmount = totalBillAmount;
	}	
}
