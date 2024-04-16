package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class GRNComponant {

	private int idinv_grn_stock_adj_relation;
	private int stock_grn_adj_master_Id;
	private int stock_adj_product_Id;
	private String productName;
	private double stock_adj_qnt;
	private double stock_adj_cost;
	private double stock_adj_mrp;
	private String packing;
	private String vendor;
	private Integer productBatchflag;

	
	private String stockAdjBatchCode;
	private String stockAdjExpDate;

	private List<GRNComponant> listGRNComponant;
	

	@JsonGetter("idGrnCom")
	public int getIdinv_grn_stock_adj_relation() {
		return idinv_grn_stock_adj_relation;
	}

	@JsonSetter("idGrnCom")
	public void setIdinv_grn_stock_adj_relation(int idinv_grn_stock_adj_relation) {
		this.idinv_grn_stock_adj_relation = idinv_grn_stock_adj_relation;
	}

	@JsonGetter("idGrnMas")
	public int getStock_grn_adj_master_Id() {
		return stock_grn_adj_master_Id;
	}

	@JsonSetter("idGrnMas")
	public void setStock_grn_adj_master_Id(int stock_grn_adj_master_Id) {
		this.stock_grn_adj_master_Id = stock_grn_adj_master_Id;
	}

	@JsonGetter("idProd")
	public int getStock_adj_product_Id() {
		return stock_adj_product_Id;
	}

	@JsonSetter("idProd")
	public void setStock_adj_product_Id(int stock_adj_product_Id) {
		this.stock_adj_product_Id = stock_adj_product_Id;
	}

	@JsonGetter("prodName")
	public String getProductName() {
		return productName;
	}

	@JsonSetter("prodName")
	public void setProductName(String productName) {
		this.productName = productName;
	}

	@JsonGetter("grnQty")
	public double getStock_adj_qnt() {
		return stock_adj_qnt;
	}

	@JsonSetter("grnQty")
	public void setStock_adj_qnt(Double stock_adj_qnt) {
		this.stock_adj_qnt = stock_adj_qnt;
	}

	@JsonGetter("grnCt")
	public double getStock_adj_cost() {
		return stock_adj_cost;
	}

	@JsonSetter("grnCt")
	public void setStock_adj_cost(Double stock_adj_cost) {
		this.stock_adj_cost = stock_adj_cost;
	}

	@JsonGetter("grnMrp")
	public double getStock_adj_mrp() {
		return stock_adj_mrp;
	}

	@JsonSetter("grnMrp")
	public void setStock_adj_mrp(Double stock_adj_mrp) {
		this.stock_adj_mrp = stock_adj_mrp;
	}

	@JsonGetter("packing")
	public String getPacking() {
		return packing;
	}

	@JsonSetter("packing")
	public void setPacking(String packing) {
		this.packing = packing;
	}

	@JsonGetter("liGrnComp")
	public List<GRNComponant> getListGRNComponant() {
		return listGRNComponant;
	}

	@JsonSetter("liGrnComp")
	public void setListGRNComponant(List<GRNComponant> listGRNComponant) {
		this.listGRNComponant = listGRNComponant;
	}


	@JsonGetter("stockAdjBatchCode")
	public String getStockAdjBatchCode() {
		return stockAdjBatchCode;
	}
	@JsonSetter("stockAdjBatchCode")
	public void setStockAdjBatchCode(String stockAdjBatchCode) {
		this.stockAdjBatchCode = stockAdjBatchCode;
	}
	@JsonGetter("stockAdjExpDate")
	public String getStockAdjExpDate() {
		return stockAdjExpDate;
	}
	@JsonSetter("stockAdjExpDate")
	public void setStockAdjExpDate(String stockAdjExpDate) {
		this.stockAdjExpDate = stockAdjExpDate;
	}
	@JsonGetter("vendor")
	public String getVendor() {
		return vendor;
	}
	@JsonSetter("vendor")
	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	@JsonGetter("productBatchflag")
	public Integer getProductBatchflag() {
		return productBatchflag;
	}

	@JsonSetter("productBatchflag")
	public void setProductBatchflag(Integer productBatchflag) {
		this.productBatchflag = productBatchflag;
	}
	
}
