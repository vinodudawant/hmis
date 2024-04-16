package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class CathTrolley {

	private int cath_trolley_id;
	private int item_id;
	private int min_qty;
	private int avl_qty;
	private String heading;

	private List<CathTrolley> cathTrolleyList;

	private List<ItemMaster> itemMasterList;

	@JsonGetter("iml")
	public List<ItemMaster> getItemMasterList() {
		return itemMasterList;
	}

	@JsonSetter("iml")
	public void setItemMasterList(List<ItemMaster> itemMasterList) {
		this.itemMasterList = itemMasterList;
	}

	@JsonGetter("ctid")
	public int getCath_trolley_id() {
		return cath_trolley_id;
	}

	@JsonSetter("ctid")
	public void setCath_trolley_id(int cath_trolley_id) {
		this.cath_trolley_id = cath_trolley_id;
	}

	@JsonGetter("iid")
	public int getItem_id() {
		return item_id;
	}

	@JsonSetter("iid")
	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}

	@JsonGetter("mqty")
	public int getMin_qty() {
		return min_qty;
	}

	@JsonSetter("mqty")
	public void setMin_qty(int min_qty) {
		this.min_qty = min_qty;
	}

	@JsonGetter("aqty")
	public int getAvl_qty() {
		return avl_qty;
	}

	@JsonSetter("aqty")
	public void setAvl_qty(int avl_qty) {
		this.avl_qty = avl_qty;
	}

	@JsonGetter("hed")
	public String getHeading() {
		return heading;
	}

	@JsonSetter("hed")
	public void setHeading(String heading) {
		this.heading = heading;
	}

	@JsonGetter("ctl")
	public List<CathTrolley> getCathTrolleyList() {
		return cathTrolleyList;
	}

	@JsonSetter("ctl")
	public void setCathTrolleyList(List<CathTrolley> cathTrolleyList) {
		this.cathTrolleyList = cathTrolleyList;
	}

}
