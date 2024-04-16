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
@Table(name = "patient_sub_service_details")
public class BillNobleServiceDto implements Serializable{
	


	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	private Integer serviceId;
	
	@Column(name = "sub_service_id")
	private Integer subServiceId;
	
	@Column(name = "charges_slave_id")
	private Integer chargesSlaveId;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "Doctor_ID")
	private Integer docId;
	
	@Column(name = "doc_name")
	private String docName;
	
	@Column(name = "iscombination")
	private String isCombination;

	@Column(name = "rate")
	private double rate;
	
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


	@Column(name = "amount")
	private double amount;
	
	@Column(name = "concession_in_Perc")
	private double concessionOnPerc;
	
	@Column(name = "drdesk_flag")
	private String drdeskflag;
	

	@Column(name = "quantity")
	private double quantity;
	
	@Column(name = "paid_flag")
	private String paidFlag="N";
	
	@Column(name = "sndtolabflag")
	private String sndtolabflag;
	
	@Column(name = "paid_by_cash_flag")
	private String paidByCashFlag;
	
	
	@Transient
	private String invName;
	
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
	
	@Column(name = "cgscode")
	private String cghsCode;
	
	
	
	public String getCghsCode() {
		return cghsCode;
	}

	public void setCghsCode(String cghsCode) {
		this.cghsCode = cghsCode;
	}

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



	@Column(name = "created_date_time")
	private Date createdDateTime;
	
	@Column(name = "created_date")
	private Date createdDate;
	
	@Column(name = "emrPer",columnDefinition="int default 0")
	private double emrPer;
	
	@Column(name = "sndtorisflag")
	private String sndtorisflag;
	
	
	@Transient
    private String collectionDate="";  //added by Rohini Ambhore	
	@Transient
	private String collectionTime="";
	@Transient
	private String templateWise="N";
	@Transient
	private String histopathLab="N";
	
	
	
	public String getHistopathLab() {
		return histopathLab;
	}

	public void setHistopathLab(String histopathLab) {
		this.histopathLab = histopathLab;
	}

	public String getCollectionDate() {
		return collectionDate;
	}

	public void setCollectionDate(String collectionDate) {
		this.collectionDate = collectionDate;
	}

	public String getCollectionTime() {
		return collectionTime;
	}

	public void setCollectionTime(String collectionTime) {
		this.collectionTime = collectionTime;
	}

	public String getTemplateWise() {
		return templateWise;
	}

	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
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

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
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

	public List<BillNobleServiceDto> getListBillNobleServiceDto() {
		return listBillNobleServiceDto;
	}

	public void setListBillNobleServiceDto(
			List<BillNobleServiceDto> listBillNobleServiceDto) {
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



	public String getIsCombination() {
		return isCombination;
	}

	public void setIsCombination(String isCombination) {
		this.isCombination = isCombination;
	}



	public String getInvName() {
		return invName;
	}

	public void setInvName(String invName) {
		this.invName = invName;
	}



	public double getConcessionOnPerc() {
		return concessionOnPerc;
	}

	public void setConcessionOnPerc(double concessionOnPerc) {
		this.concessionOnPerc = concessionOnPerc;
	}

	public String getSndtolabflag() {
		return sndtolabflag;
	}

	public void setSndtolabflag(String sndtolabflag) {
		this.sndtolabflag = sndtolabflag;
	}



	@Transient
	private List<BillNobleServiceDto> listBillNobleServiceDto;
	
	public double getEmrPer() {
		return emrPer;
	}

	public void setEmrPer(double emrPer) {
		this.emrPer = emrPer;
	}

	public String getSndtorisflag() {
		return sndtorisflag;
	}

	public void setSndtorisflag(String sndtorisflag) {
		this.sndtorisflag = sndtorisflag;
	}

	public String getDrdeskflag() {
		return drdeskflag;
	}

	public void setDrdeskflag(String drdeskflag) {
		this.drdeskflag = drdeskflag;
	}

	public String getPaidByCashFlag() {
		return paidByCashFlag;
	}

	public void setPaidByCashFlag(String paidByCashFlag) {
		this.paidByCashFlag = paidByCashFlag;
	}


	

}
