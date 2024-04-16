package com.hms.dto;

import java.util.Date;
import java.util.List;

public class ReportToMotivatorPropertiesDTO {
	private String date	=null ;
	private String patientName = null;
	private String part = null;
	private double discount = 0;
	private double reduction = 0;
	private double unpaidAmount = 0;
	private String recptNumber = null;
	private String year;
	private double paid;
	private List<ReportToMotivatorPropertiesDTO> listReportToMotivatorPropertiesDTO=null;
	
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getPart() {
		return part;
	}
	public void setPart(String part) {
		this.part = part;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public double getReduction() {
		return reduction;
	}
	public void setReduction(double reduction) {
		this.reduction = reduction;
	}
	public double getUnpaidAmount() {
		return unpaidAmount;
	}
	public void setUnpaidAmount(double unpaidAmount) {
		this.unpaidAmount = unpaidAmount;
	}
	public String getRecptNumber() {
		return recptNumber;
	}
	public void setRecptNumber(String recptNumber) {
		this.recptNumber = recptNumber;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public double getPaid() {
		return paid;
	}
	public void setPaid(double paid) {
		this.paid = paid;
	}
	public List<ReportToMotivatorPropertiesDTO> getListReportToMotivatorPropertiesDTO() {
		return listReportToMotivatorPropertiesDTO;
	}
	public void setListReportToMotivatorPropertiesDTO(
			List<ReportToMotivatorPropertiesDTO> listReportToMotivatorPropertiesDTO) {
		this.listReportToMotivatorPropertiesDTO = listReportToMotivatorPropertiesDTO;
	}

	
}
