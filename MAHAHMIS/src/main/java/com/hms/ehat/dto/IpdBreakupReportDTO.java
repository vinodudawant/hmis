package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

public class IpdBreakupReportDTO {

	int billNo,patId;	
	String patientName,company,regNo,month,DOD,type,billType,consultant,refBy,payMethod,otName,anaesthesiaName,opdipdno;
	double totBill,servAmt,patientPaid,sposorPaid,refund,totReceive,anaesthesiaCharges;
	@Temporal(TemporalType.TIMESTAMP)
	Date DOA;
	
	List<ServiceMasterDto> lstOtHeader;
	List<ServiceMasterDto> lstOtDetails;
	List<ServiceMasterDto> lstDrRound;
	List<ServiceMasterDto> lstServMaster;
	List<IpdBreakupReportDTO> lstIpdBreakup;
	
	@Transient
	private String drRoundOthers="N";
	
	@Transient
	private Double docRoundChargeOthers=0.0;
	@Transient
	List<ServiceMasterDto> lstOtNames;
	
	@Transient
	private String othersOtName="";
	
	
	public String getOthersOtName() {
		return othersOtName;
	}
	public void setOthersOtName(String othersOtName) {
		this.othersOtName = othersOtName;
	}
	public List<ServiceMasterDto> getLstOtNames() {
		return lstOtNames;
	}
	public void setLstOtNames(List<ServiceMasterDto> lstOtNames) {
		this.lstOtNames = lstOtNames;
	}
	public String getDrRoundOthers() {
		return drRoundOthers;
	}
	public void setDrRoundOthers(String drRoundOthers) {
		this.drRoundOthers = drRoundOthers;
	}
	public Double getDocRoundChargeOthers() {
		return docRoundChargeOthers;
	}
	public void setDocRoundChargeOthers(Double docRoundChargeOthers) {
		this.docRoundChargeOthers = docRoundChargeOthers;
	}
	public String getOpdipdno() {
		return opdipdno;
	}
	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}
	public int getBillNo() {
		return billNo;
	}
	public void setBillNo(int billNo) {
		this.billNo = billNo;
	}
	public int getPatId() {
		return patId;
	}
	public void setPatId(int patId) {
		this.patId = patId;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getRegNo() {
		return regNo;
	}
	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getDOD() {
		return DOD;
	}
	public void setDOD(String dOD) {
		DOD = dOD;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getBillType() {
		return billType;
	}
	public void setBillType(String billType) {
		this.billType = billType;
	}
	public String getConsultant() {
		return consultant;
	}
	public void setConsultant(String consultant) {
		this.consultant = consultant;
	}
	public String getRefBy() {
		return refBy;
	}
	public void setRefBy(String refBy) {
		this.refBy = refBy;
	}
	public String getPayMethod() {
		return payMethod;
	}
	public void setPayMethod(String payMethod) {
		this.payMethod = payMethod;
	}
	public String getOtName() {
		return otName;
	}
	public void setOtName(String otName) {
		this.otName = otName;
	}
	public String getAnaesthesiaName() {
		return anaesthesiaName;
	}
	public void setAnaesthesiaName(String anaesthesiaName) {
		this.anaesthesiaName = anaesthesiaName;
	}
	public double getTotBill() {
		return totBill;
	}
	public void setTotBill(double totBill) {
		this.totBill = totBill;
	}
	public double getServAmt() {
		return servAmt;
	}
	public void setServAmt(double servAmt) {
		this.servAmt = servAmt;
	}
	public double getPatientPaid() {
		return patientPaid;
	}
	public void setPatientPaid(double patientPaid) {
		this.patientPaid = patientPaid;
	}
	public double getSposorPaid() {
		return sposorPaid;
	}
	public void setSposorPaid(double sposorPaid) {
		this.sposorPaid = sposorPaid;
	}
	public double getRefund() {
		return refund;
	}
	public void setRefund(double refund) {
		this.refund = refund;
	}
	public double getTotReceive() {
		return totReceive;
	}
	public void setTotReceive(double totReceive) {
		this.totReceive = totReceive;
	}
	public double getAnaesthesiaCharges() {
		return anaesthesiaCharges;
	}
	public void setAnaesthesiaCharges(double anaesthesiaCharges) {
		this.anaesthesiaCharges = anaesthesiaCharges;
	}
	public Date getDOA() {
		return DOA;
	}
	public void setDOA(Date dOA) {
		DOA = dOA;
	}		
	public List<ServiceMasterDto> getLstOtHeader() {
		return lstOtHeader;
	}
	public void setLstOtHeader(List<ServiceMasterDto> lstOtHeader) {
		this.lstOtHeader = lstOtHeader;
	}
	public List<ServiceMasterDto> getLstOtDetails() {
		return lstOtDetails;
	}
	public void setLstOtDetails(List<ServiceMasterDto> lstOtDetails) {
		this.lstOtDetails = lstOtDetails;
	}
	public List<ServiceMasterDto> getLstDrRound() {
		return lstDrRound;
	}
	public void setLstDrRound(List<ServiceMasterDto> lstDrRound) {
		this.lstDrRound = lstDrRound;
	}
	public List<ServiceMasterDto> getLstServMaster() {
		return lstServMaster;
	}
	public void setLstServMaster(List<ServiceMasterDto> lstServMaster) {
		this.lstServMaster = lstServMaster;
	}
	public List<IpdBreakupReportDTO> getLstIpdBreakup() {
		return lstIpdBreakup;
	}
	public void setLstIpdBreakup(List<IpdBreakupReportDTO> lstIpdBreakup) {
		this.lstIpdBreakup = lstIpdBreakup;
	}	
}
