package com.hms.ehat.dto;

import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

import com.hms.dto.InventoryPurchaseInvoiceMasterDTO;

@Immutable
@Table(name = "inv_purchase_invoice_master")
public class InventoryNewDto {
	
	@Column(name = "inv_purchase_invoice_master_doc_no")
	private Integer inv_purchase_invoice_master_doc_no;
	
	@Column(name = "inv_purchase_invoice_master_doc_date")
	private String inv_purchase_invoice_master_doc_date;
	
	@Column(name = "inv_purchase_invoice_master_mobile_number")
	private String inv_purchase_invoice_master_mobile_number;
	
	@Column(name = "inv_purchase_invoice_master_Supplier_Name")
	private String inv_purchase_invoice_master_Supplier_Name;
	
	@Column(name = "inv_purchase_invoice_master_Supplier_Id")
	private Integer inv_purchase_invoice_master_Supplier_Id;
	
	@Column(name = "inv_purchase_invoice_master_doc_Series")
	private String inv_purchase_invoice_master_doc_Series;
	
	@Column(name = "inv_purchase_invoice_master_reference_no")
	private String inv_purchase_invoice_master_reference_no;
	
	@Column(name = "inv_purchase_invoice_master_Address")
	private String inv_purchase_invoice_master_Address;
	
	@Column(name = "inv_purchase_invoice_master_status")
	private String inv_purchase_invoice_master_status;
	
	@Column(name = "inv_purchase_invoice_master_total_doc_qty")
	private Integer inv_purchase_invoice_master_total_doc_qty;
	
	@Column(name = "inv_purchase_invoice_master_total_discount")
	private Double inv_purchase_invoice_master_total_discount;
	
	@Column(name = "inv_purchase_invoice_master_local_currency")
	private String inv_purchase_invoice_master_local_currency;
	
	@Column(name = "inv_purchase_invoice_master_purchase_Request_No")
	private Integer inv_purchase_invoice_master_purchase_Request_No;
	
	@Column(name = "inv_purchase_invoice_master_grn_no")
	private Integer inv_purchase_invoice_master_grn_no	;
	
	@Column(name = "inv_purchase_Invoice_master_Doc_No")
	private Integer inv_purchase_Invoice_master_Doc_No;
	
	@Column(name = "inv_purchase_invoice_master_form_Name")
	private String inv_purchase_invoice_master_form_Name;
	
	@Column(name = "inv_purchase_invoice_master_delete_flag")
	private Integer inv_purchase_invoice_master_delete_flag;
	
	@Column(name = "inv_purchase_invoice_master_updated_date")
	private Date inv_purchase_invoice_master_updated_date;
	
	@Column(name = "inv_purchase_invoice_master_create_date")
	private Date inv_purchase_invoice_master_create_date;
	
	@Column(name = "inv_purchase_invoice_master_goods_return_flag")
	private Integer inv_purchase_invoice_master_goods_return_flag;
	
	@Column(name = "inv_purchase_invoice_master_order_no")
	private Integer inv_purchase_invoice_master_order_no;
	
	@Column(name = "inv_purchase_invoice_master_delivery_date")
	private String inv_purchase_invoice_master_delivery_date;

	// newly added charges 9/6/2016
	@Column(name = "inv_purchase_invoice_master_special_disc")
	private Double inv_purchase_invoice_master_special_disc;
	
	@Column(name = "inv_purchase_invoice_master_debit_amt")
	private Double inv_purchase_invoice_master_debit_amt;
	
	@Column(name = "inv_purchase_invoice_master_cash_amt_perct")
	private Double inv_purchase_invoice_master_cash_amt_perct;
	
	@Column(name = "inv_purchase_invoice_master_cash_amt_rupees")
	private Double inv_purchase_invoice_master_cash_amt_rupees;
	
	@Column(name = "inv_purchase_invoice_master_octroi_amt")
	private Double inv_purchase_invoice_master_octroi_amt;
	
	@Column(name = "inv_purchase_invoice_master_surcharge_amt")
	private Double inv_purchase_invoice_master_surcharge_amt;
	
	@Column(name = "inv_purchase_invoice_master_credit_amt")
	private Double inv_purchase_invoice_master_credit_amt;
	
	@Column(name = "inv_purchase_invoice_master_freight_amt")
	private Double inv_purchase_invoice_master_freight_amt;
	
	@Column(name = "inv_purchase_invoice_master_calcuated_vat_amt")
	private Double inv_purchase_invoice_master_calcuated_vat_amt;
	
	@Column(name = "inv_purchase_invoice_master_lbt_amt")
	private Double inv_purchase_invoice_master_lbt_amt;
	
	@Column(name = "inv_purchase_invoice_master_cst_amt")
	private Double inv_purchase_invoice_master_cst_amt;
	
	@Column(name = "inv_purchase_invoice_master_ex_vat_amt")
	private Double inv_purchase_invoice_master_ex_vat_amt;
	
	@Column(name = "inv_purchase_invoice_master_calcuated_total_taxes_amt")
	private Double inv_purchase_invoice_master_calcuated_total_taxes_amt;
	
	@Column(name = "inv_purchase_invoice_master_total_base_gross_amt")
	private Double inv_purchase_invoice_master_total_base_gross_amt;
	
	@Column(name = "inv_purchase_invoice_master_total_less_amt")
	private Double inv_purchase_invoice_master_total_less_amt;
	
	@Column(name = "inv_purchase_invoice_master_total_add_amt")
	private Double inv_purchase_invoice_master_total_add_amt;
	
	@Column(name = "inv_purchase_invoice_master_final_calcuated_total_taxes_amt")
	private Double inv_purchase_invoice_master_final_calcuated_total_taxes_amt;
	
	@Column(name = "inv_purchase_invoice_master_final_total_net_amt")
	private Double inv_purchase_invoice_master_final_total_net_amt;

	@Column(name = "inv_purchase_invoice_master_special_charges")
	private String inv_purchase_invoice_master_special_charges;
	
	@Column(name = "inv_purchase_invoice_master_sumofspecial_charges")
	private Double inv_purchase_invoice_master_sumofspecial_charges;
	
	@Column(name = "inv_purchase_invoice_terms_and_condition_master")
	private String inv_purchase_invoice_terms_and_condition_master;
	
	@Transient
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Transient
	@Column(name = "generated_by")
	private Integer generatedBy;
	
	@Transient
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Transient
	@Column(name = "dispatch_flag")
	private String dispatchFlag;
	
	@Transient
	private List<InventoryNewDto> listInventoryNewDto;
	
	/*-------------------------Getter And Setters--------------------------------*/

	public Integer getInv_purchase_invoice_master_doc_no() {
		return inv_purchase_invoice_master_doc_no;
	}

	public String getInv_purchase_invoice_master_doc_date() {
		return inv_purchase_invoice_master_doc_date;
	}

	public String getInv_purchase_invoice_master_mobile_number() {
		return inv_purchase_invoice_master_mobile_number;
	}

	public String getInv_purchase_invoice_master_Supplier_Name() {
		return inv_purchase_invoice_master_Supplier_Name;
	}

	public Integer getInv_purchase_invoice_master_Supplier_Id() {
		return inv_purchase_invoice_master_Supplier_Id;
	}

	public String getInv_purchase_invoice_master_doc_Series() {
		return inv_purchase_invoice_master_doc_Series;
	}

	public String getInv_purchase_invoice_master_reference_no() {
		return inv_purchase_invoice_master_reference_no;
	}

	public String getInv_purchase_invoice_master_Address() {
		return inv_purchase_invoice_master_Address;
	}

	public String getInv_purchase_invoice_master_status() {
		return inv_purchase_invoice_master_status;
	}

	public Integer getInv_purchase_invoice_master_total_doc_qty() {
		return inv_purchase_invoice_master_total_doc_qty;
	}

	public Double getInv_purchase_invoice_master_total_discount() {
		return inv_purchase_invoice_master_total_discount;
	}

	public String getInv_purchase_invoice_master_local_currency() {
		return inv_purchase_invoice_master_local_currency;
	}

	public Integer getInv_purchase_invoice_master_purchase_Request_No() {
		return inv_purchase_invoice_master_purchase_Request_No;
	}

	public Integer getInv_purchase_invoice_master_grn_no() {
		return inv_purchase_invoice_master_grn_no;
	}

	public Integer getInv_purchase_Invoice_master_Doc_No() {
		return inv_purchase_Invoice_master_Doc_No;
	}

	public String getInv_purchase_invoice_master_form_Name() {
		return inv_purchase_invoice_master_form_Name;
	}

	public Integer getInv_purchase_invoice_master_delete_flag() {
		return inv_purchase_invoice_master_delete_flag;
	}

	public Date getInv_purchase_invoice_master_updated_date() {
		return inv_purchase_invoice_master_updated_date;
	}

	public Date getInv_purchase_invoice_master_create_date() {
		return inv_purchase_invoice_master_create_date;
	}

	public Integer getInv_purchase_invoice_master_goods_return_flag() {
		return inv_purchase_invoice_master_goods_return_flag;
	}

	public Integer getInv_purchase_invoice_master_order_no() {
		return inv_purchase_invoice_master_order_no;
	}

	public String getInv_purchase_invoice_master_delivery_date() {
		return inv_purchase_invoice_master_delivery_date;
	}

	public Double getInv_purchase_invoice_master_special_disc() {
		return inv_purchase_invoice_master_special_disc;
	}

	public Double getInv_purchase_invoice_master_debit_amt() {
		return inv_purchase_invoice_master_debit_amt;
	}

	public Double getInv_purchase_invoice_master_cash_amt_perct() {
		return inv_purchase_invoice_master_cash_amt_perct;
	}

	public Double getInv_purchase_invoice_master_cash_amt_rupees() {
		return inv_purchase_invoice_master_cash_amt_rupees;
	}

	public Double getInv_purchase_invoice_master_octroi_amt() {
		return inv_purchase_invoice_master_octroi_amt;
	}

	public Double getInv_purchase_invoice_master_surcharge_amt() {
		return inv_purchase_invoice_master_surcharge_amt;
	}

	public Double getInv_purchase_invoice_master_credit_amt() {
		return inv_purchase_invoice_master_credit_amt;
	}

	public Double getInv_purchase_invoice_master_freight_amt() {
		return inv_purchase_invoice_master_freight_amt;
	}

	public Double getInv_purchase_invoice_master_calcuated_vat_amt() {
		return inv_purchase_invoice_master_calcuated_vat_amt;
	}

	public Double getInv_purchase_invoice_master_lbt_amt() {
		return inv_purchase_invoice_master_lbt_amt;
	}

	public Double getInv_purchase_invoice_master_cst_amt() {
		return inv_purchase_invoice_master_cst_amt;
	}

	public Double getInv_purchase_invoice_master_ex_vat_amt() {
		return inv_purchase_invoice_master_ex_vat_amt;
	}

	public Double getInv_purchase_invoice_master_calcuated_total_taxes_amt() {
		return inv_purchase_invoice_master_calcuated_total_taxes_amt;
	}

	public Double getInv_purchase_invoice_master_total_base_gross_amt() {
		return inv_purchase_invoice_master_total_base_gross_amt;
	}

	public Double getInv_purchase_invoice_master_total_less_amt() {
		return inv_purchase_invoice_master_total_less_amt;
	}

	public Double getInv_purchase_invoice_master_total_add_amt() {
		return inv_purchase_invoice_master_total_add_amt;
	}

	public Double getInv_purchase_invoice_master_final_calcuated_total_taxes_amt() {
		return inv_purchase_invoice_master_final_calcuated_total_taxes_amt;
	}

	public Double getInv_purchase_invoice_master_final_total_net_amt() {
		return inv_purchase_invoice_master_final_total_net_amt;
	}

	public String getInv_purchase_invoice_master_special_charges() {
		return inv_purchase_invoice_master_special_charges;
	}

	public Double getInv_purchase_invoice_master_sumofspecial_charges() {
		return inv_purchase_invoice_master_sumofspecial_charges;
	}

	public String getInv_purchase_invoice_terms_and_condition_master() {
		return inv_purchase_invoice_terms_and_condition_master;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public Integer getGeneratedBy() {
		return generatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public String getDispatchFlag() {
		return dispatchFlag;
	}

	public List<InventoryNewDto> getListInventoryNewDto() {
		return listInventoryNewDto;
	}

	public void setInv_purchase_invoice_master_doc_no(
			Integer inv_purchase_invoice_master_doc_no) {
		this.inv_purchase_invoice_master_doc_no = inv_purchase_invoice_master_doc_no;
	}

	public void setInv_purchase_invoice_master_doc_date(
			String inv_purchase_invoice_master_doc_date) {
		this.inv_purchase_invoice_master_doc_date = inv_purchase_invoice_master_doc_date;
	}

	public void setInv_purchase_invoice_master_mobile_number(
			String inv_purchase_invoice_master_mobile_number) {
		this.inv_purchase_invoice_master_mobile_number = inv_purchase_invoice_master_mobile_number;
	}

	public void setInv_purchase_invoice_master_Supplier_Name(
			String inv_purchase_invoice_master_Supplier_Name) {
		this.inv_purchase_invoice_master_Supplier_Name = inv_purchase_invoice_master_Supplier_Name;
	}

	public void setInv_purchase_invoice_master_Supplier_Id(
			Integer inv_purchase_invoice_master_Supplier_Id) {
		this.inv_purchase_invoice_master_Supplier_Id = inv_purchase_invoice_master_Supplier_Id;
	}

	public void setInv_purchase_invoice_master_doc_Series(
			String inv_purchase_invoice_master_doc_Series) {
		this.inv_purchase_invoice_master_doc_Series = inv_purchase_invoice_master_doc_Series;
	}

	public void setInv_purchase_invoice_master_reference_no(
			String inv_purchase_invoice_master_reference_no) {
		this.inv_purchase_invoice_master_reference_no = inv_purchase_invoice_master_reference_no;
	}

	public void setInv_purchase_invoice_master_Address(
			String inv_purchase_invoice_master_Address) {
		this.inv_purchase_invoice_master_Address = inv_purchase_invoice_master_Address;
	}

	public void setInv_purchase_invoice_master_status(
			String inv_purchase_invoice_master_status) {
		this.inv_purchase_invoice_master_status = inv_purchase_invoice_master_status;
	}

	public void setInv_purchase_invoice_master_total_doc_qty(
			Integer inv_purchase_invoice_master_total_doc_qty) {
		this.inv_purchase_invoice_master_total_doc_qty = inv_purchase_invoice_master_total_doc_qty;
	}

	public void setInv_purchase_invoice_master_total_discount(
			Double inv_purchase_invoice_master_total_discount) {
		this.inv_purchase_invoice_master_total_discount = inv_purchase_invoice_master_total_discount;
	}

	public void setInv_purchase_invoice_master_local_currency(
			String inv_purchase_invoice_master_local_currency) {
		this.inv_purchase_invoice_master_local_currency = inv_purchase_invoice_master_local_currency;
	}

	public void setInv_purchase_invoice_master_purchase_Request_No(
			Integer inv_purchase_invoice_master_purchase_Request_No) {
		this.inv_purchase_invoice_master_purchase_Request_No = inv_purchase_invoice_master_purchase_Request_No;
	}

	public void setInv_purchase_invoice_master_grn_no(
			Integer inv_purchase_invoice_master_grn_no) {
		this.inv_purchase_invoice_master_grn_no = inv_purchase_invoice_master_grn_no;
	}

	public void setInv_purchase_Invoice_master_Doc_No(
			Integer inv_purchase_Invoice_master_Doc_No) {
		this.inv_purchase_Invoice_master_Doc_No = inv_purchase_Invoice_master_Doc_No;
	}

	public void setInv_purchase_invoice_master_form_Name(
			String inv_purchase_invoice_master_form_Name) {
		this.inv_purchase_invoice_master_form_Name = inv_purchase_invoice_master_form_Name;
	}

	public void setInv_purchase_invoice_master_delete_flag(
			Integer inv_purchase_invoice_master_delete_flag) {
		this.inv_purchase_invoice_master_delete_flag = inv_purchase_invoice_master_delete_flag;
	}

	public void setInv_purchase_invoice_master_updated_date(
			Date inv_purchase_invoice_master_updated_date) {
		this.inv_purchase_invoice_master_updated_date = inv_purchase_invoice_master_updated_date;
	}

	public void setInv_purchase_invoice_master_create_date(
			Date inv_purchase_invoice_master_create_date) {
		this.inv_purchase_invoice_master_create_date = inv_purchase_invoice_master_create_date;
	}

	public void setInv_purchase_invoice_master_goods_return_flag(
			Integer inv_purchase_invoice_master_goods_return_flag) {
		this.inv_purchase_invoice_master_goods_return_flag = inv_purchase_invoice_master_goods_return_flag;
	}

	public void setInv_purchase_invoice_master_order_no(
			Integer inv_purchase_invoice_master_order_no) {
		this.inv_purchase_invoice_master_order_no = inv_purchase_invoice_master_order_no;
	}

	public void setInv_purchase_invoice_master_delivery_date(
			String inv_purchase_invoice_master_delivery_date) {
		this.inv_purchase_invoice_master_delivery_date = inv_purchase_invoice_master_delivery_date;
	}

	public void setInv_purchase_invoice_master_special_disc(
			Double inv_purchase_invoice_master_special_disc) {
		this.inv_purchase_invoice_master_special_disc = inv_purchase_invoice_master_special_disc;
	}

	public void setInv_purchase_invoice_master_debit_amt(
			Double inv_purchase_invoice_master_debit_amt) {
		this.inv_purchase_invoice_master_debit_amt = inv_purchase_invoice_master_debit_amt;
	}

	public void setInv_purchase_invoice_master_cash_amt_perct(
			Double inv_purchase_invoice_master_cash_amt_perct) {
		this.inv_purchase_invoice_master_cash_amt_perct = inv_purchase_invoice_master_cash_amt_perct;
	}

	public void setInv_purchase_invoice_master_cash_amt_rupees(
			Double inv_purchase_invoice_master_cash_amt_rupees) {
		this.inv_purchase_invoice_master_cash_amt_rupees = inv_purchase_invoice_master_cash_amt_rupees;
	}

	public void setInv_purchase_invoice_master_octroi_amt(
			Double inv_purchase_invoice_master_octroi_amt) {
		this.inv_purchase_invoice_master_octroi_amt = inv_purchase_invoice_master_octroi_amt;
	}

	public void setInv_purchase_invoice_master_surcharge_amt(
			Double inv_purchase_invoice_master_surcharge_amt) {
		this.inv_purchase_invoice_master_surcharge_amt = inv_purchase_invoice_master_surcharge_amt;
	}

	public void setInv_purchase_invoice_master_credit_amt(
			Double inv_purchase_invoice_master_credit_amt) {
		this.inv_purchase_invoice_master_credit_amt = inv_purchase_invoice_master_credit_amt;
	}

	public void setInv_purchase_invoice_master_freight_amt(
			Double inv_purchase_invoice_master_freight_amt) {
		this.inv_purchase_invoice_master_freight_amt = inv_purchase_invoice_master_freight_amt;
	}

	public void setInv_purchase_invoice_master_calcuated_vat_amt(
			Double inv_purchase_invoice_master_calcuated_vat_amt) {
		this.inv_purchase_invoice_master_calcuated_vat_amt = inv_purchase_invoice_master_calcuated_vat_amt;
	}

	public void setInv_purchase_invoice_master_lbt_amt(
			Double inv_purchase_invoice_master_lbt_amt) {
		this.inv_purchase_invoice_master_lbt_amt = inv_purchase_invoice_master_lbt_amt;
	}

	public void setInv_purchase_invoice_master_cst_amt(
			Double inv_purchase_invoice_master_cst_amt) {
		this.inv_purchase_invoice_master_cst_amt = inv_purchase_invoice_master_cst_amt;
	}

	public void setInv_purchase_invoice_master_ex_vat_amt(
			Double inv_purchase_invoice_master_ex_vat_amt) {
		this.inv_purchase_invoice_master_ex_vat_amt = inv_purchase_invoice_master_ex_vat_amt;
	}

	public void setInv_purchase_invoice_master_calcuated_total_taxes_amt(
			Double inv_purchase_invoice_master_calcuated_total_taxes_amt) {
		this.inv_purchase_invoice_master_calcuated_total_taxes_amt = inv_purchase_invoice_master_calcuated_total_taxes_amt;
	}

	public void setInv_purchase_invoice_master_total_base_gross_amt(
			Double inv_purchase_invoice_master_total_base_gross_amt) {
		this.inv_purchase_invoice_master_total_base_gross_amt = inv_purchase_invoice_master_total_base_gross_amt;
	}

	public void setInv_purchase_invoice_master_total_less_amt(
			Double inv_purchase_invoice_master_total_less_amt) {
		this.inv_purchase_invoice_master_total_less_amt = inv_purchase_invoice_master_total_less_amt;
	}

	public void setInv_purchase_invoice_master_total_add_amt(
			Double inv_purchase_invoice_master_total_add_amt) {
		this.inv_purchase_invoice_master_total_add_amt = inv_purchase_invoice_master_total_add_amt;
	}

	public void setInv_purchase_invoice_master_final_calcuated_total_taxes_amt(
			Double inv_purchase_invoice_master_final_calcuated_total_taxes_amt) {
		this.inv_purchase_invoice_master_final_calcuated_total_taxes_amt = inv_purchase_invoice_master_final_calcuated_total_taxes_amt;
	}

	public void setInv_purchase_invoice_master_final_total_net_amt(
			Double inv_purchase_invoice_master_final_total_net_amt) {
		this.inv_purchase_invoice_master_final_total_net_amt = inv_purchase_invoice_master_final_total_net_amt;
	}

	public void setInv_purchase_invoice_master_special_charges(
			String inv_purchase_invoice_master_special_charges) {
		this.inv_purchase_invoice_master_special_charges = inv_purchase_invoice_master_special_charges;
	}

	public void setInv_purchase_invoice_master_sumofspecial_charges(
			Double inv_purchase_invoice_master_sumofspecial_charges) {
		this.inv_purchase_invoice_master_sumofspecial_charges = inv_purchase_invoice_master_sumofspecial_charges;
	}

	public void setInv_purchase_invoice_terms_and_condition_master(
			String inv_purchase_invoice_terms_and_condition_master) {
		this.inv_purchase_invoice_terms_and_condition_master = inv_purchase_invoice_terms_and_condition_master;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public void setGeneratedBy(Integer generatedBy) {
		this.generatedBy = generatedBy;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public void setDispatchFlag(String dispatchFlag) {
		this.dispatchFlag = dispatchFlag;
	}

	public void setListInventoryNewDto(List<InventoryNewDto> listInventoryNewDto) {
		this.listInventoryNewDto = listInventoryNewDto;
	}
	
	
	
	
	
	

}
