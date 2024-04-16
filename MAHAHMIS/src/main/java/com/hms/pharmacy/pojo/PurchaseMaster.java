package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_purchase_master")
public class PurchaseMaster implements Serializable 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pur_id")
	private Integer purId;

	@Column(name = "pur_doc_id")
	private String purDocId;

	@Column(name = "pur_bill_no")
	private String purBillNo;

	@Column(name = "pur_bill_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date purBillDate;

	@Column(name = "pur_entry_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date purEntryDate;

	@Column(name = "pur_due_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date purDueDate;

	@Column(name = "pur_gross_amt")
	private Double purGrossAmt;

	@Column(name = "pur_net_amt")
	private Double purNetAmt;
	
	@Column(name = "pur_tax_vat5")
	private Double purTaxVat5;

	@Column(name = "pur_tax_lbt")
	private Double purTaxLbt;

	@Column(name = "pur_trans_type")
	private String purTransType;

	@Column(name = "pur_delete_flag")
	private Integer purDeleteFlag;

	@Column(name = "pur_update_date")
	private Date purUpdateDate;

	@Column(name = "pur_tax_cst")
	private Double purTaxCst;

	@Column(name = "pur_tax_vat12")
	private Double purTaxVat12;

	@Column(name = "pur_item_disc")
	private Double purItemDisc;

	@Column(name = "pur_schm_disc")
	private Double purSchmDisc;

	@Column(name = "pur_spl_disc")
	private Double purSplDisc;

	@Column(name = "pur_debit_amt")
	private Double purDebitAmt;

	@Column(name = "pur_octroi")
	private Double purOctroi;

	@Column(name = "pur_surcharge")
	private Double purSurcharge;

	@Column(name = "pur_credit_amt")
	private Double purCreditAmt;

	@Column(name = "pur_freight")
	private Double purFreight;

	@Column(name = "pur_total_amt")
	private Double purTotalVat;

	@Column(name = "pur_less")
	private Double purLess;

	@Column(name = "pur_add")
	private Double purAdd;

	@Column(name = "pur_vat")
	private Double purVat;
		
	@Column(name = "pur_cd")
	private Double CD;
	
	@Column(name = "pur_cd_amt")
	private Double CDAmt;
	
	@Column(name = "unit_count")
	private Integer unitCount;
	
	@OneToMany(cascade = CascadeType.ALL,fetch= FetchType.LAZY)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "pur_slave_master_id", referencedColumnName = "pur_id")
	private List<PurchaseSlave> ltPurSlave = new ArrayList<PurchaseSlave>();

	@ManyToOne
	@JoinColumn(name = "pur_vendor_id")
	private VendorMaster vendorMaster;
	
	@ManyToOne
	@JoinColumn(name = "pur_vendor_add_id")
	private VendorAddress vendorAddress;

	@Column(name = "pur_status")
	private String purchaseStatus;
	
	@Column(name = "pur_round")
	private Double purRound;
	
	@Column(name = "pur_po_id")
	private Integer poId=0;
	
	@Column(name="pur_entry_status")	
    private String purentryStatus="pending";
	
	@Column(name = "pur_tax_without_disc_vat5")
	private Double purWithoutDiscTaxVat5;
	
	@Column(name = "pur_tax_without_disc_vat12")
	private Double purWithoutDiscTaxVat12;
	
	@Column(name = "pur_vmi")
	private int vmi;
	
	@Column(name = "dispatch_unitId",columnDefinition="int default 0")
	private int dispatchunitId;
	
	@Column(name = "dispatch_flag")
	private String dispatchflag;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "purchase_date_time",updatable=false)
	private Date purchase_date_time;
	
	@Column(name = " unit_id" ,columnDefinition="int default 1")
	private int unitId;
	
	@Column(name = " created_by" ,columnDefinition="int default 1")
	private int createdBy;
	
	@Column(name = "account_status_grn")
	private String accountStatusGRN;
	
	@Column(name = "dispatch_GDate", updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date dispatchGDate;
	
	public String getAccountStatusGRN() {
		return accountStatusGRN;
	}

	public void setAccountStatusGRN(String accountStatusGRN) {
		this.accountStatusGRN = accountStatusGRN;
	}
	
	public int getVmi() {
		return vmi;
	}

	public void setVmi(int vmi) {
		this.vmi = vmi;
	}

	public Double getPurWithoutDiscTaxVat5() {
		return purWithoutDiscTaxVat5;
	}

	public void setPurWithoutDiscTaxVat5(Double purWithoutDiscTaxVat5) {
		this.purWithoutDiscTaxVat5 = purWithoutDiscTaxVat5;
	}

	public Double getPurWithoutDiscTaxVat12() {
		return purWithoutDiscTaxVat12;
	}

	public void setPurWithoutDiscTaxVat12(Double purWithoutDiscTaxVat12) {
		this.purWithoutDiscTaxVat12 = purWithoutDiscTaxVat12;
	}

	public Double getCDAmt() {
		return CDAmt;
	}

	public void setCDAmt(Double cDAmt) {
		CDAmt = cDAmt;
	}
	
	public String getPurentryStatus() {
		return purentryStatus;
	}

	public void setPurentryStatus(String purentryStatus) {
		this.purentryStatus = purentryStatus;
	}

	
	public Double getPurTaxCst() {
		return purTaxCst;
	}

	public void setPurTaxCst(Double purTaxCst) {
		this.purTaxCst = purTaxCst;
	}

	public Double getPurTaxVat12() {
		return purTaxVat12;
	}

	public void setPurTaxVat12(Double purTaxVat12) {
		this.purTaxVat12 = purTaxVat12;
	}

	public Double getPurItemDisc() {
		return purItemDisc;
	}

	public void setPurItemDisc(Double purItemDisc) {
		this.purItemDisc = purItemDisc;
	}

	public Double getPurSchmDisc() {
		return purSchmDisc;
	}

	public void setPurSchmDisc(Double purSchmDisc) {
		this.purSchmDisc = purSchmDisc;
	}

	public Double getPurSplDisc() {
		return purSplDisc;
	}

	public void setPurSplDisc(Double purSplDisc) {
		this.purSplDisc = purSplDisc;
	}

	public Double getPurOctroi() {
		return purOctroi;
	}

	public void setPurOctroi(Double purOctroi) {
		this.purOctroi = purOctroi;
	}

	public Double getPurSurcharge() {
		return purSurcharge;
	}

	public void setPurSurcharge(Double purSurcharge) {
		this.purSurcharge = purSurcharge;
	}

	public Double getPurCreditAmt() {
		return purCreditAmt;
	}

	public void setPurCreditAmt(Double purCreditAmt) {
		this.purCreditAmt = purCreditAmt;
	}

	public Double getPurFreight() {
		return purFreight;
	}

	public void setPurFreight(Double purFreight) {
		this.purFreight = purFreight;
	}

	public Double getPurDebitAmt() {
		return purDebitAmt;
	}

	public void setPurDebitAmt(Double purDebitAmt) {
		this.purDebitAmt = purDebitAmt;
	}

	public Double getPurTotalVat() {
		return purTotalVat;
	}

	public void setPurTotalVat(Double purTotalVat) {
		this.purTotalVat = purTotalVat;
	}

	public Double getPurLess() {
		return purLess;
	}

	public void setPurLess(Double purLess) {
		this.purLess = purLess;
	}

	public Double getPurAdd() {
		return purAdd;
	}

	public void setPurAdd(Double purAdd) {
		this.purAdd = purAdd;
	}

	public Double getPurVat() {
		return purVat;
	}

	public void setPurVat(Double purVat) {
		this.purVat = purVat;
	}

	/*
	 * @Column(name="pur_vendor_id") private Integer purVendorId;
	 * 
	 * public Integer getPurVendorId() { return purVendorId; }
	 * 
	 * public void setPurVendorId(Integer purVendorId) { this.purVendorId =
	 * purVendorId; }
	 */
	
	
	public Double getCD() {
		return CD;
	}

	public void setCD(Double cD) {
		CD = cD;
	}

	public List<PurchaseSlave> getLtPurSlave() {
		return ltPurSlave;
	}

	public void setLtPurSlave(List<PurchaseSlave> ltPurSlave) {
		this.ltPurSlave = ltPurSlave;
	}

	public VendorMaster getVendorMaster() {
		return vendorMaster;
	}

	public void setVendorMaster(VendorMaster vendorMaster) {
		this.vendorMaster = vendorMaster;
	}

	public Integer getPurId() {
		return purId;
	}

	public void setPurId(Integer purId) {
		this.purId = purId;
	}

	public String getPurDocId() {
		return purDocId;
	}

	public void setPurDocId(String purDocId) {
		this.purDocId = purDocId;
	}

	public String getPurBillNo() {
		return purBillNo;
	}

	public void setPurBillNo(String purBillNo) {
		this.purBillNo = purBillNo;
	}

	public Date getPurBillDate() {
		return purBillDate;
	}

	public void setPurBillDate(Date purBillDate) {
		this.purBillDate = purBillDate;
	}

	public Date getPurEntryDate() {
		return purEntryDate;
	}

	public void setPurEntryDate(Date purEntryDate) {
		this.purEntryDate = purEntryDate;
	}

	public Date getPurDueDate() {
		return purDueDate;
	}

	public void setPurDueDate(Date purDueDate) {
		this.purDueDate = purDueDate;
	}

	public Double getPurGrossAmt() {
		return purGrossAmt;
	}

	public void setPurGrossAmt(Double purGrossAmt) {
		this.purGrossAmt = purGrossAmt;
	}

	public Double getPurTaxVat5() {
		return purTaxVat5;
	}

	public void setPurTaxVat5(Double purTaxVat5) {
		this.purTaxVat5 = purTaxVat5;
	}

	public Double getPurTaxLbt() {
		return purTaxLbt;
	}

	public void setPurTaxLbt(Double purTaxLbt) {
		this.purTaxLbt = purTaxLbt;
	}

	public String getPurTransType() {
		return purTransType;
	}

	public void setPurTransType(String purTransType) {
		this.purTransType = purTransType;
	}

	public Integer getPurDeleteFlag() {
		return purDeleteFlag;
	}

	public void setPurDeleteFlag(Integer purDeleteFlag) {
		this.purDeleteFlag = purDeleteFlag;
	}

	public Date getPurUpdateDate() {
		return purUpdateDate;
	}

	public void setPurUpdateDate(Date purUpdateDate) {
		this.purUpdateDate = purUpdateDate;
	}

	public Double getPurNetAmt() {
		return purNetAmt;
	}

	public void setPurNetAmt(Double purNetAmt) {
		this.purNetAmt = purNetAmt;
	}

	public String getPurchaseStatus() {
		return purchaseStatus;
	}

	public void setPurchaseStatus(String purchaseStatus) {
		this.purchaseStatus = purchaseStatus;
	}

	public Double getPurRound() {
		return purRound;
	}

	public void setPurRound(Double purRound) {
		this.purRound = purRound;
	}

	public Integer getPoId() {
		return poId;
	}

	public void setPoId(Integer poId) {
		this.poId = poId;
	}

	public int getDispatchunitId() {
		return dispatchunitId;
	}

	public void setDispatchunitId(int dispatchunitId) {
		this.dispatchunitId = dispatchunitId;
	}

	public String getDispatchflag() {
		return dispatchflag;
	}

	public void setDispatchflag(String dispatchflag) {
		this.dispatchflag = dispatchflag;
	}

	public Date getDispatchGDate() {
		return dispatchGDate;
	}

	public void setDispatchGDate(Date dispatchGDate) {
		this.dispatchGDate = dispatchGDate;
	}

	public VendorAddress getVendorAddress() {
		return vendorAddress;
	}

	public void setVendorAddress(VendorAddress vendorAddress) {
		this.vendorAddress = vendorAddress;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Date getPurchase_date_time() {
		return purchase_date_time;
	}

	public void setPurchase_date_time(Date purchase_date_time) {
		this.purchase_date_time = purchase_date_time;
	}

	public Integer getUnitCount() {
		return unitCount;
	}

	public void setUnitCount(Integer unitCount) {
		this.unitCount = unitCount;
	}	
	
	
	
}