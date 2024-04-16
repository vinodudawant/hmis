package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class EnquiryMaster {

	private int id;
	private String date;
	private String details;
	private String vendors;
	private List<EnquiryMaster> enquiry;
	private Enquiry enq;
	private Product product;
	private VendorDTO vendor;
	private List<Product> productList;
	
	@JsonGetter("productList")
	public List<Product> getProductList() {
		return productList;
	}
	@JsonSetter("productList")
	public void setProductList(List<Product> productList) {
		this.productList = productList;
	}
	@JsonGetter("vendorList")
	public List<VendorDTO> getVendorList() {
		return vendorList;
	}
	@JsonSetter("vendorList")
	public void setVendorList(List<VendorDTO> vendorList) {
		this.vendorList = vendorList;
	}
	private List<VendorDTO> vendorList;
	
	@JsonGetter("enq")
	public Enquiry getEnq() {
		return enq;
	}
	@JsonSetter("enq")
	public void setEnq(Enquiry enq) {
		this.enq = enq;
	}
	@JsonGetter("product")
	public Product getProduct() {
		return product;
	}
	@JsonSetter("product")
	public void setProduct(Product product) {
		this.product = product;
	}
	@JsonGetter("vendor")
	public VendorDTO getVendor() {
		return vendor;
	}
	@JsonSetter("vendor")
	public void setVendor(VendorDTO vendor) {
		this.vendor = vendor;
	}

	@JsonGetter("id")
	public int getId() {
		return id;
	}
	
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}
	
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	
	@JsonGetter("details")
	public String getDetails() {
		return details;
	}
	
	@JsonSetter("details")
	public void setDetails(String details) {
		this.details = details;
	}
	@JsonGetter("enquiry")
	public List<EnquiryMaster> getEnquiry() {
		return enquiry;
	}
	@JsonSetter("enquiry")
	public void setEnquiry(List<EnquiryMaster> enquiry) {
		this.enquiry = enquiry;
	}
	@JsonGetter("vendors")
	public String getVendors() {
		return vendors;
	}
	@JsonSetter("vendors")
	public void setVendors(String vendors) {
		this.vendors = vendors;
	}
		
}
