package com.hms.dto;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class IpdBillParticular {
	private String serviceHeading;
	private String billId;
	private String slaveTableId;
	private String particularId;
	private String particularDate;
	private String particularRate;
	private String particularQty;
	private String discount;
	private String particularTotal;
	private String particularPay;
	private String ParticularCoPay;
	private String perticularsDisc;
	private String testType;
	private String perticulars;
	private String generalId;
	private String treatmentId;
	private String particularTime;
	private String resultflag;
	private Integer assignTestId;
	
	@JsonGetter("assign_test_id")
	public Integer getAssignTestId() {
		return assignTestId;
	}
	@JsonSetter("assign_test_id")
	public void setAssignTestId(Integer assignTestId) {
		this.assignTestId = assignTestId;
	}
	
	public String getParticularTime() {
		return particularTime;
	}

	public void setParticularTime(String particularTime) {
		this.particularTime = particularTime;
	}

	public String getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getGeneralId() {
		return generalId;
	}

	public void setGeneralId(String generalId) {
		this.generalId = generalId;
	}

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public String getTestType() {
		return testType;
	}

	public void setTestType(String testType) {
		this.testType = testType;
	}

	public String getServiceHeading() {
		return serviceHeading;
	}

	public void setServiceHeading(String serviceHeading) {
		this.serviceHeading = serviceHeading;
	}

	public String getBillId() {
		return billId;
	}

	public void setBillId(String billId) {
		this.billId = billId;
	}

	public String getSlaveTableId() {
		return slaveTableId;
	}

	public void setSlaveTableId(String slaveTableId) {
		this.slaveTableId = slaveTableId;
	}

	public String getParticularId() {
		return particularId;
	}

	public void setParticularId(String particularId) {
		this.particularId = particularId;
	}

	public String getParticularDate() {
		return particularDate;
	}

	public void setParticularDate(String particularDate) {
		this.particularDate = particularDate;
	}

	public String getParticularRate() {
		return particularRate;
	}

	public void setParticularRate(String particularRate) {
		this.particularRate = particularRate;
	}

	public String getParticularQty() {
		return particularQty;
	}

	public void setParticularQty(String particularQty) {
		this.particularQty = particularQty;
	}

	public String getParticularTotal() {
		return particularTotal;
	}

	public void setParticularTotal(String particularTotal) {
		this.particularTotal = particularTotal;
	}

	public String getParticularPay() {
		return particularPay;
	}

	public void setParticularPay(String particularPay) {
		this.particularPay = particularPay;
	}

	public String getParticularCoPay() {
		return ParticularCoPay;
	}

	public void setParticularCoPay(String particularCoPay) {
		ParticularCoPay = particularCoPay;
	}

	public String getPerticulars() {
		return perticulars;
	}

	public void setPerticulars(String perticulars) {
		this.perticulars = perticulars;
	}

	public String getPerticularsDisc() {
		return perticularsDisc;
	}

	public void setPerticularsDisc(String perticularsDisc) {
		this.perticularsDisc = perticularsDisc;
	}

	public String getResultflag() {
		return resultflag;
	}

	public void setResultflag(String resultflag) {
		this.resultflag = resultflag;
	}

}
