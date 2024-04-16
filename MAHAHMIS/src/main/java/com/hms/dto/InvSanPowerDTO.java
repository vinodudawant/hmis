package com.hms.dto;

import java.util.List;

public class InvSanPowerDTO {
	
	private Integer sanId;
	private String sanDate;
	private String sanEmpName;
	
	private Double empSanAmt;
	private Integer empId;
	 	
	private String sanSuppName;
	private Double suppSancnAmt;
	private Integer suppId;

	private Double newSanAmt;
	private String currentuserName;
	private String currentUserID;
	
	private String sancSeries;
	private List<InvSanPowerDTO> ltSanDto;
	
	public Integer getSanId() {
		return sanId;
	}
	public void setSanId(Integer sanId) {
		this.sanId = sanId;
	}
	public String getSanDate() {
		return sanDate;
	}
	public void setSanDate(String sanDate) {
		this.sanDate = sanDate;
	}
	public String getSanEmpName() {
		return sanEmpName;
	}
	public void setSanEmpName(String sanEmpName) {
		this.sanEmpName = sanEmpName;
	}
	public Double getEmpSanAmt() {
		return empSanAmt;
	}
	public void setEmpSanAmt(Double empSanAmt) {
		this.empSanAmt = empSanAmt;
	}
	public Integer getEmpId() {
		return empId;
	}
	public void setEmpId(Integer empId) {
		this.empId = empId;
	}
	public String getSanSuppName() {
		return sanSuppName;
	}
	public void setSanSuppName(String sanSuppName) {
		this.sanSuppName = sanSuppName;
	}
	public Double getSuppSancnAmt() {
		return suppSancnAmt;
	}
	public void setSuppSancnAmt(Double suppSancnAmt) {
		this.suppSancnAmt = suppSancnAmt;
	}
	public Integer getSuppId() {
		return suppId;
	}
	public void setSuppId(Integer suppId) {
		this.suppId = suppId;
	}
	public Double getNewSanAmt() {
		return newSanAmt;
	}
	public void setNewSanAmt(Double newSanAmt) {
		this.newSanAmt = newSanAmt;
	}
	public String getCurrentuserName() {
		return currentuserName;
	}
	public void setCurrentuserName(String currentuserName) {
		this.currentuserName = currentuserName;
	}
	public String getCurrentUserID() {
		return currentUserID;
	}
	public void setCurrentUserID(String currentUserID) {
		this.currentUserID = currentUserID;
	}
	public List<InvSanPowerDTO> getLtSanDto() {
		return ltSanDto;
	}
	public void setLtSanDto(List<InvSanPowerDTO> ltSanDto) {
		this.ltSanDto = ltSanDto;
	}
	public String getSancSeries() {
		return sancSeries;
	}
	public void setSancSeries(String sancSeries) {
		this.sancSeries = sancSeries;
	}
	
	 
	 

}
