package com.hms.pharmacy.pojo;

import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

public class ChequePaidReceiptReport {

	@Transient
	private Integer cheque_paid_id;
	
	@Transient
	private Date cheque_paid_date;
	
	@Transient
	private String vendor_name;
	
	@Transient
	private Double cheque_paid_amt;
	
	@Transient
	private String cheque_paid_made_by;
	
	@Transient
	private String cheque_trans_type;
	
	@Transient
	private String cheque_paid_cheque_num;
	
	@Transient
	private String bank_name;
	
	@Transient
	private List<ChequePaidReceiptReport> lstChequePaidReceiptReport;

	public Integer getCheque_paid_id() {
		return cheque_paid_id;
	}

	public void setCheque_paid_id(Integer cheque_paid_id) {
		this.cheque_paid_id = cheque_paid_id;
	}

	public Date getCheque_paid_date() {
		return cheque_paid_date;
	}

	public void setCheque_paid_date(Date cheque_paid_date) {
		this.cheque_paid_date = cheque_paid_date;
	}

	public String getVendor_name() {
		return vendor_name;
	}

	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}

	public Double getCheque_paid_amt() {
		return cheque_paid_amt;
	}

	public void setCheque_paid_amt(Double cheque_paid_amt) {
		this.cheque_paid_amt = cheque_paid_amt;
	}

	public String getCheque_paid_made_by() {
		return cheque_paid_made_by;
	}

	public void setCheque_paid_made_by(String cheque_paid_made_by) {
		this.cheque_paid_made_by = cheque_paid_made_by;
	}

	public String getCheque_trans_type() {
		return cheque_trans_type;
	}

	public void setCheque_trans_type(String cheque_trans_type) {
		this.cheque_trans_type = cheque_trans_type;
	}

	public String getCheque_paid_cheque_num() {
		return cheque_paid_cheque_num;
	}

	public void setCheque_paid_cheque_num(String cheque_paid_cheque_num) {
		this.cheque_paid_cheque_num = cheque_paid_cheque_num;
	}

	public String getBank_name() {
		return bank_name;
	}

	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}

	public List<ChequePaidReceiptReport> getLstChequePaidReceiptReport() {
		return lstChequePaidReceiptReport;
	}

	public void setLstChequePaidReceiptReport(List<ChequePaidReceiptReport> lstChequePaidReceiptReport) {
		this.lstChequePaidReceiptReport = lstChequePaidReceiptReport;
	}

	@Override
	public String toString() {
		return "ChequePaidReceiptReport [cheque_paid_id=" + cheque_paid_id + ", cheque_paid_date=" + cheque_paid_date
				+ ", vendor_name=" + vendor_name + ", cheque_paid_amt=" + cheque_paid_amt + ", cheque_paid_made_by="
				+ cheque_paid_made_by + ", cheque_trans_type=" + cheque_trans_type + ", cheque_paid_cheque_num="
				+ cheque_paid_cheque_num + ", bank_name=" + bank_name + ", lstChequePaidReceiptReport="
				+ lstChequePaidReceiptReport + "]";
	}
	
	
	
}
