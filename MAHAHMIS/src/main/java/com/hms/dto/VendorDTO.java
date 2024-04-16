package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class VendorDTO {

	private Integer vendorId;
	private String vendorName;
	private String vendorAddrLine1;
	private String vendorAddrLine2;
	private String vendorArea;
	private String vendorCity;
	private String vendorState;
	private String vendorCountry;
	private Integer vendorPin;
	private String vendorTelephone;
	private String vendorMobile;
	private String vendorContactName;
	private int noOfProduct;
	private String status;
	private List<VendorDTO> ltVendorDTOs;

	@JsonGetter("vendorId")
	public Integer getVendorId() {
		return vendorId;
	}

	@JsonSetter("vendorId")
	public void setVendorId(Integer vendorId) {
		this.vendorId = vendorId;
	}

	@JsonGetter("vendorName")
	public String getVendorName() {
		return vendorName;
	}

	@JsonSetter("vendorName")
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	@JsonGetter("vendorAddrLine1")
	public String getVendorAddrLine1() {
		return vendorAddrLine1;
	}

	@JsonSetter("vendorAddrLine1")
	public void setVendorAddrLine1(String vendorAddrLine1) {
		this.vendorAddrLine1 = vendorAddrLine1;
	}

	@JsonGetter("vendorAddrLine2")
	public String getVendorAddrLine2() {
		return vendorAddrLine2;
	}

	@JsonSetter("vendorAddrLine2")
	public void setVendorAddrLine2(String vendorAddrLine2) {
		this.vendorAddrLine2 = vendorAddrLine2;
	}

	@JsonGetter("vendorArea")
	public String getVendorArea() {
		return vendorArea;
	}

	@JsonSetter("vendorArea")
	public void setVendorArea(String vendorArea) {
		this.vendorArea = vendorArea;
	}

	@JsonGetter("vendorCity")
	public String getVendorCity() {
		return vendorCity;
	}

	@JsonSetter("vendorCity")
	public void setVendorCity(String vendorCity) {
		this.vendorCity = vendorCity;
	}

	@JsonGetter("vendorState")
	public String getVendorState() {
		return vendorState;
	}

	@JsonSetter("vendorState")
	public void setVendorState(String vendorState) {
		this.vendorState = vendorState;
	}

	@JsonGetter("vendorCountry")
	public String getVendorCountry() {
		return vendorCountry;
	}

	@JsonSetter("vendorCountry")
	public void setVendorCountry(String vendorCountry) {
		this.vendorCountry = vendorCountry;
	}

	@JsonGetter("vendorPin")
	public Integer getVendorPin() {
		return vendorPin;
	}

	@JsonSetter("vendorPin")
	public void setVendorPin(Integer vendorPin) {
		this.vendorPin = vendorPin;
	}

	@JsonGetter("vendorTelephone")
	public String getVendorTelephone() {
		return vendorTelephone;
	}

	@JsonSetter("vendorTelephone")
	public void setVendorTelephone(String vendorTelephone) {
		this.vendorTelephone = vendorTelephone;
	}

	@JsonGetter("vendorMobile")
	public String getVendorMobile() {
		return vendorMobile;
	}

	@JsonSetter("vendorMobile")
	public void setVendorMobile(String vendorMobile) {
		this.vendorMobile = vendorMobile;
	}

	@JsonGetter("vendorContactName")
	public String getVendorContactName() {
		return vendorContactName;
	}

	@JsonSetter("vendorContactName")
	public void setVendorContactName(String vendorContactName) {
		this.vendorContactName = vendorContactName;
	}

	@JsonGetter("status")
	public String getStatus() {
		return status;
	}

	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("ltVendorDTOs")
	public List<VendorDTO> getLtVendorDTOs() {
		return ltVendorDTOs;
	}

	@JsonSetter("ltVendorDTOs")
	public void setLtVendorDTOs(List<VendorDTO> ltVendorDTOs) {
		this.ltVendorDTOs = ltVendorDTOs;
	}

	@JsonGetter("noOfProduct")
	public int getNoOfProduct() {
		return noOfProduct;
	}

	@JsonSetter("noOfProduct")
	public void setNoOfProduct(int noOfProduct) {
		this.noOfProduct = noOfProduct;
	}

}
