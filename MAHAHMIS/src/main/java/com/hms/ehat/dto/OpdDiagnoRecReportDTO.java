package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class OpdDiagnoRecReportDTO {

	int recNo,billId,unit_id,user_id,payMode,pay_mode,patientId,billNo;	
	String patientName,cardChqNo,expiry,bank,source,user,deletedBy,deletedRemark,unitName,Name_exp_15,Name_exp_16,Name_exp_17,payment_mode,deleted_user_name;
	double recAmt;
	Date billDate,recDate,deletedDate;
	List<OpdDiagnoRecReportDTO> lstOpdDiagnoRec;
	
	
	
	public String getDeleted_user_name() {
		return deleted_user_name;
	}
	public void setDeleted_user_name(String deleted_user_name) {
		this.deleted_user_name = deleted_user_name;
	}
	public int getBillNo() {
		return billNo;
	}
	public void setBillNo(int billNo) {
		this.billNo = billNo;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public String getPayment_mode() {
		return payment_mode;
	}
	public void setPayment_mode(String payment_mode) {
		this.payment_mode = payment_mode;
	}
	public int getPay_mode() {
		return pay_mode;
	}
	public void setPay_mode(int pay_mode) {
		this.pay_mode = pay_mode;
	}
	public String getName_exp_15() {
		return Name_exp_15;
	}
	public void setName_exp_15(String name_exp_15) {
		Name_exp_15 = name_exp_15;
	}
	public String getName_exp_16() {
		return Name_exp_16;
	}
	public void setName_exp_16(String name_exp_16) {
		Name_exp_16 = name_exp_16;
	}
	public String getName_exp_17() {
		return Name_exp_17;
	}
	public void setName_exp_17(String name_exp_17) {
		Name_exp_17 = name_exp_17;
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
	public int getRecNo() {
		return recNo;
	}
	public void setRecNo(int recNo) {
		this.recNo = recNo;
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
	public int getPayMode() {
		return payMode;
	}
	public void setPayMode(int payMode) {
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
	public List<OpdDiagnoRecReportDTO> getLstOpdDiagnoRec() {
		return lstOpdDiagnoRec;
	}
	public void setLstOpdDiagnoRec(List<OpdDiagnoRecReportDTO> lstOpdDiagnoRec) {
		this.lstOpdDiagnoRec = lstOpdDiagnoRec;
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
}
