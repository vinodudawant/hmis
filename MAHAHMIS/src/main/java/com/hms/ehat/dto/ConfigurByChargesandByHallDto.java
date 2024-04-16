package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@NamedNativeQueries({
	@NamedNativeQuery(
	name = "callStockStoreProcedure",
	query = "CALL ehat_config_sev_byspnid_byhallid(:chargesId ,:chargesSlaveId, :HallId, :HallSlaveId, :deleted)",
	resultClass = ConfigurByChargesandByHallDto.class
	)
})

@Entity
@Table(name="ehat_config_sev_byspnid_byhallid")
@Immutable
public class ConfigurByChargesandByHallDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private int idConfig;
	
	@Column(name = "charges_id")
	private int chargesId;
	

	@Column(name = "chargesSlave_id")
	private int chargesSlaveId;

	@Column(name = "hall_id")
	private int HallId;
	

	@Column(name = "hallSlave_id")
	private int HallSlaveId;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "service_id")
	private int subserviceId;
	
	@Column(name = "charges")
	private double charges;

	
	
	@Transient
	private List<ConfigurByChargesandByHallDto> lstConfigurByHallIdandChargesId;

	
	


	public int getIdConfig() {
		return idConfig;
	}

	public void setIdConfig(int idConfig) {
		this.idConfig = idConfig;
	}

	public int getSubserviceId() {
		return subserviceId;
	}

	public void setSubserviceId(int subserviceId) {
		this.subserviceId = subserviceId;
	}

	
	public List<ConfigurByChargesandByHallDto> getLstConfigurByHallIdandChargesId() {
		return lstConfigurByHallIdandChargesId;
	}

	public void setLstConfigurByHallIdandChargesId(
			List<ConfigurByChargesandByHallDto> lstConfigurByHallIdandChargesId) {
		this.lstConfigurByHallIdandChargesId = lstConfigurByHallIdandChargesId;
	}

	
	public int getChargesId() {
		return chargesId;
	}

	public void setChargesId(int chargesId) {
		this.chargesId = chargesId;
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

	public int getHallSlaveId() {
		return HallSlaveId;
	}

	public void setHallSlaveId(int hallSlaveId) {
		HallSlaveId = hallSlaveId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	

	public double getCharges() {
		return charges;
	}

	public void setCharges(double charges) {
		this.charges = charges;
	}

	
	
	
}
