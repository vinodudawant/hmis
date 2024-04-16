package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Transient;

public class ReportStock {

	private String productName;
	private String productCompany;
	private String productShelf;
	private String productUnit;
	private String productPacking;
	private String batchCode;
	private String batchExpDate;
	private String mrp;
	private String rate;
	private String stockInHand;
	private String purRate;
	private String amount;
	private String companyId;
	private String productId;
	private String shelfId;
	private String categoryId;
	private String categoryName;
	private String purchaseRatePerUnit;
	private String addDate;
	private String closingStock=null;
	private String currentStock=null;
	
	//added by Akshata 
	private double mrprate;
	private double rate1;
	private double stock_qty_in_hand;
	private double pur_rate;
	private double product_uom_unit;
	private String comp_name;
	private String product_name;
	
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getComp_name() {
		return comp_name;
	}
	public void setComp_name(String comp_name) {
		this.comp_name = comp_name;
	}

	@Transient
	List<ReportStock> lstReportStock;
	
	
	public String getPurchaseRatePerUnit() {
		return purchaseRatePerUnit;
	}
	public void setPurchaseRatePerUnit(String purchaseRatePerUnit) {
		this.purchaseRatePerUnit = purchaseRatePerUnit;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductCompany() {
		return productCompany;
	}
	public void setProductCompany(String productCompany) {
		this.productCompany = productCompany;
	}
	public String getProductShelf() {
		return productShelf;
	}
	public void setProductShelf(String productShelf) {
		this.productShelf = productShelf;
	}
	public String getProductUnit() {
		return productUnit;
	}
	public void setProductUnit(String productUnit) {
		this.productUnit = productUnit;
	}
	public String getProductPacking() {
		return productPacking;
	}
	public void setProductPacking(String productPacking) {
		this.productPacking = productPacking;
	}
	public String getBatchCode() {
		return batchCode;
	}
	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}
	public String getBatchExpDate() {
		return batchExpDate;
	}
	public void setBatchExpDate(String batchExpDate) {
		this.batchExpDate = batchExpDate;
	}
	public String getMrp() {
		return mrp;
	}
	public void setMrp(String mrp) {
		this.mrp = mrp;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getStockInHand() {
		return stockInHand;
	}
	public void setStockInHand(String stockInHand) {
		this.stockInHand = stockInHand;
	}
	public String getPurRate() {
		return purRate;
	}
	public void setPurRate(String purRate) {
		this.purRate = purRate;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getShelfId() {
		return shelfId;
	}
	public void setShelfId(String shelfId) {
		this.shelfId = shelfId;
	}
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getAddDate() {
		return addDate;
	}
	public void setAddDate(String addDate) {
		this.addDate = addDate;
	}
	public String getClosingStock() {
		return closingStock;
	}
	public void setClosingStock(String closingStock) {
		this.closingStock = closingStock;
	}
	public String getCurrentStock() {
		return currentStock;
	}
	public void setCurrentStock(String currentStock) {
		this.currentStock = currentStock;
	}
	
	//Added By BILAL
	private int stockin;
	private int stockout;
	private String vendorName;

	public int getStockin() {
		return stockin;
	}
	public void setStockin(int stockin) {
		this.stockin = stockin;
	}
	public int getStockout() {
		return stockout;
	}
	public void setStockout(int stockout) {
		this.stockout = stockout;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public List<ReportStock> getLstReportStock() {
		return lstReportStock;
	}
	public void setLstReportStock(List<ReportStock> lstReportStock) {
		this.lstReportStock = lstReportStock;
	}
	public double getMrprate() {
		return mrprate;
	}
	public void setMrprate(double mrprate) {
		this.mrprate = mrprate;
	}
	public double getRate1() {
		return rate1;
	}
	public void setRate1(double rate1) {
		this.rate1 = rate1;
	}
	public double getStock_qty_in_hand() {
		return stock_qty_in_hand;
	}
	public void setStock_qty_in_hand(double stock_qty_in_hand) {
		this.stock_qty_in_hand = stock_qty_in_hand;
	}
	public double getPur_rate() {
		return pur_rate;
	}
	public void setPur_rate(double pur_rate) {
		this.pur_rate = pur_rate;
	}
	public double getProduct_uom_unit() {
		return product_uom_unit;
	}
	public void setProduct_uom_unit(double product_uom_unit) {
		this.product_uom_unit = product_uom_unit;
	}
	
	
}
