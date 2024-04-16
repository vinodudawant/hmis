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
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_debit_note_master")
public class DebitNoteMaster implements Serializable {
	@Id
	@GeneratedValue
	@Column(name = "debit_note_id")
	private Integer debitNoteId;

	@Column(name = "debit_note_doc_no")
	private String debitNoteDocNo;

	@Column(name = "debit_note_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date debitNoteDate;

	@Column(name = "debit_note_narration")
	private String debitNoteNarration;

	@Column(name = "debit_note_entered_by")
	private String debitNotEnteredBy;

	@ManyToOne
	@JoinColumn(name = "debit_note_vendor_id")
	private VendorMaster vendorMaster;

	@Column(name = "debit_note_tax_info")
	private String debitNoteTaxInfo;

	@Column(name = "debit_note_discount_info")
	private String debitNoteDiscountInfo;

	@Column(name = "debit_note_gross_amt")
	private Double debitNoteGrossAmt;

	@Column(name = "debit_note_net_amt")
	private Double debitNoteNetAmt;

	@Column(name = "debit_note_less")
	private String debitNoteLess;

	@Column(name = "debit_note_vat")
	private String debitNoteVat;

	@Column(name = "debit_note_add")
	private String debitNoteAdd;

	@Column(name = "debit_note_surcharges")
	private String debitNoteSurcharges;
	
	@Column(name = "account_status_debit")
	private String accountStatusDebit;

	public String getAccountStatusDebit() {
		return accountStatusDebit;
	}

	public void setAccountStatusDebit(String accountStatusDebit) {
		this.accountStatusDebit = accountStatusDebit;
	}

	@Column(name = "debit_note_delete_flag")
	private Integer debitNoteDeleteFlag;

	@Column(name = "debit_note_update_date")
	private Date debitNoteUpdateDate;
	
	@Column(name = "unit_id" ,columnDefinition="int default 1")
	private int unitId;
	
	@Column(name = " created_by" ,columnDefinition="int default 1")
	private int createdBy;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "debit_note_slave_master_id", referencedColumnName = "debit_note_id")
	private List<DebitNoteSlave> debitNoteSlaves = new ArrayList<DebitNoteSlave>();
	
	@Column(name = "debit_note_purEntry_id")
	private Integer purchaseEntryId=0;
	
	@Transient
	private String vendorName;
	@Transient
	private String vendorMobileNumber;
		
	public Integer getPurchaseEntryId() {
		return purchaseEntryId;
	}

	public void setPurchaseEntryId(Integer purchaseEntryId) {
		this.purchaseEntryId = purchaseEntryId;
	}

	public List<DebitNoteSlave> getDebitNoteSlaves() {
		return debitNoteSlaves;
	}

	public void setDebitNoteSlaves(List<DebitNoteSlave> debitNoteSlaves) {
		this.debitNoteSlaves = debitNoteSlaves;
	}

	public Integer getDebitNoteId() {
		return debitNoteId;
	}

	public void setDebitNoteId(Integer debitNoteId) {
		this.debitNoteId = debitNoteId;
	}

	public String getDebitNoteDocNo() {
		return debitNoteDocNo;
	}

	public void setDebitNoteDocNo(String debitNoteDocNo) {
		this.debitNoteDocNo = debitNoteDocNo;
	}

	public Date getDebitNoteDate() {
		return debitNoteDate;
	}

	public void setDebitNoteDate(Date debitNoteDate) {
		this.debitNoteDate = debitNoteDate;
	}

	public String getDebitNoteNarration() {
		return debitNoteNarration;
	}

	public void setDebitNoteNarration(String debitNoteNarration) {
		this.debitNoteNarration = debitNoteNarration;
	}

	public String getDebitNotEnteredBy() {
		return debitNotEnteredBy;
	}

	public void setDebitNotEnteredBy(String debitNotEnteredBy) {
		this.debitNotEnteredBy = debitNotEnteredBy;
	}

	public VendorMaster getVendorMaster() {
		return vendorMaster;
	}

	public void setVendorMaster(VendorMaster vendorMaster) {
		this.vendorMaster = vendorMaster;
	}

	public String getDebitNoteTaxInfo() {
		return debitNoteTaxInfo;
	}

	public void setDebitNoteTaxInfo(String debitNoteTaxInfo) {
		this.debitNoteTaxInfo = debitNoteTaxInfo;
	}

	public String getDebitNoteDiscountInfo() {
		return debitNoteDiscountInfo;
	}

	public void setDebitNoteDiscountInfo(String debitNoteDiscountInfo) {
		this.debitNoteDiscountInfo = debitNoteDiscountInfo;
	}

	public Double getDebitNoteGrossAmt() {
		return debitNoteGrossAmt;
	}

	public void setDebitNoteGrossAmt(Double debitNoteGrossAmt) {
		this.debitNoteGrossAmt = debitNoteGrossAmt;
	}

	public Double getDebitNoteNetAmt() {
		return debitNoteNetAmt;
	}

	public void setDebitNoteNetAmt(Double debitNoteNetAmt) {
		this.debitNoteNetAmt = debitNoteNetAmt;
	}

	public String getDebitNoteLess() {
		return debitNoteLess;
	}

	public void setDebitNoteLess(String debitNoteLess) {
		this.debitNoteLess = debitNoteLess;
	}

	public String getDebitNoteVat() {
		return debitNoteVat;
	}

	public void setDebitNoteVat(String debitNoteVat) {
		this.debitNoteVat = debitNoteVat;
	}

	public String getDebitNoteAdd() {
		return debitNoteAdd;
	}

	public void setDebitNoteAdd(String debitNoteAdd) {
		this.debitNoteAdd = debitNoteAdd;
	}

	public String getDebitNoteSurcharges() {
		return debitNoteSurcharges;
	}

	public void setDebitNoteSurcharges(String debitNoteSurcharges) {
		this.debitNoteSurcharges = debitNoteSurcharges;
	}

	public Integer getDebitNoteDeleteFlag() {
		return debitNoteDeleteFlag;
	}

	public void setDebitNoteDeleteFlag(Integer debitNoteDeleteFlag) {
		this.debitNoteDeleteFlag = debitNoteDeleteFlag;
	}

	public Date getDebitNoteUpdateDate() {
		return debitNoteUpdateDate;
	}

	public void setDebitNoteUpdateDate(Date debitNoteUpdateDate) {
		this.debitNoteUpdateDate = debitNoteUpdateDate;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "pur_vendor_add_id")
	private VendorAddress vendorAddress;

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

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getVendorMobileNumber() {
		return vendorMobileNumber;
	}

	public void setVendorMobileNumber(String vendorMobileNumber) {
		this.vendorMobileNumber = vendorMobileNumber;
	}
	
	
}