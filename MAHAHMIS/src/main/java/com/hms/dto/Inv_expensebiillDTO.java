package com.hms.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
@Entity
@Table(name = "inv_expenses_bill")
public class Inv_expensebiillDTO {
	@Id
	@GeneratedValue
	@Column(name = "inv_exp_no")	
	private Integer inv_exp_no;
	@Column(name = "inv_exp_date",columnDefinition="varchar(255) default '-'")	
	private String inv_exp_date;
	@Column(name = "inv_exp_mobile_number",columnDefinition="varchar(255) default '-'")	
	private String inv_exp_mobile_number;
	@Column(name = "inv_exp_supplier_name",columnDefinition="varchar(255) default '-'")	
	private String inv_exp_supplier_name;
	/*jitendra*/
	@Column(name = "inv_exp_remark",columnDefinition="varchar(255) default '-'")	
	private String inv_exp_remark;
	@Column(name = "inv_exp_supplier_id",columnDefinition="int default 0")	
	private Integer inv_exp_Supplier_Id=0;
	@Column(name = "inv_exp_reference_no",columnDefinition="varchar(255) default '-'")	
	private String inv_exp_reference_no;
	@Column(name = "inv_exp_address",columnDefinition="varchar(255) default '-'")	
	private String inv_exp_address;
	@Column(name = "inv_exp_status",columnDefinition="varchar(255) default '-'")	
	private String inv_exp_status;
	@Column(name = "inv_exp_total_doc_qty",columnDefinition="int default 0")	
	private Integer inv_exp_total_doc_qty;
	@Column(name = "inv_exp_total_discount")	
	private Double inv_exp_total_discount=0.0;
	@Column(name = "inv_exp_delivery_date",columnDefinition="varchar(255) default '-'")	
    private String inv_exp_Delivery_Date;
	@Column(name = "inv_exp_delete_flag",columnDefinition="int default 0")	
	private Integer inv_exp_delete_flag;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_exp_updated_date")
	
	private Date inv_exp_updated_date;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_exp_create_date")
	private Date inv_exp_create_date;
	
	//newly added charges 6/6/2016
	@Column(name = "inv_exp_special_disc")	

		private Double inv_exp_special_disc=0.0; 
	@Column(name = "inv_exp_debit_amt")	

	private Double inv_exp_debit_amt=0.0 ; 
	@Column(name = "inv_exp_cash_amt_perct")	

	private Double inv_exp_cash_amt_perct=0.0; 
	@Column(name = "inv_exp_cash_amt_rupees")	
	
	private Double inv_exp_cash_amt_rupees=0.0; 
	@Column(name = "inv_exp_octroi_amt")	

	private Double inv_exp_octroi_amt=0.0;
	@Column(name = "inv_exp_surcharge_amt")	
	
	private Double inv_exp_surcharge_amt=0.0;
	@Column(name = "inv_exp_credit_amt")	
	
	private Double inv_exp_credit_amt=0.0;
	@Column(name = "inv_exp_freight_amt")	
	
	private Double inv_exp_freight_amt=0.0; 
	@Column(name = "inv_exp_calcuated_vat_amt")	
	
	private Double inv_exp_calcuated_vat_amt=0.0; 
	@Column(name = "inv_exp_lbt_amt")	
	
	private Double inv_exp_lbt_amt=0.0; 
	@Column(name = "inv_exp_cst_amt")	

	private Double inv_exp_cst_amt=0.0; 
	@Column(name = "inv_exp_ex_vat_amt")	
	
	private Double inv_exp_ex_vat_amt=0.0; 
	@Column(name = "inv_exp_calcuated_total_taxes_amt")	
	
	private Double inv_exp_calcuated_total_taxes_amt=0.0; 
	@Column(name = "inv_exp_total_base_gross_amt",columnDefinition="int default 0.0")	
	
	private Double inv_exp_total_base_gross_amt=0.0; 
	@Column(name = "inv_exp_total_less_amt")	
	
	private Double inv_exp_total_less_amt=0.0; 
	@Column(name = "inv_exp_total_add_amt")	
	
	private Double inv_exp_total_add_amt=0.0	; 
	@Column(name = "inv_exp_final_calcuated_total_taxes_amt")	

	private Double inv_exp_final_calcuated_total_taxes_amt=0.0; 
	@Column(name = "inv_exp_final_total_net_amt")	
	
	private Double inv_exp_final_total_net_amt=0.0 ;
	@Column(name = "inv_exp_special_charges",columnDefinition="varchar(255) default '-'")	
	
    private String inv_exp_special_charges;
	@Column(name = "inv_exp_sumofspecial_charges")	
	
     private Double inv_exp_sumofspecial_charges=0.0;
	
	/*	private String subinvId;
		private String subinvName;
		*/
	@Column(name = "inv_supplierState",columnDefinition="int default 0")	

	private Integer inv_supplierState; //add by paras
	@Column(name = "inv_exp_item_code",columnDefinition="int default 0")	
	private Integer inv_exp_item_code;
	@Column(name = "inv_exp_item_Name",columnDefinition="varchar(255) default '-'")
	private String inv_exp_item_Name ;
	@Column(name = "inv_exp_unit_charges")	
	
    private Double inv_exp_unit_charges=0.0;
	@Column(name = "inv_exp_challan",columnDefinition="varchar(255) default '-'")	
	private String inv_exp_challan ;
	
	@Transient	
    private List<Inv_expensebiillDTO> ltinvetoryEXPmaster;
	@OneToMany(fetch = FetchType.LAZY ,cascade = {CascadeType.ALL})
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "inv_expenses_item_slave__master_id", referencedColumnName = "inv_exp_no")
	private List<Inv_expenses_billSlave> ltInv_expenses_billSlave;
	
	//private List<Inv_expensebiillDTO> ltinvetorypurchaseOrderitemmaster;

	public Double getInv_exp_unit_charges() {
		return inv_exp_unit_charges;
	}

	public void setInv_exp_unit_charges(Double inv_exp_unit_charges) {
		this.inv_exp_unit_charges = inv_exp_unit_charges;
	}

	public List<Inv_expenses_billSlave> getLtInv_expenses_billSlave() {
		return ltInv_expenses_billSlave;
	}

	public void setLtInv_expenses_billSlave(
			List<Inv_expenses_billSlave> ltInv_expenses_billSlave) {
		this.ltInv_expenses_billSlave = ltInv_expenses_billSlave;
	}

	public Integer getInv_exp_no() {
		return inv_exp_no;
	}

	public void setInv_exp_no(Integer inv_exp_no) {
		this.inv_exp_no = inv_exp_no;
	}

	public String getInv_exp_date() {
		return inv_exp_date;
	}

	public void setInv_exp_date(String inv_exp_date) {
		this.inv_exp_date = inv_exp_date;
	}

	public String getInv_exp_mobile_number() {
		return inv_exp_mobile_number;
	}

	public void setInv_exp_mobile_number(String inv_exp_mobile_number) {
		this.inv_exp_mobile_number = inv_exp_mobile_number;
	}

	public String getInv_exp_supplier_name() {
		return inv_exp_supplier_name;
	}

	public void setInv_exp_supplier_name(String inv_exp_supplier_name) {
		this.inv_exp_supplier_name = inv_exp_supplier_name;
	}
	
	/*jitendra*/
	public String getInv_exp_remark() {
		return inv_exp_remark;
	}

	public void setInv_exp_remark(String inv_exp_remark) {
		this.inv_exp_remark = inv_exp_remark;
	}

	public Integer getInv_exp_Supplier_Id() {
		return inv_exp_Supplier_Id;
	}

	public void setInv_exp_Supplier_Id(Integer inv_exp_Supplier_Id) {
		this.inv_exp_Supplier_Id = inv_exp_Supplier_Id;
	}

	public String getInv_exp_reference_no() {
		return inv_exp_reference_no;
	}

	public void setInv_exp_reference_no(String inv_exp_reference_no) {
		this.inv_exp_reference_no = inv_exp_reference_no;
	}

	public String getInv_exp_address() {
		return inv_exp_address;
	}

	public void setInv_exp_address(String inv_exp_address) {
		this.inv_exp_address = inv_exp_address;
	}

	public String getInv_exp_status() {
		return inv_exp_status;
	}

	public void setInv_exp_status(String inv_exp_status) {
		this.inv_exp_status = inv_exp_status;
	}

	public Integer getInv_exp_total_doc_qty() {
		return inv_exp_total_doc_qty;
	}

	public void setInv_exp_total_doc_qty(Integer inv_exp_total_doc_qty) {
		this.inv_exp_total_doc_qty = inv_exp_total_doc_qty;
	}

	public Double getInv_exp_total_discount() {
		return inv_exp_total_discount;
	}

	public void setInv_exp_total_discount(Double inv_exp_total_discount) {
		this.inv_exp_total_discount = inv_exp_total_discount;
	}

	public String getInv_exp_Delivery_Date() {
		return inv_exp_Delivery_Date;
	}

	public void setInv_exp_Delivery_Date(String inv_exp_Delivery_Date) {
		this.inv_exp_Delivery_Date = inv_exp_Delivery_Date;
	}

	public Integer getInv_exp_delete_flag() {
		return inv_exp_delete_flag;
	}

	public void setInv_exp_delete_flag(Integer inv_exp_delete_flag) {
		this.inv_exp_delete_flag = inv_exp_delete_flag;
	}

	public Date getInv_exp_updated_date() {
		return inv_exp_updated_date;
	}

	public void setInv_exp_updated_date(Date inv_exp_updated_date) {
		this.inv_exp_updated_date = inv_exp_updated_date;
	}

	public Date getInv_exp_create_date() {
		return inv_exp_create_date;
	}

	public void setInv_exp_create_date(Date inv_exp_create_date) {
		this.inv_exp_create_date = inv_exp_create_date;
	}

	public Double getInv_exp_special_disc() {
		return inv_exp_special_disc;
	}

	public void setInv_exp_special_disc(Double inv_exp_special_disc) {
		this.inv_exp_special_disc = inv_exp_special_disc;
	}

	public Double getInv_exp_debit_amt() {
		return inv_exp_debit_amt;
	}

	public void setInv_exp_debit_amt(Double inv_exp_debit_amt) {
		this.inv_exp_debit_amt = inv_exp_debit_amt;
	}

	public Double getInv_exp_cash_amt_perct() {
		return inv_exp_cash_amt_perct;
	}

	public void setInv_exp_cash_amt_perct(Double inv_exp_cash_amt_perct) {
		this.inv_exp_cash_amt_perct = inv_exp_cash_amt_perct;
	}

	public Double getInv_exp_cash_amt_rupees() {
		return inv_exp_cash_amt_rupees;
	}

	public void setInv_exp_cash_amt_rupees(Double inv_exp_cash_amt_rupees) {
		this.inv_exp_cash_amt_rupees = inv_exp_cash_amt_rupees;
	}

	public Double getInv_exp_octroi_amt() {
		return inv_exp_octroi_amt;
	}

	public void setInv_exp_octroi_amt(Double inv_exp_octroi_amt) {
		this.inv_exp_octroi_amt = inv_exp_octroi_amt;
	}

	public Double getInv_exp_surcharge_amt() {
		return inv_exp_surcharge_amt;
	}

	public void setInv_exp_surcharge_amt(Double inv_exp_surcharge_amt) {
		this.inv_exp_surcharge_amt = inv_exp_surcharge_amt;
	}

	public Double getInv_exp_credit_amt() {
		return inv_exp_credit_amt;
	}

	public void setInv_exp_credit_amt(Double inv_exp_credit_amt) {
		this.inv_exp_credit_amt = inv_exp_credit_amt;
	}

	public Double getInv_exp_freight_amt() {
		return inv_exp_freight_amt;
	}

	public void setInv_exp_freight_amt(Double inv_exp_freight_amt) {
		this.inv_exp_freight_amt = inv_exp_freight_amt;
	}

	public Double getInv_exp_calcuated_vat_amt() {
		return inv_exp_calcuated_vat_amt;
	}

	public void setInv_exp_calcuated_vat_amt(Double inv_exp_calcuated_vat_amt) {
		this.inv_exp_calcuated_vat_amt = inv_exp_calcuated_vat_amt;
	}

	public Double getInv_exp_lbt_amt() {
		return inv_exp_lbt_amt;
	}

	public void setInv_exp_lbt_amt(Double inv_exp_lbt_amt) {
		this.inv_exp_lbt_amt = inv_exp_lbt_amt;
	}

	public Double getInv_exp_cst_amt() {
		return inv_exp_cst_amt;
	}

	public void setInv_exp_cst_amt(Double inv_exp_cst_amt) {
		this.inv_exp_cst_amt = inv_exp_cst_amt;
	}

	public Double getInv_exp_ex_vat_amt() {
		return inv_exp_ex_vat_amt;
	}

	public void setInv_exp_ex_vat_amt(Double inv_exp_ex_vat_amt) {
		this.inv_exp_ex_vat_amt = inv_exp_ex_vat_amt;
	}

	public Double getInv_exp_calcuated_total_taxes_amt() {
		return inv_exp_calcuated_total_taxes_amt;
	}

	public void setInv_exp_calcuated_total_taxes_amt(
			Double inv_exp_calcuated_total_taxes_amt) {
		this.inv_exp_calcuated_total_taxes_amt = inv_exp_calcuated_total_taxes_amt;
	}

	public Double getInv_exp_total_base_gross_amt() {
		return inv_exp_total_base_gross_amt;
	}

	public void setInv_exp_total_base_gross_amt(Double inv_exp_total_base_gross_amt) {
		this.inv_exp_total_base_gross_amt = inv_exp_total_base_gross_amt;
	}

	public Double getInv_exp_total_less_amt() {
		return inv_exp_total_less_amt;
	}

	public void setInv_exp_total_less_amt(Double inv_exp_total_less_amt) {
		this.inv_exp_total_less_amt = inv_exp_total_less_amt;
	}

	public Double getInv_exp_total_add_amt() {
		return inv_exp_total_add_amt;
	}

	public void setInv_exp_total_add_amt(Double inv_exp_total_add_amt) {
		this.inv_exp_total_add_amt = inv_exp_total_add_amt;
	}

	public Double getInv_exp_final_calcuated_total_taxes_amt() {
		return inv_exp_final_calcuated_total_taxes_amt;
	}

	public void setInv_exp_final_calcuated_total_taxes_amt(
			Double inv_exp_final_calcuated_total_taxes_amt) {
		this.inv_exp_final_calcuated_total_taxes_amt = inv_exp_final_calcuated_total_taxes_amt;
	}

	public Double getInv_exp_final_total_net_amt() {
		return inv_exp_final_total_net_amt;
	}

	public void setInv_exp_final_total_net_amt(Double inv_exp_final_total_net_amt) {
		this.inv_exp_final_total_net_amt = inv_exp_final_total_net_amt;
	}

	public String getInv_exp_special_charges() {
		return inv_exp_special_charges;
	}

	public void setInv_exp_special_charges(String inv_exp_special_charges) {
		this.inv_exp_special_charges = inv_exp_special_charges;
	}

	public Double getInv_exp_sumofspecial_charges() {
		return inv_exp_sumofspecial_charges;
	}

	public void setInv_exp_sumofspecial_charges(Double inv_exp_sumofspecial_charges) {
		this.inv_exp_sumofspecial_charges = inv_exp_sumofspecial_charges;
	}

	public Integer getInv_supplierState() {
		return inv_supplierState;
	}

	public void setInv_supplierState(Integer inv_supplierState) {
		this.inv_supplierState = inv_supplierState;
	}

	public List<Inv_expensebiillDTO> getLtinvetoryEXPmaster() {
		return ltinvetoryEXPmaster;
	}

	public void setLtinvetoryEXPmaster(List<Inv_expensebiillDTO> ltinvetoryEXPmaster) {
		this.ltinvetoryEXPmaster = ltinvetoryEXPmaster;
	}

	public Integer getInv_exp_item_code() {
		return inv_exp_item_code;
	}

	public void setInv_exp_item_code(Integer inv_exp_item_code) {
		this.inv_exp_item_code = inv_exp_item_code;
	}

	public String getInv_exp_item_Name() {
		return inv_exp_item_Name;
	}

	public void setInv_exp_item_Name(String inv_exp_item_Name) {
		this.inv_exp_item_Name = inv_exp_item_Name;
	}

	public String getInv_exp_challan() {
		return inv_exp_challan;
	}

	public void setInv_exp_challan(String inv_exp_challan) {
		this.inv_exp_challan = inv_exp_challan;
	}
	
	
	
}
