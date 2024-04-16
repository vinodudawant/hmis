package com.hms.dto;

import java.util.List;

public class ReportToMotivatorDTO {
	
	private String serviceName = null;
	private ReportToMotivatorPropertiesDTO reportToMotivatorPorperties = null;
	private List<ReportToMotivatorDTO> listReportMotivator = null;
	private List<ReportToMotivatorPropertiesDTO> listReportToMotivatorProperties = null;
	private double totalAmount = 0; 
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public ReportToMotivatorPropertiesDTO getReportToMotivatorPorperties() {
		return reportToMotivatorPorperties;
	}
	public void setReportToMotivatorPorperties(
			ReportToMotivatorPropertiesDTO reportToMotivatorPorperties) {
		this.reportToMotivatorPorperties = reportToMotivatorPorperties;
	}
	public List<ReportToMotivatorDTO> getListReportMotivator() {
		return listReportMotivator;
	}
	public void setListReportMotivator(
			List<ReportToMotivatorDTO> listReportMotivator) {
		this.listReportMotivator = listReportMotivator;
	}
	public List<ReportToMotivatorPropertiesDTO> getListReportToMotivatorProperties() {
		return listReportToMotivatorProperties;
	}
	public void setListReportToMotivatorProperties(
			List<ReportToMotivatorPropertiesDTO> listReportToMotivatorProperties) {
		this.listReportToMotivatorProperties = listReportToMotivatorProperties;
	}
	public double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
	
	

}
