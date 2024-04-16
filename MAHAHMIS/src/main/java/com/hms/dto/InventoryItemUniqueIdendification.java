package com.hms.dto;

import java.math.BigDecimal;
import java.util.List;

public class InventoryItemUniqueIdendification {
	
	private Integer  inv_item_unique_identification_id;
	private Integer item_id ;
	private String  inv_item_unique_identification_sir_no ;
	private String  inv_item_unique_identification_location_name ;
	
	private Integer inv_item_unique_identification_delete_flag ;
	private String inv_item_unique_identification_update_date;
	private String inv_item_unique_identification_create_date ;
	private String inv_item_unique_identification_deleted_date;

	private String inv_item_unique_identification_deleted_by_name ;
	private String inv_item_unique_identification_updated_by_name;
	private String inv_item_unique_identification_updated_date_time;
	private String inv_cheked_or_unchecheked_falg;
	
	private BigDecimal inv_batch_stock_fixed_item_qty;
	private String inv_batch_item_name;
	
	public String getInv_batch_item_name() {
		return inv_batch_item_name;
	}
	public void setInv_batch_item_name(String inv_batch_item_name) {
		this.inv_batch_item_name = inv_batch_item_name;
	}
	
	public BigDecimal getInv_batch_stock_fixed_item_qty() {
		return inv_batch_stock_fixed_item_qty;
	}
	public void setInv_batch_stock_fixed_item_qty(
			BigDecimal inv_batch_stock_fixed_item_qty) {
		this.inv_batch_stock_fixed_item_qty = inv_batch_stock_fixed_item_qty;
	}
	 
	private List<InventoryItemUniqueIdendification> ltInventoryItemUniqueIdendifications;
		
	public List<InventoryItemUniqueIdendification> getLtInventoryItemUniqueIdendifications() {
		return ltInventoryItemUniqueIdendifications;
	}
	public void setLtInventoryItemUniqueIdendifications(
			List<InventoryItemUniqueIdendification> ltInventoryItemUniqueIdendifications) {
		this.ltInventoryItemUniqueIdendifications = ltInventoryItemUniqueIdendifications;
	}
	
	public Integer getInv_item_unique_identification_id() {
		return inv_item_unique_identification_id;
	}
	public void setInv_item_unique_identification_id(
			Integer inv_item_unique_identification_id) {
		this.inv_item_unique_identification_id = inv_item_unique_identification_id;
	}
	public Integer getItem_id() {
		return item_id;
	}
	public void setItem_id(Integer item_id) {
		this.item_id = item_id;
	}
	public String getInv_item_unique_identification_sir_no() {
		return inv_item_unique_identification_sir_no;
	}
	public void setInv_item_unique_identification_sir_no(
			String inv_item_unique_identification_sir_no) {
		this.inv_item_unique_identification_sir_no = inv_item_unique_identification_sir_no;
	}
	public String getInv_item_unique_identification_location_name() {
		return inv_item_unique_identification_location_name;
	}
	public void setInv_item_unique_identification_location_name(
			String inv_item_unique_identification_location_name) {
		this.inv_item_unique_identification_location_name = inv_item_unique_identification_location_name;
	}
	public Integer getInv_item_unique_identification_delete_flag() {
		return inv_item_unique_identification_delete_flag;
	}
	public void setInv_item_unique_identification_delete_flag(
			Integer inv_item_unique_identification_delete_flag) {
		this.inv_item_unique_identification_delete_flag = inv_item_unique_identification_delete_flag;
	}
	public String getInv_item_unique_identification_update_date() {
		return inv_item_unique_identification_update_date;
	}
	public void setInv_item_unique_identification_update_date(
			String inv_item_unique_identification_update_date) {
		this.inv_item_unique_identification_update_date = inv_item_unique_identification_update_date;
	}
	public String getInv_item_unique_identification_create_date() {
		return inv_item_unique_identification_create_date;
	}
	public void setInv_item_unique_identification_create_date(
			String inv_item_unique_identification_create_date) {
		this.inv_item_unique_identification_create_date = inv_item_unique_identification_create_date;
	}
	public String getInv_item_unique_identification_deleted_date() {
		return inv_item_unique_identification_deleted_date;
	}
	public void setInv_item_unique_identification_deleted_date(
			String inv_item_unique_identification_deleted_date) {
		this.inv_item_unique_identification_deleted_date = inv_item_unique_identification_deleted_date;
	}
	public String getInv_item_unique_identification_deleted_by_name() {
		return inv_item_unique_identification_deleted_by_name;
	}
	public void setInv_item_unique_identification_deleted_by_name(
			String inv_item_unique_identification_deleted_by_name) {
		this.inv_item_unique_identification_deleted_by_name = inv_item_unique_identification_deleted_by_name;
	}
	public String getInv_item_unique_identification_updated_by_name() {
		return inv_item_unique_identification_updated_by_name;
	}
	public void setInv_item_unique_identification_updated_by_name(
			String inv_item_unique_identification_updated_by_name) {
		this.inv_item_unique_identification_updated_by_name = inv_item_unique_identification_updated_by_name;
	}
	public String getInv_item_unique_identification_updated_date_time() {
		return inv_item_unique_identification_updated_date_time;
	}
	public void setInv_item_unique_identification_updated_date_time(
			String inv_item_unique_identification_updated_date_time) {
		this.inv_item_unique_identification_updated_date_time = inv_item_unique_identification_updated_date_time;
	}
	public String getInv_cheked_or_unchecheked_falg() {
		return inv_cheked_or_unchecheked_falg;
	}
	public void setInv_cheked_or_unchecheked_falg(
			String inv_cheked_or_unchecheked_falg) {
		this.inv_cheked_or_unchecheked_falg = inv_cheked_or_unchecheked_falg;
	}
	
	
	
	
	
	 
}
