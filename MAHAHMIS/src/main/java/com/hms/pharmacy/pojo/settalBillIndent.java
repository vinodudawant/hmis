package com.hms.pharmacy.pojo;

public class settalBillIndent {
	private String amountBal;
	private String amountReceive;
	private Double totalAmountReceive;
	private String discount;
	private String narration;
	private String finalAmt;
	private String treatmentId;
	private String historyId;

	private Integer patientId;
	private String patientName;
	private String mobile;

	private Double settleAmountReceive;
	private Integer treatment;
	private String date;
	private String billId;
	private String totalBill;

	// time field by suraj
	private String time;

	public String getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(String totalBill) {
		this.totalBill = totalBill;
	}

	public String getBillId() {
		return billId;
	}

	public void setBillId(String billId) {
		this.billId = billId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Double getSettleAmountReceive() {
		return settleAmountReceive;
	}

	public void setSettleAmountReceive(Double settleAmountReceive) {
		this.settleAmountReceive = settleAmountReceive;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public Double getTotalAmountReceive() {
		return totalAmountReceive;
	}

	public void setTotalAmountReceive(Double totalAmountReceive) {
		this.totalAmountReceive = totalAmountReceive;
	}

	public Integer getTreatment() {
		return treatment;
	}

	public void setTreatment(Integer treatment) {
		this.treatment = treatment;
	}

	public String getHistoryId() {
		return historyId;
	}

	public void setHistoryId(String historyId) {
		this.historyId = historyId;
	}

	public String getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getAmountBal() {
		return amountBal;
	}

	public void setAmountBal(String amountBal) {
		this.amountBal = amountBal;
	}

	public String getAmountReceive() {
		return amountReceive;
	}

	public void setAmountReceive(String amountReceive) {
		this.amountReceive = amountReceive;
	}

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public String getFinalAmt() {
		return finalAmt;
	}

	public void setFinalAmt(String finalAmt) {
		this.finalAmt = finalAmt;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}
}
