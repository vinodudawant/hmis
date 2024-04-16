package com.hms.pharmacy.pojo;

import java.util.ArrayList;
import java.util.List;

public class ReportCreditNoteDetails {
	private String batchId;
	private String mrp;
	private String purRate;
	private String patientName;
	private String vouNo;
	private String rate;
	private String amount;
	private String type;
	private String vendorId;
	private String vendorAddress;
	private String patientId;

	private String batchCode;
	private String stock;
	private String vendorName;
	private String productName;
	private String qty;
	private String receiptNo;
	private String date;
	
	private String credtiNoteId;
	private String credtiNoteInvoiceNo;
	private String amountBalance;
	private String amountReceive;
	private String billMode;
	private String billType;
	private String discount;
	private String patientType;
	private Double total;
	private String address;
	private String mobile;
	private String category_name;
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}
	public String getPatientType() {
		return patientType;
	}
	public void setPatientType(String patientType) {
		this.patientType = patientType;
	}
	public String getBillMode() {
		return billMode;
	}
	public void setBillMode(String billMode) {
		this.billMode = billMode;
	}
	public String getBillType() {
		return billType;
	}
	public void setBillType(String billType) {
		this.billType = billType;
	}
	public String getDiscount() {
		return discount;
	}
	public void setDiscount(String discount) {
		this.discount = discount;
	}
	public String getAmountBalance() {
		return amountBalance;
	}
	public void setAmountBalance(String amountBalance) {
		this.amountBalance = amountBalance;
	}
	public String getAmountReceive() {
		return amountReceive;
	}
	public void setAmountReceive(String amountReceive) {
		this.amountReceive = amountReceive;
	}
	
	public String getCredtiNoteInvoiceNo() {
		return credtiNoteInvoiceNo;
	}
	public void setCredtiNoteInvoiceNo(String credtiNoteInvoiceNo) {
		this.credtiNoteInvoiceNo = credtiNoteInvoiceNo;
	}
	private List<CreditNoteSlave> creditNoteSlaves=new ArrayList<CreditNoteSlave>();
	
	private List<PurchaseSlave> purchaseSlaves=new ArrayList<PurchaseSlave>();
	
	private List<DebitNoteSlave> debitNoteSlave=new ArrayList<DebitNoteSlave>();
	
	public List<DebitNoteSlave> getDebitNoteSlave() {
		return debitNoteSlave;
	}
	public void setDebitNoteSlave(List<DebitNoteSlave> debitNoteSlave) {
		this.debitNoteSlave = debitNoteSlave;
	}
	public List<PurchaseSlave> getPurchaseSlaves() {
		return purchaseSlaves;
	}
	public void setPurchaseSlaves(List<PurchaseSlave> purchaseSlaves) {
		this.purchaseSlaves = purchaseSlaves;
	}
	public String getBatchId() {
		return batchId;
	}
	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}
	public String getMrp() {
		return mrp;
	}
	public void setMrp(String mrp) {
		this.mrp = mrp;
	}
	public String getPurRate() {
		return purRate;
	}
	public void setPurRate(String purRate) {
		this.purRate = purRate;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getVouNo() {
		return vouNo;
	}
	public void setVouNo(String vouNo) {
		this.vouNo = vouNo;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getVendorId() {
		return vendorId;
	}
	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}
	public String getVendorAddress() {
		return vendorAddress;
	}
	public void setVendorAddress(String vendorAddress) {
		this.vendorAddress = vendorAddress;
	}
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getBatchCode() {
		return batchCode;
	}
	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}
	public String getStock() {
		return stock;
	}
	public void setStock(String stock) {
		this.stock = stock;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public String getReceiptNo() {
		return receiptNo;
	}
	public void setReceiptNo(String receiptNo) {
		this.receiptNo = receiptNo;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public List<CreditNoteSlave> getCreditNoteSlaves() {
		return creditNoteSlaves;
	}
	public void setCreditNoteSlaves(List<CreditNoteSlave> creditNoteSlaves) {
		this.creditNoteSlaves = creditNoteSlaves;
	}
	public String getCredtiNoteId() {
		return credtiNoteId;
	}
	public void setCredtiNoteId(String credtiNoteId) {
		this.credtiNoteId = credtiNoteId;
	}
}
