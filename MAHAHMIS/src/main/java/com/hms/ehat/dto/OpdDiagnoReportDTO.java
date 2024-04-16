package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class OpdDiagnoReportDTO {

	int billNo,billId,againstId,unit_id,user_id,rec_id,patientId;	

	String patientName,mobile,refDr,sourceGroup,categoryName,sourceName,serviceName,
		   treatDr,autheriseBy,User,sponsorName,unitName,deleted,refGivenBy,refRemark,deletedBy,remark,userName;
	double billAmt,paidAmt,remainAmt,qty,price,amount,discount,cost,concession,totAmt,discAmt;
	Date billDate,deletedDate;
	
	String departmentName;
	
     Integer departmentId;

	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	List<OpdDiagnoReportDTO> lstOpdDiagno;
		
	
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public int getRec_id() {
		return rec_id;
	}
	public void setRec_id(int rec_id) {
		this.rec_id = rec_id;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public Date getBillDate() {
		return billDate;
	}
	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}
	public Date getDeletedDate() {
		return deletedDate;
	}
	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
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
	public String getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(String deletedBy) {
		this.deletedBy = deletedBy;
	}
	public int getUnit_id() {
		return unit_id;
	}
	public void setUnit_id(int unit_id) {
		this.unit_id = unit_id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	/*
	 * double billAmt,paidAmt,remainAmt,qty,price,amount,discount,cost,concession;
	 * Date billDate,deletedDate; List<OpdDiagnoReportDTO> lstOpdDiagno;
	 */
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
	public int getAgainstId() {
		return againstId;
	}
	public void setAgainstId(int againstId) {
		this.againstId = againstId;
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
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
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
	public String getUser() {
		return User;
	}
	public void setUser(String user) {
		User = user;
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
	public double getConcession() {
		return concession;
	}
	public void setConcession(double concession) {
		this.concession = concession;
	}	
	public String getSponsorName() {
		return sponsorName;
	}
	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}	
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public List<OpdDiagnoReportDTO> getLstOpdDiagno() {
		return lstOpdDiagno;
	}
	public void setLstOpdDiagno(List<OpdDiagnoReportDTO> lstOpdDiagno) {
		this.lstOpdDiagno = lstOpdDiagno;
	}
	
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	
	public String getRefGivenBy() {
		return refGivenBy;
	}
	public void setRefGivenBy(String refGivenBy) {
		this.refGivenBy = refGivenBy;
	}
	public String getRefRemark() {
		return refRemark;
	}
	public void setRefRemark(String refRemark) {
		this.refRemark = refRemark;
	}		
}
