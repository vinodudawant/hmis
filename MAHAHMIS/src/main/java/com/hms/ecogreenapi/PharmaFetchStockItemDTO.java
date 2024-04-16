package com.hms.ecogreenapi;

import java.util.List;

public class PharmaFetchStockItemDTO {
	String skuCode;
	List<PharmaFetchStockBatchDTO>  batchDetails;
	
	List<PharmaFetchStockItemQtyDTO>  itemQtyDetyails;

	public String getSkuCode() {
		return skuCode;
	}

	public void setSkuCode(String skuCode) {
		this.skuCode = skuCode;
	}

	public List<PharmaFetchStockBatchDTO> getBatchDetails() {
		return batchDetails;
	}

	public void setBatchDetails(List<PharmaFetchStockBatchDTO> batchDetails) {
		this.batchDetails = batchDetails;
	}

	public List<PharmaFetchStockItemQtyDTO> getItemQtyDetyails() {
		return itemQtyDetyails;
	}

	public void setItemQtyDetyails(List<PharmaFetchStockItemQtyDTO> itemQtyDetyails) {
		this.itemQtyDetyails = itemQtyDetyails;
	}
	
	
}
