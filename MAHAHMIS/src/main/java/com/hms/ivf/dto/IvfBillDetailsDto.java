package com.hms.ivf.dto;

import java.io.Serializable;
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

import com.hms.ehat.dto.BillDetailsDto;

@Entity
@Table(name = "ivf_ehat_bill_details")
public class IvfBillDetailsDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId=0;
	
	@Column(name = "patient_id")
	private Integer patienttId=0;
	
	@Column(name = "department_id")
	private Integer departmentId=0;
	
	@Column(name = "pay")
	private double pay=0;
	
	@Column(name = "co_pay")
	private double coPay=0;
	
	@Column(name = "paid_flag")
	private String paidFlag="N";

	@Column(name = "bill_id")
	private Integer billId=0;
	
	@Column(name = "doctor_id")
	private int doctorId=0;
	
	//by Default self which is 0
	@Column(name = "source_type_id")
	private int sourceTypeId=0;
	
	@Column(name = "service_id")
	private int serviceId=0;
	
	@Column(name = "sub_service_id")
	private int subServiceId=0;
	
	@Column(name = "on_bed_flag")
	private char onBedFlag='N';
	
	@Column(name = "rate")
	private double rate=0;
	
	@Column(name = "quantity")
	private double quantity=1;
	
	@Column(name = "concession")
	private double concession=0;
	
	@Column(name = "other_rate")
	private double otherRate=0;
	
	@Column(name = "amount")
	private double amount=0;
	
	@Column(name = "discount")
	private double discount=0;
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "cancle")
	private String cancle="N";
	
	@Column(name = "other_amount")
	private double otherAmount=0;
	
	@Column(name = "other_pay")
	private double otherPay=0;
	
	@Column(name = "other_concession")
	private double otherConcession=0;
	
	@Column(name = "other_co_pay")
	private double otherCoPay=0;
		
	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time")
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy=0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;	
	
	@Column(name = "unit_id")
	private int unitId=1;	
	
	@Column(name = "clinical_notes")
	private String clinicalnotes="-";	
	
	@Column(name = "instructions")
	private String instructions="-";	
	
	@Column(name = "urgentflag")
	private String urgentflag="N";
	
	@Column(name = "drdesk_flag")
	private String drdeskflag="N";

	@Column(name = "delete_from")
	private String deleteFrom="-";
	
	@Column(name = "sndtorisflag")
	private String sndToRisFlag="N";
	
	@Column(name = "account_status_opd_diagno")
	private String accountStatusOpdDiagno="N";
	
	@Column(name = "ivf_treatment_id",columnDefinition="int default 0")
	private Integer ivfTreatmentId=0;

	@Transient
	private Integer recSlaveId;

	@Transient
	private String callfrom;

	@Transient
	private Integer masterReceiptId;

	@Transient
	private String subservicesname;

	@Transient
	private String iscombination;

	@Column(name = "sponsor_id")
	private Integer sponsorId;	

	@Column(name = "charges_slave_id")
	private Integer chargesSlaveId;
	
	@Column(name = "concession_in_Perc")
	private double concessionOnPerc=0.0;
	
	@Column(name = "batch_No")
	private String batchNo;
	
	@Column(name = "ivf_couple_id")
	private Integer coupleID;
		
	@Transient
	private String receiptOf;

	//For Professional fees
	@Transient
	private String narrationid;

	@Column(name = "r_flag")
	private String rFlag="N";

      
	@Column(name = "narrationid_bill")
	private String narrationidBill="-";
	
	@Column(name = "emrPer",columnDefinition="double default 0")
	private double emrPer;
	
	@Column(name = "sndtolabflag",columnDefinition="varchar(15) default 'N'")
	private String sndToLabFlag="N";
	//For Professional fees

	@Transient
	private String sendToRisFlag;
	
	//added by irfan 12-sep-2018
	
	@Transient
	private Integer opdIpdNo;
	
	@Transient
	private String patientName;
	
	@Transient
	private String serviceName;
	
	@Transient
	private String subServiceName;
	
	@Transient
	private String doctorName;
	
	@Transient
	private String Hname;
	
	
	@Transient
	private String consultantName;

	@Transient
	private List<IvfBillDetailsDto> listBillDetails;
	
	@Column(name = "paid_by_cash_flag",columnDefinition="varchar(2) default 'N'")
	private String paidByCashFlag="N";	
	
	@Column(name = "canceled_by",columnDefinition="int default 0")
	private double canceledBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "canceled_date_time")
	private Date canceledDateTime;
		
	public double getCanceledBy() {
		return canceledBy;
	}

	public void setCanceledBy(double canceledBy) {
		this.canceledBy = canceledBy;
	}

	public Date getCanceledDateTime() {
		return canceledDateTime;
	}

	public void setCanceledDateTime(Date canceledDateTime) {
		this.canceledDateTime = canceledDateTime;
	}

	public String getPaidByCashFlag() {
		return paidByCashFlag;
	}

	public void setPaidByCashFlag(String paidByCashFlag) {
		this.paidByCashFlag = paidByCashFlag;
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

	public Integer getPatienttId() {
		return patienttId;
	}

	public void setPatienttId(Integer patienttId) {
		this.patienttId = patienttId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
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

	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
	}

	public Integer getBillId() {
		return billId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
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
	
	public char getOnBedFlag() {
		return onBedFlag;
	}

	public void setOnBedFlag(char onBedFlag) {
		this.onBedFlag = onBedFlag;
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

	public double getOtherRate() {
		return otherRate;
	}

	public void setOtherRate(double otherRate) {
		this.otherRate = otherRate;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getCancle() {
		return cancle;
	}

	public void setCancle(String cancle) {
		this.cancle = cancle;
	}

	public double getOtherAmount() {
		return otherAmount;
	}

	public void setOtherAmount(double otherAmount) {
		this.otherAmount = otherAmount;
	}

	public double getOtherPay() {
		return otherPay;
	}

	public void setOtherPay(double otherPay) {
		this.otherPay = otherPay;
	}

	public double getOtherConcession() {
		return otherConcession;
	}

	public void setOtherConcession(double otherConcession) {
		this.otherConcession = otherConcession;
	}

	public double getOtherCoPay() {
		return otherCoPay;
	}

	public void setOtherCoPay(double otherCoPay) {
		this.otherCoPay = otherCoPay;
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

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
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

	public String getDrdeskflag() {
		return drdeskflag;
	}

	public void setDrdeskflag(String drdeskflag) {
		this.drdeskflag = drdeskflag;
	}

	public Integer getRecSlaveId() {
		return recSlaveId;
	}

	public void setRecSlaveId(Integer recSlaveId) {
		this.recSlaveId = recSlaveId;
	}

	public String getCallfrom() {
		return callfrom;
	}


	public void setCallfrom(String callfrom) {
		this.callfrom = callfrom;
	}

	public Integer getMasterReceiptId() {
		return masterReceiptId;
	}

	public void setMasterReceiptId(Integer masterReceiptId) {
		this.masterReceiptId = masterReceiptId;
	}

	public String getSubservicesname() {
		return subservicesname;
	}

	public void setSubservicesname(String subservicesname) {
		this.subservicesname = subservicesname;
	}

	public String getIscombination() {
		return iscombination;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public Integer getSponsorId() {
		return sponsorId;
	}

	public void setSponsorId(Integer sponsorId) {
		this.sponsorId = sponsorId;
	}

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}	

	public List<IvfBillDetailsDto> getListBillDetails() {
		return listBillDetails;
	}

	public void setListBillDetails(List<IvfBillDetailsDto> listBillDetails) {
		this.listBillDetails = listBillDetails;
	}

	public double getConcessionOnPerc() {
		return concessionOnPerc;
	}

	public void setConcessionOnPerc(double concessionOnPerc) {
		this.concessionOnPerc = concessionOnPerc;
	}

	public String getReceiptOf() {
		return receiptOf;
	}

	public void setReceiptOf(String receiptOf) {
		this.receiptOf = receiptOf;
	}

	public String getNarrationid() {
		return narrationid;
	}

	public void setNarrationid(String narrationid) {
		this.narrationid = narrationid;
	}

	public String getNarrationidBill() {
		return narrationidBill;
	}

	public void setNarrationidBill(String narrationidBill) {
		this.narrationidBill = narrationidBill;
	}

	public String getSndToLabFlag() {
		return sndToLabFlag;
	}

	public void setSndToLabFlag(String sndToLabFlag) {
		this.sndToLabFlag = sndToLabFlag;
	}
	public String getDeleteFrom() {
		return deleteFrom;
	}

	public void setDeleteFrom(String deleteFrom) {
		this.deleteFrom = deleteFrom;
	}

	public void setSndToRisFlag(String sndToRisFlag) {
		this.sndToRisFlag = sndToRisFlag;
	}
	public String getSndToRisFlag() {
		return sndToRisFlag;
	}
public String getSendToRisFlag() {
		return sendToRisFlag;
	}

	public void setSendToRisFlag(String sendToRisFlag) {
		this.sendToRisFlag = sendToRisFlag;
	}
	public String getrFlag() {
		return rFlag;
	}

	public void setrFlag(String rFlag) {
		this.rFlag = rFlag;
	}
	public String getAccountStatusOpdDiagno() {
		return accountStatusOpdDiagno;
	}

	public void setAccountStatusOpdDiagno(String accountStatusOpdDiagno) {
		this.accountStatusOpdDiagno = accountStatusOpdDiagno;
	}
	
	public double getEmrPer() {
		return emrPer;
	}

	public void setEmrPer(double emrPer) {
		this.emrPer = emrPer;
	}

	public Integer getOpdIpdNo() {
		return opdIpdNo;
	}

	public void setOpdIpdNo(Integer opdIpdNo) {
		this.opdIpdNo = opdIpdNo;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getSubServiceName() {
		return subServiceName;
	}

	public void setSubServiceName(String subServiceName) {
		this.subServiceName = subServiceName;
	}
	
	public String getConsultantName() {
		return consultantName;
	}

	public void setConsultantName(String consultantName) {
		this.consultantName = consultantName;
	}

	public String getHname() {
		return Hname;
	}

	public void setHname(String hname) {
		Hname = hname;
	}	
	
	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}
	
	public Integer getCoupleID() {
		return coupleID;
	}

	public void setCoupleID(Integer CoupleID) {
		this.coupleID = CoupleID;
	}

	public Integer getIvfTreatmentId() {
		return ivfTreatmentId;
	}

	public void setIvfTreatmentId(Integer ivfTreatmentId) {
		this.ivfTreatmentId = ivfTreatmentId;
	}
	
}
