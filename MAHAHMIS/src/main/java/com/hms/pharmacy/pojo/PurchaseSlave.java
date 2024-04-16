package com.hms.pharmacy.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.springframework.beans.factory.annotation.Qualifier;

@Entity
@Table(name = "pharma_purchase_slave")
public class PurchaseSlave implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pur_slave_id")
	private Integer purSlaveId;

	@Column(name = "pur_slave_sr")
	private Integer purSlaveSr;

	@ManyToOne
	@JoinColumn(name = "pur_slave_product_id")
	private ProductMaster productMaster;

	@Column(name = "pur_slave_qty")
	private Integer purSlaveQty;

	@Column(name = "pur_slave_scheme")
	private Double purSlaveScheme;
	
	@Column(name = "pur_slave_scheme_amt")
	private Double purSlaveSchemeAmt;

	@Column(name = "pur_slave_mrp")
	private Double purSlaveMrp;

	@Column(name = "pur_slave_rate")
	private Double purslaverate;

	@Column(name = "pur_slave_bill_rate")
	private Double purSlaveBillRate;

	@Column(name = "pur_slave_purchase_rate")
	private Double purSlavePurchaseRate;

	@Column(name = "pur_slave_amt")
	private Double purSlaveAmt;

	@Column(name = "pur_slave_batch_code")
	private String batchCode;

	@Column(name = "pur_slave_exp_date")
	private String batchExpDate;
	
	@ManyToOne
	@JoinColumn(name = "pur_slave_master_id")
	private PurchaseMaster purchaseMaster;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pur_slave_batch_id")
	private BatchMaster batchMaster;
	
	@Column(name = "pur_slave_disc")
	private Double purDisc;	
	
	@Column(name = "pur_slave_vat")
	private Double purVat;
	
	@Column(name = "pur_hsn")
	private String purHsn;
	
	@Column(name = "pur_igst")
	private Double purIgst;
	
	@Column(name = "pur_cess")
	private Double purCess;
	
	
	@Column(name = "pur_slave_disc_amt")
	private Double purDiscAmt;	
	
	@Column(name = "del_chalan_number")
	private String delChalanNumber;	
	
	@Column(name = "pur_gstamt" , columnDefinition="double default 0.0")
	private Double purgstamt=0.0;
	
	@Column(name = "pur_igstamt" , columnDefinition="double default 0.0")
	private Double purigstamt=0.0;
	
	@Column(name = "pur_gstid" , columnDefinition="int default 0")
	private int purgstId;
	
	@Column(name = "pur_descountamt" , columnDefinition="double default 0.0")
	private double purdescountamt=0.0;
	
	@Column(name = "purchase_entry_slave_issue_qty" , columnDefinition="int default 0")
	private int purchaseEntrySlaveIssueQty;
	
	@Column(name = "account_status_grn")
	private String accountStatusGRN;
	
	@Transient
	private String patientPahrmaAmtId;
	
	@Transient
	private String patient_sales_bill_net_amt; 
	
	public String getPatient_sales_bill_net_amt() {
		return patient_sales_bill_net_amt;
	}

	public void setPatient_sales_bill_net_amt(String patient_sales_bill_net_amt) {
		this.patient_sales_bill_net_amt = patient_sales_bill_net_amt;
	}

	@Transient
	private String amtReceive;
	
	@Transient
	private String amtBal;
	
	@Transient
	private String discount;
	
	@Transient
	private String finalDate;
	
	@Transient
	private String treatmentId;

	public String getPatientPahrmaAmtId() {
		return patientPahrmaAmtId;
	}

	public void setPatientPahrmaAmtId(String patientPahrmaAmtId) {
		this.patientPahrmaAmtId = patientPahrmaAmtId;
	}

	public String getAmtReceive() {
		return amtReceive;
	}

	public void setAmtReceive(String amtReceive) {
		this.amtReceive = amtReceive;
	}

	public String getAmtBal() {
		return amtBal;
	}

	public void setAmtBal(String amtBal) {
		this.amtBal = amtBal;
	}

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public String getFinalDate() {
		return finalDate;
	}

	public void setFinalDate(String finalDate) {
		this.finalDate = finalDate;
	}

	public String getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getAccountStatusGRN() {
		return accountStatusGRN;
	}

	public void setAccountStatusGRN(String accountStatusGRN) {
		this.accountStatusGRN = accountStatusGRN;
	}

	public Double getPurSlaveSchemeAmt() {
		return purSlaveSchemeAmt;
	}

	public void setPurSlaveSchemeAmt(Double purSlaveSchemeAmt) {
		this.purSlaveSchemeAmt = purSlaveSchemeAmt;
	}

	public int getPurchaseEntrySlaveIssueQty() 
	{
		return purchaseEntrySlaveIssueQty;
	}

	public void setPurchaseEntrySlaveIssueQty(int purchaseEntrySlaveIssueQty) 
	{
		this.purchaseEntrySlaveIssueQty = purchaseEntrySlaveIssueQty;
	}

	
	public String getDelChalanNumber() {
		return delChalanNumber;
	}

	public String getPurHsn() {
		return purHsn;
	}

	public void setPurHsn(String purHsn) {
		this.purHsn = purHsn;
	}

	public Double getPurIgst() {
		return purIgst;
	}

	public void setPurIgst(Double purIgst) {
		this.purIgst = purIgst;
	}

	public Double getPurCess() {
		return purCess;
	}

	public void setPurCess(Double purCess) {
		this.purCess = purCess;
	}

	public void setDelChalanNumber(String delChalanNumber) {
		this.delChalanNumber = delChalanNumber;
	}

	public Double getPurDiscAmt() {
		return purDiscAmt;
	}

	public void setPurDiscAmt(Double purDiscAmt) {
		this.purDiscAmt = purDiscAmt;
	}

	public Double getPurSlavePurchaseRate() 
	{
		return purSlavePurchaseRate;
	}

	public void setPurSlavePurchaseRate(Double purSlavePurchaseRate) {
		this.purSlavePurchaseRate = purSlavePurchaseRate;
	}

	public Double getPurSlaveBillRate() {
		return purSlaveBillRate;
	}

	public void setPurSlaveBillRate(Double purSlaveBillRate) {
		this.purSlaveBillRate = purSlaveBillRate;
	}

	public String getBatchCode() {
		return batchCode;
	}

	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}

	public Double getPurSlaveAmt() {
		return purSlaveAmt;
	}

	public void setPurSlaveAmt(Double purSlaveAmt) {
		this.purSlaveAmt = purSlaveAmt;
	}

	public Integer getPurSlaveId() {
		return purSlaveId;
	}

	@JsonIgnore
	public PurchaseMaster getPurchaseMaster() {
		return purchaseMaster;
	}

	public void setPurchaseMaster(PurchaseMaster purchaseMaster) {
		this.purchaseMaster = purchaseMaster;
	}

	public void setPurSlaveId(Integer purSlaveId) {
		this.purSlaveId = purSlaveId;
	}

	public Integer getPurSlaveSr() {
		return purSlaveSr;
	}

	public void setPurSlaveSr(Integer purSlaveSr) {
		this.purSlaveSr = purSlaveSr;
	}

	public Double getPurSlaveMrp() {
		return purSlaveMrp;
	}

	public void setPurSlaveMrp(Double purSlaveMrp) {
		this.purSlaveMrp = purSlaveMrp;
	}

	public Double getPurslaverate() {
		return purslaverate;
	}

	public void setPurslaverate(Double purslaverate) {
		this.purslaverate = purslaverate;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	

	public Integer getPurSlaveQty() {
		return purSlaveQty;
	}

	public void setPurSlaveQty(Integer purSlaveQty) {
		this.purSlaveQty = purSlaveQty;
	}

	public Double getPurSlaveScheme() {
		return purSlaveScheme;
	}

	public void setPurSlaveScheme(Double purSlaveScheme) {
		this.purSlaveScheme = purSlaveScheme;
	}

	public BatchMaster getBatchMaster() {
		return batchMaster;
	}

	public void setBatchMaster(BatchMaster batchMaster) {
		this.batchMaster = batchMaster;
	}

	public Double getPurDisc() {
		return purDisc;
	}

	public void setPurDisc(Double purDisc) {
		this.purDisc = purDisc;
	}

	public Double getPurVat() {
		return purVat;
	}

	public void setPurVat(Double purVat) {
		this.purVat = purVat;
	}

	public String getBatchExpDate() {
		return batchExpDate;
	}

	public void setBatchExpDate(String batchExpDate) {
		this.batchExpDate = batchExpDate;
	}

	public Double getPurgstamt() {
		return purgstamt;
	}

	public void setPurgstamt(Double purgstamt) {
		this.purgstamt = purgstamt;
	}

	public Double getPurigstamt() {
		return purigstamt;
	}

	public void setPurigstamt(Double purigstamt) {
		this.purigstamt = purigstamt;
	}

	public int getPurgstId() {
		return purgstId;
	}

	public void setPurgstId(int purgstId) {
		this.purgstId = purgstId;
	}

	public double getPurdescountamt() {
		return purdescountamt;
	}

	public void setPurdescountamt(double purdescountamt) {
		this.purdescountamt = purdescountamt;
	}

	
	
	
	
}
