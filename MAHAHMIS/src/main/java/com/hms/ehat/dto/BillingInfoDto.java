package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.Immutable;

@XmlRootElement
@Entity 
@Immutable
@Table(name = "ehat_billing_info_api")
public class BillingInfoDto implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;

	@Column(name = "patient_id")
	private Integer patientId;
		
	@Column(name = "charges_slave_id")
	private Integer chargesSlaveId;
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Column(name = "adminssion_date")
	private String adminssionDateTime;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "pat_address")
	private String address;
		
	@Column(name = "sponsor_name")
	private String sponsorName;
	
	@Column(name = "invoice_no")
	private Integer invoiceNo;
	
	@Column(name = "invoice_date")
	private String invoiceDate;
	
	@Transient
	@Column(name = "pan_no")
	private String panNo;
	
	@Transient
	@Column(name = "tax_reg_no")
	private String taxRegNo;
	
	@Column(name = "total_bill")
	private Double totalBill;
	
	@Column(name = "total_patient_paid")
	private Double totalPatientPaid;
	
	@Transient
	@Column(name = "total_sponsor_paid")
	private Double totalSponsorPaid;
	
	@Column(name = "total_discount")
	private Double totalDiscount;
	
	@Transient
	@Column(name = "service_tax")
	private Double serviceTax;
	
	@Column(name = "total_payable")
	private Double totalPayable;
		
	@Transient
	@Column(name = "patient_sign")
	private String patientSign;
	
	@Column(name = "hospital_name")
	private String autheriseSign;
		
	@Transient
	private List<BillingInfoDto> listBillingInfo;
	
	@Transient
	private List<BillComponentDto> listBillingComponentInfo;

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}	

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public String getAdminssionDateTime() {
		return adminssionDateTime;
	}

	public void setAdminssionDateTime(String adminssionDateTime) {
		this.adminssionDateTime = adminssionDateTime;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getSponsorName() {
		return sponsorName;
	}

	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}

	public Integer getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(Integer invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public String getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public String getPanNo() {
		return panNo;
	}

	public void setPanNo(String panNo) {
		this.panNo = panNo;
	}

	public String getTaxRegNo() {
		return taxRegNo;
	}

	public void setTaxRegNo(String taxRegNo) {
		this.taxRegNo = taxRegNo;
	}

	public Double getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(Double totalBill) {
		this.totalBill = totalBill;
	}

	public Double getTotalPatientPaid() {
		return totalPatientPaid;
	}

	public void setTotalPatientPaid(Double totalPatientPaid) {
		this.totalPatientPaid = totalPatientPaid;
	}

	public Double getTotalSponsorPaid() {
		return totalSponsorPaid;
	}

	public void setTotalSponsorPaid(Double totalSponsorPaid) {
		this.totalSponsorPaid = totalSponsorPaid;
	}

	public Double getTotalDiscount() {
		return totalDiscount;
	}

	public void setTotalDiscount(Double totalDiscount) {
		this.totalDiscount = totalDiscount;
	}

	public Double getServiceTax() {
		return serviceTax;
	}

	public void setServiceTax(Double serviceTax) {
		this.serviceTax = serviceTax;
	}

	public Double getTotalPayable() {
		return totalPayable;
	}

	public void setTotalPayable(Double totalPayable) {
		this.totalPayable = totalPayable;
	}

	public String getPatientSign() {
		return patientSign;
	}

	public void setPatientSign(String patientSign) {
		this.patientSign = patientSign;
	}

	public String getAutheriseSign() {
		return autheriseSign;
	}

	public void setAutheriseSign(String autheriseSign) {
		this.autheriseSign = autheriseSign;
	}

	public List<BillingInfoDto> getListBillingInfo() {
		return listBillingInfo;
	}

	public void setListBillingInfo(List<BillingInfoDto> listBillingInfo) {
		this.listBillingInfo = listBillingInfo;
	}

	public List<BillComponentDto> getListBillingComponentInfo() {
		return listBillingComponentInfo;
	}

	public void setListBillingComponentInfo(
			List<BillComponentDto> listBillingComponentInfo) {
		this.listBillingComponentInfo = listBillingComponentInfo;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
