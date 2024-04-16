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

import com.hms.ipdbill.dto.BillReceiptSlaveDTO;

@Entity
@Table(name = "ehat_profees_doctors_payment")
public class ProfeesDoctorsPaymentDto {

	@Id
	@GeneratedValue
	@Column(name = "profeesId")
	private int profeesId;
	
	@Column(name = "unitId")
	private int unitId;
	
	@Column(name = "deptId")
	private int deptId;
	
	@Column(name = "doctorId")
	private int doctorId;
	
	@Column(name = "serviceId")
	private int serviceId;
	
	@Column(name = "subServiceId")
	private int subServiceId;
	
	@Column(name = "treatmentId")
	private int treatmentId;
	
	@Column(name = "patientId")
	private int patientId;
	
	@Column(name = "billReceiptMasterId")
	private int billReceiptMasterId;
	
	@Column(name = "billReceiptSlaveId")
	private int billReceiptSlaveId;
	
	@Column(name = "refDrId")
	private int refDrId=0;
	
	@Column(name = "refDrPercent")
	private Double refDrPercent=0.0;
	
	@Column(name = "refDrAmount")
	private Double refDrAmount=0.0;
	
	@Column(name = "paid")
	private Double paid=0.0;
	
	@Column(name = "rate",columnDefinition="Double default 0")
	private Double rate;
	
	@Column(name = "quantity",columnDefinition="Double default 1")
	private Double quantity;
	
	@Column(name = "concession",columnDefinition="Double default 0")
	private Double concession;
	
	@Column(name = "concession_per",columnDefinition="Double default 0")
	private Double concessionPer;
	
	@Column(name = "discount",columnDefinition="Double default 0")
	private Double discount;
	
	@Column(name = "discount_per",columnDefinition="Double default 0")
	private Double discountPer;
	
	@Column(name = "reduction",columnDefinition="Double default 0")
	private Double reduction;
	
	@Column(name = "amount",columnDefinition="Double default 1")
	private Double amount;
	
	@Column(name = "hospPercent",columnDefinition="Double default 0")
	private Double hospPercent;
	
	@Column(name = "hospPercentInAmount",columnDefinition="Double default 0")
	private Double hospPercentInAmount;
	
	@Column(name = "pfAmount",columnDefinition="Double default 0")
	private Double pfAmount;
	
	@Column(name = "pfPaid",columnDefinition="Double default 0")
	private Double pfPaid;
	
	@Column(name = "pfUnpaid",columnDefinition="Double default 0")
	private Double pfUnpaid;
	
	@Column(name = "pfPaidStatus",columnDefinition="varchar(55) default 'unpaid'")
	private String pfPaidStatus;
	
	@Column(name = "voucherGenerated",columnDefinition="varchar(2) default 'N'")
	private String voucherGenerated;
	
	@Column(name = "componentName")
	private String componentName;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted;

	@Column(name = "createdBy",updatable=false)
	private int createdBy;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "serviceAssignDate",updatable=false)
	private Date serviceAssignDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createdDateTime",updatable=false)
	private Date createdDateTime;

	@Column(name = "updatedBy")
	private int updatedBy;
	
	@Column(name = "caseType")
	private int caseType;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updatedDateTime")
	private Date updatedDateTime;

	@Column(name = "deletedBy")
	private int deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deletedDateTime")
	private Date deletedDateTime;
	
	@Column(name = "totalBillAmount")
	private Double totalBillAmount;

	@Column(name = "actual_amt")
	private Double actualAmt=0.0;
	
	@Column(name = "actual_concn_per")
	private Double actualConcnPer=0.0;
	
	@Column(name = "actual_concn_amt")
	private Double actualConcnAmt=0.0;
	
	@Column(name = "actual_payable")
	private Double actualPayable=0.0;
	
	@Column(name = "actual_disc_per")
	private Double actualDiscPer=0.0;
	
	@Column(name = "actual_disc_amt")
	private Double actualDiscAmt=0.0;
	
	@Column(name = "actual_final_paid")
	private Double actualFinalPaid=0.0;
	
	@Column(name = "advance_flag")
	private String advanceFlag="N";
	
	@Column(name = "actHospAmount")
	private Double actHospAmount=0.0;
	
	@Column(name = "hospAmount")
	private Double hospAmount=0.0;
	
	@Column(name = "actual_final_payable")
	private Double actualFinalPayable=0.0;
	
	@Column(name = "sourceTypeId")
	private int sourceTypeId=0;
	
	@Column(name = "chargesId")
	private int chargesId=0;
	
	@Column(name = "chargesSlaveId")
	private int chargesSlaveId=0;
	
	@Column(name = "drDeptId")
	private int drDeptId=0;
	
	@Column(name = "drDeptIdStr")
	private String drDeptIdStr;
	
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
	private Double pfReduction;
	
	@Transient
	private Double pfAddition;
	
	@Transient
	private int pfVoucherId;
	
	@Transient
	private String pfVoucherFlag="N";
	
	@Transient
	private int billId;
	
	@Transient
	private int billNo;
	
	@Transient
	private int billDetailsId;
	
	@Transient
	private String specialisationName;
	
	@Transient
	private String refundFlag="N";
	
	@Transient
	private Double refundAmount;
	
	@Transient
	private Double refund;
	
	@Transient
	private Double refundPer;
	
	@Column(name = "sum_amount")
	private Double sumAmount=0.0;
	
	@Column(name = "sum_concession")
	private Double sumConcession=0.0;
	
	@Column(name = "sum_hosp_amount")
	private Double sumHospAmount=0.0;
	
	@Column(name = "sum_net")
	private Double sumNet=0.0;
	
	@Column(name = "fixed_income")
	private Double fixedIncome=0.0;
	
	@Column(name = "iscombination",columnDefinition="varchar(2) default 'N'")
	private String iscombination="N";
	
	@Transient
	private int otherBillDIdIpd=0;
	
	@Transient
	private int otherBillDIdOpd=0;
	
	@Transient
	private Double profeesPercentage;
	
	@Transient
	private String category_name;
	


	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	@Column(name = "other_amount",columnDefinition="Double default 0")
	private Double otherAmount;
	
	@Column(name = "other_concession",columnDefinition="Double default 0")
	private Double otherConcession;
	
	@Column(name = "other_pay",columnDefinition="Double default 0")
	private Double otherPay;
	
	@Column(name = "other_rate",columnDefinition="Double default 0")
	private Double otherRate;
	
	@Transient
	private Double totalSumAmount=0.0;
	
	@Transient
	private Double totalSumConcession=0.0;
	
	@Transient
	private Double totalSumHospAmount=0.0;
	
	@Transient
	private Double totalSumNet=0.0;
	
	@Transient
	private Double totalRemain=0.0;
	
	@Transient
	private Double totalBill=0.0;
	
	@Transient
	private List<ProfeesDoctorsPaymentDto> listProFees;
	
	@Transient
	private List<BillReceiptSlaveDTO> listBillReceiptSlave;
	
	@Transient
	private List<BillReceiptSlaveDTO> listBillReceiptSlaveDiago;
	
	@Transient
	private List<BillReceiptSlaveDTO> listBillOpdMediclaimCredit;
	
	@Transient
	private List<BillReceiptSlaveDTO> listBillDiagoMediclaimCredit;
	
	@Transient
	private List<BillReceiptSlaveDTO> listBillReceiptSlaveCredit;
	
	@Transient
	private List<BillReceiptSlaveDTO> listBillReceiptSlaveDiagoCredit;
	
	@Transient
	private List<BillDetailsIpdDto> listBillDetailsIpd;
	
	@Transient
	private List<BillDetailsIpdDto> listBillDetailsIpdCredit;
	
	@Transient
	private List<BillDetailsIpdDto> listBillIpdMediclaimCash;
	
	@Transient
	private List<BillDetailsIpdDto> listBillIpdMediclaimCredit;
	
	@Transient
	private List<GroupReceiptSlaveDetails> listGroupReceiptSlave;
	
	@Transient
	private List<GroupReceiptSlaveDetails> listGroupReceiptSlaveCredit;
	
	@Transient
	private List<GroupReceiptSlaveDetails> listGroupMediclaimCash;
	
	@Transient
	private List<GroupReceiptSlaveDetails> listGroupMediclaimCredit;
	
	@Transient
	private List<EhatOtherBillDetailForOpdDto> listOBDForOpdCash;
	
	@Transient
	private List<EhatOtherBillDetailForOpdDto> listOBDForOpdCredit;
	
	@Transient
	private List<EhatOtherBillDetailForOpdDto> listOBDForOpdMediclaimCash;
	
	@Transient
	private List<EhatOtherBillDetailForOpdDto> listOBDForOpdMediclaimCredit;
	
	@Transient
	private List<EhatOtherBillDetailForOpdDto> listOBDForDiagoCash;
	
	@Transient
	private List<EhatOtherBillDetailForOpdDto> listOBDForDiagoCredit;
	
	@Transient
	private List<EhatOtherBillDetailForOpdDto> listOBDForDiagoMediclaimCash;
	
	@Transient
	private List<EhatOtherBillDetailForOpdDto> listOBDForDiagoMediclaimCredit;
	
	@Transient
	private List<EhatOtherBillDetailForIpdDto> listOBDForIpdCash;
	
	@Transient
	private List<EhatOtherBillDetailForIpdDto> listOBDForIpdCredit;
	
	@Transient
	private List<EhatOtherBillDetailForIpdDto> listOBDForIpdMediclaimCash;
	
	@Transient
	private List<EhatOtherBillDetailForIpdDto> listOBDForIpdMediclaimCredit;
	
	
	
	//--------------------------------------------------------------------------------------
	
	public int getBillNo() {
		return billNo;
	}

	public void setBillNo(int billNo) {
		this.billNo = billNo;
	}
	
	public int getProfeesId() {
		return profeesId;
	}

	public void setProfeesId(int profeesId) {
		this.profeesId = profeesId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
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

	public Double getRate() {
		return rate;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	public Double getConcession() {
		return concession;
	}

	public void setConcession(Double concession) {
		this.concession = concession;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public Double getReduction() {
		return reduction;
	}

	public Double getProfeesPercentage() {
		return profeesPercentage;
	}

	public void setProfeesPercentage(Double profeesPercentage) {
		this.profeesPercentage = profeesPercentage;
	}

	public void setReduction(Double reduction) {
		this.reduction = reduction;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Double getHospPercent() {
		return hospPercent;
	}

	public void setHospPercent(Double hospPercent) {
		this.hospPercent = hospPercent;
	}

	public Double getHospPercentInAmount() {
		return hospPercentInAmount;
	}

	public void setHospPercentInAmount(Double hospPercentInAmount) {
		this.hospPercentInAmount = hospPercentInAmount;
	}

	public Double getPfAmount() {
		return pfAmount;
	}

	public void setPfAmount(Double pfAmount) {
		this.pfAmount = pfAmount;
	}

	public Double getPfPaid() {
		return pfPaid;
	}

	public void setPfPaid(Double pfPaid) {
		this.pfPaid = pfPaid;
	}

	public Double getPfUnpaid() {
		return pfUnpaid;
	}

	public void setPfUnpaid(Double pfUnpaid) {
		this.pfUnpaid = pfUnpaid;
	}

	public String getPfPaidStatus() {
		return pfPaidStatus;
	}

	public void setPfPaidStatus(String pfPaidStatus) {
		this.pfPaidStatus = pfPaidStatus;
	}

	public String getVoucherGenerated() {
		return voucherGenerated;
	}

	public void setVoucherGenerated(String voucherGenerated) {
		this.voucherGenerated = voucherGenerated;
	}

	public String getComponentName() {
		return componentName;
	}

	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
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

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public int getCaseType() {
		return caseType;
	}

	public void setCaseType(int caseType) {
		this.caseType = caseType;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
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

	public List<ProfeesDoctorsPaymentDto> getListProFees() {
		return listProFees;
	}

	public void setListProFees(List<ProfeesDoctorsPaymentDto> listProFees) {
		this.listProFees = listProFees;
	}

	public Double getTotalBillAmount() {
		return totalBillAmount;
	}

	public void setTotalBillAmount(Double totalBillAmount) {
		this.totalBillAmount = totalBillAmount;
	}

	public Double getPaid() {
		return paid;
	}

	public void setPaid(Double paid) {
		this.paid = paid;
	}

	public Double getPfReduction() {
		return pfReduction;
	}

	public void setPfReduction(Double pfReduction) {
		this.pfReduction = pfReduction;
	}

	public Double getPfAddition() {
		return pfAddition;
	}

	public void setPfAddition(Double pfAddition) {
		this.pfAddition = pfAddition;
	}

	public int getPfVoucherId() {
		return pfVoucherId;
	}

	public void setPfVoucherId(int pfVoucherId) {
		this.pfVoucherId = pfVoucherId;
	}

	public Double getActualAmt() {
		return actualAmt;
	}

	public void setActualAmt(Double actualAmt) {
		this.actualAmt = actualAmt;
	}

	public Double getActualConcnPer() {
		return actualConcnPer;
	}

	public void setActualConcnPer(Double actualConcnPer) {
		this.actualConcnPer = actualConcnPer;
	}

	public Double getActualConcnAmt() {
		return actualConcnAmt;
	}

	public void setActualConcnAmt(Double actualConcnAmt) {
		this.actualConcnAmt = actualConcnAmt;
	}

	public Double getActualPayable() {
		return actualPayable;
	}

	public void setActualPayable(Double actualPayable) {
		this.actualPayable = actualPayable;
	}

	public Double getActualDiscPer() {
		return actualDiscPer;
	}

	public void setActualDiscPer(Double actualDiscPer) {
		this.actualDiscPer = actualDiscPer;
	}

	public Double getActualDiscAmt() {
		return actualDiscAmt;
	}

	public void setActualDiscAmt(Double actualDiscAmt) {
		this.actualDiscAmt = actualDiscAmt;
	}

	public Double getActualFinalPaid() {
		return actualFinalPaid;
	}

	public void setActualFinalPaid(Double actualFinalPaid) {
		this.actualFinalPaid = actualFinalPaid;
	}

	public String getAdvanceFlag() {
		return advanceFlag;
	}

	public void setAdvanceFlag(String advanceFlag) {
		this.advanceFlag = advanceFlag;
	}

	public Double getActHospAmount() {
		return actHospAmount;
	}

	public void setActHospAmount(Double actHospAmount) {
		this.actHospAmount = actHospAmount;
	}

	public Double getActualFinalPayable() {
		return actualFinalPayable;
	}

	public void setActualFinalPayable(Double actualFinalPayable) {
		this.actualFinalPayable = actualFinalPayable;
	}

	public Double getConcessionPer() {
		return concessionPer;
	}

	public void setConcessionPer(Double concessionPer) {
		this.concessionPer = concessionPer;
	}

	public Double getDiscountPer() {
		return discountPer;
	}

	public void setDiscountPer(Double discountPer) {
		this.discountPer = discountPer;
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

	public int getSourceTypeId() {
		return sourceTypeId;
	}

	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public String getPfVoucherFlag() {
		return pfVoucherFlag;
	}

	public void setPfVoucherFlag(String pfVoucherFlag) {
		this.pfVoucherFlag = pfVoucherFlag;
	}

	public String getSpecialisationName() {
		return specialisationName;
	}

	public void setSpecialisationName(String specialisationName) {
		this.specialisationName = specialisationName;
	}

	public String getRefundFlag() {
		return refundFlag;
	}

	public void setRefundFlag(String refundFlag) {
		this.refundFlag = refundFlag;
	}

	public Double getHospAmount() {
		return hospAmount;
	}

	public void setHospAmount(Double hospAmount) {
		this.hospAmount = hospAmount;
	}

	public int getChargesId() {
		return chargesId;
	}

	public void setChargesId(int chargesId) {
		this.chargesId = chargesId;
	}

	public int getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(int chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public int getDrDeptId() {
		return drDeptId;
	}

	public void setDrDeptId(int drDeptId) {
		this.drDeptId = drDeptId;
	}

	public String getDrDeptIdStr() {
		return drDeptIdStr;
	}

	public void setDrDeptIdStr(String drDeptIdStr) {
		this.drDeptIdStr = drDeptIdStr;
	}

	public Double getRefundAmount() {
		return refundAmount;
	}

	public void setRefundAmount(Double refundAmount) {
		this.refundAmount = refundAmount;
	}

	public Double getRefundPer() {
		return refundPer;
	}

	public void setRefundPer(Double refundPer) {
		this.refundPer = refundPer;
	}

	public List<BillReceiptSlaveDTO> getListBillReceiptSlave() {
		return listBillReceiptSlave;
	}

	public void setListBillReceiptSlave(
			List<BillReceiptSlaveDTO> listBillReceiptSlave) {
		this.listBillReceiptSlave = listBillReceiptSlave;
	}

	public List<BillDetailsIpdDto> getListBillDetailsIpd() {
		return listBillDetailsIpd;
	}

	public void setListBillDetailsIpd(List<BillDetailsIpdDto> listBillDetailsIpd) {
		this.listBillDetailsIpd = listBillDetailsIpd;
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

	public List<BillReceiptSlaveDTO> getListBillReceiptSlaveDiago() {
		return listBillReceiptSlaveDiago;
	}

	public void setListBillReceiptSlaveDiago(
			List<BillReceiptSlaveDTO> listBillReceiptSlaveDiago) {
		this.listBillReceiptSlaveDiago = listBillReceiptSlaveDiago;
	}

	public List<BillReceiptSlaveDTO> getListBillReceiptSlaveCredit() {
		return listBillReceiptSlaveCredit;
	}

	public void setListBillReceiptSlaveCredit(
			List<BillReceiptSlaveDTO> listBillReceiptSlaveCredit) {
		this.listBillReceiptSlaveCredit = listBillReceiptSlaveCredit;
	}

	public List<BillReceiptSlaveDTO> getListBillReceiptSlaveDiagoCredit() {
		return listBillReceiptSlaveDiagoCredit;
	}

	public void setListBillReceiptSlaveDiagoCredit(
			List<BillReceiptSlaveDTO> listBillReceiptSlaveDiagoCredit) {
		this.listBillReceiptSlaveDiagoCredit = listBillReceiptSlaveDiagoCredit;
	}

	public List<BillDetailsIpdDto> getListBillDetailsIpdCredit() {
		return listBillDetailsIpdCredit;
	}

	public void setListBillDetailsIpdCredit(
			List<BillDetailsIpdDto> listBillDetailsIpdCredit) {
		this.listBillDetailsIpdCredit = listBillDetailsIpdCredit;
	}

	public List<GroupReceiptSlaveDetails> getListGroupReceiptSlave() {
		return listGroupReceiptSlave;
	}

	public void setListGroupReceiptSlave(
			List<GroupReceiptSlaveDetails> listGroupReceiptSlave) {
		this.listGroupReceiptSlave = listGroupReceiptSlave;
	}

	public List<GroupReceiptSlaveDetails> getListGroupReceiptSlaveCredit() {
		return listGroupReceiptSlaveCredit;
	}

	public void setListGroupReceiptSlaveCredit(
			List<GroupReceiptSlaveDetails> listGroupReceiptSlaveCredit) {
		this.listGroupReceiptSlaveCredit = listGroupReceiptSlaveCredit;
	}

	public Double getFixedIncome() {
		return fixedIncome;
	}

	public void setFixedIncome(Double fixedIncome) {
		this.fixedIncome = fixedIncome;
	}

	public String getIscombination() {
		return iscombination;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public int getOtherBillDIdIpd() {
		return otherBillDIdIpd;
	}

	public void setOtherBillDIdIpd(int otherBillDIdIpd) {
		this.otherBillDIdIpd = otherBillDIdIpd;
	}

	public int getOtherBillDIdOpd() {
		return otherBillDIdOpd;
	}

	public void setOtherBillDIdOpd(int otherBillDIdOpd) {
		this.otherBillDIdOpd = otherBillDIdOpd;
	}

	public List<EhatOtherBillDetailForOpdDto> getListOBDForOpdCash() {
		return listOBDForOpdCash;
	}

	public void setListOBDForOpdCash(
			List<EhatOtherBillDetailForOpdDto> listOBDForOpdCash) {
		this.listOBDForOpdCash = listOBDForOpdCash;
	}

	public List<EhatOtherBillDetailForOpdDto> getListOBDForOpdCredit() {
		return listOBDForOpdCredit;
	}

	public void setListOBDForOpdCredit(
			List<EhatOtherBillDetailForOpdDto> listOBDForOpdCredit) {
		this.listOBDForOpdCredit = listOBDForOpdCredit;
	}

	public List<EhatOtherBillDetailForOpdDto> getListOBDForDiagoCash() {
		return listOBDForDiagoCash;
	}

	public void setListOBDForDiagoCash(
			List<EhatOtherBillDetailForOpdDto> listOBDForDiagoCash) {
		this.listOBDForDiagoCash = listOBDForDiagoCash;
	}

	public List<EhatOtherBillDetailForOpdDto> getListOBDForDiagoCredit() {
		return listOBDForDiagoCredit;
	}

	public void setListOBDForDiagoCredit(
			List<EhatOtherBillDetailForOpdDto> listOBDForDiagoCredit) {
		this.listOBDForDiagoCredit = listOBDForDiagoCredit;
	}

	public List<EhatOtherBillDetailForIpdDto> getListOBDForIpdCash() {
		return listOBDForIpdCash;
	}

	public void setListOBDForIpdCash(
			List<EhatOtherBillDetailForIpdDto> listOBDForIpdCash) {
		this.listOBDForIpdCash = listOBDForIpdCash;
	}

	public List<EhatOtherBillDetailForIpdDto> getListOBDForIpdCredit() {
		return listOBDForIpdCredit;
	}

	public void setListOBDForIpdCredit(
			List<EhatOtherBillDetailForIpdDto> listOBDForIpdCredit) {
		this.listOBDForIpdCredit = listOBDForIpdCredit;
	}

	public Double getOtherAmount() {
		return otherAmount;
	}

	public void setOtherAmount(Double otherAmount) {
		this.otherAmount = otherAmount;
	}

	public Double getOtherConcession() {
		return otherConcession;
	}

	public void setOtherConcession(Double otherConcession) {
		this.otherConcession = otherConcession;
	}

	public Double getOtherPay() {
		return otherPay;
	}

	public void setOtherPay(Double otherPay) {
		this.otherPay = otherPay;
	}

	public Double getOtherRate() {
		return otherRate;
	}

	public void setOtherRate(Double otherRate) {
		this.otherRate = otherRate;
	}

	public List<BillReceiptSlaveDTO> getListBillOpdMediclaimCredit() {
		return listBillOpdMediclaimCredit;
	}

	public void setListBillOpdMediclaimCredit(
			List<BillReceiptSlaveDTO> listBillOpdMediclaimCredit) {
		this.listBillOpdMediclaimCredit = listBillOpdMediclaimCredit;
	}

	public List<BillReceiptSlaveDTO> getListBillDiagoMediclaimCredit() {
		return listBillDiagoMediclaimCredit;
	}

	public void setListBillDiagoMediclaimCredit(
			List<BillReceiptSlaveDTO> listBillDiagoMediclaimCredit) {
		this.listBillDiagoMediclaimCredit = listBillDiagoMediclaimCredit;
	}

	public List<BillDetailsIpdDto> getListBillIpdMediclaimCredit() {
		return listBillIpdMediclaimCredit;
	}

	public void setListBillIpdMediclaimCredit(
			List<BillDetailsIpdDto> listBillIpdMediclaimCredit) {
		this.listBillIpdMediclaimCredit = listBillIpdMediclaimCredit;
	}

	public List<GroupReceiptSlaveDetails> getListGroupMediclaimCredit() {
		return listGroupMediclaimCredit;
	}

	public void setListGroupMediclaimCredit(
			List<GroupReceiptSlaveDetails> listGroupMediclaimCredit) {
		this.listGroupMediclaimCredit = listGroupMediclaimCredit;
	}

	public List<EhatOtherBillDetailForOpdDto> getListOBDForOpdMediclaimCredit() {
		return listOBDForOpdMediclaimCredit;
	}

	public void setListOBDForOpdMediclaimCredit(
			List<EhatOtherBillDetailForOpdDto> listOBDForOpdMediclaimCredit) {
		this.listOBDForOpdMediclaimCredit = listOBDForOpdMediclaimCredit;
	}

	public List<EhatOtherBillDetailForOpdDto> getListOBDForDiagoMediclaimCredit() {
		return listOBDForDiagoMediclaimCredit;
	}

	public void setListOBDForDiagoMediclaimCredit(
			List<EhatOtherBillDetailForOpdDto> listOBDForDiagoMediclaimCredit) {
		this.listOBDForDiagoMediclaimCredit = listOBDForDiagoMediclaimCredit;
	}

	public List<EhatOtherBillDetailForIpdDto> getListOBDForIpdMediclaimCredit() {
		return listOBDForIpdMediclaimCredit;
	}

	public void setListOBDForIpdMediclaimCredit(
			List<EhatOtherBillDetailForIpdDto> listOBDForIpdMediclaimCredit) {
		this.listOBDForIpdMediclaimCredit = listOBDForIpdMediclaimCredit;
	}

	public List<BillDetailsIpdDto> getListBillIpdMediclaimCash() {
		return listBillIpdMediclaimCash;
	}

	public void setListBillIpdMediclaimCash(
			List<BillDetailsIpdDto> listBillIpdMediclaimCash) {
		this.listBillIpdMediclaimCash = listBillIpdMediclaimCash;
	}

	public List<GroupReceiptSlaveDetails> getListGroupMediclaimCash() {
		return listGroupMediclaimCash;
	}

	public void setListGroupMediclaimCash(
			List<GroupReceiptSlaveDetails> listGroupMediclaimCash) {
		this.listGroupMediclaimCash = listGroupMediclaimCash;
	}

	public List<EhatOtherBillDetailForOpdDto> getListOBDForOpdMediclaimCash() {
		return listOBDForOpdMediclaimCash;
	}

	public void setListOBDForOpdMediclaimCash(
			List<EhatOtherBillDetailForOpdDto> listOBDForOpdMediclaimCash) {
		this.listOBDForOpdMediclaimCash = listOBDForOpdMediclaimCash;
	}

	public List<EhatOtherBillDetailForOpdDto> getListOBDForDiagoMediclaimCash() {
		return listOBDForDiagoMediclaimCash;
	}

	public void setListOBDForDiagoMediclaimCash(
			List<EhatOtherBillDetailForOpdDto> listOBDForDiagoMediclaimCash) {
		this.listOBDForDiagoMediclaimCash = listOBDForDiagoMediclaimCash;
	}

	public List<EhatOtherBillDetailForIpdDto> getListOBDForIpdMediclaimCash() {
		return listOBDForIpdMediclaimCash;
	}

	public void setListOBDForIpdMediclaimCash(
			List<EhatOtherBillDetailForIpdDto> listOBDForIpdMediclaimCash) {
		this.listOBDForIpdMediclaimCash = listOBDForIpdMediclaimCash;
	}

	public Double getTotalSumAmount() {
		return totalSumAmount;
	}

	public void setTotalSumAmount(Double totalSumAmount) {
		this.totalSumAmount = totalSumAmount;
	}

	public Double getTotalSumConcession() {
		return totalSumConcession;
	}

	public void setTotalSumConcession(Double totalSumConcession) {
		this.totalSumConcession = totalSumConcession;
	}

	public Double getTotalSumHospAmount() {
		return totalSumHospAmount;
	}

	public void setTotalSumHospAmount(Double totalSumHospAmount) {
		this.totalSumHospAmount = totalSumHospAmount;
	}

	public Double getTotalSumNet() {
		return totalSumNet;
	}

	public void setTotalSumNet(Double totalSumNet) {
		this.totalSumNet = totalSumNet;
	}

	public Double getRefund() {
		return refund;
	}

	public void setRefund(Double refund) {
		this.refund = refund;
	}

	public Double getTotalRemain() {
		return totalRemain;
	}

	public void setTotalRemain(Double totalRemain) {
		this.totalRemain = totalRemain;
	}

	public Double getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(Double totalBill) {
		this.totalBill = totalBill;
	}
	
}
