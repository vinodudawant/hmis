package com.hms.ehat.dto;

import java.util.Date;

public class TotalCollectionDetails {
	
	private Date billDate;
	private Integer patientId;
	private String opdIpdno;
	private String patientName;
	private Integer serviceId;
	private String serviceName;
	private Integer subServiceId;
	private String subServiceName;
	private String doctorName;
    private double rate=0;
	private double quantity=1;
	private double concession=0;
	private double amount=0;
	private double pay=0;
	private Integer departmentId;
	private String departmentName;
	private Integer sponsorId;
	private String sponsorName;
	private String age;
	private String gender;
	private Date serviceDate;
	private String ReceiptNo;
	private double refundAmount;
	private double discount;
	private String narrationid_bill;
	private String updated_by;
	
	
	public String getNarrationid_bill() {
		return narrationid_bill;
	}
	public void setNarrationid_bill(String narrationid_bill) {
		this.narrationid_bill = narrationid_bill;
	}
	public String getUpdated_by() {
		return updated_by;
	}
	public void setUpdated_by(String updated_by) {
		this.updated_by = updated_by;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public double getRefundAmount() {
		return refundAmount;
	}
	public void setRefundAmount(double refundAmount) {
		this.refundAmount = refundAmount;
	}
	public Date getBillDate() {
		return billDate;
	}
	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}
	public Integer getPatientId() {
		return patientId;
	}
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	public String getOpdIpdno() {
		return opdIpdno;
	}
	public void setOpdIpdno(String opdIpdno) {
		this.opdIpdno = opdIpdno;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public Integer getServiceId() {
		return serviceId;
	}
	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public Integer getSubServiceId() {
		return subServiceId;
	}
	public void setSubServiceId(Integer subServiceId) {
		this.subServiceId = subServiceId;
	}
	public String getSubServiceName() {
		return subServiceName;
	}
	public void setSubServiceName(String subServiceName) {
		this.subServiceName = subServiceName;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public double getRate() {
		return rate;
	}
	public void setRate(double rate) {
		this.rate = rate;
	}
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public double getConcession() {
		return concession;
	}
	public void setConcession(double concession) {
		this.concession = concession;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public double getPay() {
		return pay;
	}
	public void setPay(double pay) {
		this.pay = pay;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public Integer getSponsorId() {
		return sponsorId;
	}
	public void setSponsorId(Integer sponsorId) {
		this.sponsorId = sponsorId;
	}
	public String getSponsorName() {
		return sponsorName;
	}
	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Date getServiceDate() {
		return serviceDate;
	}
	public void setServiceDate(Date serviceDate) {
		this.serviceDate = serviceDate;
	}
	public String getReceiptNo() {
		return ReceiptNo;
	}
	public void setReceiptNo(String receiptNo) {
		ReceiptNo = receiptNo;
	}

}
