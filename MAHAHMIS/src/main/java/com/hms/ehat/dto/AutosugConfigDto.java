package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "ehat_configuration_charges_default_view")
public class AutosugConfigDto implements Serializable{

	@Id
	@Column(name = "id_configurations")
	private int configId;
	
	
	@Column(name = "subservice_id")
	private int subServiceId;
	
	
	@Column(name = "charges")
	private double charges;
	
	
	@Column(name = "chargesDefault")
	private double chargesDefault;
	
	
	@Column(name = "subService")
	private String subServiceName;

	
	@Column(name = "hall_id")
	private int hallId;
	
	@Column(name = "hallSlave_id")
	private int hallSlaveId;
	
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "unitid")
	private int unitId;
	
	@Column(name = "deptid")
	private int deptId;
	
	@Column(name = "service_name")
	private String serviceName;
	
	@Column(name = "category_deleted")
	private String categoryDeleted; 
	
	@Column(name = "charges_sponsor_id")
	private int sponsorId; 
	
	@Column(name = "chargesSlave_auto_id")
	private int chargesSlaveId; 
	
	@Column(name = "iscombination")
	private String iscombination;
	
	@Column(name = " is_com_servId")
	private Integer isComServId;

	@Column(name = " is_com_servlastId")
	private Integer isComServlastId;
	
	/*@Column(name = "c_deleted")
	private String deleted;*/ 
	
	/*@Column(name = "iscategory")
	private String iscategory;*/
	
	@Transient
    private List<AutosugConfigDto> lstchargesConfig;
	

	public List<AutosugConfigDto> getLstchargesConfig() {
		return lstchargesConfig;
	}

	public void setLstchargesConfig(List<AutosugConfigDto> lstchargesConfig) {
		this.lstchargesConfig = lstchargesConfig;
	}

	public int getConfigId() {
		return configId;
	}

	public void setConfigId(int configId) {
		this.configId = configId;
	}

	public int getSubServiceId() {
		return subServiceId;
	}

	public void setSubServiceId(int subServiceId) {
		this.subServiceId = subServiceId;
	}

	public double getCharges() {
		return charges;
	}

	public void setCharges(double charges) {
		this.charges = charges;
	}

	public double getChargesDefault() {
		return chargesDefault;
	}

	public void setChargesDefault(double chargesDefault) {
		this.chargesDefault = chargesDefault;
	}

	public String getSubServiceName() {
		return subServiceName;
	}

	public void setSubServiceName(String subServiceName) {
		this.subServiceName = subServiceName;
	}

	

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public int getHallId() {
		return hallId;
	}

	public void setHallId(int hallId) {
		this.hallId = hallId;
	}

	public int getHallSlaveId() {
		return hallSlaveId;
	}

	public void setHallSlaveId(int hallSlaveId) {
		this.hallSlaveId = hallSlaveId;
	}

	public String getCategoryDeleted() {
		return categoryDeleted;
	}

	public void setCategoryDeleted(String categoryDeleted) {
		this.categoryDeleted = categoryDeleted;
	}

	public int getSponsorId() {
		return sponsorId;
	}

	public void setSponsorId(int sponsorId) {
		this.sponsorId = sponsorId;
	}

	public int getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(int chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public String getIscombination() {
		return iscombination;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public Integer getIsComServId() {
		return isComServId;
	}

	public void setIsComServId(Integer isComServId) {
		this.isComServId = isComServId;
	}

	public Integer getIsComServlastId() {
		return isComServlastId;
	}

	public void setIsComServlastId(Integer isComServlastId) {
		this.isComServlastId = isComServlastId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	

	
}
