package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryItemMasterItemTypeDTO {

	private Integer inv_item_type_id;
	private String inv_item_type_name;
	private Integer inv_item_type_delete_flag;
	private Date inv_item_type_update;
	private List<InventoryItemMasterItemTypeDTO> ltInventoryItemMasterItemTypeDTOs;
	
	@JsonGetter("inv_item_type_id")
	public Integer getInv_item_type_id() {
		return inv_item_type_id;
	}
	@JsonSetter("inv_item_type_id")
	public void setInv_item_type_id(Integer inv_item_type_id) {
		this.inv_item_type_id = inv_item_type_id;
	}
	@JsonGetter("inv_item_type_name")
	public String getInv_item_type_name() {
		return inv_item_type_name;
	}
	@JsonSetter("inv_item_type_name")
	public void setInv_item_type_name(String inv_item_type_name) {
		this.inv_item_type_name = inv_item_type_name;
	}
	@JsonGetter("inv_item_type_delete_flag")
	public Integer getInv_item_type_delete_flag() {
		return inv_item_type_delete_flag;
	}
	@JsonSetter("inv_item_type_delete_flag")
	public void setInv_item_type_delete_flag(Integer inv_item_type_delete_flag) {
		this.inv_item_type_delete_flag = inv_item_type_delete_flag;
	}
	@JsonGetter("inv_item_type_update")
	public Date getInv_item_type_update() {
		return inv_item_type_update;
	}
	@JsonSetter("inv_item_type_update")
	public void setInv_item_type_update(Date inv_item_type_update) {
		this.inv_item_type_update = inv_item_type_update;
	}
	public List<InventoryItemMasterItemTypeDTO> getLtInventoryItemMasterItemTypeDTOs() {
		return ltInventoryItemMasterItemTypeDTOs;
	}
	public void setLtInventoryItemMasterItemTypeDTOs(
			List<InventoryItemMasterItemTypeDTO> ltInventoryItemMasterItemTypeDTOs) {
		this.ltInventoryItemMasterItemTypeDTOs = ltInventoryItemMasterItemTypeDTOs;
	}
	
	
}
