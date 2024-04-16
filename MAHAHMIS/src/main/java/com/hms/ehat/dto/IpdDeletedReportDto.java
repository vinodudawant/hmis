package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class IpdDeletedReportDto {


	int recNo,billId,department_id,patient_id;	
	String patientName,payMode,cardChqNo,expiry,bank,source,user,deletedBy,deletedRemark,unitName,category_name;
	double recAmt;
	Date billDate,recDate,deletedDate;
	List<IpdDeletedReportDto> lstIpdRec;
	
	
	public int getDepartment_id() {
		return department_id;
	}
	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}
	public int getRecNo() {
		return recNo;
	}
	public void setRecNo(int recNo) {
		this.recNo = recNo;
	}
	public int getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public int getBillId() {
		return billId;
	}
	public void setBillId(int billId) {
		this.billId = billId;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getPayMode() {
		return payMode;
	}
	public void setPayMode(String payMode) {
		this.payMode = payMode;
	}
	public String getCardChqNo() {
		return cardChqNo;
	}
	public void setCardChqNo(String cardChqNo) {
		this.cardChqNo = cardChqNo;
	}
	public String getExpiry() {
		return expiry;
	}
	public void setExpiry(String expiry) {
		this.expiry = expiry;
	}
	public String getBank() {
		return bank;
	}
	public void setBank(String bank) {
		this.bank = bank;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}	
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public double getRecAmt() {
		return recAmt;
	}
	public void setRecAmt(double recAmt) {
		this.recAmt = recAmt;
	}
	public Date getBillDate() {
		return billDate;
	}
	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}
	public Date getRecDate() {
		return recDate;
	}
	public void setRecDate(Date recDate) {
		this.recDate = recDate;
	}
	public List<IpdDeletedReportDto> getLstIpdRec() {
		return lstIpdRec;
	}
	public void setLstIpdRec(List<IpdDeletedReportDto> lstIpdRec) {
		this.lstIpdRec = lstIpdRec;
	}
	public String getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(String deletedBy) {
		this.deletedBy = deletedBy;
	}
	public String getDeletedRemark() {
		return deletedRemark;
	}
	public void setDeletedRemark(String deletedRemark) {
		this.deletedRemark = deletedRemark;
	}
	public Date getDeletedDate() {
		return deletedDate;
	}
	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}		
	
	private double refundamount;
	private double totalRemainingamount;
	private double totalrevAmount;

	public double getRefundamount() {
		return refundamount;
	}
	public void setRefundamount(double refundamount) {
		this.refundamount = refundamount;
	}
	
	public double getTotalRemainingamount() {
		return totalRemainingamount;
	}
	public void setTotalRemainingamount(double totalRemainingamount) {
		this.totalRemainingamount = totalRemainingamount;
	}
	public double getTotalrevAmount() {
		return totalrevAmount;
	}
	public void setTotalrevAmount(double totalrevAmount) {
		this.totalrevAmount = totalrevAmount;
	}
	
	List<IpdDeletedReportDto> lstOpdDiagnoRefund;

	public List<IpdDeletedReportDto> getLstOpdDiagnoRefund() {
		return lstOpdDiagnoRefund;
	}
	public void setLstOpdDiagnoRefund(List<IpdDeletedReportDto> lstOpdDiagnoRefund) {
		this.lstOpdDiagnoRefund = lstOpdDiagnoRefund;
	}
	
	private int treatment_id;

	public int getTreatment_id() {
		return treatment_id;
	}
	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}
}
