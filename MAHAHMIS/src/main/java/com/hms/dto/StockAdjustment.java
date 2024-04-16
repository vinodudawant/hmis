package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class StockAdjustment {
private int id;
private String productName;
private double quantity;
private String narration ;
private double mrp;
private List<StockAdjustmentMaster> StockAdjMasterList;
private List<StockAdjustment> StockAdjustmentList;
private List<Product> product;
private double cost;
private Product prod;
private StockAdjustmentMaster stockAdjM;


@JsonGetter("prod")
public Product getProd() {
	return prod;
}
@JsonSetter("prod")
public void setProd(Product prod) {
	this.prod = prod;
}
@JsonGetter("stockAdjM")
public StockAdjustmentMaster getStockAdjM() {
	return stockAdjM;
}
@JsonSetter("stockAdjM")
public void setStockAdjM(StockAdjustmentMaster stockAdjM) {
	this.stockAdjM = stockAdjM;
}
@JsonGetter("StockAdjMasterList")
public List<StockAdjustmentMaster> getStockAdjMasterList() {
	return StockAdjMasterList;
}
@JsonSetter("StockAdjMasterList")
public void setStockAdjMasterList(List<StockAdjustmentMaster> stockAdjMasterList) {
	StockAdjMasterList = stockAdjMasterList;
}
@JsonGetter("product")
public List<Product> getProduct() {
	return product;
}
@JsonSetter("product")
public void setProduct(List<Product> product) {
	this.product = product;
}
@JsonGetter("id")
public int getId() {
	return id;
}
@JsonSetter("id")
public void setId(int id) {
	this.id = id;
}
@JsonGetter("productName")
public String getProductName() {
	return productName;
}
@JsonSetter("productName")
public void setProductName(String productName) {
	this.productName = productName;
}
@JsonGetter("quantity")
public double getQuantity() {
	return quantity;
}
@JsonSetter("quantity")
public void setQuantity(double quantity) {
	this.quantity = quantity;
}
@JsonGetter("cost")
public double getCost() {
	return cost;
}
@JsonSetter("cost")
public void setCost(double cost) {
	this.cost = cost;
}
@JsonGetter("mrp")
public double getMrp() {
	return mrp;
}
@JsonSetter("mrp")
public void setMrp(double mrp) {
	this.mrp = mrp;
}
@JsonGetter("StockAdjustmentList")
public List<StockAdjustment> getStockAdjustmentList() {
	return StockAdjustmentList;
}
@JsonSetter("StockAdjustmentList")
public void setStockAdjustmentList(List<StockAdjustment> stockAdjustmentList) {
	StockAdjustmentList = stockAdjustmentList;
}
@JsonGetter("narration")
public String getNarration() {
	return narration;
}
@JsonSetter("narration")
public void setNarration(String narration) {
	this.narration = narration;
}

}
