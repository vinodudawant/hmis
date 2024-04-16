package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

 
public class InventoryPurchaseOrderMaster {
	
	private Integer inv_purchase_order_master_doc_no;
	private String inv_purchase_order_master_doc_date;
	private String inv_purchase_order_master_mobile_number;
	private String inv_purchase_order_master_Supplier_Name;
	
	private Integer inv_purchase_order_master_Supplier_Id;
	private String inv_purchase_order_master_doc_Series;
	private String inv_purchase_order_master_reference_no;
	private String inv_purchase_order_master_Address;
	
	private String inv_purchase_order_master_status;
	private Integer inv_purchase_order_master_total_doc_qty;
	private Double inv_purchase_order_master_total_discount;
	private String inv_purchase_order_master_local_currency;
	private Integer inv_purchase_order_master_purchase_Request_No;
	
	private String inv_purchase_order_master_Delivery_Date;
	
	private Integer inv_new_purchase_order_master_order_place_flag;
	private  Integer inv_purchase_order_master_purchase_quotation_No_fk;
	private String inv_purchase_order_master_form_Name;
//	private Integer inv_purchase_common_master_ref_party_master_id;
	private Integer inv_purchase_order_master_delete_flag;
	private String inv_purchase_order_master_updated_date;
	private String inv_purchase_order_master_create_date;
	
	private String inv_purchase_order_master_order_generator_name;
	private String inv_purchase_order_master_order_generator_userid;
	private String inv_purchase_order_master_order_genrating_date_time;
	private String inv_purchase_order_master_order_updating_date_time;
	
	private String inv_purchase_order_master_order_deleted_name;
	private String inv_purchase_order_master_order_deleted_date_time;
	private String inv_purchase_order_terms_and_condition_master_termsandcondition;
	
	
	//newly added charges 6/6/2016
		private Double inv_purchase_order_master_special_disc; 
		private Double inv_purchase_order_master_debit_amt ; 
		private Double inv_purchase_order_master_cash_amt_perct; 
		private Double inv_purchase_order_master_cash_amt_rupees; 
		private Double inv_purchase_order_master_octroi_amt;
		private Double inv_purchase_order_master_surcharge_amt;
		private Double inv_purchase_order_master_credit_amt;
		private Double inv_purchase_order_master_freight_amt; 
		private Double inv_purchase_order_master_calcuated_vat_amt; 
		private Double inv_purchase_order_master_lbt_amt; 
		private Double inv_purchase_order_master_cst_amt; 
		private Double inv_purchase_order_master_ex_vat_amt; 
		private Double inv_purchase_order_master_calcuated_total_taxes_amt; 
		private Double inv_purchase_order_master_total_base_gross_amt; 
		private Double inv_purchase_order_master_total_less_amt; 
		private Double inv_purchase_order_master_total_add_amt	; 
		private Double inv_purchase_order_master_final_calcuated_total_taxes_amt; 
		private Double inv_purchase_order_master_final_total_net_amt ;
		

		private String inv_purchase_order_master_special_charges;
		private Double inv_purchase_order_master_sumofspecial_charges;
		
		private String sanctionNo;
		private String approveFlag;
		private String poAmendFlag;
		private Integer poProcsId;
		
		private String subInvId;
		private String subInvName;
		
		private String inv_purchase_order_hidden_ip;
		private String purchaseOrderCenterId;
		private String clientIp;
		private Integer inv_SupplierState; //add by paras
		private String palinpo;
		private String inv_remark;
	private List<InventoryPurchaseOrderMaster> ltinvetorypurchaseordermaster;
	private List<InventoryPurchaseOrderItemMaster> ltinvetorypurchaseOrderitemmaster;
	
	
	@JsonGetter("inv_purchase_order_palinpo")
 public String getPalinpo() {
		return palinpo;
	}
 @JsonSetter("inv_purchase_order_palinpo")
	public void setPalinpo(String palinpo) {
		this.palinpo = palinpo;
	}

@JsonGetter("inv_purchase_order_master_doc_no")
	public Integer getInv_purchase_order_master_doc_no() {
		return inv_purchase_order_master_doc_no;
	}
 
 	@JsonSetter("inv_purchase_order_master_doc_no")
	public void setInv_purchase_order_master_doc_no(
			Integer inv_purchase_order_master_doc_no) {
		this.inv_purchase_order_master_doc_no = inv_purchase_order_master_doc_no;
	}
 	@JsonGetter("inv_purchase_order_master_doc_date")
	public String getInv_purchase_order_master_doc_date() {
		return inv_purchase_order_master_doc_date;
	}
 	@JsonSetter("inv_purchase_order_master_doc_date")
	public void setInv_purchase_order_master_doc_date(
			String inv_purchase_order_master_doc_date) {
		this.inv_purchase_order_master_doc_date = inv_purchase_order_master_doc_date;
	}
 	@JsonGetter("inv_purchase_order_master_mobile_number")
	public String getInv_purchase_order_master_mobile_number() {
		return inv_purchase_order_master_mobile_number;
	}
 	@JsonSetter("inv_purchase_order_master_mobile_number")
	public void setInv_purchase_order_master_mobile_number(
			String inv_purchase_order_master_mobile_number) {
		this.inv_purchase_order_master_mobile_number = inv_purchase_order_master_mobile_number;
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
	public Integer getInv_purchase_order_master_Supplier_Id() {
		return inv_purchase_order_master_Supplier_Id;
	}
 	@JsonSetter("inv_purchase_order_master_Supplier_Id")
	public void setInv_purchase_order_master_Supplier_Id(
			Integer inv_purchase_order_master_Supplier_Id) {
		this.inv_purchase_order_master_Supplier_Id = inv_purchase_order_master_Supplier_Id;
	}
 	@JsonGetter("inv_purchase_order_master_doc_Series")
	public String getInv_purchase_order_master_doc_Series() {
		return inv_purchase_order_master_doc_Series;
	}
 	@JsonSetter("inv_purchase_order_master_doc_Series")
	public void setInv_purchase_order_master_doc_Series(
			String inv_purchase_order_master_doc_Series) {
		this.inv_purchase_order_master_doc_Series = inv_purchase_order_master_doc_Series;
	}
 	@JsonGetter("inv_purchase_order_master_reference_no")
	public String getInv_purchase_order_master_reference_no() {
		return inv_purchase_order_master_reference_no;
	}
 	@JsonSetter("inv_purchase_order_master_reference_no")
	public void setInv_purchase_order_master_reference_no(
			String inv_purchase_order_master_reference_no) {
		this.inv_purchase_order_master_reference_no = inv_purchase_order_master_reference_no;
	}
 	@JsonGetter("inv_purchase_order_master_Address")
	public String getInv_purchase_order_master_Address() {
		return inv_purchase_order_master_Address;
	}
 	@JsonSetter("inv_purchase_order_master_Address")
	public void setInv_purchase_order_master_Address(
			String inv_purchase_order_master_Address) {
		this.inv_purchase_order_master_Address = inv_purchase_order_master_Address;
	}
 	@JsonGetter("inv_purchase_order_master_status")
	public String getInv_purchase_order_master_status() {
		return inv_purchase_order_master_status;
	}
 	@JsonSetter("inv_purchase_order_master_status")
	public void setInv_purchase_order_master_status(
			String inv_purchase_order_master_status) {
		this.inv_purchase_order_master_status = inv_purchase_order_master_status;
	}
 	@JsonGetter("inv_purchase_order_master_total_doc_qty")
	public Integer getInv_purchase_order_master_total_doc_qty() {
		return inv_purchase_order_master_total_doc_qty;
	}
 	@JsonSetter("inv_purchase_order_master_total_doc_qty")
	public void setInv_purchase_order_master_total_doc_qty(
			Integer inv_purchase_order_master_total_doc_qty) {
		this.inv_purchase_order_master_total_doc_qty = inv_purchase_order_master_total_doc_qty;
	}
 	@JsonGetter("inv_purchase_order_master_total_discount")
	public Double getInv_purchase_order_master_total_discount() {
		return inv_purchase_order_master_total_discount;
	}
 	@JsonSetter("inv_purchase_order_master_total_discount")
	public void setInv_purchase_order_master_total_discount(
			Double inv_purchase_order_master_total_discount) {
		this.inv_purchase_order_master_total_discount = inv_purchase_order_master_total_discount;
	}
 	@JsonGetter("inv_purchase_order_master_local_currency")
	public String getInv_purchase_order_master_local_currency() {
		return inv_purchase_order_master_local_currency;
	}
 	@JsonSetter("inv_purchase_order_master_local_currency")
	public void setInv_purchase_order_master_local_currency(
			String inv_purchase_order_master_local_currency) {
		this.inv_purchase_order_master_local_currency = inv_purchase_order_master_local_currency;
	}
 	@JsonGetter("inv_purchase_order_master_purchase_Request_No")
	public Integer getInv_purchase_order_master_purchase_Request_No() {
		return inv_purchase_order_master_purchase_Request_No;
	}
 	@JsonSetter("inv_purchase_order_master_purchase_Request_No")
	public void setInv_purchase_order_master_purchase_Request_No(
			Integer inv_purchase_order_master_purchase_Request_No) {
		this.inv_purchase_order_master_purchase_Request_No = inv_purchase_order_master_purchase_Request_No;
	}
 	@JsonGetter("inv_new_purchase_order_master_order_place_flag")
	public Integer getInv_new_purchase_order_master_order_place_flag() {
		return inv_new_purchase_order_master_order_place_flag;
	}
 	@JsonSetter("inv_new_purchase_order_master_order_place_flag")
	public void setInv_new_purchase_order_master_order_place_flag(
			Integer inv_new_purchase_order_master_order_place_flag) {
		this.inv_new_purchase_order_master_order_place_flag = inv_new_purchase_order_master_order_place_flag;
	}
 	@JsonGetter("inv_purchase_order_master_form_Name")
	public String getInv_purchase_order_master_form_Name() {
		return inv_purchase_order_master_form_Name;
	}
 	@JsonSetter("inv_purchase_order_master_form_Name")
	public void setInv_purchase_order_master_form_Name(
			String inv_purchase_order_master_form_Name) {
		this.inv_purchase_order_master_form_Name = inv_purchase_order_master_form_Name;
	}
 	@JsonGetter("inv_purchase_order_master_delete_flag")
	public Integer getInv_purchase_order_master_delete_flag() {
		return inv_purchase_order_master_delete_flag;
	}
 	@JsonSetter("inv_purchase_order_master_delete_flag")
	public void setInv_purchase_order_master_delete_flag(
			Integer inv_purchase_order_master_delete_flag) {
		this.inv_purchase_order_master_delete_flag = inv_purchase_order_master_delete_flag;
	}
 	@JsonGetter("inv_purchase_order_master_updated_date")
	public String getInv_purchase_order_master_updated_date() {
		return inv_purchase_order_master_updated_date;
	}
 	@JsonSetter("inv_purchase_order_master_updated_date")
	public void setInv_purchase_order_master_updated_date(
			String inv_purchase_order_master_updated_date) {
		this.inv_purchase_order_master_updated_date = inv_purchase_order_master_updated_date;
	}
 	@JsonGetter("inv_purchase_order_master_create_date")
	public String getInv_purchase_order_master_create_date() {
		return inv_purchase_order_master_create_date;
	}
 	@JsonSetter("inv_purchase_order_master_create_date")
	public void setInv_purchase_order_master_create_date(
			String inv_purchase_order_master_create_date) {
		this.inv_purchase_order_master_create_date = inv_purchase_order_master_create_date;
	}
 	@JsonGetter("ltinvetorypurchaseordermaster")
	public List<InventoryPurchaseOrderMaster> getLtinvetorypurchaseordermaster() {
		return ltinvetorypurchaseordermaster;
	}
 	@JsonSetter("ltinvetorypurchaseordermaster")
	public void setLtinvetorypurchaseordermaster(
			List<InventoryPurchaseOrderMaster> ltinvetorypurchaseordermaster) {
		this.ltinvetorypurchaseordermaster = ltinvetorypurchaseordermaster;
	}
 	@JsonGetter("inv_purchase_order_master_purchase_quotation_No_fk")		
 	public Integer getInv_purchase_order_master_purchase_quotation_No_fk() {
		return inv_purchase_order_master_purchase_quotation_No_fk;
	}
 	@JsonSetter
("inv_purchase_order_master_purchase_quotation_No_fk")
	public void setInv_purchase_order_master_purchase_quotation_No_fk(
			Integer inv_purchase_order_master_purchase_quotation_No_fk) {
		this.inv_purchase_order_master_purchase_quotation_No_fk = inv_purchase_order_master_purchase_quotation_No_fk;
	}

	@JsonGetter("ltinvetorypurchaseOrderitemmaster")
	public List<InventoryPurchaseOrderItemMaster> getLtinvetorypurchaseOrderitemmaster() {
		return ltinvetorypurchaseOrderitemmaster;
	}
 	@JsonSetter("ltinvetorypurchaseOrderitemmaster")
	public void setLtinvetorypurchaseOrderitemmaster(
			List<InventoryPurchaseOrderItemMaster> ltinvetorypurchaseOrderitemmaster) {
		this.ltinvetorypurchaseOrderitemmaster = ltinvetorypurchaseOrderitemmaster;
	}
 	@JsonGetter("inv_purchase_order_terms_and_condition_master_termsandcondition")
	public String getInv_purchase_order_terms_and_condition_master_termsandcondition() {
		return inv_purchase_order_terms_and_condition_master_termsandcondition;
	}
 	
 	@JsonSetter("inv_purchase_order_terms_and_condition_master_termsandcondition")
	public void setInv_purchase_order_terms_and_condition_master_termsandcondition(
			String inv_purchase_order_terms_and_condition_master_termsandcondition) {
		this.inv_purchase_order_terms_and_condition_master_termsandcondition = inv_purchase_order_terms_and_condition_master_termsandcondition;
	}

 	@JsonGetter("inv_purchase_order_master_Delivery_Date")
	public String getInv_purchase_order_master_Delivery_Date() {
		return inv_purchase_order_master_Delivery_Date;
	}

 	@JsonSetter("inv_purchase_order_master_Delivery_Date")
	public void setInv_purchase_order_master_Delivery_Date(
			String inv_purchase_order_master_Delivery_Date) {
		this.inv_purchase_order_master_Delivery_Date = inv_purchase_order_master_Delivery_Date;
	}

 	@JsonGetter("inv_purchase_order_master_order_generator_name")
	public String getInv_purchase_order_master_order_generator_name() {
		return inv_purchase_order_master_order_generator_name;
	}
 	@JsonSetter("inv_purchase_order_master_order_generator_name")
	public void setInv_purchase_order_master_order_generator_name(
			String inv_purchase_order_master_order_generator_name) {
		this.inv_purchase_order_master_order_generator_name = inv_purchase_order_master_order_generator_name;
	}
 	
 	@JsonGetter("inv_purchase_order_master_order_generator_userid")
	public String getInv_purchase_order_master_order_generator_userid() {
		return inv_purchase_order_master_order_generator_userid;
	}
 	@JsonSetter("inv_purchase_order_master_order_generator_userid")
	public void setInv_purchase_order_master_order_generator_userid(
			String inv_purchase_order_master_order_generator_userid) {
		this.inv_purchase_order_master_order_generator_userid = inv_purchase_order_master_order_generator_userid;
	}

 	@JsonGetter("inv_purchase_order_master_order_genrating_date_time")
	public String getInv_purchase_order_master_order_genrating_date_time() {
		return inv_purchase_order_master_order_genrating_date_time;
	}
	@JsonSetter("inv_purchase_order_master_order_genrating_date_time")
	public void setInv_purchase_order_master_order_genrating_date_time(
			String inv_purchase_order_master_order_genrating_date_time) {
		this.inv_purchase_order_master_order_genrating_date_time = inv_purchase_order_master_order_genrating_date_time;
	}
	@JsonGetter("inv_purchase_order_master_order_updating_date_time")
	public String getInv_purchase_order_master_order_updating_date_time() {
		return inv_purchase_order_master_order_updating_date_time;
	}

	@JsonSetter("inv_purchase_order_master_order_updating_date_time")
	public void setInv_purchase_order_master_order_updating_date_time(
			String inv_purchase_order_master_order_updating_date_time) {
		this.inv_purchase_order_master_order_updating_date_time = inv_purchase_order_master_order_updating_date_time;
	}

	@JsonGetter("inv_purchase_order_master_order_deleted_name")
	public String getInv_purchase_order_master_order_deleted_name() {
		return inv_purchase_order_master_order_deleted_name;
	}

	@JsonSetter("inv_purchase_order_master_order_deleted_name")
	public void setInv_purchase_order_master_order_deleted_name(
			String inv_purchase_order_master_order_deleted_name) {
		this.inv_purchase_order_master_order_deleted_name = inv_purchase_order_master_order_deleted_name;
	}
	 
	@JsonGetter("inv_purchase_order_master_order_deleted_date_time")
	public String getInv_purchase_order_master_order_deleted_date_time() {
		return inv_purchase_order_master_order_deleted_date_time;
	}
	@JsonSetter("inv_purchase_order_master_order_deleted_date_time")
	public void setInv_purchase_order_master_order_deleted_date_time(
			String inv_purchase_order_master_order_deleted_date_time) {
		this.inv_purchase_order_master_order_deleted_date_time = inv_purchase_order_master_order_deleted_date_time;
	}
 	
	public Double getInv_purchase_order_master_special_disc() {
			return inv_purchase_order_master_special_disc;
		}

		public void setInv_purchase_order_master_special_disc(
				Double inv_purchase_order_master_special_disc) {
			this.inv_purchase_order_master_special_disc = inv_purchase_order_master_special_disc;
		}

		public Double getInv_purchase_order_master_debit_amt() {
			return inv_purchase_order_master_debit_amt;
		}

		public void setInv_purchase_order_master_debit_amt(
				Double inv_purchase_order_master_debit_amt) {
			this.inv_purchase_order_master_debit_amt = inv_purchase_order_master_debit_amt;
		}

		public Double getInv_purchase_order_master_cash_amt_perct() {
			return inv_purchase_order_master_cash_amt_perct;
		}

		public void setInv_purchase_order_master_cash_amt_perct(
				Double inv_purchase_order_master_cash_amt_perct) {
			this.inv_purchase_order_master_cash_amt_perct = inv_purchase_order_master_cash_amt_perct;
		}

		public Double getInv_purchase_order_master_cash_amt_rupees() {
			return inv_purchase_order_master_cash_amt_rupees;
		}

		public void setInv_purchase_order_master_cash_amt_rupees(
				Double inv_purchase_order_master_cash_amt_rupees) {
			this.inv_purchase_order_master_cash_amt_rupees = inv_purchase_order_master_cash_amt_rupees;
		}

		public Double getInv_purchase_order_master_octroi_amt() {
			return inv_purchase_order_master_octroi_amt;
		}

		public void setInv_purchase_order_master_octroi_amt(
				Double inv_purchase_order_master_octroi_amt) {
			this.inv_purchase_order_master_octroi_amt = inv_purchase_order_master_octroi_amt;
		}

		public Double getInv_purchase_order_master_surcharge_amt() {
			return inv_purchase_order_master_surcharge_amt;
		}

		public void setInv_purchase_order_master_surcharge_amt(
				Double inv_purchase_order_master_surcharge_amt) {
			this.inv_purchase_order_master_surcharge_amt = inv_purchase_order_master_surcharge_amt;
		}

		public Double getInv_purchase_order_master_credit_amt() {
			return inv_purchase_order_master_credit_amt;
		}

		public void setInv_purchase_order_master_credit_amt(
				Double inv_purchase_order_master_credit_amt) {
			this.inv_purchase_order_master_credit_amt = inv_purchase_order_master_credit_amt;
		}

		public Double getInv_purchase_order_master_freight_amt() {
			return inv_purchase_order_master_freight_amt;
		}

		public void setInv_purchase_order_master_freight_amt(
				Double inv_purchase_order_master_freight_amt) {
			this.inv_purchase_order_master_freight_amt = inv_purchase_order_master_freight_amt;
		}

		public Double getInv_purchase_order_master_calcuated_vat_amt() {
			return inv_purchase_order_master_calcuated_vat_amt;
		}

		public void setInv_purchase_order_master_calcuated_vat_amt(
				Double inv_purchase_order_master_calcuated_vat_amt) {
			this.inv_purchase_order_master_calcuated_vat_amt = inv_purchase_order_master_calcuated_vat_amt;
		}

		public Double getInv_purchase_order_master_lbt_amt() {
			return inv_purchase_order_master_lbt_amt;
		}

		public void setInv_purchase_order_master_lbt_amt(
				Double inv_purchase_order_master_lbt_amt) {
			this.inv_purchase_order_master_lbt_amt = inv_purchase_order_master_lbt_amt;
		}

		public Double getInv_purchase_order_master_cst_amt() {
			return inv_purchase_order_master_cst_amt;
		}

		public void setInv_purchase_order_master_cst_amt(
				Double inv_purchase_order_master_cst_amt) {
			this.inv_purchase_order_master_cst_amt = inv_purchase_order_master_cst_amt;
		}

		public Double getInv_purchase_order_master_ex_vat_amt() {
			return inv_purchase_order_master_ex_vat_amt;
		}

		public void setInv_purchase_order_master_ex_vat_amt(
				Double inv_purchase_order_master_ex_vat_amt) {
			this.inv_purchase_order_master_ex_vat_amt = inv_purchase_order_master_ex_vat_amt;
		}

		public Double getInv_purchase_order_master_calcuated_total_taxes_amt() {
			return inv_purchase_order_master_calcuated_total_taxes_amt;
		}

		public void setInv_purchase_order_master_calcuated_total_taxes_amt(
				Double inv_purchase_order_master_calcuated_total_taxes_amt) {
			this.inv_purchase_order_master_calcuated_total_taxes_amt = inv_purchase_order_master_calcuated_total_taxes_amt;
		}

		public Double getInv_purchase_order_master_total_base_gross_amt() {
			return inv_purchase_order_master_total_base_gross_amt;
		}

		public void setInv_purchase_order_master_total_base_gross_amt(
				Double inv_purchase_order_master_total_base_gross_amt) {
			this.inv_purchase_order_master_total_base_gross_amt = inv_purchase_order_master_total_base_gross_amt;
		}

		public Double getInv_purchase_order_master_total_less_amt() {
			return inv_purchase_order_master_total_less_amt;
		}

		public void setInv_purchase_order_master_total_less_amt(
				Double inv_purchase_order_master_total_less_amt) {
			this.inv_purchase_order_master_total_less_amt = inv_purchase_order_master_total_less_amt;
		}

		public Double getInv_purchase_order_master_total_add_amt() {
			return inv_purchase_order_master_total_add_amt;
		}

		public void setInv_purchase_order_master_total_add_amt(
				Double inv_purchase_order_master_total_add_amt) {
			this.inv_purchase_order_master_total_add_amt = inv_purchase_order_master_total_add_amt;
		}

		public Double getInv_purchase_order_master_final_calcuated_total_taxes_amt() {
			return inv_purchase_order_master_final_calcuated_total_taxes_amt;
		}

		public void setInv_purchase_order_master_final_calcuated_total_taxes_amt(
				Double inv_purchase_order_master_final_calcuated_total_taxes_amt) {
			this.inv_purchase_order_master_final_calcuated_total_taxes_amt = inv_purchase_order_master_final_calcuated_total_taxes_amt;
		}

		public Double getInv_purchase_order_master_final_total_net_amt() {
			return inv_purchase_order_master_final_total_net_amt;
		}

		public void setInv_purchase_order_master_final_total_net_amt(
				Double inv_purchase_order_master_final_total_net_amt) {
			this.inv_purchase_order_master_final_total_net_amt = inv_purchase_order_master_final_total_net_amt;
		}

	
		
		@JsonGetter("inv_purchase_order_master_special_charges")
		public String getInv_purchase_order_master_special_charges() {
			return inv_purchase_order_master_special_charges;
		}

		@JsonSetter("inv_purchase_order_master_special_charges")
		public void setInv_purchase_order_master_special_charges(
				String inv_purchase_order_master_special_charges) {
			this.inv_purchase_order_master_special_charges = inv_purchase_order_master_special_charges;
		}

		@JsonGetter("inv_purchase_order_master_sumofspecial_charges")
		public Double getInv_purchase_order_master_sumofspecial_charges() {
			return inv_purchase_order_master_sumofspecial_charges;
		}

		@JsonSetter("inv_purchase_order_master_sumofspecial_charges")
		public void setInv_purchase_order_master_sumofspecial_charges(
				Double inv_purchase_order_master_sumofspecial_charges) {
			this.inv_purchase_order_master_sumofspecial_charges = inv_purchase_order_master_sumofspecial_charges;
		}
		
		public String getSanctionNo() {
			return sanctionNo;
		}

		public void setSanctionNo(String sanctionNo) {
			this.sanctionNo = sanctionNo;
		}

		public String getApproveFlag() {
			return approveFlag;
		}

		public void setApproveFlag(String approveFlag) {
			this.approveFlag = approveFlag;
		}

		public String getPoAmendFlag() {
			return poAmendFlag;
		}

		public void setPoAmendFlag(String poAmendFlag) {
			this.poAmendFlag = poAmendFlag;
		}

		public Integer getPoProcsId() {
			return poProcsId;
		}

		public void setPoProcsId(Integer poProcsId) {
			this.poProcsId = poProcsId;
		}

		@JsonGetter("inv_purchase_order_master_center_id")
		public String getPurchaseOrderCenterId()
		{
			return purchaseOrderCenterId;
		}
			 
		@JsonSetter("inv_purchase_order_master_center_id")
		public void setPurchaseOrderCenterId(String purchaseOrderCenterId) 
		{
			this.purchaseOrderCenterId = purchaseOrderCenterId;
		}

		 @JsonGetter("inv_purchase_order_ipAddress")
		 	public String getInv_purchase_order_hidden_ip() {
				return inv_purchase_order_hidden_ip;
			}

		 	@JsonSetter("inv_purchase_order_ipAddress")
			public void setInv_purchase_order_hidden_ip(String inv_purchase_order_hidden_ip) {
				this.inv_purchase_order_hidden_ip = inv_purchase_order_hidden_ip;
			}
		 	
		 	@JsonGetter("clientIp")
			public String getClientIp() {
				return clientIp;
			}
			@JsonSetter("clientIp")
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
			@JsonGetter("inv_SupplierState")
			public Integer getInv_SupplierState() {
				return inv_SupplierState;
			}
			@JsonSetter("inv_SupplierState")
			public void setInv_SupplierState(Integer inv_SupplierState) {
				this.inv_SupplierState = inv_SupplierState;
			}
			@JsonGetter("inv_remark")
			public String getInv_remark() {
				return inv_remark;
			}
			@JsonSetter("inv_remark")
			public void setInv_remark(String inv_remark) {
				this.inv_remark = inv_remark;
			}
		
}
