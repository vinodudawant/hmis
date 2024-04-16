package com.hms.ehat.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "ehat_bill_details")
public class BillDetailsDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	
	

	@Transient
	private Date serviceDate;
	
	
	
	public Date getServiceDate() {
		return serviceDate;
	}

	public void setServiceDate(Date serviceDate) {
		this.serviceDate = serviceDate;
	}
	
	
	
	@Column(name = "treatment_id",columnDefinition="int default 0")
	private Integer treatmentId=0;
	
	@Column(name = "patient_id",columnDefinition="int default 0")
	private Integer patienttId=0;
	
	@Column(name = "center_patient_id",columnDefinition="varchar(50) default '0'")
	private String centerPatientId="-";
	
	@Column(name = "department_id",columnDefinition="int default 0")
	private Integer departmentId=0;
	
	@Column(name = "business_type",columnDefinition="int default 2")
	private Integer businessType=2;
	
	@Column(name = "customer_type",columnDefinition="int default 0")
	private Integer customerType=0;
	
	@Column(name = "customer_id",columnDefinition="int default 0")
	private Integer customerId=0;
	
	@Column(name = "pay",columnDefinition="double default 0")
	private double pay=0;
	
	@Column(name = "co_pay",columnDefinition="double default 0")
	private double coPay=0;
	
	@Column(name = "paid_flag",columnDefinition="varchar(2) default 'N'")
	private String paidFlag="N";

	@Column(name = "bill_id",columnDefinition="int default 0")
	private Integer billId=0;
	
	@Column(name = "speciality_id",columnDefinition="int default 0")
	private int specialityId=0;
	
	@Column(name = "doctor_id",columnDefinition="int default 0")
	private int doctorId=0;
	
	//by Default self which is 0
	@Column(name = "source_type_id",columnDefinition="int default 0")
	private int sourceTypeId=0;
	
	@Column(name = "service_id",columnDefinition="int default 0")
	private int serviceId=0;
	
	@Column(name = "sub_service_id",columnDefinition="int default 0")
	private int subServiceId=0;
	
	@Column(name = "rate",columnDefinition="double default 0")
	private double rate=0;
	
	@Column(name = "quantity",columnDefinition="double default 0")
	private double quantity=1;
	
	@Column(name = "concession",columnDefinition="double default 0")
	private double concession=0;
	
	@Column(name = "other_rate",columnDefinition="double default 0")
	private double otherRate=0;
	
	@Column(name = "amount",columnDefinition="double default 0")
	private double amount=0;
	
	@Column(name = "discount",columnDefinition="double default 0")
	private double discount=0;
	
	@Column(name = "discount_per",columnDefinition="double default 0")
	private Double discountPer=0.0;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "cancle",columnDefinition="varchar(2) default 'N'")
	private String cancle="N";
	
	@Column(name = "other_amount",columnDefinition="double default 0")
	private double otherAmount=0;
	
	@Column(name = "other_pay",columnDefinition="double default 0")
	private double otherPay=0;
	
	@Column(name = "other_concession",columnDefinition="double default 0")
	private double otherConcession=0;
	
	@Column(name = "other_co_pay",columnDefinition="double default 0")
	private double otherCoPay=0;
		
	@Column(name = "created_by",updatable=false,columnDefinition="int default 0")
	private Integer createdBy=0;
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by",columnDefinition="int default 0")
	private Integer updatedBy=0;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by",columnDefinition="int default 0")
	private Integer deletedBy=0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;	
	
	@Column(name = "unit_id",columnDefinition="int default 0")
	private int unitId=0;	
	
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
	
	@Column(name = "sample_type_id",columnDefinition="int default 0")
	private Integer sampleTypeId=0;
	
	@Column(name = "bar_code",columnDefinition="varchar(25) default '0'")
	private String barCode="";
	
	@Column(name = "in_out_house",columnDefinition="int default 0")
	private Integer inOutHouse=0;
	
	@Column(name = "histopath_lab",columnDefinition = "varchar(2) default 'N'")
	private String histopathLab="N";
	
	@Column(name = "sample_count",columnDefinition="int default 0")
	private Integer sampleCount=0;
	
	@Column(name = "invoice_generated_flag", columnDefinition = "varchar(2) default 'N'")//added by dayanand(23-3-2020)
	private String invoiceGenerateFlag = "N";

	@Column(name = "invoice_remain_amount",columnDefinition="double default 0")//added by vinod(27-3-2020)
	private double invoiceRemainAmount=0;
	
	@Column(name = "prepaid_receipt_id",columnDefinition="double default 0")
	private double prepaidReceiptId=0;
	
	@Column(name = "collection_date")
	private String collectionDate="";	
	
	@Column(name = "collection_time")
	private String collectionTime="";	

	@Column(name = "reg_ref_doc_id",columnDefinition="int default 0")
	private Integer regRefDocId = 0;
	

	@Column(name = "template_wise",columnDefinition="varchar(50) default 'N'")
	private String templateWise="N";
	
	@Column(name = "ivf_treat_flag",columnDefinition="varchar(2) default 'N'")
	private String ivfTreatFlag="N";
	
	@Column(name = "on_bed_flag",columnDefinition="varchar(2) default 'N'")
	private String onBedFlag="N";
	
	@Column(name = "ivf_couple_id")
	private Integer coupleID;
	
	@Column(name = "batch_No")
	private String batchNo;
	
	@Column(name = "remarkcanceltest",columnDefinition="varchar(225) default ''")
	private String remarkcanceltest=""; // Rohini Ambhore.
	
	public String getRemarkcanceltest() {
		return remarkcanceltest;
	}

	public void setRemarkcanceltest(String remarkcanceltest) {
		this.remarkcanceltest = remarkcanceltest;
	}

	public double getInvoiceRemainAmount() {
		return invoiceRemainAmount;
	}

	public void setInvoiceRemainAmount(double invoiceRemainAmount) {
		this.invoiceRemainAmount = invoiceRemainAmount;
	}
	
	public double getPrepaidReceiptId() {
		return prepaidReceiptId;
	}

	public void setPrepaidReceiptId(double prepaidReceiptId) {
		this.prepaidReceiptId = prepaidReceiptId;
	}

	public String getInvoiceGenerateFlag() {
		return invoiceGenerateFlag;
	}

	public void setInvoiceGenerateFlag(String invoiceGenerateFlag) {
		this.invoiceGenerateFlag = invoiceGenerateFlag;
	}

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

	@Column(name = "sponsor_id",columnDefinition="int default 0")
	private Integer sponsorId;	
	
	

	@Column(name = "charges_slave_id",columnDefinition="int default 0")
	private Integer chargesSlaveId;
	
	@Column(name = "concession_in_Perc",columnDefinition="double default 0")
	private double concessionOnPerc=0.0;
	
	@Column(name = "paid_amt",columnDefinition="double default 0.00")
	private Double paidAmt=0.0;
	
	@Column(name = "paid_per",columnDefinition="double default 0.00")
	private Double paidPer=0.0;
	
	@Column(name = "sponsor_paid" ,columnDefinition="double default 0.0")
	private double sponsorPaid=0.0;
	
	@Column(name = "sponsor_paid_per" ,columnDefinition="double default 0.0")
	private double sponsorPaidPer=0.0;
	
	@Column(name = "refund_amt",columnDefinition="double default 0.00")
	private Double refundAmt=0.0;
	
	@Column(name = "refund_per",columnDefinition="double default 0.00")
	private Double refundPer=0.0;
	
	
		
	public Double getRefundAmt() {
		return refundAmt;
	}

	public void setRefundAmt(Double refundAmt) {
		this.refundAmt = refundAmt;
	}

	public Double getRefundPer() {
		return refundPer;
	}

	public void setRefundPer(Double refundPer) {
		this.refundPer = refundPer;
	}

	public double getSponsorPaid() {
		return sponsorPaid;
	}

	public void setSponsorPaid(double sponsorPaid) {
		this.sponsorPaid = sponsorPaid;
	}

	public double getSponsorPaidPer() {
		return sponsorPaidPer;
	}

	public void setSponsorPaidPer(double sponsorPaidPer) {
		this.sponsorPaidPer = sponsorPaidPer;
	}

	
	@Column(name = "hospital_disc",columnDefinition="double default 0.00")
	private Double hospitalDiscount=0.0;
	
	@Column(name = "ref_doctor_disc",columnDefinition="double default 0.00")
	private Double refDoctorDiscount=0.0;
	
	@Column(name = "discount_from",columnDefinition="varchar(255) default '-'")
	private String discountFrom="-";
	
	@Column(name = "discount_status",columnDefinition="varchar(2) default 'N'")
	private String discountStatus="N";

	

	public String getDiscountStatus() {
		return discountStatus;
	}

	public void setDiscountStatus(String discountStatus) {
		this.discountStatus = discountStatus;
	}



	@Transient
	private String receiptOf;

	//For Professional fees
	@Transient
	private String narrationid;

	@Column(name = "r_flag")
	private String rFlag="N";

      
	@Column(name = "narrationid_bill")
	private String narrationidBill="-";
	
	//Added By Tariq
	@Column(name = "emrPer",columnDefinition="double default 0")
	private double emrPer;
	
	//Added by Laxman on 04-March-2018
	@Column(name = "sndtolabflag",columnDefinition="varchar(2) default 'N'")
	private String sndToLabFlag="N";
	//For Professional fees

	@Transient
	private String sendToRisFlag;
	
	//added by irfan 12-sep-2018
	
	@Transient
	private String opdIpdNo;
	
	@Transient
	private String patientName;
		
	@Transient
	private Integer age;
	
	@Transient
	private String gender;


	
	@Transient
	private String serviceName;
	
	@Transient
	private String subServiceName;
	
	@Transient
	private String doctorName;
	
	
	@Transient
	private String consultantName;
	
	@Transient
	private String categoryName;
	
	@Transient
	private Integer categoryId;
	
	@Transient
	private Double categorycharges;
	
	@Transient
	private String cancel;
	
	@Transient
	private String Sponsor;

	@Transient
	private List<BillDetailsDto> listBillDetails;
	
	@Column(name = "paid_by_cash_flag",columnDefinition="varchar(2) default 'N'")
	private String paidByCashFlag="N";	
	
	@Column(name = "canceled_by",columnDefinition="int default 0")
	private double canceledBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "canceled_date_time")
	private Date canceledDateTime;
	
	
	
	public String getSponsor() {
		return Sponsor;
	}

	public void setSponsor(String sponsor) {
		Sponsor = sponsor;
	}

	public double getCanceledBy() {
		return canceledBy;
	}
	
	public String getCenterPatientId() {
		return centerPatientId;
	}


	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
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

	public int getSpecialityId() {
		return specialityId;
	}

	public void setSpecialityId(int specialityId) {
		this.specialityId = specialityId;
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

	public List<BillDetailsDto> getListBillDetails() {
		return listBillDetails;
	}

	public void setListBillDetails(List<BillDetailsDto> listBillDetails) {
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

	

	public String getOpdIpdNo() {
		return opdIpdNo;
	}

	public void setOpdIpdNo(String opdIpdNo) {
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

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public Double getCategorycharges() {
		return categorycharges;
	}

	public void setCategorycharges(Double categorycharges) {
		this.categorycharges = categorycharges;
	}

	public String getCancel() {
		return cancel;
	}

	public void setCancel(String cancel) {
		this.cancel = cancel;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Integer getSampleTypeId() {
		return sampleTypeId;
	}

	public void setSampleTypeId(Integer sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}


	public String getBarCode() {
		return barCode;
	}

	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}

	public Integer getInOutHouse() {
		return inOutHouse;
	}

	public void setInOutHouse(Integer inOutHouse) {
		this.inOutHouse = inOutHouse;
	}

	public Integer getSampleCount() {
		return sampleCount;
	}

	public void setSampleCount(Integer sampleCount) {
		this.sampleCount = sampleCount;
	}

	public Integer getBusinessType() {
		return businessType;
	}

	public void setBusinessType(Integer businessType) {
		this.businessType = businessType;
	}

	public Integer getCustomerType() {
		return customerType;
	}

	public void setCustomerType(Integer customerType) {
		this.customerType = customerType;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getCollectionDate() {
		return collectionDate;
	}

	public void setCollectionDate(String collectionDate) {
		this.collectionDate = collectionDate;
	}

	public String getCollectionTime() {
		return collectionTime;
	}

	public void setCollectionTime(String collectionTime) {
		this.collectionTime = collectionTime;
	}

	public Integer getRegRefDocId() {
		return regRefDocId;
	}

	public void setRegRefDocId(Integer regRefDocId) {
		this.regRefDocId = regRefDocId;
	}

	public String getHistopathLab() {
		return histopathLab;
	}

	public void setHistopathLab(String histopathLab) {
		this.histopathLab = histopathLab;
	}

	public String getTemplateWise() {
		return templateWise;
	}

	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
	}

	public String getIvfTreatFlag() {
		return ivfTreatFlag;
	}

	public void setIvfTreatFlag(String ivfTreatFlag) {
		this.ivfTreatFlag = ivfTreatFlag;
	}

	public String getOnBedFlag() {
		return onBedFlag;
	}

	public void setOnBedFlag(String onBedFlag) {
		this.onBedFlag = onBedFlag;
	}

	public Integer getCoupleID() {
		return coupleID;
	}

	public void setCoupleID(Integer coupleID) {
		this.coupleID = coupleID;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}
	
	@Transient
	int defaultFlag=0;

	public int getDefaultFlag() {
		return defaultFlag;
	}

	public void setDefaultFlag(int defaultFlag) {
		this.defaultFlag = defaultFlag;
	}

	public Double getPaidAmt() {
		return paidAmt;
	}

	public void setPaidAmt(Double paidAmt) {
		this.paidAmt = paidAmt;
	}

	public Double getPaidPer() {
		return paidPer;
	}

	public void setPaidPer(Double paidPer) {
		this.paidPer = paidPer;
	}

	public Double getDiscountPer() {
		return discountPer;
	}

	public void setDiscountPer(Double discountPer) {
		this.discountPer = discountPer;
	}

	public Double getHospitalDiscount() {
		return hospitalDiscount;
	}

	public void setHospitalDiscount(Double hospitalDiscount) {
		this.hospitalDiscount = hospitalDiscount;
	}

	public Double getRefDoctorDiscount() {
		return refDoctorDiscount;
	}

	public void setRefDoctorDiscount(Double refDoctorDiscount) {
		this.refDoctorDiscount = refDoctorDiscount;
	}

	public String getDiscountFrom() {
		return discountFrom;
	}

	public void setDiscountFrom(String discountFrom) {
		this.discountFrom = discountFrom;
	}

	@Override
	public String toString() {
		return "BillDetailsDto [billDetailsId=" + billDetailsId + ", serviceDate=" + serviceDate + ", treatmentId="
				+ treatmentId + ", patienttId=" + patienttId + ", centerPatientId=" + centerPatientId
				+ ", departmentId=" + departmentId + ", businessType=" + businessType + ", customerType=" + customerType
				+ ", customerId=" + customerId + ", pay=" + pay + ", coPay=" + coPay + ", paidFlag=" + paidFlag
				+ ", billId=" + billId + ", specialityId=" + specialityId + ", doctorId=" + doctorId + ", sourceTypeId="
				+ sourceTypeId + ", serviceId=" + serviceId + ", subServiceId=" + subServiceId + ", rate=" + rate
				+ ", quantity=" + quantity + ", concession=" + concession + ", otherRate=" + otherRate + ", amount="
				+ amount + ", discount=" + discount + ", discountPer=" + discountPer + ", deleted=" + deleted
				+ ", cancle=" + cancle + ", otherAmount=" + otherAmount + ", otherPay=" + otherPay
				+ ", otherConcession=" + otherConcession + ", otherCoPay=" + otherCoPay + ", createdBy=" + createdBy
				+ ", createdDateTime=" + createdDateTime + ", updatedBy=" + updatedBy + ", updatedDateTime="
				+ updatedDateTime + ", deletedBy=" + deletedBy + ", deletedDateTime=" + deletedDateTime + ", unitId="
				+ unitId + ", clinicalnotes=" + clinicalnotes + ", instructions=" + instructions + ", urgentflag="
				+ urgentflag + ", drdeskflag=" + drdeskflag + ", deleteFrom=" + deleteFrom + ", sndToRisFlag="
				+ sndToRisFlag + ", accountStatusOpdDiagno=" + accountStatusOpdDiagno + ", sampleTypeId=" + sampleTypeId
				+ ", barCode=" + barCode + ", inOutHouse=" + inOutHouse + ", histopathLab=" + histopathLab
				+ ", sampleCount=" + sampleCount + ", invoiceGenerateFlag=" + invoiceGenerateFlag
				+ ", invoiceRemainAmount=" + invoiceRemainAmount + ", prepaidReceiptId=" + prepaidReceiptId
				+ ", collectionDate=" + collectionDate + ", collectionTime=" + collectionTime + ", regRefDocId="
				+ regRefDocId + ", templateWise=" + templateWise + ", ivfTreatFlag=" + ivfTreatFlag + ", onBedFlag="
				+ onBedFlag + ", coupleID=" + coupleID + ", batchNo=" + batchNo + ", remarkcanceltest="
				+ remarkcanceltest + ", recSlaveId=" + recSlaveId + ", callfrom=" + callfrom + ", masterReceiptId="
				+ masterReceiptId + ", subservicesname=" + subservicesname + ", iscombination=" + iscombination
				+ ", sponsorId=" + sponsorId + ", chargesSlaveId=" + chargesSlaveId + ", concessionOnPerc="
				+ concessionOnPerc + ", paidAmt=" + paidAmt + ", paidPer=" + paidPer + ", sponsorPaid=" + sponsorPaid
				+ ", sponsorPaidPer=" + sponsorPaidPer + ", refundAmt=" + refundAmt + ", refundPer=" + refundPer
				+ ", hospitalDiscount=" + hospitalDiscount + ", refDoctorDiscount=" + refDoctorDiscount
				+ ", discountFrom=" + discountFrom + ", receiptOf=" + receiptOf + ", narrationid=" + narrationid
				+ ", rFlag=" + rFlag + ", narrationidBill=" + narrationidBill + ", emrPer=" + emrPer + ", sndToLabFlag="
				+ sndToLabFlag + ", sendToRisFlag=" + sendToRisFlag + ", opdIpdNo=" + opdIpdNo + ", patientName="
				+ patientName + ", age=" + age + ", gender=" + gender + ", serviceName=" + serviceName
				+ ", subServiceName=" + subServiceName + ", doctorName=" + doctorName + ", consultantName="
				+ consultantName + ", categoryName=" + categoryName + ", categoryId=" + categoryId
				+ ", categorycharges=" + categorycharges + ", cancel=" + cancel + ", Sponsor=" + Sponsor
				+ ", listBillDetails=" + listBillDetails + ", paidByCashFlag=" + paidByCashFlag + ", canceledBy="
				+ canceledBy + ", canceledDateTime=" + canceledDateTime + ", defaultFlag=" + defaultFlag + "]";
	}

	

	
	
	

	

	
	
	
}
