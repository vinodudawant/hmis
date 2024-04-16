package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class SubInventoryDTO {
	private Integer subinventory_Id;
	private String subinventory_name;
	private String subinventory_location;
	private String inv_subInventory_contact_no;
	
	private String subInventorystatus;
	private List<SubInventoryDTO> ltSubInventoryDTO;
	
	@JsonGetter("subinventory_Id")
	public Integer getSubinventory_Id() {
		return subinventory_Id;
	}
	@JsonSetter("subinventory_Id")
	public void setSubinventory_Id(Integer subinventory_Id) {
		this.subinventory_Id = subinventory_Id;
	}
	@JsonGetter("subinventory_name")
	public String getSubinventory_name() {
		return subinventory_name;
	}
	@JsonSetter("subinventory_name")
	public void setSubinventory_name(String subinventory_name) {
		this.subinventory_name = subinventory_name;
	}
	@JsonGetter("subinventory_location")
	public String getSubinventory_location() {
		return subinventory_location;
	}
	@JsonSetter("subinventory_location")
	public void setSubinventory_location(String subinventory_location) {
		this.subinventory_location = subinventory_location;
	}
	@JsonGetter("subInventorystatus")
	public String getSubInventorystatus() {
		return subInventorystatus;
	}
	@JsonSetter("subInventorystatus")
	public void setSubInventorystatus(String subInventorystatus) {
		this.subInventorystatus = subInventorystatus;
	}
	
	@JsonGetter("inv_subInventory_contact_no")
	public String getInv_subInventory_contact_no() {
		return inv_subInventory_contact_no;
	}
	@JsonSetter("inv_subInventory_contact_no")
	public void setInv_subInventory_contact_no(String inv_subInventory_contact_no) {
		this.inv_subInventory_contact_no = inv_subInventory_contact_no;
	}
	@JsonGetter("ltSubInventoryDTO")
	public List<SubInventoryDTO> getLtSubInventoryDTO() {
		return ltSubInventoryDTO;
	}
	@JsonSetter("ltSubInventoryDTO")
	public void setLtSubInventoryDTO(List<SubInventoryDTO> ltSubInventoryDTO) {
		this.ltSubInventoryDTO = ltSubInventoryDTO;
	}
	 

	 
}
