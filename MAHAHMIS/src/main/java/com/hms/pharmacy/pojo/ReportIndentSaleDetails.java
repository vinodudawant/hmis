package com.hms.pharmacy.pojo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Transient;

public class ReportIndentSaleDetails 
{
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
	public String getSaleAmountReceive() {
		return saleAmountReceive;
	}

	public void setSaleAmountReceive(String saleAmountReceive) {
		this.saleAmountReceive = saleAmountReceive;
	}

	private String stock;
	private String vendorName;
	private String productName;
	private String qty;
	private String receiptNo;
	private String date;
	
	private String indentSaleId;
	private String IndentSaleInvoiceNo;
	private String patientType;
	private String amountReceive;
	private String billMode;
	private Double total;
	private String creditNotePayable;
	private String creditNoteNetAmt;
	private String netAmount;
	private String discount;
	private String amountBalance;
	private String saleAmountReceive; 
	
	private String saleAmountBal; 
	
	public String getSaleAmountBal() {
		return saleAmountBal;
	}

	public void setSaleAmountBal(String saleAmountBal) {
		this.saleAmountBal = saleAmountBal;
	}

	public String getAmountBalance() {
		return amountBalance;
	}

	public void setAmountBalance(String amountBalance) {
		this.amountBalance = amountBalance;
	}

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public String getNetAmount() {
		return netAmount;
	}

	public void setNetAmount(String netAmount) {
		this.netAmount = netAmount;
	}

	private String patientSaleInvoiceNo;
	
	public String getPatientSaleInvoiceNo() {
		return patientSaleInvoiceNo;
	}

	public void setPatientSaleInvoiceNo(String patientSaleInvoiceNo) {
		this.patientSaleInvoiceNo = patientSaleInvoiceNo;
	}

	@Transient
	private String patientSaleId; 
	
	@Transient
	private String creditNoteId; 
	
	@Transient
	private String indentDate; 
	
	public String getIndentDate() {
		return indentDate;
	}

	public void setIndentDate(String indentDate) {
		this.indentDate = indentDate;
	}

	public String getCreditNoteId() {
		return creditNoteId;
	}

	public void setCreditNoteId(String creditNoteId) {
		this.creditNoteId = creditNoteId;
	}

	public String getPatientSaleId() {
		return patientSaleId;
	}

	public void setPatientSaleId(String patientSaleId) {
		this.patientSaleId = patientSaleId;
	}

	
	
	public String getCreditNoteNetAmt() {
		return creditNoteNetAmt;
	}
	public void setCreditNoteNetAmt(String creditNoteNetAmt) {
		this.creditNoteNetAmt = creditNoteNetAmt;
	}
	public String getCreditNotePayable() {
		return creditNotePayable;
	}
	public void setCreditNotePayable(String creditNotePayable) {
		this.creditNotePayable = creditNotePayable;
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
	public String getAmountReceive() {
		return amountReceive;
	}
	public void setAmountReceive(String amountReceive) {
		this.amountReceive = amountReceive;
	}
	public String getBillMode() {
		return billMode;
	}
	public void setBillMode(String billMode) {
		this.billMode = billMode;
	}
	
	private List<PatientSaleBillSlave> patientSlaves=new ArrayList<PatientSaleBillSlave>();
	
	public List<PatientSaleBillSlave> getPatientSlaves() {
		return patientSlaves;
	}
	public void setPatientSlaves(List<PatientSaleBillSlave> patientSlaves) {
		this.patientSlaves = patientSlaves;
	}
	
	
	public List<IndentSaleSlave> getIndentSaleSlaves() {
		return indentSaleSlaves;
	}

	public void setIndentSaleSlaves(List<IndentSaleSlave> indentSaleSlaves) {
		this.indentSaleSlaves = indentSaleSlaves;
	}

	private List<IndentSaleSlave> indentSaleSlaves=new ArrayList<IndentSaleSlave>();
	
	

	private String batchId;
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

	public String getIndentSaleId() {
		return indentSaleId;
	}

	public void setIndentSaleId(String indentSaleId) {
		this.indentSaleId = indentSaleId;
	}

	public String getIndentSaleInvoiceNo() {
		return IndentSaleInvoiceNo;
	}

	public void setIndentSaleInvoiceNo(String indentSaleInvoiceNo) {
		IndentSaleInvoiceNo = indentSaleInvoiceNo;
	}
}
