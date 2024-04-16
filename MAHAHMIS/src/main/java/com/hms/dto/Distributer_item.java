package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Distributer_item {

	private int dis_item_ID;
	private int dis_ID;
	private int item_ID;
	private float Price;
	private List<Distributer_item> Distributer_itemList;
	ItemMaster objItemMaster = new ItemMaster();
	private List<ItemMaster> ItemList;
	@JsonGetter("objIM")
	public ItemMaster getObjItemMaster() {
		return objItemMaster;
	}
	@JsonSetter("objIM")
	public void setObjItemMaster(ItemMaster objItemMaster) {
		this.objItemMaster = objItemMaster;
	}
	@JsonGetter("ditl")
	public List<ItemMaster> getItemList() {
		return ItemList;
	}
	@JsonSetter("ditl")
	public void setItemList(List<ItemMaster> itemList) {
		ItemList = itemList;
	}

	@JsonGetter("diid")
	public int getDis_item_ID() {
		return dis_item_ID;
	}

	@JsonSetter("diid")
	public void setDis_item_ID(int dis_item_ID) {
		this.dis_item_ID = dis_item_ID;
	}

	@JsonGetter("did")
	public int getDis_ID() {
		return dis_ID;
	}

	@JsonSetter("did")
	public void setDis_ID(int dis_ID) {
		this.dis_ID = dis_ID;
	}

	@JsonGetter("iid")
	public int getItem_ID() {
		return item_ID;
	}

	@JsonSetter("iid")
	public void setItem_ID(int item_ID) {
		this.item_ID = item_ID;
	}

	@JsonGetter("ip")
	public float getPrice() {
		return Price;
	}

	@JsonSetter("ip")
	public void setPrice(float price) {
		Price = price;
	}

	@JsonGetter("dil")
	public List<Distributer_item> getDistributer_itemList() {
		return Distributer_itemList;
	}

	@JsonSetter("dil")
	public void setDistributer_itemList(
			List<Distributer_item> distributer_itemList) {
		Distributer_itemList = distributer_itemList;
	}

}
