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

@Table(name = "ehat_other_bill_detail_for_ipd")
public class EhatOtherBillDetailForIpdDto{

	
	@Id
	@GeneratedValue
	@Column(name = "other_bill_details_id_for_ipd")
	private Integer otherbildetailidipd;

	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	

	@Column(name = "patient_id")
	private Integer patienttId;
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Column(name = "bill_id")
	private Integer billId;
	
	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "sub_service_id")
	private Integer subServiceId;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "doc_name")
	private String docName;

	@Column(name = "emrPer" ,columnDefinition="double default 0.00")
	private double emrPer;
	
	@Column(name = "rate")
	private double rate;

	@Column(name = "amount")
	private double amount;

	@Column(name = "quantity")
	private double quantity;
	
	@Column(name = "paid_flag")
	private String paidFlag="N";
	
	@Column(name = "pay",columnDefinition="double default 0.00")
	private double pay;
	
	@Column(name = "co_pay",columnDefinition="double default 0.00")
	private double coPay;
	
	@Column(name = "concession",columnDefinition="double default 0.00")
	private double concession;
	
	@Column(name = "cancle")
	private String cancle="N";
	
	@Column(name = "isModify")
	private String isModify;
	
	@Column(name = "created_date_time")
	private Date createdDateTime;
	
	
	
	@Column(name = "charges_id",columnDefinition="int default 0")
	private Integer chargesId=0;
	
	@Column(name = "chargesSlave_id",columnDefinition="int default 0")
	private Integer chargesSlaveId=0;
	
	@Column(name = "extra_flag")
	private String extraFlag="N";
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "doctor_id",columnDefinition="int default 0")
	private int doctorId;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId;	
	
	//by Default self which is 0
	@Column(name = "source_type_id",columnDefinition="int default 0")
	private int sourceTypeId;
	
	@Transient
	private List<EhatOtherBillDetailForIpdDto> listEhatOtherBillDetailForIpd;
	
	@Column(name = "child_sub_service_id")
    private Integer childSubServiceId;

	@Column(name = "count_ot",columnDefinition="int default 0")
	private int countot;
	
	@Column(name = "ot_procedure")
	private String otprocedure="-";
	
	@Column(name = "ot_flag")
	private String ot_flag="N";
	
	@Column(name = "iscombination")
    private String iscombination;
	
	@Column(name = "otherflag")
    private String otherflag="-";
	
	@Column(name = "other_amount",columnDefinition="double default 0")
	private double otherAmount;
	
	@Column(name = "other_rate",columnDefinition="double default 0")
	private double otherRate;
	
	@Column(name = "other_pay",columnDefinition="double default 0.0")
	private double otherPay;
	
	@Column(name = "other_concession",columnDefinition="double default 0.0")
	private double otherConcession;
	
	@Column(name = "other_co_pay",columnDefinition="double default 0.0")
	private double otherCoPay;
	
	
	@Column(name = "child_service_id",columnDefinition="int default 0")
    private Integer childServiceId=0;
	
	// for profees added by irfan

	@Column(name = "hospAmount")
	private Double hospAmount = 0.0;

	@Column(name = "actHospAmount")
	private Double actHospAmount = 0.0;

	@Column(name = "pfAmount")
	private Double pfAmount = 0.0;

	@Column(name = "pfPaid")
	private Double pfPaid = 0.0;

	@Column(name = "pfUnpaid")
	private Double pfUnpaid = 0.0;

	@Column(name = "pfReduction")
	private Double pfReduction = 0.0;

	@Column(name = "pfAddition")
	private Double pfAddition = 0.0;

	@Column(name = "pfVoucherId")
	private Integer pfVoucherId = 0;

	@Column(name = "pfVoucherFlag")
	private String pfVoucherFlag = "N";

	@Column(name = "advance_flag")
	private String advanceFlag = "N";

	@Transient
	private Double sumAmount = 0.0;

	@Transient
	private Double sumConcession = 0.0;

	@Transient
	private Double sumHospAmount = 0.0;

	@Transient
	private Double sumNet = 0.0;

	@Column(name = "ref_dr_id")
	private int refDrId = 0;

	@Column(name = "ref_dr_percent")
	private Double refDrPercent = 0.0;

	@Column(name = "ref_dr_amount")
	private Double refDrAmount = 0.0;
	
	
	@Column(name = "concession_per",columnDefinition="double default 0.0")
	private double concessionPer=0.0;
	
	@Column(name = "refund",columnDefinition="double default 0.0")
	private double refund=0.0;
	
	@Column(name = "refund_per",columnDefinition="double default 0.0")
	private double refundPer=0.0;
	
	@Column(name = "discount",columnDefinition="double default 0.0")
	private double discount=0.0;
	
	@Column(name = "discount_per",columnDefinition="double default 0.0")
	private Double discountPer=0.0;
	
	
	@Column(name = "patient_cat_id")
	private Integer patientCatId=0;
		
	@Column(name = "sponsor_cat_id")
	private Integer sponsorCatId=0;
	
	@Column(name = "clinical_notes")
	private String clinicalnotes="-";	
	
	@Column(name = "instructions")
	private String instructions="-";
	
	
	@Column(name = "urgentflag")
	private String urgentFlag="N";

	
	@Column(name = "invoice_flag")
	private String invoiceFlag="N";	

	@Column(name = "oldehat_id")
	private int theaterId=0;
	
	@Column(name = "drdesk_flag")
	private String drdeskflag="-";
	
	@Column(name = "narrationid_bill")
	private String narrationidBill="-";
	
	@Column(name = "sponsor_id")
	private Integer sponsorId=0;
	
	@Column(name = "on_bed_flag")
	private char onBedFlag='N';
	
	@Column(name = "paid_package",columnDefinition="double default 0.0")
	private Double paidPackage=0.0;
	
	@Column(name = "batch_code")
	private String batchCode;

	@Column(name = "batch_exp")
	private String batchExp;
	
	@Column(name = "batch_id")
	private Integer batchId;
	
	@Column(name = "mrn_slave_id")
	private Integer mrnSlaveID;
	
	
	@Column(name = "billing_status",columnDefinition="varchar(2) default 'N'")
	private String billingStatus="N";
	
	@Column(name = "paid_other_amt",columnDefinition="double default 0.00")
	private Double paidOtherAmt=0.0;
	
	@Column(name = "paid_other_per",columnDefinition="double default 0.00")
	private Double paidOtherPer=0.0;
	
	@Column(name = "sponsor_paid" ,columnDefinition="double default 0.0")
	private double sponsorPaid=0.0;
	
	@Column(name = "sponsor_paid_per" ,columnDefinition="double default 0.0")
	private double sponsorPaidPer=0.0;
	
	
	
	@Column(name = "hospital_disc",columnDefinition="double default 0.00")
	private Double hospitalDiscount=0.0;
	
	@Column(name = "ref_doctor_disc",columnDefinition="double default 0.00")
	private Double refDoctorDiscount=0.0;
	
	@Column(name = "discount_from",columnDefinition="varchar(255) default '-'")
	private String discountFrom="-";
	
	
	
	
	
	
	
	
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


	/*
	 * public void setRpfVoucherId(int rpfVoucherId) { this.rpfVoucherId =
	 * rpfVoucherId; }
	 */

	// profees end
	/*-------------------Generate Getter And Setters----------------------------------*/
	@Column(name = "rpfVoucherId",columnDefinition="int default 0")
	private int rpfVoucherId=0;
	
	@Column(name = "rpfVoucherFlag",columnDefinition="varchar(2) default 'N'")
	private String rpfVoucherFlag="N";
	
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


	


	public Double getPaidOtherAmt() {
		return paidOtherAmt;
	}


	public void setPaidOtherAmt(Double paidOtherAmt) {
		this.paidOtherAmt = paidOtherAmt;
	}


	public Double getPaidOtherPer() {
		return paidOtherPer;
	}


	public void setPaidOtherPer(Double paidOtherPer) {
		this.paidOtherPer = paidOtherPer;
	}


	public String getBillingStatus() {
		return billingStatus;
	}


	public void setBillingStatus(String billingStatus) {
		this.billingStatus = billingStatus;
	}


	public String getOtherflag() {
		return otherflag;
	}


	public Integer getMrnSlaveID() {
		return mrnSlaveID;
	}


	public void setMrnSlaveID(Integer mrnSlaveID) {
		this.mrnSlaveID = mrnSlaveID;
	}


	public String getBatchCode() {
		return batchCode;
	}


	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}


	public String getBatchExp() {
		return batchExp;
	}


	public void setBatchExp(String batchExp) {
		this.batchExp = batchExp;
	}


	public Integer getBatchId() {
		return batchId;
	}


	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}


	public void setOtherflag(String otherflag) {
		this.otherflag = otherflag;
	}


	public String getOt_flag() {
		return ot_flag;
	}


	public void setOt_flag(String ot_flag) {
		this.ot_flag = ot_flag;
	}


	public Integer getChildSubServiceId() {
		return childSubServiceId;
	}


	public String getOtprocedure() {
		return otprocedure;
	}


	public void setOtprocedure(String otprocedure) {
		this.otprocedure = otprocedure;
	}


	public int getCountot() {
		return countot;
	}


	public void setCountot(int countot) {
		this.countot = countot;
	}


	public void setChildSubServiceId(Integer childSubServiceId) {
		this.childSubServiceId = childSubServiceId;
	}


	public Integer getTreatmentId() {
		return treatmentId;
	}


	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}


	public Integer getBillDetailsId() {
		return billDetailsId;
	}


	public void setBillDetailsId(Integer billDetailsId) {
		this.billDetailsId = billDetailsId;
	}


	public Integer getServiceId() {
		return serviceId;
	}


	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}


	public Integer getSubServiceId() {
		return subServiceId;
	}


	public void setSubServiceId(Integer subServiceId) {
		this.subServiceId = subServiceId;
	}


	public String getCategoryName() {
		return categoryName;
	}


	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getDocName() {
		return docName;
	}


	public void setDocName(String docName) {
		this.docName = docName;
	}


	public double getRate() {
		return rate;
	}


	public void setRate(double rate) {
		this.rate = rate;
	}


	public double getAmount() {
		return amount;
	}


	public void setAmount(double amount) {
		this.amount = amount;
	}


	public double getQuantity() {
		return quantity;
	}


	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}


	public String getPaidFlag() {
		return paidFlag;
	}


	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
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


	public double getConcession() {
		return concession;
	}


	public void setConcession(double concession) {
		this.concession = concession;
	}


	public String getCancle() {
		return cancle;
	}


	public void setCancle(String cancle) {
		this.cancle = cancle;
	}


	public String getIsModify() {
		return isModify;
	}


	public void setIsModify(String isModify) {
		this.isModify = isModify;
	}


	public Date getCreatedDateTime() {
		return createdDateTime;
	}


	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}


	

	public Integer getChargesId() {
		return chargesId;
	}


	public void setChargesId(Integer chargesId) {
		this.chargesId = chargesId;
	}


	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}


	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}


	public String getExtraFlag() {
		return extraFlag;
	}


	public void setExtraFlag(String extraFlag) {
		this.extraFlag = extraFlag;
	}


                                                                            	

	public Integer getOtherbildetailidipd() {
		return otherbildetailidipd;
	}


	public void setOtherbildetailidipd(Integer otherbildetailidipd) {
		this.otherbildetailidipd = otherbildetailidipd;
	}


	public List<EhatOtherBillDetailForIpdDto> getListEhatOtherBillDetailForIpd() {
		return listEhatOtherBillDetailForIpd;
	}


	public void setListEhatOtherBillDetailForIpd(
			List<EhatOtherBillDetailForIpdDto> listEhatOtherBillDetailForIpd) {
		this.listEhatOtherBillDetailForIpd = listEhatOtherBillDetailForIpd;
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


	public Integer getBillId() {
		return billId;
	}


	public void setBillId(Integer billId) {
		this.billId = billId;
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


	public int getDoctorId() {
		return doctorId;
	}


	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}


	public int getUnitId() {
		return unitId;
	}


	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}





	public int getSourceTypeId() {
		return sourceTypeId;
	}


	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}


	public String getIscombination() {
		return iscombination;
	}


	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}


	public Integer getChildServiceId() {
		return childServiceId;
	}


	public void setChildServiceId(Integer childServiceId) {
		this.childServiceId = childServiceId;
	}


	public double getOtherAmount() {
		return otherAmount;
	}


	public void setOtherAmount(double otherAmount) {
		this.otherAmount = otherAmount;
	}


	public double getOtherRate() {
		return otherRate;
	}


	public void setOtherRate(double otherRate) {
		this.otherRate = otherRate;
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


	public Double getHospAmount() {
		return hospAmount;
	}


	public void setHospAmount(Double hospAmount) {
		this.hospAmount = hospAmount;
	}


	public Double getActHospAmount() {
		return actHospAmount;
	}


	public void setActHospAmount(Double actHospAmount) {
		this.actHospAmount = actHospAmount;
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


	public Integer getPfVoucherId() {
		return pfVoucherId;
	}


	public void setPfVoucherId(Integer pfVoucherId) {
		this.pfVoucherId = pfVoucherId;
	}


	public String getPfVoucherFlag() {
		return pfVoucherFlag;
	}


	public void setPfVoucherFlag(String pfVoucherFlag) {
		this.pfVoucherFlag = pfVoucherFlag;
	}


	public String getAdvanceFlag() {
		return advanceFlag;
	}


	public void setAdvanceFlag(String advanceFlag) {
		this.advanceFlag = advanceFlag;
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


	public double getConcessionPer() {
		return concessionPer;
	}


	public double getRefund() {
		return refund;
	}


	public double getRefundPer() {
		return refundPer;
	}


	public double getDiscount() {
		return discount;
	}


	public Double getDiscountPer() {
		return discountPer;
	}


	public void setConcessionPer(double concessionPer) {
		this.concessionPer = concessionPer;
	}


	public void setRefund(double refund) {
		this.refund = refund;
	}


	public void setRefundPer(double refundPer) {
		this.refundPer = refundPer;
	}


	public void setDiscount(double discount) {
		this.discount = discount;
	}


	public void setDiscountPer(Double discountPer) {
		this.discountPer = discountPer;
	}


	public Integer getPatientCatId() {
		return patientCatId;
	}


	public Integer getSponsorCatId() {
		return sponsorCatId;
	}


	public String getClinicalnotes() {
		return clinicalnotes;
	}


	public String getInstructions() {
		return instructions;
	}


	public String getUrgentFlag() {
		return urgentFlag;
	}


	public String getInvoiceFlag() {
		return invoiceFlag;
	}


	public int getTheaterId() {
		return theaterId;
	}


	public String getDrdeskflag() {
		return drdeskflag;
	}


	public String getNarrationidBill() {
		return narrationidBill;
	}


	public Integer getSponsorId() {
		return sponsorId;
	}


	public char getOnBedFlag() {
		return onBedFlag;
	}


	public void setPatientCatId(Integer patientCatId) {
		this.patientCatId = patientCatId;
	}


	public void setSponsorCatId(Integer sponsorCatId) {
		this.sponsorCatId = sponsorCatId;
	}


	public void setClinicalnotes(String clinicalnotes) {
		this.clinicalnotes = clinicalnotes;
	}


	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}


	public void setUrgentFlag(String urgentFlag) {
		this.urgentFlag = urgentFlag;
	}


	public void setInvoiceFlag(String invoiceFlag) {
		this.invoiceFlag = invoiceFlag;
	}


	public void setTheaterId(int theaterId) {
		this.theaterId = theaterId;
	}


	public void setDrdeskflag(String drdeskflag) {
		this.drdeskflag = drdeskflag;
	}


	public void setNarrationidBill(String narrationidBill) {
		this.narrationidBill = narrationidBill;
	}


	public void setSponsorId(Integer sponsorId) {
		this.sponsorId = sponsorId;
	}


	public void setOnBedFlag(char onBedFlag) {
		this.onBedFlag = onBedFlag;
	}


	public Double getPaidPackage() {
		return paidPackage;
	}


	public void setPaidPackage(Double paidPackage) {
		this.paidPackage = paidPackage;
	}


	public double getEmrPer() {
		return emrPer;
	}


	public void setEmrPer(double emrPer) {
		this.emrPer = emrPer;
	}
	
	@Column(name = "customer_type",columnDefinition="int default 0")
	private Integer customerType=0;
	
	@Column(name = "customer_id",columnDefinition="int default 0")
	private Integer customerId=0;
	
	@Column(name = "selfid",columnDefinition="int default 0")
	private int selfid;
	
	@Column(name = "sample_type_id",columnDefinition="int default 0")
	private Integer sampleTypeId=0;
	
	@Column(name = "barcode",columnDefinition="varchar(25) default '0'")
	private String barcode="";
	
	@Column(name = "template_wise",columnDefinition="varchar(50) default 'N'")
	private String templateWise="N";
	
	@Column(name = "in_out_house",columnDefinition="int default 0")
	private Integer inOutHouse=0;
	
	@Column(name = "histopath_lab",columnDefinition = "varchar(2) default 'N'")
	private String histopathLab="N";



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


	public int getSelfid() {
		return selfid;
	}


	public void setSelfid(int selfid) {
		this.selfid = selfid;
	}


	public Integer getSampleTypeId() {
		return sampleTypeId;
	}


	public void setSampleTypeId(Integer sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}


	public String getBarcode() {
		return barcode;
	}


	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}


	public String getTemplateWise() {
		return templateWise;
	}


	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
	}


	public Integer getInOutHouse() {
		return inOutHouse;
	}


	public void setInOutHouse(Integer inOutHouse) {
		this.inOutHouse = inOutHouse;
	}


	public String getHistopathLab() {
		return histopathLab;
	}


	public void setHistopathLab(String histopathLab) {
		this.histopathLab = histopathLab;
	}

	

	/*
	 * public Integer getRpfVoucherId() { return rpfVoucherId; }
	 * 
	 * 
	 * public void setRpfVoucherId(Integer rpfVoucherId) { this.rpfVoucherId =
	 * rpfVoucherId; }
	 */


	public String getRpfVoucherFlag() {
		return rpfVoucherFlag;
	}


	public void setRpfVoucherFlag(String rpfVoucherFlag) {
		this.rpfVoucherFlag = rpfVoucherFlag;
	}


	@Override
	public String toString() {
		return "EhatOtherBillDetailForIpdDto [otherbildetailidipd=" + otherbildetailidipd + ", treatmentId="
				+ treatmentId + ", billDetailsId=" + billDetailsId + ", patienttId=" + patienttId + ", departmentId="
				+ departmentId + ", billId=" + billId + ", serviceId=" + serviceId + ", subServiceId=" + subServiceId
				+ ", categoryName=" + categoryName + ", docName=" + docName + ", emrPer=" + emrPer + ", rate=" + rate
				+ ", amount=" + amount + ", quantity=" + quantity + ", paidFlag=" + paidFlag + ", pay=" + pay
				+ ", coPay=" + coPay + ", concession=" + concession + ", cancle=" + cancle + ", isModify=" + isModify
				+ ", createdDateTime=" + createdDateTime + ", chargesId=" + chargesId + ", chargesSlaveId="
				+ chargesSlaveId + ", extraFlag=" + extraFlag + ", deleted=" + deleted + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy
				+ ", deletedDateTime=" + deletedDateTime + ", doctorId=" + doctorId + ", unitId=" + unitId
				+ ", sourceTypeId=" + sourceTypeId + ", listEhatOtherBillDetailForIpd=" + listEhatOtherBillDetailForIpd
				+ ", childSubServiceId=" + childSubServiceId + ", countot=" + countot + ", otprocedure=" + otprocedure
				+ ", ot_flag=" + ot_flag + ", iscombination=" + iscombination + ", otherflag=" + otherflag
				+ ", otherAmount=" + otherAmount + ", otherRate=" + otherRate + ", otherPay=" + otherPay
				+ ", otherConcession=" + otherConcession + ", otherCoPay=" + otherCoPay + ", childServiceId="
				+ childServiceId + ", hospAmount=" + hospAmount + ", actHospAmount=" + actHospAmount + ", pfAmount="
				+ pfAmount + ", pfPaid=" + pfPaid + ", pfUnpaid=" + pfUnpaid + ", pfReduction=" + pfReduction
				+ ", pfAddition=" + pfAddition + ", pfVoucherId=" + pfVoucherId + ", pfVoucherFlag=" + pfVoucherFlag
				+ ", advanceFlag=" + advanceFlag + ", sumAmount=" + sumAmount + ", sumConcession=" + sumConcession
				+ ", sumHospAmount=" + sumHospAmount + ", sumNet=" + sumNet + ", refDrId=" + refDrId + ", refDrPercent="
				+ refDrPercent + ", refDrAmount=" + refDrAmount + ", concessionPer=" + concessionPer + ", refund="
				+ refund + ", refundPer=" + refundPer + ", discount=" + discount + ", discountPer=" + discountPer
				+ ", patientCatId=" + patientCatId + ", sponsorCatId=" + sponsorCatId + ", clinicalnotes="
				+ clinicalnotes + ", instructions=" + instructions + ", urgentFlag=" + urgentFlag + ", invoiceFlag="
				+ invoiceFlag + ", theaterId=" + theaterId + ", drdeskflag=" + drdeskflag + ", narrationidBill="
				+ narrationidBill + ", sponsorId=" + sponsorId + ", onBedFlag=" + onBedFlag + ", paidPackage="
				+ paidPackage + ", batchCode=" + batchCode + ", batchExp=" + batchExp + ", batchId=" + batchId
				+ ", mrnSlaveID=" + mrnSlaveID + ", billingStatus=" + billingStatus + ", paidOtherAmt=" + paidOtherAmt
				+ ", paidOtherPer=" + paidOtherPer + ", sponsorPaid=" + sponsorPaid + ", sponsorPaidPer="
				+ sponsorPaidPer + ", rpfVoucherId=" + rpfVoucherId + ", rpfVoucherFlag=" + rpfVoucherFlag
				+ ", customerType=" + customerType + ", customerId=" + customerId + ", selfid=" + selfid
				+ ", sampleTypeId=" + sampleTypeId + ", barcode=" + barcode + ", templateWise=" + templateWise
				+ ", inOutHouse=" + inOutHouse + ", histopathLab=" + histopathLab + "]";
	}
	
	


	
	
	
	
}