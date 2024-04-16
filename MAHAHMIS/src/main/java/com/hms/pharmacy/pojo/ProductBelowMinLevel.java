package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Transient;

public class ProductBelowMinLevel {
	private String productId;
	private String productName;
	private String packing;
	private String totalStock;
	private String minLevel;
	private String maxLevel;
	private Integer differenceOfStock;
	private Double unit;
	private Double vat;
	private Integer product_id ;
	private String product_name;
	private String pack_type;
	private String comp_name;
	private String batch_code;
	private String batch_exp_date;
	private Integer product_min_level;
	private Integer product_max_level;
	private double stock_qty_in_hand;
	private double diff;
	
	
	@Transient
	List<ProductBelowMinLevel> lstProductBelowMinLevel;
	
	public Double getVat() {
		return vat;
	}
	public void setVat(Double vat) {
		this.vat = vat;
	}
	

	public Double getUnit() {
		return unit;
	}
	public void setUnit(Double unit) {
		this.unit = unit;
	}
	public Integer getDifferenceOfStock() {
		return differenceOfStock;
	}
	public void setDifferenceOfStock(Integer differenceOfStock) {
		this.differenceOfStock = differenceOfStock;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getPacking() {
		return packing;
	}
	public void setPacking(String packing) {
		this.packing = packing;
	}
	public String getTotalStock() {
		return totalStock;
	}
	public void setTotalStock(String totalStock) {
		this.totalStock = totalStock;
	}
	public String getMinLevel() {
		return minLevel;
	}
	public void setMinLevel(String minLevel) {
		this.minLevel = minLevel;
	}
	public String getMaxLevel() {
		return maxLevel;
	}
	public void setMaxLevel(String maxLevel) {
		this.maxLevel = maxLevel;
	}
	
	private double stock;
	public double getStock() {
		return stock;
	}
	public void setStock(double stock) {
		this.stock = stock;
	}
	public List<ProductBelowMinLevel> getLstProductBelowMinLevel() {
		return lstProductBelowMinLevel;
	}
	public void setLstProductBelowMinLevel(List<ProductBelowMinLevel> lstProductBelowMinLevel) {
		this.lstProductBelowMinLevel = lstProductBelowMinLevel;
	}
	public Integer getProduct_id() {
		return product_id;
	}
	public void setProduct_id(Integer product_id) {
		this.product_id = product_id;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getPack_type() {
		return pack_type;
	}
	public void setPack_type(String pack_type) {
		this.pack_type = pack_type;
	}
	
	public String getComp_name() {
		return comp_name;
	}
	public void setComp_name(String comp_name) {
		this.comp_name = comp_name;
	}
	public String getBatch_code() {
		return batch_code;
	}
	public void setBatch_code(String batch_code) {
		this.batch_code = batch_code;
	}
	public String getBatch_exp_date() {
		return batch_exp_date;
	}
	public void setBatch_exp_date(String batch_exp_date) {
		this.batch_exp_date = batch_exp_date;
	}
	public Integer getProduct_min_level() {
		return product_min_level;
	}
	public void setProduct_min_level(Integer product_min_level) {
		this.product_min_level = product_min_level;
	}
	public Integer getProduct_max_level() {
		return product_max_level;
	}
	public void setProduct_max_level(Integer product_max_level) {
		this.product_max_level = product_max_level;
	}
	public double getStock_qty_in_hand() {
		return stock_qty_in_hand;
	}
	public void setStock_qty_in_hand(double stock_qty_in_hand) {
		this.stock_qty_in_hand = stock_qty_in_hand;
	}
	public double getDiff() {
		return diff;
	}
	public void setDiff(double diff) {
		this.diff = diff;
	}
	
	
}
