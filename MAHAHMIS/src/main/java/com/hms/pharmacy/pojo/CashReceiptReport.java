package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Transient;

public class CashReceiptReport {

	@Transient
	private String cash_receipt_doc_id;
	
	@Transient
	private String vendor_name;
	
	@Transient
	private Integer cash_receipt_amt;
	
	@Transient
	private String cash_receipt_made_by;

	@Transient
	private List<CashReceiptReport> lstCashReceiptReport;
	
	public String getCash_receipt_doc_id() {
		return cash_receipt_doc_id;
	}

	public void setCash_receipt_doc_id(String cash_receipt_doc_id) {
		this.cash_receipt_doc_id = cash_receipt_doc_id;
	}

	public String getVendor_name() {
		return vendor_name;
	}

	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}

	public Integer getCash_receipt_amt() {
		return cash_receipt_amt;
	}

	public void setCash_receipt_amt(Integer cash_receipt_amt) {
		this.cash_receipt_amt = cash_receipt_amt;
	}

	public String getCash_receipt_made_by() {
		return cash_receipt_made_by;
	}

	public void setCash_receipt_made_by(String cash_receipt_made_by) {
		this.cash_receipt_made_by = cash_receipt_made_by;
	}

	public List<CashReceiptReport> getLstCashReceiptReport() {
		return lstCashReceiptReport;
	}

	public void setLstCashReceiptReport(List<CashReceiptReport> lstCashReceiptReport) {
		this.lstCashReceiptReport = lstCashReceiptReport;
	}

	@Override
	public String toString() {
		return "CashReceiptReport [cash_receipt_doc_id=" + cash_receipt_doc_id + ", vendor_name=" + vendor_name
				+ ", cash_receipt_amt=" + cash_receipt_amt + ", cash_receipt_made_by=" + cash_receipt_made_by
				+ ", lstCashReceiptReport=" + lstCashReceiptReport + "]";
	}
	
	
	
	
	
}
