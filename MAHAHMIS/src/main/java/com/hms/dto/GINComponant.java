package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class GINComponant {
	private int idinv_gin_stock_adj_relation;
	private int stock_gin_adj_master_Id;
	private int stock_adj_product_Id;
	private String productName;
	private double stock_adj_qnt;
	private double stock_adj_cost;
	private double stock_adj_mrp;
	private String packing;
	private String stockAdjBatchCode;
	private String stockAdjExpDate;

	private List<GINComponant> listGINComponant;

	@JsonGetter("idGinCom")
	public int getIdinv_gin_stock_adj_relation() {
		return idinv_gin_stock_adj_relation;
	}

	@JsonSetter("idGinCom")
	public void setIdinv_gin_stock_adj_relation(int idinv_gin_stock_adj_relation) {
		this.idinv_gin_stock_adj_relation = idinv_gin_stock_adj_relation;
	}

	@JsonGetter("idGinMas")
	public int getStock_gin_adj_master_Id() {
		return stock_gin_adj_master_Id;
	}

	@JsonSetter("idGinMas")
	public void setStock_gin_adj_master_Id(int stock_gin_adj_master_Id) {
		this.stock_gin_adj_master_Id = stock_gin_adj_master_Id;
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

	@JsonGetter("ginQty")
	public double getStock_adj_qnt() {
		return stock_adj_qnt;
	}

	@JsonSetter("ginQty")
	public void setStock_adj_qnt(Double stock_adj_qnt) {
		this.stock_adj_qnt = stock_adj_qnt;
	}

	@JsonGetter("ginCt")
	public double getStock_adj_cost() {
		return stock_adj_cost;
	}

	@JsonSetter("ginCt")
	public void setStock_adj_cost(Double stock_adj_cost) {
		this.stock_adj_cost = stock_adj_cost;
	}

	@JsonGetter("ginMrp")
	public double getStock_adj_mrp() {
		return stock_adj_mrp;
	}

	@JsonSetter("ginMrp")
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

	@JsonGetter("liGinComp")
	public List<GINComponant> getListGINComponant() {
		return listGINComponant;
	}

	@JsonSetter("liGinComp")
	public void setListGINComponant(List<GINComponant> listGINComponant) {
		this.listGINComponant = listGINComponant;
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
	
	
}
