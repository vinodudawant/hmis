package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;



public class HospitalDetailsDTO {
	private int hosId;
	private String Hos_name;
	private String contact_no;
	private String website_add;
	private String email_id;
	private String address;
	private List<HospitalDetailsDTO> HospitalDetailsDTOList;
	
	@JsonGetter("hosId")
	public int getHosId() {
		return hosId;
	}
	@JsonSetter("hosId")
	public void setHosId(int hosId) {
		this.hosId = hosId;
	}
	@JsonGetter("hos_name")
	public String getHos_name() {
		return Hos_name;
	}
	@JsonSetter("hos_name")
	public void setHos_name(String hos_name) {
		Hos_name = hos_name;
	}
	@JsonGetter("contact_no")
	public String getContact_no() {
		return contact_no;
	}
	@JsonSetter("contact_no")
	public void setContact_no(String contact_no) {
		this.contact_no = contact_no;
	}
	@JsonGetter("website_add")
	public String getWebsite_add() {
		return website_add;
	}
	@JsonSetter("website_add")
	public void setWebsite_add(String website_add) {
		this.website_add = website_add;
	}
	@JsonGetter("email_id")
	public String getEmail_id() {
		return email_id;
	}
	@JsonSetter("email_id")
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}
	@JsonGetter("address")
	public String getAddress() {
		return address;
	}
	@JsonSetter("address")
	public void setAddress(String address) {
		this.address = address;
	}
	@JsonGetter("hospitalDetailsDTOList")
	public List<HospitalDetailsDTO> getHospitalDetailsDTOList() {
		return HospitalDetailsDTOList;
	}
	@JsonSetter("hospitalDetailsDTOList")
	public void setHospitalDetailsDTOList(
			List<HospitalDetailsDTO> hospitalDetailsDTOList) {
		HospitalDetailsDTOList = hospitalDetailsDTOList;
	}

}
