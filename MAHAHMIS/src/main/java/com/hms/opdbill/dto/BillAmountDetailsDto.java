package com.hms.opdbill.dto;

import java.util.List;

public class BillAmountDetailsDto {

	// Input
	int unitId,depId,userId,treatmentId,serviceId,chargesSlaveId,sponsorCatId,pharmacyInvoice,pharmacyServId;
	String callformComAdv,callformRcptTot,callformPrevPending;
	// Output
	boolean emergencyFlag1;
	boolean emergencyFlag2;
	double amount;
	double concession;
	double other_amount;
	double other_concession;
	int service_id;
	double refund_amnt;
	double remaining_common_amnt;
	double total_common_amnt;
	double totAmt;
	double totConcn;
	double totDisc;
	double totPaid;
	double totRemain;
	double totRefund;
	double totalSpnsrpaid;
	double actual_amt;
	double total_paid;
	double total_discount;
	double actual_tot_concn;
	double total_remain;
	
	List<BillAmountDetailsDto> lstAmountDetails;

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getDepId() {
		return depId;
	}

	public void setDepId(int depId) {
		this.depId = depId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public int getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(int chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public int getSponsorCatId() {
		return sponsorCatId;
	}

	public void setSponsorCatId(int sponsorCatId) {
		this.sponsorCatId = sponsorCatId;
	}

	public int getPharmacyInvoice() {
		return pharmacyInvoice;
	}

	public void setPharmacyInvoice(int pharmacyInvoice) {
		this.pharmacyInvoice = pharmacyInvoice;
	}

	public int getPharmacyServId() {
		return pharmacyServId;
	}

	public void setPharmacyServId(int pharmacyServId) {
		this.pharmacyServId = pharmacyServId;
	}

	public String getCallformComAdv() {
		return callformComAdv;
	}

	public void setCallformComAdv(String callformComAdv) {
		this.callformComAdv = callformComAdv;
	}

	public String getCallformRcptTot() {
		return callformRcptTot;
	}

	public void setCallformRcptTot(String callformRcptTot) {
		this.callformRcptTot = callformRcptTot;
	}

	public String getCallformPrevPending() {
		return callformPrevPending;
	}

	public void setCallformPrevPending(String callformPrevPending) {
		this.callformPrevPending = callformPrevPending;
	}

	public boolean isEmergencyFlag1() {
		return emergencyFlag1;
	}

	public void setEmergencyFlag1(boolean emergencyFlag1) {
		this.emergencyFlag1 = emergencyFlag1;
	}

	public boolean isEmergencyFlag2() {
		return emergencyFlag2;
	}

	public void setEmergencyFlag2(boolean emergencyFlag2) {
		this.emergencyFlag2 = emergencyFlag2;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double getConcession() {
		return concession;
	}

	public void setConcession(double concession) {
		this.concession = concession;
	}

	public double getOther_amount() {
		return other_amount;
	}

	public void setOther_amount(double other_amount) {
		this.other_amount = other_amount;
	}

	public double getOther_concession() {
		return other_concession;
	}

	public void setOther_concession(double other_concession) {
		this.other_concession = other_concession;
	}

	public int getService_id() {
		return service_id;
	}

	public void setService_id(int service_id) {
		this.service_id = service_id;
	}

	public double getRefund_amnt() {
		return refund_amnt;
	}

	public void setRefund_amnt(double refund_amnt) {
		this.refund_amnt = refund_amnt;
	}

	public double getRemaining_common_amnt() {
		return remaining_common_amnt;
	}

	public void setRemaining_common_amnt(double remaining_common_amnt) {
		this.remaining_common_amnt = remaining_common_amnt;
	}

	public double getTotal_common_amnt() {
		return total_common_amnt;
	}

	public void setTotal_common_amnt(double total_common_amnt) {
		this.total_common_amnt = total_common_amnt;
	}

	public double getTotAmt() {
		return totAmt;
	}

	public void setTotAmt(double totAmt) {
		this.totAmt = totAmt;
	}

	public double getTotConcn() {
		return totConcn;
	}

	public void setTotConcn(double totConcn) {
		this.totConcn = totConcn;
	}

	public double getTotDisc() {
		return totDisc;
	}

	public void setTotDisc(double totDisc) {
		this.totDisc = totDisc;
	}

	public double getTotPaid() {
		return totPaid;
	}

	public void setTotPaid(double totPaid) {
		this.totPaid = totPaid;
	}

	public double getTotRemain() {
		return totRemain;
	}

	public void setTotRemain(double totRemain) {
		this.totRemain = totRemain;
	}

	public double getTotRefund() {
		return totRefund;
	}

	public void setTotRefund(double totRefund) {
		this.totRefund = totRefund;
	}

	public double getTotalSpnsrpaid() {
		return totalSpnsrpaid;
	}

	public void setTotalSpnsrpaid(double totalSpnsrpaid) {
		this.totalSpnsrpaid = totalSpnsrpaid;
	}

	public double getActual_amt() {
		return actual_amt;
	}

	public void setActual_amt(double actual_amt) {
		this.actual_amt = actual_amt;
	}

	public double getTotal_paid() {
		return total_paid;
	}

	public void setTotal_paid(double total_paid) {
		this.total_paid = total_paid;
	}

	public double getTotal_discount() {
		return total_discount;
	}

	public void setTotal_discount(double total_discount) {
		this.total_discount = total_discount;
	}

	public double getActual_tot_concn() {
		return actual_tot_concn;
	}

	public void setActual_tot_concn(double actual_tot_concn) {
		this.actual_tot_concn = actual_tot_concn;
	}

	public double getTotal_remain() {
		return total_remain;
	}

	public void setTotal_remain(double total_remain) {
		this.total_remain = total_remain;
	}

	public List<BillAmountDetailsDto> getLstAmountDetails() {
		return lstAmountDetails;
	}

	public void setLstAmountDetails(List<BillAmountDetailsDto> lstAmountDetails) {
		this.lstAmountDetails = lstAmountDetails;
	}

	@Override
	public String toString() {
		return "BillAmountDetailsDto [unitId=" + unitId + ", depId=" + depId + ", userId=" + userId + ", treatmentId="
				+ treatmentId + ", serviceId=" + serviceId + ", chargesSlaveId=" + chargesSlaveId + ", sponsorCatId="
				+ sponsorCatId + ", pharmacyInvoice=" + pharmacyInvoice + ", pharmacyServId=" + pharmacyServId
				+ ", callformComAdv=" + callformComAdv + ", callformRcptTot=" + callformRcptTot
				+ ", callformPrevPending=" + callformPrevPending + ", emergencyFlag1=" + emergencyFlag1
				+ ", emergencyFlag2=" + emergencyFlag2 + ", amount=" + amount + ", concession=" + concession
				+ ", other_amount=" + other_amount + ", other_concession=" + other_concession + ", service_id="
				+ service_id + ", refund_amnt=" + refund_amnt + ", remaining_common_amnt=" + remaining_common_amnt
				+ ", total_common_amnt=" + total_common_amnt + ", totAmt=" + totAmt + ", totConcn=" + totConcn
				+ ", totDisc=" + totDisc + ", totPaid=" + totPaid + ", totRemain=" + totRemain + ", totRefund="
				+ totRefund + ", totalSpnsrpaid=" + totalSpnsrpaid + ", actual_amt=" + actual_amt + ", total_paid="
				+ total_paid + ", total_discount=" + total_discount + ", actual_tot_concn=" + actual_tot_concn
				+ ", total_remain=" + total_remain + ", lstAmountDetails=" + lstAmountDetails + "]";
	}
	
	
	
}
