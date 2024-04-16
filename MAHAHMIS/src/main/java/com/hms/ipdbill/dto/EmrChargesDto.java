package com.hms.ipdbill.dto;

public class EmrChargesDto {

	String callFrom;
	boolean isEmrTime;
	double emrPer;
	public String getCallFrom() {
		return callFrom;
	}
	public void setCallFrom(String callFrom) {
		this.callFrom = callFrom;
	}
	public boolean getIsEmrTime() {
		return isEmrTime;
	}
	public void setIsEmrTime(boolean isEmrTime) {
		this.isEmrTime = isEmrTime;
	}
	public double getEmrPer() {
		return emrPer;
	}
	public void setEmrPer(double emrPer) {
		this.emrPer = emrPer;
	}
	
	
}
