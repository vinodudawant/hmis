package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class SalaryComponant {
	private int idSalaryComponant;
	private int User_ID;
	private String ann_Sal;
	private String month;
	private String Year;
	private String date;
	private String gross_Sal;
	private String profTax;
	private String payable_Sal;

	private String totalDays;
	private String presentDays;
	private String absentDays;
	private String paidDays;
	private String unpaidDays;
	private String latemin;
	private String monSecDed;
	private String paySal;

	//suraj changes to add new column for salary masyter id
	private int salaryMasterId=0;
	
	public String getTotalDays() {
		return totalDays;
	}

	public void setTotalDays(String totalDays) {
		this.totalDays = totalDays;
	}

	public String getPresentDays() {
		return presentDays;
	}

	public void setPresentDays(String presentDays) {
		this.presentDays = presentDays;
	}

	public String getAbsentDays() {
		return absentDays;
	}

	public void setAbsentDays(String absentDays) {
		this.absentDays = absentDays;
	}

	public String getPaidDays() {
		return paidDays;
	}

	public void setPaidDays(String paidDays) {
		this.paidDays = paidDays;
	}

	public String getUnpaidDays() {
		return unpaidDays;
	}

	public void setUnpaidDays(String unpaidDays) {
		this.unpaidDays = unpaidDays;
	}

	public String getLatemin() {
		return latemin;
	}

	public void setLatemin(String latemin) {
		this.latemin = latemin;
	}

	public String getMonSecDed() {
		return monSecDed;
	}

	public void setMonSecDed(String monSecDed) {
		this.monSecDed = monSecDed;
	}

	public String getPaySal() {
		return paySal;
	}

	public void setPaySal(String paySal) {
		this.paySal = paySal;
	}

	private List<SalaryComponant> listSalaryComponant;

	@JsonGetter("idsc")
	public int getIdSalaryComponant() {
		return idSalaryComponant;
	}

	public void setIdSalaryComponant(int idSalaryComponant) {
		this.idSalaryComponant = idSalaryComponant;
	}
	@JsonGetter("uid")
	public int getUser_ID() {
		return User_ID;
	}

	public void setUser_ID(int user_ID) {
		User_ID = user_ID;
	}
	@JsonGetter("month")
	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}
	@JsonGetter("year")
	public String getYear() {
		return Year;
	}

	public void setYear(String year) {
		Year = year;
	}
	@JsonGetter("paySal")
	public String getPayable_Sal() {
		return payable_Sal;
	}

	public void setPayable_Sal(String payable_Sal) {
		this.payable_Sal = payable_Sal;
	}
	@JsonGetter("listSalaryComponanat")
	public List<SalaryComponant> getListSalaryComponant() {
		return listSalaryComponant;
	}

	public void setListSalaryComponant(List<SalaryComponant> listSalaryComponant) {
		this.listSalaryComponant = listSalaryComponant;
	}
	@JsonGetter("dt")
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("gs")
	public String getGross_Sal() {
		return gross_Sal;
	}

	public void setGross_Sal(String gross_Sal) {
		this.gross_Sal = gross_Sal;
	}
	@JsonGetter("pt")
	public String getProfTax() {
		return profTax;
	}

	public void setProfTax(String profTax) {
		this.profTax = profTax;
	}
	@JsonGetter("ans")
	public String getAnn_Sal() {
		return ann_Sal;
	}

	public void setAnn_Sal(String ann_Sal) {
		this.ann_Sal = ann_Sal;
	}

	@JsonGetter("salMasterId")
	public int getSalaryMasterId() {
		return salaryMasterId;
	}

	public void setSalaryMasterId(int salaryMasterId) {
		this.salaryMasterId = salaryMasterId;
	}
	 
}
