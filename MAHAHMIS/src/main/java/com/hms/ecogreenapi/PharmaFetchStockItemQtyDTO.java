package com.hms.ecogreenapi;

public class PharmaFetchStockItemQtyDTO {
	String skuId;
	String totalAvailableQuantity;
	public String getSkuId() {
		return skuId;
	}
	public void setSkuId(String skuId) {
		this.skuId = skuId;
	}
	public String getTotalAvailableQuantity() {
		return totalAvailableQuantity;
	}
	public void setTotalAvailableQuantity(String totalAvailableQuantity) {
		this.totalAvailableQuantity = totalAvailableQuantity;
	}
	@Override
	public String toString() {
		return "PharmaFetchStockItemQtyDTO [skuId=" + skuId + ", totalAvailableQuantity=" + totalAvailableQuantity
				+ "]";
	}
	
	
	
}
