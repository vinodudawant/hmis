package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryGRNMasterDTO {
	
	 
	public List<InventoryGRNMasterDTO> getLtinvetorypurchasecommonmaster() {
		return ltinvetorypurchasecommonmaster;
	}

	public void setLtinvetorypurchasecommonmaster(
			List<InventoryGRNMasterDTO> ltinvetorypurchasecommonmaster) {
		this.ltinvetorypurchasecommonmaster = ltinvetorypurchasecommonmaster;
	}
	private Integer inv_batch_stock_master_doc_no;
	private String inv_batch_stock_master_doc_date;
	private String inv_batch_stock_master_mobile_number;
	private String inv_batch_stock_master_Supplier_Name;
	
	private Integer inv_batch_stock_master_Supplier_Id;
	private String inv_batch_stock_master_doc_Series;
	private String inv_batch_stock_master_reference_no;
	private String inv_batch_stock_master_Address;
	
	private String inv_batch_stock_master_status;
	private Integer inv_batch_stock_master_total_doc_qty;
	private Double inv_batch_stock_master_total_discount;
	private String inv_batch_stock_master_local_currency;
	private Integer inv_batch_stock_master_batch_Request_No;
	private Integer inv_purchase_common_master_grn_No;
	
	private Integer inv_purchase_Invoice_master_Doc_No;
	
	private String inv_batch_stock_master_form_Name;
	private Integer inv_batch_stock_master_delete_flag;
	private Integer inv_batch_stock_master_batch_order_No_fk;
	private Date inv_batch_stock_master_updated_date;
	private Date inv_batch_stock_master_create_date;
	
	private String inv_batch_stock_master_purchase_invoice_number;
	private String inv_batch_stock_master_purchase_delivery_challan_number;
	
	private String inv_batch_stock_master_purchase_delivery_date;
	private String  inv_batch_stock_total_item_pending_qty;
	private Integer inv_batch_stock_fixchallan; //add by paras  
	private Integer inv_batch_stock_fixpurchaseinvoice; //add by paras
	
	//newly added charges 6/6/2016
		private Double inv_batch_stock_master_special_disc; 
		private Double inv_batch_stock_master_debit_amt ; 
		private Double inv_batch_stock_master_cash_amt_perct; 
		private Double inv_batch_stock_master_cash_amt_rupees; 
		private Double inv_batch_stock_master_octroi_amt;
		private Double inv_batch_stock_master_surcharge_amt;
		private Double inv_batch_stock_master_credit_amt;
		private Double inv_batch_stock_master_freight_amt; 
		private Double inv_batch_stock_master_calcuated_vat_amt; 
		private Double inv_batch_stock_master_lbt_amt; 
		private Double inv_batch_stock_master_cst_amt; 
		private Double inv_batch_stock_master_ex_vat_amt; 
		private Double inv_batch_stock_master_calcuated_total_taxes_amt; 
		private Double inv_batch_stock_master_total_base_gross_amt; 
		private Double inv_batch_stock_master_total_less_amt; 
		private Double inv_batch_stock_master_total_add_amt	; 
		private Double inv_batch_stock_master_final_calcuated_total_taxes_amt; 
		private Double inv_batch_stock_master_final_total_net_amt ;
		
		
		private String inv_batch_stock_master_special_charges;
		private Double inv_batch_stock_master_sumofspecial_charges;
		private String inv_purchase_common_master_vmi;
		private Integer inv_SupplierState; //add by paras
		private String txtagchallan;
		private String inv_remark;
		private List<InventoryGRNMasterDTO> ltinvetorypurchasecommonmaster;
	 
	@JsonGetter("inv_batch_stock_master_doc_no")
	public Integer getInv_batch_stock_master_doc_no() {
		return inv_batch_stock_master_doc_no;
	}
	
	@JsonSetter("inv_batch_stock_master_doc_no")
	public void setInv_batch_stock_master_doc_no(
			Integer inv_batch_stock_master_doc_no) {
		this.inv_batch_stock_master_doc_no = inv_batch_stock_master_doc_no;
	}
	@JsonGetter("inv_batch_stock_master_doc_date")
	public String getInv_batch_stock_master_doc_date() {
		return inv_batch_stock_master_doc_date;
	}
	@JsonSetter("inv_batch_stock_master_doc_date")
	public void setInv_batch_stock_master_doc_date(
			String inv_batch_stock_master_doc_date) {
		this.inv_batch_stock_master_doc_date = inv_batch_stock_master_doc_date;
	}
	@JsonGetter("inv_batch_stock_master_mobile_number")
	public String getInv_batch_stock_master_mobile_number() {
		return inv_batch_stock_master_mobile_number;
	}
	@JsonSetter("inv_batch_stock_master_mobile_number")
	public void setInv_batch_stock_master_mobile_number(
			String inv_batch_stock_master_mobile_number) {
		this.inv_batch_stock_master_mobile_number = inv_batch_stock_master_mobile_number;
	}
	@JsonGetter("inv_batch_stock_master_Supplier_Name")
	public String getInv_batch_stock_master_Supplier_Name() {
		return inv_batch_stock_master_Supplier_Name;
	}
	@JsonSetter("inv_batch_stock_master_Supplier_Name")
	public void setInv_batch_stock_master_Supplier_Name(
			String inv_batch_stock_master_Supplier_Name) {
		this.inv_batch_stock_master_Supplier_Name = inv_batch_stock_master_Supplier_Name;
	}
	@JsonGetter("inv_batch_stock_master_Supplier_Id")
	public Integer getInv_batch_stock_master_Supplier_Id() {
		return inv_batch_stock_master_Supplier_Id;
	}
	
	@JsonSetter("inv_batch_stock_master_Supplier_Id")
	public void setInv_batch_stock_master_Supplier_Id(
			Integer inv_batch_stock_master_Supplier_Id) {
		this.inv_batch_stock_master_Supplier_Id = inv_batch_stock_master_Supplier_Id;
	}
	@JsonGetter("inv_batch_stock_master_doc_Series")
	public String getInv_batch_stock_master_doc_Series() {
		return inv_batch_stock_master_doc_Series;
	}
	@JsonSetter("inv_batch_stock_master_doc_Series")
	public void setInv_batch_stock_master_doc_Series(
			String inv_batch_stock_master_doc_Series) {
		this.inv_batch_stock_master_doc_Series = inv_batch_stock_master_doc_Series;
	}
	@JsonGetter("inv_batch_stock_master_reference_no")
	public String getInv_batch_stock_master_reference_no() {
		return inv_batch_stock_master_reference_no;
	}@JsonSetter("inv_batch_stock_master_reference_no")
	public void setInv_batch_stock_master_reference_no(
			String inv_batch_stock_master_reference_no) {
		this.inv_batch_stock_master_reference_no = inv_batch_stock_master_reference_no;
	}
	@JsonGetter("inv_batch_stock_master_Address")
	public String getInv_batch_stock_master_Address() {
		return inv_batch_stock_master_Address;
	}
	@JsonSetter("inv_batch_stock_master_Address")
	public void setInv_batch_stock_master_Address(
			String inv_batch_stock_master_Address) {
		this.inv_batch_stock_master_Address = inv_batch_stock_master_Address;
	}
	@JsonGetter("inv_batch_stock_master_status")
	public String getInv_batch_stock_master_status() {
		return inv_batch_stock_master_status;
	}
	@JsonSetter("inv_batch_stock_master_status")
	public void setInv_batch_stock_master_status(
			String inv_batch_stock_master_status) {
		this.inv_batch_stock_master_status = inv_batch_stock_master_status;
	}
	public Integer getInv_batch_stock_master_total_doc_qty() {
		return inv_batch_stock_master_total_doc_qty;
	}
	public void setInv_batch_stock_master_total_doc_qty(
			Integer inv_batch_stock_master_total_doc_qty) {
		this.inv_batch_stock_master_total_doc_qty = inv_batch_stock_master_total_doc_qty;
	}
	public Double getInv_batch_stock_master_total_discount() {
		return inv_batch_stock_master_total_discount;
	}
	public void setInv_batch_stock_master_total_discount(
			Double inv_batch_stock_master_total_discount) {
		this.inv_batch_stock_master_total_discount = inv_batch_stock_master_total_discount;
	}
	public String getInv_batch_stock_master_local_currency() {
		return inv_batch_stock_master_local_currency;
	}
	public void setInv_batch_stock_master_local_currency(
			String inv_batch_stock_master_local_currency) {
		this.inv_batch_stock_master_local_currency = inv_batch_stock_master_local_currency;
	}
	public Integer getInv_batch_stock_master_batch_Request_No() {
		return inv_batch_stock_master_batch_Request_No;
	}
	public void setInv_batch_stock_master_batch_Request_No(
			Integer inv_batch_stock_master_batch_Request_No) {
		this.inv_batch_stock_master_batch_Request_No = inv_batch_stock_master_batch_Request_No;
	}
	public Integer getInv_purchase_common_master_grn_No() {
		return inv_purchase_common_master_grn_No;
	}
	public void setInv_purchase_common_master_grn_No(
			Integer inv_purchase_common_master_grn_No) {
		this.inv_purchase_common_master_grn_No = inv_purchase_common_master_grn_No;
	}
	public Integer getInv_purchase_Invoice_master_Doc_No() {
		return inv_purchase_Invoice_master_Doc_No;
	}
	public void setInv_purchase_Invoice_master_Doc_No(
			Integer inv_purchase_Invoice_master_Doc_No) {
		this.inv_purchase_Invoice_master_Doc_No = inv_purchase_Invoice_master_Doc_No;
	}
	public String getInv_batch_stock_master_form_Name() {
		return inv_batch_stock_master_form_Name;
	}
	public void setInv_batch_stock_master_form_Name(
			String inv_batch_stock_master_form_Name) {
		this.inv_batch_stock_master_form_Name = inv_batch_stock_master_form_Name;
	}
	public Integer getInv_batch_stock_master_delete_flag() {
		return inv_batch_stock_master_delete_flag;
	}
	public void setInv_batch_stock_master_delete_flag(
			Integer inv_batch_stock_master_delete_flag) {
		this.inv_batch_stock_master_delete_flag = inv_batch_stock_master_delete_flag;
	}
	public Integer getInv_batch_stock_master_batch_order_No_fk() {
		return inv_batch_stock_master_batch_order_No_fk;
	}
	public void setInv_batch_stock_master_batch_order_No_fk(
			Integer inv_batch_stock_master_batch_order_No_fk) {
		this.inv_batch_stock_master_batch_order_No_fk = inv_batch_stock_master_batch_order_No_fk;
	}
	public Date getInv_batch_stock_master_updated_date() {
		return inv_batch_stock_master_updated_date;
	}
	public void setInv_batch_stock_master_updated_date(
			Date inv_batch_stock_master_updated_date) {
		this.inv_batch_stock_master_updated_date = inv_batch_stock_master_updated_date;
	}
	public Date getInv_batch_stock_master_create_date() {
		return inv_batch_stock_master_create_date;
	}
	public void setInv_batch_stock_master_create_date(
			Date inv_batch_stock_master_create_date) {
		this.inv_batch_stock_master_create_date = inv_batch_stock_master_create_date;
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

	@JsonGetter("inv_batch_stock_master_purchase_delivery_date")
	public String getInv_batch_stock_master_purchase_delivery_date() {
		return inv_batch_stock_master_purchase_delivery_date;
	}

	@JsonSetter("inv_batch_stock_master_purchase_delivery_date")
	public void setInv_batch_stock_master_purchase_delivery_date(
			String inv_batch_stock_master_purchase_delivery_date) {
		this.inv_batch_stock_master_purchase_delivery_date = inv_batch_stock_master_purchase_delivery_date;
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
	
 
	public Double getInv_batch_stock_master_special_disc() {
			return inv_batch_stock_master_special_disc;
		}

		public void setInv_batch_stock_master_special_disc(
				Double inv_batch_stock_master_special_disc) {
			this.inv_batch_stock_master_special_disc = inv_batch_stock_master_special_disc;
		}

		public Double getInv_batch_stock_master_debit_amt() {
			return inv_batch_stock_master_debit_amt;
		}

		public void setInv_batch_stock_master_debit_amt(
				Double inv_batch_stock_master_debit_amt) {
			this.inv_batch_stock_master_debit_amt = inv_batch_stock_master_debit_amt;
		}

		public Double getInv_batch_stock_master_cash_amt_perct() {
			return inv_batch_stock_master_cash_amt_perct;
		}

		public void setInv_batch_stock_master_cash_amt_perct(
				Double inv_batch_stock_master_cash_amt_perct) {
			this.inv_batch_stock_master_cash_amt_perct = inv_batch_stock_master_cash_amt_perct;
		}

		public Double getInv_batch_stock_master_cash_amt_rupees() {
			return inv_batch_stock_master_cash_amt_rupees;
		}

		public void setInv_batch_stock_master_cash_amt_rupees(
				Double inv_batch_stock_master_cash_amt_rupees) {
			this.inv_batch_stock_master_cash_amt_rupees = inv_batch_stock_master_cash_amt_rupees;
		}

		public Double getInv_batch_stock_master_octroi_amt() {
			return inv_batch_stock_master_octroi_amt;
		}

		public void setInv_batch_stock_master_octroi_amt(
				Double inv_batch_stock_master_octroi_amt) {
			this.inv_batch_stock_master_octroi_amt = inv_batch_stock_master_octroi_amt;
		}

		public Double getInv_batch_stock_master_surcharge_amt() {
			return inv_batch_stock_master_surcharge_amt;
		}

		public void setInv_batch_stock_master_surcharge_amt(
				Double inv_batch_stock_master_surcharge_amt) {
			this.inv_batch_stock_master_surcharge_amt = inv_batch_stock_master_surcharge_amt;
		}

		public Double getInv_batch_stock_master_credit_amt() {
			return inv_batch_stock_master_credit_amt;
		}

		public void setInv_batch_stock_master_credit_amt(
				Double inv_batch_stock_master_credit_amt) {
			this.inv_batch_stock_master_credit_amt = inv_batch_stock_master_credit_amt;
		}

		public Double getInv_batch_stock_master_freight_amt() {
			return inv_batch_stock_master_freight_amt;
		}

		public void setInv_batch_stock_master_freight_amt(
				Double inv_batch_stock_master_freight_amt) {
			this.inv_batch_stock_master_freight_amt = inv_batch_stock_master_freight_amt;
		}

		public Double getInv_batch_stock_master_calcuated_vat_amt() {
			return inv_batch_stock_master_calcuated_vat_amt;
		}

		public void setInv_batch_stock_master_calcuated_vat_amt(
				Double inv_batch_stock_master_calcuated_vat_amt) {
			this.inv_batch_stock_master_calcuated_vat_amt = inv_batch_stock_master_calcuated_vat_amt;
		}

		public Double getInv_batch_stock_master_lbt_amt() {
			return inv_batch_stock_master_lbt_amt;
		}

		public void setInv_batch_stock_master_lbt_amt(
				Double inv_batch_stock_master_lbt_amt) {
			this.inv_batch_stock_master_lbt_amt = inv_batch_stock_master_lbt_amt;
		}

		public Double getInv_batch_stock_master_cst_amt() {
			return inv_batch_stock_master_cst_amt;
		}

		public void setInv_batch_stock_master_cst_amt(
				Double inv_batch_stock_master_cst_amt) {
			this.inv_batch_stock_master_cst_amt = inv_batch_stock_master_cst_amt;
		}

		public Double getInv_batch_stock_master_ex_vat_amt() {
			return inv_batch_stock_master_ex_vat_amt;
		}

		public void setInv_batch_stock_master_ex_vat_amt(
				Double inv_batch_stock_master_ex_vat_amt) {
			this.inv_batch_stock_master_ex_vat_amt = inv_batch_stock_master_ex_vat_amt;
		}

		public Double getInv_batch_stock_master_calcuated_total_taxes_amt() {
			return inv_batch_stock_master_calcuated_total_taxes_amt;
		}

		public void setInv_batch_stock_master_calcuated_total_taxes_amt(
				Double inv_batch_stock_master_calcuated_total_taxes_amt) {
			this.inv_batch_stock_master_calcuated_total_taxes_amt = inv_batch_stock_master_calcuated_total_taxes_amt;
		}

		public Double getInv_batch_stock_master_total_base_gross_amt() {
			return inv_batch_stock_master_total_base_gross_amt;
		}

		public void setInv_batch_stock_master_total_base_gross_amt(
				Double inv_batch_stock_master_total_base_gross_amt) {
			this.inv_batch_stock_master_total_base_gross_amt = inv_batch_stock_master_total_base_gross_amt;
		}

		public Double getInv_batch_stock_master_total_less_amt() {
			return inv_batch_stock_master_total_less_amt;
		}

		public void setInv_batch_stock_master_total_less_amt(
				Double inv_batch_stock_master_total_less_amt) {
			this.inv_batch_stock_master_total_less_amt = inv_batch_stock_master_total_less_amt;
		}

		public Double getInv_batch_stock_master_total_add_amt() {
			return inv_batch_stock_master_total_add_amt;
		}

		public void setInv_batch_stock_master_total_add_amt(
				Double inv_batch_stock_master_total_add_amt) {
			this.inv_batch_stock_master_total_add_amt = inv_batch_stock_master_total_add_amt;
		}

		public Double getInv_batch_stock_master_final_calcuated_total_taxes_amt() {
			return inv_batch_stock_master_final_calcuated_total_taxes_amt;
		}

		public void setInv_batch_stock_master_final_calcuated_total_taxes_amt(
				Double inv_batch_stock_master_final_calcuated_total_taxes_amt) {
			this.inv_batch_stock_master_final_calcuated_total_taxes_amt = inv_batch_stock_master_final_calcuated_total_taxes_amt;
		}

		public Double getInv_batch_stock_master_final_total_net_amt() {
			return inv_batch_stock_master_final_total_net_amt;
		}

		public void setInv_batch_stock_master_final_total_net_amt(
				Double inv_batch_stock_master_final_total_net_amt) {
			this.inv_batch_stock_master_final_total_net_amt = inv_batch_stock_master_final_total_net_amt;
		}

		@JsonGetter("inv_batch_stock_master_special_charges")
		public String getInv_batch_stock_master_special_charges() {
			return inv_batch_stock_master_special_charges;
		}

		@JsonSetter("inv_batch_stock_master_special_charges")
		public void setInv_batch_stock_master_special_charges(
				String inv_batch_stock_master_special_charges) {
			this.inv_batch_stock_master_special_charges = inv_batch_stock_master_special_charges;
		}

		@JsonGetter("inv_batch_stock_master_sumofspecial_charges")
		public Double getInv_batch_stock_master_sumofspecial_charges() {
			return inv_batch_stock_master_sumofspecial_charges;
		}

		@JsonSetter("inv_batch_stock_master_sumofspecial_charges")
		public void setInv_batch_stock_master_sumofspecial_charges(
				Double inv_batch_stock_master_sumofspecial_charges) {
			this.inv_batch_stock_master_sumofspecial_charges = inv_batch_stock_master_sumofspecial_charges;
		}
	
		@JsonGetter("inv_purchase_common_master_vmi")
		public String getInv_purchase_common_master_vmi() {
			return inv_purchase_common_master_vmi;
		}
		@JsonSetter("inv_purchase_common_master_vmi")
		public void setInv_purchase_common_master_vmi(
				String inv_purchase_common_master_vmi) {
			this.inv_purchase_common_master_vmi = inv_purchase_common_master_vmi;
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
		@JsonSetter("inv_remark")
		public String getInv_remark() {
			return inv_remark;
		}
		@JsonSetter("inv_remark")
		public void setInv_remark(String inv_remark) {
			this.inv_remark = inv_remark;
		}
	
	
	
	 
}
