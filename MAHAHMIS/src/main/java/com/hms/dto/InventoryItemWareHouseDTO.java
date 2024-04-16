package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryItemWareHouseDTO {

	private Integer item_warehouse_id;
	private String item_warehouse_code;
	private String item_warehouse_name;
	private Integer item_warehouse_delete_flag;
    private String item_warehouse_location;
	private String item_warehouse_contactNo;
	private Date item_warehouse_update;
	private Integer item_warehouse_item_id;
	private Integer item_warehouse_default;
	private List<InventoryItemWareHouseDTO> ltInventoryItemWarehouseDetailsDTOs;
	
	@JsonGetter("item_warehouse_id")
	public Integer getItem_warehouse_id() {
		return item_warehouse_id;
	}
	@JsonSetter("item_warehouse_id")
	public void setItem_warehouse_id(Integer item_warehouse_id) {
		this.item_warehouse_id = item_warehouse_id;
	}
    @JsonGetter("item_warehouse_code")
	public String getItem_warehouse_code() {
		return item_warehouse_code;
	}
	@JsonSetter("item_warehouse_code")
	public void setItem_warehouse_code(String item_warehouse_code) {
		this.item_warehouse_code = item_warehouse_code;
	}
	@JsonGetter("item_warehouse_name")
	public String getItem_warehouse_name() {
		return item_warehouse_name;
	}
	@JsonSetter("item_warehouse_name")
	public void setItem_warehouse_name(String item_warehouse_name) {
		this.item_warehouse_name = item_warehouse_name;
	}
    @JsonGetter("item_warehouse_location")
    public String getItem_warehouse_location() {
		return item_warehouse_location;
	}
    @JsonSetter("item_warehouse_location")
	public void setItem_warehouse_location(String item_warehouse_location) {
		this.item_warehouse_location = item_warehouse_location;
	}
    @JsonGetter("item_warehouse_contactNo")
	public String getItem_warehouse_contactNo() {
		return item_warehouse_contactNo;
	}
    @JsonSetter("item_warehouse_contactNo")
	public void setItem_warehouse_contactNo(String item_warehouse_contactNo) {
		this.item_warehouse_contactNo = item_warehouse_contactNo;
	}
	@JsonGetter("item_warehouse_delete_flag")
	public Integer getItem_warehouse_delete_flag() {
		return item_warehouse_delete_flag;
	}
	@JsonSetter("item_warehouse_delete_flag")
	public void setItem_warehouse_delete_flag(Integer item_warehouse_delete_flag) {
		this.item_warehouse_delete_flag = item_warehouse_delete_flag;
	}
	@JsonGetter("item_warehouse_update")
	public Date getItem_warehouse_update() {
		return item_warehouse_update;
	}
	@JsonSetter("item_warehouse_update")
	public void setItem_warehouse_update(Date item_warehouse_update) {
		this.item_warehouse_update = item_warehouse_update;
	}
	
	@JsonGetter("item_warehouse_item_id")
	public Integer getItem_warehouse_item_id() {
		return item_warehouse_item_id;
	}
	@JsonSetter("item_warehouse_item_id")
	public void setItem_warehouse_item_id(Integer item_warehouse_item_id) {
		this.item_warehouse_item_id = item_warehouse_item_id;
	}
	
	@JsonGetter("item_warehouse_default")
	public Integer getItem_warehouse_default() {
		return item_warehouse_default;
	}
	@JsonSetter("item_warehouse_default")
	public void setItem_warehouse_default(Integer item_warehouse_default) {
		this.item_warehouse_default = item_warehouse_default;
	}
	
	public List<InventoryItemWareHouseDTO> getLtInventoryItemWarehouseDetailsDTOs() {
		return ltInventoryItemWarehouseDetailsDTOs;
	}
	public void setLtInventoryItemWarehouseDetailsDTOs(
			List<InventoryItemWareHouseDTO> ltInventoryItemWarehouseDetailsDTOs) {
		this.ltInventoryItemWarehouseDetailsDTOs = ltInventoryItemWarehouseDetailsDTOs;
	}
	
	
	
	
	
	
	
}
