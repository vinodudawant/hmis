package com.hms.pharmacy.pojo;

public class OpeningStockResult {
	
	private String openingStockId;
	private String shelfName;
	private String productName;
	private String addDate;
	private Integer productId;
	private String qty;
	
	private String batchCode=null;
	

	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public String getBatchId() {
		return batchId;
	}
	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}
	private String batchId;
	
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public String getOpeningStockId() {
		return openingStockId;
	}
	public void setOpeningStockId(String openingStockId) {
		this.openingStockId = openingStockId;
	}
	public String getShelfName() {
		return shelfName;
	}
	public void setShelfName(String shelfName) {
		this.shelfName = shelfName;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getAddDate() {
		return addDate;
	}
	public void setAddDate(String addDate) {
		this.addDate = addDate;
	}
	public String getBatchCode() {
		return batchCode;
	}
	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}

}
