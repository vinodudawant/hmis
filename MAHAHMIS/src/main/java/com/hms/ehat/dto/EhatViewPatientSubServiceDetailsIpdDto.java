package com.hms.ehat.dto;

import java.io.Serializable;
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
@Table(name="ehat_view_patient_sub_service_details_ipd")
@Immutable
public class EhatViewPatientSubServiceDetailsIpdDto implements Serializable{

	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "sub_service_id",columnDefinition="int default 0")
	private Integer subServiceId;
	
	@Column(name = "isCategory")
	private String isCategory;
	
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
	
	@Column(name = "concession_per",columnDefinition="double default 0.00")
	private double concessionPer=0;
	
	@Column(name = "cancle")
	private String cancle;
	
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
	
	@Column(name = "paid_flag")
	private String paidFlag="N";
	
	@Column(name = "isModify")
	private String isModify;
	
	@Column(name = "cgscode")
	private String cghsCode;
	
	@Column(name = "ot_procedure")
	private String otProcedureId;
	
	@Column(name = "ot_flag")
	private String otflag;
	
	@Column(name = "drdesk_flag")
	private String drdeskflag;
		
	private String otProcedure;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date")
	private Date createdDate;
	
	@Column(name = "iscombination")
	private String iscombination;
	
	@Column(name = "sndtolabflag")
	private String sndtolabflag;
	
	@Column(name = "sndtorisflag")
	private String sndtorisflag;
	
	@Transient
	private String inventoryName;
	
	@Transient
	private String pharmaName;
	
	@Column(name = "emrPer",columnDefinition="double default 0.00")
	private double emrPer;
	
	@Column(name = "sponsor_name")
	private String sponsorName;
	
	@Column(name = "paid_by_cash_flag")
	private String paidByCashFlag;
	
	@Column(name = "count_ot")
	private Integer otCount;
	
	@Column(name = "dctor_id_ot")
	private String otDoctors;
	
	@Transient
	private String otDoctorNames;
	
	@Transient
	private Date serviceDate;
	
	@Transient
	private String BedHall;

	@Transient
	private List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto;
	
	
	public String getBedHall() {
		return BedHall;
	}

	public void setBedHall(String bedHall) {
		BedHall = bedHall;
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
	
	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
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

	public List<EhatViewPatientSubServiceDetailsIpdDto> getListSubServiceIpdDto() {
		return listSubServiceIpdDto;
	}

	public void setListSubServiceIpdDto(
			List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto) {
		this.listSubServiceIpdDto = listSubServiceIpdDto;
	}
	
	public String getOtName() {
		return otName;
	}

	public void setOtName(String otName) {
		this.otName = otName;
	}

	public String getIsCategory() {
		return isCategory;
	}

	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
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

	public String getIscombination() {
		return iscombination;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public String getOtProcedure() {
		return otProcedure;
	}

	public void setOtProcedure(String otProcedure) {
		this.otProcedure = otProcedure;
	}

	public String getOtProcedureId() {
		return otProcedureId;
	}

	public void setOtProcedureId(String otProcedureId) {
		this.otProcedureId = otProcedureId;
	}

	public String getInventoryName() {
		return inventoryName;
	}

	public void setInventoryName(String inventoryName) {
		this.inventoryName = inventoryName;
	}

	public String getOtflag() {
		return otflag;
	}

	public void setOtflag(String otflag) {
		this.otflag = otflag;
	}
	

	public double getConcessionPer() {
		return concessionPer;
	}

	public void setConcessionPer(double concessionPer) {
		this.concessionPer = concessionPer;
	}


	public String getPharmaName() {
		return pharmaName;
	}

	public void setPharmaName(String pharmaName) {
		this.pharmaName = pharmaName;
	}

	public String getCghsCode() {
		return cghsCode;
	}

	public void setCghsCode(String cghsCode) {
		this.cghsCode = cghsCode;
	}
	
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

	public String getSndtolabflag() {
		return sndtolabflag;
	}

	public void setSndtolabflag(String sndtolabflag) {
		this.sndtolabflag = sndtolabflag;
	}

	public String getSponsorName() {
		return sponsorName;
	}

	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}

	public String getPaidByCashFlag() {
		return paidByCashFlag;
	}

	public void setPaidByCashFlag(String paidByCashFlag) {
		this.paidByCashFlag = paidByCashFlag;
	}

	public Date getServiceDate() {
		return serviceDate;
	}

	public void setServiceDate(Date serviceDate) {
		this.serviceDate = serviceDate;
	}

	public Integer getOtCount() {
		return otCount;
	}

	public void setOtCount(Integer otCount) {
		this.otCount = otCount;
	}

	public String getOtDoctors() {
		return otDoctors;
	}

	public void setOtDoctors(String otDoctors) {
		this.otDoctors = otDoctors;
	}

	public String getOtDoctorNames() {
		return otDoctorNames;
	}

	public void setOtDoctorNames(String otDoctorNames) {
		this.otDoctorNames = otDoctorNames;
	}	
	
	@Column(name = "speciality_id",columnDefinition="int default 0")
	private Integer specialityId;
	
	@Column(name = "sampleTypeId",columnDefinition="int default 0")
	private Integer sampleTypeId=0;
	
	@Column(name = "barCode",columnDefinition="int default 0")
	private String barCode;
	
	@Column(name = "inOutHouse",columnDefinition="int default 0")
	private Integer inOutHouse=0;
	
	@Column(name = "histopathLab",columnDefinition="int default 0")
	private String histopathLab="N";
	
	@Column(name = "sampleCount",columnDefinition="int default 0")
	private Integer sampleCount=0;
	
	@Column(name = "collectionDate",columnDefinition="int default 0")
	private String collectionDate="";	
	
	@Column(name = "collectionTime",columnDefinition="int default 0")
	private String collectionTime="";

	@Column(name = "regRefDocId",columnDefinition="int default 0")
	private Integer regRefDocId = 0;
	
	@Column(name = "templateWise",columnDefinition="int default 0")
	private String templateWise="N";


	public Integer getSpecialityId() {
		return specialityId;
	}

	public void setSpecialityId(Integer specialityId) {
		this.specialityId = specialityId;
	}

	public Integer getSampleTypeId() {
		return sampleTypeId;
	}

	public void setSampleTypeId(Integer sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}

	public String getBarCode() {
		return barCode;
	}

	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}

	public Integer getInOutHouse() {
		return inOutHouse;
	}

	public void setInOutHouse(Integer inOutHouse) {
		this.inOutHouse = inOutHouse;
	}

	public String getHistopathLab() {
		return histopathLab;
	}

	public void setHistopathLab(String histopathLab) {
		this.histopathLab = histopathLab;
	}

	public Integer getSampleCount() {
		return sampleCount;
	}

	public void setSampleCount(Integer sampleCount) {
		this.sampleCount = sampleCount;
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

	public Integer getRegRefDocId() {
		return regRefDocId;
	}

	public void setRegRefDocId(Integer regRefDocId) {
		this.regRefDocId = regRefDocId;
	}

	public String getTemplateWise() {
		return templateWise;
	}

	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
	}
}
