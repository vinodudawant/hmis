package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class GRNMaster {

	private int stock_grn_adj_master_Id;
	private int po_master_Id;
	private String stock_adj_date;
	private String stock_adj_detail;
	private String stock_adj_account;
	private String VendorName;
	private String stock_adj_doc_date;
	private String stock_adj_doc_ref;
	private List<GRNMaster> listGRNmaster;
	private List<GRNComponant> listGRNComponant;
	private List<Product> listProduct;

	@JsonGetter("idGrnMaster")
	public int getStock_grn_adj_master_Id() {
		return stock_grn_adj_master_Id;
	}

	@JsonSetter("idGrnMaster")
	public void setStock_grn_adj_master_Id(int stock_grn_adj_master_Id) {
		this.stock_grn_adj_master_Id = stock_grn_adj_master_Id;
	}

	@JsonGetter("idPoMster")
	public int getPo_master_Id() {
		return po_master_Id;
	}

	@JsonSetter("idPoMster")
	public void setPo_master_Id(int po_master_Id) {
		this.po_master_Id = po_master_Id;
	}

	@JsonGetter("grnDate")
	public String getStock_adj_date() {
		return stock_adj_date;
	}

	@JsonSetter("grnDate")
	public void setStock_adj_date(String stock_adj_date) {
		this.stock_adj_date = stock_adj_date;
	}

	@JsonGetter("grnadjDe")
	public String getStock_adj_detail() {
		return stock_adj_detail;
	}

	@JsonSetter("grnadjDe")
	public void setStock_adj_detail(String stock_adj_detail) {
		this.stock_adj_detail = stock_adj_detail;
	}

	@JsonGetter("grnAc")
	public String getstock_adj_account() {
		return stock_adj_account;
	}

	@JsonSetter("grnAc")
	public void setSstock_adj_account(String stock_adj_account) {
		this.stock_adj_account = stock_adj_account;
	}

	@JsonGetter("grnDocDate")
	public String getStock_adj_doc_date() {
		return stock_adj_doc_date;
	}

	@JsonSetter("grnDocDate")
	public void setStock_adj_doc_date(String date) {
		this.stock_adj_doc_date =date;
	}

	@JsonGetter("grnDocRef")
	public String getStock_adj_doc_ref() {
		return stock_adj_doc_ref;
	}

	@JsonSetter("grnDocRef")
	public void setStock_adj_doc_ref(String stock_adj_doc_ref) {
		this.stock_adj_doc_ref = stock_adj_doc_ref;
	}

	@JsonGetter("listGrnMaster")
	public List<GRNMaster> getListGRNmaster() {
		return listGRNmaster;
	}

	@JsonSetter("listGrnMaster")
	public void setListGRNmaster(List<GRNMaster> listGRNmaster) {
		this.listGRNmaster = listGRNmaster;
	}

	@JsonGetter("listGrnCompo")
	public List<GRNComponant> getListGRNComponat() {
		return listGRNComponant;
	}

	@JsonSetter("listGrnCompo")
	public void setListGRNComponat(List<GRNComponant> listGRNComponant) {
		this.listGRNComponant = listGRNComponant;
	}

	@JsonGetter("listProduct")
	public List<Product> getListProduct() {
		return listProduct;
	}

	@JsonSetter("listProduct")
	public void setListProduct(List<Product> listProduct) {
		this.listProduct = listProduct;
	}

	@JsonGetter("vname")
	public String getVendorName() {
		return VendorName;
	}
	@JsonSetter("vname")
	public void setVendorName(String vendorName) {
		VendorName = vendorName;
	}

}
