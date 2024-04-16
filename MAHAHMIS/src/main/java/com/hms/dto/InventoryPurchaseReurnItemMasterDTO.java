package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryPurchaseReurnItemMasterDTO {

	
	private Integer inv_purchase_return_item_master_id;
	private Integer inv_purchase_return_item_code;
	private String inv_purchase_return_item_Name ;
	private Integer inv_purchase_return_item_doc_Qty;
	
	private Double inv_purchase_return_item_unit_price;
	private Double inv_purchase_return_item_trade_discount_per;
	private Double inv_purchase_return_item_trade_discount_rupess;
	private Double inv_purchase_return_item_trade_discount_amount;
	private Double inv_purchase_return_item_trade_base_amount;
	
	 
	private Double inv_purchase_return_item_tax_amount;
	private Double inv_purchase_return_item_row_amount;
	private String inv_purchase_return_item_factor1;
	private String inv_purchase_return_item_tax_code;
	
	private String inv_purchase_return_item_factor2;
	private String inv_purchase_return_item_factor3;
	private String inv_purchase_return_item_factor4;
	private Double inv_purchase_return_item_actural_qty;
	
	private Double inv_purchase_return_item_pending_qty;
	private String inv_purchase_return_item_row_status;
	private String inv_purchase_return_item_batch_No;
	 
	
	private Integer inv_purchase_return_item_base_doc_No;
	private Integer inv_purchase_return_item_doc_number;
	
	private Integer inv_purchase_return_item_delete_flag;
	private Date inv_purchase_return_item_update_date;
	private Date inv_purchase_return_item_create_date;

	private Integer inv_purchase_return_item_doc_number_fk;
	private String inv_purchase_return_item_doc_series;
	
	private Integer inv_purchase_return_master_doc_no_fk ; 
	private String inv_purchase_return_item_mfg_Date;
	private String inv_purchase_return_item_Expiry_Date;
	
	private String inv_item_purchase_factor_uom_1;
	private String inv_item_purchase_factor_uom_2;
	private String inv_item_purchase_factor_uom_3;
	private String inv_item_purchase_factor_uom_4;
	
	private String inv_item_purchase_last_factor_uom;
	private Double inv_purchase_return_item_tax_amount_rupess;// add TAX amount in RS @Author:paras suryawanshi.
	
	
	private List<InventoryPurchaseReurnItemMasterDTO> ltinvetorypurchaseorderitemmaster;
	
	public List<InventoryPurchaseReurnItemMasterDTO> getLtinvetorypurchaseorderitemmaster() {
		return ltinvetorypurchaseorderitemmaster;
	}
	public void setLtinvetorypurchaseorderitemmaster(
			List<InventoryPurchaseReurnItemMasterDTO> ltinvetorypurchaseorderitemmaster) {
		this.ltinvetorypurchaseorderitemmaster = ltinvetorypurchaseorderitemmaster;
	}
	public Integer getInv_purchase_return_item_master_id() {
		return inv_purchase_return_item_master_id;
	}
	public void setInv_purchase_return_item_master_id(
			Integer inv_purchase_return_item_master_id) {
		this.inv_purchase_return_item_master_id = inv_purchase_return_item_master_id;
	}
	public Integer getInv_purchase_return_item_code() {
		return inv_purchase_return_item_code;
	}
	public void setInv_purchase_return_item_code(
			Integer inv_purchase_return_item_code) {
		this.inv_purchase_return_item_code = inv_purchase_return_item_code;
	}
	public String getInv_purchase_return_item_Name() {
		return inv_purchase_return_item_Name;
	}
	public void setInv_purchase_return_item_Name(
			String inv_purchase_return_item_Name) {
		this.inv_purchase_return_item_Name = inv_purchase_return_item_Name;
	}
	public Integer getInv_purchase_return_item_doc_Qty() {
		return inv_purchase_return_item_doc_Qty;
	}
	public void setInv_purchase_return_item_doc_Qty(
			Integer inv_purchase_return_item_doc_Qty) {
		this.inv_purchase_return_item_doc_Qty = inv_purchase_return_item_doc_Qty;
	}
	public Double getInv_purchase_return_item_unit_price() {
		return inv_purchase_return_item_unit_price;
	}
	public void setInv_purchase_return_item_unit_price(
			Double inv_purchase_return_item_unit_price) {
		this.inv_purchase_return_item_unit_price = inv_purchase_return_item_unit_price;
	}
	public Double getInv_purchase_return_item_trade_discount_per() {
		return inv_purchase_return_item_trade_discount_per;
	}
	public void setInv_purchase_return_item_trade_discount_per(
			Double inv_purchase_return_item_trade_discount_per) {
		this.inv_purchase_return_item_trade_discount_per = inv_purchase_return_item_trade_discount_per;
	}
	
	public Double getInv_purchase_return_item_trade_discount_rupess() {
		return inv_purchase_return_item_trade_discount_rupess;
	}
	public void setInv_purchase_return_item_trade_discount_rupess(
			Double inv_purchase_return_item_trade_discount_rupess) {
		this.inv_purchase_return_item_trade_discount_rupess = inv_purchase_return_item_trade_discount_rupess;
	}
	public Double getInv_purchase_return_item_trade_discount_amount() {
		return inv_purchase_return_item_trade_discount_amount;
	}
	public void setInv_purchase_return_item_trade_discount_amount(
			Double inv_purchase_return_item_trade_discount_amount) {
		this.inv_purchase_return_item_trade_discount_amount = inv_purchase_return_item_trade_discount_amount;
	}
	public Double getInv_purchase_return_item_trade_base_amount() {
		return inv_purchase_return_item_trade_base_amount;
	}
	public void setInv_purchase_return_item_trade_base_amount(
			Double inv_purchase_return_item_trade_base_amount) {
		this.inv_purchase_return_item_trade_base_amount = inv_purchase_return_item_trade_base_amount;
	}
	public Double getInv_purchase_return_item_tax_amount() {
		return inv_purchase_return_item_tax_amount;
	}
	public void setInv_purchase_return_item_tax_amount(
			Double inv_purchase_return_item_tax_amount) {
		this.inv_purchase_return_item_tax_amount = inv_purchase_return_item_tax_amount;
	}
	public Double getInv_purchase_return_item_row_amount() {
		return inv_purchase_return_item_row_amount;
	}
	public void setInv_purchase_return_item_row_amount(
			Double inv_purchase_return_item_row_amount) {
		this.inv_purchase_return_item_row_amount = inv_purchase_return_item_row_amount;
	}
	public String getInv_purchase_return_item_factor1() {
		return inv_purchase_return_item_factor1;
	}
	public void setInv_purchase_return_item_factor1(
			String inv_purchase_return_item_factor1) {
		this.inv_purchase_return_item_factor1 = inv_purchase_return_item_factor1;
	}
	public String getInv_purchase_return_item_factor2() {
		return inv_purchase_return_item_factor2;
	}
	public void setInv_purchase_return_item_factor2(
			String inv_purchase_return_item_factor2) {
		this.inv_purchase_return_item_factor2 = inv_purchase_return_item_factor2;
	}
	public String getInv_purchase_return_item_factor3() {
		return inv_purchase_return_item_factor3;
	}
	public void setInv_purchase_return_item_factor3(
			String inv_purchase_return_item_factor3) {
		this.inv_purchase_return_item_factor3 = inv_purchase_return_item_factor3;
	}
	public String getInv_purchase_return_item_factor4() {
		return inv_purchase_return_item_factor4;
	}
	public void setInv_purchase_return_item_factor4(
			String inv_purchase_return_item_factor4) {
		this.inv_purchase_return_item_factor4 = inv_purchase_return_item_factor4;
	}
	public Double getInv_purchase_return_item_actural_qty() {
		return inv_purchase_return_item_actural_qty;
	}
	public void setInv_purchase_return_item_actural_qty(
			Double inv_purchase_return_item_actural_qty) {
		this.inv_purchase_return_item_actural_qty = inv_purchase_return_item_actural_qty;
	}
	public Double getInv_purchase_return_item_pending_qty() {
		return inv_purchase_return_item_pending_qty;
	}
	public void setInv_purchase_return_item_pending_qty(
			Double inv_purchase_return_item_pending_qty) {
		this.inv_purchase_return_item_pending_qty = inv_purchase_return_item_pending_qty;
	}
	public String getInv_purchase_return_item_row_status() {
		return inv_purchase_return_item_row_status;
	}
	public void setInv_purchase_return_item_row_status(
			String inv_purchase_return_item_row_status) {
		this.inv_purchase_return_item_row_status = inv_purchase_return_item_row_status;
	}
	public String getInv_purchase_return_item_batch_No() {
		return inv_purchase_return_item_batch_No;
	}
	public void setInv_purchase_return_item_batch_No(
			String inv_purchase_return_item_batch_No) {
		this.inv_purchase_return_item_batch_No = inv_purchase_return_item_batch_No;
	}
	public Integer getInv_purchase_return_item_base_doc_No() {
		return inv_purchase_return_item_base_doc_No;
	}
	public void setInv_purchase_return_item_base_doc_No(
			Integer inv_purchase_return_item_base_doc_No) {
		this.inv_purchase_return_item_base_doc_No = inv_purchase_return_item_base_doc_No;
	}
	public Integer getInv_purchase_return_item_doc_number() {
		return inv_purchase_return_item_doc_number;
	}
	public void setInv_purchase_return_item_doc_number(
			Integer inv_purchase_return_item_doc_number) {
		this.inv_purchase_return_item_doc_number = inv_purchase_return_item_doc_number;
	}
	public Integer getInv_purchase_return_item_delete_flag() {
		return inv_purchase_return_item_delete_flag;
	}
	public void setInv_purchase_return_item_delete_flag(
			Integer inv_purchase_return_item_delete_flag) {
		this.inv_purchase_return_item_delete_flag = inv_purchase_return_item_delete_flag;
	}
	public Date getInv_purchase_return_item_update_date() {
		return inv_purchase_return_item_update_date;
	}
	public void setInv_purchase_return_item_update_date(
			Date inv_purchase_return_item_update_date) {
		this.inv_purchase_return_item_update_date = inv_purchase_return_item_update_date;
	}
	public Date getInv_purchase_return_item_create_date() {
		return inv_purchase_return_item_create_date;
	}
	public void setInv_purchase_return_item_create_date(
			Date inv_purchase_return_item_create_date) {
		this.inv_purchase_return_item_create_date = inv_purchase_return_item_create_date;
	}
	public Integer getInv_purchase_return_item_doc_number_fk() {
		return inv_purchase_return_item_doc_number_fk;
	}
	public void setInv_purchase_return_item_doc_number_fk(
			Integer inv_purchase_return_item_doc_number_fk) {
		this.inv_purchase_return_item_doc_number_fk = inv_purchase_return_item_doc_number_fk;
	}
	public String getInv_purchase_return_item_doc_series() {
		return inv_purchase_return_item_doc_series;
	}
	public void setInv_purchase_return_item_doc_series(
			String inv_purchase_return_item_doc_series) {
		this.inv_purchase_return_item_doc_series = inv_purchase_return_item_doc_series;
	}
	public Integer getInv_purchase_return_master_doc_no_fk() {
		return inv_purchase_return_master_doc_no_fk;
	}
	public void setInv_purchase_return_master_doc_no_fk(
			Integer inv_purchase_return_master_doc_no_fk) {
		this.inv_purchase_return_master_doc_no_fk = inv_purchase_return_master_doc_no_fk;
	}
	public String getInv_purchase_return_item_mfg_Date() {
		return inv_purchase_return_item_mfg_Date;
	}
	public void setInv_purchase_return_item_mfg_Date(
			String inv_purchase_return_item_mfg_Date) {
		this.inv_purchase_return_item_mfg_Date = inv_purchase_return_item_mfg_Date;
	}
	public String getInv_purchase_return_item_Expiry_Date() {
		return inv_purchase_return_item_Expiry_Date;
	}
	public void setInv_purchase_return_item_Expiry_Date(
			String inv_purchase_return_item_Expiry_Date) {
		this.inv_purchase_return_item_Expiry_Date = inv_purchase_return_item_Expiry_Date;
	}
	public String getInv_purchase_return_item_tax_code() {
		return inv_purchase_return_item_tax_code;
	}
	public void setInv_purchase_return_item_tax_code(
			String inv_purchase_return_item_tax_code) {
		this.inv_purchase_return_item_tax_code = inv_purchase_return_item_tax_code;
	}
	public String getInv_item_purchase_factor_uom_1() {
		return inv_item_purchase_factor_uom_1;
	}
	public void setInv_item_purchase_factor_uom_1(
			String inv_item_purchase_factor_uom_1) {
		this.inv_item_purchase_factor_uom_1 = inv_item_purchase_factor_uom_1;
	}
	public String getInv_item_purchase_factor_uom_2() {
		return inv_item_purchase_factor_uom_2;
	}
	public void setInv_item_purchase_factor_uom_2(
			String inv_item_purchase_factor_uom_2) {
		this.inv_item_purchase_factor_uom_2 = inv_item_purchase_factor_uom_2;
	}
	public String getInv_item_purchase_factor_uom_3() {
		return inv_item_purchase_factor_uom_3;
	}
	public void setInv_item_purchase_factor_uom_3(
			String inv_item_purchase_factor_uom_3) {
		this.inv_item_purchase_factor_uom_3 = inv_item_purchase_factor_uom_3;
	}
	public String getInv_item_purchase_factor_uom_4() {
		return inv_item_purchase_factor_uom_4;
	}
	public void setInv_item_purchase_factor_uom_4(
			String inv_item_purchase_factor_uom_4) {
		this.inv_item_purchase_factor_uom_4 = inv_item_purchase_factor_uom_4;
	}
	@JsonGetter("inv_item_purchase_last_factor_uom")
	public String getInv_item_purchase_last_factor_uom() {
		return inv_item_purchase_last_factor_uom;
	}
	@JsonSetter("inv_item_purchase_last_factor_uom")
	public void setInv_item_purchase_last_factor_uom(
			String inv_item_purchase_last_factor_uom) {
		this.inv_item_purchase_last_factor_uom = inv_item_purchase_last_factor_uom;
	}
	@JsonGetter("inv_purchase_return_item_tax_amount_rupess")
	public Double getInv_purchase_return_item_tax_amount_rupess() {
		return inv_purchase_return_item_tax_amount_rupess;
	}
	@JsonSetter("inv_purchase_return_item_tax_amount_rupess")
	public void setInv_purchase_return_item_tax_amount_rupess(
			Double inv_purchase_return_item_tax_amount_rupess) {
		this.inv_purchase_return_item_tax_amount_rupess = inv_purchase_return_item_tax_amount_rupess;
	}
	
	
	
	
}
