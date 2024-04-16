package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryMRNStockDTO {

	private Integer itemcode;
	private Integer minstock;
	private Integer maxstock;
	private Integer orderstock;
	private Integer totalavialableqty;
	private List<InventoryMRNStockDTO> inventoryMRNStockDTO;
	private Integer inv_item_qty;
	private Integer inv_item_code;
	private Integer item_id;
	private String item_name;
	private Integer mrn_item_info_slave_item_code;
	private String inv_mrn_item_info_slave_subinventory;
	
	
	private InventoryBatchStockDTO dtobatch ; 
	private InventoryItemMasterDTO dtoItemMaster ; 
	private	InventoryMaterialRequestNoteMasterDTO dtpmrnMaster ; 
	private InventoryMaterialRequestNoteItemInfoSlaveDTO dtoMrnslave ; 
	
	
	@JsonGetter("inv_item_qty")
	public Integer getInv_item_qty() {
		return inv_item_qty;
	}
	@JsonSetter("inv_item_qty")
	public void setInv_item_qty(Integer inv_item_qty) {
		this.inv_item_qty = inv_item_qty;
	}
	@JsonGetter("inv_item_code")
	public Integer getInv_item_code() {
		return inv_item_code;
	}
	@JsonSetter("inv_item_code")
	public void setInv_item_code(Integer inv_item_code) {
		this.inv_item_code = inv_item_code;
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
	@JsonGetter("mrn_item_info_slave_item_code")
	public Integer getMrn_item_info_slave_item_code() {
		return mrn_item_info_slave_item_code;
	}
	@JsonSetter("mrn_item_info_slave_item_code")
	public void setMrn_item_info_slave_item_code(
			Integer mrn_item_info_slave_item_code) {
		this.mrn_item_info_slave_item_code = mrn_item_info_slave_item_code;
	}
	@JsonGetter("inv_mrn_item_info_slave_subinventory")
	public String getInv_mrn_item_info_slave_subinventory() {
		return inv_mrn_item_info_slave_subinventory;
	}
	@JsonSetter("inv_mrn_item_info_slave_subinventory")
	public void setInv_mrn_item_info_slave_subinventory(
			String inv_mrn_item_info_slave_subinventory) {
		this.inv_mrn_item_info_slave_subinventory = inv_mrn_item_info_slave_subinventory;
	}
	@JsonGetter("itemcode")
	public Integer getItemcode() {
		return itemcode;
	}
	@JsonSetter("itemcode")
	public void setItemcode(Integer itemcode) {
		this.itemcode = itemcode;
	}
	@JsonGetter("minstock")
	public Integer getMinstock() {
		return minstock;
	}
	@JsonSetter("minstock")
	public void setMinstock(Integer minstock) {
		this.minstock = minstock;
	}
	
	@JsonGetter("maxstock")
	public Integer getMaxstock() {
		return maxstock;
	}	
	@JsonSetter("maxstock")
	public void setMaxstock(Integer maxstock) {
		this.maxstock = maxstock;
	}
	
	@JsonGetter("orderstock")
	public Integer getOrderstock() {
		return orderstock;
	}	
	@JsonSetter("orderstock")
	public void setOrderstock(Integer orderstock) {
		this.orderstock = orderstock;
	}
	
	@JsonGetter("totalavialableqty")
	public Integer getTotalavialableqty() {
		return totalavialableqty;
	}
	@JsonSetter("totalavialableqty")
	public void setTotalavialableqty(Integer totalavialableqty) {
		this.totalavialableqty = totalavialableqty;
	}
	@JsonGetter("inventoryMRNStockDTO")
	public List<InventoryMRNStockDTO> getInventoryMRNStockDTO() {
		return inventoryMRNStockDTO;
	}
	@JsonSetter("inventoryMRNStockDTO")
	public void setInventoryMRNStockDTO(
			List<InventoryMRNStockDTO> inventoryMRNStockDTO) {
		this.inventoryMRNStockDTO = inventoryMRNStockDTO;
	}
	public InventoryBatchStockDTO getDtobatch() {
		return dtobatch;
	}
	public void setDtobatch(InventoryBatchStockDTO dtobatch) {
		this.dtobatch = dtobatch;
	}
	public InventoryItemMasterDTO getDtoItemMaster() {
		return dtoItemMaster;
	}
	public void setDtoItemMaster(InventoryItemMasterDTO dtoItemMaster) {
		this.dtoItemMaster = dtoItemMaster;
	}
	public InventoryMaterialRequestNoteMasterDTO getDtpmrnMaster() {
		return dtpmrnMaster;
	}
	public void setDtpmrnMaster(InventoryMaterialRequestNoteMasterDTO dtpmrnMaster) {
		this.dtpmrnMaster = dtpmrnMaster;
	}
	public InventoryMaterialRequestNoteItemInfoSlaveDTO getDtoMrnslave() {
		return dtoMrnslave;
	}
	public void setDtoMrnslave(
			InventoryMaterialRequestNoteItemInfoSlaveDTO dtoMrnslave) {
		this.dtoMrnslave = dtoMrnslave;
	}
	
	
}