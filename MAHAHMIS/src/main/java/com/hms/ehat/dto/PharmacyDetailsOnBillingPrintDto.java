package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Immutable
public class PharmacyDetailsOnBillingPrintDto {
	
	
	@Transient
	private Integer InvoiceNo;	
	
	@Transient
	@Temporal(TemporalType.TIMESTAMP)
	private Date Date;
	
	
	@Transient
	private Double amount;
	
	@Transient
	private String SaleName;
	
	
	@Transient
	private List<PharmacyDetailsOnBillingPrintDto> listPharmacyDetailsOnBillingPrint;

	public Integer getInvoiceNo() {
		return InvoiceNo;
	}

	public void setInvoiceNo(Integer invoiceNo) {
		InvoiceNo = invoiceNo;
	}

	
	

	public Date getDate() {
		return Date;
	}

	public void setDate(Date date) {
		Date = date;
	}

	public List<PharmacyDetailsOnBillingPrintDto> getListPharmacyDetailsOnBillingPrint() {
		return listPharmacyDetailsOnBillingPrint;
	}

	public void setListPharmacyDetailsOnBillingPrint(
			List<PharmacyDetailsOnBillingPrintDto> listPharmacyDetailsOnBillingPrint) {
		this.listPharmacyDetailsOnBillingPrint = listPharmacyDetailsOnBillingPrint;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getSaleName() {
		return SaleName;
	}

	public void setSaleName(String saleName) {
		SaleName = saleName;
	}
	
	
	

}
