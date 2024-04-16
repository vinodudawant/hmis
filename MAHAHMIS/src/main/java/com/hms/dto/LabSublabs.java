

package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class LabSublabs implements Serializable {

	private int idlabmaster;

	private int ownlabid;

	private String name;

	private String incharge;

	private String degree;

	private String address;

	private String localityArea;

	private String city;

	private String pincode;

	private String phoneno;

	private String mobileno;

	private String email;

	private String dob;

	private String splinfo;

	private String status;

	private List<LabSublabs> listSubLab;

	@JsonGetter("sublli")
	public List<LabSublabs> getListSubLab() {
		return listSubLab;
	}

	public void setListSubLab(List<LabSublabs> listSubLab) {
		this.listSubLab = listSubLab;
	}

	@JsonGetter("sublid")
	public int getIdlabmaster() {
		return idlabmaster;
	}

	public void setIdlabmaster(int idlabmaster) {
		this.idlabmaster = idlabmaster;
	}

	@JsonGetter("olid")
	public int getOwnlabid() {
		return ownlabid;
	}

	public void setOwnlabid(int ownlabid) {
		this.ownlabid = ownlabid;
	}

	@JsonGetter("nm")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonGetter("inch")
	public String getIncharge() {
		return incharge;
	}

	public void setIncharge(String incharge) {
		this.incharge = incharge;
	}

	@JsonGetter("deg")
	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	@JsonGetter("add")
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@JsonGetter("area")
	public String getLocalityArea() {
		return localityArea;
	}

	public void setLocalityArea(String localityArea) {
		this.localityArea = localityArea;
	}

	@JsonGetter("city")
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	@JsonGetter("pin")
	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	@JsonGetter("ph")
	public String getPhoneno() {
		return phoneno;
	}

	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}

	@JsonGetter("mob")
	public String getMobileno() {
		return mobileno;
	}

	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}

	@JsonGetter("eml")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonGetter("dob")
	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	@JsonGetter("splinf")
	public String getSplinfo() {
		return splinfo;
	}

	public void setSplinfo(String splinfo) {
		this.splinfo = splinfo;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
