package com.hms.opdbill.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

public class PatientSubServiceDetailsDto {
	
	private Integer treatmentId;
	
	private Integer billDetailsId;
	
	private Integer serviceId;
	
	private Integer subServiceId;
	
	private Integer chargesSlaveId;
	
	private Integer unitId;
	
	private String categoryName;
	
	private String bedHall;
	
	private Date bedDate;
	
	private BigInteger hallID;
	
	private Integer specialityId;
	
	private Number docId;
	
	private String docName;
	
	private String isCombination;
	
	private String iscombination;

	private double rate;
	
	private double charges;
	
	private double otherRate;
	
	private double otherAmount;
	
	private double otherPay;
	
	private double otherConcession;
	
	private double otherCoPay;

	private double amount;
	
	private double concessionOnPerc;
	
	private double concessionPer;
	
	private String drdeskflag;

	private double quantity;
	
	private String paidFlag="N";
	
	private String sndtolabflag;
	
	private String paidByCashFlag;
	
	private Integer sampleTypeId=0;
	
	private String barCode;
	
	private Integer inOutHouse=0;
	
	private String histopathLab="N";
	
	private Integer sampleCount=0;
	
	private String collectionDate="";	
	
	private String collectionTime="";

	private Integer regRefDocId = 0;
	
	private String templateWise="N";
	
	private String invName;
	
	private double pay;
	
	private double coPay;
	
	private double concession;
	
	private String cancle="N";
	
	private String isModify;
	
	private String cghsCode;
	
	private Date createdDateTime;
	
	private Date createdDate;
	
	private double emrPer;
	
	private String sndtorisflag;
	
	private String serviceName;
	
	private String otFlag;
	
	private String OName;
	
	private String template_wise;
	
	private String clinical_notes;
	
	private String instructions;
	
	private Integer count_ot;
	
	private String deleteFrom;
	
	@Transient
	private Integer test_status;  
	
	
	@Transient
	private String verifyFlag;  
	
	
	
	public String getVerifyFlag() {
		return verifyFlag;
	}

	public void setVerifyFlag(String verifyFlag) {
		this.verifyFlag = verifyFlag;
	}

	public Integer getTest_status() {
		return test_status;
	}

	public void setTest_status(Integer test_status) {
		this.test_status = test_status;
	}

	private List<PatientSubServiceDetailsDto> listBillNobleServiceDto;
	
	private List<PatientSubServiceDetailsDto> listSubServiceIpdDto;
	
	//Added By Akshata
	private List<PatientSubServiceDetailsDto> listSubServiceInventoryDto;

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

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getBedHall() {
		return bedHall;
	}

	public void setBedHall(String bedHall) {
		this.bedHall = bedHall;
	}

	public Date getBedDate() {
		return bedDate;
	}

	public void setBedDate(Date bedDate) {
		this.bedDate = bedDate;
	}

	public BigInteger getHallID() {
		return hallID;
	}

	public void setHallID(BigInteger hallID) {
		this.hallID = hallID;
	}

	public Integer getSpecialityId() {
		return specialityId;
	}

	public void setSpecialityId(Integer specialityId) {
		this.specialityId = specialityId;
	}

	public Number getDocId() {
		return docId;
	}

	public void setDocId(Number docId) {
		this.docId = docId;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public String getIsCombination() {
		return isCombination;
	}

	public void setIsCombination(String isCombination) {
		this.isCombination = isCombination;
	}

	public String getIscombination() {
		return iscombination;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public double getCharges() {
		return charges;
	}

	public void setCharges(double charges) {
		this.charges = charges;
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

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double getConcessionOnPerc() {
		return concessionOnPerc;
	}

	public void setConcessionOnPerc(double concessionOnPerc) {
		this.concessionOnPerc = concessionOnPerc;
	}

	public String getDrdeskflag() {
		return drdeskflag;
	}

	public void setDrdeskflag(String drdeskflag) {
		this.drdeskflag = drdeskflag;
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

	public String getSndtolabflag() {
		return sndtolabflag;
	}

	public void setSndtolabflag(String sndtolabflag) {
		this.sndtolabflag = sndtolabflag;
	}

	public String getPaidByCashFlag() {
		return paidByCashFlag;
	}

	public void setPaidByCashFlag(String paidByCashFlag) {
		this.paidByCashFlag = paidByCashFlag;
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

	public String getInvName() {
		return invName;
	}

	public void setInvName(String invName) {
		this.invName = invName;
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

	public String getCghsCode() {
		return cghsCode;
	}

	public void setCghsCode(String cghsCode) {
		this.cghsCode = cghsCode;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
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

	public List<PatientSubServiceDetailsDto> getListBillNobleServiceDto() {
		return listBillNobleServiceDto;
	}

	public void setListBillNobleServiceDto(List<PatientSubServiceDetailsDto> listBillNobleServiceDto) {
		this.listBillNobleServiceDto = listBillNobleServiceDto;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public List<PatientSubServiceDetailsDto> getListSubServiceIpdDto() {
		return listSubServiceIpdDto;
	}

	public void setListSubServiceIpdDto(List<PatientSubServiceDetailsDto> listSubServiceIpdDto) {
		this.listSubServiceIpdDto = listSubServiceIpdDto;
	}

	public double getConcessionPer() {
		return concessionPer;
	}

	public void setConcessionPer(double concessionPer) {
		this.concessionPer = concessionPer;
	}

	public String getOtFlag() {
		return otFlag;
	}

	public void setOtFlag(String otFlag) {
		this.otFlag = otFlag;
	}

	public String getOName() {
		return OName;
	}

	public void setOName(String oName) {
		OName = oName;
	}

	public List<PatientSubServiceDetailsDto> getListSubServiceInventoryDto() {
		return listSubServiceInventoryDto;
	}

	public void setListSubServiceInventoryDto(List<PatientSubServiceDetailsDto> listSubServiceInventoryDto) {
		this.listSubServiceInventoryDto = listSubServiceInventoryDto;
	}

	/**
	 * @return the template_wise
	 */
	public String getTemplate_wise() {
		return template_wise;
	}

	/**
	 * @param template_wise the template_wise to set
	 */
	public void setTemplate_wise(String template_wise) {
		this.template_wise = template_wise;
	}

	public String getClinical_notes() {
		return clinical_notes;
	}

	public void setClinical_notes(String clinical_notes) {
		this.clinical_notes = clinical_notes;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public Integer getCount_ot() {
		return count_ot;
	}

	public void setCount_ot(Integer count_ot) {
		this.count_ot = count_ot;
	}	

	public String getDeleteFrom() {
		return deleteFrom;
	}

	public void setDeleteFrom(String deleteFrom) {
		this.deleteFrom = deleteFrom;
	}

	@Override
	public String toString() {
		return "PatientSubServiceDetailsDto [treatmentId=" + treatmentId + ", billDetailsId=" + billDetailsId
				+ ", serviceId=" + serviceId + ", subServiceId=" + subServiceId + ", chargesSlaveId=" + chargesSlaveId
				+ ", unitId=" + unitId + ", categoryName=" + categoryName + ", bedHall=" + bedHall + ", bedDate="
				+ bedDate + ", hallID=" + hallID + ", specialityId=" + specialityId + ", docId=" + docId + ", docName="
				+ docName + ", isCombination=" + isCombination + ", iscombination=" + iscombination + ", rate=" + rate
				+ ", charges=" + charges + ", otherRate=" + otherRate + ", otherAmount=" + otherAmount + ", otherPay="
				+ otherPay + ", otherConcession=" + otherConcession + ", otherCoPay=" + otherCoPay + ", amount="
				+ amount + ", concessionOnPerc=" + concessionOnPerc + ", concessionPer=" + concessionPer
				+ ", drdeskflag=" + drdeskflag + ", quantity=" + quantity + ", paidFlag=" + paidFlag + ", sndtolabflag="
				+ sndtolabflag + ", paidByCashFlag=" + paidByCashFlag + ", sampleTypeId=" + sampleTypeId + ", barCode="
				+ barCode + ", inOutHouse=" + inOutHouse + ", histopathLab=" + histopathLab + ", sampleCount="
				+ sampleCount + ", collectionDate=" + collectionDate + ", collectionTime=" + collectionTime
				+ ", regRefDocId=" + regRefDocId + ", templateWise=" + templateWise + ", invName=" + invName + ", pay="
				+ pay + ", coPay=" + coPay + ", concession=" + concession + ", cancle=" + cancle + ", isModify="
				+ isModify + ", cghsCode=" + cghsCode + ", createdDateTime=" + createdDateTime + ", createdDate="
				+ createdDate + ", emrPer=" + emrPer + ", sndtorisflag=" + sndtorisflag + ", serviceName=" + serviceName
				+ ", otFlag=" + otFlag + ", OName=" + OName + ", template_wise=" + template_wise + ", clinical_notes="
				+ clinical_notes + ", instructions=" + instructions + ", count_ot=" + count_ot + ", deleteFrom="
				+ deleteFrom + ", listBillNobleServiceDto=" + listBillNobleServiceDto + ", listSubServiceIpdDto="
				+ listSubServiceIpdDto + ", listSubServiceInventoryDto=" + listSubServiceInventoryDto + "]";
	}

}
