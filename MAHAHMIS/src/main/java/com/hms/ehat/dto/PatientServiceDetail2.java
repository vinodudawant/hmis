package com.hms.ehat.dto;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "patient_service_detail2")
public class PatientServiceDetail2 {
	
	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	@Column(name = "service_name")
	private String serviceName;

	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "amount")
	private Double amount;
	
	@Column(name = "other_amount")
	private Double otherAmount;
	
	@Column(name = "service_count")
	private BigInteger serviceCount;
	
	@Column(name = "iscombination")
	private String isCombination;
	
	@Transient
	private List<TreatmentDto> listTreatment;
	
	@Transient
	private List<PatientServiceDetail2> listBillNobleDto;
	
	/*--------------------------Getter And Setters-----------------------------*/

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

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public BigInteger getServiceCount() {
		return serviceCount;
	}

	public void setServiceCount(BigInteger serviceCount) {
		this.serviceCount = serviceCount;
	}

	public List<TreatmentDto> getListTreatment() {
		return listTreatment;
	}

	public void setListTreatment(List<TreatmentDto> listTreatment) {
		this.listTreatment = listTreatment;
	}

	public List<PatientServiceDetail2> getListBillNobleDto() {
		return listBillNobleDto;
	}

	public void setListBillNobleDto(List<PatientServiceDetail2> listBillNobleDto) {
		this.listBillNobleDto = listBillNobleDto;
	}

	public Double getOtherAmount() {
		return otherAmount;
	}

	public void setOtherAmount(Double otherAmount) {
		this.otherAmount = otherAmount;
	}

	public String getIsCombination() {
		return isCombination;
	}

	public void setIsCombination(String isCombination) {
		this.isCombination = isCombination;
	}




}