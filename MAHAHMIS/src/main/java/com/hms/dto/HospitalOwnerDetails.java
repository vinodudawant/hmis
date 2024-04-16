package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class HospitalOwnerDetails {

	private int idhospitalOwner;
	private String title;
	private String name;
	private String address;
	private String email;
	private String contact;
	private String dob;
	private String age;
	private Float opdPerc;
	private Float ipdPerc;
	private String status;;

	private List<HospitalOwnerDetails> listHospitalOwnerDetails;

	@JsonGetter("ownerId")
	public int getIdhospitalOwner() {
		return idhospitalOwner;
	}

	public void setIdhospitalOwner(int idhospitalOwner) {
		this.idhospitalOwner = idhospitalOwner;
	}

	@JsonGetter("title")
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@JsonGetter("name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonGetter("add")
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@JsonGetter("email")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonGetter("contact")
	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	@JsonGetter("dob")
	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	@JsonGetter("age")
	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	@JsonGetter("opdPerc")
	public Float getOpdPerc() {
		return opdPerc;
	}

	public void setOpdPerc(Float opdPerc) {
		this.opdPerc = opdPerc;
	}

	@JsonGetter("ipdPerc")
	public Float getIpdPerc() {
		return ipdPerc;
	}

	public void setIpdPerc(Float float1) {
		this.ipdPerc = float1;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("liOwnerDetail")
	public List<HospitalOwnerDetails> getListHospitalOwnerDetails() {
		return listHospitalOwnerDetails;
	}

	public void setListHospitalOwnerDetails(
			List<HospitalOwnerDetails> listHospitalOwnerDetails) {
		this.listHospitalOwnerDetails = listHospitalOwnerDetails;
	}

}
