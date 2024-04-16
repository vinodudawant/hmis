package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "ehat_other_bill_detail_for_ipd")
public class GetPopUpDataForOTDto {
	@Id	
	@Column(name = "other_bill_details_id_for_Ipd")
	private Integer otherBillDetailsId;

	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	

	@Column(name = "patient_id")
	private Integer patienttId;
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	
	
	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "sub_service_id")
	private Integer subServiceId;
	
	@Column(name = "child_sub_service_id")
	private Integer childSubServiceId;
	
	@Column(name = "Doctor_ID")
	private Integer docId;

	@Column(name = "doc_name")
	private String docName;

	@Column(name = "rate")
	private double rate;

	@Column(name = "amount")
	private double amount;

	@Column(name = "quantity")
	private double quantity;
	
	@Column(name = "paid_flag")
	private String paidFlag="N";
	
	@Column(name = "pay",columnDefinition="double default 0.00")
	private double pay;
	
	@Column(name = "co_pay",columnDefinition="double default 0.00")
	private double coPay;
	
	@Column(name = "concession",columnDefinition="double default 0.00")
	private double concession;
	
	@Column(name = "cancle")
	private String cancle="N";
	
	@Column(name = "ot_flag")
	private String otFlag;
	
	@Column(name = "otherflag")
	private String otherFlag;
	
	
	@Column(name = "isModify")
	private String isModify;
	
	@Column(name = "created_date_time")
	private Date createdDateTime;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "charges_id")
	private Integer chargesId;
	
	@Column(name = "chargesSlave_id")
	private Integer chargesSlaveId;
	
	@Column(name = "extra_flag")
	private String extraFlag;
	
	@Column(name = "iscombination")
	private String iscombination;
	
	@Column(name = "other_rate")
	private double otherRate;
	
	@Column(name = "other_amount")
	private double otherAmount;
	
	@Column(name = "other_pay")
	private double otherPay;
	
	@Column(name = "other_concession")
	private double otherConcession;
	
	@Column(name = "other_co_pay")
	private double otherCoPay;

	@Transient
	private List<GetPopUpDataForOTDto> listGetPopUpDataForOTDto;

	/*---------------------Getters And Setters---------------------------------*/

	
	public Integer getOtherBillDetailsId() {
		return otherBillDetailsId;
	}

	public void setOtherBillDetailsId(Integer otherBillDetailsId) {
		this.otherBillDetailsId = otherBillDetailsId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getBillDetailsId() {
		return billDetailsId;
	}

	public void setBillDetailsId(Integer billDetailsId) {
		this.billDetailsId = billDetailsId;
	}

	public Integer getPatienttId() {
		return patienttId;
	}

	public void setPatienttId(Integer patienttId) {
		this.patienttId = patienttId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public Integer getServiceId() {
		return serviceId;
	}

	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	public Integer getSubServiceId() {
		return subServiceId;
	}

	public void setSubServiceId(Integer subServiceId) {
		this.subServiceId = subServiceId;
	}

	public Integer getChildSubServiceId() {
		return childSubServiceId;
	}

	public void setChildSubServiceId(Integer childSubServiceId) {
		this.childSubServiceId = childSubServiceId;
	}

	public Integer getDocId() {
		return docId;
	}

	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
	}

	public double getPay() {
		return pay;
	}

	public void setPay(double pay) {
		this.pay = pay;
	}

	public double getCoPay() {
		return coPay;
	}

	public void setCoPay(double coPay) {
		this.coPay = coPay;
	}

	public double getConcession() {
		return concession;
	}

	public void setConcession(double concession) {
		this.concession = concession;
	}

	public String getCancle() {
		return cancle;
	}

	public void setCancle(String cancle) {
		this.cancle = cancle;
	}

	public String getOtFlag() {
		return otFlag;
	}

	public void setOtFlag(String otFlag) {
		this.otFlag = otFlag;
	}

	public String getIsModify() {
		return isModify;
	}

	public void setIsModify(String isModify) {
		this.isModify = isModify;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getChargesId() {
		return chargesId;
	}

	public void setChargesId(Integer chargesId) {
		this.chargesId = chargesId;
	}

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public String getExtraFlag() {
		return extraFlag;
	}

	public void setExtraFlag(String extraFlag) {
		this.extraFlag = extraFlag;
	}

	public String getIscombination() {
		return iscombination;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public double getOtherRate() {
		return otherRate;
	}

	public void setOtherRate(double otherRate) {
		this.otherRate = otherRate;
	}

	public double getOtherAmount() {
		return otherAmount;
	}

	public void setOtherAmount(double otherAmount) {
		this.otherAmount = otherAmount;
	}

	public double getOtherPay() {
		return otherPay;
	}

	public void setOtherPay(double otherPay) {
		this.otherPay = otherPay;
	}

	public double getOtherConcession() {
		return otherConcession;
	}

	public void setOtherConcession(double otherConcession) {
		this.otherConcession = otherConcession;
	}

	public double getOtherCoPay() {
		return otherCoPay;
	}

	public void setOtherCoPay(double otherCoPay) {
		this.otherCoPay = otherCoPay;
	}

	public List<GetPopUpDataForOTDto> getListGetPopUpDataForOTDto() {
		return listGetPopUpDataForOTDto;
	}

	public void setListGetPopUpDataForOTDto(
			List<GetPopUpDataForOTDto> listGetPopUpDataForOTDto) {
		this.listGetPopUpDataForOTDto = listGetPopUpDataForOTDto;
	}

	public String getOtherFlag() {
		return otherFlag;
	}

	public void setOtherFlag(String otherFlag) {
		this.otherFlag = otherFlag;
	}
	

	
	
}
