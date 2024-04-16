package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class POrderMaster {
	private int id;
	private int vendorId;
	private String vendorName;
	private String date;
	private String quotation_date;
	private String narration;
	private String quotationNo;
	private List<POrderMaster> POMaster;
	private List<Product> productList;
	private int enqId;
	
	@JsonGetter("productList")
	public List<Product> getProductList() {
		return productList;
	}
	@JsonSetter("productList")
	public void setProductList(List<Product> productList) {
		this.productList = productList;
	}
	@JsonGetter("id")
	public int getId() {
		return id;
	}
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}
	@JsonGetter("vendorId")
	public int getVendorId() {
		return vendorId;
	}
	@JsonSetter("vendorId")
	public void setVendorId(int vendorId) {
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
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("quotation_date")
	public String getQuotation_date() {
		return quotation_date;
	}
	@JsonSetter("quotation_date")
	public void setQuotation_date(String quotation_date) {
		this.quotation_date = quotation_date;
	}
	@JsonGetter("narration")
	public String getNarration() {
		return narration;
	}
	@JsonSetter("narration")
	public void setNarration(String narration) {
		this.narration = narration;
	}
	@JsonGetter("quotationNo")
	public String getQuotationNo() {
		return quotationNo;
	}
	@JsonSetter("quotationNo")
	public void setQuotationNo(String quotationNo) {
		this.quotationNo = quotationNo;
	}
	@JsonGetter("pOMaster")
	public List<POrderMaster> getPOMaster() {
		return POMaster;
	}
	@JsonSetter("pOMaster")
	public void setPOMaster(List<POrderMaster> pOMaster) {
		POMaster = pOMaster;
	}
	@JsonSetter("enqId")
	public int getEnqId() {
		return enqId;
	}
	@JsonSetter("enqId")
	public void setEnqId(int enqId) {
		this.enqId = enqId;
	}
	
	
}
