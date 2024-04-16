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
@Table(name = "profees_group_receipt_slave")
public class GroupReceiptSlaveDetails {

	@Id
	@GeneratedValue
	@Column(name = "groupRecSlaveId")
	private Integer groupRecSlaveId;
	
	@Column(name = "billRecSlaveId")
	private int billRecSlaveId;
	
	@Column(name = "billReceiptMasterId")
	private int billReceiptMasterId=0;
	
	@Column(name = "billId")
	private int billId=0;
	
	@Column(name = "billDetailsId")
	private int billDetailsId=0;
	
	@Column(name = "treatmentId")
	private int treatmentId=0;
	
	@Column(name = "patientId")
	private int patientId=0;
	
	@Column(name = "departmentId")
	private int departmentId=0;
	
	@Column(name = "compName")
	private String compName;
	
	@Column(name = "unitId")
	private int unitId=1;	
	
	@Column(name = "againstId")
	private int againstId=0;	
	
	@Column(name = "clinicalnotes")
	private String clinicalnotes="-";	
	
	@Column(name = "instructions")
	private String instructions="-";	
	
	@Column(name = "urgentflag")
	private String urgentflag="N";
	
	@Column(name = "pay")
	private double pay=0.0;
	
	@Column(name = "coPay")
	private double coPay=0.0;
		
	@Column(name = "doctorId")
	private int doctorId=0;
	
	@Column(name = "sourceTypeId")
	private int sourceTypeId=1;
	
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
	
	@Column(name = "refundAmt")
	private double refundAmt=0.0;
	
	@Column(name = "reduction")
	private double reduction=0.0;
	
	@Column(name = "refundFlag")
	private String refundFlag="N";

	@Column(name = "createdBy",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "serviceAssignDate",updatable=false)
	private Date serviceAssignDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createdDateTime",updatable=false)
	private Date createdDateTime;

	@Column(name = "updatedBy")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updatedDateTime")
	private Date updatedDateTime;

	@Column(name = "deletedBy")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deletedDateTime")
	private Date deletedDateTime;
		
	@Column(name = "doctorPaymentFlag")
	private String doctorPaymentFlag="N";
	
	@Column(name = "equalDrPercent")
	private double equalPercent=0.0;
	
	@Column(name = "equalDrAmount")
	private double equalDrAmount=0.0;
	
	@Column(name = "individualDrPercent")
	private double individualDrPercent=0.0;
	
	@Column(name = "individualDrAmount")
	private double individualDrAmount=0.0;
	
	@Column(name = "totalDrPercent")
	private double totalDrPercent=0.0;
	
	@Column(name = "totalDrAmount")
	private double totalDrAmount=0.0;
	
	@Column(name = "groupMasterId")
	private int groupMasterId;
	
	@Column(name = "groupName")
	private String groupName;
	
	@Column(name = "advance_flag")
	private String advanceFlag="N";
	
	@Column(name = "actHospAmount")
	private double actHospAmount=0;
	
	@Transient
	private int caseType;
	
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
	
	@Column(name = "pfVoucherFlag")
	private String pfVoucherFlag="N";
	
	@Transient
	private Double sumAmount=0.0;
	
	@Transient
	private Double sumConcession=0.0;
	
	@Transient
	private Double sumHospAmount=0.0;
	
	@Transient
	private Double sumNet=0.0;
	
	@Column(name = "ref_dr_id")
	private int refDrId=0;
	
	@Column(name = "ref_dr_percent")
	private Double refDrPercent=0.0;
	
	@Column(name = "ref_dr_amount")
	private Double refDrAmount=0.0;
	
	@Transient
	private List<GroupReceiptSlaveDetails> listReceiptSlaveViewDto;

	
	//-------------------------------------------------------------------------------------------
	
	public Integer getGroupRecSlaveId() {
		return groupRecSlaveId;
	}

	public void setGroupRecSlaveId(Integer groupRecSlaveId) {
		this.groupRecSlaveId = groupRecSlaveId;
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

	public String getDoctorPaymentFlag() {
		return doctorPaymentFlag;
	}

	public void setDoctorPaymentFlag(String doctorPaymentFlag) {
		this.doctorPaymentFlag = doctorPaymentFlag;
	}

	public double getEqualPercent() {
		return equalPercent;
	}

	public void setEqualPercent(double equalPercent) {
		this.equalPercent = equalPercent;
	}

	public double getEqualDrAmount() {
		return equalDrAmount;
	}

	public void setEqualDrAmount(double equalDrAmount) {
		this.equalDrAmount = equalDrAmount;
	}

	public double getIndividualDrPercent() {
		return individualDrPercent;
	}

	public void setIndividualDrPercent(double individualDrPercent) {
		this.individualDrPercent = individualDrPercent;
	}

	public double getIndividualDrAmount() {
		return individualDrAmount;
	}

	public void setIndividualDrAmount(double individualDrAmount) {
		this.individualDrAmount = individualDrAmount;
	}

	public double getTotalDrPercent() {
		return totalDrPercent;
	}

	public void setTotalDrPercent(double totalDrPercent) {
		this.totalDrPercent = totalDrPercent;
	}

	public double getTotalDrAmount() {
		return totalDrAmount;
	}

	public void setTotalDrAmount(double totalDrAmount) {
		this.totalDrAmount = totalDrAmount;
	}

	public int getGroupMasterId() {
		return groupMasterId;
	}

	public void setGroupMasterId(int groupMasterId) {
		this.groupMasterId = groupMasterId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
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

	public int getCaseType() {
		return caseType;
	}

	public void setCaseType(int caseType) {
		this.caseType = caseType;
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

	public double getTotalBillAmount() {
		return totalBillAmount;
	}

	public void setTotalBillAmount(double totalBillAmount) {
		this.totalBillAmount = totalBillAmount;
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

	public List<GroupReceiptSlaveDetails> getListReceiptSlaveViewDto() {
		return listReceiptSlaveViewDto;
	}

	public void setListReceiptSlaveViewDto(
			List<GroupReceiptSlaveDetails> listReceiptSlaveViewDto) {
		this.listReceiptSlaveViewDto = listReceiptSlaveViewDto;
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
	
	
	
	
}
