package com.hms.pharmacy.pojo;

import java.util.List;

public class PharmaStockDTO {
      int batchId;
      String batchCode;
      String batchExpirayDate;
      int productID;
      String productName;
      
      double stockQtyInHand;
      
      List<PharmaStockDTO>  lstPharmaStockDto;

	public int getBatchId() {
		return batchId;
	}

	public void setBatchId(int batchId) {
		this.batchId = batchId;
	}

	public String getBatchCode() {
		return batchCode;
	}

	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}

	public String getBatchExpirayDate() {
		return batchExpirayDate;
	}

	public void setBatchExpirayDate(String batchExpirayDate) {
		this.batchExpirayDate = batchExpirayDate;
	}

	public int getProductID() {
		return productID;
	}

	public void setProductID(int productID) {
		this.productID = productID;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public List<PharmaStockDTO> getLstPharmaStockDto() {
		return lstPharmaStockDto;
	}

	public void setLstPharmaStockDto(List<PharmaStockDTO> lstPharmaStockDto) {
		this.lstPharmaStockDto = lstPharmaStockDto;
	}

	public double getStockQtyInHand() {
		return stockQtyInHand;
	}

	public void setStockQtyInHand(double stockQtyInHand) {
		this.stockQtyInHand = stockQtyInHand;
	}

	@Override
	public String toString() {
		return "PharmaStockDTO [batchId=" + batchId + ", batchCode=" + batchCode + ", batchExpirayDate="
				+ batchExpirayDate + ", productID=" + productID + ", productName=" + productName + ", stockQtyInHand="
				+ stockQtyInHand + ", lstPharmaStockDto=" + lstPharmaStockDto + "]";
	}

	
      
      
}
