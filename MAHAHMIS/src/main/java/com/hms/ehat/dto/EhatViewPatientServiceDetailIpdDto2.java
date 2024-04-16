package com.hms.ehat.dto;

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
@Table(name="ehat_view_patient_service_detail_ipd2")
@Immutable
public class EhatViewPatientServiceDetailIpdDto2 {
	
	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	@Column(name = "service_name")
	private String serviceName;
	
	@Column(name = "paid_flag")
	private String paidFlag="N";

	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "amount")
	private Double amount;
	
	@Column(name = "other_amount")
	private double otherAmount;
	
	@Column(name = "service_count")
	private BigInteger serviceCount;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time")
	private Date createdDateTime;
	
	@Transient
	private List<EhatViewPatientServiceDetailIpdDto2> listServiceIpdDto;
/*---------------------------Setter And Getters-----------------------------*/

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

	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
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

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public List<EhatViewPatientServiceDetailIpdDto2> getListServiceIpdDto() {
		return listServiceIpdDto;
	}

	public void setListServiceIpdDto(
			List<EhatViewPatientServiceDetailIpdDto2> listServiceIpdDto) {
		this.listServiceIpdDto = listServiceIpdDto;
	}

	public double getOtherAmount() {
		return otherAmount;
	}

	public void setOtherAmount(double otherAmount) {
		this.otherAmount = otherAmount;
	}
	
	
}
