package com.hms.dto;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

import com.hms.ehat.dto.BillNobleDto;
import com.hms.ehat.dto.TreatmentDto;

@Entity 
@Immutable
@Table(name = "patient_service_detail_For_Opd_Sponsor")
public class BillNobleDtoForOpdSponsor {

	
	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	@Column(name = "other_bill_details_id_for_Opd")
	private Integer otherBillDetailsIdForOpd;
	
	@Column(name = "service_name")
	private String serviceName;

	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "amount")
	private Double amount;
	
	@Column(name = "service_count")
	private BigInteger serviceCount;
	
	
	@Transient
	private List<TreatmentDto> listTreatment;
	
	@Transient
	private List<BillNobleDtoForOpdSponsor> listBillNobleDtoForOpdSponsor;




	public List<BillNobleDtoForOpdSponsor> getListBillNobleDtoForOpdSponsor() {
		return listBillNobleDtoForOpdSponsor;
	}


	public void setListBillNobleDtoForOpdSponsor(
			List<BillNobleDtoForOpdSponsor> listBillNobleDtoForOpdSponsor) {
		this.listBillNobleDtoForOpdSponsor = listBillNobleDtoForOpdSponsor;
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


	public Integer getTreatmentId() {
		return treatmentId;
	}


	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}


	public Double getAmount() {
		return amount;
	}


	public void setAmount(Double amount) {
		this.amount = amount;
	}



	
	public Integer getBillDetailsId() {
		return billDetailsId;
	}


	public void setBillDetailsId(Integer billDetailsId) {
		this.billDetailsId = billDetailsId;
	}

	public List<TreatmentDto> getListTreatment() {
		return listTreatment;
	}


	public void setListTreatment(List<TreatmentDto> listTreatment) {
		this.listTreatment = listTreatment;
	}


	public BigInteger getServiceCount() {
		return serviceCount;
	}


	public void setServiceCount(BigInteger serviceCount) {
		this.serviceCount = serviceCount;
	}


	public Integer getOtherBillDetailsIdForOpd() {
		return otherBillDetailsIdForOpd;
	}


	public void setOtherBillDetailsIdForOpd(Integer otherBillDetailsIdForOpd) {
		this.otherBillDetailsIdForOpd = otherBillDetailsIdForOpd;
	}


}

