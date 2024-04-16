package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class StockDTO {

	private Integer stockId;
	private Integer stockProductId;
	private Double stockQntOnHand;
	private Double stockQntOnOrder;
	private Double stockQntReorderLevel;
	private Double stockQntUptoLevel;
	private Double stockIndentQnt;
	private String stockStatus;
	private List<StockDTO> ltStockDTOs;
	
	@JsonGetter("stockId")
	public Integer getStockId() {
		return stockId;
	}
	@JsonSetter("stockId")
	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}
	@JsonGetter("stockProductId")
	public Integer getStockProductId() {
		return stockProductId;
	}
	@JsonSetter("stockProductId")
	public void setStockProductId(Integer stockProductId) {
		this.stockProductId = stockProductId;
	}
	@JsonGetter("stockQntOnHand")
	public Double getStockQntOnHand() {
		return stockQntOnHand;
	}
	@JsonSetter("stockQntOnHand")
	public void setStockQntOnHand(Double stockQntOnHand) {
		this.stockQntOnHand = stockQntOnHand;
	}
	@JsonGetter("stockQntOnOrder")
	public Double getStockQntOnOrder() {
		return stockQntOnOrder;
	}
	@JsonSetter("stockQntOnOrder")
	public void setStockQntOnOrder(Double stockQntOnOrder) {
		this.stockQntOnOrder = stockQntOnOrder;
	}
	@JsonGetter("stockQntReorderLevel")
	public Double getStockQntReorderLevel() {
		return stockQntReorderLevel;
	}
	@JsonSetter("stockQntReorderLevel")
	public void setStockQntReorderLevel(Double stockQntReorderLevel) {
		this.stockQntReorderLevel = stockQntReorderLevel;
	}
	@JsonGetter("stockQntUptoLevel")
	public Double getStockQntUptoLevel() {
		return stockQntUptoLevel;
	}
	@JsonSetter("stockQntUptoLevel")
	public void setStockQntUptoLevel(Double stockQntUptoLevel) {
		this.stockQntUptoLevel = stockQntUptoLevel;
	}
	@JsonGetter("stockIndentQnt")
	public Double getStockIndentQnt() {
		return stockIndentQnt;
	}
	@JsonSetter("stockIndentQnt")
	public void setStockIndentQnt(Double stockIndentQnt) {
		this.stockIndentQnt = stockIndentQnt;
	}
	@JsonGetter("stockStatus")
	public String getStockStatus() {
		return stockStatus;
	}
	@JsonSetter("stockStatus")
	public void setStockStatus(String stockStatus) {
		this.stockStatus = stockStatus;
	}
	@JsonGetter("ltStockDTOs")
	public List<StockDTO> getLtStockDTOs() {
		return ltStockDTOs;
	}
	@JsonSetter("ltStockDTOs")
	public void setLtStockDTOs(List<StockDTO> ltStockDTOs) {
		this.ltStockDTOs = ltStockDTOs;
	}
	
}
