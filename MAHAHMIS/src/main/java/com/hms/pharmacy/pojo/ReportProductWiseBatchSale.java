package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

public class ReportProductWiseBatchSale implements Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 6911574625918647016L;
	
	
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
	private float totalAmt;
	private float totalAmtCounterSale;
	private float totalAmtHospitalSale;
	private float totalAmtIndentSale;
	private float totalAmtPatientSale;
	private String patientAddress;
	private Float totalGross;
	private Float totalLess;
	private Float totalNet;
	private Float finalVat;
	private Float finalNet;
	private Float finalGross;
	

	private String batchCode;
	private String batchExp;
	private String stock;
	private String vendorName;
	private String productName;
	private String qty;
	private String receiptNo;
	private String date;
	private String unit;
	private Float purQty;
	
	private String openingStockBatchCode;
	private String openingStock;
	private String openingStockproductName;
	private String openingStockqty;
	private String openingStockreceiptNo;
	private String openingStockdate;
	private String openingStockUnit;
	private Float openingPurQty;

	private String patientNameForCounter;
	private String productNameForCounter;
	private String qtyForCounter;
	private String receiptNoForCounter;
	private String dateForCounter;
	
	private String patientNameForPatient;
	private String productNameForPatient;
	private String qtyForPatient;
	private String receiptNoForPatient;
	private String dateForPatient;
	
	private String patientNameForIndent;
	private String productNameForIndent;
	private String qtyForIndent;
	private String receiptNoForIndent;
	private String dateForIndent;
	
	private String patientNameForCredit;
	private String productNameForCredit;
	private String qtyForCredit;
	private String receiptNoForCredit;
	private String dateForCredit;
	
	private String patientNameForDebit;
	private String productNameForDebit;
	private String qtyForDebit;
	private String receiptNoForDebit;
	private String dateForDebit;
	
	private Double totalNet5;
	private Double totalNet12;
	private Double totalNet0;
	
	private Double gross5;
	private Double gross12;
	private Double gross0;
	private Double grossAmt;
	private Double netAmt;
	
	private Double totalVat5;
	private Double totalVat12;
	private Double totalVat0;
	private Double totalAdd;
	
	private String transType;
	private String amtReceive;
	private String amtBalance;
	
	private String productNameForMrn;
	private String qtyForMrn;
	private String receiptNoForMrn;
	private String dateForMrn;
	private String stockMrn;
	private String batchCodeMrn;
	private String drugName;
	private String doctorName;
	
	private String patientNetAmt;
	private String patientAmtReceive;
	private String patientTax55;
	private String patientTax12;
	private String patientTax0;
	private String patientAmtBal;
	private String patientTransType;
	private String patientSaleTime;
	private String patientSaleDate;
	
	private String currentAmtBal;
	private String taxable55;
	private String taxable12;
	private String taxable0;
	
	private String totalPurchaseRate;
	private String indentStoreName;
	private String indentStatus;
	private String indentDate;
	private String indentComment;
	private String indentDeletedBy;
	private String indentDeletedDate;
	
	private double cdperc;
	private double cdamt;
	private String ipdopdno;
	private String patientState;
	private double gstmasteramt;
	private double patientSaleSlaveRecAmt;
	
	
	//Manisha
	private String finalBillAmt;
	
	//Akshata
	private Integer id;
	private double billrate;
	private Double ratePerUnit;
	
	private String hsnNo;
	private String hsnCode;
	private  String pmode;
	private double discount;
	private Timestamp Createddate;
	private Integer quantity;
	private Integer hsn_no;
	
	@Transient
	private String sponserName;
	
	@Transient
	private double qty1;

	
	public double getQty1() {
		return qty1;
	}
	public void setQty1(double qty1) {
		this.qty1 = qty1;
	}
	public String getSponserName() {
		return sponserName;
	}
	public void setSponserName(String sponserName) {
		this.sponserName = sponserName;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Timestamp getCreateddate() {
		return Createddate;
	}
	public void setCreateddate(Timestamp createddate) {
		Createddate = createddate;
	}
	public Double getRatePerUnit() {
		return ratePerUnit;
	}
	public void setRatePerUnit(Double ratePerUnit) {
		this.ratePerUnit = ratePerUnit;
	}
	public String getHsnCode() {
		return hsnCode;
	}
	public void setHsnCode(String hsnCode) {
		this.hsnCode = hsnCode;
	}
	public String getPmode() {
		return pmode;
	}
	public void setPmode(String pmode) {
		this.pmode = pmode;
	}
	public double getDiscountAmt() {
		return discountAmt;
	}
	public void setDiscountAmt(double discountAmt) {
		this.discountAmt = discountAmt;
	}
	public String getDiscountPer() {
		return discountPer;
	}
	public void setDiscountPer(String discountPer) {
		this.discountPer = discountPer;
	}
	public String getHsnNo() {
		return hsnNo;
	}
	public void setHsnNo(String hsnNo) {
		this.hsnNo = hsnNo;
	}
	public String getIndentDeletedDate() {
		return indentDeletedDate;
	}
	public void setIndentDeletedDate(String indentDeletedDate) {
		this.indentDeletedDate = indentDeletedDate;
	}
	public String getIndentDeletedTime() {
		return indentDeletedTime;
	}
	public void setIndentDeletedTime(String indentDeletedTime) {
		this.indentDeletedTime = indentDeletedTime;
	}

	private String indentDeletedTime;
	
	public String getIndentStoreName() {
		return indentStoreName;
	}
	public void setIndentStoreName(String indentStoreName) {
		this.indentStoreName = indentStoreName;
	}
	public String getIndentStatus() {
		return indentStatus;
	}
	public void setIndentStatus(String indentStatus) {
		this.indentStatus = indentStatus;
	}
	public String getIndentDate() {
		return indentDate;
	}
	public void setIndentDate(String indentDate) {
		this.indentDate = indentDate;
	}
	public String getIndentComment() {
		return indentComment;
	}
	public void setIndentComment(String indentComment) {
		this.indentComment = indentComment;
	}
	public String getIndentDeletedBy() {
		return indentDeletedBy;
	}
	public void setIndentDeletedBy(String indentDeletedBy) {
		this.indentDeletedBy = indentDeletedBy;
	}
	
	public String getTotalPurchaseRate() {
		return totalPurchaseRate;
	}
	public void setTotalPurchaseRate(String totalPurchaseRate) {
		this.totalPurchaseRate = totalPurchaseRate;
	}
	public String getTaxable55() {
		return taxable55;
	}
	public void setTaxable55(String taxable55) {
		this.taxable55 = taxable55;
	}
	public String getTaxable12() {
		return taxable12;
	}
	public void setTaxable12(String taxable12) {
		this.taxable12 = taxable12;
	}
	public String getTaxable0() {
		return taxable0;
	}
	public void setTaxable0(String taxable0) {
		this.taxable0 = taxable0;
	}
	
	public String getCurrentAmtBal() {
		return currentAmtBal;
	}
	public void setCurrentAmtBal(String currentAmtBal) {
		this.currentAmtBal = currentAmtBal;
	}
	public String getPatientSaleDate() {
		return patientSaleDate;
	}
	public void setPatientSaleDate(String patientSaleDate) {
		this.patientSaleDate = patientSaleDate;
	}
	public String getPatientSaleTime() {
		return patientSaleTime;
	}
	public void setPatientSaleTime(String patientSaleTime) {
		this.patientSaleTime = patientSaleTime;
	}
	public String getPatientTax55() {
		return patientTax55;
	}
	public void setPatientTax55(String patientTax55) {
		this.patientTax55 = patientTax55;
	}
	public String getPatientTax12() {
		return patientTax12;
	}
	public void setPatientTax12(String patientTax12) {
		this.patientTax12 = patientTax12;
	}
	public String getPatientTax0() {
		return patientTax0;
	}
	public void setPatientTax0(String patientTax0) {
		this.patientTax0 = patientTax0;
	}
	public String getPatientAmtBal() {
		return patientAmtBal;
	}
	public void setPatientAmtBal(String patientAmtBal) {
		this.patientAmtBal = patientAmtBal;
	}
	public String getPatientTransType() {
		return patientTransType;
	}
	public void setPatientTransType(String patientTransType) {
		this.patientTransType = patientTransType;
	}

	
	
	public String getPatientAmtReceive() {
		return patientAmtReceive;
	}
	public void setPatientAmtReceive(String patientAmtReceive) {
		this.patientAmtReceive = patientAmtReceive;
	}
	public String getPatientNetAmt() {
		return patientNetAmt;
	}
	public void setPatientNetAmt(String patientNetAmt) {
		this.patientNetAmt = patientNetAmt;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public String getDrugName() {
		return drugName;
	}
	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}
		
	public String getBatchExp() {
		return batchExp;
	}
	public void setBatchExp(String batchExp) {
		this.batchExp = batchExp;
	}

	public Float getOpeningPurQty() {
		return openingPurQty;
	}
	public void setOpeningPurQty(Float openingPurQty) {
		this.openingPurQty = openingPurQty;
	}
	
	public String getOpeningStockUnit() {
		return openingStockUnit;
	}
	public void setOpeningStockUnit(String openingStockUnit) {
		this.openingStockUnit = openingStockUnit;
	}
	
	public Float getPurQty() {
		return purQty;
	}
	public void setPurQty(Float purQty) {
		this.purQty = purQty;
	}
	
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	public String getBatchCodeMrn() {
		return batchCodeMrn;
	}
	public void setBatchCodeMrn(String batchCodeMrn) {
		this.batchCodeMrn = batchCodeMrn;
	}
	public String getStockMrn() {
		return stockMrn;
	}
	public void setStockMrn(String stockMrn) {
		this.stockMrn = stockMrn;
	}
	public String getProductNameForMrn() {
		return productNameForMrn;
	}
	public void setProductNameForMrn(String productNameForMrn) {
		this.productNameForMrn = productNameForMrn;
	}
	public String getQtyForMrn() {
		return qtyForMrn;
	}
	public void setQtyForMrn(String qtyForMrn) {
		this.qtyForMrn = qtyForMrn;
	}
	public String getReceiptNoForMrn() {
		return receiptNoForMrn;
	}
	public void setReceiptNoForMrn(String receiptNoForMrn) {
		this.receiptNoForMrn = receiptNoForMrn;
	}
	public String getDateForMrn() {
		return dateForMrn;
	}
	public void setDateForMrn(String dateForMrn) {
		this.dateForMrn = dateForMrn;
	}
	
	public String getOpeningStockBatchCode() {
		return openingStockBatchCode;
	}
	public void setOpeningStockBatchCode(String openingStockBatchCode) {
		this.openingStockBatchCode = openingStockBatchCode;
	}
	public String getOpeningStock() {
		return openingStock;
	}
	public void setOpeningStock(String openingStock) {
		this.openingStock = openingStock;
	}
	public String getOpeningStockproductName() {
		return openingStockproductName;
	}
	public void setOpeningStockproductName(String openingStockproductName) {
		this.openingStockproductName = openingStockproductName;
	}
	public String getOpeningStockqty() {
		return openingStockqty;
	}
	public void setOpeningStockqty(String openingStockqty) {
		this.openingStockqty = openingStockqty;
	}
	public String getOpeningStockreceiptNo() {
		return openingStockreceiptNo;
	}
	public void setOpeningStockreceiptNo(String openingStockreceiptNo) {
		this.openingStockreceiptNo = openingStockreceiptNo;
	}
	public String getOpeningStockdate() {
		return openingStockdate;
	}
	public void setOpeningStockdate(String openingStockdate) {
		this.openingStockdate = openingStockdate;
	}

	
	public String getAmtReceive() {
		return amtReceive;
	}
	public void setAmtReceive(String amtReceive) {
		this.amtReceive = amtReceive;
	}
	public String getAmtBalance() {
		return amtBalance;
	}
	public void setAmtBalance(String amtBalance) {
		this.amtBalance = amtBalance;
	}
	
	public String getTransType() {
		return transType;
	}
	public void setTransType(String transType) {
		this.transType = transType;
	}

	public Double getTotalAdd() {
		return totalAdd;
	}
	public void setTotalAdd(Double totalAdd) {
		this.totalAdd = totalAdd;
	}
	public Double getTotalVat5() {
		return totalVat5;
	}
	public void setTotalVat5(Double totalVat5) {
		this.totalVat5 = totalVat5;
	}
	public Double getTotalVat12() {
		return totalVat12;
	}
	public void setTotalVat12(Double totalVat12) {
		this.totalVat12 = totalVat12;
	}
	public Double getTotalVat0() {
		return totalVat0;
	}
	public void setTotalVat0(Double totalVat0) {
		this.totalVat0 = totalVat0;
	}

	
	public Double getGross5() {
		return gross5;
	}
	public void setGross5(Double gross5) {
		this.gross5 = gross5;
	}
	public Double getGross12() {
		return gross12;
	}
	public void setGross12(Double gross12) {
		this.gross12 = gross12;
	}
	public Double getGross0() {
		return gross0;
	}
	public void setGross0(Double gross0) {
		this.gross0 = gross0;
	}
	public Double getGrossAmt() {
		return grossAmt;
	}
	public void setGrossAmt(Double grossAmt) {
		this.grossAmt = grossAmt;
	}
	public Double getNetAmt() {
		return netAmt;
	}
	public void setNetAmt(Double netAmt) {
		this.netAmt = netAmt;
	}
	
	public Double getTotalNet5() {
		return totalNet5;
	}
	public void setTotalNet5(Double totalNet5) {
		this.totalNet5 = totalNet5;
	}
	public Double getTotalNet12() {
		return totalNet12;
	}
	public void setTotalNet12(Double totalNet12) {
		this.totalNet12 = totalNet12;
	}
	public Double getTotalNet0() {
		return totalNet0;
	}
	public void setTotalNet0(Double totalNet0) {
		this.totalNet0 = totalNet0;
	}
	
	public String getPatientNameForDebit() {
		return patientNameForDebit;
	}
	public void setPatientNameForDebit(String patientNameForDebit) {
		this.patientNameForDebit = patientNameForDebit;
	}
	public String getProductNameForDebit() {
		return productNameForDebit;
	}
	public void setProductNameForDebit(String productNameForDebit) {
		this.productNameForDebit = productNameForDebit;
	}
	public String getQtyForDebit() {
		return qtyForDebit;
	}
	public void setQtyForDebit(String qtyForDebit) {
		this.qtyForDebit = qtyForDebit;
	}
	public String getReceiptNoForDebit() {
		return receiptNoForDebit;
	}
	public void setReceiptNoForDebit(String receiptNoForDebit) {
		this.receiptNoForDebit = receiptNoForDebit;
	}
	public String getDateForDebit() {
		return dateForDebit;
	}
	public void setDateForDebit(String dateForDebit) {
		this.dateForDebit = dateForDebit;
	}

	public String getPatientNameForCredit() {
		return patientNameForCredit;
	}
	public void setPatientNameForCredit(String patientNameForCredit) {
		this.patientNameForCredit = patientNameForCredit;
	}
	public String getProductNameForCredit() {
		return productNameForCredit;
	}
	public void setProductNameForCredit(String productNameForCredit) {
		this.productNameForCredit = productNameForCredit;
	}
	public String getQtyForCredit() {
		return qtyForCredit;
	}
	public void setQtyForCredit(String qtyForCredit) {
		this.qtyForCredit = qtyForCredit;
	}
	public String getReceiptNoForCredit() {
		return receiptNoForCredit;
	}
	public void setReceiptNoForCredit(String receiptNoForCredit) {
		this.receiptNoForCredit = receiptNoForCredit;
	}
	public String getDateForCredit() {
		return dateForCredit;
	}
	public void setDateForCredit(String dateForCredit) {
		this.dateForCredit = dateForCredit;
	}
	
	public String getPatientNameForIndent() {
		return patientNameForIndent;
	}
	public void setPatientNameForIndent(String patientNameForIndent) {
		this.patientNameForIndent = patientNameForIndent;
	}
	public String getProductNameForIndent() {
		return productNameForIndent;
	}
	public void setProductNameForIndent(String productNameForIndent) {
		this.productNameForIndent = productNameForIndent;
	}
	public String getQtyForIndent() {
		return qtyForIndent;
	}
	public void setQtyForIndent(String qtyForIndent) {
		this.qtyForIndent = qtyForIndent;
	}
	public String getReceiptNoForIndent() {
		return receiptNoForIndent;
	}
	public void setReceiptNoForIndent(String receiptNoForIndent) {
		this.receiptNoForIndent = receiptNoForIndent;
	}
	public String getDateForIndent() {
		return dateForIndent;
	}
	public void setDateForIndent(String dateForIndent) {
		this.dateForIndent = dateForIndent;
	}
	
	public String getPatientNameForPatient() {
		return patientNameForPatient;
	}
	public void setPatientNameForPatient(String patientNameForPatient) {
		this.patientNameForPatient = patientNameForPatient;
	}
	public String getProductNameForPatient() {
		return productNameForPatient;
	}
	public void setProductNameForPatient(String productNameForPatient) {
		this.productNameForPatient = productNameForPatient;
	}
	public String getQtyForPatient() {
		return qtyForPatient;
	}
	public void setQtyForPatient(String qtyForPatient) {
		this.qtyForPatient = qtyForPatient;
	}
	public String getReceiptNoForPatient() {
		return receiptNoForPatient;
	}
	public void setReceiptNoForPatient(String receiptNoForPatient) {
		this.receiptNoForPatient = receiptNoForPatient;
	}
	public String getDateForPatient() {
		return dateForPatient;
	}
	public void setDateForPatient(String dateForPatient) {
		this.dateForPatient = dateForPatient;
	}

	public String getPatientNameForCounter() {
		return patientNameForCounter;
	}
	public void setPatientNameForCounter(String patientNameForCounter) {
		this.patientNameForCounter = patientNameForCounter;
	}
	public String getProductNameForCounter() {
		return productNameForCounter;
	}
	public void setProductNameForCounter(String productNameForCounter) {
		this.productNameForCounter = productNameForCounter;
	}
	public String getQtyForCounter() {
		return qtyForCounter;
	}
	public void setQtyForCounter(String qtyForCounter) {
		this.qtyForCounter = qtyForCounter;
	}
	public String getReceiptNoForCounter() {
		return receiptNoForCounter;
	}
	public void setReceiptNoForCounter(String receiptNoForCounter) {
		this.receiptNoForCounter = receiptNoForCounter;
	}
	public String getDateForCounter() {
		return dateForCounter;
	}
	public void setDateForCounter(String dateForCounter) {
		this.dateForCounter = dateForCounter;
	}

	
	
	public String getStock() {
		return stock;
	}
	public void setStock(String stock) {
		this.stock = stock;
	}
	
	public Float getFinalVat() {
		return finalVat;
	}
	public void setFinalVat(Float finalVat) {
		this.finalVat = finalVat;
	}
	public Float getFinalNet() {
		return finalNet;
	}
	public void setFinalNet(Float finalNet) {
		this.finalNet = finalNet;
	}
	public Float getFinalGross() {
		return finalGross;
	}
	public void setFinalGross(Float finalGross) {
		this.finalGross = finalGross;
	}
	
	public Float getTotalGross() {
		return totalGross;
	}
	public void setTotalGross(Float totalGross) {
		this.totalGross = totalGross;
	}
	public Float getTotalLess() {
		return totalLess;
	}
	public void setTotalLess(Float totalLess) {
		this.totalLess = totalLess;
	}
	
	public Float getTotalNet() {
		return totalNet;
	}
	public void setTotalNet(Float totalNet) {
		this.totalNet = totalNet;
	}
	
	public String getPatientAddress() {
		return patientAddress;
	}
	public void setPatientAddress(String patientAddress) {
		this.patientAddress = patientAddress;
	}
	public float getTotalAmtCounterSale() {
		return totalAmtCounterSale;
	}
	public void setTotalAmtCounterSale(float totalAmtCounterSale) {
		this.totalAmtCounterSale = totalAmtCounterSale;
	}
	public float getTotalAmtHospitalSale() {
		return totalAmtHospitalSale;
	}
	public void setTotalAmtHospitalSale(float totalAmtHospitalSale) {
		this.totalAmtHospitalSale = totalAmtHospitalSale;
	}
	public float getTotalAmtIndentSale() {
		return totalAmtIndentSale;
	}
	public void setTotalAmtIndentSale(float totalAmtIndentSale) {
		this.totalAmtIndentSale = totalAmtIndentSale;
	}
	public float getTotalAmtPatientSale() {
		return totalAmtPatientSale;
	}
	public void setTotalAmtPatientSale(float totalAmtPatientSale) {
		this.totalAmtPatientSale = totalAmtPatientSale;
	}

	
	public float getTotalAmt() {
		return totalAmt;
	}
	public void setTotalAmt(float totalAmt) {
		this.totalAmt = totalAmt;
	}
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getReceiptNo() {
		return receiptNo;
	}
	public void setReceiptNo(String receiptNo) {
		this.receiptNo = receiptNo;
	}

	public String getBatchId() {
		return batchId;
	}
	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}
	public String getBatchCode() {
		return batchCode;
	}
	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
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
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
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
	
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}

	@Override
	public boolean equals(Object obj) {
		ReportProductWiseBatchSale sale=(ReportProductWiseBatchSale)obj;
		if(vendorId.equals(sale.vendorId))
			return true;
		else
			return false;
	}
	
	@Override
	public int hashCode() {
		return Integer.parseInt(vendorId);
	}
	
	private double discountAmt;
	private String discountPer;
	
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public double getCdperc() {
		return cdperc;
	}
	public void setCdperc(double cdperc) {
		this.cdperc = cdperc;
	}
	public double getCdamt() {
		return cdamt;
	}
	public void setCdamt(double cdamt) {
		this.cdamt = cdamt;
	}
	
	List<ReportProductWiseBatchSale> listsale;
	List<TaxMaster> lsttaxmaster;

	public List<ReportProductWiseBatchSale> getListsale() {
		return listsale;
	}
	public void setListsale(List<ReportProductWiseBatchSale> listsale) {
		this.listsale = listsale;
	}
	public List<TaxMaster> getLsttaxmaster() {
		return lsttaxmaster;
	}
	public void setLsttaxmaster(List<TaxMaster> lsttaxmaster) {
		this.lsttaxmaster = lsttaxmaster;
	}
	public String getIpdopdno() {
		return ipdopdno;
	}
	public void setIpdopdno(String ipdopdno) {
		this.ipdopdno = ipdopdno;
	}
	public String getPatientState() {
		return patientState;
	}
	public void setPatientState(String patientState) {
		this.patientState = patientState;
	}
	public double getGstmasteramt() {
		return gstmasteramt;
	}
	public void setGstmasteramt(double gstmasteramt) {
		this.gstmasteramt = gstmasteramt;
	}
	
	private List<GstDto> ltgst ;

	public List<GstDto> getLtgst() {
		return ltgst;
	}
	public void setLtgst(List<GstDto> ltgst) {
		this.ltgst = ltgst;
	}
	public double getPatientSaleSlaveRecAmt() {
		return patientSaleSlaveRecAmt;
	}
	public void setPatientSaleSlaveRecAmt(double patientSaleSlaveRecAmt) {
		this.patientSaleSlaveRecAmt = patientSaleSlaveRecAmt;
	}
	
	public String getfinalBillAmt() {
		return finalBillAmt;
	}
	public void setfinalBillAmt(String finalBillAmt) {
		this.finalBillAmt = finalBillAmt;
	}
//	public String getFinalBillAmt() {
//		return finalBillAmt;
//	}
//	public void setFinalBillAmt(String finalBillAmt) {
//		this.finalBillAmt = finalBillAmt;
//	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public double getBillrate() {
		return billrate;
	}
	public void setBillrate(double billrate) {
		this.billrate = billrate;
	}
	public Integer getHsn_no() {
		return hsn_no;
	}
	public void setHsn_no(Integer hsn_no) {
		this.hsn_no = hsn_no;
	}
	
	
	
	
	
	
}


