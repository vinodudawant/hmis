package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryBatchStockAvalaibleStock {

	private Integer inv_batch_id;
	private Integer inv_item_code;
	private String inv_batch_item_name;
	private Integer inv_item_qty;
	private String inv_item_factor1;
	private String inv_item_factor2;
	private String inv_item_factor3;
	private String inv_item_factor4;
	private Integer min_stock;
	private Integer order_stock;
	private Integer max_stock;
	private Integer item_id;
	private String item_name;
	 
	private List<InventoryBatchStockAvalaibleStock> ltbatchstockAllItemsDTO;
	
	public List<InventoryBatchStockAvalaibleStock> getLtbatchstockAllItemsDTO() {
		return ltbatchstockAllItemsDTO;
	}
	public void setLtbatchstockAllItemsDTO(
			List<InventoryBatchStockAvalaibleStock> ltbatchstockAllItemsDTO) {
		this.ltbatchstockAllItemsDTO = ltbatchstockAllItemsDTO;
	}
	@JsonGetter("inv_batch_id")
	public Integer getInv_batch_id() {
		return inv_batch_id;
	}
	@JsonSetter("inv_batch_id")
	public void setInv_batch_id(Integer inv_batch_id) {
		this.inv_batch_id = inv_batch_id;
	}
	@JsonGetter("inv_item_code")
	public Integer getInv_item_code() {
		return inv_item_code;
	}
	@JsonSetter("inv_item_code")
	public void setInv_item_code(Integer inv_item_code) {
		this.inv_item_code = inv_item_code;
	}
	@JsonGetter("inv_batch_item_name")
	public String getInv_batch_item_name() {
		return inv_batch_item_name;
	}
	
	@JsonSetter("inv_batch_item_name")
	public void setInv_batch_item_name(String inv_batch_item_name) {
		this.inv_batch_item_name = inv_batch_item_name;
	}
	@JsonGetter("inv_item_qty")
	public Integer getInv_item_qty() {
		return inv_item_qty;
	}
	@JsonSetter("inv_item_qty")
	public void setInv_item_qty(Integer inv_item_qty) {
		this.inv_item_qty = inv_item_qty;
	}
	
	@JsonGetter("inv_item_factor1")
	public String getInv_item_factor1() {
		return inv_item_factor1;
	}
	@JsonSetter("inv_item_factor1")
	public void setInv_item_factor1(String inv_item_factor1) {
		this.inv_item_factor1 = inv_item_factor1;
	}
	@JsonGetter("inv_item_factor2")
	public String getInv_item_factor2() {
		return inv_item_factor2;
	}
	@JsonSetter("inv_item_factor2")
	public void setInv_item_factor2(String inv_item_factor2) {
		this.inv_item_factor2 = inv_item_factor2;
	}
	@JsonGetter("inv_item_factor3")
	public String getInv_item_factor3() {
		return inv_item_factor3;
	}
	@JsonSetter("inv_item_factor3")
	public void setInv_item_factor3(String inv_item_factor3) {
		this.inv_item_factor3 = inv_item_factor3;
	}
	@JsonGetter("inv_item_factor4")
	public String getInv_item_factor4() {
		return inv_item_factor4;
	}
	@JsonSetter("inv_item_factor4")
	public void setInv_item_factor4(String inv_item_factor4) {
		this.inv_item_factor4 = inv_item_factor4;
	}
	@JsonGetter("min_stock")
	public Integer getMin_stock() {
		return min_stock;
	}
	@JsonSetter("min_stock")
	public void setMin_stock(Integer min_stock) {
		this.min_stock = min_stock;
	}
	@JsonGetter("order_stock")
	public Integer getOrder_stock() {
		return order_stock;
	}
	@JsonSetter("order_stock")
	public void setOrder_stock(Integer order_stock) {
		this.order_stock = order_stock;
	}
	@JsonGetter("max_stock")
	public Integer getMax_stock() {
		return max_stock;
	}
	@JsonSetter("max_stock")
	public void setMax_stock(Integer max_stock) {
		this.max_stock = max_stock;
	}
	@JsonGetter("item_id")
	public Integer getItem_id() {
		return item_id;
	}
	@JsonSetter("item_id")
	public void setItem_id(Integer item_id) {
		this.item_id = item_id;
	}
	@JsonGetter("item_name")
	public String getItem_name() {
		return item_name;
	}
	@JsonSetter("item_name")
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	
	
	
	
	
	
}
