package com.hms.dto;

import java.util.List;

public class MotivatorReportFromdateTodateDTO {
	
	private String serviceid =null;
	private String serviceName =null;
	private List<MotivatorPaymentDetails> listmopaydet = null;
	private double totalAmount;
	private List<MotivatorReportFromdateTodateDTO>listMotivatorReportFromdateTodate = null;
	private String radioType = null;
	public String getServiceid() {
		return serviceid;
	}
	public void setServiceid(String serviceid) {
		this.serviceid = serviceid;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public List<MotivatorPaymentDetails> getListmopaydet() {
		return listmopaydet;
	}
	public void setListmopaydet(List<MotivatorPaymentDetails> listmopaydet) {
		this.listmopaydet = listmopaydet;
	}
	public double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public List<MotivatorReportFromdateTodateDTO> getListMotivatorReportFromdateTodate() {
		return listMotivatorReportFromdateTodate;
	}
	public void setListMotivatorReportFromdateTodate(
			List<MotivatorReportFromdateTodateDTO> listMotivatorReportFromdateTodate) {
		this.listMotivatorReportFromdateTodate = listMotivatorReportFromdateTodate;
	}
	public String getRadioType() {
		return radioType;
	}
	public void setRadioType(String radioType) {
		this.radioType = radioType;
	}

}
