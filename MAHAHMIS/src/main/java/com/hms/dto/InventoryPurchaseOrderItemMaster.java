package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryPurchaseOrderItemMaster {	
	
	private Integer inv_purchase_order_item_master_id;
	private Integer inv_purchase_order_item_code;
	private String inv_purchase_order_item_Name ;
	private Integer inv_purchase_order_item_doc_Qty;
	
	private Double inv_purchase_order_item_unit_price;
	private Double inv_purchase_order_item_trade_discount_per;
	private Double inv_purchase_order_item_trade_discount_rupess;
	private Double inv_purchase_order_item_trade_discount_amount;
	private Double inv_purchase_order_item_trade_base_amount;
	
	 
	private Double inv_purchase_order_item_tax_amount;
	
	private String inv_purchase_order_item_tax_code;
	private Double inv_purchase_order_item_row_amount;
	
	
	private String inv_purchase_order_item_factor1;
	
	private String inv_purchase_order_item_factor2;
	private String inv_purchase_order_item_factor3;
	private String inv_purchase_order_item_factor4;
	private Double inv_purchase_order_item_actural_qty;
	
	private Double inv_purchase_order_item_pending_qty;
	private String inv_purchase_order_item_row_status;
	private String inv_purchase_order_item_batch_No;
	 
	
	private Integer inv_purchase_order_item_base_doc_No;
	private Integer inv_purchase_order_item_doc_number;
	
	private Integer inv_purchase_order_item_delete_flag;
	private Date inv_purchase_order_item_update_date;
	private String inv_purchase_order_item_create_date;

	private Integer inv_purchase_order_item_doc_number_fk;
	private String inv_purchase_order_item_doc_series;
	
	private Integer inv_purchase_order_master_doc_no_fk ; 
	private String inv_purchase_order_master_Supplier_Name;
	private String inv_purchase_order_master_Supplier_Id;
	
	
	private String inv_item_purchase_factor_uom_1;
	private String inv_item_purchase_factor_uom_2; 
	private String inv_item_purchase_factor_uom_3; 
	private String inv_item_purchase_factor_uom_4; 
	private String inv_item_purchase_last_factor_uom;
	
	
	private String inv_opening_stock_item_mfg_date;
	private String inv_opening_stock_item_exp_date;
	private Double inv_purchase_order_item_tax_amount_rupess; // Add Tax amount in Rupess @Author:paras suryawanshi @Date:22Nov2016
	
	
	private Integer hsn;
private String approvFlag;
	
	private String usrName;
	private String userId;
	private String delvDate;
	private String docDate;
	
	private String sendtoClient;
	private String inv_purchase_order_hidden_ip;
	private String purchaseOrderCenterId;
	private String clientIp;
	
	private String mrnId;
	
	private String subInvId;
	private String subInvName;
	
	
	
	public String getApprovFlag() {
		return approvFlag;
	}
	public void setApprovFlag(String approvFlag) {
		this.approvFlag = approvFlag;
	}

	public String getMrnId() {
		return mrnId;
	}

	public void setMrnId(String mrnId) {
		this.mrnId = mrnId;
	}

	
	public String getUsrName() {
		return usrName;
	}
	public void setUsrName(String usrName) {
		this.usrName = usrName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getDelvDate() {
		return delvDate;
	}
	public void setDelvDate(String delvDate) {
		this.delvDate = delvDate;
	}
	public String getDocDate() {
		return docDate;
	}
	public void setDocDate(String docDate) {
		this.docDate = docDate;
	}
	
	
	public String getInv_opening_stock_item_mfg_date() {
		return inv_opening_stock_item_mfg_date;
	}
	public void setInv_opening_stock_item_mfg_date(
			String inv_opening_stock_item_mfg_date) {
		this.inv_opening_stock_item_mfg_date = inv_opening_stock_item_mfg_date;
	}
	public String getInv_opening_stock_item_exp_date() {
		return inv_opening_stock_item_exp_date;
	}
	public void setInv_opening_stock_item_exp_date(
			String inv_opening_stock_item_exp_date) {
		this.inv_opening_stock_item_exp_date = inv_opening_stock_item_exp_date;
	}
	@JsonGetter("inv_purchase_order_item_tax_code")
	public String getInv_purchase_order_item_tax_code() {
		return inv_purchase_order_item_tax_code;
	}
	@JsonSetter("inv_purchase_order_item_tax_code")
	public void setInv_purchase_order_item_tax_code(
			String inv_purchase_order_item_tax_code) {
		this.inv_purchase_order_item_tax_code = inv_purchase_order_item_tax_code;
	}
	
	public Integer getInv_purchase_order_master_doc_no_fk() {
		return inv_purchase_order_master_doc_no_fk;
	}
	public void setInv_purchase_order_master_doc_no_fk(
			Integer inv_purchase_order_master_doc_no_fk) {
		this.inv_purchase_order_master_doc_no_fk = inv_purchase_order_master_doc_no_fk;
	}
	private Date inv_batch_stock_item_mfg_date;
	private Date inv_batch_stock_item_exp_date;
	private String inv_batch_item_name;
	private List<InventoryPurchaseOrderItemMaster> ltinvetorypurchaseorderitemmaster;
	
	@JsonGetter("inv_purchase_order_item_master_id")
	public Integer getInv_purchase_order_item_master_id() {
		return inv_purchase_order_item_master_id;
	}
	@JsonSetter("inv_purchase_order_item_master_id")
	public void setInv_purchase_order_item_master_id(
			Integer inv_purchase_order_item_master_id) {
		this.inv_purchase_order_item_master_id = inv_purchase_order_item_master_id;
	}
	@JsonGetter("inv_purchase_order_item_code")
	public Integer getInv_purchase_order_item_code() {
		return inv_purchase_order_item_code;
	}
	@JsonSetter("inv_purchase_order_item_code")
	public void setInv_purchase_order_item_code(Integer inv_purchase_order_item_code) {
		this.inv_purchase_order_item_code = inv_purchase_order_item_code;
	}
	@JsonGetter("inv_purchase_order_item_Name")
	public String getInv_purchase_order_item_Name() {
		return inv_purchase_order_item_Name;
	}
	@JsonSetter("inv_purchase_order_item_Name")
	public void setInv_purchase_order_item_Name(String inv_purchase_order_item_Name) {
		this.inv_purchase_order_item_Name = inv_purchase_order_item_Name;
	}
	@JsonGetter("inv_purchase_order_item_doc_Qty")
	public Integer getInv_purchase_order_item_doc_Qty() {
		return inv_purchase_order_item_doc_Qty;
	}
	@JsonSetter("inv_purchase_order_item_doc_Qty")
	public void setInv_purchase_order_item_doc_Qty(
			Integer inv_purchase_order_item_doc_Qty) {
		this.inv_purchase_order_item_doc_Qty = inv_purchase_order_item_doc_Qty;
	}
	@JsonGetter("inv_purchase_order_item_unit_price")
	public Double getInv_purchase_order_item_unit_price() {
		return inv_purchase_order_item_unit_price;
	}
	@JsonSetter("inv_purchase_order_item_unit_price")
	public void setInv_purchase_order_item_unit_price(
			Double inv_purchase_order_item_unit_price) {
		this.inv_purchase_order_item_unit_price = inv_purchase_order_item_unit_price;
	}
	@JsonGetter("inv_purchase_order_item_trade_discount_per")
	public Double getInv_purchase_order_item_trade_discount_per() {
		return inv_purchase_order_item_trade_discount_per;
	}
	@JsonSetter("inv_purchase_order_item_trade_discount_per")
	public void setInv_purchase_order_item_trade_discount_per(
			Double inv_purchase_order_item_trade_discount_per) {
		this.inv_purchase_order_item_trade_discount_per = inv_purchase_order_item_trade_discount_per;
	}
	
	@JsonGetter("inv_purchase_order_item_trade_discount_rupess")
	public Double getInv_purchase_order_item_trade_discount_rupess() {
		return inv_purchase_order_item_trade_discount_rupess;
	}
	@JsonSetter("inv_purchase_order_item_trade_discount_rupess")
	public void setInv_purchase_order_item_trade_discount_rupess(
			Double inv_purchase_order_item_trade_discount_rupess) {
		this.inv_purchase_order_item_trade_discount_rupess = inv_purchase_order_item_trade_discount_rupess;
	}
	@JsonGetter("inv_purchase_order_item_trade_discount_amount")
	public Double getInv_purchase_order_item_trade_discount_amount() {
		return inv_purchase_order_item_trade_discount_amount;
	}
	@JsonSetter("inv_purchase_order_item_trade_discount_amount")
	public void setInv_purchase_order_item_trade_discount_amount(
			Double inv_purchase_order_item_trade_discount_amount) {
		this.inv_purchase_order_item_trade_discount_amount = inv_purchase_order_item_trade_discount_amount;
	}
	@JsonGetter("inv_purchase_order_item_trade_base_amount")
	public Double getInv_purchase_order_item_trade_base_amount() {
		return inv_purchase_order_item_trade_base_amount;
	}
	@JsonSetter("inv_purchase_order_item_trade_base_amount")
	public void setInv_purchase_order_item_trade_base_amount(
			Double inv_purchase_order_item_trade_base_amount) {
		this.inv_purchase_order_item_trade_base_amount = inv_purchase_order_item_trade_base_amount;
	}
	@JsonGetter("inv_purchase_order_item_tax_amount")
	public Double getInv_purchase_order_item_tax_amount() {
		return inv_purchase_order_item_tax_amount;
	}
	@JsonSetter("inv_purchase_order_item_tax_amount")
	public void setInv_purchase_order_item_tax_amount(
			Double inv_purchase_order_item_tax_amount) {
		this.inv_purchase_order_item_tax_amount = inv_purchase_order_item_tax_amount;
	}
	@JsonGetter("inv_purchase_order_item_row_amount")
	public Double getInv_purchase_order_item_row_amount() {
		return inv_purchase_order_item_row_amount;
	}
	@JsonSetter("inv_purchase_order_item_row_amount")
	public void setInv_purchase_order_item_row_amount(
			Double inv_purchase_order_item_row_amount) {
		this.inv_purchase_order_item_row_amount = inv_purchase_order_item_row_amount;
	}
	@JsonGetter("inv_purchase_order_item_factor1")
	public String getInv_purchase_order_item_factor1() {
		return inv_purchase_order_item_factor1;
	}
	@JsonSetter("inv_purchase_order_item_factor1")
	public void setInv_purchase_order_item_factor1(
			String inv_purchase_order_item_factor1) {
		this.inv_purchase_order_item_factor1 = inv_purchase_order_item_factor1;
	}
	@JsonGetter("inv_purchase_order_item_factor2")
	public String getInv_purchase_order_item_factor2() {
		return inv_purchase_order_item_factor2;
	}
	@JsonSetter("inv_purchase_order_item_factor2")
	public void setInv_purchase_order_item_factor2(
			String inv_purchase_order_item_factor2) {
		this.inv_purchase_order_item_factor2 = inv_purchase_order_item_factor2;
	}
	@JsonGetter("inv_purchase_order_item_factor3")
	public String getInv_purchase_order_item_factor3() {
		return inv_purchase_order_item_factor3;
	}
	@JsonSetter("inv_purchase_order_item_factor3")
	public void setInv_purchase_order_item_factor3(
			String inv_purchase_order_item_factor3) {
		this.inv_purchase_order_item_factor3 = inv_purchase_order_item_factor3;
	}
	@JsonGetter("inv_purchase_order_item_factor4")
	public String getInv_purchase_order_item_factor4() {
		return inv_purchase_order_item_factor4;
	}
	@JsonSetter("inv_purchase_order_item_factor4")
	public void setInv_purchase_order_item_factor4(
			String inv_purchase_order_item_factor4) {
		this.inv_purchase_order_item_factor4 = inv_purchase_order_item_factor4;
	}
	@JsonGetter("inv_purchase_order_item_actural_qty")
	public Double getInv_purchase_order_item_actural_qty() {
		return inv_purchase_order_item_actural_qty;
	}
	@JsonSetter("inv_purchase_order_item_actural_qty")
	public void setInv_purchase_order_item_actural_qty(
			Double inv_purchase_order_item_actural_qty) {
		this.inv_purchase_order_item_actural_qty = inv_purchase_order_item_actural_qty;
	}
	@JsonGetter("inv_purchase_order_item_pending_qty")
	public Double getInv_purchase_order_item_pending_qty() {
		return inv_purchase_order_item_pending_qty;
	}
	@JsonSetter("inv_purchase_order_item_pending_qty")
	public void setInv_purchase_order_item_pending_qty(
			Double inv_purchase_order_item_pending_qty) {
		this.inv_purchase_order_item_pending_qty = inv_purchase_order_item_pending_qty;
	}
	@JsonGetter("inv_purchase_order_item_row_status")
	public String getInv_purchase_order_item_row_status() {
		return inv_purchase_order_item_row_status;
	}
	@JsonSetter("inv_purchase_order_item_row_status")
	public void setInv_purchase_order_item_row_status(
			String inv_purchase_order_item_row_status) {
		this.inv_purchase_order_item_row_status = inv_purchase_order_item_row_status;
	}
	@JsonGetter("inv_purchase_order_item_batch_No")
	public String getInv_purchase_order_item_batch_No() {
		return inv_purchase_order_item_batch_No;
	}
	@JsonSetter("inv_purchase_order_item_batch_No")
	public void setInv_purchase_order_item_batch_No(
			String inv_purchase_order_item_batch_No) {
		this.inv_purchase_order_item_batch_No = inv_purchase_order_item_batch_No;
	}
	@JsonGetter("inv_purchase_order_item_base_doc_No")
	public Integer getInv_purchase_order_item_base_doc_No() {
		return inv_purchase_order_item_base_doc_No;
	}
	@JsonSetter("inv_purchase_order_item_base_doc_No")
	public void setInv_purchase_order_item_base_doc_No(
			Integer inv_purchase_order_item_base_doc_No) {
		this.inv_purchase_order_item_base_doc_No = inv_purchase_order_item_base_doc_No;
	}
	@JsonGetter("inv_purchase_order_item_doc_number")
	public Integer getInv_purchase_order_item_doc_number() {
		return inv_purchase_order_item_doc_number;
	}
	@JsonSetter("inv_purchase_order_item_doc_number")
	public void setInv_purchase_order_item_doc_number(
			Integer inv_purchase_order_item_doc_number) {
		this.inv_purchase_order_item_doc_number = inv_purchase_order_item_doc_number;
	}
	@JsonGetter("inv_purchase_order_item_delete_flag")
	public Integer getInv_purchase_order_item_delete_flag() {
		return inv_purchase_order_item_delete_flag;
	}
	@JsonSetter("inv_purchase_order_item_delete_flag")
	public void setInv_purchase_order_item_delete_flag(
			Integer inv_purchase_order_item_delete_flag) {
		this.inv_purchase_order_item_delete_flag = inv_purchase_order_item_delete_flag;
	}
	@JsonGetter("inv_purchase_order_item_update_date")
	public Date getInv_purchase_order_item_update_date() {
		return inv_purchase_order_item_update_date;
	}
	@JsonSetter("inv_purchase_order_item_update_date")
	public void setInv_purchase_order_item_update_date(
			Date inv_purchase_order_item_update_date) {
		this.inv_purchase_order_item_update_date = inv_purchase_order_item_update_date;
	}
	@JsonGetter("inv_purchase_order_item_create_date")
	public String getInv_purchase_order_item_create_date() {
		return inv_purchase_order_item_create_date;
	}
	@JsonSetter("inv_purchase_order_item_create_date")
	public void setInv_purchase_order_item_create_date(
			String inv_purchase_order_item_create_date) {
		this.inv_purchase_order_item_create_date = inv_purchase_order_item_create_date;
	}
	@JsonGetter("inv_purchase_order_item_doc_number_fk")
	public Integer getInv_purchase_order_item_doc_number_fk() {
		return inv_purchase_order_item_doc_number_fk;
	}
	@JsonSetter("inv_purchase_order_item_doc_number_fk")
	public void setInv_purchase_order_item_doc_number_fk(
			Integer inv_purchase_order_item_doc_number_fk) {
		this.inv_purchase_order_item_doc_number_fk = inv_purchase_order_item_doc_number_fk;
	}
	@JsonGetter("inv_purchase_order_item_doc_series")
	public String getInv_purchase_order_item_doc_series() {
		return inv_purchase_order_item_doc_series;
	}
	@JsonSetter("inv_purchase_order_item_doc_series")
	public void setInv_purchase_order_item_doc_series(
			String inv_purchase_order_item_doc_series) {
		this.inv_purchase_order_item_doc_series = inv_purchase_order_item_doc_series;
	}
	@JsonGetter("inv_batch_stock_item_mfg_date")
	public Date getInv_batch_stock_item_mfg_date() {
		return inv_batch_stock_item_mfg_date;
	}
	@JsonSetter("inv_batch_stock_item_mfg_date")
	public void setInv_batch_stock_item_mfg_date(Date inv_batch_stock_item_mfg_date) {
		this.inv_batch_stock_item_mfg_date = inv_batch_stock_item_mfg_date;
	}
	@JsonGetter("inv_batch_stock_item_exp_date")
	public Date getInv_batch_stock_item_exp_date() {
		return inv_batch_stock_item_exp_date;
	}
	@JsonSetter("inv_batch_stock_item_exp_date")
	public void setInv_batch_stock_item_exp_date(Date inv_batch_stock_item_exp_date) {
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
	@JsonGetter("ltinvetorypurchaseorderitemmaster")
	public List<InventoryPurchaseOrderItemMaster> getLtinvetorypurchaseorderitemmaster() {
		return ltinvetorypurchaseorderitemmaster;
	}
	@JsonSetter("ltinvetorypurchaseorderitemmaster")
	public void setLtinvetorypurchaseorderitemmaster(
			List<InventoryPurchaseOrderItemMaster> ltinvetorypurchaseorderitemmaster) {
		this.ltinvetorypurchaseorderitemmaster = ltinvetorypurchaseorderitemmaster;
	}
	@JsonGetter("inv_purchase_order_master_Supplier_Name")
	public String getInv_purchase_order_master_Supplier_Name() {
		return inv_purchase_order_master_Supplier_Name;
	}
	@JsonSetter("inv_purchase_order_master_Supplier_Name")
	public void setInv_purchase_order_master_Supplier_Name(
			String inv_purchase_order_master_Supplier_Name) {
		this.inv_purchase_order_master_Supplier_Name = inv_purchase_order_master_Supplier_Name;
	}
	@JsonGetter("inv_purchase_order_master_Supplier_Id")
	public String getInv_purchase_order_master_Supplier_Id() {
		return inv_purchase_order_master_Supplier_Id;
	}
	@JsonSetter("inv_purchase_order_master_Supplier_Id")
	public void setInv_purchase_order_master_Supplier_Id(
			String inv_purchase_order_master_Supplier_Id) {
		this.inv_purchase_order_master_Supplier_Id = inv_purchase_order_master_Supplier_Id;
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
	@JsonGetter("inv_item_purchase_factor_uom_2")
	public String getInv_item_purchase_factor_uom_2() {
		return inv_item_purchase_factor_uom_2;
	}
	@JsonSetter("inv_item_purchase_factor_uom_2")
	public void setInv_item_purchase_factor_uom_2(
			String inv_item_purchase_factor_uom_2) {
		this.inv_item_purchase_factor_uom_2 = inv_item_purchase_factor_uom_2;
	}
	@JsonGetter("inv_item_purchase_factor_uom_3")
	public String getInv_item_purchase_factor_uom_3() {
		return inv_item_purchase_factor_uom_3;
	}
	@JsonSetter("inv_item_purchase_factor_uom_3")
	public void setInv_item_purchase_factor_uom_3(
			String inv_item_purchase_factor_uom_3) {
		this.inv_item_purchase_factor_uom_3 = inv_item_purchase_factor_uom_3;
	}
	
	@JsonGetter("inv_item_purchase_factor_uom_4")
	public String getInv_item_purchase_factor_uom_4() {
		return inv_item_purchase_factor_uom_4;
	}
	
	@JsonSetter("inv_item_purchase_factor_uom_4")
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
	
	@JsonGetter("inv_purchase_order_item_tax_amount_rupess")
	public Double getInv_purchase_order_item_tax_amount_rupess() {
		return inv_purchase_order_item_tax_amount_rupess;
	}
	@JsonSetter("inv_purchase_order_item_tax_amount_rupess")
	public void setInv_purchase_order_item_tax_amount_rupess(
			Double inv_purchase_order_item_tax_amount_rupess) {
		this.inv_purchase_order_item_tax_amount_rupess = inv_purchase_order_item_tax_amount_rupess;
	}
	

	public String getSendtoClient() 
	{
		return sendtoClient;
	}

	 
	public void setSendtoClient(String sendtoClient) 
	{
		this.sendtoClient = sendtoClient;
	}
	
	
	public String getPurchaseOrderCenterId()
	{
		return purchaseOrderCenterId;
	}
		 
	 
	public void setPurchaseOrderCenterId(String purchaseOrderCenterId) 
	{
		this.purchaseOrderCenterId = purchaseOrderCenterId;
	}
	
	 
	public String getInv_purchase_order_hidden_ip() {
		return inv_purchase_order_hidden_ip;
	}

 
	public void setInv_purchase_order_hidden_ip(String inv_purchase_order_hidden_ip) {
		this.inv_purchase_order_hidden_ip = inv_purchase_order_hidden_ip;
	}
	
	 
	public String getClientIp() {
		return clientIp;
	}
 
	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}
	
	
	public String getSubInvId() {
		return subInvId;
	}


	public void setSubInvId(String subInvId) {
		this.subInvId = subInvId;
	}


	public String getSubInvName() {
		return subInvName;
	}


	public void setSubInvName(String subInvName) {
		this.subInvName = subInvName;
	}
	@JsonGetter("hsn")
	public Integer getHsn() {
		return hsn;
	}
	@JsonSetter("hsn")
	public void setHsn(Integer hsn) {
		this.hsn = hsn;
	}
	
	
	
}
