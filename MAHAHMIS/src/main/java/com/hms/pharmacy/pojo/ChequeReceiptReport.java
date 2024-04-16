package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Transient;

public class ChequeReceiptReport {

	@Transient
	private String cheque_receipt_cheque_no;
	
	@Transient
	private String vendor_name;
	
	@Transient
	private String vendorBank;
	
	@Transient
	private String pharmacyBank;
	
	@Transient
	private Integer cheque_receipt_amt;
	
	@Transient
	private String cheque_receipt_made_by;

	@Transient
	private List<ChequeReceiptReport> lstChequeReceiptReport;

	public String getCheque_receipt_cheque_no() {
		return cheque_receipt_cheque_no;
	}

	public void setCheque_receipt_cheque_no(String cheque_receipt_cheque_no) {
		this.cheque_receipt_cheque_no = cheque_receipt_cheque_no;
	}

	public String getVendor_name() {
		return vendor_name;
	}

	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}

	public String getVendorBank() {
		return vendorBank;
	}

	public void setVendorBank(String vendorBank) {
		this.vendorBank = vendorBank;
	}

	public String getPharmacyBank() {
		return pharmacyBank;
	}

	public void setPharmacyBank(String pharmacyBank) {
		this.pharmacyBank = pharmacyBank;
	}

	public Integer getCheque_receipt_amt() {
		return cheque_receipt_amt;
	}

	public void setCheque_receipt_amt(Integer cheque_receipt_amt) {
		this.cheque_receipt_amt = cheque_receipt_amt;
	}

	public String getCheque_receipt_made_by() {
		return cheque_receipt_made_by;
	}

	public void setCheque_receipt_made_by(String cheque_receipt_made_by) {
		this.cheque_receipt_made_by = cheque_receipt_made_by;
	}

	public List<ChequeReceiptReport> getLstChequeReceiptReport() {
		return lstChequeReceiptReport;
	}

	public void setLstChequeReceiptReport(List<ChequeReceiptReport> lstChequeReceiptReport) {
		this.lstChequeReceiptReport = lstChequeReceiptReport;
	}

	@Override
	public String toString() {
		return "ChequeReceiptReport [cheque_receipt_cheque_no=" + cheque_receipt_cheque_no + ", vendor_name="
				+ vendor_name + ", vendorBank=" + vendorBank + ", pharmacyBank=" + pharmacyBank
				+ ", cheque_receipt_amt=" + cheque_receipt_amt + ", cheque_receipt_made_by=" + cheque_receipt_made_by
				+ ", lstChequeReceiptReport=" + lstChequeReceiptReport + "]";
	}
	
	
}
