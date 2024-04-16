package com.hms.dto;

import java.sql.Date;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryPurchaseCommonFrightDetails {
	private Integer inv_purchase_common_fright_details_id;
	private Integer inv_purchase_common_fright_code;
	private String inv_purchase_common_fright_name;
	private String inv_purchase_common_fright_distribution;
	private Double inv_purchase_common_fright_amount;
	private String inv_purchase_common_fright_taxcode;
	private Double inv_purchase_common_fright_tax_amount;
	private Integer inv_purchase_common_fright_delete_flag;
	private Date inv_purchase_common_fright_update_date;
	
	@JsonGetter("inv_purchase_common_fright_details_id")
	public Integer getInv_purchase_common_fright_details_id() {
		return inv_purchase_common_fright_details_id;
	}
	@JsonSetter("inv_purchase_common_fright_details_id")
	public void setInv_purchase_common_fright_details_id(
			Integer inv_purchase_common_fright_details_id) {
		this.inv_purchase_common_fright_details_id = inv_purchase_common_fright_details_id;
	}
	@JsonGetter("inv_purchase_common_fright_code")
	public Integer getInv_purchase_common_fright_code() {
		return inv_purchase_common_fright_code;
	}
	@JsonSetter("inv_purchase_common_fright_code")
	public void setInv_purchase_common_fright_code(
			Integer inv_purchase_common_fright_code) {
		this.inv_purchase_common_fright_code = inv_purchase_common_fright_code;
	}
	@JsonGetter("inv_purchase_common_fright_name")
	public String getInv_purchase_common_fright_name() {
		return inv_purchase_common_fright_name;
	}
	@JsonSetter("inv_purchase_common_fright_name")
	public void setInv_purchase_common_fright_name(
			String inv_purchase_common_fright_name) {
		this.inv_purchase_common_fright_name = inv_purchase_common_fright_name;
	}
	@JsonGetter("inv_purchase_common_fright_distribution")
	public String getInv_purchase_common_fright_distribution() {
		return inv_purchase_common_fright_distribution;
	}
	@JsonSetter("inv_purchase_common_fright_distribution")
	public void setInv_purchase_common_fright_distribution(
			String inv_purchase_common_fright_distribution) {
		this.inv_purchase_common_fright_distribution = inv_purchase_common_fright_distribution;
	}
	@JsonGetter("inv_purchase_common_fright_amount")
	public Double getInv_purchase_common_fright_amount() {
		return inv_purchase_common_fright_amount;
	}
	@JsonSetter("inv_purchase_common_fright_amount")
	public void setInv_purchase_common_fright_amount(
			Double inv_purchase_common_fright_amount) {
		this.inv_purchase_common_fright_amount = inv_purchase_common_fright_amount;
	}
	@JsonGetter("inv_purchase_common_fright_taxcode")
	public String getInv_purchase_common_fright_taxcode() {
		return inv_purchase_common_fright_taxcode;
	}
	@JsonSetter("inv_purchase_common_fright_taxcode")
	public void setInv_purchase_common_fright_taxcode(
			String inv_purchase_common_fright_taxcode) {
		this.inv_purchase_common_fright_taxcode = inv_purchase_common_fright_taxcode;
	}
	@JsonGetter("inv_purchase_common_fright_tax_amount")
	public Double getInv_purchase_common_fright_tax_amount() {
		return inv_purchase_common_fright_tax_amount;
	}
	@JsonSetter("inv_purchase_common_fright_tax_amount")
	public void setInv_purchase_common_fright_tax_amount(
			Double inv_purchase_common_fright_tax_amount) {
		this.inv_purchase_common_fright_tax_amount = inv_purchase_common_fright_tax_amount;
	}
	@JsonGetter("inv_purchase_common_fright_delete_flag")
	public Integer getInv_purchase_common_fright_delete_flag() {
		return inv_purchase_common_fright_delete_flag;
	}
	@JsonSetter("inv_purchase_common_fright_delete_flag")
	public void setInv_purchase_common_fright_delete_flag(
			Integer inv_purchase_common_fright_delete_flag) {
		this.inv_purchase_common_fright_delete_flag = inv_purchase_common_fright_delete_flag;
	}
	@JsonGetter("inv_purchase_common_fright_update_date")
	public Date getInv_purchase_common_fright_update_date() {
		return inv_purchase_common_fright_update_date;
	}
	@JsonSetter("inv_purchase_common_fright_update_date")
	public void setInv_purchase_common_fright_update_date(
			Date inv_purchase_common_fright_update_date) {
		this.inv_purchase_common_fright_update_date = inv_purchase_common_fright_update_date;
	}
	
	
	
}
