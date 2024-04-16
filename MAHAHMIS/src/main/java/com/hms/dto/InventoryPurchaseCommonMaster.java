package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

/**
 * @author Administrator
 *
 */
/**
 * @author user
 *
 */
public class InventoryPurchaseCommonMaster {

	
	private Integer inv_purchase_common_master_doc_no;
	private String inv_purchase_common_master_doc_date;
	private String inv_purchase_common_master_mobile_number;
	private String inv_purchase_common_master_Supplier_Name;
	
	private Integer inv_purchase_common_master_Supplier_Id;
	private String inv_purchase_common_master_doc_Series;
	private String inv_purchase_common_master_reference_no;
	private String inv_purchase_common_master_Address;
	
	private String inv_purchase_common_master_delivery_date;
	
	private String inv_purchase_common_master_status;
	private Integer inv_purchase_common_master_total_doc_qty;
	private Double inv_purchase_common_master_total_discount;
	private String inv_purchase_common_master_local_currency;
	private Integer inv_purchase_common_master_purchase_Request_No;
	private Integer inv_purchase_common_master_grn_No;
	
	private Integer inv_purchase_Invoice_master_Doc_No;
	
	private String inv_purchase_common_master_form_Name;
//	private Integer inv_purchase_common_master_ref_party_master_id;
	private Integer inv_purchase_common_master_delete_flag;
	private Integer inv_batch_stock_master_batch_order_No_fk;
	private String inv_purchase_common_master_updated_date;
	private String inv_purchase_common_master_create_date;
	
	private String inv_batch_stock_master_purchase_invoice_number;
	private String inv_batch_stock_master_purchase_delivery_challan_number;
	
	private  String inv_batch_stock_master_purchase_openig_stock_flag;
	
	private  String inv_purchase_grn_terms_and_condition_master;
	private String inv_purchase_return_master_outward_no;
	private String inv_purchase_common_master_expired_quotation_date;
	
	private String inv_batch_stock_master_direct_or_indirect_grn;
	
	private String inv_batch_stock_total_item_pending_qty;
	
	//this  Variables for purchase Enquiry master @date18may2016
	private String inv_purchase_enquiry_date;
	private String inv_purchase_enquiry_expected_date;
	private String inv_purchase_enquiry_expiry_date;
	private String inv_purchase_enquiry_suppliers_id;

	private String inv_purchase_enquiry_doc_series;
	private String inv_purchase_enquiry_generator_name;
	private String inv_purchase_enquiry_generator_id;
	
	private String inv_purchase_enquiry_deleted_by_name;
	private String inv_purchase_enquiry_deleted_date;
	
	private String inv_purchase_enquiry_delete_flag;
	private String inv_purchase_enquiry_updated_by;
	private String inv_purchase_enquiry_updated_date;
	
	private String inv_purchase_enquiry_created_date;
	
	//newly added charges 6/6/2016
	private Double inv_purchase_common_master_special_disc; 
	private Double inv_purchase_common_master_debit_amt ; 
	private Double inv_purchase_common_master_cash_amt_perct; 
	private Double inv_purchase_common_master_cash_amt_rupees; 
	private Double inv_purchase_common_master_octroi_amt;
	private Double inv_purchase_common_master_surcharge_amt;
	private Double inv_purchase_common_master_credit_amt;
	private Double inv_purchase_common_master_freight_amt; 
	private Double inv_purchase_common_master_calcuated_vat_amt; 
	private Double inv_purchase_common_master_lbt_amt; 
	private Double inv_purchase_common_master_cst_amt; 
	private Double inv_purchase_common_master_ex_vat_amt; 
	private Double inv_purchase_common_master_calcuated_total_taxes_amt; 
	private Double inv_purchase_common_master_total_base_gross_amt; 
	private Double inv_purchase_common_master_total_less_amt; 
	private Double inv_purchase_common_master_total_add_amt	; 
	private Double inv_purchase_common_master_final_calcuated_total_taxes_amt; 
	private Double inv_purchase_common_master_final_total_net_amt ;
	
	private String inv_purchase_common_master_special_charges;
	private Double inv_purchase_common_master_sumofspecial_charges;
	
	private String invpurqtntermsandcondition;
	
	private String currusrId;
	private String currusrName;
	private String inChargeLevel;
  
	private String inv_purchase_common_master_vmi;
	private String isertedmachineid;
	private Integer inv_SupplierState; //add by paras
	private String txtagchallan; //add by paras
	private Integer inv_batch_stock_fixchallan; //add by paras  
	private Integer inv_batch_stock_fixpurchaseinvoice; //add by paras
	private String inv_reamrk; //add by paras
	private List<InventoryPurchaseCommonMaster> ltinvetorypurchasecommonmaster;
	private List<InventoryPurchaseCommonItemMaster> ltinvetorypurchasecommonitemmaster;
	private List<InventoryPurchaseCommonFrightDetails> ltinvetorypurchasecommonfrieghtmaster;
	
	private List<MaintainanceMachineDTO> ltMaintainanceMachineDTO;
	
	private String accountStatusInvGRN;
	private String accountStatusPI;
	
	public String getAccountStatusInvGRN() {
		return accountStatusInvGRN;
	}
	public void setAccountStatusInvGRN(String accountStatusInvGRN) {
		this.accountStatusInvGRN = accountStatusInvGRN;
	}
	public String getAccountStatusPI() {
		return accountStatusPI;
	}
	public void setAccountStatusPI(String accountStatusPI) {
		this.accountStatusPI = accountStatusPI;
	}
	/**************vmi add @author paras suryawanshi @date:4nov2016******************/

	@JsonGetter("inv_purchase_common_master_vmi")
	public String getInv_purchase_common_master_vmi() {
		return inv_purchase_common_master_vmi;
	}
	@JsonSetter("inv_purchase_common_master_vmi")
	public void setInv_purchase_common_master_vmi(
			String inv_purchase_common_master_vmi) {
		this.inv_purchase_common_master_vmi = inv_purchase_common_master_vmi;
	}
	
	@JsonGetter("isertedmachineid")
	public String getIsertedmachineid() {
		return isertedmachineid;
	}
	@JsonSetter("isertedmachineid")
	public void setIsertedmachineid(String isertedmachineid) {
		this.isertedmachineid = isertedmachineid;
	}
	 
	@JsonGetter("inv_purchase_Invoice_master_Doc_No")
	public Integer getInv_purchase_Invoice_master_Doc_No() {
		return inv_purchase_Invoice_master_Doc_No;
	}
	@JsonSetter("inv_purchase_Invoice_master_Doc_No")
	public void setInv_purchase_Invoice_master_Doc_No(
			Integer inv_purchase_Invoice_master_Doc_No) {
		this.inv_purchase_Invoice_master_Doc_No = inv_purchase_Invoice_master_Doc_No;
	}
	@JsonGetter("inv_purchase_common_master_doc_no")
	public Integer getInv_purchase_common_master_doc_no() {
		return inv_purchase_common_master_doc_no;
	}
	@JsonSetter("inv_purchase_common_master_doc_no")
	public void setInv_purchase_common_master_doc_no(
			Integer inv_purchase_common_master_doc_no) {
		this.inv_purchase_common_master_doc_no = inv_purchase_common_master_doc_no;
	}
	@JsonGetter("inv_purchase_common_master_mobile_number")
	public String getInv_purchase_common_master_mobile_number() {
		return inv_purchase_common_master_mobile_number;
	}
	@JsonSetter("inv_purchase_common_master_mobile_number")
	public void setInv_purchase_common_master_mobile_number(
			String inv_purchase_common_master_mobile_number) {
		this.inv_purchase_common_master_mobile_number = inv_purchase_common_master_mobile_number;
	}
	@JsonGetter("inv_purchase_common_master_Supplier_Name")
	public String getInv_purchase_common_master_Supplier_Name() {
		return inv_purchase_common_master_Supplier_Name;
	}
	@JsonSetter("inv_purchase_common_master_Supplier_Name")
	public void setInv_purchase_common_master_Supplier_Name(
			String inv_purchase_common_master_Supplier_Name) {
		this.inv_purchase_common_master_Supplier_Name = inv_purchase_common_master_Supplier_Name;
	}
	@JsonGetter("inv_purchase_common_master_Supplier_Id")
	public Integer getInv_purchase_common_master_Supplier_Id() {
		return inv_purchase_common_master_Supplier_Id;
	}
	@JsonSetter("inv_purchase_common_master_Supplier_Id")
	public void setInv_purchase_common_master_Supplier_Id(
			Integer inv_purchase_common_master_Supplier_Id) {
		this.inv_purchase_common_master_Supplier_Id = inv_purchase_common_master_Supplier_Id;
	}
	@JsonGetter("inv_purchase_common_master_doc_Series")
	public String getInv_purchase_common_master_doc_Series() {
		return inv_purchase_common_master_doc_Series;
	}
	@JsonSetter("inv_purchase_common_master_doc_Series")
	public void setInv_purchase_common_master_doc_Series(
			String inv_purchase_common_master_doc_Series) {
		this.inv_purchase_common_master_doc_Series = inv_purchase_common_master_doc_Series;
	}
	@JsonGetter("inv_purchase_common_master_reference_no")
	public String getInv_purchase_common_master_reference_no() {
		return inv_purchase_common_master_reference_no;
	}
	@JsonSetter("inv_purchase_common_master_reference_no")
	public void setInv_purchase_common_master_reference_no(
			String inv_purchase_common_master_reference_no) {
		this.inv_purchase_common_master_reference_no = inv_purchase_common_master_reference_no;
	}
	@JsonGetter("inv_purchase_common_master_Address")
	public String getInv_purchase_common_master_Address() {
		return inv_purchase_common_master_Address;
	}
	@JsonSetter("inv_purchase_common_master_Address")
	public void setInv_purchase_common_master_Address(
			String inv_purchase_common_master_Address) {
		this.inv_purchase_common_master_Address = inv_purchase_common_master_Address;
	}
	@JsonGetter("inv_purchase_common_master_status")
	public String getInv_purchase_common_master_status() {
		return inv_purchase_common_master_status;
	}
	@JsonSetter("inv_purchase_common_master_status")
	public void setInv_purchase_common_master_status(
			String inv_purchase_common_master_status) {
		this.inv_purchase_common_master_status = inv_purchase_common_master_status;
	}
	@JsonGetter("inv_purchase_common_master_total_doc_qty")
	public Integer getInv_purchase_common_master_total_doc_qty() {
		return inv_purchase_common_master_total_doc_qty;
	}
	@JsonSetter("inv_purchase_common_master_total_doc_qty")
	public void setInv_purchase_common_master_total_doc_qty(
			Integer inv_purchase_common_master_total_doc_qty) {
		this.inv_purchase_common_master_total_doc_qty = inv_purchase_common_master_total_doc_qty;
	}
	@JsonGetter("inv_purchase_common_master_total_discount")
	public Double getInv_purchase_common_master_total_discount() {
		return inv_purchase_common_master_total_discount;
	}
	@JsonSetter("inv_purchase_common_master_total_discount")
	public void setInv_purchase_common_master_total_discount(
			Double inv_purchase_common_master_total_discount) {
		this.inv_purchase_common_master_total_discount = inv_purchase_common_master_total_discount;
	}
	@JsonGetter("inv_purchase_common_master_local_currency")
	public String getInv_purchase_common_master_local_currency() {
		return inv_purchase_common_master_local_currency;
	}
	@JsonSetter("inv_purchase_common_master_local_currency")
	public void setInv_purchase_common_master_local_currency(
			String inv_purchase_common_master_local_currency) {
		this.inv_purchase_common_master_local_currency = inv_purchase_common_master_local_currency;
	}
	@JsonGetter("inv_purchase_common_master_grn_No")
	public Integer getInv_purchase_common_master_grn_No() {
		return inv_purchase_common_master_grn_No;
	}
	@JsonSetter("inv_purchase_common_master_grn_No")
	public void setInv_purchase_common_master_grn_No(
			Integer inv_purchase_common_master_grn_No) {
		this.inv_purchase_common_master_grn_No = inv_purchase_common_master_grn_No;
	}
	@JsonGetter("inv_purchase_common_master_form_Name")
	public String getInv_purchase_common_master_form_Name() {
		return inv_purchase_common_master_form_Name;
	}
	@JsonSetter("inv_purchase_common_master_form_Name")
	public void setInv_purchase_common_master_form_Name(
			String inv_purchase_common_master_form_Name) {
		this.inv_purchase_common_master_form_Name = inv_purchase_common_master_form_Name;
	}
	/*@JsonGetter("inv_purchase_common_master_ref_party_master_id")
	public Integer getInv_purchase_common_master_ref_party_master_id() {
		return inv_purchase_common_master_ref_party_master_id;
	}
	@JsonSetter("inv_purchase_common_master_ref_party_master_id")
	public void setInv_purchase_common_master_ref_party_master_id(
			Integer inv_purchase_common_master_ref_party_master_id) {
		this.inv_purchase_common_master_ref_party_master_id = inv_purchase_common_master_ref_party_master_id;
	}*/
	@JsonGetter("inv_purchase_common_master_delete_flag")
	public Integer getInv_purchase_common_master_delete_flag() {
		return inv_purchase_common_master_delete_flag;
	}
	@JsonSetter("inv_purchase_common_master_delete_flag")
	public void setInv_purchase_common_master_delete_flag(
			Integer inv_purchase_common_master_delete_flag) {
		this.inv_purchase_common_master_delete_flag = inv_purchase_common_master_delete_flag;
	}
	@JsonGetter("inv_batch_stock_master_batch_order_No_fk")
	public Integer getInv_batch_stock_master_batch_order_No_fk() {
		return inv_batch_stock_master_batch_order_No_fk;
	}
	@JsonSetter("inv_batch_stock_master_batch_order_No_fk")
	public void setInv_batch_stock_master_batch_order_No_fk(
			Integer inv_batch_stock_master_batch_order_No_fk) {
		this.inv_batch_stock_master_batch_order_No_fk = inv_batch_stock_master_batch_order_No_fk;
	}
	@JsonGetter("inv_purchase_common_master_updated_date")
	public String getInv_purchase_common_master_updated_date() {
		return inv_purchase_common_master_updated_date;
	}
	@JsonSetter("inv_purchase_common_master_updated_date")
	public void setInv_purchase_common_master_updated_date(
			String inv_purchase_common_master_updated_date) {
		this.inv_purchase_common_master_updated_date = inv_purchase_common_master_updated_date;
	}
	@JsonGetter("inv_purchase_common_master_create_date")
	public String getInv_purchase_common_master_create_date() {
		return inv_purchase_common_master_create_date;
	}
	@JsonSetter("inv_purchase_common_master_create_date")
	public void setInv_purchase_common_master_create_date(
			String inv_purchase_common_master_create_date) {
		this.inv_purchase_common_master_create_date = inv_purchase_common_master_create_date;
	}
	@JsonGetter("inv_purchase_common_master_doc_date")
	public String getInv_purchase_common_master_doc_date() {
		return inv_purchase_common_master_doc_date;
	}
	@JsonSetter("inv_purchase_common_master_doc_date")
	public void setInv_purchase_common_master_doc_date(
			String inv_purchase_common_master_doc_date) {
		this.inv_purchase_common_master_doc_date = inv_purchase_common_master_doc_date;
	}
	
	
	@JsonGetter("inv_purchase_common_master_purchase_Request_No")
	public Integer getInv_purchase_common_master_purchase_Request_No() {
		return inv_purchase_common_master_purchase_Request_No;
	}
	
	@JsonSetter("inv_purchase_common_master_purchase_Request_No")
	public void setInv_purchase_common_master_purchase_Request_No(
			Integer inv_purchase_common_master_purchase_Request_No) {
		this.inv_purchase_common_master_purchase_Request_No = inv_purchase_common_master_purchase_Request_No;
	}
	/**
	 * @return the ltinvetorypurchasecommonmaster
	 */
	@JsonGetter("ltinvetorypurchasecommonmaster")
	public List<InventoryPurchaseCommonMaster> getLtinvetorypurchasecommonmaster() {
		return ltinvetorypurchasecommonmaster;
	}
	/**
	 * @param ltinvetorypurchasecommonmaster the ltinvetorypurchasecommonmaster to set
	 */
	@JsonSetter("ltinvetorypurchasecommonmaster")
	public void setLtinvetorypurchasecommonmaster(
			List<InventoryPurchaseCommonMaster> ltinvetorypurchasecommonmaster) {
		this.ltinvetorypurchasecommonmaster = ltinvetorypurchasecommonmaster;
	}
	/**
	 * @return the ltinvetorypurchasecommonitemmaster
	 */
	@JsonGetter("ltinvetorypurchasecommonitemmaster")
	public List<InventoryPurchaseCommonItemMaster> getLtinvetorypurchasecommonitemmaster() {
		return ltinvetorypurchasecommonitemmaster;
	}
	/**
	 * @param ltinvetorypurchasecommonitemmaster the ltinvetorypurchasecommonitemmaster to set
	 */
	@JsonSetter("ltinvetorypurchasecommonitemmaster")
	public void setLtinvetorypurchasecommonitemmaster(
			List<InventoryPurchaseCommonItemMaster> ltinvetorypurchasecommonitemmaster) {
		this.ltinvetorypurchasecommonitemmaster = ltinvetorypurchasecommonitemmaster;
	}
	@JsonGetter("ltinvetorypurchasecommonfrieghtmaster")
	public List<InventoryPurchaseCommonFrightDetails> getLtinvetorypurchasecommonfrieghtmaster() {
		return ltinvetorypurchasecommonfrieghtmaster;
	}
	@JsonSetter("ltinvetorypurchasecommonfrieghtmaster")
	public void setLtinvetorypurchasecommonfrieghtmaster(
			List<InventoryPurchaseCommonFrightDetails> ltinvetorypurchasecommonfrieghtmaster) {
		this.ltinvetorypurchasecommonfrieghtmaster = ltinvetorypurchasecommonfrieghtmaster;
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
	@JsonGetter("inv_batch_stock_master_purchase_delivery_challan_number")
	public String getInv_batch_stock_master_purchase_delivery_challan_number() {
		return inv_batch_stock_master_purchase_delivery_challan_number;
	}
	@JsonSetter("inv_batch_stock_master_purchase_delivery_challan_number")
	public void setInv_batch_stock_master_purchase_delivery_challan_number(
			String inv_batch_stock_master_purchase_delivery_challan_number) {
		this.inv_batch_stock_master_purchase_delivery_challan_number = inv_batch_stock_master_purchase_delivery_challan_number;
	}
	@JsonGetter("inv_batch_stock_master_purchase_openig_stock_flag")
	public String getInv_batch_stock_master_purchase_openig_stock_flag() {
		return inv_batch_stock_master_purchase_openig_stock_flag;
	}
	@JsonSetter("inv_batch_stock_master_purchase_openig_stock_flag")
	public void setInv_batch_stock_master_purchase_openig_stock_flag(
			String inv_batch_stock_master_purchase_openig_stock_flag) {
		this.inv_batch_stock_master_purchase_openig_stock_flag = inv_batch_stock_master_purchase_openig_stock_flag;
	}
	@JsonGetter("inv_purchase_grn_terms_and_condition_master")
	public String getInv_purchase_grn_terms_and_condition_master() {
		return inv_purchase_grn_terms_and_condition_master;
	}
	@JsonSetter("inv_purchase_grn_terms_and_condition_master")
	public void setInv_purchase_grn_terms_and_condition_master(
			String inv_purchase_grn_terms_and_condition_master) {
		this.inv_purchase_grn_terms_and_condition_master = inv_purchase_grn_terms_and_condition_master;
	}
	@JsonGetter("inv_purchase_return_master_outward_no")
	public String getInv_purchase_return_master_outward_no() {
		return inv_purchase_return_master_outward_no;
	}
	@JsonSetter("inv_purchase_return_master_outward_no")
	public void setInv_purchase_return_master_outward_no(
			String inv_purchase_return_master_outward_no) {
		this.inv_purchase_return_master_outward_no = inv_purchase_return_master_outward_no;
	}
	@JsonGetter("inv_purchase_common_master_expired_quotation_date")
	public String getInv_purchase_common_master_expired_quotation_date() {
		return inv_purchase_common_master_expired_quotation_date;
	}
	@JsonSetter("inv_purchase_common_master_expired_quotation_date")
	public void setInv_purchase_common_master_expired_quotation_date(
			String inv_purchase_common_master_expired_quotation_date) {
		this.inv_purchase_common_master_expired_quotation_date = inv_purchase_common_master_expired_quotation_date;
	}
	@JsonGetter("inv_purchase_common_master_delivery_date")
	public String getInv_purchase_common_master_delivery_date() {
		return inv_purchase_common_master_delivery_date;
	}
	@JsonSetter("inv_purchase_common_master_delivery_date")
	public void setInv_purchase_common_master_delivery_date(
			String inv_purchase_common_master_delivery_date) {
		this.inv_purchase_common_master_delivery_date = inv_purchase_common_master_delivery_date;
	}
	
	@JsonGetter("inv_batch_stock_master_direct_or_indirect_grn")
	public String getInv_batch_stock_master_direct_or_indirect_grn() {
		return inv_batch_stock_master_direct_or_indirect_grn;
	}
	@JsonSetter("inv_batch_stock_master_direct_or_indirect_grn")
	public void setInv_batch_stock_master_direct_or_indirect_grn(
			String inv_batch_stock_master_direct_or_indirect_grn) {
		this.inv_batch_stock_master_direct_or_indirect_grn = inv_batch_stock_master_direct_or_indirect_grn;
	}
	@JsonGetter("inv_batch_stock_total_item_pending_qty")
	public String getInv_batch_stock_total_item_pending_qty() {
		return inv_batch_stock_total_item_pending_qty;
	}
	@JsonSetter("inv_batch_stock_total_item_pending_qty")
	public void setInv_batch_stock_total_item_pending_qty(
			String inv_batch_stock_total_item_pending_qty) {
		this.inv_batch_stock_total_item_pending_qty = inv_batch_stock_total_item_pending_qty;
	}
	
	//this setter geter for  purchase enquiry master @date18may2016
	@JsonGetter("inv_purchase_enquiry_date")
	public String getInv_purchase_enquiry_date() {
		return inv_purchase_enquiry_date;
	}
	
	public void setInv_purchase_enquiry_date(String inv_purchase_enquiry_date) {
		this.inv_purchase_enquiry_date = inv_purchase_enquiry_date;
	}
	public String getInv_purchase_enquiry_expected_date() {
		return inv_purchase_enquiry_expected_date;
	}
	public void setInv_purchase_enquiry_expected_date(
			String inv_purchase_enquiry_expected_date) {
		this.inv_purchase_enquiry_expected_date = inv_purchase_enquiry_expected_date;
	}
	public String getInv_purchase_enquiry_expiry_date() {
		return inv_purchase_enquiry_expiry_date;
	}
	public void setInv_purchase_enquiry_expiry_date(
			String inv_purchase_enquiry_expiry_date) {
		this.inv_purchase_enquiry_expiry_date = inv_purchase_enquiry_expiry_date;
	}
	public String getInv_purchase_enquiry_suppliers_id() {
		return inv_purchase_enquiry_suppliers_id;
	}
	public void setInv_purchase_enquiry_suppliers_id(
			String inv_purchase_enquiry_suppliers_id) {
		this.inv_purchase_enquiry_suppliers_id = inv_purchase_enquiry_suppliers_id;
	}
	public String getInv_purchase_enquiry_doc_series() {
		return inv_purchase_enquiry_doc_series;
	}
	public void setInv_purchase_enquiry_doc_series(
			String inv_purchase_enquiry_doc_series) {
		this.inv_purchase_enquiry_doc_series = inv_purchase_enquiry_doc_series;
	}
	public String getInv_purchase_enquiry_generator_name() {
		return inv_purchase_enquiry_generator_name;
	}
	public void setInv_purchase_enquiry_generator_name(
			String inv_purchase_enquiry_generator_name) {
		this.inv_purchase_enquiry_generator_name = inv_purchase_enquiry_generator_name;
	}
	public String getInv_purchase_enquiry_generator_id() {
		return inv_purchase_enquiry_generator_id;
	}
	public void setInv_purchase_enquiry_generator_id(
			String inv_purchase_enquiry_generator_id) {
		this.inv_purchase_enquiry_generator_id = inv_purchase_enquiry_generator_id;
	}
	public String getInv_purchase_enquiry_deleted_by_name() {
		return inv_purchase_enquiry_deleted_by_name;
	}
	public void setInv_purchase_enquiry_deleted_by_name(
			String inv_purchase_enquiry_deleted_by_name) {
		this.inv_purchase_enquiry_deleted_by_name = inv_purchase_enquiry_deleted_by_name;
	}
	public String getInv_purchase_enquiry_deleted_date() {
		return inv_purchase_enquiry_deleted_date;
	}
	public void setInv_purchase_enquiry_deleted_date(
			String inv_purchase_enquiry_deleted_date) {
		this.inv_purchase_enquiry_deleted_date = inv_purchase_enquiry_deleted_date;
	}
	public String getInv_purchase_enquiry_delete_flag() {
		return inv_purchase_enquiry_delete_flag;
	}
	public void setInv_purchase_enquiry_delete_flag(
			String inv_purchase_enquiry_delete_flag) {
		this.inv_purchase_enquiry_delete_flag = inv_purchase_enquiry_delete_flag;
	}
	public String getInv_purchase_enquiry_updated_by() {
		return inv_purchase_enquiry_updated_by;
	}
	public void setInv_purchase_enquiry_updated_by(
			String inv_purchase_enquiry_updated_by) {
		this.inv_purchase_enquiry_updated_by = inv_purchase_enquiry_updated_by;
	}
	public String getInv_purchase_enquiry_updated_date() {
		return inv_purchase_enquiry_updated_date;
	}
	public void setInv_purchase_enquiry_updated_date(
			String inv_purchase_enquiry_updated_date) {
		this.inv_purchase_enquiry_updated_date = inv_purchase_enquiry_updated_date;
	}
	public String getInv_purchase_enquiry_created_date() {
		return inv_purchase_enquiry_created_date;
	}
	public void setInv_purchase_enquiry_created_date(
			String inv_purchase_enquiry_created_date) {
		this.inv_purchase_enquiry_created_date = inv_purchase_enquiry_created_date;
	}
	/****this getters and setters for charges  Author:sudhir @Date 6/6/2016 ****/
	public Double getInv_purchase_common_master_special_disc() {
		return inv_purchase_common_master_special_disc;
	}
	public void setInv_purchase_common_master_special_disc(
			Double inv_purchase_common_master_special_disc) {
		this.inv_purchase_common_master_special_disc = inv_purchase_common_master_special_disc;
	}
	public Double getInv_purchase_common_master_debit_amt() {
		return inv_purchase_common_master_debit_amt;
	}
	public void setInv_purchase_common_master_debit_amt(
			Double inv_purchase_common_master_debit_amt) {
		this.inv_purchase_common_master_debit_amt = inv_purchase_common_master_debit_amt;
	}
	public Double getInv_purchase_common_master_cash_amt_perct() {
		return inv_purchase_common_master_cash_amt_perct;
	}
	public void setInv_purchase_common_master_cash_amt_perct(
			Double inv_purchase_common_master_cash_amt_perct) {
		this.inv_purchase_common_master_cash_amt_perct = inv_purchase_common_master_cash_amt_perct;
	}
	public Double getInv_purchase_common_master_cash_amt_rupees() {
		return inv_purchase_common_master_cash_amt_rupees;
	}
	public void setInv_purchase_common_master_cash_amt_rupees(
			Double inv_purchase_common_master_cash_amt_rupees) {
		this.inv_purchase_common_master_cash_amt_rupees = inv_purchase_common_master_cash_amt_rupees;
	}
	public Double getInv_purchase_common_master_octroi_amt() {
		return inv_purchase_common_master_octroi_amt;
	}
	public void setInv_purchase_common_master_octroi_amt(
			Double inv_purchase_common_master_octroi_amt) {
		this.inv_purchase_common_master_octroi_amt = inv_purchase_common_master_octroi_amt;
	}
	public Double getInv_purchase_common_master_surcharge_amt() {
		return inv_purchase_common_master_surcharge_amt;
	}
	public void setInv_purchase_common_master_surcharge_amt(
			Double inv_purchase_common_master_surcharge_amt) {
		this.inv_purchase_common_master_surcharge_amt = inv_purchase_common_master_surcharge_amt;
	}
	public Double getInv_purchase_common_master_credit_amt() {
		return inv_purchase_common_master_credit_amt;
	}
	public void setInv_purchase_common_master_credit_amt(
			Double inv_purchase_common_master_credit_amt) {
		this.inv_purchase_common_master_credit_amt = inv_purchase_common_master_credit_amt;
	}
	public Double getInv_purchase_common_master_freight_amt() {
		return inv_purchase_common_master_freight_amt;
	}
	public void setInv_purchase_common_master_freight_amt(
			Double inv_purchase_common_master_freight_amt) {
		this.inv_purchase_common_master_freight_amt = inv_purchase_common_master_freight_amt;
	}
	public Double getInv_purchase_common_master_calcuated_vat_amt() {
		return inv_purchase_common_master_calcuated_vat_amt;
	}
	public void setInv_purchase_common_master_calcuated_vat_amt(
			Double inv_purchase_common_master_calcuated_vat_amt) {
		this.inv_purchase_common_master_calcuated_vat_amt = inv_purchase_common_master_calcuated_vat_amt;
	}
	public Double getInv_purchase_common_master_lbt_amt() {
		return inv_purchase_common_master_lbt_amt;
	}
	public void setInv_purchase_common_master_lbt_amt(
			Double inv_purchase_common_master_lbt_amt) {
		this.inv_purchase_common_master_lbt_amt = inv_purchase_common_master_lbt_amt;
	}
	public Double getInv_purchase_common_master_cst_amt() {
		return inv_purchase_common_master_cst_amt;
	}
	public void setInv_purchase_common_master_cst_amt(
			Double inv_purchase_common_master_cst_amt) {
		this.inv_purchase_common_master_cst_amt = inv_purchase_common_master_cst_amt;
	}
	public Double getInv_purchase_common_master_ex_vat_amt() {
		return inv_purchase_common_master_ex_vat_amt;
	}
	public void setInv_purchase_common_master_ex_vat_amt(
			Double inv_purchase_common_master_ex_vat_amt) {
		this.inv_purchase_common_master_ex_vat_amt = inv_purchase_common_master_ex_vat_amt;
	}
	public Double getInv_purchase_common_master_calcuated_total_taxes_amt() {
		return inv_purchase_common_master_calcuated_total_taxes_amt;
	}
	public void setInv_purchase_common_master_calcuated_total_taxes_amt(
			Double inv_purchase_common_master_calcuated_total_taxes_amt) {
		this.inv_purchase_common_master_calcuated_total_taxes_amt = inv_purchase_common_master_calcuated_total_taxes_amt;
	}
	public Double getInv_purchase_common_master_total_base_gross_amt() {
		return inv_purchase_common_master_total_base_gross_amt;
	}
	public void setInv_purchase_common_master_total_base_gross_amt(
			Double inv_purchase_common_master_total_base_gross_amt) {
		this.inv_purchase_common_master_total_base_gross_amt = inv_purchase_common_master_total_base_gross_amt;
	}
	public Double getInv_purchase_common_master_total_less_amt() {
		return inv_purchase_common_master_total_less_amt;
	}
	public void setInv_purchase_common_master_total_less_amt(
			Double inv_purchase_common_master_total_less_amt) {
		this.inv_purchase_common_master_total_less_amt = inv_purchase_common_master_total_less_amt;
	}
	public Double getInv_purchase_common_master_total_add_amt() {
		return inv_purchase_common_master_total_add_amt;
	}
	public void setInv_purchase_common_master_total_add_amt(
			Double inv_purchase_common_master_total_add_amt) {
		this.inv_purchase_common_master_total_add_amt = inv_purchase_common_master_total_add_amt;
	}
	public Double getInv_purchase_common_master_final_calcuated_total_taxes_amt() {
		return inv_purchase_common_master_final_calcuated_total_taxes_amt;
	}
	public void setInv_purchase_common_master_final_calcuated_total_taxes_amt(
			Double inv_purchase_common_master_final_calcuated_total_taxes_amt) {
		this.inv_purchase_common_master_final_calcuated_total_taxes_amt = inv_purchase_common_master_final_calcuated_total_taxes_amt;
	}
	public Double getInv_purchase_common_master_final_total_net_amt() {
		return inv_purchase_common_master_final_total_net_amt;
	}
	public void setInv_purchase_common_master_final_total_net_amt(
			Double inv_purchase_common_master_final_total_net_amt) {
		this.inv_purchase_common_master_final_total_net_amt = inv_purchase_common_master_final_total_net_amt;
	}
	 
	@JsonGetter("inv_purchase_common_master_special_charges")
	public String getInv_purchase_common_master_special_charges() {
		return inv_purchase_common_master_special_charges;
	}
	@JsonSetter("inv_purchase_common_master_special_charges")
	public void setInv_purchase_common_master_special_charges(
			String inv_purchase_common_master_special_charges) {
		this.inv_purchase_common_master_special_charges = inv_purchase_common_master_special_charges;
	}
	@JsonGetter("inv_purchase_common_master_sumofspecial_charges")
	public Double getInv_purchase_common_master_sumofspecial_charges() {
		return inv_purchase_common_master_sumofspecial_charges;
	}
	@JsonSetter("inv_purchase_common_master_sumofspecial_charges")
	public void setInv_purchase_common_master_sumofspecial_charges(
			Double inv_purchase_common_master_sumofspecial_charges) {
		this.inv_purchase_common_master_sumofspecial_charges = inv_purchase_common_master_sumofspecial_charges;
	}
	public String getInvpurqtntermsandcondition() {
		return invpurqtntermsandcondition;
	}
	public void setInvpurqtntermsandcondition(String invpurqtntermsandcondition) {
		this.invpurqtntermsandcondition = invpurqtntermsandcondition;
	}
	
	public String getCurrusrId() {
		return currusrId;
	}
	public void setCurrusrId(String currusrId) {
		this.currusrId = currusrId;
	}
	public String getCurrusrName() {
		return currusrName;
	}
	public void setCurrusrName(String currusrName) {
		this.currusrName = currusrName;
	}
	public String getInChargeLevel() {
		return inChargeLevel;
	}
	public void setInChargeLevel(String inChargeLevel) {
		this.inChargeLevel = inChargeLevel;
	}
	@JsonGetter("ltMaintainanceMachineDTO")
	public List<MaintainanceMachineDTO> getLtMaintainanceMachineDTO() {
		return ltMaintainanceMachineDTO;
	}
	@JsonSetter("ltMaintainanceMachineDTO")
	public void setLtMaintainanceMachineDTO(List<MaintainanceMachineDTO> ltMaintainanceMachineDTO) {
		this.ltMaintainanceMachineDTO = ltMaintainanceMachineDTO;
	}
	@JsonGetter("inv_SupplierState")
	public Integer getInv_SupplierState() {
		return inv_SupplierState;
	}
	@JsonSetter("inv_SupplierState")
	public void setInv_SupplierState(Integer inv_SupplierState) {
		this.inv_SupplierState = inv_SupplierState;
	}
	@JsonGetter("txtagchallan")
	public String getTxtagchallan() {
		return txtagchallan;
	}
	@JsonSetter("txtagchallan")
	public void setTxtagchallan(String txtagchallan) {
		this.txtagchallan = txtagchallan;
	}
	@JsonGetter("inv_batch_stock_fixchallan")
	public Integer getInv_batch_stock_fixchallan() {
		return inv_batch_stock_fixchallan;
	}
	@JsonSetter("inv_batch_stock_fixchallan")
	public void setInv_batch_stock_fixchallan(Integer inv_batch_stock_fixchallan) {
		this.inv_batch_stock_fixchallan = inv_batch_stock_fixchallan;
	}
	@JsonGetter("inv_batch_stock_fixpurchaseinvoice")
	public Integer getInv_batch_stock_fixpurchaseinvoice() {
		return inv_batch_stock_fixpurchaseinvoice;
	}
	@JsonSetter("inv_batch_stock_fixpurchaseinvoice")
	public void setInv_batch_stock_fixpurchaseinvoice(
			Integer inv_batch_stock_fixpurchaseinvoice) {
		this.inv_batch_stock_fixpurchaseinvoice = inv_batch_stock_fixpurchaseinvoice;
	}
	@JsonGetter("inv_reamrk")
	public String getInv_reamrk() {
		return inv_reamrk;
	}
	@JsonSetter("inv_reamrk")
	public void setInv_reamrk(String inv_reamrk) {
		this.inv_reamrk = inv_reamrk;
	}
	
	@Override
	public String toString() {
		return "InventoryPurchaseCommonMaster [inv_purchase_common_master_doc_no="
				+ inv_purchase_common_master_doc_no
				+ ", inv_purchase_common_master_doc_date="
				+ inv_purchase_common_master_doc_date
				+ ", inv_purchase_common_master_mobile_number="
				+ inv_purchase_common_master_mobile_number
				+ ", inv_purchase_common_master_Supplier_Name="
				+ inv_purchase_common_master_Supplier_Name
				+ ", inv_purchase_common_master_Supplier_Id="
				+ inv_purchase_common_master_Supplier_Id
				+ ", inv_purchase_common_master_doc_Series="
				+ inv_purchase_common_master_doc_Series
				+ ", inv_purchase_common_master_reference_no="
				+ inv_purchase_common_master_reference_no
				+ ", inv_purchase_common_master_Address="
				+ inv_purchase_common_master_Address
				+ ", inv_purchase_common_master_delivery_date="
				+ inv_purchase_common_master_delivery_date
				+ ", inv_purchase_common_master_status="
				+ inv_purchase_common_master_status
				+ ", inv_purchase_common_master_total_doc_qty="
				+ inv_purchase_common_master_total_doc_qty
				+ ", inv_purchase_common_master_total_discount="
				+ inv_purchase_common_master_total_discount
				+ ", inv_purchase_common_master_local_currency="
				+ inv_purchase_common_master_local_currency
				+ ", inv_purchase_common_master_purchase_Request_No="
				+ inv_purchase_common_master_purchase_Request_No
				+ ", inv_purchase_common_master_grn_No="
				+ inv_purchase_common_master_grn_No
				+ ", inv_purchase_Invoice_master_Doc_No="
				+ inv_purchase_Invoice_master_Doc_No
				+ ", inv_purchase_common_master_form_Name="
				+ inv_purchase_common_master_form_Name
				+ ", inv_purchase_common_master_delete_flag="
				+ inv_purchase_common_master_delete_flag
				+ ", inv_batch_stock_master_batch_order_No_fk="
				+ inv_batch_stock_master_batch_order_No_fk
				+ ", inv_purchase_common_master_updated_date="
				+ inv_purchase_common_master_updated_date
				+ ", inv_purchase_common_master_create_date="
				+ inv_purchase_common_master_create_date
				+ ", inv_batch_stock_master_purchase_invoice_number="
				+ inv_batch_stock_master_purchase_invoice_number
				+ ", inv_batch_stock_master_purchase_delivery_challan_number="
				+ inv_batch_stock_master_purchase_delivery_challan_number
				+ ", inv_batch_stock_master_purchase_openig_stock_flag="
				+ inv_batch_stock_master_purchase_openig_stock_flag
				+ ", inv_purchase_grn_terms_and_condition_master="
				+ inv_purchase_grn_terms_and_condition_master
				+ ", inv_purchase_return_master_outward_no="
				+ inv_purchase_return_master_outward_no
				+ ", inv_purchase_common_master_expired_quotation_date="
				+ inv_purchase_common_master_expired_quotation_date
				+ ", inv_batch_stock_master_direct_or_indirect_grn="
				+ inv_batch_stock_master_direct_or_indirect_grn
				+ ", inv_batch_stock_total_item_pending_qty="
				+ inv_batch_stock_total_item_pending_qty
				+ ", inv_purchase_enquiry_date="
				+ inv_purchase_enquiry_date
				+ ", inv_purchase_enquiry_expected_date="
				+ inv_purchase_enquiry_expected_date
				+ ", inv_purchase_enquiry_expiry_date="
				+ inv_purchase_enquiry_expiry_date
				+ ", inv_purchase_enquiry_suppliers_id="
				+ inv_purchase_enquiry_suppliers_id
				+ ", inv_purchase_enquiry_doc_series="
				+ inv_purchase_enquiry_doc_series
				+ ", inv_purchase_enquiry_generator_name="
				+ inv_purchase_enquiry_generator_name
				+ ", inv_purchase_enquiry_generator_id="
				+ inv_purchase_enquiry_generator_id
				+ ", inv_purchase_enquiry_deleted_by_name="
				+ inv_purchase_enquiry_deleted_by_name
				+ ", inv_purchase_enquiry_deleted_date="
				+ inv_purchase_enquiry_deleted_date
				+ ", inv_purchase_enquiry_delete_flag="
				+ inv_purchase_enquiry_delete_flag
				+ ", inv_purchase_enquiry_updated_by="
				+ inv_purchase_enquiry_updated_by
				+ ", inv_purchase_enquiry_updated_date="
				+ inv_purchase_enquiry_updated_date
				+ ", inv_purchase_enquiry_created_date="
				+ inv_purchase_enquiry_created_date
				+ ", inv_purchase_common_master_special_disc="
				+ inv_purchase_common_master_special_disc
				+ ", inv_purchase_common_master_debit_amt="
				+ inv_purchase_common_master_debit_amt
				+ ", inv_purchase_common_master_cash_amt_perct="
				+ inv_purchase_common_master_cash_amt_perct
				+ ", inv_purchase_common_master_cash_amt_rupees="
				+ inv_purchase_common_master_cash_amt_rupees
				+ ", inv_purchase_common_master_octroi_amt="
				+ inv_purchase_common_master_octroi_amt
				+ ", inv_purchase_common_master_surcharge_amt="
				+ inv_purchase_common_master_surcharge_amt
				+ ", inv_purchase_common_master_credit_amt="
				+ inv_purchase_common_master_credit_amt
				+ ", inv_purchase_common_master_freight_amt="
				+ inv_purchase_common_master_freight_amt
				+ ", inv_purchase_common_master_calcuated_vat_amt="
				+ inv_purchase_common_master_calcuated_vat_amt
				+ ", inv_purchase_common_master_lbt_amt="
				+ inv_purchase_common_master_lbt_amt
				+ ", inv_purchase_common_master_cst_amt="
				+ inv_purchase_common_master_cst_amt
				+ ", inv_purchase_common_master_ex_vat_amt="
				+ inv_purchase_common_master_ex_vat_amt
				+ ", inv_purchase_common_master_calcuated_total_taxes_amt="
				+ inv_purchase_common_master_calcuated_total_taxes_amt
				+ ", inv_purchase_common_master_total_base_gross_amt="
				+ inv_purchase_common_master_total_base_gross_amt
				+ ", inv_purchase_common_master_total_less_amt="
				+ inv_purchase_common_master_total_less_amt
				+ ", inv_purchase_common_master_total_add_amt="
				+ inv_purchase_common_master_total_add_amt
				+ ", inv_purchase_common_master_final_calcuated_total_taxes_amt="
				+ inv_purchase_common_master_final_calcuated_total_taxes_amt
				+ ", inv_purchase_common_master_final_total_net_amt="
				+ inv_purchase_common_master_final_total_net_amt
				+ ", inv_purchase_common_master_special_charges="
				+ inv_purchase_common_master_special_charges
				+ ", inv_purchase_common_master_sumofspecial_charges="
				+ inv_purchase_common_master_sumofspecial_charges
				+ ", invpurqtntermsandcondition="
				+ invpurqtntermsandcondition
				+ ", currusrId="
				+ currusrId
				+ ", currusrName="
				+ currusrName
				+ ", inChargeLevel="
				+ inChargeLevel
				+ ", inv_purchase_common_master_vmi="
				+ inv_purchase_common_master_vmi
				+ ", isertedmachineid="
				+ isertedmachineid
				+ ", inv_SupplierState="
				+ inv_SupplierState
				+ ", txtagchallan="
				+ txtagchallan
				+ ", inv_batch_stock_fixchallan="
				+ inv_batch_stock_fixchallan
				+ ", inv_batch_stock_fixpurchaseinvoice="
				+ inv_batch_stock_fixpurchaseinvoice
				+ ", inv_reamrk="
				+ inv_reamrk
				+ ", ltinvetorypurchasecommonmaster="
				+ ltinvetorypurchasecommonmaster
				+ ", ltinvetorypurchasecommonitemmaster="
				+ ltinvetorypurchasecommonitemmaster
				+ ", ltinvetorypurchasecommonfrieghtmaster="
				+ ltinvetorypurchasecommonfrieghtmaster
				+ ", ltMaintainanceMachineDTO="
				+ ltMaintainanceMachineDTO
				+ ", accountStatusInvGRN="
				+ accountStatusInvGRN
				+ ", accountStatusPI=" + accountStatusPI + "]";
	}
}
