package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;

public class BillHistoryDTO {

	int patId,depId,treatCount,unitId,userId;
	Date regDate;
	String patientName;	
	String centerPatientId;
	
	List<BillHistoryDTO> lstBillHistory;
	
	
	
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getPatId() {
		return patId;
	}
	public void setPatId(int patId) {
		this.patId = patId;
	}
	public int getDepId() {
		return depId;
	}
	public void setDepId(int depId) {
		this.depId = depId;
	}	
	public int getTreatCount() {
		return treatCount;
	}
	public void setTreatCount(int treatCount) {
		this.treatCount = treatCount;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	
	public String getCenterPatientId() {
		return centerPatientId;
	}
	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}
	public List<BillHistoryDTO> getLstBillHistory() {
		return lstBillHistory;
	}
	public void setLstBillHistory(List<BillHistoryDTO> lstBillHistory) {
		this.lstBillHistory = lstBillHistory;
	}	
	
}
