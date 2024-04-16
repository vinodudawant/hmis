package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Transient;

public class DebitNoteData {
	
	@Transient
	private Integer debit_note_id;
	
	@Transient
	private String debit_note_date;
	
	@Transient
	private String vendor_name;
	
	@Transient
	private String vendor_gstn;
	
	@Transient
	private String debit_note_narration;
	
	@Transient
	private Double debit_note_net_amt;

	@Transient
	private List<DebitNoteData> lstDebitNoteData;

	public Integer getDebit_note_id() {
		return debit_note_id;
	}

	public void setDebit_note_id(Integer debit_note_id) {
		this.debit_note_id = debit_note_id;
	}

	
	public String getDebit_note_date() {
		return debit_note_date;
	}

	public void setDebit_note_date(String debit_note_date) {
		this.debit_note_date = debit_note_date;
	}

	public String getVendor_name() {
		return vendor_name;
	}

	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}

	public String getVendor_gstn() {
		return vendor_gstn;
	}

	public void setVendor_gstn(String vendor_gstn) {
		this.vendor_gstn = vendor_gstn;
	}

	public String getDebit_note_narration() {
		return debit_note_narration;
	}

	public void setDebit_note_narration(String debit_note_narration) {
		this.debit_note_narration = debit_note_narration;
	}

	public Double getDebit_note_net_amt() {
		return debit_note_net_amt;
	}

	public void setDebit_note_net_amt(Double debit_note_net_amt) {
		this.debit_note_net_amt = debit_note_net_amt;
	}

	public List<DebitNoteData> getLstDebitNoteData() {
		return lstDebitNoteData;
	}

	public void setLstDebitNoteData(List<DebitNoteData> lstDebitNoteData) {
		this.lstDebitNoteData = lstDebitNoteData;
	}

	@Override
	public String toString() {
		return "DebitNoteData [debit_note_id=" + debit_note_id + ", debit_note_date=" + debit_note_date
				+ ", vendor_name=" + vendor_name + ", vendor_gstn=" + vendor_gstn + ", debit_note_narration="
				+ debit_note_narration + ", debit_note_net_amt=" + debit_note_net_amt + ", lstDebitNoteData="
				+ lstDebitNoteData + "]";
	}
	
	
	
}
