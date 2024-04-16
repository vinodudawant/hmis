package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class BillRegReportMeeshaDTO {


	int recNo,billNo,depId;
	Date recDate,collectionDate,billDate;
	String patientName,sponsorName,drName,serviceName,source,authority,refDr,conGivenBy,conCategory,remark,userName,sponsorLeaf,regNo,unitName,mobile;
	double totAmt,discAmt,paidAmt,remainAmt,gstAmt,payInstall;
	List<BillRegReportMeeshaDTO> lstBillReg;
	
	public int getRecNo() {
		return recNo;
	}
	public void setRecNo(int recNo) {
		this.recNo = recNo;
	}
	public int getBillNo() {
		return billNo;
	}
	public void setBillNo(int billNo) {
		this.billNo = billNo;
	}	
	public int getDepId() {
		return depId;
	}
	public void setDepId(int depId) {
		this.depId = depId;
	}
	public Date getRecDate() {
		return recDate;
	}
	public void setRecDate(Date recDate) {
		this.recDate = recDate;
	}
	public Date getCollectionDate() {
		return collectionDate;
	}
	public void setCollectionDate(Date collectionDate) {
		this.collectionDate = collectionDate;
	}
	public Date getBillDate() {
		return billDate;
	}
	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}	
	public String getSponsorName() {
		return sponsorName;
	}
	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}
	public String getDrName() {
		return drName;
	}
	public void setDrName(String drName) {
		this.drName = drName;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public String getRefDr() {
		return refDr;
	}
	public void setRefDr(String refDr) {
		this.refDr = refDr;
	}
	public String getConGivenBy() {
		return conGivenBy;
	}
	public void setConGivenBy(String conGivenBy) {
		this.conGivenBy = conGivenBy;
	}
	public String getConCategory() {
		return conCategory;
	}
	public void setConCategory(String conCategory) {
		this.conCategory = conCategory;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}	
	public String getSponsorLeaf() {
		return sponsorLeaf;
	}
	public void setSponsorLeaf(String sponsorLeaf) {
		this.sponsorLeaf = sponsorLeaf;
	}	
	public String getRegNo() {
		return regNo;
	}
	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}
	public double getTotAmt() {
		return totAmt;
	}
	public void setTotAmt(double totAmt) {
		this.totAmt = totAmt;
	}
	public double getDiscAmt() {
		return discAmt;
	}
	public void setDiscAmt(double discAmt) {
		this.discAmt = discAmt;
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
	public double getGstAmt() {
		return gstAmt;
	}
	public void setGstAmt(double gstAmt) {
		this.gstAmt = gstAmt;
	}
	public double getPayInstall() {
		return payInstall;
	}
	public void setPayInstall(double payInstall) {
		this.payInstall = payInstall;
	}
	public List<BillRegReportMeeshaDTO> getLstBillReg() {
		return lstBillReg;
	}
	public void setLstBillReg(List<BillRegReportMeeshaDTO> lstBillReg) {
		this.lstBillReg = lstBillReg;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}		


}
