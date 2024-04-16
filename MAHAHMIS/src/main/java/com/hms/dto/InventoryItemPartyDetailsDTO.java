package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryItemPartyDetailsDTO {

	private Integer inv_item_party_details;

	private Integer party_id;
	private Integer inv_item_master_id;
	private Integer inv_item_party_delete_flag;
	private Date inv_item_party_update_date;
	
	private InventoryItemPartyDetailsDTO inventoryItemPartyDetailsDTO2; 
	private List<InventoryItemPartyDetailsDTO> inventoryItemPartyDetailsDTO;
	
	@JsonGetter("inv_item_party_details")
	public Integer getInv_item_party_details() {
		return inv_item_party_details;
	}
	@JsonSetter("inv_item_party_details")
	public void setInv_item_party_details(Integer inv_item_party_details) {
		this.inv_item_party_details = inv_item_party_details;
	}
	@JsonGetter("party_id")
	public Integer getParty_id() {
		return party_id;
	}
	@JsonSetter("party_id")
	public void setParty_id(Integer party_id) {
		this.party_id = party_id;
	}
	@JsonGetter("inv_item_master_id")
	public Integer getInv_item_master_id() {
		return inv_item_master_id;
	}
	@JsonSetter("inv_item_master_id")
	public void setInv_item_master_id(Integer inv_item_master_id) {
		this.inv_item_master_id = inv_item_master_id;
	}
	public List<InventoryItemPartyDetailsDTO> getInventoryItemPartyDetailsDTO() {
		return inventoryItemPartyDetailsDTO;
	}
	public void setInventoryItemPartyDetailsDTO(
			List<InventoryItemPartyDetailsDTO> inventoryItemPartyDetailsDTO) {
		this.inventoryItemPartyDetailsDTO = inventoryItemPartyDetailsDTO;
	}
	public InventoryItemPartyDetailsDTO getInventoryItemPartyDetailsDTO2() {
		return inventoryItemPartyDetailsDTO2;
	}
	public void setInventoryItemPartyDetailsDTO2(
			InventoryItemPartyDetailsDTO inventoryItemPartyDetailsDTO2) {
		this.inventoryItemPartyDetailsDTO2 = inventoryItemPartyDetailsDTO2;
	}
	@JsonGetter("inv_item_party_delete_flag")
	public Integer getInv_item_party_delete_flag() {
		return inv_item_party_delete_flag;
	}
	@JsonSetter("inv_item_party_delete_flag")
	public void setInv_item_party_delete_flag(Integer inv_item_party_delete_flag) {
		this.inv_item_party_delete_flag = inv_item_party_delete_flag;
	}
	@JsonGetter("inv_item_party_update_date")
	public Date getInv_item_party_update_date() {
		return inv_item_party_update_date;
	}
	@JsonSetter("inv_item_party_update_date")
	public void setInv_item_party_update_date(Date inv_item_party_update_date) {
		this.inv_item_party_update_date = inv_item_party_update_date;
	}
	
	
}
