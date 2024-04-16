package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity
@Table(name="ehat_configuration_Registration_services_view")
@Immutable
public class ConfigurationRegistrationChargesViewDto {

	@Id
	@Column(name = "id_configuration")
	private int idConfiguration;
	
	@Column(name = "charges_name" )
	private String chargesName;
	
	@Column(name = "category_name" )
	private String categoryName;
	
	@Column(name = "HallSlave_name")
	private String HallSlaveName;

	@Column(name = "id_charges_slave")
	private int chargesSlaveId;
	
	@Column(name = "Hall_id")
	private int HallId;
	
	@Column(name = "HallSlave_id")
	private int HallSlaveId;

	@Column(name = "sub_service_id", columnDefinition="int default 0")
	private Integer subserviceId;
	
	
	/*
	 * @Column(name = "charges_id") private int chargesId;
	 * 
	 * @Column(name = "Hall_name" ) private String HallName;
	 * 
	 * @Column(name = " is_com_servId" ,columnDefinition="int default 0") private
	 * Integer isComServId;
	 * 
	 * @Column(name = " is_com_servlastId",columnDefinition="int default 0") private
	 * Integer isComServlastId;
	 * 
	 * 
	 * 
	 * @Column(name = " service_id",columnDefinition="int default 0") private
	 * Integer serviceId;
	 * 
	 * @Column(name = "subService_name") private String subServicename;
	 * 
	 * @Column(name = "combination_name") private String combinationName;
	 */
	
	@Transient
    private List<ConfigurationRegistrationChargesViewDto> lstConfigurations;

	public int getIdConfiguration() {
		return idConfiguration;
	}

	public void setIdConfiguration(int idConfiguration) {
		this.idConfiguration = idConfiguration;
	}

	

	public String getChargesName() {
		return chargesName;
	}

	public void setChargesName(String chargesName) {
		this.chargesName = chargesName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public int getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(int chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	
	public int getHallId() {
		return HallId;
	}

	public void setHallId(int hallId) {
		HallId = hallId;
	}

	/*
	 * public String getHallName() { return HallName; }
	 * 
	 * public void setHallName(String hallName) { HallName = hallName; }
	 */
	public String getHallSlaveName() {
		return HallSlaveName;
	}

	public void setHallSlaveName(String hallSlaveName) {
		HallSlaveName = hallSlaveName;
	}

	public int getHallSlaveId() {
		return HallSlaveId;
	}

	public void setHallSlaveId(int hallSlaveId) {
		HallSlaveId = hallSlaveId;
	}


	public List<ConfigurationRegistrationChargesViewDto> getLstConfigurations() {
		return lstConfigurations;
	}

	public void setLstConfigurations(List<ConfigurationRegistrationChargesViewDto> lstConfigurations) {
		this.lstConfigurations = lstConfigurations;
	}

	

	public Integer getSubserviceId() {
		return subserviceId;
	}

	public void setSubserviceId(Integer subserviceId) {
		this.subserviceId = subserviceId;
	}


	

}
