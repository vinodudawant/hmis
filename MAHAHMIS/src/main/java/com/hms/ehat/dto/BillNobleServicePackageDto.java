package com.hms.ehat.dto;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;
/**@autor bilal***/
@Entity 
@Immutable
@Table(name = "patient_sub_service_details_package")
public class BillNobleServicePackageDto {
	
	@Id
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
		
	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "sub_service_id")
	private Integer subServiceId;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "doctor_id")
	private Integer docId;
	
	@Column(name = "doc_name")
	private String docName;
	
	@Column(name = "rate")
	private double rate;
	
	@Column(name = "amount")
	private double amount;
	
	@Column(name = "concession",columnDefinition="double default 0.00")
	private double concession;
	
	@Column(name = "quantity")
	private double quantity;
	
	@Column(name = "pay",columnDefinition="double default 0.00")
	private double pay;
	
	@Column(name = "co_pay",columnDefinition="double default 0.00")
	private double coPay;
	
	@Column(name = "other_amount")
	private double otherAmount;
	
	@Column(name = "other_rate")
	private double otherRate;
	
	@Column(name = "other_concession")
	private double otherConcession;
	
	@Column(name = "other_pay")
	private double otherPay;
	
	@Column(name = "other_co_pay")
	private double otherCoPay;
	
	@Column(name = "cancle")
	private String cancle="N";
	
	@Column(name = "paid_flag")
	private String paidFlag="N";
	
	@Column(name = "iscombination")
	private String isCombination;

	@Column(name = "isModify")
	private String isModify;
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Transient
    private List<BillNobleServicePackageDto> listBillNobleServiceDto;

	public Integer getBillDetailsId() {
		return billDetailsId;
	}

	public void setBillDetailsId(Integer billDetailsId) {
		this.billDetailsId = billDetailsId;
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

	public double getOtherAmount() {
		return otherAmount;
	}

	public void setOtherAmount(double otherAmount) {
		this.otherAmount = otherAmount;
	}

	public double getOtherRate() {
		return otherRate;
	}

	public void setOtherRate(double otherRate) {
		this.otherRate = otherRate;
	}

	public double getOtherConcession() {
		return otherConcession;
	}

	public void setOtherConcession(double otherConcession) {
		this.otherConcession = otherConcession;
	}

	public double getOtherPay() {
		return otherPay;
	}

	public void setOtherPay(double otherPay) {
		this.otherPay = otherPay;
	}

	public double getOtherCoPay() {
		return otherCoPay;
	}

	public void setOtherCoPay(double otherCoPay) {
		this.otherCoPay = otherCoPay;
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

	public String getIsCombination() {
		return isCombination;
	}

	public void setIsCombination(String isCombination) {
		this.isCombination = isCombination;
	}

	public String getIsModify() {
		return isModify;
	}

	public void setIsModify(String isModify) {
		this.isModify = isModify;
	}

	public List<BillNobleServicePackageDto> getListBillNobleServiceDto() {
		return listBillNobleServiceDto;
	}

	public void setListBillNobleServiceDto(
			List<BillNobleServicePackageDto> listBillNobleServiceDto) {
		this.listBillNobleServiceDto = listBillNobleServiceDto;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	
	

}
