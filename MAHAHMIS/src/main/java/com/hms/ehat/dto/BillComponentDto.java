package com.hms.ehat.dto;

import java.util.List;

public class BillComponentDto {

	String serviceName,testName,docName,testAssignDate;
	double rate,quantity,amount,concession;
	List<BillComponentDto> listBillingComponentInfo;
	
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}	
	public String getDocName() {
		return docName;
	}
	public void setDocName(String docName) {
		this.docName = docName;
	}
	public double getRate() {
		return rate;
	}
	public void setRate(double rate) {
		this.rate = rate;
	}
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public double getConcession() {
		return concession;
	}
	public void setConcession(double concession) {
		this.concession = concession;
	}	
	public String getTestAssignDate() {
		return testAssignDate;
	}
	public void setTestAssignDate(String testAssignDate) {
		this.testAssignDate = testAssignDate;
	}
	public List<BillComponentDto> getListBillingComponentInfo() {
		return listBillingComponentInfo;
	}
	public void setListBillingComponentInfo(
			List<BillComponentDto> listBillingComponentInfo) {
		this.listBillingComponentInfo = listBillingComponentInfo;
	}
}
