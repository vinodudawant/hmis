package com.hms.opdbill.dto;

import java.math.BigInteger;
import java.util.List;

import com.hms.ehat.dto.TreatmentDto;

public class PatientServiceDetailsDto {
	
	private Integer treatmentId;
	
	private Integer billDetailsId;
	
	private String serviceName;

	private Integer serviceId;
	
	private Integer unitId;
	 
	private String isCombination;
	
	private String iscombination;
	 
	private Double amount;
	
	private Double otherAmount;
	
	private BigInteger serviceCount;
	
	private String tFlag;
	
	private List<TreatmentDto> listTreatment;
	
	private List<PatientServiceDetailsDto> listBillNobleDto;
	
	private List<PatientServiceDetailsDto> listServiceIpdDto;
	
	//Added By Akshata
	
	private String drdeskflag;

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

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public Integer getServiceId() {
		return serviceId;
	}

	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Double getOtherAmount() {
		return otherAmount;
	}

	public void setOtherAmount(Double otherAmount) {
		this.otherAmount = otherAmount;
	}

	public BigInteger getServiceCount() {
		return serviceCount;
	}

	public void setServiceCount(BigInteger serviceCount) {
		this.serviceCount = serviceCount;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	public List<TreatmentDto> getListTreatment() {
		return listTreatment;
	}

	public void setListTreatment(List<TreatmentDto> listTreatment) {
		this.listTreatment = listTreatment;
	}

	public List<PatientServiceDetailsDto> getListBillNobleDto() {
		return listBillNobleDto;
	}

	public void setListBillNobleDto(List<PatientServiceDetailsDto> listBillNobleDto) {
		this.listBillNobleDto = listBillNobleDto;
	}

	public List<PatientServiceDetailsDto> getListServiceIpdDto() {
		return listServiceIpdDto;
	}

	public void setListServiceIpdDto(List<PatientServiceDetailsDto> listServiceIpdDto) {
		this.listServiceIpdDto = listServiceIpdDto;
	}

	public String getDrdeskflag() {
		return drdeskflag;
	}

	public void setDrdeskflag(String drdeskflag) {
		this.drdeskflag = drdeskflag;
	}
	
	
	
}
