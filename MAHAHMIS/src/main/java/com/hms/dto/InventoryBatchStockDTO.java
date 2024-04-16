package com.hms.dto;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

/**
 * @author user
 *
 */
public class InventoryBatchStockDTO implements Serializable {

	private Integer inv_batch_id;
	private String inv_batch_code;
	private Integer inv_delete_flag;
	private Date inv_create_date;
	private Integer inv_issue_qty;
	private Date inv_purchase_date;
	private Integer inv_item_code;
	private Integer inv_item_qty;
	private Double inv_item_rate;
	private Double inv_item_amount;
	private Integer avialbleItem;
	
	private Integer inv_mrn_id;
	private Integer inv_mrn_item_info_slave_id;
	private String inv_mrn_item_info_issue_slave_item_name;
	private String inv_mrn_item_info_issue_carrier_name;
	private String inv_mrn_item_info_issue_slave_subinventory;
	private Integer inv_mrn_item_info_issue_slave_item_qty;
	private Integer inv_mrn_item_info_issue_slave_pending_item_qty;
	private String inv_subinventory_id;
	
	
	private List<InventoryBatchStockDTO>ltInventoryBatchStockDTO;
	
	@JsonGetter("ltInventoryBatchStockDTO")
	public List<InventoryBatchStockDTO> getLtInventoryBatchStockDTO() {
		return ltInventoryBatchStockDTO;
	}
	@JsonSetter("ltInventoryBatchStockDTO")
	public void setLtInventoryBatchStockDTO(
			List<InventoryBatchStockDTO> ltInventoryBatchStockDTO) {
		this.ltInventoryBatchStockDTO = ltInventoryBatchStockDTO;
	}
	@JsonGetter("avialbleItem")
	public Integer getAvialbleItem() {
		return avialbleItem;
	}
	@JsonSetter("avialbleItem")
	public void setAvialbleItem(Integer avialbleItem) {
		this.avialbleItem = avialbleItem;
	}
	/*private List<InventoryBatchStockDTO> ltbatchstockDTO;
	
	
	public List<InventoryBatchStockDTO> getLtbatchstockDTO() {
		return ltbatchstockDTO;
	}
	public void setLtbatchstockDTO(List<InventoryBatchStockDTO> ltbatchstockDTO) {
		this.ltbatchstockDTO = ltbatchstockDTO;
	}*/
	public Integer getInv_batch_id() {
		return inv_batch_id;
	}
	public void setInv_batch_id(Integer inv_batch_id) {
		this.inv_batch_id = inv_batch_id;
	}
	public String getInv_batch_code() {
		return inv_batch_code;
	}
	public void setInv_batch_code(String inv_batch_code) {
		this.inv_batch_code = inv_batch_code;
	}
	 
	public Integer getInv_delete_flag() {
		return inv_delete_flag;
	}
	public void setInv_delete_flag(Integer inv_delete_flag) {
		this.inv_delete_flag = inv_delete_flag;
	}
	public Date getInv_create_date() {
		return inv_create_date;
	}
	public void setInv_create_date(Date inv_create_date) {
		this.inv_create_date = inv_create_date;
	}
	public Integer getInv_issue_qty() {
		return inv_issue_qty;
	}
	public void setInv_issue_qty(Integer inv_issue_qty) {
		this.inv_issue_qty = inv_issue_qty;
	}
	public Date getInv_purchase_date() {
		return inv_purchase_date;
	}
	public void setInv_purchase_date(Date inv_purchase_date) {
		this.inv_purchase_date = inv_purchase_date;
	}
	@JsonGetter("inv_item_code")
	public Integer getInv_item_code() {
		return inv_item_code;
	}
	@JsonSetter("inv_item_code")
	public void setInv_item_code(Integer inv_item_code) {
		this.inv_item_code = inv_item_code;
	}
	@JsonGetter("inv_item_qty")
	public Integer getInv_item_qty() {
		return inv_item_qty;
	}
	@JsonSetter("inv_item_qty")
	public void setInv_item_qty(Integer inv_item_qty) {
		this.inv_item_qty = inv_item_qty;
	}
	@JsonGetter("inv_item_rate")
	public Double getInv_item_rate() {
		return inv_item_rate;
	}
	@JsonSetter("inv_item_rate")
	public void setInv_item_rate(Double inv_item_rate) {
		this.inv_item_rate = inv_item_rate;
	}
	@JsonGetter("inv_item_amount")
	public Double getInv_item_amount() {
		return inv_item_amount;
	}
	@JsonSetter("inv_item_amount")
	public void setInv_item_amount(Double inv_item_amount) {
		this.inv_item_amount = inv_item_amount;
	}
	@JsonGetter("inv_mrn_id")
	public Integer getInv_mrn_id() {
		return inv_mrn_id;
	}
	@JsonSetter("inv_mrn_id")
	public void setInv_mrn_id(Integer inv_mrn_id) {
		this.inv_mrn_id = inv_mrn_id;
	}
	@JsonGetter("inv_mrn_item_info_slave_id")
	public Integer getInv_mrn_item_info_slave_id() {
		return inv_mrn_item_info_slave_id;
	}
	@JsonSetter("inv_mrn_item_info_slave_id")
	public void setInv_mrn_item_info_slave_id(Integer inv_mrn_item_info_slave_id) {
		this.inv_mrn_item_info_slave_id = inv_mrn_item_info_slave_id;
	}
	@JsonGetter("inv_mrn_item_info_issue_slave_item_name")
	public String getInv_mrn_item_info_issue_slave_item_name() {
		return inv_mrn_item_info_issue_slave_item_name;
	}
	@JsonSetter("inv_mrn_item_info_issue_slave_item_name")
	public void setInv_mrn_item_info_issue_slave_item_name(
			String inv_mrn_item_info_issue_slave_item_name) {
		this.inv_mrn_item_info_issue_slave_item_name = inv_mrn_item_info_issue_slave_item_name;
	}
	@JsonGetter("inv_mrn_item_info_issue_carrier_name")
	public String getInv_mrn_item_info_issue_carrier_name() {
		return inv_mrn_item_info_issue_carrier_name;
	}
	@JsonSetter("inv_mrn_item_info_issue_carrier_name")
	public void setInv_mrn_item_info_issue_carrier_name(
			String inv_mrn_item_info_issue_carrier_name) {
		this.inv_mrn_item_info_issue_carrier_name = inv_mrn_item_info_issue_carrier_name;
	}
	@JsonGetter("inv_mrn_item_info_issue_slave_subinventory")
	public String getInv_mrn_item_info_issue_slave_subinventory() {
		return inv_mrn_item_info_issue_slave_subinventory;
	}
	@JsonSetter("inv_mrn_item_info_issue_slave_subinventory")
	public void setInv_mrn_item_info_issue_slave_subinventory(
			String inv_mrn_item_info_issue_slave_subinventory) {
		this.inv_mrn_item_info_issue_slave_subinventory = inv_mrn_item_info_issue_slave_subinventory;
	}
	@JsonGetter("inv_mrn_item_info_issue_slave_item_qty")
	public Integer getInv_mrn_item_info_issue_slave_item_qty() {
		return inv_mrn_item_info_issue_slave_item_qty;
	}
	@JsonSetter("inv_mrn_item_info_issue_slave_item_qty")
	public void setInv_mrn_item_info_issue_slave_item_qty(
			Integer inv_mrn_item_info_issue_slave_item_qty) {
		this.inv_mrn_item_info_issue_slave_item_qty = inv_mrn_item_info_issue_slave_item_qty;
	}
	@JsonGetter("inv_mrn_item_info_issue_slave_pending_item_qty")
	public Integer getInv_mrn_item_info_issue_slave_pending_item_qty() {
		return inv_mrn_item_info_issue_slave_pending_item_qty;
	}
	@JsonSetter("inv_mrn_item_info_issue_slave_pending_item_qty")
	public void setInv_mrn_item_info_issue_slave_pending_item_qty(
			Integer inv_mrn_item_info_issue_slave_pending_item_qty) {
		this.inv_mrn_item_info_issue_slave_pending_item_qty = inv_mrn_item_info_issue_slave_pending_item_qty;
	}
	public String getInv_subinventory_id() {
		return inv_subinventory_id;
	}
	public void setInv_subinventory_id(String inv_subinventory_id) {
		this.inv_subinventory_id = inv_subinventory_id;
	}
	
	
	
	
	 
}
