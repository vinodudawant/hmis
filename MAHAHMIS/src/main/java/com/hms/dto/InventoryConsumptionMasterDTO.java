package com.hms.dto;

import java.util.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryConsumptionMasterDTO {
	
	private Integer inv_consumption_master_id;
	private String inv_consumption_master_consumed_by_name;
	private String inv_consumption_master_dispenced_date;
	
	private String inv_consumption_master_dispenced_to_name;
	private Integer  inv_consumption_master_dispenced_to_id;
	
	private String inv_consumption_master_dispenced_to_other_name;
	private Integer inv_consumption_master_total_item_qty ;
	private String inv_consumption_master_remark;
	private String inv_consumption_master_referedTo;
	
	private String inv_consumption_subInventory_name;
	private String inv_consumption_master_patient_name;
	private String inv_consumption_master_patient_id;
	private String inv_consumption_master_patient_Treatment_ID;
	
	private Integer inv_consumption_master_delete_flag;
	private String inv_consumption_master_updated_date;
	
	private String inv_consumption_master_create_date;
	
	private List<InventoryConsumptionMasterDTO> ltInventoryConsumptionMasterDTOs;
	
	private List<InventoryConsumptionItemSlaveDTO>ltInventoryConsumptionItemSlaveDTOs;

	@JsonGetter("inv_consumption_master_id")
	public Integer getInv_consumption_master_id() {
		return inv_consumption_master_id;
	}

	@JsonSetter("inv_consumption_master_id")
	public void setInv_consumption_master_id(Integer inv_consumption_master_id) {
		this.inv_consumption_master_id = inv_consumption_master_id;
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

	@JsonGetter("inv_consumption_master_dispenced_date")
	public String getInv_consumption_master_dispenced_date() {
		return inv_consumption_master_dispenced_date;
	}

	@JsonSetter("inv_consumption_master_dispenced_date")
	public void setInv_consumption_master_dispenced_date(
			String inv_consumption_master_dispenced_date) {
		this.inv_consumption_master_dispenced_date = inv_consumption_master_dispenced_date;
	}

	@JsonGetter("inv_consumption_master_dispenced_to_name")
	public String getInv_consumption_master_dispenced_to_name() {
		return inv_consumption_master_dispenced_to_name;
	}

	@JsonSetter("inv_consumption_master_dispenced_to_name")
	public void setInv_consumption_master_dispenced_to_name(
			String inv_consumption_master_dispenced_to_name) {
		this.inv_consumption_master_dispenced_to_name = inv_consumption_master_dispenced_to_name;
	}
	
	@JsonGetter("inv_consumption_master_dispenced_to_id")
	public Integer getInv_consumption_master_dispenced_to_id() {
		return inv_consumption_master_dispenced_to_id;
	}

	@JsonSetter("inv_consumption_master_dispenced_to_id")
	public void setInv_consumption_master_dispenced_to_id(
			Integer inv_consumption_master_dispenced_to_id) {
		this.inv_consumption_master_dispenced_to_id = inv_consumption_master_dispenced_to_id;
	}

	@JsonGetter("inv_consumption_master_dispenced_to_other_name")
	public String getInv_consumption_master_dispenced_to_other_name() {
		return inv_consumption_master_dispenced_to_other_name;
	}

	@JsonSetter("inv_consumption_master_dispenced_to_other_name")
	public void setInv_consumption_master_dispenced_to_other_name(
			String inv_consumption_master_dispenced_to_other_name) {
		this.inv_consumption_master_dispenced_to_other_name = inv_consumption_master_dispenced_to_other_name;
	}

	@JsonGetter("inv_consumption_master_total_item_qty")
	public Integer getInv_consumption_master_total_item_qty() {
		return inv_consumption_master_total_item_qty;
	}
	@JsonSetter("inv_consumption_master_total_item_qty")
	public void setInv_consumption_master_total_item_qty(
			Integer inv_consumption_master_total_item_qty) {
		this.inv_consumption_master_total_item_qty = inv_consumption_master_total_item_qty;
	}
	@JsonGetter("inv_consumption_master_remark")
	public String getInv_consumption_master_remark() {
		return inv_consumption_master_remark;
	}

	@JsonSetter("inv_consumption_master_remark")
	public void setInv_consumption_master_remark(
			String inv_consumption_master_remark) {
		this.inv_consumption_master_remark = inv_consumption_master_remark;
	}

	@JsonGetter("inv_consumption_master_referedTo")
	public String getInv_consumption_master_referedTo() {
		return inv_consumption_master_referedTo;
	}
	@JsonSetter("inv_consumption_master_referedTo")
	public void setInv_consumption_master_referedTo(
			String inv_consumption_master_referedTo) {
		this.inv_consumption_master_referedTo = inv_consumption_master_referedTo;
	}
	@JsonGetter("inv_consumption_master_patient_name")
	public String getInv_consumption_master_patient_name() {
		return inv_consumption_master_patient_name;
	}
	@JsonSetter("inv_consumption_master_patient_name")
	public void setInv_consumption_master_patient_name(
			String inv_consumption_master_patient_name) {
		this.inv_consumption_master_patient_name = inv_consumption_master_patient_name;
	}

	@JsonGetter("inv_consumption_master_patient_id")
	public String getInv_consumption_master_patient_id() {
		return inv_consumption_master_patient_id;
	}

	@JsonSetter("inv_consumption_master_patient_id")
	public void setInv_consumption_master_patient_id(
			String inv_consumption_master_patient_id) {
		this.inv_consumption_master_patient_id = inv_consumption_master_patient_id;
	}
	@JsonGetter("inv_consumption_master_delete_flag")
	public Integer getInv_consumption_master_delete_flag() {
		return inv_consumption_master_delete_flag;
	}

	@JsonSetter("inv_consumption_master_delete_flag")
	public void setInv_consumption_master_delete_flag(
			Integer inv_consumption_master_delete_flag) {
		this.inv_consumption_master_delete_flag = inv_consumption_master_delete_flag;
	}

	@JsonGetter("inv_consumption_master_updated_date")
	public String getInv_consumption_master_updated_date() {
		return inv_consumption_master_updated_date;
	}

	@JsonSetter("inv_consumption_master_updated_date")
	public void setInv_consumption_master_updated_date(
			String inv_consumption_master_updated_date) {
		this.inv_consumption_master_updated_date = inv_consumption_master_updated_date;
	}
	
	@JsonGetter("inv_consumption_master_create_date")
	public String getInv_consumption_master_create_date() {
		return inv_consumption_master_create_date;
	}
	@JsonSetter("inv_consumption_master_create_date")
	public void setInv_consumption_master_create_date(
			String inv_consumption_master_create_date) {
		this.inv_consumption_master_create_date = inv_consumption_master_create_date;
	}
    //@JsonIgnore
	@JsonGetter("ltInventoryConsumptionMasterDTOs")
	public List<InventoryConsumptionMasterDTO> getLtInventoryConsumptionMasterDTOs() {
		return ltInventoryConsumptionMasterDTOs;
	}
	@JsonSetter("ltInventoryConsumptionMasterDTOs")
	public void setLtInventoryConsumptionMasterDTOs(
			List<InventoryConsumptionMasterDTO> ltInventoryConsumptionMasterDTOs) {
		this.ltInventoryConsumptionMasterDTOs = ltInventoryConsumptionMasterDTOs;
	}

	@JsonGetter("ltInventoryConsumptionItemSlaveDTOs")
	public List<InventoryConsumptionItemSlaveDTO> getLtInventoryConsumptionItemSlaveDTOs() {
		return ltInventoryConsumptionItemSlaveDTOs;
	}
	@JsonSetter("ltInventoryConsumptionMasterDTOs")
	public void setLtInventoryConsumptionItemSlaveDTOs(
			List<InventoryConsumptionItemSlaveDTO> ltInventoryConsumptionItemSlaveDTOs) {
		this.ltInventoryConsumptionItemSlaveDTOs = ltInventoryConsumptionItemSlaveDTOs;
	}

	@JsonGetter("inv_consumption_master_patient_Treatment_ID")
	public String getInv_consumption_master_patient_Treatment_ID() {
		return inv_consumption_master_patient_Treatment_ID;
	}
	@JsonSetter("inv_consumption_master_patient_Treatment_ID")
	public void setInv_consumption_master_patient_Treatment_ID(
			String inv_consumption_master_patient_Treatment_ID) {
		this.inv_consumption_master_patient_Treatment_ID = inv_consumption_master_patient_Treatment_ID;
	}
	
	@JsonGetter("inv_consumption_subInventory_name")
	public String getInv_consumption_subInventory_name() {
		return inv_consumption_subInventory_name;
	}

	@JsonSetter("inv_consumption_subInventory_name")
	public void setInv_consumption_subInventory_name(
			String inv_consumption_subInventory_name) {
		this.inv_consumption_subInventory_name = inv_consumption_subInventory_name;
	}
	 
	
	

}
