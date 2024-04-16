package com.hms.ipdbill.dto;

import java.util.Date;
import java.util.List;

public class BulkSettledDetailsDto {

	int patientId;
	String centerPatientId;
	int billId;
	int bulkMasterId;
	Date billDate;
	String patientname;
	String bankName;
	Date bulkCreatedDate;
	double totalConsn;
	double totalTds;
	double totalPaid;
	String bNumber;
	String chequeNo;
    double totalpaidReceipt;
    String companyName;
    double billTotal;
    double billPaid;
    double remainAmt;
    double amount;
    double tdsAmt;
    double concession;
    double paidAmt;
    Integer createdBy;
    
    
    
    public Integer getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}
	List<BulkSettledDetailsDto> lstBulkSettledDetailsDto;
    
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public String getCenterPatientId() {
		return centerPatientId;
	}
	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}
	public int getBillId() {
		return billId;
	}
	public void setBillId(int billId) {
		this.billId = billId;
	}
	public int getBulkMasterId() {
		return bulkMasterId;
	}
	public void setBulkMasterId(int bulkMasterId) {
		this.bulkMasterId = bulkMasterId;
	}
	public Date getBillDate() {
		return billDate;
	}
	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}
	public String getPatientname() {
		return patientname;
	}
	public void setPatientname(String patientname) {
		this.patientname = patientname;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public Date getBulkCreatedDate() {
		return bulkCreatedDate;
	}
	public void setBulkCreatedDate(Date bulkCreatedDate) {
		this.bulkCreatedDate = bulkCreatedDate;
	}
	public double getTotalConsn() {
		return totalConsn;
	}
	public void setTotalConsn(double totalConsn) {
		this.totalConsn = totalConsn;
	}
	public double getTotalTds() {
		return totalTds;
	}
	public void setTotalTds(double totalTds) {
		this.totalTds = totalTds;
	}
	public double getTotalPaid() {
		return totalPaid;
	}
	public void setTotalPaid(double totalPaid) {
		this.totalPaid = totalPaid;
	}
	public String getbNumber() {
		return bNumber;
	}
	public void setbNumber(String bNumber) {
		this.bNumber = bNumber;
	}
	public String getChequeNo() {
		return chequeNo;
	}
	public void setChequeNo(String chequeNo) {
		this.chequeNo = chequeNo;
	}
	public double getTotalpaidReceipt() {
		return totalpaidReceipt;
	}
	public void setTotalpaidReceipt(double totalpaidReceipt) {
		this.totalpaidReceipt = totalpaidReceipt;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public double getBillTotal() {
		return billTotal;
	}
	public void setBillTotal(double billTotal) {
		this.billTotal = billTotal;
	}
	public double getBillPaid() {
		return billPaid;
	}
	public void setBillPaid(double billPaid) {
		this.billPaid = billPaid;
	}
	public double getRemainAmt() {
		return remainAmt;
	}
	public void setRemainAmt(double remainAmt) {
		this.remainAmt = remainAmt;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public double getTdsAmt() {
		return tdsAmt;
	}
	public void setTdsAmt(double tdsAmt) {
		this.tdsAmt = tdsAmt;
	}
	public double getConcession() {
		return concession;
	}
	public void setConcession(double concession) {
		this.concession = concession;
	}
	public double getPaidAmt() {
		return paidAmt;
	}
	public void setPaidAmt(double paidAmt) {
		this.paidAmt = paidAmt;
	}
	public List<BulkSettledDetailsDto> getLstBulkSettledDetailsDto() {
		return lstBulkSettledDetailsDto;
	}
	public void setLstBulkSettledDetailsDto(List<BulkSettledDetailsDto> lstBulkSettledDetailsDto) {
		this.lstBulkSettledDetailsDto = lstBulkSettledDetailsDto;
	}	    
}
