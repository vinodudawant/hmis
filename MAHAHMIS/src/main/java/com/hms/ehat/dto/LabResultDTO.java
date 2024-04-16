package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;

public class LabResultDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private String visitCode;
	private int orderID;
	private Date visitDate;
	private String fullName;
	private String serviceName;
	private String sampleStatus;
	private String statusDescription;
	private String itemName;
	private String result;
	private String normalLow;
	private String normalHigh;
	private String normalRange;
	private String printUnit;
	private String visitType;
	
	public LabResultDTO() {
		super();
	}

	public LabResultDTO(String visitCode,int orderID, Date visitDate, String fullName,
			String serviceName, String sampleStatus, String statusDescription,
			String itemName, String result, String normalLow,
			String normalHigh, String normalRange, String printUnit,
			String visitType) {
		super();
		this.visitCode = visitCode;
		this.orderID = orderID;
		this.visitDate = visitDate;
		this.fullName = fullName;
		this.serviceName = serviceName;
		this.sampleStatus = sampleStatus;
		this.statusDescription = statusDescription;
		this.itemName = itemName;
		this.result = result;
		this.normalLow = normalLow;
		this.normalHigh = normalHigh;
		this.normalRange = normalRange;
		this.printUnit = printUnit;
		this.visitType = visitType;
	}

	public String getVisitCode() {
		return visitCode;
	}

	public void setVisitCode(String visitCode) {
		this.visitCode = visitCode;
	}

	public int getOrderID() {
		return orderID;
	}

	public void setOrderID(int orderID) {
		this.orderID = orderID;
	}

	public Date getVisitDate() {
		return visitDate;
	}

	public void setVisitDate(Date visitDate) {
		this.visitDate = visitDate;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getSampleStatus() {
		return sampleStatus;
	}

	public void setSampleStatus(String sampleStatus) {
		this.sampleStatus = sampleStatus;
	}

	public String getStatusDescription() {
		return statusDescription;
	}

	public void setStatusDescription(String statusDescription) {
		this.statusDescription = statusDescription;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getNormalLow() {
		return normalLow;
	}

	public void setNormalLow(String normalLow) {
		this.normalLow = normalLow;
	}

	public String getNormalHigh() {
		return normalHigh;
	}

	public void setNormalHigh(String normalHigh) {
		this.normalHigh = normalHigh;
	}

	public String getNormalRange() {
		return normalRange;
	}

	public void setNormalRange(String normalRange) {
		this.normalRange = normalRange;
	}

	public String getPrintUnit() {
		return printUnit;
	}

	public void setPrintUnit(String printUnit) {
		this.printUnit = printUnit;
	}

	public String getVisitType() {
		return visitType;
	}

	public void setVisitType(String visitType) {
		this.visitType = visitType;
	}
	
	
	
	
	

}
