package com.hms.hisab.Pojo;

import java.util.List;

public class HisabDTO{
	
	private int idehat_hisab_diagnostics,receiptId,componentId,refundAgainstId,id_opd_rec_comp,iddiagnosis_refund_receipt, id_opd_receipt,
	treatmentId,testId,testGroupId,refundAgainstReceiptId,refundAgainstComponentId,diagnosisRefundReceiptID,insertedById,updatedById,generatorId;
	
	private String patientName,testName,testType,testGroupName,paymentMode,paymentFrom,refundFlag,generatorName,doctorName;
	
	private double paidAmount,totalTestAmount,discountAmount,refundAmount,testQuantity,unpaidAmount,totalReceipt,totalRefund,totalCash; 
	
	
	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getGeneratorName() {
		return generatorName;
	}

	public void setGeneratorName(String generatorName) {
		this.generatorName = generatorName;
	}

	public int getGeneratorId() {
		return generatorId;
	}

	public void setGeneratorId(int generatorId) {
		this.generatorId = generatorId;
	}
	
	public int getId_opd_rec_comp() {
		return id_opd_rec_comp;
	}

	public double getTotalReceipt() {
		return totalReceipt;
	}

	public void setTotalReceipt(double totalReceipt) {
		this.totalReceipt = totalReceipt;
	}

	public double getTotalRefund() {
		return totalRefund;
	}

	public void setTotalRefund(double totalRefund) {
		this.totalRefund = totalRefund;
	}

	public double getTotalCash() {
		return totalCash;
	}

	public void setTotalCash(double totalCash) {
		this.totalCash = totalCash;
	}

	public void setId_opd_rec_comp(int id_opd_rec_comp) {
		this.id_opd_rec_comp = id_opd_rec_comp;
	}

	public int getIddiagnosis_refund_receipt() {
		return iddiagnosis_refund_receipt;
	}

	public void setIddiagnosis_refund_receipt(int iddiagnosis_refund_receipt) {
		this.iddiagnosis_refund_receipt = iddiagnosis_refund_receipt;
	}

	public int getId_opd_receipt() {
		return id_opd_receipt;
	}

	public void setId_opd_receipt(int id_opd_receipt) {
		this.id_opd_receipt = id_opd_receipt;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getTestId() {
		return testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}

	public int getTestGroupId() {
		return testGroupId;
	}

	public void setTestGroupId(int testGroupId) {
		this.testGroupId = testGroupId;
	}

	public int getRefundAgainstReceiptId() {
		return refundAgainstReceiptId;
	}

	public void setRefundAgainstReceiptId(int refundAgainstReceiptId) {
		this.refundAgainstReceiptId = refundAgainstReceiptId;
	}

	public int getRefundAgainstComponentId() {
		return refundAgainstComponentId;
	}

	public void setRefundAgainstComponentId(int refundAgainstComponentId) {
		this.refundAgainstComponentId = refundAgainstComponentId;
	}

	public int getDiagnosisRefundReceiptID() {
		return diagnosisRefundReceiptID;
	}

	public void setDiagnosisRefundReceiptID(int diagnosisRefundReceiptID) {
		this.diagnosisRefundReceiptID = diagnosisRefundReceiptID;
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

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getTestType() {
		return testType;
	}

	public void setTestType(String testType) {
		this.testType = testType;
	}

	public String getTestGroupName() {
		return testGroupName;
	}

	public void setTestGroupName(String testGroupName) {
		this.testGroupName = testGroupName;
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

	public double getTestQuantity() {
		return testQuantity;
	}

	public void setTestQuantity(double testQuantity) {
		this.testQuantity = testQuantity;
	}

	public double getUnpaidAmount() {
		return unpaidAmount;
	}

	public void setUnpaidAmount(double unpaidAmount) {
		this.unpaidAmount = unpaidAmount;
	}

	private List<HisabDTO> dList = null;
	


	public int getIdehat_hisab_diagnostics() {
		return idehat_hisab_diagnostics;
	}

	public void setIdehat_hisab_diagnostics(int idehat_hisab_diagnostics) {
		this.idehat_hisab_diagnostics = idehat_hisab_diagnostics;
	}

	public int getReceiptId() {
		return receiptId;
	}

	public void setReceiptId(int receiptId) {
		this.receiptId = receiptId;
	}

	public int getComponentId() {
		return componentId;
	}

	public void setComponentId(int componentId) {
		this.componentId = componentId;
	}

	public int getRefundAgainstId() {
		return refundAgainstId;
	}

	public void setRefundAgainstId(int refundAgainstId) {
		this.refundAgainstId = refundAgainstId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public double getPaidAmount() {
		return paidAmount;
	}

	public void setPaidAmount(double paidAmount) {
		this.paidAmount = paidAmount;
	}

	public double getTotalTestAmount() {
		return totalTestAmount;
	}

	public void setTotalTestAmount(double totalTestAmount) {
		this.totalTestAmount = totalTestAmount;
	}

	public double getDiscountAmount() {
		return discountAmount;
	}

	public void setDiscountAmount(double discountAmount) {
		this.discountAmount = discountAmount;
	}

	public double getRefundAmount() {
		return refundAmount;
	}

	public void setRefundAmount(double refundAmount) {
		this.refundAmount = refundAmount;
	}

	

	public List<HisabDTO> getdList() {
		return dList;
	}

	public void setdList(List<HisabDTO> dList) {
		this.dList = dList;
	}

	public String getRefundFlag() {
		return refundFlag;
	}

	public void setRefundFlag(String refundFlag) {
		this.refundFlag = refundFlag;
	}
}