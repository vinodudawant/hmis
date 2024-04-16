package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class SponsoredDetailsDTO {
	
	private int sposoredID;
	private String sponsoredName;
	private String comapanyname;
	private String policyName;
	private String policyno;
	private String cnnno;
	private String validfrom;
	private String validto;
	private String preauth;
	private int companyID;
	private int policyID;
	
	public String getPreauth() {
		return preauth;
	}

	public void setPreauth(String preauth) {
		this.preauth = preauth;
	}

	private String date;
	public String getPolicyno() {
		return policyno;
	}

	public void setPolicyno(String policyno) {
		this.policyno = policyno;
	}
	public String getComapanyname() {
		return comapanyname;
	}

	public void setComapanyname(String comapanyname) {
		this.comapanyname = comapanyname;
	}
	public String getPolicyName() {
		return policyName;
	}

	public void setPolicyName(String policyName) {
		this.policyName = policyName;
	}

	public String getCnnno() {
		return cnnno;
	}

	public void setCnnno(String cnnno) {
		this.cnnno = cnnno;
	}

	public String getValidfrom() {
		return validfrom;
	}

	public void setValidfrom(String validfrom) {
		this.validfrom = validfrom;
	}

	public String getValidto() {
		return validto;
	}

	public void setValidto(String validto) {
		this.validto = validto;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	private List<SponsoredDetailsDTO> sponsoredDetailsDTOList;
	private List<SponsoredDetailsDTO> CompanyDetailsDTOList;
	private List<SponsoredDetailsDTO> PolicyDetailsDTOList;
	
	@JsonGetter("sponsoredDetailsDTOList")
	public List<SponsoredDetailsDTO> getSponsoredDetailsDTOList() {
		return sponsoredDetailsDTOList;
	}

	@JsonSetter("sponsoredDetailsDTOList")
	public void setSponsoredDetailsDTOList(
			List<SponsoredDetailsDTO> sponsoredDetailsDTOList) {
		this.sponsoredDetailsDTOList = sponsoredDetailsDTOList;
	}
	
	@JsonGetter("CompanyDetailsDTOList")
	public List<SponsoredDetailsDTO> getCompanyDetailsDTOList() {
		return CompanyDetailsDTOList;
	}

	@JsonSetter("CompanyDetailsDTOList")
	public void setCompanyDetailsDTOList(
			List<SponsoredDetailsDTO> CompanyDetailsDTOList) {
		this.CompanyDetailsDTOList = CompanyDetailsDTOList;
	}
	
	@JsonGetter("PolicyDetailsDTOList")
	public List<SponsoredDetailsDTO> getPolicyDetailsDTOList() {
		return PolicyDetailsDTOList;
	}

	@JsonSetter("PolicyDetailsDTOList")
	public void setPolicyDetailsDTOList(
			List<SponsoredDetailsDTO> PolicyDetailsDTOList) {
		this.PolicyDetailsDTOList = PolicyDetailsDTOList;
	}

	@JsonGetter("sposoredID")
	public int getSposoredID() {
		return sposoredID;
	}
	
	@JsonSetter("sposoredID")
	public void setSposoredID(int sposoredID) {
		this.sposoredID = sposoredID;
	}
	
	@JsonGetter("sponsoredName")
	public String getSponsoredName() {
		return sponsoredName;
	}
	
	@JsonSetter("sponsoredName")
	public void setSponsoredName(String sponsoredName) {
		this.sponsoredName = sponsoredName;
	}
	
	
	@JsonGetter("companyID")
	public int getCompanyID() {
		return companyID;
	}
	
	@JsonSetter("companyID")
	public void setCompanyID(int CompanyID) {
		this.companyID = CompanyID;
	}
	
	@JsonGetter("policyID")
	public int getPolicyID() {
		return policyID;
	}
	
	@JsonSetter("policyID")
	public void setPolicyID(int PolicyID) {
		this.policyID = PolicyID;
	}

}
