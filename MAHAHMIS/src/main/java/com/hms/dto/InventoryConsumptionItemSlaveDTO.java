package com.hms.dto;

import java.util.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryConsumptionItemSlaveDTO {
	private Integer inv_consumption_item_info_slave_id;
	private Integer inv_consumption_master_id;
	private  String  inv_consumption_info_slave_item_name;
	private Integer inv_consumption_item_info_slave_item_code ;
	private Integer inv_consumption_item_info_slave_item_qty;
	private  String inv_consumption_item_info_slave_uom;
	private  String  inv_consumption_master_consumed_by_name;
	
	private String inv_consumption_item_info_consumption_status;
	private Integer inv_consumption_item_info_slave_delete_flag;
	private Date inv_consumption_item_info_slave_update_date;
	private Date inv_consumption_item_info_slave_create_date;
	
	private List<InventoryConsumptionItemSlaveDTO>ltInventoryConsumptionItemSlaveDTOs;

	@JsonGetter("inv_consumption_item_info_slave_id")
	public Integer getInv_consumption_item_info_slave_id() {
		return inv_consumption_item_info_slave_id;
	}

	@JsonSetter("inv_consumption_item_info_slave_id")
	public void setInv_consumption_item_info_slave_id(
			Integer inv_consumption_item_info_slave_id) {
		this.inv_consumption_item_info_slave_id = inv_consumption_item_info_slave_id;
	}

	@JsonGetter("inv_consumption_master_id")
	public Integer getInv_consumption_master_id() {
		return inv_consumption_master_id;
	}

	@JsonSetter("inv_consumption_master_id")
	public void setInv_consumption_master_id(Integer inv_consumption_master_id) {
		this.inv_consumption_master_id = inv_consumption_master_id;
	}

	@JsonGetter("inv_consumption_info_slave_item_name")
	public String getInv_consumption_info_slave_item_name() {
		return inv_consumption_info_slave_item_name;
	}

	@JsonSetter("inv_consumption_info_slave_item_name")
	public void setInv_consumption_info_slave_item_name(
			String inv_consumption_info_slave_item_name) {
		this.inv_consumption_info_slave_item_name = inv_consumption_info_slave_item_name;
	}

	@JsonGetter("inv_consumption_item_info_slave_item_code")
	public Integer getInv_consumption_item_info_slave_item_code() {
		return inv_consumption_item_info_slave_item_code;
	}

	@JsonSetter("inv_consumption_item_info_slave_item_code")
	public void setInv_consumption_item_info_slave_item_code(
			Integer inv_consumption_item_info_slave_item_code) {
		this.inv_consumption_item_info_slave_item_code = inv_consumption_item_info_slave_item_code;
	}

	@JsonGetter("inv_consumption_item_info_slave_item_qty")
	public Integer getInv_consumption_item_info_slave_item_qty() {
		return inv_consumption_item_info_slave_item_qty;
	}

	@JsonSetter("inv_consumption_item_info_slave_item_qty")
	public void setInv_consumption_item_info_slave_item_qty(
			Integer inv_consumption_item_info_slave_item_qty) {
		this.inv_consumption_item_info_slave_item_qty = inv_consumption_item_info_slave_item_qty;
	}

	@JsonGetter("inv_consumption_item_info_slave_uom")
	public String getInv_consumption_item_info_slave_uom() {
		return inv_consumption_item_info_slave_uom;
	}

	@JsonSetter("inv_consumption_item_info_slave_uom")
	public void setInv_consumption_item_info_slave_uom(
			String inv_consumption_item_info_slave_uom) {
		this.inv_consumption_item_info_slave_uom = inv_consumption_item_info_slave_uom;
	}

	@JsonGetter("inv_consumption_master_consumed_by_name")
	public String getInv_consumption_master_consumed_by_name() {
		return inv_consumption_master_consumed_by_name;
	}

	@JsonSetter("inv_consumption_master_consumed_by_name")
	public void setInv_consumption_master_consumed_by_name(
			String inv_consumption_master_consumed_by_name) {
		this.inv_consumption_master_consumed_by_name = inv_consumption_master_consumed_by_name;
	}

	@JsonGetter("inv_consumption_item_info_consumption_status")
	public String getInv_consumption_item_info_consumption_status() {
		return inv_consumption_item_info_consumption_status;
	}
	@JsonSetter("inv_consumption_item_info_consumption_status")
	public void setInv_consumption_item_info_consumption_status(
			String inv_consumption_item_info_consumption_status) {
		this.inv_consumption_item_info_consumption_status = inv_consumption_item_info_consumption_status;
	}

	@JsonGetter("inv_consumption_item_info_slave_delete_flag")
	public Integer getInv_consumption_item_info_slave_delete_flag() {
		return inv_consumption_item_info_slave_delete_flag;
	}

	@JsonSetter("setInv_consumption_item_info_slave_delete_flag")
	public void setInv_consumption_item_info_slave_delete_flag(
			Integer inv_consumption_item_info_slave_delete_flag) {
		this.inv_consumption_item_info_slave_delete_flag = inv_consumption_item_info_slave_delete_flag;
	}

	@JsonGetter("inv_consumption_item_info_slave_update_date")
	public Date getInv_consumption_item_info_slave_update_date() {
		return inv_consumption_item_info_slave_update_date;
	}

	@JsonSetter("inv_consumption_item_info_slave_update_date")
	public void setInv_consumption_item_info_slave_update_date(
			Date inv_consumption_item_info_slave_update_date) {
		this.inv_consumption_item_info_slave_update_date = inv_consumption_item_info_slave_update_date;
	}

	@JsonGetter("inv_consumption_item_info_slave_create_date")
	public Date getInv_consumption_item_info_slave_create_date() {
		return inv_consumption_item_info_slave_create_date;
	}

	@JsonSetter("inv_consumption_item_info_slave_create_date")
	public void setInv_consumption_item_info_slave_create_date(
			Date inv_consumption_item_info_slave_create_date) {
		this.inv_consumption_item_info_slave_create_date = inv_consumption_item_info_slave_create_date;
	}

	@JsonGetter("ltInventoryConsumptionItemSlaveDTOs")
	public List<InventoryConsumptionItemSlaveDTO> getLtInventoryConsumptionItemSlaveDTOs() {
		return ltInventoryConsumptionItemSlaveDTOs;
	}

	@JsonSetter("ltInventoryConsumptionItemSlaveDTOs")
	public void setLtInventoryConsumptionItemSlaveDTOs(
			List<InventoryConsumptionItemSlaveDTO> ltInventoryConsumptionItemSlaveDTOs) {
		this.ltInventoryConsumptionItemSlaveDTOs = ltInventoryConsumptionItemSlaveDTOs;
	}
	
	
}

 