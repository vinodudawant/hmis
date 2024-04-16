package com.hms.pharmacy.pojo;
public class ProductwithZeroStock
{
	private String productId;
	private String productName;
	private String packing;
	private String totalStock;
	private String minLevel;
	private String maxLevel;
	private Double unit;
	private Double vat;
	
	public Double getUnit() {
		return unit;
	}
	public void setUnit(Double unit) {
		this.unit = unit;
	}
	public Double getVat() {
		return vat;
	}
	public void setVat(Double vat) {
		this.vat = vat;
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
	
	
}
