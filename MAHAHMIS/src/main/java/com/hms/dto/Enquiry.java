package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Enquiry {
	private int id;
	private List<Enquiry> enquiry;
	private double quantity;
	
	@JsonGetter("id")
	public int getId() {
		return id;
	}
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}
	@JsonGetter("enquiry")
	public List<Enquiry> getEnquiry() {
		return enquiry;
	}
	@JsonSetter("enquiry")
	public void setEnquiry(List<Enquiry> enquiry) {
		this.enquiry = enquiry;
	}
	@JsonGetter("quantity")
	public double getQuantity() {
		return quantity;
	}
	@JsonSetter("quantity")
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	
}
