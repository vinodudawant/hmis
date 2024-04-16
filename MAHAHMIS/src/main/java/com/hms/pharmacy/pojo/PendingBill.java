package com.hms.pharmacy.pojo;

public class PendingBill {
	private String purchaseId;
	private String venodrId;
	private String billNo;
	private String billDate;
	private String vouNo;
	private String vouDate;
	private String type;
	private String netAmount;
	private String amountBal;
	private String vendorName;
	private String purStatus=null;
	private String diff;
	public String getDiff() {
		return diff;
	}

	public void setDiff(String diff) {
		this.diff = diff;
	}

	public String getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}

	public String getVenodrId() {
		return venodrId;
	}

	public void setVenodrId(String venodrId) {
		this.venodrId = venodrId;
	}

	public String getBillNo() {
		return billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	public String getBillDate() {
		return billDate;
	}

	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}

	public String getVouNo() {
		return vouNo;
	}

	public void setVouNo(String vouNo) {
		this.vouNo = vouNo;
	}

	public String getVouDate() {
		return vouDate;
	}

	public void setVouDate(String vouDate) {
		this.vouDate = vouDate;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getNetAmount() {
		return netAmount;
	}

	public void setNetAmount(String netAmount) {
		this.netAmount = netAmount;
	}

	public String getAmountBal() {
		return amountBal;
	}

	public void setAmountBal(String amountBal) {
		this.amountBal = amountBal;
	}

	@Override
	public boolean equals(Object obj) {
		PendingBill bill = (PendingBill) obj;
		if (bill.getPurchaseId() .equals(purchaseId))
			return true;
		else
			return false;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getPurStatus() {
		return purStatus;
	}

	public void setPurStatus(String purStatus) {
		this.purStatus = purStatus;
	}
}
