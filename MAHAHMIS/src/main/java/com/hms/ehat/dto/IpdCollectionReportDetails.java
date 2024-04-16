package com.hms.ehat.dto;

import java.util.Date;

public class IpdCollectionReportDetails {
	
	private Integer billId;
	private Integer receiptId;
	private String receiptBy;
	private Date doa;
	private Integer pid;
	private String patientName;
	private String sponsorName;
	private String consultingDoctor;
	private String refDoc;
	private String speciality;
	private String address;
	private String city;
	private String taluka;
	private String district;
	private Date receiptDate;
	private String paymentType;
	private double paidAmt;
	private String paymode;
	private String cardNumber;
	private String bankName;
	private String remark;
	private String reference;
	private String deleted;
	private String unitName;
	private Date deletedDateTime;
	private String deletedBy;
	private String deletedRemark;
    private String department;
    private Integer invoiceCount;
	public Integer getBillId() {
		return billId;
	}
	public void setBillId(Integer billId) {
		this.billId = billId;
	}
	public Integer getReceiptId() {
		return receiptId;
	}
	public void setReceiptId(Integer receiptId) {
		this.receiptId = receiptId;
	}
	public String getReceiptBy() {
		return receiptBy;
	}
	public void setReceiptBy(String receiptBy) {
		this.receiptBy = receiptBy;
	}
	public Date getDoa() {
		return doa;
	}
	public void setDoa(Date doa) {
		this.doa = doa;
	}
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getSponsorName() {
		return sponsorName;
	}
	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}
	public String getConsultingDoctor() {
		return consultingDoctor;
	}
	public void setConsultingDoctor(String consultingDoctor) {
		this.consultingDoctor = consultingDoctor;
	}
	public String getRefDoc() {
		return refDoc;
	}
	public void setRefDoc(String refDoc) {
		this.refDoc = refDoc;
	}
	public String getSpeciality() {
		return speciality;
	}
	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getTaluka() {
		return taluka;
	}
	public void setTaluka(String taluka) {
		this.taluka = taluka;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public Date getReceiptDate() {
		return receiptDate;
	}
	public void setReceiptDate(Date receiptDate) {
		this.receiptDate = receiptDate;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public double getPaidAmt() {
		return paidAmt;
	}
	public void setPaidAmt(double paidAmt) {
		this.paidAmt = paidAmt;
	}
	public String getPaymode() {
		return paymode;
	}
	public void setPaymode(String paymode) {
		this.paymode = paymode;
	}
	public String getCardNumber() {
		return cardNumber;
	}
	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getReference() {
		return reference;
	}
	public void setReference(String reference) {
		this.reference = reference;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public Date getDeletedDateTime() {
		return deletedDateTime;
	}
	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}
	public String getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(String deletedBy) {
		this.deletedBy = deletedBy;
	}
	public String getDeletedRemark() {
		return deletedRemark;
	}
	public void setDeletedRemark(String deletedRemark) {
		this.deletedRemark = deletedRemark;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public Integer getInvoiceCount() {
		return invoiceCount;
	}
	public void setInvoiceCount(Integer invoiceCount) {
		this.invoiceCount = invoiceCount;
	}
	
	
	@Override
	public String toString() {
		return "IpdCollectionReportDetails [billId=" + billId + ", receiptId=" + receiptId + ", receiptBy=" + receiptBy
				+ ", doa=" + doa + ", pid=" + pid + ", patientName=" + patientName + ", sponsorName=" + sponsorName
				+ ", consultingDoctor=" + consultingDoctor + ", refDoc=" + refDoc + ", speciality=" + speciality
				+ ", address=" + address + ", city=" + city + ", taluka=" + taluka + ", district=" + district
				+ ", receiptDate=" + receiptDate + ", paymentType=" + paymentType + ", paidAmt=" + paidAmt
				+ ", paymode=" + paymode + ", cardNumber=" + cardNumber + ", bankName=" + bankName + ", remark="
				+ remark + ", reference=" + reference + ", deleted=" + deleted + ", unitName=" + unitName
				+ ", deletedDateTime=" + deletedDateTime + ", deletedBy=" + deletedBy + ", deletedRemark="
				+ deletedRemark + ", department=" + department + ", invoiceCount=" + invoiceCount + "]";
	}
    

}
