package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryGRNItemDTO {
	
	
	private Integer inv_batch_id;
	private Integer inv_item_code;
	private String inv_batch_item_name ;
	private Integer inv_item_qty;
	
	private Double inv_item_rate;
	private Double inv_batch_stock_Item_trade_discount_per;
	private Double inv_batch_stock_Item_trade_discount_rupess;
	private Double inv_batch_stock_item_trade_discount_amount;
	private Double inv_batch_stock_item_trade_base_amount;
	
	 
	private Double inv_batch_stock_item_tax_amount;
	private String inv_batch_stock_item_tax_code;
	private Double inv_item_amount;
	private String inv_item_factor1;
	
	private String inv_item_factor2;
	private String inv_item_factor3;
	private String inv_item_factor4;
	private Double inv_batch_stock_item_actural_qty;
	
	private Double inv_batch_stock__item_pending_qty;
	private String inv_batch_stock_item_row_status;
	private String inv_purchase_order_item_batch_No;
	 
	
	private Integer inv_purchase_order_item_base_doc_No;
	private Integer inv_purchase_order_item_doc_number;
	
	private Integer inv_delete_flag;
	private Date inv_batch_stock_update_date;
	private Date inv_create_date;

	private Integer inv_purchase_order_item_doc_number_fk;
	private String inv_batch_stockc_item_doc_series;
	
	private String inv_batch_stock_item_mfg_date;
	private String inv_batch_stock_item_exp_date;
	private Integer inv_purchase_common_master_doc_no_fk;
	private Integer inv_batch_stock_master_doc_no_fk;
	private Integer inv_issue_qty;
	private String inv_batch_code;
	/**
	 * 
	 */
	private Integer hsn;
	private List<InventoryGRNItemDTO> ltinvetorypurchaseorderitemmaster;
	
	private String inv_item_purchase_factor_uom_1;
	private String inv_item_purchase_factor_uom_2;
	private String inv_item_purchase_factor_uom_3;
	private String inv_item_purchase_factor_uom_4;
	private String inv_item_purchase_last_factor_uom;
	
	private Integer inv_batch_stock_fixed_item_qty;
	private Double inv_batch_stock_item_tax_amount_rupess; //Add Tax Amount @author:Paras @Date:24nov 
	private Integer txtPurchaseAppPO; //for append po
    private Integer txtstateid; //for selfid
    private String inv_createdatemaster;
	private String inv_batch_stock_master_purchase_invoice_number;
	private String suppliername;
	private Double netamt;
    
	public String getInv_batch_stock_item_tax_code() {
		return inv_batch_stock_item_tax_code;
	}
	public void setInv_batch_stock_item_tax_code(
			String inv_batch_stock_item_tax_code) {
		this.inv_batch_stock_item_tax_code = inv_batch_stock_item_tax_code;
	}
	public Integer getInv_batch_id() {
		return inv_batch_id;
	}
	public void setInv_batch_id(Integer inv_batch_id) {
		this.inv_batch_id = inv_batch_id;
	}
	public Integer getInv_item_code() {
		return inv_item_code;
	}
	public void setInv_item_code(Integer inv_item_code) {
		this.inv_item_code = inv_item_code;
	}
	public String getInv_batch_item_name() {
		return inv_batch_item_name;
	}
	public void setInv_batch_item_name(String inv_batch_item_name) {
		this.inv_batch_item_name = inv_batch_item_name;
	}
	public Integer getInv_item_qty() {
		return inv_item_qty;
	}
	public void setInv_item_qty(Integer inv_item_qty) {
		this.inv_item_qty = inv_item_qty;
	}
	public Double getInv_item_rate() {
		return inv_item_rate;
	}
	public void setInv_item_rate(Double inv_item_rate) {
		this.inv_item_rate = inv_item_rate;
	}
	public Double getInv_batch_stock_Item_trade_discount_per() {
		return inv_batch_stock_Item_trade_discount_per;
	}
	public void setInv_batch_stock_Item_trade_discount_per(
			Double inv_batch_stock_Item_trade_discount_per) {
		this.inv_batch_stock_Item_trade_discount_per = inv_batch_stock_Item_trade_discount_per;
	}
	
	public Double getInv_batch_stock_Item_trade_discount_rupess() {
		return inv_batch_stock_Item_trade_discount_rupess;
	}
	public void setInv_batch_stock_Item_trade_discount_rupess(
			Double inv_batch_stock_Item_trade_discount_rupess) {
		this.inv_batch_stock_Item_trade_discount_rupess = inv_batch_stock_Item_trade_discount_rupess;
	}
	public Double getInv_batch_stock_item_trade_discount_amount() {
		return inv_batch_stock_item_trade_discount_amount;
	}
	public void setInv_batch_stock_item_trade_discount_amount(
			Double inv_batch_stock_item_trade_discount_amount) {
		this.inv_batch_stock_item_trade_discount_amount = inv_batch_stock_item_trade_discount_amount;
	}
	public Double getInv_batch_stock_item_trade_base_amount() {
		return inv_batch_stock_item_trade_base_amount;
	}
	public void setInv_batch_stock_item_trade_base_amount(
			Double inv_batch_stock_item_trade_base_amount) {
		this.inv_batch_stock_item_trade_base_amount = inv_batch_stock_item_trade_base_amount;
	}
	public Double getInv_batch_stock_item_tax_amount() {
		return inv_batch_stock_item_tax_amount;
	}
	public void setInv_batch_stock_item_tax_amount(
			Double inv_batch_stock_item_tax_amount) {
		this.inv_batch_stock_item_tax_amount = inv_batch_stock_item_tax_amount;
	}
	public Double getInv_item_amount() {
		return inv_item_amount;
	}
	public void setInv_item_amount(Double inv_item_amount) {
		this.inv_item_amount = inv_item_amount;
	}
	public String getInv_item_factor1() {
		return inv_item_factor1;
	}
	public void setInv_item_factor1(String inv_item_factor1) {
		this.inv_item_factor1 = inv_item_factor1;
	}
	public String getInv_item_factor2() {
		return inv_item_factor2;
	}
	public void setInv_item_factor2(String inv_item_factor2) {
		this.inv_item_factor2 = inv_item_factor2;
	}
	public String getInv_item_factor3() {
		return inv_item_factor3;
	}
	public void setInv_item_factor3(String inv_item_factor3) {
		this.inv_item_factor3 = inv_item_factor3;
	}
	public String getInv_item_factor4() {
		return inv_item_factor4;
	}
	public void setInv_item_factor4(String inv_item_factor4) {
		this.inv_item_factor4 = inv_item_factor4;
	}
	public Double getInv_batch_stock_item_actural_qty() {
		return inv_batch_stock_item_actural_qty;
	}
	public void setInv_batch_stock_item_actural_qty(
			Double inv_batch_stock_item_actural_qty) {
		this.inv_batch_stock_item_actural_qty = inv_batch_stock_item_actural_qty;
	}
	public Double getInv_batch_stock__item_pending_qty() {
		return inv_batch_stock__item_pending_qty;
	}
	public void setInv_batch_stock__item_pending_qty(
			Double inv_batch_stock__item_pending_qty) {
		this.inv_batch_stock__item_pending_qty = inv_batch_stock__item_pending_qty;
	}
	public String getInv_batch_stock_item_row_status() {
		return inv_batch_stock_item_row_status;
	}
	public void setInv_batch_stock_item_row_status(
			String inv_batch_stock_item_row_status) {
		this.inv_batch_stock_item_row_status = inv_batch_stock_item_row_status;
	}
	public String getInv_purchase_order_item_batch_No() {
		return inv_purchase_order_item_batch_No;
	}
	public void setInv_purchase_order_item_batch_No(
			String inv_purchase_order_item_batch_No) {
		this.inv_purchase_order_item_batch_No = inv_purchase_order_item_batch_No;
	}
	public Integer getInv_purchase_order_item_base_doc_No() {
		return inv_purchase_order_item_base_doc_No;
	}
	public void setInv_purchase_order_item_base_doc_No(
			Integer inv_purchase_order_item_base_doc_No) {
		this.inv_purchase_order_item_base_doc_No = inv_purchase_order_item_base_doc_No;
	}
	public Integer getInv_purchase_order_item_doc_number() {
		return inv_purchase_order_item_doc_number;
	}
	public void setInv_purchase_order_item_doc_number(
			Integer inv_purchase_order_item_doc_number) {
		this.inv_purchase_order_item_doc_number = inv_purchase_order_item_doc_number;
	}
	public Integer getInv_delete_flag() {
		return inv_delete_flag;
	}
	public void setInv_delete_flag(Integer inv_delete_flag) {
		this.inv_delete_flag = inv_delete_flag;
	}
	public Date getInv_batch_stock_update_date() {
		return inv_batch_stock_update_date;
	}
	public void setInv_batch_stock_update_date(Date inv_batch_stock_update_date) {
		this.inv_batch_stock_update_date = inv_batch_stock_update_date;
	}
	public Date getInv_create_date() {
		return inv_create_date;
	}
	public void setInv_create_date(Date inv_create_date) {
		this.inv_create_date = inv_create_date;
	}
	public Integer getInv_purchase_order_item_doc_number_fk() {
		return inv_purchase_order_item_doc_number_fk;
	}
	public void setInv_purchase_order_item_doc_number_fk(
			Integer inv_purchase_order_item_doc_number_fk) {
		this.inv_purchase_order_item_doc_number_fk = inv_purchase_order_item_doc_number_fk;
	}
	public String getInv_batch_stockc_item_doc_series() {
		return inv_batch_stockc_item_doc_series;
	}
	public void setInv_batch_stockc_item_doc_series(
			String inv_batch_stockc_item_doc_series) {
		this.inv_batch_stockc_item_doc_series = inv_batch_stockc_item_doc_series;
	}
	public String getInv_batch_stock_item_mfg_date() {
		return inv_batch_stock_item_mfg_date;
	}
	public void setInv_batch_stock_item_mfg_date(String inv_batch_stock_item_mfg_date) {
		this.inv_batch_stock_item_mfg_date = inv_batch_stock_item_mfg_date;
	}
	public String getInv_batch_stock_item_exp_date() {
		return inv_batch_stock_item_exp_date;
	}
	public void setInv_batch_stock_item_exp_date(String inv_batch_stock_item_exp_date) {
		this.inv_batch_stock_item_exp_date = inv_batch_stock_item_exp_date;
	}
	public Integer getInv_purchase_common_master_doc_no_fk() {
		return inv_purchase_common_master_doc_no_fk;
	}
	public void setInv_purchase_common_master_doc_no_fk(
			Integer inv_purchase_common_master_doc_no_fk) {
		this.inv_purchase_common_master_doc_no_fk = inv_purchase_common_master_doc_no_fk;
	}
	public Integer getInv_batch_stock_master_doc_no_fk() {
		return inv_batch_stock_master_doc_no_fk;
	}
	public void setInv_batch_stock_master_doc_no_fk(
			Integer inv_batch_stock_master_doc_no_fk) {
		this.inv_batch_stock_master_doc_no_fk = inv_batch_stock_master_doc_no_fk;
	}
	public Integer getInv_issue_qty() {
		return inv_issue_qty;
	}
	public void setInv_issue_qty(Integer inv_issue_qty) {
		this.inv_issue_qty = inv_issue_qty;
	}
	public List<InventoryGRNItemDTO> getLtinvetorypurchaseorderitemmaster() {
		return ltinvetorypurchaseorderitemmaster;
	}
	public void setLtinvetorypurchaseorderitemmaster(
			List<InventoryGRNItemDTO> ltinvetorypurchaseorderitemmaster) {
		this.ltinvetorypurchaseorderitemmaster = ltinvetorypurchaseorderitemmaster;
	}
	public String getInv_batch_code() {
		return inv_batch_code;
	}
	
	public void setInv_batch_code(String inv_batch_code) {
		this.inv_batch_code = inv_batch_code;
	}
	@JsonGetter("inv_item_purchase_factor_uom_1")
	public String getInv_item_purchase_factor_uom_1() {
		return inv_item_purchase_factor_uom_1;
	}
	
	@JsonSetter("inv_item_purchase_factor_uom_1")
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
	@JsonGetter("inv_batch_stock_fixed_item_qty")
	public Integer getInv_batch_stock_fixed_item_qty() {
		return inv_batch_stock_fixed_item_qty;
	}
	@JsonSetter("inv_batch_stock_fixed_item_qty")
	public void setInv_batch_stock_fixed_item_qty(
			Integer inv_batch_stock_fixed_item_qty) {
		this.inv_batch_stock_fixed_item_qty = inv_batch_stock_fixed_item_qty;
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
	@JsonGetter("inv_batch_stock_item_tax_amount_rupess")
	public Double getInv_batch_stock_item_tax_amount_rupess() {
		return inv_batch_stock_item_tax_amount_rupess;
	}
	@JsonSetter("inv_batch_stock_item_tax_amount_rupess")
	public void setInv_batch_stock_item_tax_amount_rupess(
			Double inv_batch_stock_item_tax_amount_rupess) {
		this.inv_batch_stock_item_tax_amount_rupess = inv_batch_stock_item_tax_amount_rupess;
	}
	
	@JsonGetter("hsn")
	public Integer getHsn() {
		return hsn;
	}
	@JsonSetter("hsn")
	public void setHsn(Integer hsn) {
		this.hsn = hsn;
	}
	@JsonGetter("txtPurchaseAppPO")
	public Integer getTxtPurchaseAppPO() {
		return txtPurchaseAppPO;
	}
	@JsonSetter("txtPurchaseAppPO")
	public void setTxtPurchaseAppPO(Integer txtPurchaseAppPO) {
		this.txtPurchaseAppPO = txtPurchaseAppPO;
	}
	@JsonGetter("txtstateid")
	public Integer getTxtstateid() {
		return txtstateid;
	}
	@JsonSetter("txtstateid")
	public void setTxtstateid(Integer txtstateid) {
		this.txtstateid = txtstateid;
	}
	@JsonGetter("inv_createdatemaster")
	public String getInv_createdatemaster() {
		return inv_createdatemaster;
	}
	@JsonSetter("inv_createdatemaster")
	public void setInv_createdatemaster(String inv_createdatemaster) {
		this.inv_createdatemaster = inv_createdatemaster;
	}
	@JsonGetter("inv_batch_stock_master_purchase_invoice_number")
	public String getInv_batch_stock_master_purchase_invoice_number() {
		return inv_batch_stock_master_purchase_invoice_number;
	}
	@JsonSetter("inv_batch_stock_master_purchase_invoice_number")
	public void setInv_batch_stock_master_purchase_invoice_number(
			String inv_batch_stock_master_purchase_invoice_number) {
		this.inv_batch_stock_master_purchase_invoice_number = inv_batch_stock_master_purchase_invoice_number;
	}
	@JsonGetter("suppliername")
	public String getSuppliername() {
		return suppliername;
	}
	@JsonSetter("suppliername")
	public void setSuppliername(String suppliername) {
		this.suppliername = suppliername;
	}
	@JsonGetter("netamt")
	public Double getNetamt() {
		return netamt;
	}
	@JsonSetter("netamt")
	public void setNetamt(Double netamt) {
		this.netamt = netamt;
	}
	
	
	
	
}
