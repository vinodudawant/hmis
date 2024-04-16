package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity
@Table(name="ehat_config_hall_view")
@Immutable
public class ConfigHallWiseDto {

	@Id
	@Column(name = "id_configuration")
	private int idConfiguration;
	
	@Column(name = "sponsor_id")
	private int chargesId;
	
	@Column(name = "sponsor_name" )
	private String chargesName;
	
	@Column(name = "sponsor_slave_name" )
	private String categoryName;
	
	
	@Column(name = "sponsor_slave_id")
	private int chargesSlaveId;

	@Column(name = "hall_id")
	private int HallId;
	
	@Column(name = "hall_name" )
	private String HallName;
	
	@Column(name = "hall_slave_name")
	private String HallSlaveName;
	
	
	@Column(name = "hallSlave_id")
	private int HallSlaveId;

	@Column(name = " is_com_servId" ,columnDefinition="int default 0")
	private Integer isComServId;

	@Column(name = " is_com_servlastId",columnDefinition="int default 0")
	private Integer isComServlastId;
	
	@Column(name = "sub_service_id", columnDefinition="int default 0")
	private Integer subserviceId;

	@Column(name = " service_id",columnDefinition="int default 0")
	private Integer serviceId;
	
	@Column(name = "com_slave_name")
	private String subServicename;
	
	@Column(name = "combination_name")
	private String combinationName;
	
	@Transient
    private List<ConfigHallWiseDto> lstConfigurations;

	public int getIdConfiguration() {
		return idConfiguration;
	}

	public void setIdConfiguration(int idConfiguration) {
		this.idConfiguration = idConfiguration;
	}

	public int getChargesId() {
		return chargesId;
	}

	public void setChargesId(int chargesId) {
		this.chargesId = chargesId;
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

	public String getHallName() {
		return HallName;
	}

	public void setHallName(String hallName) {
		HallName = hallName;
	}

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

	public String getSubServicename() {
		return subServicename;
	}

	public void setSubServicename(String subServicename) {
		this.subServicename = subServicename;
	}

	public String getCombinationName() {
		return combinationName;
	}

	public void setCombinationName(String combinationName) {
		this.combinationName = combinationName;
	}

	public List<ConfigHallWiseDto> getLstConfigurations() {
		return lstConfigurations;
	}

	public void setLstConfigurations(List<ConfigHallWiseDto> lstConfigurations) {
		this.lstConfigurations = lstConfigurations;
	}
	
	
}
