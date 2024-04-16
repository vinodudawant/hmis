package com.hms.pharmacy.pojo;

import java.io.Serializable;


public class GstDto implements Serializable {

	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;

	private Integer taxId;

	private String taxName;

	private double taxRate;

	private double gstper;
	private double igstper;
	private double cess;
	private double igstamt;
	
	private double gstamt;

	private double totalamt;
	private double discountamt;
	
	private double taxableamt;
	
	private double discountper;
	
	public Integer getTaxId() {
		return taxId;
	}

	public void setTaxId(Integer taxId) {
		this.taxId = taxId;
	}

	public String getTaxName() {
		return taxName;
	}

	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}

	public double getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(double taxRate) {
		this.taxRate = taxRate;
	}

	public double getGstper() {
		return gstper;
	}

	public void setGstper(double gstper) {
		this.gstper = gstper;
	}

	public double getIgstper() {
		return igstper;
	}

	public void setIgstper(double igstper) {
		this.igstper = igstper;
	}

	public double getCess() {
		return cess;
	}

	public void setCess(double cess) {
		this.cess = cess;
	}

	public double getIgstamt() {
		return igstamt;
	}

	public void setIgstamt(double igstamt) {
		this.igstamt = igstamt;
	}

	public double getGstamt() {
		return gstamt;
	}

	public void setGstamt(double gstamt) {
		this.gstamt = gstamt;
	}

	public double getTotalamt() {
		return totalamt;
	}

	public void setTotalamt(double totalamt) {
		this.totalamt = totalamt;
	}

	public double getDiscountamt() {
		return discountamt;
	}

	public void setDiscountamt(double discountamt) {
		this.discountamt = discountamt;
	}

	public double getTaxableamt() {
		return taxableamt;
	}

	public void setTaxableamt(double taxableamt) {
		this.taxableamt = taxableamt;
	}

	public double getDiscountper() {
		return discountper;
	}

	public void setDiscountper(double discountper) {
		this.discountper = discountper;
	}


}
