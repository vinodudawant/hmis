package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Transient;

public class PaidReceiptReport {

	@Transient
	private String pur_doc_id;
	
	@Transient
	private String pur_bill_date;
	
	@Transient
	private String vendor_name;
	
	@Transient
	private Double pur_slave_amt;
	
	@Transient
	private String cash_paid_made_by;
	
	@Transient
	private List<PaidReceiptReport> lstPaidReceiptReport;

	public String getPur_doc_id() {
		return pur_doc_id;
	}

	public void setPur_doc_id(String pur_doc_id) {
		this.pur_doc_id = pur_doc_id;
	}

	public String getPur_bill_date() {
		return pur_bill_date;
	}

	public void setPur_bill_date(String pur_bill_date) {
		this.pur_bill_date = pur_bill_date;
	}

	public String getVendor_name() {
		return vendor_name;
	}

	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}

	public Double getPur_slave_amt() {
		return pur_slave_amt;
	}

	public void setPur_slave_amt(Double pur_slave_amt) {
		this.pur_slave_amt = pur_slave_amt;
	}

	public String getCash_paid_made_by() {
		return cash_paid_made_by;
	}

	public void setCash_paid_made_by(String cash_paid_made_by) {
		this.cash_paid_made_by = cash_paid_made_by;
	}

	public List<PaidReceiptReport> getLstPaidReceiptReport() {
		return lstPaidReceiptReport;
	}

	public void setLstPaidReceiptReport(List<PaidReceiptReport> lstPaidReceiptReport) {
		this.lstPaidReceiptReport = lstPaidReceiptReport;
	}

	@Override
	public String toString() {
		return "PaidReceiptReport [pur_doc_id=" + pur_doc_id + ", pur_bill_date=" + pur_bill_date + ", vendor_name="
				+ vendor_name + ", pur_slave_amt=" + pur_slave_amt + ", cash_paid_made_by=" + cash_paid_made_by
				+ ", lstPaidReceiptReport=" + lstPaidReceiptReport + "]";
	}
	
	
}
