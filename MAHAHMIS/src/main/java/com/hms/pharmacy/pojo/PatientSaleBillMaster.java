package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="pharma_patient_sales_bill_master")
public class PatientSaleBillMaster implements Serializable 
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	@Id
	@GeneratedValue
	@Column(name="patient_sales_bill_id")
	private Integer patientSalesBillId;
	
	
	@Column(name="patient_sales_bill_doc_no")
	private String patientSalesBillDocNo;
	
	
	@Column(name="patient_bill_doctor_id")
	private Integer doctorId=0;
	
	@Column(name="patient_bill_sponser_id")
	private Integer sponserId=0;
	
	@Column(name="patient_type")
	private String patientType;
	
	@Column(name="patient_doctor_name")
	private String doctorName;
	
	
	@Column(name="patient_bill_patient_id")
	private Integer patientId;
	
	@Column(name="patient_bill_mode")
	private String patientBillMode;
	
	
	@Column(name="patient_bill_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date patientBillDate;
	
	@Column(name="patient_bill_amt")
	private Double patientBillAmt;
	
	@Column(name="patient_sales_bill_prescription")
	private String patientSalesBillPrescription;
	
	@Column(name="patient_sales_bill_narration")
	private String patientSalesBillNarration;
	
	@Column(name="patient_sales_bill_enter_by")
	private String patientSalesBillEntryBy;
	
	@Column(name="patient_sales_bill_cn")
	private Double patientSalesBillCN;
	
	@Column(name="patient_sales_bill_cd")
	private String patientSalesBillCD;
	
	@Column(name="patient_sales_bill_special_disc")
	private String patientSalesBillSpecialDisc;
	
	@Column(name="patient_sales_bill_cn_amt")
	private Double patientSalesBillCnAmt;
	
	@Column(name="patient_sales_bill_cd_amt")
	private Double patientSalesBillCdAmt;
	
	@Column(name="patient_sales_bill_surcharge")
	private String patientSalesBillSurcharge;
	
	@Column(name="patient_sales_bill_amount_received")
	private Double patientSalesBillAmountReceived;
			
	@Column(name="patient_sales_bill_amount_balance")
	private Double patientSalesBillAmountBalance;
	
	@Column(name = "patient_sale_previous_balance")
	private Double patientSalePreviousBalance;
		
	@Column(name="patient_sales_bill_gross_amt")
	private Double patientSalesBillGrossAmt;
	
	@Column(name="patient_sales_bill_less")
	private String patientSalesBillLess;
	
	@Column(name="patient_sales_bill_add")
	private String patientSalesBillAdd;
	
	@Column(name="patient_sales_bill_round")
	private String patientSalesBillRound;
	
	@Column(name="patient_sales_bill_net_amt")
	private Double patientSalesBillNetAmt;
	
	@Column(name="patient_sales_bill_delete_flag")
	private Integer patientSalesBillDeleteFlag;
	
	@Column(name="patient_sales_bill_update_date")
	private Date patientSalesBillUpdateDate;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "patient_slave_bill_master_id", referencedColumnName = "patient_sales_bill_id")
	private List<PatientSaleBillSlave> ltPatientSaleBill = new ArrayList<PatientSaleBillSlave>();
	
	@Column(name = "patient_tax_vat5")
	private Double patientTaxVat5;
	
	@Column(name = "patient_tax_vat55")
	private Double patientTaxVat55;
	
	@Column(name = "patient_tax_vat12")
	private Double patientTaxVat12;
	
	@Column(name = "patient_tax_vat0")
	private Double patientTaxVat0;
	
	@Column(name = "patient_sale_store_id")
	private Integer patientSaleStoreId=0;
	
	@Column(name = "patient_sale_user_id")
	private Integer patientSaleUserId=0;
	
	@Column(name="patient_sale_status")	
    private String patientSaleStatus="pending";
	
	@Column(name="patient_sale_treatmentId")
	private int patientSaleTreatmentId;
	
	@Column(name="patient_sale_bank_name")	
    private String patientSaleBankName;
	
	@Column(name="patient_sale_cheque_num")	
    private String patientSaleChequeNum;
	
	@Column(name = "patient_tax_vat6")
	private Double patientTaxVat6;

	@Column(name = "patient_tax_vat135")
	private Double patientTaxVat135;
	
	@Column(name = "bill_Category_id")
	private Integer patientSaleBillCatId=1;

	@Column(name = "img")
	private String img;

	@Column(name="category_name")	
    private String patientSaleCategoryName;
	
	@Column(name="ward_name")	
    private String wardName;
	
	@Column(name = " unit_id" ,columnDefinition="int default 1")
	private int unitId;
	
	@Column(name = "patient_tax_total_vat" ,columnDefinition="double default 0.0")
	private double patientTotalVat=0.0;
	
	@Column(name="patient_sale_card_num")	
    private String patientSaleCardNum;
	
	@Column(name="account_status_patient")
	private String accountStatusPatient;
	
	@Column(name="patient_sale_billing" ,columnDefinition = "varchar(2) default 'N'")
	private String patientSaleBilling="N";
	
	@Column(name="paid_flag" ,columnDefinition = "varchar(2) default 'N'")
	private String paidFlag="N";
	
	
	
	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getWardName() {
		return wardName;
	}

	public void setWardName(String wardName) {
		this.wardName = wardName;
	}

	public String getPatientSaleCategoryName() {
		return patientSaleCategoryName;
	}

	public void setPatientSaleCategoryName(String patientSaleCategoryName) {
		this.patientSaleCategoryName = patientSaleCategoryName;
	}
	
	public String getImg() 
	{
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	
	public Double getPatientTaxVat6() {
		return patientTaxVat6;
	}
	
	public Integer getPatientSaleBillCatId() {
		return patientSaleBillCatId;
	}

	public void setPatientSaleBillCatId(Integer patientSaleBillCatId) {
		this.patientSaleBillCatId = patientSaleBillCatId;
	}


	public void setPatientTaxVat6(Double patientTaxVat6) {
		this.patientTaxVat6 = patientTaxVat6;
	}

	public Double getPatientTaxVat135() {
		return patientTaxVat135;
	}

	public void setPatientTaxVat135(Double patientTaxVat135) {
		this.patientTaxVat135 = patientTaxVat135;
	}
		
	public String getPatientSaleBankName() {
		return patientSaleBankName;
	}

	public void setPatientSaleBankName(String patientSaleBankName) {
		this.patientSaleBankName = patientSaleBankName;
	}

	public String getPatientSaleChequeNum() {
		return patientSaleChequeNum;
	}

	public void setPatientSaleChequeNum(String patientSaleChequeNum) {
		this.patientSaleChequeNum = patientSaleChequeNum;
	}


	
	/*@Column(name="patient_bill_doctor_Name")
	private String doctorName;*/
	
	/*@ManyToOne
	@JoinColumn(name="patient_bill_doctor_id")
	private DoctorMaster doctorMaster;
	
	public DoctorMaster getDoctorMaster() {
		return doctorMaster;
	}

	public void setDoctorMaster(DoctorMaster doctorMaster) {
		this.doctorMaster = doctorMaster;
	}*/

/*	@ManyToOne
	@JoinColumn(name = "patient_bill_patient_id")
	private PatientMaster  patientMaster;
	
	public PatientMaster getPatientMaster() {
		return patientMaster;
	}

	public void setPatientMaster(PatientMaster patientMaster) {
		this.patientMaster = patientMaster;
	}*/
	
	@Column(name="patient_sale_for_time")
	private String patientSaleForTime;
	
	@Column(name="patient_sale_type")	
    private String patientSaleType;
	
	@Transient
	private String amountBal;
	
	@Transient
	private String amountReceive;
	
	@Transient
	private Integer historyId; 
	
	public Integer getHistoryId() {
		return historyId;
	}

	public void setHistoryId(Integer historyId) {
		this.historyId = historyId;
	}

	public String getPatientSaleBilling() {
		return patientSaleBilling;
	}

	public void setPatientSaleBilling(String patientSaleBilling) {
		this.patientSaleBilling = patientSaleBilling;
	}

	public String getAmountBal() {
		return amountBal;
	}

	public void setAmountBal(String amountBal) {
		this.amountBal = amountBal;
	}

	public String getAmountReceive() {
		return amountReceive;
	}

	public void setAmountReceive(String amountReceive) {
		this.amountReceive = amountReceive;
	}

	public String getPatientSaleType() {
		return patientSaleType;
	}

	public void setPatientSaleType(String patientSaleType) {
		this.patientSaleType = patientSaleType;
	}

	public String getPatientSaleForTime() {
		return patientSaleForTime;
	}

	public void setPatientSaleForTime(String patientSaleForTime) {
		this.patientSaleForTime = patientSaleForTime;
	}

	public Double getPatientSalesBillAmountReceived() {
		return patientSalesBillAmountReceived;
	}

	public void setPatientSalesBillAmountReceived(
			Double patientSalesBillAmountReceived) {
		this.patientSalesBillAmountReceived = patientSalesBillAmountReceived;
	}
	
	public Double getPatientSalePreviousBalance() {
		return patientSalePreviousBalance;
	}

	public void setPatientSalePreviousBalance(Double patientSalePreviousBalance) {
		this.patientSalePreviousBalance = patientSalePreviousBalance;
	}

	public int getPatientSaleTreatmentId() {
		return patientSaleTreatmentId;
	}

	public void setPatientSaleTreatmentId(int patientSaleTreatmentId) {
		this.patientSaleTreatmentId = patientSaleTreatmentId;
	}

	public Integer getSponserId() {
		return sponserId;
	}

	public void setSponserId(Integer sponserId) {
		this.sponserId = sponserId;
	}

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}

	
	
	public String getPatientType() {
		return patientType;
	}

	public void setPatientType(String patientType) {
		this.patientType = patientType;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	
	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	
		
	public String getPatientSaleStatus() {
		return patientSaleStatus;
	}

	public void setPatientSaleStatus(String patientSaleStatus) {
		this.patientSaleStatus = patientSaleStatus;
	}

	public Double getPatientTaxVat5() {
		return patientTaxVat5;
	}

	public void setPatientTaxVat5(Double patientTaxVat5) {
		this.patientTaxVat5 = patientTaxVat5;
	}

	public Double getPatientTaxVat12() {
		return patientTaxVat12;
	}

	public void setPatientTaxVat12(Double patientTaxVat12) {
		this.patientTaxVat12 = patientTaxVat12;
	}

	public Double getPatientTaxVat0() {
		return patientTaxVat0;
	}

	public void setPatientTaxVat0(Double patientTaxVat0) {
		this.patientTaxVat0 = patientTaxVat0;
	}

	public List<PatientSaleBillSlave> getLtPatientSaleBill() {
		return ltPatientSaleBill;
	}

	public void setLtPatientSaleBill(List<PatientSaleBillSlave> ltPatientSaleBill) {
		this.ltPatientSaleBill = ltPatientSaleBill;
	}

	public Integer getPatientSalesBillId() {
		return patientSalesBillId;
	}

	public void setPatientSalesBillId(Integer patientSalesBillId) {
		this.patientSalesBillId = patientSalesBillId;
	}

	public String getPatientSalesBillDocNo() {
		return patientSalesBillDocNo;
	}

	public void setPatientSalesBillDocNo(String patientSalesBillDocNo) {
		this.patientSalesBillDocNo = patientSalesBillDocNo;
	}

	public String getPatientBillMode() {
		return patientBillMode;
	}

	public void setPatientBillMode(String patientBillMode) {
		this.patientBillMode = patientBillMode;
	}

	public Date getPatientBillDate() {
		return patientBillDate;
	}

	public void setPatientBillDate(Date patientBillDate) {
		this.patientBillDate = patientBillDate;
	}

	public Double getPatientBillAmt() {
		return patientBillAmt;
	}

	public void setPatientBillAmt(Double patientBillAmt) {
		this.patientBillAmt = patientBillAmt;
	}

	public String getPatientSalesBillPrescription() {
		return patientSalesBillPrescription;
	}

	public void setPatientSalesBillPrescription(String patientSalesBillPrescription) {
		this.patientSalesBillPrescription = patientSalesBillPrescription;
	}

	public String getPatientSalesBillNarration() {
		return patientSalesBillNarration;
	}

	public void setPatientSalesBillNarration(String patientSalesBillNarration) {
		this.patientSalesBillNarration = patientSalesBillNarration;
	}

	public String getPatientSalesBillEntryBy() {
		return patientSalesBillEntryBy;
	}

	public void setPatientSalesBillEntryBy(String patientSalesBillEntryBy) {
		this.patientSalesBillEntryBy = patientSalesBillEntryBy;
	}

	public Double getPatientSalesBillCN() {
		return patientSalesBillCN;
	}

	public void setPatientSalesBillCN(Double patientSalesBillCN) {
		this.patientSalesBillCN = patientSalesBillCN;
	}

	public String getPatientSalesBillCD() {
		return patientSalesBillCD;
	}

	public void setPatientSalesBillCD(String patientSalesBillCD) {
		this.patientSalesBillCD = patientSalesBillCD;
	}

	public String getPatientSalesBillSpecialDisc() {
		return patientSalesBillSpecialDisc;
	}

	public void setPatientSalesBillSpecialDisc(String patientSalesBillSpecialDisc) {
		this.patientSalesBillSpecialDisc = patientSalesBillSpecialDisc;
	}

	public Double getPatientSalesBillCnAmt() {
		return patientSalesBillCnAmt;
	}

	public void setPatientSalesBillCnAmt(Double patientSalesBillCnAmt) {
		this.patientSalesBillCnAmt = patientSalesBillCnAmt;
	}

	public Double getPatientSalesBillCdAmt() {
		return patientSalesBillCdAmt;
	}

	public void setPatientSalesBillCdAmt(Double patientSalesBillCdAmt) {
		this.patientSalesBillCdAmt = patientSalesBillCdAmt;
	}

	public String getPatientSalesBillSurcharge() {
		return patientSalesBillSurcharge;
	}

	public void setPatientSalesBillSurcharge(String patientSalesBillSurcharge) {
		this.patientSalesBillSurcharge = patientSalesBillSurcharge;
	}

	
	public Double getPatientSalesBillAmountBalance() {
		return patientSalesBillAmountBalance;
	}

	public void setPatientSalesBillAmountBalance(
			Double patientSalesBillAmountBalance) {
		this.patientSalesBillAmountBalance = patientSalesBillAmountBalance;
	}

	public Double getPatientSalesBillGrossAmt() {
		return patientSalesBillGrossAmt;
	}

	public void setPatientSalesBillGrossAmt(Double patientSalesBillGrossAmt) {
		this.patientSalesBillGrossAmt = patientSalesBillGrossAmt;
	}

	public String getPatientSalesBillLess() {
		return patientSalesBillLess;
	}

	public void setPatientSalesBillLess(String patientSalesBillLess) {
		this.patientSalesBillLess = patientSalesBillLess;
	}

	public String getPatientSalesBillAdd() {
		return patientSalesBillAdd;
	}

	public void setPatientSalesBillAdd(String patientSalesBillAdd) {
		this.patientSalesBillAdd = patientSalesBillAdd;
	}

	public String getPatientSalesBillRound() {
		return patientSalesBillRound;
	}

	public void setPatientSalesBillRound(String patientSalesBillRound) {
		this.patientSalesBillRound = patientSalesBillRound;
	}

	public Double getPatientSalesBillNetAmt() {
		return patientSalesBillNetAmt;
	}

	public void setPatientSalesBillNetAmt(Double patientSalesBillNetAmt) {
		this.patientSalesBillNetAmt = patientSalesBillNetAmt;
	}

	public Integer getPatientSalesBillDeleteFlag() {
		return patientSalesBillDeleteFlag;
	}

	public void setPatientSalesBillDeleteFlag(Integer patientSalesBillDeleteFlag) {
		this.patientSalesBillDeleteFlag = patientSalesBillDeleteFlag;
	}

	public Date getPatientSalesBillUpdateDate() {
		return patientSalesBillUpdateDate;
	}

	public void setPatientSalesBillUpdateDate(Date patientSalesBillUpdateDate) {
		this.patientSalesBillUpdateDate = patientSalesBillUpdateDate;
	}

	public Integer getPatientSaleStoreId() {
		return patientSaleStoreId;
	}

	public void setPatientSaleStoreId(Integer patientSaleStoreId) {
		this.patientSaleStoreId = patientSaleStoreId;
	}

	public Integer getPatientSaleUserId() {
		return patientSaleUserId;
	}

	public void setPatientSaleUserId(Integer patientSaleUserId) {
		this.patientSaleUserId = patientSaleUserId;
	}

	public Double getPatientTaxVat55() {
		return patientTaxVat55;
	}

	public void setPatientTaxVat55(Double patientTaxVat55) {
		this.patientTaxVat55 = patientTaxVat55;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public double getPatientTotalVat() {
		return patientTotalVat;
	}

	public void setPatientTotalVat(double patientTotalVat) {
		this.patientTotalVat = patientTotalVat;
	}

	public String getPatientSaleCardNum() {
		return patientSaleCardNum;
	}

	public void setPatientSaleCardNum(String patientSaleCardNum) {
		this.patientSaleCardNum = patientSaleCardNum;
	}

	public String getAccountStatusPatient() {
		return accountStatusPatient;
	}

	public void setAccountStatusPatient(String accountStatusPatient) {
		this.accountStatusPatient = accountStatusPatient;
	}
	
	
}
