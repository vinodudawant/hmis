package com.hms.ehat.dto;

import javax.persistence.Transient;

public class FinanceReportAmtDto {
 double totalAMt;
 double totalDiscountAMt;
 double totalPaidAMt;
 double totalConAMt;
 double totalRefundAMt;
 
 @Transient
 double totalsponserpaidAmt;
 
 
public double getTotalsponserpaidAmt() {
	return totalsponserpaidAmt;
}
public void setTotalsponserpaidAmt(double totalsponserpaidAmt) {
	this.totalsponserpaidAmt = totalsponserpaidAmt;
}
public double getTotalAMt() {
	return totalAMt;
}
public void setTotalAMt(double totalAMt) {
	this.totalAMt = totalAMt;
}
public double getTotalDiscountAMt() {
	return totalDiscountAMt;
}
public void setTotalDiscountAMt(double totalDiscountAMt) {
	this.totalDiscountAMt = totalDiscountAMt;
}
public double getTotalPaidAMt() {
	return totalPaidAMt;
}
public void setTotalPaidAMt(double totalPaidAMt) {
	this.totalPaidAMt = totalPaidAMt;
}
public double getTotalConAMt() {
	return totalConAMt;
}
public void setTotalConAMt(double totalConAMt) {
	this.totalConAMt = totalConAMt;
}
public double getTotalRefundAMt() {
	return totalRefundAMt;
}
public void setTotalRefundAMt(double totalRefundAMt) {
	this.totalRefundAMt = totalRefundAMt;
}
@Override
public String toString() {
	return "FinanceReportAmtDto [totalAMt=" + totalAMt + ", totalDiscountAMt=" + totalDiscountAMt + ", totalPaidAMt="
			+ totalPaidAMt + ", totalConAMt=" + totalConAMt + ", totalRefundAMt=" + totalRefundAMt + "]";
}
 
 
}
