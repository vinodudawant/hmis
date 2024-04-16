package com.hms.dto;

import java.util.List;

public class InvOpenigStkMasterDTO {
		 
	private Integer inv_opening_stock_master_Id ;
	private String  inv_opening_stock_master_doc_date;
	private String  inv_opening_stock_master_doc_Series ;
	private String  inv_opening_stock_master_narration ;
	private Integer inv_opening_stock_master_total_item_qty ;
	private Double  inv_opening_stock_master_total_row_amount ;
	private Integer inv_opening_stock_master_deleted_by_id ;
	private String	inv_opening_stock_master_deleted_by_name;
	private String  inv_opening_stock_master_inserted_by_name;
	private Integer inv_opening_stock_master_inserted_by_id ;
	private String  inv_opening_stock_master_purchase_openig_stock_flag ;
	
	private Integer invcurrentmaininvStock;
	private Integer invDeductItemStock;
	private String  invItemName;
	private Integer invitemId;
	
	private List<InvOpenigStkMasterDTO> ltInvOpenigStkMasterDTOs;
	
	private List<InventoryPurchaseOrderItemMaster> ltopenigStockSlaveList;
	
	public Integer getInv_opening_stock_master_Id() {
		return inv_opening_stock_master_Id;
	}
	public void setInv_opening_stock_master_Id(Integer inv_opening_stock_master_Id) {
		this.inv_opening_stock_master_Id = inv_opening_stock_master_Id;
	}
	public String getInv_opening_stock_master_doc_date() {
		return inv_opening_stock_master_doc_date;
	}
	public void setInv_opening_stock_master_doc_date(
			String inv_opening_stock_master_doc_date) {
		this.inv_opening_stock_master_doc_date = inv_opening_stock_master_doc_date;
	}
	public String getInv_opening_stock_master_doc_Series() {
		return inv_opening_stock_master_doc_Series;
	}
	public void setInv_opening_stock_master_doc_Series(
			String inv_opening_stock_master_doc_Series) {
		this.inv_opening_stock_master_doc_Series = inv_opening_stock_master_doc_Series;
	}
	public String getInv_opening_stock_master_narration() {
		return inv_opening_stock_master_narration;
	}
	public void setInv_opening_stock_master_narration(
			String inv_opening_stock_master_narration) {
		this.inv_opening_stock_master_narration = inv_opening_stock_master_narration;
	}
	public Integer getInv_opening_stock_master_total_item_qty() {
		return inv_opening_stock_master_total_item_qty;
	}
	public void setInv_opening_stock_master_total_item_qty(
			Integer inv_opening_stock_master_total_item_qty) {
		this.inv_opening_stock_master_total_item_qty = inv_opening_stock_master_total_item_qty;
	}
	public Double getInv_opening_stock_master_total_row_amount() {
		return inv_opening_stock_master_total_row_amount;
	}
	public void setInv_opening_stock_master_total_row_amount(
			Double inv_opening_stock_master_total_row_amount) {
		this.inv_opening_stock_master_total_row_amount = inv_opening_stock_master_total_row_amount;
	}
	public Integer getInv_opening_stock_master_deleted_by_id() {
		return inv_opening_stock_master_deleted_by_id;
	}
	public void setInv_opening_stock_master_deleted_by_id(
			Integer inv_opening_stock_master_deleted_by_id) {
		this.inv_opening_stock_master_deleted_by_id = inv_opening_stock_master_deleted_by_id;
	}
	public String getInv_opening_stock_master_deleted_by_name() {
		return inv_opening_stock_master_deleted_by_name;
	}
	public void setInv_opening_stock_master_deleted_by_name(
			String inv_opening_stock_master_deleted_by_name) {
		this.inv_opening_stock_master_deleted_by_name = inv_opening_stock_master_deleted_by_name;
	}
	public String getInv_opening_stock_master_inserted_by_name() {
		return inv_opening_stock_master_inserted_by_name;
	}
	public void setInv_opening_stock_master_inserted_by_name(
			String inv_opening_stock_master_inserted_by_name) {
		this.inv_opening_stock_master_inserted_by_name = inv_opening_stock_master_inserted_by_name;
	}
	public Integer getInv_opening_stock_master_inserted_by_id() {
		return inv_opening_stock_master_inserted_by_id;
	}
	public void setInv_opening_stock_master_inserted_by_id(
			Integer inv_opening_stock_master_inserted_by_id) {
		this.inv_opening_stock_master_inserted_by_id = inv_opening_stock_master_inserted_by_id;
	}
	public String getInv_opening_stock_master_purchase_openig_stock_flag() {
		return inv_opening_stock_master_purchase_openig_stock_flag;
	}
	public void setInv_opening_stock_master_purchase_openig_stock_flag(
			String inv_opening_stock_master_purchase_openig_stock_flag) {
		this.inv_opening_stock_master_purchase_openig_stock_flag = inv_opening_stock_master_purchase_openig_stock_flag;
	}
	public List<InventoryPurchaseOrderItemMaster> getLtopenigStockSlaveList() {
		return ltopenigStockSlaveList;
	}
	public void setLtopenigStockSlaveList(List<InventoryPurchaseOrderItemMaster> ltopenigStockSlaveList) {
		this.ltopenigStockSlaveList = ltopenigStockSlaveList;
	}
	public List<InvOpenigStkMasterDTO> getLtInvOpenigStkMasterDTOs() {
		return ltInvOpenigStkMasterDTOs;
	}
	public void setLtInvOpenigStkMasterDTOs(List<InvOpenigStkMasterDTO> ltInvOpenigStkMasterDTOs) {
		this.ltInvOpenigStkMasterDTOs = ltInvOpenigStkMasterDTOs;
	}

 
	public Integer getInvcurrentmaininvStock() {
		return invcurrentmaininvStock;
	}
	public void setInvcurrentmaininvStock(Integer invcurrentmaininvStock) {
		this.invcurrentmaininvStock = invcurrentmaininvStock;
	}
	public Integer getInvDeductItemStock() {
		return invDeductItemStock;
	}
	public void setInvDeductItemStock(Integer invDeductItemStock) {
		this.invDeductItemStock = invDeductItemStock;
	}
	public String getInvItemName() {
		return invItemName;
	}
	public void setInvItemName(String invItemName) {
		this.invItemName = invItemName;
	}
	public Integer getInvitemId() {
		return invitemId;
	}
	public void setInvitemId(Integer invitemId) {
		this.invitemId = invitemId;
	}
	
	
	
}
