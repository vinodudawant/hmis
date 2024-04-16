package com.hms.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.hms.ehat.dto.pharmaConsumtionDTO;

@Entity
@Table(name = "inv_expenses_bill_slave")
public class Inv_expenses_billSlave {	
	@Id
	@GeneratedValue
	@Column(name = "inv_expenses_item_slave_id")
	private Integer inv_expenses_item_slave_id;
	@ManyToOne
	@JoinColumn(name = "inv_expenses_item_slave__master_id")
	private Inv_expensebiillDTO inv_exp_no;
	@Column(name = "inv_expenses_item_code",columnDefinition="int default 0")	
    private Integer inv_expenses_item_code;
	@Column(name = "inv_expenses_item_name",columnDefinition="varchar(255) default '-'")	
    private String inv_expenses_item_Name ;
	@Column(name = "inv_expenses_item_doc_qty",columnDefinition="int default 0")	
    private Integer inv_expenses_item_doc_Qty;
	@Column(name = "inv_expenses_item_unit_price")	
    private Double inv_expenses_item_unit_price=0.0;
	
	@Column(name = "inv_expenses_item_discount_per")	
	private Double inv_expenses_item_discount_per=0.0;
	@Column(name = "inv_expenses_item_discount_rupess")	
	private Double inv_expenses_item_discount_rupess=0.0;
	@Column(name = "inv_expenses_item_discount_amount")	
	private Double inv_expenses_item_discount_amount=0.0;
	@Column(name = "inv_expenses_item_base_amount")	
	private Double inv_expenses_item_base_amount=0.0;
	
	@Column(name = "inv_expenses_item_tax_amount")	
     private Double inv_expenses_item_tax_amount=0.0;
	@Column(name = "inv_expenses_item_tax_code",columnDefinition="varchar(255) default '-'")	
     private String inv_expenses_item_tax_code;
	@Column(name = "inv_expenses_item_row_amount")	
     private Double inv_expenses_item_row_amount=0.0;
	@Column(name = "inv_expenses_item_actural_qty")	
    private Double inv_expenses_item_actural_qty=0.0;
	@Column(name = "inv_expenses_item_pending_qty")	
    private Double inv_expenses_item_pending_qty=0.0;
	@Column(name = "inv_expenses_item_row_status",columnDefinition="varchar(255) default '-'")	
    private String inv_expenses_item_row_status;
	@Column(name = "inv_expenses_item_batch_no",columnDefinition="varchar(255) default '-'")	

	private String inv_expenses_item_batch_No;
	@Column(name = "inv_expenses_item_base_doc_no",columnDefinition="int default 0")	
    private Integer inv_expenses_item_base_doc_No;
	@Column(name = "inv_expenses_item_doc_number",columnDefinition="int default 0")	
	private Integer inv_expenses_item_doc_number;
	@Column(name = "inv_expenses_item_delete_flag",columnDefinition="int default 0")	

	private Integer inv_expenses_item_delete_flag;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_expenses_item_update_date")
	private Date inv_expenses_item_update_date;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_expenses_item_create_date",updatable=false)
	private Date inv_expenses_item_create_date;
	@Column(name = "inv_expenses_item_doc_number_fk",columnDefinition="int default 0")	

	private Integer inv_expenses_item_doc_number_fk;
	@Column(name = "inv_expenses_item_doc_series",columnDefinition="varchar(255) default '-'")	

	private String inv_expenses_item_doc_series;
	@Column(name = "inv_expenses_master_doc_no_fk",columnDefinition="int default 0")	

	private Integer inv_expenses_master_doc_no_fk ; 
	@Column(name = "inv_expenses_master_supplier_name",columnDefinition="varchar(255) default '-'")	

	private String inv_expenses_master_Supplier_Name;
	@Column(name = "inv_expenses_master_supplier_id",columnDefinition="varchar(255) default '-'")	

	private String inv_expenses_master_Supplier_Id;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_opening_stock_item_mfg_date")
	private Date inv_opening_stock_item_mfg_date;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_opening_stock_item_exp_date")
	private Date inv_opening_stock_item_exp_date;
	@Column(name = "inv_expenses_item_tax_amount_rupess")	
	private Double inv_expenses_item_tax_amount_rupess=0.0; // Add Tax amount in Rupess @Author:paras suryawanshi @Date:22Nov2016
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_batch_stock_item_mfg_date")
	private Date inv_batch_stock_item_mfg_date;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_batch_stock_item_exp_date")
	private Date inv_batch_stock_item_exp_date;
	@Column(name = "inv_batch_item_name",columnDefinition="varchar(255) default '-'")	

	private String inv_batch_item_name;
	@Transient
	private List<Inv_expenses_billSlave> ltinvetorypurchaseorderitemmaster;
	public Integer getInv_expenses_item_slave_id() {
		return inv_expenses_item_slave_id;
	}
	public void setInv_expenses_item_slave_id(Integer inv_expenses_item_slave_id) {
		this.inv_expenses_item_slave_id = inv_expenses_item_slave_id;
	}
	public Integer getInv_expenses_item_code() {
		return inv_expenses_item_code;
	}
	public void setInv_expenses_item_code(Integer inv_expenses_item_code) {
		this.inv_expenses_item_code = inv_expenses_item_code;
	}
	public String getInv_expenses_item_Name() {
		return inv_expenses_item_Name;
	}
	public void setInv_expenses_item_Name(String inv_expenses_item_Name) {
		this.inv_expenses_item_Name = inv_expenses_item_Name;
	}
	public Integer getInv_expenses_item_doc_Qty() {
		return inv_expenses_item_doc_Qty;
	}
	public void setInv_expenses_item_doc_Qty(Integer inv_expenses_item_doc_Qty) {
		this.inv_expenses_item_doc_Qty = inv_expenses_item_doc_Qty;
	}
	public Double getInv_expenses_item_unit_price() {
		return inv_expenses_item_unit_price;
	}
	public void setInv_expenses_item_unit_price(Double inv_expenses_item_unit_price) {
		this.inv_expenses_item_unit_price = inv_expenses_item_unit_price;
	}
	public Double getInv_expenses_item_discount_per() {
		return inv_expenses_item_discount_per;
	}
	public void setInv_expenses_item_discount_per(
			Double inv_expenses_item_discount_per) {
		this.inv_expenses_item_discount_per = inv_expenses_item_discount_per;
	}
	public Double getInv_expenses_item_discount_rupess() {
		return inv_expenses_item_discount_rupess;
	}
	public void setInv_expenses_item_discount_rupess(
			Double inv_expenses_item_discount_rupess) {
		this.inv_expenses_item_discount_rupess = inv_expenses_item_discount_rupess;
	}
	public Double getInv_expenses_item_discount_amount() {
		return inv_expenses_item_discount_amount;
	}
	public void setInv_expenses_item_discount_amount(
			Double inv_expenses_item_discount_amount) {
		this.inv_expenses_item_discount_amount = inv_expenses_item_discount_amount;
	}
	public Double getInv_expenses_item_base_amount() {
		return inv_expenses_item_base_amount;
	}
	public void setInv_expenses_item_base_amount(
			Double inv_expenses_item_base_amount) {
		this.inv_expenses_item_base_amount = inv_expenses_item_base_amount;
	}
	public Double getInv_expenses_item_tax_amount() {
		return inv_expenses_item_tax_amount;
	}
	public void setInv_expenses_item_tax_amount(Double inv_expenses_item_tax_amount) {
		this.inv_expenses_item_tax_amount = inv_expenses_item_tax_amount;
	}
	public String getInv_expenses_item_tax_code() {
		return inv_expenses_item_tax_code;
	}
	public void setInv_expenses_item_tax_code(String inv_expenses_item_tax_code) {
		this.inv_expenses_item_tax_code = inv_expenses_item_tax_code;
	}
	public Double getInv_expenses_item_row_amount() {
		return inv_expenses_item_row_amount;
	}
	public void setInv_expenses_item_row_amount(Double inv_expenses_item_row_amount) {
		this.inv_expenses_item_row_amount = inv_expenses_item_row_amount;
	}
	public Double getInv_expenses_item_actural_qty() {
		return inv_expenses_item_actural_qty;
	}
	public void setInv_expenses_item_actural_qty(
			Double inv_expenses_item_actural_qty) {
		this.inv_expenses_item_actural_qty = inv_expenses_item_actural_qty;
	}
	public Double getInv_expenses_item_pending_qty() {
		return inv_expenses_item_pending_qty;
	}
	public void setInv_expenses_item_pending_qty(
			Double inv_expenses_item_pending_qty) {
		this.inv_expenses_item_pending_qty = inv_expenses_item_pending_qty;
	}
	public String getInv_expenses_item_row_status() {
		return inv_expenses_item_row_status;
	}
	public void setInv_expenses_item_row_status(String inv_expenses_item_row_status) {
		this.inv_expenses_item_row_status = inv_expenses_item_row_status;
	}
	public String getInv_expenses_item_batch_No() {
		return inv_expenses_item_batch_No;
	}
	public void setInv_expenses_item_batch_No(String inv_expenses_item_batch_No) {
		this.inv_expenses_item_batch_No = inv_expenses_item_batch_No;
	}
	public Integer getInv_expenses_item_base_doc_No() {
		return inv_expenses_item_base_doc_No;
	}
	public void setInv_expenses_item_base_doc_No(
			Integer inv_expenses_item_base_doc_No) {
		this.inv_expenses_item_base_doc_No = inv_expenses_item_base_doc_No;
	}
	public Integer getInv_expenses_item_doc_number() {
		return inv_expenses_item_doc_number;
	}
	public void setInv_expenses_item_doc_number(Integer inv_expenses_item_doc_number) {
		this.inv_expenses_item_doc_number = inv_expenses_item_doc_number;
	}
	public Integer getInv_expenses_item_delete_flag() {
		return inv_expenses_item_delete_flag;
	}
	public void setInv_expenses_item_delete_flag(
			Integer inv_expenses_item_delete_flag) {
		this.inv_expenses_item_delete_flag = inv_expenses_item_delete_flag;
	}
	public Date getInv_expenses_item_update_date() {
		return inv_expenses_item_update_date;
	}
	public void setInv_expenses_item_update_date(Date inv_expenses_item_update_date) {
		this.inv_expenses_item_update_date = inv_expenses_item_update_date;
	}
	public Date getInv_expenses_item_create_date() {
		return inv_expenses_item_create_date;
	}
	public void setInv_expenses_item_create_date(Date inv_expenses_item_create_date) {
		this.inv_expenses_item_create_date = inv_expenses_item_create_date;
	}
	public Integer getInv_expenses_item_doc_number_fk() {
		return inv_expenses_item_doc_number_fk;
	}
	public void setInv_expenses_item_doc_number_fk(
			Integer inv_expenses_item_doc_number_fk) {
		this.inv_expenses_item_doc_number_fk = inv_expenses_item_doc_number_fk;
	}
	public String getInv_expenses_item_doc_series() {
		return inv_expenses_item_doc_series;
	}
	public void setInv_expenses_item_doc_series(String inv_expenses_item_doc_series) {
		this.inv_expenses_item_doc_series = inv_expenses_item_doc_series;
	}
	public Integer getInv_expenses_master_doc_no_fk() {
		return inv_expenses_master_doc_no_fk;
	}
	public void setInv_expenses_master_doc_no_fk(
			Integer inv_expenses_master_doc_no_fk) {
		this.inv_expenses_master_doc_no_fk = inv_expenses_master_doc_no_fk;
	}
	public String getInv_expenses_master_Supplier_Name() {
		return inv_expenses_master_Supplier_Name;
	}
	public void setInv_expenses_master_Supplier_Name(
			String inv_expenses_master_Supplier_Name) {
		this.inv_expenses_master_Supplier_Name = inv_expenses_master_Supplier_Name;
	}
	public String getInv_expenses_master_Supplier_Id() {
		return inv_expenses_master_Supplier_Id;
	}
	public void setInv_expenses_master_Supplier_Id(
			String inv_expenses_master_Supplier_Id) {
		this.inv_expenses_master_Supplier_Id = inv_expenses_master_Supplier_Id;
	}
	public Date getInv_opening_stock_item_mfg_date() {
		return inv_opening_stock_item_mfg_date;
	}
	public void setInv_opening_stock_item_mfg_date(
			Date inv_opening_stock_item_mfg_date) {
		this.inv_opening_stock_item_mfg_date = inv_opening_stock_item_mfg_date;
	}
	public Date getInv_opening_stock_item_exp_date() {
		return inv_opening_stock_item_exp_date;
	}
	public void setInv_opening_stock_item_exp_date(
			Date inv_opening_stock_item_exp_date) {
		this.inv_opening_stock_item_exp_date = inv_opening_stock_item_exp_date;
	}
	public Double getInv_expenses_item_tax_amount_rupess() {
		return inv_expenses_item_tax_amount_rupess;
	}
	public void setInv_expenses_item_tax_amount_rupess(
			Double inv_expenses_item_tax_amount_rupess) {
		this.inv_expenses_item_tax_amount_rupess = inv_expenses_item_tax_amount_rupess;
	}
	public Date getInv_batch_stock_item_mfg_date() {
		return inv_batch_stock_item_mfg_date;
	}
	public void setInv_batch_stock_item_mfg_date(Date inv_batch_stock_item_mfg_date) {
		this.inv_batch_stock_item_mfg_date = inv_batch_stock_item_mfg_date;
	}
	public Date getInv_batch_stock_item_exp_date() {
		return inv_batch_stock_item_exp_date;
	}
	public void setInv_batch_stock_item_exp_date(Date inv_batch_stock_item_exp_date) {
		this.inv_batch_stock_item_exp_date = inv_batch_stock_item_exp_date;
	}
	public String getInv_batch_item_name() {
		return inv_batch_item_name;
	}
	public void setInv_batch_item_name(String inv_batch_item_name) {
		this.inv_batch_item_name = inv_batch_item_name;
	}
	public List<Inv_expenses_billSlave> getLtinvetorypurchaseorderitemmaster() {
		return ltinvetorypurchaseorderitemmaster;
	}
	public void setLtinvetorypurchaseorderitemmaster(
			List<Inv_expenses_billSlave> ltinvetorypurchaseorderitemmaster) {
		this.ltinvetorypurchaseorderitemmaster = ltinvetorypurchaseorderitemmaster;
	}
	@JsonIgnore
	public Inv_expensebiillDTO getInv_exp_no() {
		return inv_exp_no;
	}
	public void setInv_exp_no(Inv_expensebiillDTO inv_exp_no) {
		this.inv_exp_no = inv_exp_no;
	}
	
	
	

	
	
	
}
