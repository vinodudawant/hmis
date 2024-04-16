package com.hms.ehat.dto;

import java.io.Serializable;
import java.math.BigInteger;
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
@Table(name = "patient_sub_service_details2")
public class BillNobleServiceDto2 implements Serializable{
	


	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;

	private Integer serviceId;
	
	@Column(name = "sub_service_id")
	private Integer subServiceId;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "Doctor_ID")
	private Integer docId;
	
	@Column(name = "iscombination")
	private String isCombination;
	
	@Column(name = "doc_name")
	private String docName;

	@Column(name = "rate")
	private double rate;
	
	@Column(name = "charges_sponsor")
	private double chargesSponsor;
	
	@Column(name = "chargesSlave_id")
	private BigInteger chargesSlaveId;

	@Column(name = "amount")
	private double amount;

	@Column(name = "quantity")
	private double quantity;
	
	@Column(name = "paid_flag")
	private String paidFlag;
	
	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
	}

	@Column(name = "created_date_time")
	private Date createdDateTime;
	
	@Column(name = "created_date")
	private Date createdDate;


	@Column(name = "pay",columnDefinition="double default 0.00")
	private double pay;
	
	@Column(name = "co_pay",columnDefinition="double default 0.00")
	private double coPay;
	
	@Column(name = "concession",columnDefinition="double default 0.00")
	private double concession;
	
	@Column(name = "cancle")
	private String cancle="N";
	
	@Column(name = "isModify")
	private String isModify;
	

	@Column(name = "deleted")
	private String deleted;
	
	@Transient
	private List<BillNobleServiceDto2> listBillNobleServiceDto;
	
	
	public String getIsModify() {
		return isModify;
	}

	public void setIsModify(String isModify) {
		this.isModify = isModify;
	}

	public String getCancle() {
		return cancle;
	}

	public void setCancle(String cancle) {
		this.cancle = cancle;
	}

	public double getConcession() {
		return concession;
	}

	public void setConcession(double concession) {
		this.concession = concession;
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

	
	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
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

	public Double getCharges() {
		return rate;
	}

	public void setCharges(Double charges) {
		this.rate = charges;
	}

	public List<BillNobleServiceDto2> getListBillNobleServiceDto() {
		return listBillNobleServiceDto;
	}

	public void setListBillNobleServiceDto(
			List<BillNobleServiceDto2> listBillNobleServiceDto) {
		this.listBillNobleServiceDto = listBillNobleServiceDto;
	}
	
	public Integer getBillDetailsId() {
		return billDetailsId;
	}

	public void setBillDetailsId(Integer billDetailsId) {
		this.billDetailsId = billDetailsId;
	}
	
	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	public Integer getDocId() {
		return docId;
	}

	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	public BigInteger getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(BigInteger chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public double getChargesSponsor() {
		return chargesSponsor;
	}

	public void setChargesSponsor(double chargesSponsor) {
		this.chargesSponsor = chargesSponsor;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getIsCombination() {
		return isCombination;
	}

	public void setIsCombination(String isCombination) {
		this.isCombination = isCombination;
	}




	

}
