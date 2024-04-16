package com.hms.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryTaxSetUpDTO{

	private Integer tax_id;
	private String tax_code;
	private String tax_description;
	private Double tax_rate;
	private Integer tax_delete_flag;
	private Date tax_update_date;
	
	private List<InventoryTaxSetUpDTO> inventoryTaxSetUps;

	@JsonGetter("tax_id")
	public Integer getTaxId() {
		return tax_id;
	}
	@JsonSetter("tax_id")
	public void setTaxId(Integer tax_id) {
		this.tax_id = tax_id;
	}
	@JsonGetter("tax_code")
	public String getTaxCode() {
		return tax_code;
	}
	@JsonSetter("tax_code")
	public void setTaxCode(String tax_code) {
		this.tax_code = tax_code;
	}
	@JsonGetter("tax_description")
	public String getTaxDescription() {
		return tax_description;
	}
	@JsonSetter("tax_description")
	public void setTaxDescription(String tax_description) {
		this.tax_description = tax_description;
	}
	@JsonGetter("tax_rate")
	public Double getTaxRate() {
		return tax_rate;
	}
	@JsonSetter("tax_rate")
	public void setTaxRate(Double tax_rate) {
		this.tax_rate = tax_rate;
	}
	@JsonGetter("tax_delete_flag")
	public Integer getTaxDeleteFlag() {
		return tax_delete_flag;
	}
	@JsonSetter("tax_delete_flag")
	public void setTaxDeleteFlag(Integer tax_delete_flag) {
		this.tax_delete_flag = tax_delete_flag;
	}
	@JsonGetter("tax_update_date")
	public Date getTaxUpdateDate() {
		return tax_update_date;
	}
	@JsonSetter("tax_update_date")
	public void setTaxUpdateDate(Date tax_update_date) {
		this.tax_update_date = tax_update_date;
	}
	@JsonGetter("inventoryTaxSetUps")
	public List<InventoryTaxSetUpDTO> getInventoryTaxSetUps() {
		return inventoryTaxSetUps;
	}
	@JsonSetter("inventoryTaxSetUps")
	public void setInventoryTaxSetUps(List<InventoryTaxSetUpDTO> inventoryTaxSetUps) {
		this.inventoryTaxSetUps = inventoryTaxSetUps;
	}
	
	
}
