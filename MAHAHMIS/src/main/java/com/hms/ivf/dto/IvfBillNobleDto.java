package com.hms.ivf.dto;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

import com.hms.ehat.dto.TreatmentDto;

@Entity 
@Immutable
@Table(name = "ivf_patient_service_detail")
public class IvfBillNobleDto {
	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	@Column(name = "service_name")
	private String serviceName;

	@Column(name = "service_id")
	private Integer serviceId;
	 
	@Column(name = "iscombination")
	private String isCombination;
	 
	@Column(name = "amount")
	private Double amount;
	
	@Column(name = "other_amount")
	private Double otherAmount;
	
	@Column(name = "service_count")
	private BigInteger serviceCount;
	
	@Transient
	private List<TreatmentDto> listTreatment;
	
	@Transient
	private List<IvfBillNobleDto> listBillNobleDto;

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

	public String getIsCombination() {
		return isCombination;
	}

	public void setIsCombination(String isCombination) {
		this.isCombination = isCombination;
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

	public List<TreatmentDto> getListTreatment() {
		return listTreatment;
	}

	public void setListTreatment(List<TreatmentDto> listTreatment) {
		this.listTreatment = listTreatment;
	}

	public List<IvfBillNobleDto> getListBillNobleDto() {
		return listBillNobleDto;
	}

	public void setListBillNobleDto(List<IvfBillNobleDto> listBillNobleDto) {
		this.listBillNobleDto = listBillNobleDto;
	}
}
