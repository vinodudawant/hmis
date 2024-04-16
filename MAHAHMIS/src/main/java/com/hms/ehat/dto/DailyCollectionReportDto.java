package com.hms.ehat.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

public class DailyCollectionReportDto {

	int recNo,billId,patientId,treatmentId,payModeId;	
	BigInteger invoiceCount; 
	String patientName,payMode,remark,user,unitName,opdipdno,centerPatientId,docName;
	double recAmt;
	Date billDate,recDate;
	double totalBill;// added by dayanand (16-2-2023)
	double totalRemain;// added by dayanand (16-2-2023)
	double totalAmount;
	
	List<DailyCollectionReportDto> lstOpdReceipt;
	List<DailyCollectionReportDto> lstOpdRefund;
	List<DailyCollectionReportDto> lstIpdReceipt;
	List<DailyCollectionReportDto> lstIpdRefund;
	List<DailyCollectionReportDto> lstDiagReceipt;
	List<DailyCollectionReportDto> lstDiagRefund;
	List<DailyCollectionReportDto> lstOpdtotalAmt;// added for opd payment mode wise total
	List<DailyCollectionReportDto> lstDiagnototalAmt;// added for diagnosis payment mode wise total
	List<DailyCollectionReportDto> lstOpdtotalRefundAmt;// added for opd payment mode wise total refund
	List<DailyCollectionReportDto> lstDiagnototalRefundAmt;// added for diagnosis payment mode wise total refund
	
	public BigInteger getInvoiceCount() {
		return invoiceCount;
	}
	public void setInvoiceCount(BigInteger invoiceCount) {
		this.invoiceCount = invoiceCount;
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
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public int getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}	
	public int getPayModeId() {
		return payModeId;
	}
	public void setPayModeId(int payModeId) {
		this.payModeId = payModeId;
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
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public String getOpdipdno() {
		return opdipdno;
	}
	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
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
	public List<DailyCollectionReportDto> getLstOpdReceipt() {
		return lstOpdReceipt;
	}
	public void setLstOpdReceipt(List<DailyCollectionReportDto> lstOpdReceipt) {
		this.lstOpdReceipt = lstOpdReceipt;
	}
	public List<DailyCollectionReportDto> getLstOpdRefund() {
		return lstOpdRefund;
	}
	public void setLstOpdRefund(List<DailyCollectionReportDto> lstOpdRefund) {
		this.lstOpdRefund = lstOpdRefund;
	}
	public List<DailyCollectionReportDto> getLstIpdReceipt() {
		return lstIpdReceipt;
	}
	public void setLstIpdReceipt(List<DailyCollectionReportDto> lstIpdReceipt) {
		this.lstIpdReceipt = lstIpdReceipt;
	}
	public List<DailyCollectionReportDto> getLstIpdRefund() {
		return lstIpdRefund;
	}
	public void setLstIpdRefund(List<DailyCollectionReportDto> lstIpdRefund) {
		this.lstIpdRefund = lstIpdRefund;
	}
	public List<DailyCollectionReportDto> getLstDiagReceipt() {
		return lstDiagReceipt;
	}
	public void setLstDiagReceipt(List<DailyCollectionReportDto> lstDiagReceipt) {
		this.lstDiagReceipt = lstDiagReceipt;
	}
	public List<DailyCollectionReportDto> getLstDiagRefund() {
		return lstDiagRefund;
	}
	public void setLstDiagRefund(List<DailyCollectionReportDto> lstDiagRefund) {
		this.lstDiagRefund = lstDiagRefund;
	}
	public String getCenterPatientId() {
		return centerPatientId;
	}
	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}
	public double getTotalBill() {
		return totalBill;
	}
	public void setTotalBill(double totalBill) {
		this.totalBill = totalBill;
	}
	public double getTotalRemain() {
		return totalRemain;
	}
	public void setTotalRemain(double totalRemain) {
		this.totalRemain = totalRemain;
	}
	public double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public List<DailyCollectionReportDto> getLstOpdtotalAmt() {
		return lstOpdtotalAmt;
	}
	public void setLstOpdtotalAmt(List<DailyCollectionReportDto> lstOpdtotalAmt) {
		this.lstOpdtotalAmt = lstOpdtotalAmt;
	}
	public List<DailyCollectionReportDto> getLstDiagnototalAmt() {
		return lstDiagnototalAmt;
	}
	public void setLstDiagnototalAmt(List<DailyCollectionReportDto> lstDiagnototalAmt) {
		this.lstDiagnototalAmt = lstDiagnototalAmt;
	}
	
	public List<DailyCollectionReportDto> getLstOpdtotalRefundAmt() {
		return lstOpdtotalRefundAmt;
	}
	public void setLstOpdtotalRefundAmt(List<DailyCollectionReportDto> lstOpdtotalRefundAmt) {
		this.lstOpdtotalRefundAmt = lstOpdtotalRefundAmt;
	}
	public List<DailyCollectionReportDto> getLstDiagnototalRefundAmt() {
		return lstDiagnototalRefundAmt;
	}
	public void setLstDiagnototalRefundAmt(List<DailyCollectionReportDto> lstDiagnototalRefundAmt) {
		this.lstDiagnototalRefundAmt = lstDiagnototalRefundAmt;
	}
	
	public String getDocName() {
		return docName;
	}
	public void setDocName(String docName) {
		this.docName = docName;
	}
	@Override
	public String toString() {
		return "DailyCollectionReportDto [recNo=" + recNo + ", billId=" + billId + ", patientId=" + patientId
				+ ", treatmentId=" + treatmentId + ", payModeId=" + payModeId + ", invoiceCount=" + invoiceCount
				+ ", patientName=" + patientName + ", payMode=" + payMode + ", remark=" + remark + ", user=" + user
				+ ", unitName=" + unitName + ", opdipdno=" + opdipdno + ", centerPatientId=" + centerPatientId
				+ ", docName=" + docName + ", recAmt=" + recAmt + ", billDate=" + billDate + ", recDate=" + recDate
				+ ", totalBill=" + totalBill + ", totalRemain=" + totalRemain + ", totalAmount=" + totalAmount
				+ ", lstOpdReceipt=" + lstOpdReceipt + ", lstOpdRefund=" + lstOpdRefund + ", lstIpdReceipt="
				+ lstIpdReceipt + ", lstIpdRefund=" + lstIpdRefund + ", lstDiagReceipt=" + lstDiagReceipt
				+ ", lstDiagRefund=" + lstDiagRefund + ", lstOpdtotalAmt=" + lstOpdtotalAmt + ", lstDiagnototalAmt="
				+ lstDiagnototalAmt + ", lstOpdtotalRefundAmt=" + lstOpdtotalRefundAmt + ", lstDiagnototalRefundAmt="
				+ lstDiagnototalRefundAmt + "]";
	}
	
	
}
