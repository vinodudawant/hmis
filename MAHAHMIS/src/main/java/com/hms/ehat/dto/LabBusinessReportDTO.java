package com.hms.ehat.dto;

import java.util.Date;

public class LabBusinessReportDTO {

	
	private Integer billId;
	private Integer patientId;
	private String testName;
	private String patientName;
	private String testHeadingName;
	private String organizationName;
	private String RefDoctorName;
	private Date receiptCreatedDatetime;
	private String centerPatientId;
	
	private String patientType;
	private String paymentType;
	
	private String grossAmt;
	private String discountAmt;
	private String concessionAmt;
	private String netAmt;
	private String paidAmt;
	private String duesAmt;
	private String remark;
	private String additionalAmt;
	
	private Date createdDateTime;
	private String INOUTLAB;
	
	private String serviceId;
	private String subServiceId;
	
	
	
	
	
	public String getServiceId() {
		return serviceId;
	}
	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}
	public String getSubServiceId() {
		return subServiceId;
	}
	public void setSubServiceId(String subServiceId) {
		this.subServiceId = subServiceId;
	}
	public String getINOUTLAB() {
		return INOUTLAB;
	}
	public void setINOUTLAB(String iNOUTLAB) {
		INOUTLAB = iNOUTLAB;
	}
	private String treatmentId;
	
	public String getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	public Integer getBillId() {
		return billId;
	}
	public void setBillId(Integer billId) {
		this.billId = billId;
	}
	public Integer getPatientId() {
		return patientId;
	}
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getTestHeadingName() {
		return testHeadingName;
	}
	public void setTestHeadingName(String testHeadingName) {
		this.testHeadingName = testHeadingName;
	}
	public String getOrganizationName() {
		return organizationName;
	}
	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}
	public String getRefDoctorName() {
		return RefDoctorName;
	}
	public void setRefDoctorName(String refDoctorName) {
		RefDoctorName = refDoctorName;
	}
	public Date getReceiptCreatedDatetime() {
		return receiptCreatedDatetime;
	}
	public void setReceiptCreatedDatetime(Date receiptCreatedDatetime) {
		this.receiptCreatedDatetime = receiptCreatedDatetime;
	}
	public String getCenterPatientId() {
		return centerPatientId;
	}
	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}
	public String getPatientType() {
		return patientType;
	}
	public void setPatientType(String patientType) {
		this.patientType = patientType;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public String getGrossAmt() {
		return grossAmt;
	}
	public void setGrossAmt(String grossAmt) {
		this.grossAmt = grossAmt;
	}
	public String getDiscountAmt() {
		return discountAmt;
	}
	public void setDiscountAmt(String discountAmt) {
		this.discountAmt = discountAmt;
	}
	public String getConcessionAmt() {
		return concessionAmt;
	}
	public void setConcessionAmt(String concessionAmt) {
		this.concessionAmt = concessionAmt;
	}
	public String getNetAmt() {
		return netAmt;
	}
	public void setNetAmt(String netAmt) {
		this.netAmt = netAmt;
	}
	public String getPaidAmt() {
		return paidAmt;
	}
	public void setPaidAmt(String paidAmt) {
		this.paidAmt = paidAmt;
	}
	public String getDuesAmt() {
		return duesAmt;
	}
	public void setDuesAmt(String duesAmt) {
		this.duesAmt = duesAmt;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getAdditionalAmt() {
		return additionalAmt;
	}
	public void setAdditionalAmt(String additionalAmt) {
		this.additionalAmt = additionalAmt;
	}
	
	
	
	
	
	
	
	
}
