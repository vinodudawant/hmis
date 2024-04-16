package com.hms.hisab.Pojo;

import java.util.List;

public class HisabIPDDTO 
{
	private int idehat_hisab_ipd,receiptMRNo,receiptRegNo,refundMRNo,refundRegNo,discountBillNo,discountRegId,
				treatmentId,insertedById,updatedById,deletedById,hisabCloseById;
	private String patientName,doctorName,paymentMode,paymentFrom,refundFlag,discountFlag,generatorName,billType,receiptDate,narration;
	private double totalAmount,refundAmount,discountAmount;
	private List<HisabIPDDTO> dList = null;
	
	
	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}	
	
	public String getReceiptDate() {
		return receiptDate;
	}

	public void setReceiptDate(String receiptDate) {
		this.receiptDate = receiptDate;
	}
	
	public int getIdehat_hisab_ipd() {
		return idehat_hisab_ipd;
	}

	public void setIdehat_hisab_ipd(int idehat_hisab_ipd) {
		this.idehat_hisab_ipd = idehat_hisab_ipd;
	}

	public int getReceiptMRNo() {
		return receiptMRNo;
	}

	public void setReceiptMRNo(int receiptMRNo) {
		this.receiptMRNo = receiptMRNo;
	}

	public int getReceiptRegNo() {
		return receiptRegNo;
	}

	public void setReceiptRegNo(int receiptRegNo) {
		this.receiptRegNo = receiptRegNo;
	}

	public int getRefundMRNo() {
		return refundMRNo;
	}

	public void setRefundMRNo(int refundMRNo) {
		this.refundMRNo = refundMRNo;
	}

	public int getRefundRegNo() {
		return refundRegNo;
	}

	public void setRefundRegNo(int refundRegNo) {
		this.refundRegNo = refundRegNo;
	}

	public int getDiscountBillNo() {
		return discountBillNo;
	}

	public void setDiscountBillNo(int discountBillNo) {
		this.discountBillNo = discountBillNo;
	}

	public int getDiscountRegId() {
		return discountRegId;
	}

	public void setDiscountRegId(int discountRegId) {
		this.discountRegId = discountRegId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getInsertedById() {
		return insertedById;
	}

	public void setInsertedById(int insertedById) {
		this.insertedById = insertedById;
	}

	public int getUpdatedById() {
		return updatedById;
	}

	public void setUpdatedById(int updatedById) {
		this.updatedById = updatedById;
	}

	public int getDeletedById() {
		return deletedById;
	}

	public void setDeletedById(int deletedById) {
		this.deletedById = deletedById;
	}

	public int getHisabCloseById() {
		return hisabCloseById;
	}

	public void setHisabCloseById(int hisabCloseById) {
		this.hisabCloseById = hisabCloseById;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public String getPaymentFrom() {
		return paymentFrom;
	}

	public void setPaymentFrom(String paymentFrom) {
		this.paymentFrom = paymentFrom;
	}

	public String getRefundFlag() {
		return refundFlag;
	}

	public void setRefundFlag(String refundFlag) {
		this.refundFlag = refundFlag;
	}

	public String getDiscountFlag() {
		return discountFlag;
	}

	public void setDiscountFlag(String discountFlag) {
		this.discountFlag = discountFlag;
	}

	public String getGeneratorName() {
		return generatorName;
	}

	public void setGeneratorName(String generatorName) {
		this.generatorName = generatorName;
	}

	public String getBillType() {
		return billType;
	}

	public void setBillType(String billType) {
		this.billType = billType;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public double getRefundAmount() {
		return refundAmount;
	}

	public void setRefundAmount(double refundAmount) {
		this.refundAmount = refundAmount;
	}

	public double getDiscountAmount() {
		return discountAmount;
	}

	public void setDiscountAmount(double discountAmount) {
		this.discountAmount = discountAmount;
	}	
	
	public List<HisabIPDDTO> getdList() {
		return dList;
	}

	public void setdList(List<HisabIPDDTO> dList) {
		this.dList = dList;
	}
}
