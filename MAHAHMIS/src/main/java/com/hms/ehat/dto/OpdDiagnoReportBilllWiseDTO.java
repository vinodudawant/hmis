package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class OpdDiagnoReportBilllWiseDTO {

	int billNo,billId,patientId;	
	String patientName,refDr,sourceGroup,sourceName,serviceName,treatDr,autheriseBy;
	double billAmt,paidAmt,remainAmt,qty,price,amount,discount,cost;
	Date billDate;
	List<OpdDiagnoReportBilllWiseDTO> lstOpdDiagno;
	
	
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public int getBillNo() {
		return billNo;
	}
	public void setBillNo(int billNo) {
		this.billNo = billNo;
	}	
	public int getBillId() {
		return billId;
	}
	public void setBillId(int billId) {
		this.billId = billId;
	}
	public Date getBillDate() {
		return billDate;
	}
	public void setBillDate(Date date) {
		this.billDate = date;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getRefDr() {
		return refDr;
	}
	public void setRefDr(String refDr) {
		this.refDr = refDr;
	}
	public String getSourceGroup() {
		return sourceGroup;
	}
	public void setSourceGroup(String sourceGroup) {
		this.sourceGroup = sourceGroup;
	}
	public String getSourceName() {
		return sourceName;
	}
	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}	
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getTreatDr() {
		return treatDr;
	}
	public void setTreatDr(String treatDr) {
		this.treatDr = treatDr;
	}
	public String getAutheriseBy() {
		return autheriseBy;
	}
	public void setAutheriseBy(String autheriseBy) {
		this.autheriseBy = autheriseBy;
	}
	public double getBillAmt() {
		return billAmt;
	}
	public void setBillAmt(double billAmt) {
		this.billAmt = billAmt;
	}
	public double getPaidAmt() {
		return paidAmt;
	}
	public void setPaidAmt(double paidAmt) {
		this.paidAmt = paidAmt;
	}
	public double getRemainAmt() {
		return remainAmt;
	}
	public void setRemainAmt(double remainAmt) {
		this.remainAmt = remainAmt;
	}
	public double getQty() {
		return qty;
	}
	public void setQty(double qty) {
		this.qty = qty;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public double getCost() {
		return cost;
	}
	public void setCost(double cost) {
		this.cost = cost;
	}
	public List<OpdDiagnoReportBilllWiseDTO> getLstOpdDiagno() {
		return lstOpdDiagno;
	}
	public void setLstOpdDiagno(List<OpdDiagnoReportBilllWiseDTO> lstOpdDiagno) {
		this.lstOpdDiagno = lstOpdDiagno;
	}

}
