package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryPurInvoicePaymentDTO {
	
private Integer inv_mode_of_payment_id;
private Integer inv_purchase_invoice_master_doc_no;
private Integer inv_purchase_invoice_master_Supplier_Id;
private  String inv_purchase_invoice_master_Supplier_Name;
private String  payMode;
private Float Credit_amt;
private Float cash_amt;
private String card_no;
private String status;
private String duration;
private String bankName;
private String updated_date;
private String create_date;
private String comment;
private List<InventoryPurInvoicePaymentDTO>liPurInvoicePaymentDTOs;

@JsonGetter("inv_mode_of_payment_id")
public Integer getInv_mode_of_payment_id()
{
	return inv_mode_of_payment_id;
}

@JsonSetter("inv_mode_of_payment_id")
public void setInv_mode_of_payment_id(Integer inv_mode_of_payment_id) {
	this.inv_mode_of_payment_id = inv_mode_of_payment_id;
}

@JsonGetter("inv_purchase_invoice_master_doc_no")
public Integer getInv_purchase_invoice_master_doc_no() {
	return inv_purchase_invoice_master_doc_no;
}
@JsonSetter("inv_purchase_invoice_master_doc_no")
public void setInv_purchase_invoice_master_doc_no(
		Integer inv_purchase_invoice_master_doc_no) {
	this.inv_purchase_invoice_master_doc_no = inv_purchase_invoice_master_doc_no;
}
@JsonGetter("inv_purchase_invoice_master_Supplier_Id")
public Integer getInv_purchase_invoice_master_Supplier_Id() {
	return inv_purchase_invoice_master_Supplier_Id;
}
@JsonSetter("inv_purchase_invoice_master_Supplier_Id")
public void setInv_purchase_invoice_master_Supplier_Id(
		Integer inv_purchase_invoice_master_Supplier_Id) {
	this.inv_purchase_invoice_master_Supplier_Id = inv_purchase_invoice_master_Supplier_Id;
}
@JsonGetter("inv_purchase_invoice_master_Supplier_Name")
public String getInv_purchase_invoice_master_Supplier_Name() {
	return inv_purchase_invoice_master_Supplier_Name;
}
@JsonSetter("inv_purchase_invoice_master_Supplier_Name")
public void setInv_purchase_invoice_master_Supplier_Name(
		String inv_purchase_invoice_master_Supplier_Name) {
	this.inv_purchase_invoice_master_Supplier_Name = inv_purchase_invoice_master_Supplier_Name;
}
@JsonGetter("payMode")
public String getPayMode() {
	return payMode;
}
@JsonSetter("payMode")
public void setPayMode(String payMode) {
	this.payMode = payMode;
}
@JsonGetter("Credit_amt")
public Float getCredit_amt() {
	return Credit_amt;
}
@JsonSetter("Credit_amt")
public void setCredit_amt(Float credit_amt) {
	Credit_amt = credit_amt;
}
@JsonGetter("cash_amt")
public Float getCash_amt() {
	return cash_amt;
}
@JsonSetter("cash_amt")
public void setCash_amt(Float cash_amt) {
	this.cash_amt = cash_amt;
}
@JsonGetter("card_no")
public String getCard_no() {
	return card_no;
}
@JsonSetter("card_no")
public void setCard_no(String card_no) {
	this.card_no = card_no;
}
@JsonGetter("status")
public String getStatus() {
	return status;
}
@JsonSetter("status")
public void setStatus(String status) {
	this.status = status;
}
@JsonGetter("bankName")
public String getBankName() {
	return bankName;
}
@JsonSetter("bankName")
public void setBankName(String bankName) {
	this.bankName = bankName;
}
@JsonGetter("updated_date")
public String getUpdated_date() {
	return updated_date;
}
@JsonSetter("updated_date")
public void setUpdated_date(String updated_date) {
	this.updated_date = updated_date;
}
@JsonGetter("create_date")
public String getCreate_date() {
	return create_date;
}
@JsonSetter("create_date")
public void setCreate_date(String create_date) {
	this.create_date = create_date;
}
@JsonGetter("comment")
public String getComment() {
	return comment;
}
@JsonSetter("comment")
public void setComment(String comment) {
	this.comment = comment;
}
@JsonGetter("liPurInvoicePaymentDTOs")
public List<InventoryPurInvoicePaymentDTO> getLiPurInvoicePaymentDTOs() {
	return liPurInvoicePaymentDTOs;
}
@JsonSetter("liPurInvoicePaymentDTOs")
public void setLiPurInvoicePaymentDTOs(
		List<InventoryPurInvoicePaymentDTO> liPurInvoicePaymentDTOs) {
	this.liPurInvoicePaymentDTOs = liPurInvoicePaymentDTOs;
}
@JsonGetter("duration")
public String getDuration() {
	return duration;
}
@JsonSetter("duration")
public void setDuration(String duration) {
	this.duration = duration;
}

}
