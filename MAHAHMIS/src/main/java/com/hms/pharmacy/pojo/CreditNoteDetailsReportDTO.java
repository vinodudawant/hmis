package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * added by vishant pawar
 */
public class CreditNoteDetailsReportDTO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6911574625918647016L;

	private Timestamp Createddate;

	private Integer id;
	private String productName;

	private Integer quantity;

	private double billrate;

	private double patientSaleSlaveRecAmt;

	private String patientName;

	private Double netAmt;

	private String hsnCode;

	private Double totalVat0;

	private Double ratePerUnit;

	private Double totalVat5;

	private String pmode;

	private double discountAmt;

	private String discount;

	private String discountPer;

	private String hsnNo;

	private String creditNoteType;

	private Integer patientSaleId;

	private Integer counterSaleId;

	private Integer indentSaleId;

	public Integer getIndentSaleId() {
		return indentSaleId;
	}

	public void setIndentSaleId(Integer indentSaleId) {
		this.indentSaleId = indentSaleId;
	}

	public Integer getPatientSaleId() {
		return patientSaleId;
	}

	public void setPatientSaleId(Integer patientSaleId) {
		this.patientSaleId = patientSaleId;
	}

	public Integer getCounterSaleId() {
		return counterSaleId;
	}

	public void setCounterSaleId(Integer counterSaleId) {
		this.counterSaleId = counterSaleId;
	}

	public String getCreditNoteType() {
		return creditNoteType;
	}

	public void setCreditNoteType(String creditNoteType) {
		this.creditNoteType = creditNoteType;
	}

	public Timestamp getCreateddate() {
		return Createddate;
	}

	public void setCreateddate(Timestamp createddate) {
		Createddate = createddate;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public double getBillrate() {
		return billrate;
	}

	public void setBillrate(double billrate) {
		this.billrate = billrate;
	}

	public double getPatientSaleSlaveRecAmt() {
		return patientSaleSlaveRecAmt;
	}

	public void setPatientSaleSlaveRecAmt(double patientSaleSlaveRecAmt) {
		this.patientSaleSlaveRecAmt = patientSaleSlaveRecAmt;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public Double getNetAmt() {
		return netAmt;
	}

	public void setNetAmt(Double netAmt) {
		this.netAmt = netAmt;
	}

	public String getHsnCode() {
		return hsnCode;
	}

	public void setHsnCode(String hsnCode) {
		this.hsnCode = hsnCode;
	}

	public Double getTotalVat0() {
		return totalVat0;
	}

	public void setTotalVat0(Double totalVat0) {
		this.totalVat0 = totalVat0;
	}

	public Double getRatePerUnit() {
		return ratePerUnit;
	}

	public void setRatePerUnit(Double ratePerUnit) {
		this.ratePerUnit = ratePerUnit;
	}

	public Double getTotalVat5() {
		return totalVat5;
	}

	public void setTotalVat5(Double totalVat5) {
		this.totalVat5 = totalVat5;
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

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
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

}
