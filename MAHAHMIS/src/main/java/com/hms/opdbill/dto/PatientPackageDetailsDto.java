package com.hms.opdbill.dto;

import java.util.Date;
import java.util.List;

public class PatientPackageDetailsDto {
	
	private Integer otherBillDetailsId;
	
	private Integer treatmentId;
	
	private Integer billDetailsId;
	
	private Integer patienttId;
	
	private Integer departmentId;
	
	private Integer serviceId;
	
	private Integer subServiceId;
	
	private Integer childSubServiceId;
	
	private Integer unitId;
	
	private Integer docId;
	
	private String docName;
	
	private double rate;
	
	private double amount;
	
	private double quantity;
	
	private String paidFlag="N";
	
	private double pay;
	
	private double coPay;
	
	private double concession;
	
	private String cancle="N";
	
	private String isModify;
	
	private Date createdDateTime;
	
	private String categoryName;
	
	private Integer chargesId;
	
	private Integer chargesSlaveId;
	
	private String extraFlag;
	
	private String iscombination;
	
	private Integer childServiceId;
	
	private double otherAmount;
	
	private double otherRate;
	
	private double otherPay;
	
	private double otherConcession;
	
	private double otherCoPay;
	
	private int sampleTypeId;
	
	private String barcode;
	
	private String histopathLab;
	
	private String templateWise;
	
	private int inOutHouse;
	
	private List<PatientPackageDetailsDto> listOpdPackageDto;

	private List<PatientPackageDetailsDto> listIpdPackageDto;

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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	public Integer getChildServiceId() {
		return childServiceId;
	}

	public void setChildServiceId(Integer childServiceId) {
		this.childServiceId = childServiceId;
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

	public int getSampleTypeId() {
		return sampleTypeId;
	}

	public void setSampleTypeId(int sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public String getHistopathLab() {
		return histopathLab;
	}

	public void setHistopathLab(String histopathLab) {
		this.histopathLab = histopathLab;
	}

	public String getTemplateWise() {
		return templateWise;
	}

	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
	}

	public int getInOutHouse() {
		return inOutHouse;
	}

	public void setInOutHouse(int inOutHouse) {
		this.inOutHouse = inOutHouse;
	}

	public List<PatientPackageDetailsDto> getListOpdPackageDto() {
		return listOpdPackageDto;
	}

	public void setListOpdPackageDto(List<PatientPackageDetailsDto> listOpdPackageDto) {
		this.listOpdPackageDto = listOpdPackageDto;
	}

	public List<PatientPackageDetailsDto> getListIpdPackageDto() {
		return listIpdPackageDto;
	}

	public void setListIpdPackageDto(List<PatientPackageDetailsDto> listIpdPackageDto) {
		this.listIpdPackageDto = listIpdPackageDto;
	}
}
