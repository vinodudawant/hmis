package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class IPDDiscount {

	Integer discountId;
	Integer billId;
	Float discount;
	Float discountInPercentage ;
	String narration;
	String payflag;
	String status;
	Integer userId;
	String date;
	Integer doctorId; 
	List<IPDDiscount> discountList;
	String saveEditType;
	String username;
	int approval_status ;
	String approval_disc_narration ;
	Float approval_disc_amt;
	String approval_disc_dateTime;
	Float totalAmount ;
	Float totalPayable;
	
	@JsonGetter("totalAmount")
	public Float getTotalAmount() {
		return totalAmount;
	}
	@JsonSetter("totalAmount")
	public void setTotalAmount(Float totalAmount) {
		this.totalAmount = totalAmount;
	}
	@JsonGetter("totalPayable")
	public Float getTotalPayable() {
		return totalPayable;
	}
	@JsonSetter("totalPayable")
	public void setTotalPayable(Float totalPayable) {
		this.totalPayable = totalPayable;
	}
	@JsonGetter("apprvalDiscNarr")
	public String getApproval_disc_narration() {
		return approval_disc_narration;
	}
	@JsonSetter("apprvalDiscNarr")
	public void setApproval_disc_narration(String approval_disc_narration) {
		this.approval_disc_narration = approval_disc_narration;
	}
	@JsonGetter("approvalDiscAmt")
	public Float getApproval_disc_amt() {
		return approval_disc_amt;
	}
	@JsonSetter("approvalDiscAmt")
	public void setApproval_disc_amt(Float approval_disc_amt) {
		this.approval_disc_amt = approval_disc_amt;
	}
	@JsonGetter("approvalDiscDtTm")
	public String getApproval_disc_dateTime() {
		return approval_disc_dateTime;
	}
	@JsonSetter("approvalDiscDtTm")
	public void setApproval_disc_dateTime(String approval_disc_dateTime) {
		this.approval_disc_dateTime = approval_disc_dateTime;
	}
	
	
	@JsonGetter("apprvalStatus")
	public int getApproval_status() {
		return approval_status;
	}
	@JsonSetter("apprvalStatus")
	public void setApproval_status(int approval_status) {
		this.approval_status = approval_status;
	}
	@JsonGetter("disPercntg")
	public Float getDiscountInPercentage() {
		return discountInPercentage;
	}
	@JsonSetter("disPercntg")
	public void setDiscountInPercentage(Float discountInPercentage) {
		this.discountInPercentage = discountInPercentage;
	}
	@JsonGetter("username")
	public String getUsername() {
		return username;
	}
	@JsonSetter("username")
	public void setUsername(String username) {
		this.username = username;
	}
	@JsonGetter("saveEditType")
	public String getSaveEditType() {
		return saveEditType;
	}
	@JsonGetter("saveEditType")
	public void setSaveEditType(String saveEditType) {
		this.saveEditType = saveEditType;
	}
	@JsonGetter("userId")
	public Integer getUserId() {
		return userId;
	}
	@JsonSetter("userId")
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("doctorId")
	public Integer getDoctorId() {
		return doctorId;
	}
	@JsonSetter("doctorId")
	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}
	
	@JsonGetter("st")
	public String getStatus() {
		return status;
	}
	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}
	
	@JsonGetter("pf")
	public String getPayflag() {
		return payflag;
	}
	@JsonSetter("pf")
	public void setPayflag(String payflag) {
		this.payflag = payflag;
	}
	
	
	@JsonGetter("id")
	public Integer getDiscountId() {
		return discountId;
	}
	@JsonSetter("id")
	public void setDiscountId(Integer discountId) {
		this.discountId = discountId;
	}
	@JsonGetter("bid")
	public Integer getBillId() {
		return billId;
	}
	@JsonSetter("bid")
	public void setBillId(Integer billId) {
		this.billId = billId;
	}
	@JsonGetter("disc")
	public Float getDiscount() {
		return discount;
	}
	@JsonSetter("disc")
	public void setDiscount(Float discount) {
		this.discount = discount;
	}
	@JsonGetter("narr")
	public String getNarration() {
		return narration;
	}
	@JsonSetter("narr")
	public void setNarration(String narration) {
		this.narration = narration;
	}
	@JsonGetter("discLi")
	public List<IPDDiscount> getDiscountList() {
		return discountList;
	}
	@JsonSetter("discLi")
	public void setDiscountList(List<IPDDiscount> discountList) {
		this.discountList = discountList;
	}
	
}
