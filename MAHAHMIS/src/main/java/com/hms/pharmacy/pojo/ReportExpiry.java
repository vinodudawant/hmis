package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Transient;

public class ReportExpiry {

	private String batchId;
	private Integer bat_id;
	private Integer current_stock;
	private String batchCode;
	private String batchExpiry;
	private String productName;
	private String stock;
	private String companyId;
	private String productCompany;
	private String batch_exp_date_timestamp;
	
	@Transient
	private String patient_bill_date;
	@Transient
	private Integer patient_slave_product_id;
	@Transient
	private Integer patient_sale_slave_issue_qty;
	
	
	
	public String getPatient_bill_date() {
		return patient_bill_date;
	}
	public void setPatient_bill_date(String patient_bill_date) {
		this.patient_bill_date = patient_bill_date;
	}
	public Integer getPatient_slave_product_id() {
		return patient_slave_product_id;
	}
	public void setPatient_slave_product_id(Integer patient_slave_product_id) {
		this.patient_slave_product_id = patient_slave_product_id;
	}
	public Integer getPatient_sale_slave_issue_qty() {
		return patient_sale_slave_issue_qty;
	}
	public void setPatient_sale_slave_issue_qty(Integer patient_sale_slave_issue_qty) {
		this.patient_sale_slave_issue_qty = patient_sale_slave_issue_qty;
	}
	@Transient
	List<ReportExpiry> lstReportEpiry;
	
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
	public String getBatchExpiry() {
		return batchExpiry;
	}
	public void setBatchExpiry(String batchExpiry) {
		this.batchExpiry = batchExpiry;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getStock() {
		return stock;
	}
	public void setStock(String stock) {
		this.stock = stock;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getProductCompany() {
		return productCompany;
	}
	public void setProductCompany(String productCompany) {
		this.productCompany = productCompany;
	}
	public String getBatch_exp_date_timestamp() {
		return batch_exp_date_timestamp;
	}
	public void setBatch_exp_date_timestamp(String batch_exp_date_timestamp) {
		this.batch_exp_date_timestamp = batch_exp_date_timestamp;
	}
	
	public Integer getBat_id() {
		return bat_id;
	}
	public void setBat_id(Integer bat_id) {
		this.bat_id = bat_id;
	}
	
	public Integer getCurrent_stock() {
		return current_stock;
	}
	public void setCurrent_stock(Integer current_stock) {
		this.current_stock = current_stock;
	}
	
	
	public List<ReportExpiry> getLstReportEpiry() {
		return lstReportEpiry;
	}
	public void setLstReportEpiry(List<ReportExpiry> lstReportEpiry) {
		this.lstReportEpiry = lstReportEpiry;
	}
	@Override
	public String toString() {
		return "ReportExpiry [batchId=" + batchId + ", bat_id=" + bat_id + ", current_stock=" + current_stock
				+ ", batchCode=" + batchCode + ", batchExpiry=" + batchExpiry + ", productName=" + productName
				+ ", stock=" + stock + ", companyId=" + companyId + ", productCompany=" + productCompany
				+ ", batch_exp_date_timestamp=" + batch_exp_date_timestamp + "]";
	}
	
	
	
}
