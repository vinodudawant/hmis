package com.hms.ehat.dto;

import java.util.List;

public class ServiceWiseBusinessReportDTO {

	private String billDate;
	private String billNo;
	private String patientName;
	private String patientId;
	private String consultantDoctor;
	private String refDoctorName;
	private String serviceName;
	private String subServiceName;
	private String rate;
	private String amount;
	private String concession;
	private String dues;
	private String patientType;

	private Integer treatmentId;
	private Integer chargesSlaveId;

	private Integer deptId;

	private FinanceReportAmtDto financeReportAmtDto;

	private double serviceWiseAmtDistributed;
	private double serviceWiseDiscountDistributed;

	private String serviceId;
	private String subServiceId;
	
	private String testType;
	
	

	

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getTestType() {
		return testType;
	}

	public void setTestType(String testType) {
		this.testType = testType;
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

	public double getServiceWiseDiscountDistributed() {
		return serviceWiseDiscountDistributed;
	}

	public void setServiceWiseDiscountDistributed(double serviceWiseDiscountDistributed) {
		this.serviceWiseDiscountDistributed = serviceWiseDiscountDistributed;
	}

	public double getServiceWiseAmtDistributed() {
		return serviceWiseAmtDistributed;
	}

	public void setServiceWiseAmtDistributed(double serviceWiseAmtDistributed) {
		this.serviceWiseAmtDistributed = serviceWiseAmtDistributed;
	}

	public FinanceReportAmtDto getFinanceReportAmtDto() {
		return financeReportAmtDto;
	}

	public void setFinanceReportAmtDto(FinanceReportAmtDto financeReportAmtDto) {
		this.financeReportAmtDto = financeReportAmtDto;
	}

	public Integer getDeptId() {
		return deptId;
	}

	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	List<ServiceWiseBusinessReportDTO> list;

	public String getBillDate() {
		return billDate;
	}

	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}

	public String getBillNo() {
		return billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getConsultantDoctor() {
		return consultantDoctor;
	}

	public void setConsultantDoctor(String consultantDoctor) {
		this.consultantDoctor = consultantDoctor;
	}

	public String getRefDoctorName() {
		return refDoctorName;
	}

	public void setRefDoctorName(String refDoctorName) {
		this.refDoctorName = refDoctorName;
	}

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

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
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

	public String getDues() {
		return dues;
	}

	public void setDues(String dues) {
		this.dues = dues;
	}

	public String getPatientType() {
		return patientType;
	}

	public void setPatientType(String patientType) {
		this.patientType = patientType;
	}

	public List<ServiceWiseBusinessReportDTO> getList() {
		return list;
	}

	public void setList(List<ServiceWiseBusinessReportDTO> list) {
		this.list = list;
	}

}
