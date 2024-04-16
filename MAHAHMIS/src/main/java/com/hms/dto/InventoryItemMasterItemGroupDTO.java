package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryItemMasterItemGroupDTO {

	private Integer inv_item_group_id;
	private String inv_item_group_name;
	private Integer inv_item_group_delete_flag;
	private Date inv_item_group_update;
	private List<InventoryItemMasterItemGroupDTO> ltInventoryItemMasterItemGroupDTOs;
	@JsonGetter("inv_item_group_id")
	public Integer getInv_item_group_id() {
		return inv_item_group_id;
	}
	@JsonSetter("inv_item_group_id")
	public void setInv_item_group_id(Integer inv_item_group_id) {
		this.inv_item_group_id = inv_item_group_id;
	}
	@JsonGetter("inv_item_group_name")
	public String getInv_item_group_name() {
		return inv_item_group_name;
	}
	@JsonSetter("inv_item_group_name")
	public void setInv_item_group_name(String inv_item_group_name) {
		this.inv_item_group_name = inv_item_group_name;
	}
	@JsonGetter("inv_item_group_delete_flag")
	public Integer getInv_item_group_delete_flag() {
		return inv_item_group_delete_flag;
	}
	@JsonSetter("inv_item_group_delete_flag")
	public void setInv_item_group_delete_flag(Integer inv_item_group_delete_flag) {
		this.inv_item_group_delete_flag = inv_item_group_delete_flag;
	}
	@JsonGetter("inv_item_group_update")
	public Date getInv_item_group_update() {
		return inv_item_group_update;
	}
	@JsonSetter("inv_item_group_update")
	public void setInv_item_group_update(Date inv_item_group_update) {
		this.inv_item_group_update = inv_item_group_update;
	}
	public List<InventoryItemMasterItemGroupDTO> getLtInventoryItemMasterItemGroupDTOs() {
		return ltInventoryItemMasterItemGroupDTOs;
	}
	public void setLtInventoryItemMasterItemGroupDTOs(
			List<InventoryItemMasterItemGroupDTO> ltInventoryItemMasterItemGroupDTOs) {
		this.ltInventoryItemMasterItemGroupDTOs = ltInventoryItemMasterItemGroupDTOs;
	}
	
	
}
