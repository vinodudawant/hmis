package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;


public class StockCardDTO {

	private Integer stockProductId;
	private Double stockQntOnOrder;
	private Double stockQntInHand;
	private Double stockMinQnt;
	private Double stockIndentQnt;
	private Double stockQntUoToLevel;
	private String StockProductName;
	private List<StockCardDTO> ltStockCardDTOs;
	
	@JsonGetter("stockProductId")
	public Integer getStockProductId() {
		return stockProductId;
	}
	@JsonSetter("stockProductId")
	public void setStockProductId(Integer stockProductId) {
		this.stockProductId = stockProductId;
	}
	@JsonGetter("stockQntOnOrder")
	public Double getStockQntOnOrder() {
		return stockQntOnOrder;
	}
	@JsonSetter("stockQntOnOrder")
	public void setStockQntOnOrder(Double stockQntOnOrder) {
		this.stockQntOnOrder = stockQntOnOrder;
	}
	@JsonGetter("stockQntInHand")
	public Double getStockQntInHand() {
		return stockQntInHand;
	}
	@JsonSetter("stockQntInHand")
	public void setStockQntInHand(Double stockQntInHand) {
		this.stockQntInHand = stockQntInHand;
	}
	@JsonGetter("stockMinQnt")
	public Double getStockMinQnt() {
		return stockMinQnt;
	}
	@JsonSetter("stockMinQnt")
	public void setStockMinQnt(Double stockMinQnt) {
		this.stockMinQnt = stockMinQnt;
	}
	@JsonGetter("stockIndentQnt")
	public Double getStockIndentQnt() {
		return stockIndentQnt;
	}
	@JsonSetter("stockIndentQnt")
	public void setStockIndentQnt(Double stockIndentQnt) {
		this.stockIndentQnt = stockIndentQnt;
	}
	@JsonGetter("stockQntUoToLevel")
	public Double getStockQntUoToLevel() {
		return stockQntUoToLevel;
	}
	@JsonSetter("stockQntUoToLevel")
	public void setStockQntUoToLevel(Double stockQntUoToLevel) {
		this.stockQntUoToLevel = stockQntUoToLevel;
	}
	@JsonGetter("StockProductName")
	public String getStockProductName() {
		return StockProductName;
	}
	@JsonSetter("StockProductName")
	public void setStockProductName(String stockProductName) {
		StockProductName = stockProductName;
	}
	@JsonGetter("ltStockCardDTOs")
	public List<StockCardDTO> getLtStockCardDTOs() {
		return ltStockCardDTOs;
	}
	@JsonSetter("ltStockCardDTOs")
	public void setLtStockCardDTOs(List<StockCardDTO> ltStockCardDTOs) {
		this.ltStockCardDTOs = ltStockCardDTOs;
	}
	
	
}
