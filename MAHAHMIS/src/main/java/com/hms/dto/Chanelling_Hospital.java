package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Chanelling_Hospital {

	private int id;
	private String hosName;
	private String contactNo;
	private String address;
	private String website;
	private String email;
	
	private List<Chanelling_Hospital> chann_hosList;
	
	@JsonGetter("id")
	public int getId() {
		return id;
	}
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}
	@JsonGetter("hosName")
	public String getHosName() {
		return hosName;
	}
	@JsonSetter("hosName")
	public void setHosName(String hosName) {
		this.hosName = hosName;
	}
	@JsonGetter("contactNo")
	public String getContactNo() {
		return contactNo;
	}
	@JsonSetter("contactNo")
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	@JsonGetter("address")
	public String getAddress() {
		return address;
	}
	@JsonSetter("address")
	public void setAddress(String address) {
		this.address = address;
	}
	@JsonGetter("website")
	public String getWebsite() {
		return website;
	}
	@JsonSetter("website")
	public void setWebsite(String website) {
		this.website = website;
	}
	@JsonGetter("email")
	public String getEmail() {
		return email;
	}
	@JsonSetter("email")
	public void setEmail(String email) {
		this.email = email;
	}
	@JsonGetter("chann_hosList")
	public List<Chanelling_Hospital> getChann_hosList() {
		return chann_hosList;
	}
	@JsonSetter("chann_hosList")
	public void setChann_hosList(List<Chanelling_Hospital> chann_hosList) {
		this.chann_hosList = chann_hosList;
	}
	
}
