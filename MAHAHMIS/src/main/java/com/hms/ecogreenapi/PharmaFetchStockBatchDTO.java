package com.hms.ecogreenapi;

public class PharmaFetchStockBatchDTO {
	String itemcode ;
	String batchId;
	String quantity;
	String batchExpiryDate;
	String batchMrp;
	public String getItemcode() {
		return itemcode;
	}
	public void setItemcode(String itemcode) {
		this.itemcode = itemcode;
	}
	public String getBatchId() {
		return batchId;
	}
	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getBatchExpiryDate() {
		return batchExpiryDate;
	}
	public void setBatchExpiryDate(String batchExpiryDate) {
		this.batchExpiryDate = batchExpiryDate;
	}
	public String getBatchMrp() {
		return batchMrp;
	}
	public void setBatchMrp(String batchMrp) {
		this.batchMrp = batchMrp;
	}
	@Override
	public String toString() {
		return "PharmaFetchStockBatchDTO [itemcode=" + itemcode + ", batchId=" + batchId + ", quantity=" + quantity
				+ ", batchExpiryDate=" + batchExpiryDate + ", batchMrp=" + batchMrp + "]";
	}
	
	
}
