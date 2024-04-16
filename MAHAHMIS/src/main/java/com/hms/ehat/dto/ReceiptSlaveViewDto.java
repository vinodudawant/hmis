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

import org.hibernate.annotations.Immutable;


@Entity
@Immutable
@Table(name = "ehat_receipt_slave_view")
public class ReceiptSlaveViewDto {
	
	@Id
	@Column(name = "billRecSlaveId")
	private int billRecSlaveId;
	
	@Column(name = "billReceiptMasterId")
	private int billReceiptMasterId;
	
	@Column(name = "billId")
	private int billId;
	
	@Column(name = "billDetailsId")
	private int billDetailsId;
	
	@Column(name = "treatmentId")
	private int treatmentId;
	
	@Column(name = "patientId")
	private int patientId;
	
	@Column(name = "departmentId")
	private int departmentId;
	
	@Column(name = "compName")
	private String compName;
	
	@Column(name = "unitId")
	private int unitId=1;	
	
	@Column(name = "doctorId")
	private int doctorId=0;
	
	@Column(name = "sourceTypeId")
	private int sourceTypeId=0;
	
	@Column(name = "serviceId")
	private int serviceId=0;
	
	@Column(name = "subServiceId")
	private int subServiceId=0;
	
	@Column(name = "rate")
	private double rate=0.0;
	
	@Column(name = "quantity")
	private double quantity=1.0;
	
	@Column(name = "concession")
	private double concession=0.0;
	
	@Column(name = "concession_per")
	private double concessionPer=0.0;
	
	@Column(name = "amount")
	private double amount=0.0;
	
	@Column(name = "discount")
	private double discount=0.0;
	
	@Column(name = "discount_per")
	private double discountPer=0.0;
	
	@Column(name = "paid")
	private double paid=0.0;
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "pfVoucherFlag")
	private String pfVoucherFlag="N";

	@Temporal(TemporalType.DATE)
	@Column(name = "serviceAssignDate",updatable=false)
	private Date serviceAssignDate;
		
	@Transient
	private List<ReceiptSlaveViewDto> listReceiptSlaveViewDto;
	
	@Transient
	private String patientName;
	
	@Transient
	private String doctorName;
	
	@Transient
	private String specialisationName;
	
	@Transient
	private String unitName;
	
	@Transient
	private String deptName;
	
	@Transient
	private String serviceName;
	
	@Transient
	private int caseType;
	
	@Transient
	private String refundFlag;
	
	@Transient
	@Column(name = "totalBillAmount")
	private double totalBillAmount;
	
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
	
	@Column(name = "actual_final_paid")
	private double actualFinalPaid=0;
	
	@Column(name = "actual_final_payable")
	private double actualFinalPayable=0;
	
	
	public String getRefundFlag() {
		return refundFlag;
	}

	public void setRefundFlag(String refundFlag) {
		this.refundFlag = refundFlag;
	}
	
	public int getBillRecSlaveId() {
		return billRecSlaveId;
	}

	public void setBillRecSlaveId(int billRecSlaveId) {
		this.billRecSlaveId = billRecSlaveId;
	}

	public int getBillReceiptMasterId() {
		return billReceiptMasterId;
	}

	public void setBillReceiptMasterId(int billReceiptMasterId) {
		this.billReceiptMasterId = billReceiptMasterId;
	}

	public int getBillId() {
		return billId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public int getBillDetailsId() {
		return billDetailsId;
	}

	public void setBillDetailsId(int billDetailsId) {
		this.billDetailsId = billDetailsId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Date getServiceAssignDate() {
		return serviceAssignDate;
	}

	public void setServiceAssignDate(Date serviceAssignDate) {
		this.serviceAssignDate = serviceAssignDate;
	}

	public List<ReceiptSlaveViewDto> getListReceiptSlaveViewDto() {
		return listReceiptSlaveViewDto;
	}

	public void setListReceiptSlaveViewDto(
			List<ReceiptSlaveViewDto> listReceiptSlaveViewDto) {
		this.listReceiptSlaveViewDto = listReceiptSlaveViewDto;
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

	public int getCaseType() {
		return caseType;
	}

	public void setCaseType(int caseType) {
		this.caseType = caseType;
	}

	public double getTotalBillAmount() {
		return totalBillAmount;
	}

	public void setTotalBillAmount(double totalBillAmount) {
		this.totalBillAmount = totalBillAmount;
	}

	public String getPfVoucherFlag() {
		return pfVoucherFlag;
	}

	public void setPfVoucherFlag(String pfVoucherFlag) {
		this.pfVoucherFlag = pfVoucherFlag;
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

	public String getSpecialisationName() {
		return specialisationName;
	}

	public void setSpecialisationName(String specialisationName) {
		this.specialisationName = specialisationName;
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

	public double getActualFinalPaid() {
		return actualFinalPaid;
	}

	public void setActualFinalPaid(double actualFinalPaid) {
		this.actualFinalPaid = actualFinalPaid;
	}

	public double getActualFinalPayable() {
		return actualFinalPayable;
	}

	public void setActualFinalPayable(double actualFinalPayable) {
		this.actualFinalPayable = actualFinalPayable;
	}

	public double getConcessionPer() {
		return concessionPer;
	}

	public void setConcessionPer(double concessionPer) {
		this.concessionPer = concessionPer;
	}

	public double getDiscountPer() {
		return discountPer;
	}

	public void setDiscountPer(double discountPer) {
		this.discountPer = discountPer;
	}

	
}
