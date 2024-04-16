package com.hms.dto;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryFinancialYearDTO{

	private Integer fin_year_id;
	
	private String fin_year_start_date;
	private String fin_year_end_date;
	private String fin_year;
	private Integer fin_delete_flag;
	private String fin_update_date;
	
	private List<InventoryFinancialYearDTO> inventoryFinancialYears;
	

	@JsonGetter("fin_year_id")
	public Integer getFinYearId() {
		return fin_year_id;
	}
	@JsonSetter("fin_year_id")
	public void setFinYearId(Integer fin_year_id) {
		this.fin_year_id = fin_year_id;
	}
	@JsonGetter("fin_year_start_date")
	public String getFinYearStartDate() {
		return fin_year_start_date;
	}
	@JsonSetter("fin_year_start_date")
	public void setFinYearStartDate(String fin_year_start_date) {
		this.fin_year_start_date = fin_year_start_date;
	}
	@JsonGetter("fin_year_end_date")
	public String getFinYearEndDate() {
		return fin_year_end_date;
	}
	@JsonSetter("fin_year_end_date")
	public void setFinYearEndDate(String fin_year_end_date) {
		this.fin_year_end_date = fin_year_end_date;
	}
	@JsonGetter("fin_year")
	public String getFinYear() {
		return fin_year;
	}
	@JsonSetter("fin_year")
	public void setFinYear(String fin_year) {
		this.fin_year = fin_year;
	}
	@JsonGetter("fin_delete_flag")
	public Integer getFinDeleteFlag() {
		return fin_delete_flag;
	}
	@JsonSetter("fin_delete_flag")
	public void setFinDeleteFlag(Integer fin_delete_flag) {
		this.fin_delete_flag = fin_delete_flag;
	}
	@JsonGetter("fin_update_date")
	public String getFinUpdateDate() {
		return fin_update_date;
	}
	@JsonSetter("fin_update_date")
	public void setFinUpdateDate(String fin_update_date) {
		this.fin_update_date = fin_update_date;
	}
	@JsonGetter("inventoryFinancialYears")
	public List<InventoryFinancialYearDTO> getInventory_Financial_Years() {
		return inventoryFinancialYears;
	}
	@JsonSetter("inventoryFinancialYears")
	public void setInventory_Financial_Years(
			List<InventoryFinancialYearDTO> inventoryFinancialYears) {
		this.inventoryFinancialYears = inventoryFinancialYears;
	}
	
	
}
