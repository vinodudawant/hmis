package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class CompanyAgreement {

	Integer companyAgreementId;
	String companyName;
	String agreementDate;
	String agreementRefNo;
	String effectiveFromDate;
	String effectiveToDate;
	String agreementDetails;
	Integer agreementType;
	String forHospitalStaff;
	String customerName;
	String defunct;

	List<CompanyAgreement> listCompanyAgreements;
	
	@JsonGetter("id")
	public Integer getCompanyAgreementId() {
		return companyAgreementId;
	}
	
	@JsonSetter("id")
	public void setCompanyAgreementId(Integer companyAgreementId) {
		this.companyAgreementId = companyAgreementId;
	}
	
	@JsonGetter("compNm")
	public String getCompanyName() {
		return companyName;
	}
	@JsonSetter("compNm")
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	
	@JsonGetter("aggDt")
	public String getAgreementDate() {
		return agreementDate;
	}
	@JsonSetter("aggDt")
	public void setAgreementDate(String agreementDate) {
		this.agreementDate = agreementDate;
	}
	
	@JsonGetter("aggRefNo")
	public String getAgreementRefNo() {
		return agreementRefNo;
	}
	@JsonSetter("aggRefNo")
	public void setAgreementRefNo(String agreementRefNo) {
		this.agreementRefNo = agreementRefNo;
	}
	
	@JsonGetter("effToDt")
	public String getEffectiveFromDate() {
		return effectiveFromDate;
	}
	@JsonSetter("effToDt")
	public void setEffectiveFromDate(String effectiveFromDate) {
		this.effectiveFromDate = effectiveFromDate;
	}
	
	@JsonGetter("effFroDt")
	public String getEffectiveToDate() {
		return effectiveToDate;
	}
	@JsonSetter("effFroDt")
	public void setEffectiveToDate(String effectiveToDate) {
		this.effectiveToDate = effectiveToDate;
	}
	
	@JsonGetter("aggDe")
	public String getAgreementDetails() {
		return agreementDetails;
	}
	@JsonSetter("aggDe")
	public void setAgreementDetails(String agreementDetails) {
		this.agreementDetails = agreementDetails;
	}
	
	@JsonGetter("aggTyp")
	public Integer getAgreementType() {
		return agreementType;
	}
	@JsonSetter("aggTyp")
	public void setAgreementType(Integer integer) {
		this.agreementType = integer;
	}
	
	@JsonGetter("hospSt")
	public String getForHospitalStaff() {
		return forHospitalStaff;
	}
	@JsonSetter("hospSt")
	public void setForHospitalStaff(String forHospitalStaff) {
		this.forHospitalStaff = forHospitalStaff;
	}
	
	@JsonGetter("custNm")
	public String getCustomerName() {
		return customerName;
	}
	@JsonSetter("custNm")
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	
	@JsonGetter("defunct")
	public String getDefunct() {
		return defunct;
	}
	@JsonSetter("defunct")
	public void setDefunct(String defunct) {
		this.defunct = defunct;
	}

	@JsonGetter("liCompAgg")
	public List<CompanyAgreement> getListCompanyAgreements() {
		return listCompanyAgreements;
	}
	@JsonSetter("liCompAgg")
	public void setListCompanyAgreements(
			List<CompanyAgreement> listCompanyAgreements) {
		this.listCompanyAgreements = listCompanyAgreements;
	}
	
	
}
