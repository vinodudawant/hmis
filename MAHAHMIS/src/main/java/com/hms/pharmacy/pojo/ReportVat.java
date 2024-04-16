package com.hms.pharmacy.pojo;

public class ReportVat {
	private String vouNo;
	private String type;
	private String purBillNo;
	private String billDate;
	private String batchCode;
	private String vendorName;
	private String qty;
	private String rate;
	private String netAmount;
	private String mrp;
	private String scheme;
	private String disc;

	private String vat5;
	private String vat12;
	private String amt5;
	private String amt12;
	private String vouDate;
	private String status;

	private String vendorId;

	public String getVouNo() {
		return vouNo;
	}

	public void setVouNo(String vouNo) {
		this.vouNo = vouNo;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPurBillNo() {
		return purBillNo;
	}

	public void setPurBillNo(String purBillNo) {
		this.purBillNo = purBillNo;
	}

	public String getBillDate() {
		return billDate;
	}

	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}

	public String getBatchCode() {
		return batchCode;
	}

	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	public String getMrp() {
		return mrp;
	}

	public void setMrp(String mrp) {
		this.mrp = mrp;
	}

	public String getScheme() {
		return scheme;
	}

	public void setScheme(String scheme) {
		this.scheme = scheme;
	}

	public String getDisc() {
		return disc;
	}

	public void setDisc(String disc) {
		this.disc = disc;
	}

	public String getNetAmount() {
		return netAmount;
	}

	public void setNetAmount(String netAmount) {
		this.netAmount = netAmount;
	}

	public String getVat5() {
		return vat5;
	}

	public void setVat5(String vat5) {
		this.vat5 = vat5;
	}

	public String getVat12() {
		return vat12;
	}

	public void setVat12(String vat12) {
		this.vat12 = vat12;
	}

	public String getAmt5() {
		return amt5;
	}

	public void setAmt5(String amt5) {
		this.amt5 = amt5;
	}

	public String getAmt12() {
		return amt12;
	}

	public void setAmt12(String amt12) {
		this.amt12 = amt12;
	}

	public String getVouDate() {
		return vouDate;
	}

	public void setVouDate(String vouDate) {
		this.vouDate = vouDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

	@Override
	public boolean equals(Object object) {

		ReportVat reportVat = (ReportVat) object;

		if (reportVat.getType().equals("party"))
		{	
			if (reportVat.getVendorId().equals(vendorId)) {
				return true;
			} else {
				return false;
			}
		}
		else
		{
			if (reportVat.getBillDate().equals(billDate)) {
				return true;
			} else {
				return false;
			}
		}
	}

	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return super.hashCode();
	}

}
