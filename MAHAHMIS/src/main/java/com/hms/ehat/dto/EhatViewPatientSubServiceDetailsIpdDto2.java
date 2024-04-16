package com.hms.ehat.dto;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;


@Entity
@Table(name="ehat_view_patient_sub_service_details_ipd2")
@Immutable
public class EhatViewPatientSubServiceDetailsIpdDto2 implements Serializable{
	
	
	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "sub_service_id")
	private Integer subServiceId;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "Doctor_ID")
	private Integer docId;
	
	private String otName;
	
	@Column(name = "doc_name")
	private String docName;

	@Column(name = "rate")
	private double rate;
	
	@Column(name = "amount")
	private double amount;

	@Column(name = "quantity")
	private double quantity;

	@Column(name = "pay",columnDefinition="double default 0.00")
	private double pay;
	
	@Column(name = "co_pay",columnDefinition="double default 0.00")
	private double coPay;
	
	@Column(name = "concession",columnDefinition="double default 0.00")
	private double concession;
	
	@Column(name = "cancle")
	private String cancle;
	
	@Column(name = "paid_flag")
	private String paidFlag="N";
	
	@Column(name = "isModify")
	private String isModify;
	
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

	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date")
	private Date createdDate;
	
	@Column(name = "charges_sponsor")
	private double chargesSponsor;
	
	@Column(name = "chargesSlave_id")
	private BigInteger chargesSlaveId;
	
	@Transient
	private List<EhatViewPatientSubServiceDetailsIpdDto2> listSubServiceIpdDto;
	
	/*Getters and Setters*/

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

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getDocId() {
		return docId;
	}

	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	public String getOtName() {
		return otName;
	}

	public void setOtName(String otName) {
		this.otName = otName;
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

	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
	}

	public String getIsModify() {
		return isModify;
	}

	public void setIsModify(String isModify) {
		this.isModify = isModify;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public double getChargesSponsor() {
		return chargesSponsor;
	}

	public void setChargesSponsor(double chargesSponsor) {
		this.chargesSponsor = chargesSponsor;
	}

	public BigInteger getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(BigInteger chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public List<EhatViewPatientSubServiceDetailsIpdDto2> getListSubServiceIpdDto() {
		return listSubServiceIpdDto;
	}

	public void setListSubServiceIpdDto(
			List<EhatViewPatientSubServiceDetailsIpdDto2> listSubServiceIpdDto) {
		this.listSubServiceIpdDto = listSubServiceIpdDto;
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

	
	
	

}
