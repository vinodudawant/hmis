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
@Table(name = "patient_sub_service_details_for_package")
public class PatientSubServiceDetailsForPackage {
	
	
	@Id
	@Column(name = "sub_service_id")
	private Integer subSubServiceId;
	
	@Column(name = "rate")
	private Double rate;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "id_charges_slave")
	private Integer chargesSlaveId;
	
	@Column(name = "charges_id")
	private Integer chargesId;
	
	
	@Column(name = "is_com_servId")
	private Integer serviceId;
	
	@Column(name = "hall_id")
	private Integer hallId;
	
	@Column(name = "hallSlave_id")
	private Integer hallSlaveId;
	
	@Column(name = "is_com_servlastId")
	private Integer subServiceId;
	
	
	@Transient
	private List<PatientSubServiceDetailsForPackage> listPackage;


	public Integer getSubSubServiceId() {
		return subSubServiceId;
	}


	public void setSubSubServiceId(Integer subSubServiceId) {
		this.subSubServiceId = subSubServiceId;
	}


	public Double getRate() {
		return rate;
	}


	public void setRate(Double rate) {
		this.rate = rate;
	}


	public String getCategoryName() {
		return categoryName;
	}


	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}


	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}


	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}




	public Integer getChargesId() {
		return chargesId;
	}


	public void setChargesId(Integer chargesId) {
		this.chargesId = chargesId;
	}


	public Integer getServiceId() {
		return serviceId;
	}


	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}


	public Integer getHallId() {
		return hallId;
	}


	public void setHallId(Integer hallId) {
		this.hallId = hallId;
	}


	public Integer getHallSlaveId() {
		return hallSlaveId;
	}


	public void setHallSlaveId(Integer hallSlaveId) {
		this.hallSlaveId = hallSlaveId;
	}


	public Integer getSubServiceId() {
		return subServiceId;
	}


	public void setSubServiceId(Integer subServiceId) {
		this.subServiceId = subServiceId;
	}


	public List<PatientSubServiceDetailsForPackage> getListPackage() {
		return listPackage;
	}


	public void setListPackage(List<PatientSubServiceDetailsForPackage> listPackage) {
		this.listPackage = listPackage;
	}


	}
	
	
