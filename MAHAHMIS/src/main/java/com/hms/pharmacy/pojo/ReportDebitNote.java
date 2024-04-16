package com.hms.pharmacy.pojo;

public class ReportDebitNote {
	private int debitnotid;
	private String vocharNo;
	private String createdDate;
	private double grossamt;
	private double netamt;
	private String naration;
	private String vendorName;
	public int getDebitnotid() {
		return debitnotid;
	}
	public void setDebitnotid(int debitnotid) {
		this.debitnotid = debitnotid;
	}
	public String getVocharNo() {
		return vocharNo;
	}
	public void setVocharNo(String vocharNo) {
		this.vocharNo = vocharNo;
	}
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	public double getGrossamt() {
		return grossamt;
	}
	public void setGrossamt(double grossamt) {
		this.grossamt = grossamt;
	}
	public double getNetamt() {
		return netamt;
	}
	public void setNetamt(double netamt) {
		this.netamt = netamt;
	}
	public String getNaration() {
		return naration;
	}
	public void setNaration(String naration) {
		this.naration = naration;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	
	
	
}
