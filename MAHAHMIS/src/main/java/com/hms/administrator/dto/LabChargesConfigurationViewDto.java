package com.hms.administrator.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity
@Table(name="lab_charges_configuration_view")
@Immutable
public class LabChargesConfigurationViewDto {

	@Id
	@Column(name = "id_configuration")
	private int idConfiguration;
	
	@Column(name = "customer_type_id")
	private int custTypeId;
	
	@Column(name = "customer_type" )
	private String customerType;
	
	@Column(name = "customer_name_id")
	private int custNameId;
	
	@Column(name = "customer_name" )
	private String customerName;
	
	@Column(name = "package_name" )
	private String packageName;
	
	@Column(name = "unit_name" )
	private String unitName;
	
	@Column(name = "sub_service_id", columnDefinition="int default 0")
	private Integer subserviceId;

	@Column(name = " service_id",columnDefinition="int default 0")
	private Integer serviceId;
	
	@Column(name = "is_com_servId", columnDefinition="int default 0")
	private Integer comServId;
	
	@Column(name = "is_com_servlastId", columnDefinition="int default 0")
	private Integer comServLastId;
	
	@Transient
    private List<LabChargesConfigurationViewDto> lstConfigurations;

	public int getIdConfiguration() {
		return idConfiguration;
	}

	public void setIdConfiguration(int idConfiguration) {
		this.idConfiguration = idConfiguration;
	}

	public int getCustTypeId() {
		return custTypeId;
	}

	public void setCustTypeId(int custTypeId) {
		this.custTypeId = custTypeId;
	}

	public String getCustomerType() {
		return customerType;
	}

	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}

	public int getCustNameId() {
		return custNameId;
	}

	public void setCustNameId(int custNameId) {
		this.custNameId = custNameId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public Integer getSubserviceId() {
		return subserviceId;
	}

	public void setSubserviceId(Integer subserviceId) {
		this.subserviceId = subserviceId;
	}

	public Integer getServiceId() {
		return serviceId;
	}

	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	public Integer getComServId() {
		return comServId;
	}

	public void setComServId(Integer comServId) {
		this.comServId = comServId;
	}

	public Integer getComServLastId() {
		return comServLastId;
	}

	public void setComServLastId(Integer comServLastId) {
		this.comServLastId = comServLastId;
	}

	public List<LabChargesConfigurationViewDto> getLstConfigurations() {
		return lstConfigurations;
	}

	public void setLstConfigurations(List<LabChargesConfigurationViewDto> lstConfigurations) {
		this.lstConfigurations = lstConfigurations;
	}		
}
