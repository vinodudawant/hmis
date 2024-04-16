package com.hms.dto;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.codehaus.jackson.map.ObjectMapper;

public class InventoryPurchaseCommonItemMaster implements Serializable{

	private Integer inv_purchase_common_item_master_id;
	private Integer inv_purchase_common_item_code;
	private String inv_purchase_common_item_Name ;
	private Integer inv_purchase_common_item_doc_Qty;
	
	private Double inv_purchase_common_item_unit_price;
	private Double inv_purchase_common_item_trade_discount_per;
	
	private Double inv_purchase_common_item_trade_discount_rupess;
	
	private Double inv_purchase_common_item_trade_discount_amount;
	private Double inv_purchase_common_item_trade_base_amount;
	
	private String inv_purchase_common_item_tax_code;
	private Double inv_purchase_common_item_tax_amount;
	private Double inv_purchase_common_item_row_amount;
	private String inv_purchase_common_item_factor1;
	
	private String inv_purchase_common_item_factor2;
	private String inv_purchase_common_item_factor3;
	private String inv_purchase_common_item_factor4;
	private Double inv_purchase_common_item_actural_qty;
	
	private Double inv_purchase_common_item_pending_qty;
	private String inv_purchase_common_item_row_status;
	private String inv_purchase_common_item_batch_No;
	private String inv_purchase_common_item__wh_code;
	
	private Integer inv_purchase_common_item_base_doc_No;
	private Integer inv_purchase_common_item_doc_number;
	
	private List<InventoryBatchStockDTO> ltbatchstockDTO;

	private Integer inv_purchase_common_item_delete_flag;
	private String inv_purchase_common_item_update_date;
	private String inv_purchase_common_item_create_date;

	private Integer inv_purchase_common_item_doc_number_fk;
	private String inv_purchase_common_item_doc_series;
	
	private String inv_batch_stock_item_mfg_date;
	private String inv_batch_stock_item_exp_date;
	private String inv_batch_item_name;
	
	private String item_purchase_factor_uom_1;
	private String item_purchase_factor_uom_2;
	private String item_purchase_factor_uom_3;
	private String item_purchase_factor_uom_4;
	private String inv_item_purchase_last_factor_uom;
	private String invsrnoformainteitem;
	private Integer invgrnid;
	
	private String inv_purchase_enquiry_expected_date;
	private String inv_purchase_enquiry_lead_time;
	private String inv_purchase_enquiry_lead_time_in_words;
	private String inv_purchase_enquiry_min_cost;
	private String inv_purchase_enquiry_max_cost;
	
	private Integer inv_hsn;
	private Integer inv_batch_stock_fixed_item_qty;
	private Double inv_purchase_common_item_tax_amount_rupess; //Add Tax Amount in Rs purchase quotation @Author:Paras @Date:23nov
	private Integer txtPurchaseAppPO; //for append po
    private Integer txtstateid; //for selfid
    private Integer txtPurchaseAppchallan;//fpr challan
	private List<InventoryPurchaseCommonItemMaster> ltinvetorypurchasecommonitemmaster;
	private List<MaintainanceMachineDTO> ltMaintainanceMachineDTO;

	@JsonGetter("inv_purchase_common_item_master_id")
	public Integer getInv_purchase_common_item_master_id() {
		return inv_purchase_common_item_master_id;
	}

	@JsonSetter("inv_purchase_common_item_master_id")
	public void setInv_purchase_common_item_master_id(
			Integer inv_purchase_common_item_master_id) {
		this.inv_purchase_common_item_master_id = inv_purchase_common_item_master_id;
	}

	@JsonGetter("inv_purchase_common_item_code")
	public Integer getInv_purchase_common_item_code() {
		return inv_purchase_common_item_code;
	}

	@JsonSetter("inv_purchase_common_item_code")
	public void setInv_purchase_common_item_code(
			Integer inv_purchase_common_item_code) {
		this.inv_purchase_common_item_code = inv_purchase_common_item_code;
	}
	
	@JsonGetter("inv_purchase_common_item_Name")
	public String getInv_purchase_common_item_Name() {
		return inv_purchase_common_item_Name;
	}

	@JsonSetter("inv_purchase_common_item_Name")
	public void setInv_purchase_common_item_Name(
			String inv_purchase_common_item_Name) {
		this.inv_purchase_common_item_Name = inv_purchase_common_item_Name;
	}

	@JsonGetter("inv_purchase_common_item_doc_Qty")
	public Integer getInv_purchase_common_item_doc_Qty() {
		return inv_purchase_common_item_doc_Qty;
	}

	@JsonSetter("inv_purchase_common_item_doc_Qty")
	public void setInv_purchase_common_item_doc_Qty(
			Integer inv_purchase_common_item_doc_Qty) {
		this.inv_purchase_common_item_doc_Qty = inv_purchase_common_item_doc_Qty;
	}

	@JsonGetter("inv_purchase_common_item_unit_price")
	public Double getInv_purchase_common_item_unit_price() {
		return inv_purchase_common_item_unit_price;
	}

	@JsonSetter("inv_purchase_common_item_unit_price")
	public void setInv_purchase_common_item_unit_price(
			Double inv_purchase_common_item_unit_price) {
		this.inv_purchase_common_item_unit_price = inv_purchase_common_item_unit_price;
	}

	@JsonGetter("inv_purchase_common_item_trade_discount_per")
	public Double getInv_purchase_common_item_trade_discount_per() {
		return inv_purchase_common_item_trade_discount_per;
	}

	@JsonSetter("inv_purchase_common_item_trade_discount_per")
	public void setInv_purchase_common_item_trade_discount_per(
			Double inv_purchase_common_item_trade_discount_per) {
		this.inv_purchase_common_item_trade_discount_per = inv_purchase_common_item_trade_discount_per;
	}
	@JsonGetter("inv_purchase_common_item_trade_discount_rupess")
	public Double getInv_purchase_common_item_trade_discount_rupess() {
		return inv_purchase_common_item_trade_discount_rupess;
	}

	@JsonSetter("inv_purchase_common_item_trade_discount_rupess")
	public void setInv_purchase_common_item_trade_discount_rupess(
			Double inv_purchase_common_item_trade_discount_rupess) {
		this.inv_purchase_common_item_trade_discount_rupess = inv_purchase_common_item_trade_discount_rupess;
	}

	@JsonGetter("inv_purchase_common_item_trade_discount_amount")
	public Double getInv_purchase_common_item_trade_discount_amount() {
		return inv_purchase_common_item_trade_discount_amount;
	}

	@JsonSetter("inv_purchase_common_item_trade_discount_amount")
	public void setInv_purchase_common_item_trade_discount_amount(
			Double inv_purchase_common_item_trade_discount_amount) {
		this.inv_purchase_common_item_trade_discount_amount = inv_purchase_common_item_trade_discount_amount;
	}

	@JsonGetter("inv_purchase_common_item_trade_base_amount")
	public Double getInv_purchase_common_item_trade_base_amount() {
		return inv_purchase_common_item_trade_base_amount;
	}

	@JsonSetter("inv_purchase_common_item_trade_base_amount")
	public void setInv_purchase_common_item_trade_base_amount(
			Double inv_purchase_common_item_trade_base_amount) {
		this.inv_purchase_common_item_trade_base_amount = inv_purchase_common_item_trade_base_amount;
	}

	@JsonGetter("inv_purchase_common_item_tax_code")
	public String getInv_purchase_common_item_tax_code() {
		return inv_purchase_common_item_tax_code;
	}

	@JsonSetter("inv_purchase_common_item_tax_code")
	public void setInv_purchase_common_item_tax_code(
			String inv_purchase_common_item_tax_code) {
		this.inv_purchase_common_item_tax_code = inv_purchase_common_item_tax_code;
	}

	@JsonGetter("inv_purchase_common_item_tax_amount")
	public Double getInv_purchase_common_item_tax_amount() {
		return inv_purchase_common_item_tax_amount;
	}

	@JsonSetter("inv_purchase_common_item_tax_amount")
	public void setInv_purchase_common_item_tax_amount(
			Double inv_purchase_common_item_tax_amount) {
		this.inv_purchase_common_item_tax_amount = inv_purchase_common_item_tax_amount;
	}

	@JsonGetter("inv_purchase_common_item_row_amount")
	public Double getInv_purchase_common_item_row_amount() {
		return inv_purchase_common_item_row_amount;
	}

	@JsonSetter("inv_purchase_common_item_row_amount")
	public void setInv_purchase_common_item_row_amount(
			Double inv_purchase_common_item_row_amount) {
		this.inv_purchase_common_item_row_amount = inv_purchase_common_item_row_amount;
	}

	@JsonGetter("inv_purchase_common_item_factor1")
	public String getInv_purchase_common_item_factor1() {
		return inv_purchase_common_item_factor1;
	}

	@JsonSetter("inv_purchase_common_item_factor1")
	public void setInv_purchase_common_item_factor1(
			String inv_purchase_common_item_factor1) {
		this.inv_purchase_common_item_factor1 = inv_purchase_common_item_factor1;
	}

	@JsonGetter("inv_purchase_common_item_factor2")
	public String getInv_purchase_common_item_factor2() {
		return inv_purchase_common_item_factor2;
	}

	@JsonSetter("inv_purchase_common_item_factor2")
	public void setInv_purchase_common_item_factor2(
			String inv_purchase_common_item_factor2) {
		this.inv_purchase_common_item_factor2 = inv_purchase_common_item_factor2;
	}

	@JsonGetter("inv_purchase_common_item_factor3")
	public String getInv_purchase_common_item_factor3() {
		return inv_purchase_common_item_factor3;
	}

	@JsonSetter("inv_purchase_common_item_factor3")
	public void setInv_purchase_common_item_factor3(
			String inv_purchase_common_item_factor3) {
		this.inv_purchase_common_item_factor3 = inv_purchase_common_item_factor3;
	}

	@JsonGetter("inv_purchase_common_item_factor4")
	public String getInv_purchase_common_item_factor4() {
		return inv_purchase_common_item_factor4;
	}

	@JsonSetter("inv_purchase_common_item_factor4")
	public void setInv_purchase_common_item_factor4(
			String inv_purchase_common_item_factor4) {
		this.inv_purchase_common_item_factor4 = inv_purchase_common_item_factor4;
	}

	@JsonGetter("inv_purchase_common_item_actural_qty")
	public Double getInv_purchase_common_item_actural_qty() {
		return inv_purchase_common_item_actural_qty;
	}

	@JsonSetter("inv_purchase_common_item_actural_qty")
	public void setInv_purchase_common_item_actural_qty(
			Double inv_purchase_common_item_actural_qty) {
		this.inv_purchase_common_item_actural_qty = inv_purchase_common_item_actural_qty;
	}

	@JsonGetter("inv_purchase_common_item_pending_qty")
	public Double getInv_purchase_common_item_pending_qty() {
		return inv_purchase_common_item_pending_qty;
	}

	@JsonSetter("inv_purchase_common_item_pending_qty")
	public void setInv_purchase_common_item_pending_qty(
			Double inv_purchase_common_item_pending_qty) {
		this.inv_purchase_common_item_pending_qty = inv_purchase_common_item_pending_qty;
	}

	@JsonGetter("inv_purchase_common_item_row_status")
	public String getInv_purchase_common_item_row_status() {
		return inv_purchase_common_item_row_status;
	}

	@JsonSetter("inv_purchase_common_item_row_status")
	public void setInv_purchase_common_item_row_status(
			String inv_purchase_common_item_row_status) {
		this.inv_purchase_common_item_row_status = inv_purchase_common_item_row_status;
	}

	@JsonGetter("inv_purchase_common_item_batch_No")
	public String getInv_purchase_common_item_batch_No() {
		return inv_purchase_common_item_batch_No;
	}

	@JsonSetter("inv_purchase_common_item_batch_No")
	public void setInv_purchase_common_item_batch_No(
			String inv_purchase_common_item_batch_No) {
		this.inv_purchase_common_item_batch_No = inv_purchase_common_item_batch_No;
	}

	@JsonGetter("inv_purchase_common_item__wh_code")
	public String getInv_purchase_common_item__wh_code() {
		return inv_purchase_common_item__wh_code;
	}

	@JsonSetter("inv_purchase_common_item__wh_code")
	public void setInv_purchase_common_item__wh_code(
			String inv_purchase_common_item__wh_code) {
		this.inv_purchase_common_item__wh_code = inv_purchase_common_item__wh_code;
	}

	@JsonGetter("inv_purchase_common_item_base_doc_No")
	public Integer getInv_purchase_common_item_base_doc_No() {
		return inv_purchase_common_item_base_doc_No;
	}

	@JsonSetter("inv_purchase_common_item_base_doc_No")
	public void setInv_purchase_common_item_base_doc_No(
			Integer inv_purchase_common_item_base_doc_No) {
		this.inv_purchase_common_item_base_doc_No = inv_purchase_common_item_base_doc_No;
	}

	@JsonGetter("inv_purchase_common_item_doc_number")
	public Integer getInv_purchase_common_item_doc_number() {
		return inv_purchase_common_item_doc_number;
	}

	@JsonSetter("inv_purchase_common_item_doc_number")
	public void setInv_purchase_common_item_doc_number(
			Integer inv_purchase_common_item_doc_number) {
		this.inv_purchase_common_item_doc_number = inv_purchase_common_item_doc_number;
	}

	 @JsonGetter("inv_purchase_common_item_delete_flag")	
	public Integer getInv_purchase_common_item_delete_flag() {
		return inv_purchase_common_item_delete_flag;
	}

	 @JsonSetter("inv_purchase_common_item_delete_flag")
	public void setInv_purchase_common_item_delete_flag(
			Integer inv_purchase_common_item_delete_flag) {
		this.inv_purchase_common_item_delete_flag = inv_purchase_common_item_delete_flag;
	}

	 @JsonGetter("inv_purchase_common_item_update_date")
	public String getInv_purchase_common_item_update_date() {
		return inv_purchase_common_item_update_date;
	}

	 @JsonSetter("inv_purchase_common_item_update_date")
	public void setInv_purchase_common_item_update_date(
			String inv_purchase_common_item_update_date) {
		this.inv_purchase_common_item_update_date = inv_purchase_common_item_update_date;
	}

	 @JsonGetter("inv_purchase_common_item_create_date")
	public String getInv_purchase_common_item_create_date() {
		return inv_purchase_common_item_create_date;
	}

	 @JsonSetter("inv_purchase_common_item_create_date")
	public void setInv_purchase_common_item_create_date(
			String inv_purchase_common_item_create_date) {
		this.inv_purchase_common_item_create_date = inv_purchase_common_item_create_date;
	}

	@JsonGetter("inv_purchase_common_item_doc_number_fk")
	public Integer getInv_purchase_common_item_doc_number_fk() {
		return inv_purchase_common_item_doc_number_fk;

	}

	@JsonSetter("inv_purchase_common_item_doc_number_fk")
	public void setInv_purchase_common_item_doc_number_fk(
			Integer inv_purchase_common_item_doc_number_fk) {
		this.inv_purchase_common_item_doc_number_fk = inv_purchase_common_item_doc_number_fk;
	}

	@JsonGetter("inv_purchase_common_item_doc_series")
	public String getInv_purchase_common_item_doc_series() {
		return inv_purchase_common_item_doc_series;
	}

	@JsonSetter("inv_purchase_common_item_doc_series")
	public void setInv_purchase_common_item_doc_series(
			String inv_purchase_common_item_doc_series) {
		this.inv_purchase_common_item_doc_series = inv_purchase_common_item_doc_series;
	}
	@JsonGetter("inv_batch_stock_item_mfg_date")
	public String getInv_batch_stock_item_mfg_date() {
		return inv_batch_stock_item_mfg_date;
	}

	@JsonSetter("inv_batch_stock_item_mfg_date")
	public void setInv_batch_stock_item_mfg_date(String inv_batch_stock_item_mfg_date) {
		this.inv_batch_stock_item_mfg_date = inv_batch_stock_item_mfg_date;
	}

	@JsonGetter("inv_batch_stock_item_exp_date")
	public String getInv_batch_stock_item_exp_date() {
		return inv_batch_stock_item_exp_date;
	}

	@JsonSetter("inv_batch_stock_item_exp_date")
	public void setInv_batch_stock_item_exp_date(String inv_batch_stock_item_exp_date) {
		this.inv_batch_stock_item_exp_date = inv_batch_stock_item_exp_date;
	}
	
	@JsonGetter("inv_batch_item_name")
	public String getInv_batch_item_name() {
		return inv_batch_item_name;
	}

	@JsonSetter("inv_batch_item_name")
	public void setInv_batch_item_name(String inv_batch_item_name) {
		this.inv_batch_item_name = inv_batch_item_name;
	}
	
	@JsonGetter("item_purchase_factor_uom_1")
	public String getItem_purchase_factor_uom_1() {
		return item_purchase_factor_uom_1;
	}
	@JsonSetter("item_purchase_factor_uom_1")
	public void setItem_purchase_factor_uom_1(String item_purchase_factor_uom_1) {
		this.item_purchase_factor_uom_1 = item_purchase_factor_uom_1;
	}

	@JsonGetter("item_purchase_factor_uom_2")
	public String getItem_purchase_factor_uom_2() {
		return item_purchase_factor_uom_2;
	}

	@JsonSetter("item_purchase_factor_uom_2")
	public void setItem_purchase_factor_uom_2(String item_purchase_factor_uom_2) {
		this.item_purchase_factor_uom_2 = item_purchase_factor_uom_2;
	}

	@JsonGetter("item_purchase_factor_uom_3")
	public String getItem_purchase_factor_uom_3() {
		return item_purchase_factor_uom_3;
	}

	@JsonSetter("item_purchase_factor_uom_3")
	public void setItem_purchase_factor_uom_3(String item_purchase_factor_uom_3) {
		this.item_purchase_factor_uom_3 = item_purchase_factor_uom_3;
	}

	@JsonGetter("item_purchase_factor_uom_4")
	public String getItem_purchase_factor_uom_4() {
		return item_purchase_factor_uom_4;
	}
	@JsonSetter("item_purchase_factor_uom_4")
	public void setItem_purchase_factor_uom_4(String item_purchase_factor_uom_4) {
		this.item_purchase_factor_uom_4 = item_purchase_factor_uom_4;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	@JsonGetter("ltinvetorypurchasecommonitemmaster")
	public List<InventoryPurchaseCommonItemMaster> getLtinvetorypurchasecommonitemmaster() {
		return ltinvetorypurchasecommonitemmaster;
	}

	 
	@JsonSetter("ltinvetorypurchasecommonitemmaster")
	public void setLtinvetorypurchasecommonitemmaster(
			List<InventoryPurchaseCommonItemMaster> ltinvetorypurchasecommonitemmaster) {
		this.ltinvetorypurchasecommonitemmaster = ltinvetorypurchasecommonitemmaster;
	}

	@JsonGetter("ltbatchstockDTO")
	public List<InventoryBatchStockDTO> getLtbatchstockDTO() {
		return ltbatchstockDTO;
	}
	
	@JsonSetter("ltbatchstockDTO")
	public void setLtbatchstockDTO(List<InventoryBatchStockDTO> ltbatchstockDTO) {
		this.ltbatchstockDTO = ltbatchstockDTO;
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
 	
	 
	
	@JsonGetter("inv_purchase_enquiry_expected_date")
	public String getInv_purchase_enquiry_expected_date() {
		return inv_purchase_enquiry_expected_date;
	}

	@JsonSetter("inv_purchase_enquiry_expected_date")
	public void setInv_purchase_enquiry_expected_date(
			String inv_purchase_enquiry_expected_date) {
		this.inv_purchase_enquiry_expected_date = inv_purchase_enquiry_expected_date;
	}

	@JsonGetter("inv_purchase_enquiry_lead_time")
	public String getInv_purchase_enquiry_lead_time() {
		return inv_purchase_enquiry_lead_time;
	}

	@JsonSetter("inv_purchase_enquiry_lead_time")
	public void setInv_purchase_enquiry_lead_time(
			String inv_purchase_enquiry_lead_time) {
		this.inv_purchase_enquiry_lead_time = inv_purchase_enquiry_lead_time;
	}

	@JsonGetter("inv_purchase_enquiry_lead_time_in_words")
	public String getInv_purchase_enquiry_lead_time_in_words() {
		return inv_purchase_enquiry_lead_time_in_words;
	}

	@JsonSetter("inv_purchase_enquiry_lead_time_in_words")
	public void setInv_purchase_enquiry_lead_time_in_words(
			String inv_purchase_enquiry_lead_time_in_words) {
		this.inv_purchase_enquiry_lead_time_in_words = inv_purchase_enquiry_lead_time_in_words;
	}
	
	@JsonGetter("inv_purchase_enquiry_min_cost")
	public String getInv_purchase_enquiry_min_cost() {
		return inv_purchase_enquiry_min_cost;
	}
	@JsonSetter("inv_purchase_enquiry_min_cost")
	public void setInv_purchase_enquiry_min_cost(
			String inv_purchase_enquiry_min_cost) {
		this.inv_purchase_enquiry_min_cost = inv_purchase_enquiry_min_cost;
	}

	@JsonGetter("inv_purchase_enquiry_max_cost")
	public String getInv_purchase_enquiry_max_cost() {
		return inv_purchase_enquiry_max_cost;
	}
	
	@JsonSetter("inv_purchase_enquiry_max_cost")
	public void setInv_purchase_enquiry_max_cost(
			String inv_purchase_enquiry_max_cost) {
		this.inv_purchase_enquiry_max_cost = inv_purchase_enquiry_max_cost;
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

	
	@JsonGetter("inv_purchase_common_item_tax_amount_rupess")
	public Double getInv_purchase_common_item_tax_amount_rupess() {
		return inv_purchase_common_item_tax_amount_rupess;
	}
	@JsonSetter("inv_purchase_common_item_tax_amount_rupess")
	public void setInv_purchase_common_item_tax_amount_rupess(
			Double inv_purchase_common_item_tax_amount_rupess) {
		this.inv_purchase_common_item_tax_amount_rupess = inv_purchase_common_item_tax_amount_rupess;
	}
	
	
	
	
	

	public String getInvsrnoformainteitem() {
		return invsrnoformainteitem;
	}

	public void setInvsrnoformainteitem(String invsrnoformainteitem) {
		this.invsrnoformainteitem = invsrnoformainteitem;
	}

	public Integer getInvgrnid() {
		return invgrnid;
	}

	public void setInvgrnid(Integer invgrnid) {
		this.invgrnid = invgrnid;
	}

	@JsonGetter("ltMaintainanceMachineDTO")
	public List<MaintainanceMachineDTO> getLtMaintainanceMachineDTO() {
		return ltMaintainanceMachineDTO;
	}

	@JsonSetter("ltMaintainanceMachineDTO")
	public void setLtMaintainanceMachineDTO(List<MaintainanceMachineDTO> ltMaintainanceMachineDTO) {
		this.ltMaintainanceMachineDTO = ltMaintainanceMachineDTO;
	}
	@JsonGetter("inv_purchase_common_item_apndpo")
	public Integer getTxtPurchaseAppPO() {
		return txtPurchaseAppPO;
	}
	@JsonSetter("inv_purchase_common_item_apndpo")
	public void setTxtPurchaseAppPO(Integer txtPurchaseAppPO) {
		this.txtPurchaseAppPO = txtPurchaseAppPO;
	}

	@JsonGetter("inv_stateid")
	public Integer getTxtstateid() {
		return txtstateid;
	}
	@JsonSetter("inv_stateid")
	public void setTxtstateid(Integer txtstateid) {
		this.txtstateid = txtstateid;
	}
	@JsonGetter("inv_purchase_common_item_challan")
	public Integer getTxtPurchaseAppchallan() {
		return txtPurchaseAppchallan;
	}
	@JsonSetter("inv_purchase_common_item_challan")
	public void setTxtPurchaseAppchallan(Integer txtPurchaseAppchallan) {
		this.txtPurchaseAppchallan = txtPurchaseAppchallan;
	}

	public Integer getInv_hsn() {
		return inv_hsn;
	}

	public void setInv_hsn(Integer inv_hsn) {
		this.inv_hsn = inv_hsn;
	}
	
	
	
	
	/*//mapper config
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		mapper.setSerializationInclusion(Include.NON_NULL);
		mapper.setSerializationInclusion(Include.NON_EMPTY);
		mapper.configure(Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true );
		InventoryPurchaseCommonItemMaster oldUser = mapper.readValue(jsonUser, InventoryPurchaseCommonItemMaster.class);*/

}
