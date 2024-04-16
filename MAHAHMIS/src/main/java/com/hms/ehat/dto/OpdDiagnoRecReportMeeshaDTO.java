package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class OpdDiagnoRecReportMeeshaDTO {

		int recNo,billId;	
		String patientName,payMode,cardChqNo,expiry,bank,source,user,deletedBy,deletedRemark,unitName;
		double recAmt;
		Date billDate,recDate,deletedDate;
		List<OpdDiagnoRecReportMeeshaDTO> lstOpdDiagnoRec;
		
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
		public List<OpdDiagnoRecReportMeeshaDTO> getLstOpdDiagnoRec() {
			return lstOpdDiagnoRec;
		}
		public void setLstOpdDiagnoRec(List<OpdDiagnoRecReportMeeshaDTO> lstOpdDiagnoRec) {
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
