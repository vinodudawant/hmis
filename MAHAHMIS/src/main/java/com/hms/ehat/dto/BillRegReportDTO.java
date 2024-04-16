package com.hms.ehat.dto;

import java.util.List;

public class BillRegReportDTO {

	int recNo,billNo,billId,depId,patient_id,treatment_id,unit_id,againstId;
	private int patientid;

	double total_amount,total_paid,bill_amt,total_discount,amount;

	String recDate,collectionDate,billDate,created_date_time,deletedDate;
	
	String patientName,mobile_no,doc_name,sponsorName,drName,serviceName,source,authority,refDr,conGivenBy,conCategory,remark,userName,sponsorLeaf,regNo,unitName,deleted,deletedBy,refGivenBy,opdipdno;
	
	String approvedRemark,approveduserName;
	
	public int getBillId() {
		return billId;
	}
	public void setBillId(int billId) {
		this.billId = billId;
	}
	public String getRecDate() {
		return recDate;
	}
	public void setRecDate(String recDate) {
		this.recDate = recDate;
	}
	public String getCollectionDate() {
		return collectionDate;
	}
	public void setCollectionDate(String collectionDate) {
		this.collectionDate = collectionDate;
	}
	public String getBillDate() {
		return billDate;
	}
	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}
	public String getCreated_date_time() {
		return created_date_time;
	}
	public void setCreated_date_time(String created_date_time) {
		this.created_date_time = created_date_time;
	}
	public String getDeletedDate() {
		return deletedDate;
	}
	public void setDeletedDate(String deletedDate) {
		this.deletedDate = deletedDate;
	}
	public String getOpdipdno() {
		return opdipdno;
	}
	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}
	public int getPatientid() {
		return patientid;
	}
	public void setPatientid(int patientid) {
		this.patientid = patientid;
	}
	public int getAgainstId() {
		return againstId;
	}
	public void setAgainstId(int againstId) {
		this.againstId = againstId;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	public String getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(String deletedBy) {
		this.deletedBy = deletedBy;
	}
	public String getRefGivenBy() {
		return refGivenBy;
	}
	public void setRefGivenBy(String refGivenBy) {
		this.refGivenBy = refGivenBy;
	}
	public double getTotal_discount() {
		return total_discount;
	}
	public void setTotal_discount(double total_discount) {
		this.total_discount = total_discount;
	}
	public double getBill_amt() {
		return bill_amt;
	}
	public double getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(double total_amount) {
		this.total_amount = total_amount;
	}
	public double getTotal_paid() {
		return total_paid;
	}
	public void setTotal_paid(double total_paid) {
		this.total_paid = total_paid;
	}
	public void setBill_amt(double bill_amt) {
		this.bill_amt = bill_amt;
	}
	public int getUnit_id() {
		return unit_id;
	}
	public void setUnit_id(int unit_id) {
		this.unit_id = unit_id;
	}
	public String getDoc_name() {
		return doc_name;
	}
	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}
	public String getMobile_no() {
		return mobile_no;
	}
	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}
	double totAmt,discAmt,paidAmt,remainAmt,gstAmt,payInstall;
	List<BillRegReportDTO> lstBillReg;
	
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public int getTreatment_id() {
		return treatment_id;
	}
	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}
	public int getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}
	public int getRecNo() {
		return recNo;
	}
	public void setRecNo(int recNo) {
		this.recNo = recNo;
	}
	public int getBillNo() {
		return billNo;
	}
	
	
	public String getApprovedRemark() {
		return approvedRemark;
	}
	public void setApprovedRemark(String approvedRemark) {
		this.approvedRemark = approvedRemark;
	}
	public String getApproveduserName() {
		return approveduserName;
	}
	public void setApproveduserName(String approveduserName) {
		this.approveduserName = approveduserName;
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
	public List<BillRegReportDTO> getLstBillReg() {
		return lstBillReg;
	}
	public void setLstBillReg(List<BillRegReportDTO> lstBillReg) {
		this.lstBillReg = lstBillReg;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	
	
}
