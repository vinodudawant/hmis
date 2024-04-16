package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryItemOtherDetailsDTO {

	private Integer inv_item_other_info_id;
	private String item_other_info_topic;
	private String item_other_info_description_category;
	private String item_other_info_file;
	private String item_other_info_note;
	private Integer item_other_delete_flag;
	private List<InventoryItemOtherDetailsDTO> ltInventoryItemOtherDetailsDTOs;
	private Date item_other_update;
	private Integer item_other_item_id;
	
	@JsonGetter("inv_item_other_info_id")
	public Integer getInv_item_other_info_id() {
		return inv_item_other_info_id;
	}
	@JsonSetter("inv_item_other_info_id")
	public void setInv_item_other_info_id(Integer inv_item_other_info_id) {
		this.inv_item_other_info_id = inv_item_other_info_id;
	}
	@JsonGetter("item_other_info_topic")
	public String getItem_other_info_topic() {
		return item_other_info_topic;
	}
	@JsonSetter("item_other_info_topic")
	public void setItem_other_info_topic(String item_other_info_topic) {
		this.item_other_info_topic = item_other_info_topic;
	}
	@JsonGetter("item_other_info_description_category")
	public String getItem_other_info_description_category() {
		return item_other_info_description_category;
	}
	@JsonSetter("item_other_info_description_category")
	public void setItem_other_info_description_category(
			String item_other_info_description_category) {
		this.item_other_info_description_category = item_other_info_description_category;
	}
	@JsonGetter("item_other_info_file")
	public String getItem_other_info_file() {
		return item_other_info_file;
	}
	@JsonSetter("item_other_info_file")
	public void setItem_other_info_file(String item_other_info_file) {
		this.item_other_info_file = item_other_info_file;
	}
	@JsonGetter("item_other_info_note")
	public String getItem_other_info_note() {
		return item_other_info_note;
	}
	@JsonSetter("item_other_info_note")
	public void setItem_other_info_note(String item_other_info_note) {
		this.item_other_info_note = item_other_info_note;
	}
	@JsonGetter("item_other_delete_flag")
	public Integer getItem_other_delete_flag() {
		return item_other_delete_flag;
	}
	@JsonSetter("item_other_delete_flag")
	public void setItem_other_delete_flag(Integer item_other_delete_flag) {
		this.item_other_delete_flag = item_other_delete_flag;
	}
	@JsonGetter("item_other_update")
	public Date getItem_other_update() {
		return item_other_update;
	}
	@JsonSetter("item_other_update")
	public void setItem_other_update(Date item_other_update) {
		this.item_other_update = item_other_update;
	}
	@JsonGetter("item_other_item_id")
	public Integer getItem_other_item_id() {
		return item_other_item_id;
	}
	@JsonSetter("item_other_item_id")
	public void setItem_other_item_id(Integer item_other_item_id) {
		this.item_other_item_id = item_other_item_id;
	}
	public List<InventoryItemOtherDetailsDTO> getLtInventoryItemOtherDetailsDTOs() {
		return ltInventoryItemOtherDetailsDTOs;
	}
	public void setLtInventoryItemOtherDetailsDTOs(
			List<InventoryItemOtherDetailsDTO> ltInventoryItemOtherDetailsDTOs) {
		this.ltInventoryItemOtherDetailsDTOs = ltInventoryItemOtherDetailsDTOs;
	}
	
	
}
