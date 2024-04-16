package com.hms.pharmacy.pojo;



import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

import javax.persistence.Table;

@Entity
@Table(name="pharma_vendor_address")
public class VendorAddress {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="vAddrId")
	private int vendorAddressId=0;
	
	@Column(name = "vendor_gstn")
	private String gstNo;
	
	@Column(name = "vendor_city")
	private String city;

	@Column(name = "vendor_district")
	private String district;

	@Column(name = "vendor_state")
	private String state;

	@Column(name = "vendor_pincode")
	private String pincode;
	
	@Column(name = "vendor_address")
	private String vendorAddress;
	
	@Column(name = "vendor_area")
	private String vendorArea;
	
	@Column(name = "vendor_landline")
	private String vendorLandline;

	@Column(name = "vendor_mobile_num")
	private String vendorMobileNumber;
	
	@Column(name = "vendor_email_Id")
	private String vendorEmailId;
	
	@Column(name="stateId")
	private int stateId=0;
	
	@Column(name="vendorId",insertable=false,updatable=false)
	private int vendorId=0;
	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getGstNo() {
		return gstNo;
	}

	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}

	public int getVendorAddressId() {
		return vendorAddressId;
	}

	public void setVendorAddressId(int vendorAddressId) {
		this.vendorAddressId = vendorAddressId;
	}

	public String getVendorAddress() {
		return vendorAddress;
	}

	public void setVendorAddress(String vendorAddress) {
		this.vendorAddress = vendorAddress;
	}

	public String getVendorArea() {
		return vendorArea;
	}

	public void setVendorArea(String vendorArea) {
		this.vendorArea = vendorArea;
	}

	public String getVendorLandline() {
		return vendorLandline;
	}

	public void setVendorLandline(String vendorLandline) {
		this.vendorLandline = vendorLandline;
	}

	public String getVendorMobileNumber() {
		return vendorMobileNumber;
	}

	public void setVendorMobileNumber(String vendorMobileNumber) {
		this.vendorMobileNumber = vendorMobileNumber;
	}

	public String getVendorEmailId() {
		return vendorEmailId;
	}

	public void setVendorEmailId(String vendorEmailId) {
		this.vendorEmailId = vendorEmailId;
	}


	public int getStateId() {
		return stateId;
	}

	public void setStateId(int stateId) {
		this.stateId = stateId;
	}

	@Override
	public String toString() {
		return "VendorAddress [vendorAddressId=" + vendorAddressId + ", gstNo="
				+ gstNo + ", city=" + city + ", district=" + district
				+ ", state=" + state + ", pincode=" + pincode
				+ ", vendorAddress=" + vendorAddress + ", vendorArea="
				+ vendorArea + ", vendorLandline=" + vendorLandline
				+ ", vendorMobileNumber=" + vendorMobileNumber
				+ ", vendorEmailId=" + vendorEmailId + ", stateId=" + stateId
				+ "]";
	}

	@Transient
	private List<VendorAddress> lstvendadd;

	public List<VendorAddress> getLstvendadd() {
		return lstvendadd;
	}

	public void setLstvendadd(List<VendorAddress> lstvendadd) {
		this.lstvendadd = lstvendadd;
	}
	
	
	
	
}
