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
@Table(name = "ehat_bill_details_ipd")
public class BillDetailsIpdDto implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
		
	@Column(name = "treatment_id")
	private Integer treatmentId=0;
	
	@Column(name = "patient_id")
	private Integer patienttId=0;
	
	@Column(name = "department_id",columnDefinition="int default 2")
	private Integer departmentId=2;
	
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
	
	@Column(name = "rate")
	private Double rate=0.0;
	
	@Column(name = "quantity")
	private double quantity=1;
	
	@Column(name = "concession")
	private Double concession=0.0;
	
	@Column(name = "concession_per")
	private Double concessionPer=0.0;
	
	@Column(name = "refund")
	private Double refund=0.0;
	
	@Column(name = "refund_per")
	private Double refundPer=0.0;
	
	@Column(name = "amount")
	private Double amount=0.0;
	
	@Column(name = "discount")
	private Double discount=0.0;
	
	@Column(name = "discount_per")
	private Double discountPer=0.0;
	
	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy=0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id")
	private int unitId=0;
	
	@Column(name = "ot_procedure")
	private String otprocedure="-";
	
	@Column(name = "ot_flag")
	private String ot_flag="N";
	
	@Column(name = "co_pay")
	private double coPay=0;
	
	@Column(name = "pay")
	private double pay=0;
	
	@Column(name = "first_admin_chrg")
	private double firstAdminChrg=0;
	
	@Column(name = "patient_cat_id")
	private double patientCatId=0;
		
	@Column(name = "sponsor_cat_id")
	private double sponsorCatId=0;
		
	@Column(name = "urgentflag")
	private String urgentFlag="N";
	
	@Column(name = "cancle")
	private String cancle="N";

	@Column(name = "paid_flag")
	private String paidFlag="N";
	
	@Column(name = "invoice_flag")
	private String invoiceFlag="N";	
	
	@Column(name = "other_rate")
	private double otherRate=0;
	
	@Column(name = "other_amount")
	private double otherAmount=0;
	
	@Column(name = "other_pay")
	private double otherPay=0;
	
	@Column(name = "other_concession")
	private double otherConcession=0;
	
	@Column(name = "other_co_pay")
	private double otherCoPay=0;
	
	@Column(name = "sponsor_id")
	private Integer sponsorId=0;	
	
	@Column(name = "charges_slave_id")
	private Integer chargesSlaveId=0;
	
	//added by paras
	@Column(name = "clinical_notes")
	private String clinicalnotes="-";	
	
	@Column(name = "instructions")
	private String instructions="-";
	
	// added by paras	
	@Column(name = "oldehat_id")
	private int theaterId=0;

	@Column(name = "drdesk_flag")
	private String drdeskflag="-";

	@Column(name = "on_bed_flag")
	private char onBedFlag='N';
	
	@Column(name = "delete_from")
	private String deleteFrom="-";
	
	@Column(name = "r_flag")
	private String rFlag="N";
	
	@Column(name = "paid_by_cash_flag",columnDefinition="varchar(2) default 'N'")
	private String paidByCashFlag="N";	
	
	@Column(name = "doctor_round_slave_id",columnDefinition="int default 0")
	private int doctorRoundSlaveId=0;
	
	
	@Column(name = "paid_amt",columnDefinition="double default 0.00")
	private Double paidAmt=0.0;
	
	@Column(name = "paid_per",columnDefinition="double default 0.00")
	private Double paidPer=0.0;
	
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
	
	
	
		
	public String getDiscountFrom() {
		return discountFrom;
	}

	public void setDiscountFrom(String discountFrom) {
		this.discountFrom = discountFrom;
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

	public String getPaidByCashFlag() {
		return paidByCashFlag;
	}

	public void setPaidByCashFlag(String paidByCashFlag) {
		this.paidByCashFlag = paidByCashFlag;
	}

	public String getrFlag() {
		return rFlag;
	}

	public void setrFlag(String rFlag) {
		this.rFlag = rFlag;
	}

	public char getOnBedFlag() {
		return onBedFlag;
	}

	public void setOnBedFlag(char onBedFlag) {
		this.onBedFlag = onBedFlag;
	}

	//for profees added by irfan
	
	@Column(name = "hospAmount")
	private Double hospAmount=0.0;
	
	@Column(name = "actHospAmount")
	private Double actHospAmount=0.0;
	
	@Column(name = "pfAmount")
	private Double pfAmount=0.0;
	
	@Column(name = "pfPaid")
	private Double pfPaid=0.0;
	
	@Column(name = "pfUnpaid")
	private Double pfUnpaid=0.0;
	
	@Column(name = "pfReduction")
	private Double pfReduction=0.0;
	
	@Column(name = "pfAddition")
	private Double pfAddition=0.0;
	
	@Column(name = "pfVoucherId")
	private Integer pfVoucherId=0;
	
	@Column(name = "pfVoucherFlag")
	private String pfVoucherFlag="N";
	
	@Column(name = "advance_flag")
	private String advanceFlag="N";
	
	@Column(name = "prev_amt")
	private Double prevAmt=0.0;
	//profees end
	
	@Column(name = "phydis_flag",columnDefinition="varchar(2) default 'N'")    
	private String phyDisFlag;
	
	@Column(name = "account_status_ipd")
	private String accountStatusIpd="N";
	
	@Column(name = "emrgency_percentage",columnDefinition="double default 0.00")
	private double emrPer;
	
	@Column(name = "fromdate",columnDefinition="varchar(20) default '-'")
	private String fromdate="-";
	
	@Column(name = "tomdate",columnDefinition="varchar(20) default '-'")
	private String tomdate="-";
	@Column(name = "dctor_id_ot")
	private String dctor_id_ot="0";
	
	@Column(name = "rpfVoucherId",columnDefinition="int default 0")
	private int rpfVoucherId=0;
	
	@Column(name = "rpfVoucherFlag",columnDefinition="varchar(2) default 'N'")
	private String rpfVoucherFlag="N";
	
	public String getDctor_id_ot() {
		return dctor_id_ot;
	}

	public void setDctor_id_ot(String dctor_id_ot) {
		this.dctor_id_ot = dctor_id_ot;
	}

	public String getPhyDisFlag() {
		return phyDisFlag;
	}

	public void setPhyDisFlag(String phyDisFlag) {
		this.phyDisFlag = phyDisFlag;
	}

	@Transient
	private Integer recSlaveIdIPD=0;

	@Transient
	private String callfrom;
	
	@Transient
	private String sendToRisIpdBill;

	@Transient
	private Integer masterReceiptId;

	@Column(name = "count_ot",updatable=false)
	private int countot;

	@Transient
	private String subservicesname;
	
	@Transient
	private String perticularSName;

	@Transient
	private String iscombination="N";	
	
	@Transient
	private String narration;
	
	@Column(name = "narrationid_bill")
	private String narrationidBill="-";
	
	//Added by Laxman on 04-March-2018
	@Column(name = "sndtolabflag",columnDefinition="varchar(15) default 'N'")
	private String sndToLabFlag="N";
	
	
	@Transient
	private Double sumAmount=0.0;
	
	@Transient
	private Double sumConcession=0.0;
	
	@Transient
	private Double sumHospAmount=0.0;
	
	@Transient
	private Double sumNet=0.0;
	
	@Transient
	private List<BillDetailsIpdDto> listBillDetailsIpd;
	
	@Transient
	private String receiptOf;

	@Transient
	private int hallId;
	
	@Transient
	private int hallSlaveId;
	
	@Column(name = "ref_dr_id")
	private Integer refDrId=0;
	
	@Column(name = "ref_dr_percent")
	private Double refDrPercent=0.0;
	
	@Column(name = "ref_dr_amount")
	private Double refDrAmount=0.0;

	@Column(name = "sndtorisflag")
	private String sendToRisFlag;
	
	@Column(name = "remarkcanceltest",columnDefinition="varchar(225) default ''")
	private String remarkcanceltest=""; // Rohini Ambhore.
	
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

	public String getRemarkcanceltest() {
		return remarkcanceltest;
	}

	public void setRemarkcanceltest(String remarkcanceltest) {
		this.remarkcanceltest = remarkcanceltest;
	}

	public Integer getBillDetailsId() {
		return billDetailsId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public Integer getPatienttId() {
		return patienttId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public Integer getBillId() {
		return billId;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public int getSourceTypeId() {
		return sourceTypeId;
	}

	public int getServiceId() {
		return serviceId;
	}

	public int getSubServiceId() {
		return subServiceId;
	}

	public Double getRate() {
		return rate;
	}

	public double getQuantity() {
		return quantity;
	}

	public Double getConcession() {
		return concession;
	}

	public Double getConcessionPer() {
		return concessionPer;
	}

	public Double getRefund() {
		return refund;
	}

	public Double getRefundPer() {
		return refundPer;
	}

	public Double getAmount() {
		return amount;
	}

	public Double getDiscount() {
		return discount;
	}

	public Double getDiscountPer() {
		return discountPer;
	}

	public String getDeleted() {
		return deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public String getOtprocedure() {
		return otprocedure;
	}

	public String getOt_flag() {
		return ot_flag;
	}

	public double getCoPay() {
		return coPay;
	}

	public double getPay() {
		return pay;
	}
	
	public double getFirstAdminChrg() {
		return firstAdminChrg;
	}

	public void setFirstAdminChrg(double firstAdminChrg) {
		this.firstAdminChrg = firstAdminChrg;
	}

	public double getPatientCatId() {
		return patientCatId;
	}

	public double getSponsorCatId() {
		return sponsorCatId;
	}

	public String getUrgentFlag() {
		return urgentFlag;
	}

	public String getCancle() {
		return cancle;
	}

	public String getPaidFlag() {
		return paidFlag;
	}

	public String getInvoiceFlag() {
		return invoiceFlag;
	}

	public double getOtherRate() {
		return otherRate;
	}

	public double getOtherAmount() {
		return otherAmount;
	}

	public double getOtherPay() {
		return otherPay;
	}

	public double getOtherConcession() {
		return otherConcession;
	}

	public double getOtherCoPay() {
		return otherCoPay;
	}

	public Integer getSponsorId() {
		return sponsorId;
	}

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public String getClinicalnotes() {
		return clinicalnotes;
	}

	public String getInstructions() {
		return instructions;
	}

	public int getTheaterId() {
		return theaterId;
	}

	public String getDrdeskflag() {
		return drdeskflag;
	}

	public Double getHospAmount() {
		return hospAmount;
	}

	public Double getActHospAmount() {
		return actHospAmount;
	}

	public Double getPfAmount() {
		return pfAmount;
	}

	public Double getPfPaid() {
		return pfPaid;
	}

	public Double getPfUnpaid() {
		return pfUnpaid;
	}

	public Double getPfReduction() {
		return pfReduction;
	}

	public Double getPfAddition() {
		return pfAddition;
	}

	public Integer getPfVoucherId() {
		return pfVoucherId;
	}

	public String getPfVoucherFlag() {
		return pfVoucherFlag;
	}

	public String getAdvanceFlag() {
		return advanceFlag;
	}

	public Integer getRecSlaveIdIPD() {
		return recSlaveIdIPD;
	}

	public String getCallfrom() {
		return callfrom;
	}

	public Integer getMasterReceiptId() {
		return masterReceiptId;
	}

	public int getCountot() {
		return countot;
	}

	public String getSubservicesname() {
		return subservicesname;
	}

	public String getPerticularSName() {
		return perticularSName;
	}

	public String getIscombination() {
		return iscombination;
	}

	public String getNarration() {
		return narration;
	}

	public String getNarrationidBill() {
		return narrationidBill;
	}

	public Double getSumAmount() {
		return sumAmount;
	}

	public Double getSumConcession() {
		return sumConcession;
	}

	public Double getSumHospAmount() {
		return sumHospAmount;
	}

	public Double getSumNet() {
		return sumNet;
	}

	public List<BillDetailsIpdDto> getListBillDetailsIpd() {
		return listBillDetailsIpd;
	}

	public String getReceiptOf() {
		return receiptOf;
	}

	public int getHallId() {
		return hallId;
	}

	public int getHallSlaveId() {
		return hallSlaveId;
	}

	public Integer getRefDrId() {
		return refDrId;
	}

	public Double getRefDrPercent() {
		return refDrPercent;
	}

	public Double getRefDrAmount() {
		return refDrAmount;
	}

	public void setBillDetailsId(Integer billDetailsId) {
		this.billDetailsId = billDetailsId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public void setPatienttId(Integer patienttId) {
		this.patienttId = patienttId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public void setSubServiceId(int subServiceId) {
		this.subServiceId = subServiceId;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public void setConcession(Double concession) {
		this.concession = concession;
	}

	public void setConcessionPer(Double concessionPer) {
		this.concessionPer = concessionPer;
	}

	public void setRefund(Double refund) {
		this.refund = refund;
	}

	public void setRefundPer(Double refundPer) {
		this.refundPer = refundPer;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public void setDiscountPer(Double discountPer) {
		this.discountPer = discountPer;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public void setOtprocedure(String otprocedure) {
		this.otprocedure = otprocedure;
	}

	public void setOt_flag(String ot_flag) {
		this.ot_flag = ot_flag;
	}

	public void setCoPay(double coPay) {
		this.coPay = coPay;
	}

	public void setPay(double pay) {
		this.pay = pay;
	}

	public void setPatientCatId(double patientCatId) {
		this.patientCatId = patientCatId;
	}

	public void setSponsorCatId(double sponsorCatId) {
		this.sponsorCatId = sponsorCatId;
	}

	public void setUrgentFlag(String urgentFlag) {
		this.urgentFlag = urgentFlag;
	}

	public void setCancle(String cancle) {
		this.cancle = cancle;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
	}

	public void setInvoiceFlag(String invoiceFlag) {
		this.invoiceFlag = invoiceFlag;
	}

	public void setOtherRate(double otherRate) {
		this.otherRate = otherRate;
	}

	public void setOtherAmount(double otherAmount) {
		this.otherAmount = otherAmount;
	}

	public void setOtherPay(double otherPay) {
		this.otherPay = otherPay;
	}

	public void setOtherConcession(double otherConcession) {
		this.otherConcession = otherConcession;
	}

	public void setOtherCoPay(double otherCoPay) {
		this.otherCoPay = otherCoPay;
	}

	public void setSponsorId(Integer sponsorId) {
		this.sponsorId = sponsorId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public void setClinicalnotes(String clinicalnotes) {
		this.clinicalnotes = clinicalnotes;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public void setTheaterId(int theaterId) {
		this.theaterId = theaterId;
	}

	public void setDrdeskflag(String drdeskflag) {
		this.drdeskflag = drdeskflag;
	}

	public void setHospAmount(Double hospAmount) {
		this.hospAmount = hospAmount;
	}

	public void setActHospAmount(Double actHospAmount) {
		this.actHospAmount = actHospAmount;
	}

	public void setPfAmount(Double pfAmount) {
		this.pfAmount = pfAmount;
	}

	public void setPfPaid(Double pfPaid) {
		this.pfPaid = pfPaid;
	}

	public void setPfUnpaid(Double pfUnpaid) {
		this.pfUnpaid = pfUnpaid;
	}

	public void setPfReduction(Double pfReduction) {
		this.pfReduction = pfReduction;
	}

	public void setPfAddition(Double pfAddition) {
		this.pfAddition = pfAddition;
	}

	public void setPfVoucherId(Integer pfVoucherId) {
		this.pfVoucherId = pfVoucherId;
	}

	public void setPfVoucherFlag(String pfVoucherFlag) {
		this.pfVoucherFlag = pfVoucherFlag;
	}

	public void setAdvanceFlag(String advanceFlag) {
		this.advanceFlag = advanceFlag;
	}

	public void setRecSlaveIdIPD(Integer recSlaveIdIPD) {
		this.recSlaveIdIPD = recSlaveIdIPD;
	}

	public void setCallfrom(String callfrom) {
		this.callfrom = callfrom;
	}

	public void setMasterReceiptId(Integer masterReceiptId) {
		this.masterReceiptId = masterReceiptId;
	}

	public void setCountot(int countot) {
		this.countot = countot;
	}

	public void setSubservicesname(String subservicesname) {
		this.subservicesname = subservicesname;
	}

	public void setPerticularSName(String perticularSName) {
		this.perticularSName = perticularSName;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public void setNarrationidBill(String narrationidBill) {
		this.narrationidBill = narrationidBill;
	}

	public void setSumAmount(Double sumAmount) {
		this.sumAmount = sumAmount;
	}

	public void setSumConcession(Double sumConcession) {
		this.sumConcession = sumConcession;
	}

	public void setSumHospAmount(Double sumHospAmount) {
		this.sumHospAmount = sumHospAmount;
	}

	public void setSumNet(Double sumNet) {
		this.sumNet = sumNet;
	}

	public void setListBillDetailsIpd(List<BillDetailsIpdDto> listBillDetailsIpd) {
		this.listBillDetailsIpd = listBillDetailsIpd;
	}

	public void setReceiptOf(String receiptOf) {
		this.receiptOf = receiptOf;
	}

	public void setHallId(int hallId) {
		this.hallId = hallId;
	}

	public void setHallSlaveId(int hallSlaveId) {
		this.hallSlaveId = hallSlaveId;
	}

	public void setRefDrId(Integer refDrId) {
		this.refDrId = refDrId;
	}

	public void setRefDrPercent(Double refDrPercent) {
		this.refDrPercent = refDrPercent;
	}

	public void setRefDrAmount(Double refDrAmount) {
		this.refDrAmount = refDrAmount;
	}
	
	public Double getPrevAmt() {
		return prevAmt;
	}

	public void setPrevAmt(Double prevAmt) {
		this.prevAmt = prevAmt;
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
	public String getSendToRisIpdBill() {
		return sendToRisIpdBill;
	}

	public void setSendToRisIpdBill(String sendToRisIpdBill) {
		this.sendToRisIpdBill = sendToRisIpdBill;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getSendToRisFlag() {
		return sendToRisFlag;
	}

	public void setSendToRisFlag(String sendToRisFlag) {
		this.sendToRisFlag = sendToRisFlag;
	}
	public String getAccountStatusIpd() {
		return accountStatusIpd;
	}

	public void setAccountStatusIpd(String accountStatusIpd) {
		this.accountStatusIpd = accountStatusIpd;
	}

@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "phydis_date_time")
	private Date phyDisDateTime;

public Date getPhyDisDateTime() {
		return phyDisDateTime;
	}

	public void setPhyDisDateTime(Date phyDisDateTime) {
		this.phyDisDateTime = phyDisDateTime;
	}

	public double getEmrPer() {
		return emrPer;
	}

	public void setEmrPer(double emrPer) {
		this.emrPer = emrPer;
	}

	public String getFromdate() {
		return fromdate;
	}

	public void setFromdate(String fromdate) {
		this.fromdate = fromdate;
	}

	public String getTomdate() {
		return tomdate;
	}

	public void setTomdate(String tomdate) {
		this.tomdate = tomdate;
	}

	@Override
	public String toString() {
		return "BillDetailsIpdDto [billDetailsId=" + billDetailsId + ", treatmentId=" + treatmentId + ", patienttId="
				+ patienttId + ", departmentId=" + departmentId + ", billId=" + billId + ", doctorId=" + doctorId
				+ ", sourceTypeId=" + sourceTypeId + ", serviceId=" + serviceId + ", subServiceId=" + subServiceId
				+ ", rate=" + rate + ", quantity=" + quantity + ", concession=" + concession + ", concessionPer="
				+ concessionPer + ", refund=" + refund + ", refundPer=" + refundPer + ", amount=" + amount
				+ ", discount=" + discount + ", discountPer=" + discountPer + ", deleted=" + deleted + ", createdBy="
				+ createdBy + ", createdDateTime=" + createdDateTime + ", updatedBy=" + updatedBy + ", updatedDateTime="
				+ updatedDateTime + ", deletedBy=" + deletedBy + ", deletedDateTime=" + deletedDateTime + ", unitId="
				+ unitId + ", otprocedure=" + otprocedure + ", ot_flag=" + ot_flag + ", coPay=" + coPay + ", pay=" + pay
				+ ", firstAdminChrg=" + firstAdminChrg + ", patientCatId=" + patientCatId + ", sponsorCatId="
				+ sponsorCatId + ", urgentFlag=" + urgentFlag + ", cancle=" + cancle + ", paidFlag=" + paidFlag
				+ ", invoiceFlag=" + invoiceFlag + ", otherRate=" + otherRate + ", otherAmount=" + otherAmount
				+ ", otherPay=" + otherPay + ", otherConcession=" + otherConcession + ", otherCoPay=" + otherCoPay
				+ ", sponsorId=" + sponsorId + ", chargesSlaveId=" + chargesSlaveId + ", clinicalnotes=" + clinicalnotes
				+ ", instructions=" + instructions + ", theaterId=" + theaterId + ", drdeskflag=" + drdeskflag
				+ ", onBedFlag=" + onBedFlag + ", deleteFrom=" + deleteFrom + ", rFlag=" + rFlag + ", paidByCashFlag="
				+ paidByCashFlag + ", hospAmount=" + hospAmount + ", actHospAmount=" + actHospAmount + ", pfAmount="
				+ pfAmount + ", pfPaid=" + pfPaid + ", pfUnpaid=" + pfUnpaid + ", pfReduction=" + pfReduction
				+ ", pfAddition=" + pfAddition + ", pfVoucherId=" + pfVoucherId + ", pfVoucherFlag=" + pfVoucherFlag
				+ ", advanceFlag=" + advanceFlag + ", prevAmt=" + prevAmt + ", phyDisFlag=" + phyDisFlag
				+ ", accountStatusIpd=" + accountStatusIpd + ", emrPer=" + emrPer + ", fromdate=" + fromdate
				+ ", tomdate=" + tomdate + ", dctor_id_ot=" + dctor_id_ot + ", recSlaveIdIPD=" + recSlaveIdIPD
				+ ", callfrom=" + callfrom + ", sendToRisIpdBill=" + sendToRisIpdBill + ", masterReceiptId="
				+ masterReceiptId + ", countot=" + countot + ", subservicesname=" + subservicesname
				+ ", perticularSName=" + perticularSName + ", iscombination=" + iscombination + ", narration="
				+ narration + ", narrationidBill=" + narrationidBill + ", sndToLabFlag=" + sndToLabFlag + ", sumAmount="
				+ sumAmount + ", sumConcession=" + sumConcession + ", sumHospAmount=" + sumHospAmount + ", sumNet="
				+ sumNet + ", listBillDetailsIpd=" + listBillDetailsIpd + ", receiptOf=" + receiptOf + ", hallId="
				+ hallId + ", hallSlaveId=" + hallSlaveId + ", refDrId=" + refDrId + ", refDrPercent=" + refDrPercent
				+ ", refDrAmount=" + refDrAmount + ", sendToRisFlag=" + sendToRisFlag + ", phyDisDateTime="
				+ phyDisDateTime + "]";
	}
	
	@Column(name = "business_type",columnDefinition="int default 2")
	private Integer businessType=2;
	
	@Column(name = "customer_type",columnDefinition="int default 0")
	private Integer customerType=0;
	
	@Column(name = "customer_id",columnDefinition="int default 0")
	private Integer customerId=0;
	
	@Column(name = "speciality_id",columnDefinition="int default 0")
	private int specialityId=0;
	
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

	public int getSpecialityId() {
		return specialityId;
	}

	public void setSpecialityId(int specialityId) {
		this.specialityId = specialityId;
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

	public String getHistopathLab() {
		return histopathLab;
	}

	public void setHistopathLab(String histopathLab) {
		this.histopathLab = histopathLab;
	}

	public Integer getSampleCount() {
		return sampleCount;
	}

	public String getInvoiceGenerateFlag() {
		return invoiceGenerateFlag;
	}

	public void setInvoiceGenerateFlag(String invoiceGenerateFlag) {
		this.invoiceGenerateFlag = invoiceGenerateFlag;
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

	public void setSampleCount(Integer sampleCount) {
		this.sampleCount = sampleCount;
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
	
	@Transient
	int defaultFlag=0;

	public int getDefaultFlag() {
		return defaultFlag;
	}

	public void setDefaultFlag(int defaultFlag) {
		this.defaultFlag = defaultFlag;
	}

	public int getDoctorRoundSlaveId() {
		return doctorRoundSlaveId;
	}

	public void setDoctorRoundSlaveId(int doctorRoundSlaveId) {
		this.doctorRoundSlaveId = doctorRoundSlaveId;
	}



	public String getRpfVoucherFlag() {
		return rpfVoucherFlag;
	}

	public void setRpfVoucherFlag(String rpfVoucherFlag) {
		this.rpfVoucherFlag = rpfVoucherFlag;
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

	public int getRpfVoucherId() {
		return rpfVoucherId;
	}

	public void setRpfVoucherId(int rpfVoucherId) {
		this.rpfVoucherId = rpfVoucherId;
	}

	
	
}
