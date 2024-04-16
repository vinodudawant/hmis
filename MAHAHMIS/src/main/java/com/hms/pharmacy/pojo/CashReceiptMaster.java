package com.hms.pharmacy.pojo;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "pharma_cash_receipt_master")
public class CashReceiptMaster {

	@Id
	@GeneratedValue
	@Column(name = "cash_receipt_id")
	private Integer cashReceiptId;
	
	@Column(name = "cash_receipt_doc_id")
	private String cashReceiptDocId;
	
	@Column(name = "cash_receipt_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date cashReceiptDate;
	
	@ManyToOne
	@JsonIgnoreProperties
	@JoinColumn(name = "cash_receipt_vendor_id")
	private VendorMaster vendorMaster=new VendorMaster();
	
	@Column(name = "cash_receipt_narration")
	private String cashReceiptNarration;
	
	@Column(name = "cash_receipt_amt")
	private Integer cashReceiptAmt;
	
	@Column(name = "cash_receipt_made_by")
	private String cashReceiptMadeBy;
	
	@Column(name = "cash_receipt_delete_flag")
	private Integer cashReceiptDeleteFlag;
	
	@Column(name = "cash_receipt_update_date")
	private Date cashReceiptUpdateDate;
   
	@ManyToOne
	@JsonIgnoreProperties
	@JoinColumn(name = "cash_receipt_vendor_add_id")
	private VendorAddress vendorAddress=new VendorAddress();
	
		
	public Integer getCashReceiptId() {
		return cashReceiptId;
	}

	public void setCashReceiptId(Integer cashReceiptId) {
		this.cashReceiptId = cashReceiptId;
	}

	public String getCashReceiptDocId() {
		return cashReceiptDocId;
	}

	public void setCashReceiptDocId(String cashReceiptDocId) {
		this.cashReceiptDocId = cashReceiptDocId;
	}

	public Date getCashReceiptDate() {
		return cashReceiptDate;
	}

	public void setCashReceiptDate(Date cashReceiptDate) {
		this.cashReceiptDate = cashReceiptDate;
	}

	
	public VendorMaster getVendorMaster() {
		return vendorMaster;
	}

	public void setVendorMaster(VendorMaster vendorMaster) {
		this.vendorMaster = vendorMaster;
	}

	public String getCashReceiptNarration() {
		return cashReceiptNarration;
	}

	public void setCashReceiptNarration(String cashReceiptNarration) {
		this.cashReceiptNarration = cashReceiptNarration;
	}

	public Integer getCashReceiptAmt() {
		return cashReceiptAmt;
	}

	public void setCashReceiptAmt(Integer cashReceiptAmt) {
		this.cashReceiptAmt = cashReceiptAmt;
	}

	public String getCashReceiptMadeBy() {
		return cashReceiptMadeBy;
	}

	public void setCashReceiptMadeBy(String cashReceiptMadeBy) {
		this.cashReceiptMadeBy = cashReceiptMadeBy;
	}

	public Integer getCashReceiptDeleteFlag() {
		return cashReceiptDeleteFlag;
	}

	public void setCashReceiptDeleteFlag(Integer cashReceiptDeleteFlag) {
		this.cashReceiptDeleteFlag = cashReceiptDeleteFlag;
	}

	public Date getCashReceiptUpdateDate() {
		return cashReceiptUpdateDate;
	}

	public void setCashReceiptUpdateDate(Date cashReceiptUpdateDate) {
		this.cashReceiptUpdateDate = cashReceiptUpdateDate;
	}
	
	public VendorAddress getVendorAddress() {
		return vendorAddress;
	}

	public void setVendorAddress(VendorAddress vendorAddress) {
		this.vendorAddress = vendorAddress;
	}
	
	

}
