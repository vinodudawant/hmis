package com.hms.ehat.dto;

import java.util.List;

public class ServiceWiseReportDTO {

	private String serviceName;
	private String subServiceName;
	private String count;
	private String amount;
	private String concession;
	private String netAmount;
	private String rate;
	
	private String serviceId;
	private String subServiceId;
	
	private String discount;
	
	
	
	
	
	


	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public String getServiceId() {
		return serviceId;
	}

	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}

	public String getSubServiceId() {
		return subServiceId;
	}

	public void setSubServiceId(String subServiceId) {
		this.subServiceId = subServiceId;
	}

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	List<ServiceWiseReportDTO> serviceWiseReportList;

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getSubServiceName() {
		return subServiceName;
	}

	public void setSubServiceName(String subServiceName) {
		this.subServiceName = subServiceName;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	

	public String getConcession() {
		return concession;
	}

	public void setConcession(String concession) {
		this.concession = concession;
	}

	public String getNetAmount() {
		return netAmount;
	}

	public void setNetAmount(String netAmount) {
		this.netAmount = netAmount;
	}

	public List<ServiceWiseReportDTO> getServiceWiseReportList() {
		return serviceWiseReportList;
	}

	public void setServiceWiseReportList(List<ServiceWiseReportDTO> serviceWiseReportList) {
		this.serviceWiseReportList = serviceWiseReportList;
	}

}
